(function bootstrapWordsOnTrial(global, document) {
  "use strict";

  const data = global.WordsOnTrialGameData;
  if (!data) throw new Error("正式游戏数据未加载：window.WordsOnTrialGameData 不存在。");

  const DESIGN_WIDTH = data.runtime.designResolution.width;
  const DESIGN_HEIGHT = data.runtime.designResolution.height;
  const MAX_PAGE_CHARS = 78;
  const CHOICE_REVEAL_MS = 520;
  const INVESTIGATION_PROMPT_MS = 6000;
  const sceneIds = data.runtime.sceneOrder;
  const scheduledTimers = new Set();
  const RETURN_CART_REQUIRED_HOTSPOTS = data.scenes.scene_02_return_cart.investigationHotspots.map((item) => item.hotspotId);

  const FLOW = {
    scene_01_library_intro: { cast: { left: "shen_lan", right: "anna" }, entry: "dialogue" },
    scene_02_return_cart: { cast: { left: "shen_lan", right: "anna" }, entry: "returnCart" },
    scene_03_display_case: { cast: { left: "shen_lan", right: "anna" }, entry: "displayCase" },
    scene_04_catalog_terminal: { cast: { left: "shen_lan", right: "anna" }, entry: "catalog" },
    scene_05_trial_entry: { cast: { center: "yan_ci" }, entry: "testimony" },
    scene_06_evidence_submit: { cast: { center: "yan_ci" }, entry: "evidenceTrial" },
    scene_07_dynamic_followup: { cast: { right: "yan_ci" }, entry: "dialogue" },
    scene_08_corpus: { cast: { center: "yan_ci" }, entry: "corpus" },
    scene_09_first_judgment: { cast: { center: "ming_yi" }, entry: "dialogue" },
    scene_10_quick_chajue: { cast: { left: "anna", right: "ming_yi" }, entry: "environment" },
    scene_11_quick_fajue: { cast: { left: "anna", right: "ming_yi" }, entry: "catalogResult" },
    scene_12_truth: { cast: { left: "shen_lan", right: "anna" }, entry: "truthInvestigation" },
    scene_13_ending: { cast: { left: "shen_lan", right: "anna" }, entry: "dialogue" },
  };

  const HOTSPOTS = {
    scene_03_display_case: [
      { id: "hotspot_humidity", label: "湿度显示", rect: [1302, 290, 175, 155], action: "humidity" },
    ],
    scene_12_truth: [
      { id: "hotspot_transfer_record", label: "车轮下的纸张", rect: [140, 914, 137, 66], action: "transferRecord" },
    ],
  };

  const el = Object.fromEntries([
    "game-stage", "scene-background", "scene-kicker", "scene-name", "scene-objective", "scene-progress-fill",
    "restart-button", "character-layer", "left-character", "center-character", "right-character", "hotspot-layer",
    "screen-panel", "panel-eyebrow", "panel-title", "panel-content", "panel-continue", "choice-layer", "choice-card",
    "choice-type", "choice-prompt", "choice-options", "choice-help", "dialogue-ui", "dialogue-advance", "speaker-name",
    "dialogue-text", "page-indicator", "evidence-entry", "evidence-count", "evidence-overlay", "evidence-close",
    "evidence-empty", "evidence-detail", "evidence-preview", "evidence-index", "evidence-name", "evidence-description",
    "evidence-location", "evidence-purpose", "evidence-tags", "evidence-list", "system-toast", "investigation-cursor",
    "case-result-advance",
  ].map((id) => [id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), document.getElementById(id)]));

  const gameState = {
    currentSceneId: data.runtime.startSceneId,
    currentNodeId: data.runtime.startNodeId,
    currentDialoguePage: 0,
    dialoguePages: [],
    acquiredEvidenceIds: [],
    investigatedHotspotIds: [],
    completedChoiceGroupIds: [],
    selectedEvidenceId: null,
    sceneFlags: {},
    currentUiMode: "transition",
    evidencePanelOpen: false,
    inputLocked: false,
    returnUiMode: null,
    activeChoiceGroupId: null,
    panelContinue: null,
    evidenceCloseCallback: null,
    toastTimer: null,
    promptTimer: null,
    activePromptId: null,
    promptVisible: false,
    pendingAction: null,
    lastAdvanceAt: -Infinity,
    previousSpeakerId: null,
    previousSceneId: null,
    currentExpressionByCharacter: {},
    wrongTokenIndices: [],
    completedInvestigationFlows: [],
    activeInvestigationFlowId: null,
    investigationQueue: [],
    asyncSequenceId: 0,
    endingStage: null,
    achievementRevealed: false,
    currentInteractionPhase: null,
    choiceActivationAt: -Infinity,
  };

  function scene() { return data.scenes[gameState.currentSceneId]; }
  function node() { return data.dialogueNodes[gameState.currentNodeId]; }
  function systemText(id) { return data.systemTexts[id]; }
  function nextSceneId() { return sceneIds[sceneIds.indexOf(gameState.currentSceneId) + 1] || null; }
  function addUnique(list, id) { if (!list.includes(id)) list.push(id); }
  function flag(name, value = true) { gameState.sceneFlags[name] = value; }
  function hasFlag(name) { return Boolean(gameState.sceneFlags[name]); }
  function schedule(callback, delay) {
    const timerId = global.setTimeout(() => {
      scheduledTimers.delete(timerId);
      callback();
    }, delay);
    scheduledTimers.add(timerId);
    return timerId;
  }
  function clearScheduledTimers() {
    for (const timerId of scheduledTimers) global.clearTimeout(timerId);
    scheduledTimers.clear();
  }

  function resizeStage() {
    const scale = Math.min(global.innerWidth / DESIGN_WIDTH, global.innerHeight / DESIGN_HEIGHT);
    el.gameStage.style.setProperty("--stage-scale", String(scale));
  }

  function reportAssetError(image, assetId, path) {
    image.addEventListener("error", () => {
      console.error(`[WordsOnTrial] 素材加载失败 assetId=${assetId} path=${path}`);
      image.classList.add("asset-missing");
    }, { once: true });
  }

  function setImage(image, path, assetId) {
    if (!path) { image.hidden = true; image.removeAttribute("src"); return; }
    image.hidden = false;
    if (image.dataset.assetPath === path && image.getAttribute("src")) return;
    image.classList.remove("asset-missing");
    reportAssetError(image, assetId, path);
    image.dataset.assetPath = path;
    image.src = path;
  }

  function renderSceneChrome(backgroundOverride) {
    const current = scene();
    const bg = backgroundOverride || data.assets.backgrounds[current.backgroundAssetId];
    el.sceneBackground.classList.add("is-loading");
    el.sceneBackground.onload = () => el.sceneBackground.classList.remove("is-loading");
    setImage(el.sceneBackground, bg.path, backgroundOverride ? "bg_return_cart_closeup" : current.backgroundAssetId);
    el.sceneKicker.textContent = `SCENE ${String(current.order).padStart(2, "0")} / ${String(sceneIds.length).padStart(2, "0")}`;
    el.sceneName.textContent = current.name;
    el.sceneObjective.textContent = current.objective;
    el.sceneProgressFill.style.width = `${(current.order / sceneIds.length) * 100}%`;
  }

  function firstExpression(characterId) {
    return Object.values(data.characters[characterId]?.expressions || {})[0];
  }

  function renderCharacters(activeNode = node()) {
    const cast = activeNode?.presentationCast || FLOW[gameState.currentSceneId]?.cast || {};
    const speakerId = activeNode?.speakerId;
    const speakerChanged = speakerId !== gameState.previousSpeakerId;
    const sceneChanged = gameState.currentSceneId !== gameState.previousSceneId;
    const slots = ["left", "center", "right"];
    for (const slot of slots) {
      const image = el[`${slot}Character`];
      const characterId = cast[slot];
      if (!characterId) {
        image.hidden = true;
        image.classList.remove("is-visible", "is-speaking", "is-listening", "is-virtual");
        image.dataset.characterId = "";
        continue;
      }
      const character = data.characters[characterId];
      const explicitExpression = speakerId === characterId && activeNode?.expressionId
        ? character.expressions[activeNode.expressionId]
        : null;
      if (explicitExpression) gameState.currentExpressionByCharacter[characterId] = explicitExpression.expressionId;
      const storedExpressionId = gameState.currentExpressionByCharacter[characterId];
      const expression = character.expressions[storedExpressionId] || firstExpression(characterId);
      if (expression && !storedExpressionId) gameState.currentExpressionByCharacter[characterId] = expression.expressionId;
      const characterChanged = image.dataset.characterId !== characterId;
      image.hidden = false;
      image.classList.add("character", `character-${slot}`, "is-visible");
      image.classList.toggle("is-virtual", expression?.assetStatus === "virtual" || !expression?.assetPath);
      if (sceneChanged || characterChanged || speakerChanged) {
        image.classList.toggle("is-speaking", speakerId === characterId);
        image.classList.toggle("is-listening", Boolean(speakerId) && speakerId !== characterId);
      }
      setImage(image, expression?.assetPath, expression?.expressionId || characterId);
      image.alt = character.displayName;
      image.dataset.characterId = characterId;
      image.dataset.expressionId = expression?.expressionId || "";
    }
    gameState.previousSpeakerId = speakerId || null;
    gameState.previousSceneId = gameState.currentSceneId;
  }

  function hideAllCharacters() {
    el.characterLayer.hidden = true;
    [el.leftCharacter, el.centerCharacter, el.rightCharacter].forEach((image) => {
      image.hidden = true;
      image.classList.remove("is-visible", "is-speaking", "is-listening");
    });
    gameState.previousSpeakerId = null;
  }

  function isNarrationNode(item) {
    return item?.speakerId === "narrator" || item?.textType === "narration";
  }

  function isBreakInsidePair(chars, position) {
    const pairs = [["《", "》"], ["“", "”"], ["‘", "’"], ["「", "」"], ["『", "』"]];
    const before = chars.slice(0, position).join("");
    for (const [open, close] of pairs) {
      if (before.lastIndexOf(open) > before.lastIndexOf(close)) return true;
    }
    return false;
  }

  function breakQuality(chars, position) {
    if (position <= 0 || position >= chars.length) return -100;
    if (/[，。！？；：、”’」』】）]/.test(chars[position])) return -100;
    if (/[“‘「『《（【]/.test(chars[position - 1])) return -100;
    if (isBreakInsidePair(chars, position)) return -35;
    if (/[。！？]/.test(chars[position - 1])) return 34;
    if (/[；：…]/.test(chars[position - 1])) return 24;
    if (/[，、]/.test(chars[position - 1])) return 16;
    return 0;
  }

  function balancedLineRanges(text) {
    const chars = Array.from(text || "");
    const length = chars.length;
    const lineCount = length > 56 ? 3 : length > 28 ? 2 : 1;
    if (lineCount === 1 || length < 2) return [{ start: 0, end: length }];
    let best = null;
    const consider = (cuts) => {
      const points = [0, ...cuts, length];
      const lengths = points.slice(1).map((point, index) => point - points[index]);
      const average = length / lineCount;
      if (lengths.some((value) => value < Math.max(4, average * .35))) return;
      const variance = lengths.reduce((sum, value) => sum + ((value - average) ** 2), 0);
      const quality = cuts.reduce((sum, cut) => sum + breakQuality(chars, cut), 0);
      const score = variance - quality * 3;
      if (!best || score < best.score) best = { score, points };
    };
    if (lineCount === 2) {
      for (let first = 8; first <= length - 8; first += 1) consider([first]);
    } else {
      for (let first = 8; first <= length - 16; first += 1) {
        for (let second = first + 8; second <= length - 8; second += 1) consider([first, second]);
      }
    }
    if (!best) {
      const points = [0];
      for (let index = 1; index < lineCount; index += 1) points.push(Math.round(length * index / lineCount));
      points.push(length);
      best = { points };
    }
    return best.points.slice(1).map((end, index) => ({ start: best.points[index], end }));
  }

  function paginate(text) {
    const source = (text || "").trim();
    const chars = Array.from(source);
    const pages = [];
    let offset = 0;
    while (chars.length > MAX_PAGE_CHARS) {
      let cut = MAX_PAGE_CHARS;
      let bestScore = -Infinity;
      for (let index = Math.max(48, MAX_PAGE_CHARS - 18); index <= Math.min(chars.length - 1, MAX_PAGE_CHARS + 8); index += 1) {
        const score = breakQuality(chars, index) - Math.abs(index - MAX_PAGE_CHARS);
        if (score > bestScore) { bestScore = score; cut = index; }
      }
      while (cut < chars.length && /[，。！？；：、”’」』】）]/.test(chars[cut])) cut += 1;
      const pageText = chars.splice(0, cut).join("");
      pages.push({ text: pageText, start: offset });
      offset += Array.from(pageText).length;
    }
    const pageText = chars.join("");
    if (pageText || !pages.length) pages.push({ text: pageText, start: offset });
    return pages;
  }

  function emphasisRanges(item) {
    const ranges = [];
    for (const emphasis of item?.emphasisTokens || []) {
      let from = 0;
      let index = -1;
      for (let occurrence = 0; occurrence < emphasis.occurrence; occurrence += 1) {
        index = item.text.indexOf(emphasis.token, from);
        if (index < 0) break;
        from = index + emphasis.token.length;
      }
      if (index >= 0) ranges.push({ start: index, end: index + emphasis.token.length, style: emphasis.style });
    }
    return ranges.sort((a, b) => a.start - b.start);
  }

  function appendEmphasizedText(fragment, text, globalStart, ranges) {
    let cursor = 0;
    for (const range of ranges) {
      const localStart = range.start - globalStart;
      const localEnd = range.end - globalStart;
      if (localEnd <= 0 || localStart >= text.length) continue;
      const start = Math.max(0, localStart);
      const end = Math.min(text.length, localEnd);
      if (start > cursor) fragment.append(document.createTextNode(text.slice(cursor, start)));
      const span = document.createElement("span");
      span.className = `dialogue-emphasis is-${range.style}`;
      span.textContent = text.slice(start, end);
      fragment.append(span);
      cursor = end;
    }
    if (cursor < text.length) fragment.append(document.createTextNode(text.slice(cursor)));
  }

  function tokenRanges(text, tokens = []) {
    const ranges = [];
    for (const emphasis of tokens) {
      let from = 0;
      let index = -1;
      for (let occurrence = 0; occurrence < (emphasis.occurrence || 1); occurrence += 1) {
        index = text.indexOf(emphasis.token, from);
        if (index < 0) break;
        from = index + emphasis.token.length;
      }
      if (index >= 0) ranges.push({ start: index, end: index + emphasis.token.length, style: emphasis.style });
    }
    return ranges.sort((a, b) => a.start - b.start);
  }

  function appendStructuredEmphasis(container, text, tokens = []) {
    const fragment = document.createDocumentFragment();
    appendEmphasizedText(fragment, text, 0, tokenRanges(text, tokens));
    container.replaceChildren(fragment);
  }

  function appendBalancedPlainText(container, text) {
    const fragment = document.createDocumentFragment();
    const paragraphs = String(text || "").split("\n");
    paragraphs.forEach((paragraph, paragraphIndex) => {
      const chars = Array.from(paragraph);
      const ranges = balancedLineRanges(paragraph);
      ranges.forEach((range, lineIndex) => {
        fragment.append(document.createTextNode(chars.slice(range.start, range.end).join("")));
        if (lineIndex < ranges.length - 1) fragment.append(document.createElement("br"));
      });
      if (paragraphIndex < paragraphs.length - 1) fragment.append(document.createElement("br"));
    });
    container.replaceChildren(fragment);
  }

  function setMode(mode) {
    gameState.currentUiMode = mode;
    const investigating = mode === "investigation";
    el.characterLayer.hidden = investigating;
    if (investigating) {
      [el.leftCharacter, el.centerCharacter, el.rightCharacter].forEach((image) => image.classList.remove("is-speaking", "is-listening"));
      gameState.previousSpeakerId = null;
    }
    el.dialogueUi.hidden = mode !== "dialogue" && mode !== "choice";
    el.hotspotLayer.hidden = mode !== "investigation";
    el.choiceLayer.hidden = mode !== "choice";
    el.gameStage.classList.toggle("is-investigating", mode === "investigation" && !gameState.evidencePanelOpen);
    if (mode !== "choice") gameState.activeChoiceGroupId = null;
  }

  function setNode(nodeId) {
    const next = data.dialogueNodes[nodeId];
    if (!next) { console.error(`[WordsOnTrial] 找不到对白节点 ${nodeId}`); return; }
    gameState.currentSceneId = next.sceneId;
    gameState.currentNodeId = nodeId;
    gameState.currentDialoguePage = 0;
    gameState.dialoguePages = paginate(next.text);
    gameState.currentInteractionPhase = next.choicePhases?.dialogue || null;
    if (next.backgroundAssetId) renderSceneChrome(data.assets.backgrounds[next.backgroundAssetId]);
    setMode("dialogue");
    renderDialogue();
    if (next.choiceGroupId && !gameState.completedChoiceGroupIds.includes(next.choiceGroupId)) {
      if (next.deferChoiceUntilAdvance) {
        gameState.currentInteractionPhase = next.choicePhases?.waiting || gameState.currentInteractionPhase;
        return;
      }
      renderChoice(next.choiceGroupId);
    }
  }

  function renderDialogue() {
    const current = node();
    if (!current) return;
    const narration = isNarrationNode(current);
    const character = data.characters[current.speakerId];
    el.speakerName.textContent = narration ? "" : (character?.displayName || current.speakerId);
    el.speakerName.hidden = narration;
    const page = gameState.dialoguePages[gameState.currentDialoguePage] || { text: "", start: 0 };
    const fragment = document.createDocumentFragment();
    const ranges = emphasisRanges(current);
    const chars = Array.from(page.text);
    const lineRanges = balancedLineRanges(page.text);
    for (const [index, line] of lineRanges.entries()) {
      const lineText = chars.slice(line.start, line.end).join("");
      appendEmphasizedText(fragment, lineText, page.start + line.start, ranges);
      if (index < lineRanges.length - 1) fragment.append(document.createElement("br"));
    }
    el.dialogueText.replaceChildren(fragment);
    el.dialogueUi.classList.remove("speaker-narrator", "speaker-player", "speaker-character");
    el.dialogueUi.classList.add(current.speakerId === "narrator" ? "speaker-narrator" : current.speakerId === "player" ? "speaker-player" : "speaker-character");
    el.dialogueUi.classList.toggle("is-narration", narration);
    el.pageIndicator.textContent = gameState.dialoguePages.length > 1 ? `${gameState.currentDialoguePage + 1} / ${gameState.dialoguePages.length}` : "";
    if (narration) {
      el.characterLayer.hidden = true;
      [el.leftCharacter, el.centerCharacter, el.rightCharacter].forEach((image) => image.classList.remove("is-speaking", "is-listening"));
      gameState.previousSpeakerId = null;
    } else {
      el.characterLayer.hidden = false;
      renderCharacters(current);
    }
  }

  function showToast(text, options = {}) {
    if (gameState.promptVisible) clearInvestigationPrompt();
    global.clearTimeout(gameState.toastTimer);
    el.systemToast.textContent = text;
    el.systemToast.className = `system-toast${options.error ? " is-error" : ""}${options.earned ? " is-earned" : ""}`;
    el.systemToast.hidden = false;
    gameState.toastTimer = global.setTimeout(() => { el.systemToast.hidden = true; }, options.duration || 2400);
    return true;
  }

  function hideToast() {
    global.clearTimeout(gameState.toastTimer);
    gameState.toastTimer = null;
    el.systemToast.hidden = true;
  }

  function clearInvestigationPrompt() {
    global.clearTimeout(gameState.promptTimer);
    gameState.promptTimer = null;
    gameState.promptVisible = false;
    gameState.activePromptId = null;
    hideToast();
    gameState.pendingAction = null;
  }

  function showInvestigationPrompt(promptId, text) {
    clearInvestigationPrompt();
    gameState.activePromptId = promptId;
    gameState.promptVisible = true;
    el.systemToast.textContent = text;
    el.systemToast.className = "system-toast is-investigation-prompt";
    el.systemToast.hidden = false;
    gameState.promptTimer = global.setTimeout(clearInvestigationPrompt, INVESTIGATION_PROMPT_MS);
  }

  function showPanel({ eyebrow = "CASE FILE", title, content, contentNode, continueLabel = "继续", onContinue, isError = false }) {
    if (gameState.promptVisible) {
      clearInvestigationPrompt();
    }
    gameState.returnUiMode = gameState.currentUiMode;
    gameState.currentUiMode = "screen";
    el.gameStage.classList.remove("is-investigating");
    el.panelEyebrow.textContent = eyebrow;
    el.panelTitle.textContent = title;
    el.panelContent.replaceChildren();
    el.screenPanel.classList.toggle("is-feedback-error", isError);
    if (contentNode) el.panelContent.append(contentNode);
    else if (isError) appendBalancedPlainText(el.panelContent, content || "");
    else el.panelContent.textContent = content || "";
    el.panelContinue.textContent = continueLabel;
    gameState.panelContinue = onContinue;
    el.screenPanel.hidden = false;
    el.panelContinue.focus();
  }

  function closePanel() {
    el.screenPanel.hidden = true;
    el.screenPanel.classList.remove("is-feedback-error");
    gameState.panelContinue = null;
  }

  function continuePanel() {
    const callback = gameState.panelContinue;
    closePanel();
    if (callback) callback();
  }

  function textScreen(textId, options = {}) {
    const item = systemText(textId);
    showPanel({ eyebrow: options.eyebrow || item.uiType.replaceAll("_", " ").toUpperCase(), title: options.title || scene().name, content: item.text, continueLabel: options.continueLabel, onContinue: options.onContinue });
  }

  function enterScene(sceneId) {
    const target = data.scenes[sceneId];
    if (!target) return finishGame();
    clearScheduledTimers();
    gameState.asyncSequenceId += 1;
    if (gameState.promptVisible) clearInvestigationPrompt();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    gameState.wrongTokenIndices = [];
    gameState.currentSceneId = sceneId;
    gameState.currentNodeId = target.entryNodeId;
    gameState.currentDialoguePage = 0;
    gameState.inputLocked = false;
    gameState.activeInvestigationFlowId = null;
    gameState.investigationQueue = [];
    closePanel();
    el.evidenceOverlay.hidden = true;
    el.hotspotLayer.replaceChildren();
    flag(`visited:${sceneId}`);
    const entryNode = data.dialogueNodes[target.entryNodeId];
    renderSceneChrome(entryNode?.backgroundAssetId ? data.assets.backgrounds[entryNode.backgroundAssetId] : undefined);
    const entry = FLOW[sceneId]?.entry;
    const investigationEntry = entry === "returnCart" || entry === "displayCase" || entry === "catalog" || entry === "truthInvestigation";
    if (investigationEntry) setMode("investigation");
    else renderCharacters(entryNode);
    if (entry === "returnCart") return startReturnCartInvestigation();
    if (entry === "displayCase") return startDisplayCaseInvestigation();
    if (entry === "catalog") return showCatalogScanner();
    if (entry === "testimony") return textScreen("screen_s05_testimony", { title: scene().name, onContinue: () => setNode(target.entryNodeId) });
    if (entry === "evidenceTrial") {
      el.speakerName.textContent = "系统";
      el.dialogueText.textContent = systemText("act_s06_submit_evidence").text;
      el.dialogueUi.classList.remove("speaker-narrator", "speaker-player");
      el.dialogueUi.classList.add("speaker-character");
      el.pageIndicator.textContent = "";
      renderCharacters(data.dialogueNodes[target.entryNodeId]);
      return renderChoice("choice_trial_evidence");
    }
    if (entry === "corpus") return startCorpusSequence();
    if (entry === "environment") return textScreen("screen_s10_environment", { title: scene().name, onContinue: () => setNode(target.entryNodeId) });
    if (entry === "catalogResult") return textScreen("screen_s11_catalog", { title: scene().name, onContinue: () => setNode(target.entryNodeId) });
    if (entry === "truthInvestigation") return startTruthInvestigation();
    setNode(target.entryNodeId);
  }

  function enterNextScene() {
    const nextId = nextSceneId();
    if (nextId) enterScene(nextId); else finishGame();
  }

  function advanceDialogue() {
    if (gameState.inputLocked || gameState.evidencePanelOpen || gameState.currentUiMode !== "dialogue") return;
    const now = global.performance.now();
    if (now - gameState.lastAdvanceAt < 220) return;
    gameState.lastAdvanceAt = now;
    if (gameState.currentDialoguePage < gameState.dialoguePages.length - 1) {
      gameState.currentDialoguePage += 1;
      renderDialogue();
      return;
    }
    const current = node();
    if (current.choiceGroupId && !gameState.completedChoiceGroupIds.includes(current.choiceGroupId)) {
      gameState.currentInteractionPhase = current.choicePhases?.choice || null;
      return renderChoice(current.choiceGroupId);
    }

    if (current.nodeId === "dlg_s09_003") return showJudgment("judgment_01_faxian", () => setNode("dlg_s09_004"));
    if (current.nodeId === "dlg_s13_002") return showDefinitions(beginCaseResultStage);
    if (current.nodeId === "dlg_s12_002") renderSceneChrome();

    if (current.nextNodeId) return setNode(current.nextNodeId);
    handleDialogueEnd(current.sceneId);
  }

  function handleDialogueEnd(sceneId) {
    flag(`dialogueComplete:${sceneId}`);
    if (sceneId === "scene_01_library_intro") return textScreen("sys_s01_investigate", { title: scene().name, onContinue: enterNextScene });
    if (sceneId === "scene_02_return_cart") return resumeReturnCartInvestigation();
    if (sceneId === "scene_03_display_case") return textScreen("screen_s03_environment", { title: scene().name, onContinue: enterNextScene });
    if (sceneId === "scene_04_catalog_terminal") return textScreen("sys_s04_complete", { title: scene().name, onContinue: enterNextScene });
    if (sceneId === "scene_06_evidence_submit") return enterNextScene();
    if (sceneId === "scene_07_dynamic_followup") return textScreen("sys_s07_pass", { title: scene().name, onContinue: enterNextScene });
    if (sceneId === "scene_08_corpus") return enterNextScene();
    if (sceneId === "scene_09_first_judgment") return enterNextScene();
    if (sceneId === "scene_10_quick_chajue") return showJudgment("judgment_02_chajue", enterNextScene);
    if (sceneId === "scene_11_quick_fajue") return showJudgment("judgment_03_fajue", enterNextScene);
    if (sceneId === "scene_12_truth") return enterNextScene();
    if (sceneId === "scene_13_ending") return finishGame();
    enterNextScene();
  }

  function renderHotspots(sceneId) {
    const fragment = document.createDocumentFragment();
    const hotspots = sceneId === "scene_02_return_cart"
      ? (data.scenes[sceneId].investigationHotspots || []).map((item) => ({ id: item.hotspotId, label: item.displayName, rect: item.rect, action: "returnCartItem" }))
      : (HOTSPOTS[sceneId] || []);
    for (const hotspot of hotspots) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hotspot";
      button.dataset.hotspotId = hotspot.id;
      button.dataset.action = hotspot.action;
      button.dataset.label = hotspot.label;
      button.setAttribute("aria-label", `调查：${hotspot.label}`);
      const [left, top, width, height] = hotspot.rect;
      Object.assign(button.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
      button.classList.toggle("is-investigated", gameState.investigatedHotspotIds.includes(hotspot.id));
      fragment.append(button);
    }
    el.hotspotLayer.replaceChildren(fragment);
    setMode("investigation");
    el.dialogueUi.hidden = true;
  }

  function startReturnCartInvestigation() {
    renderHotspots("scene_02_return_cart");
    if (!hasFlag("returnCart:explorationPromptShown")) {
      flag("returnCart:explorationPromptShown");
      showInvestigationPrompt("act_s02_explore", systemText("act_s02_click_blue_book").text);
    }
  }

  function resumeReturnCartInvestigation() {
    renderHotspots("scene_02_return_cart");
    requestReturnCartCompletion();
  }

  function startDisplayCaseInvestigation() {
    renderHotspots("scene_03_display_case");
    if (!hasFlag("displayCase:explorationPromptShown")) {
      flag("displayCase:explorationPromptShown");
      showInvestigationPrompt("act_s03_click_humidity", systemText("act_s03_click_humidity").text);
    }
  }

  function startTruthInvestigation() {
    renderSceneChrome(data.assets.backgrounds.bg_return_cart_closeup);
    renderHotspots("scene_12_truth");
    if (!hasFlag("truth:explorationPromptShown")) {
      flag("truth:explorationPromptShown");
      showInvestigationPrompt("act_s12_move_cart", systemText("act_s12_move_cart").text);
    }
  }

  function hasCompletedReturnCartInvestigation() {
    return RETURN_CART_REQUIRED_HOTSPOTS.every((id) => gameState.completedInvestigationFlows.includes(id));
  }

  function requestReturnCartCompletion() {
    if (gameState.currentSceneId !== "scene_02_return_cart" || !hasCompletedReturnCartInvestigation()) return false;
    if (!hasFlag("dialogueComplete:scene_02_return_cart")) return false;
    if (gameState.inputLocked || gameState.evidencePanelOpen || gameState.activeInvestigationFlowId) return false;
    if (gameState.investigationQueue.length || !el.screenPanel.hidden) return false;
    if (gameState.promptVisible) clearInvestigationPrompt();
    if (hasFlag("returnCart:completionPresented")) return true;
    flag("returnCart:completionPresented");
    textScreen("sys_s02_complete", { title: scene().name, onContinue: enterNextScene });
    return true;
  }

  function acquireEvidence(evidenceId, toastId, onClose) {
    if (gameState.acquiredEvidenceIds.includes(evidenceId)) return false;
    addUnique(gameState.acquiredEvidenceIds, evidenceId);
    gameState.selectedEvidenceId = evidenceId;
    gameState.inputLocked = true;
    renderEvidenceCount();
    showToast(systemText(toastId).text, { earned: true, duration: 900 });
    schedule(() => {
      hideToast();
      openEvidence(evidenceId, { onClose, automatic: true });
    }, 920);
    return true;
  }

  function returnCartHotspot(hotspotId) {
    return data.scenes.scene_02_return_cart.investigationHotspots.find((item) => item.hotspotId === hotspotId);
  }

  function finalizeReturnCartFlow(hotspot, firstTime) {
    if (firstTime) {
      addUnique(gameState.completedInvestigationFlows, hotspot.hotspotId);
      flag(`investigationFlowComplete:${hotspot.hotspotId}`);
      if (hotspot.afterBehavior === "record_locked_paper") flag("returnCart:paperChecked");
      if (hotspot.afterBehavior === "record_catalog_terminal") flag("returnCart:catalogChecked");
    }
    gameState.activeInvestigationFlowId = null;
    gameState.inputLocked = false;
    if (firstTime && hotspot.afterBehavior === "start_blue_book_dialogue" && !hasFlag("dialogueComplete:scene_02_return_cart")) {
      return setNode("dlg_s02_001");
    }
    resumeReturnCartInvestigation();
  }

  function continueReturnCartFlow(hotspot, firstTime) {
    setMode("investigation");
    el.dialogueUi.hidden = true;
    if (firstTime && hotspot.evidenceId && !gameState.acquiredEvidenceIds.includes(hotspot.evidenceId)) {
      acquireEvidence(hotspot.evidenceId, hotspot.evidenceToastTextId, () => finalizeReturnCartFlow(hotspot, true));
      return;
    }
    finalizeReturnCartFlow(hotspot, firstTime);
  }

  function beginReturnCartFlow(button) {
    if (gameState.activeInvestigationFlowId || gameState.inputLocked) return;
    const hotspot = returnCartHotspot(button.dataset.hotspotId);
    if (!hotspot) return console.error(`[WordsOnTrial] 未找到还书车热点数据：${button.dataset.hotspotId}`);
    if (gameState.promptVisible) clearInvestigationPrompt();
    const firstTime = !gameState.investigatedHotspotIds.includes(hotspot.hotspotId);
    addUnique(gameState.investigatedHotspotIds, hotspot.hotspotId);
    button.classList.add("is-investigated");
    flag(`investigated:${hotspot.hotspotId}`);
    gameState.activeInvestigationFlowId = hotspot.hotspotId;
    gameState.inputLocked = true;
    showPanel({
      eyebrow: "INVESTIGATION RECORD",
      title: hotspot.displayName,
      content: hotspot.description,
      continueLabel: firstTime ? "确认" : "返回现场",
      onContinue: () => continueReturnCartFlow(hotspot, firstTime),
    });
  }

  function investigate(button) {
    if (gameState.inputLocked || gameState.currentUiMode !== "investigation") return;
    if (gameState.currentSceneId === "scene_02_return_cart") return beginReturnCartFlow(button);
    if (gameState.promptVisible) clearInvestigationPrompt();
    const id = button.dataset.hotspotId;
    const firstTime = !gameState.investigatedHotspotIds.includes(id);
    addUnique(gameState.investigatedHotspotIds, id);
    button.classList.add("is-investigated");
    flag(`investigated:${id}`);
    const action = button.dataset.action;
    if (!firstTime) return showToast(`✓ ${button.dataset.label}`);
    if (action === "humidity") {
      flag("displayCase:humidity");
      schedule(() => setNode("dlg_s03_001"), 260);
    } else if (action === "transferRecord") {
      acquireEvidence("evidence_transfer_record", "sys_s12_get_record", () => textScreen("screen_s12_transfer_record", { title: scene().name, onContinue: () => setNode("dlg_s12_001") }));
      flag("truth:recordFound");
    }
  }

  function showCatalogScanner() {
    const wrap = document.createElement("div");
    wrap.className = "data-grid";
    const item = data.evidence.evidence_blue_book;
    const card = document.createElement("div");
    card.className = "data-card";
    const title = document.createElement("h3"); title.textContent = item.displayName;
    const description = document.createElement("p"); description.textContent = item.description;
    card.append(title, description);
    const terminal = document.createElement("div"); terminal.className = "data-card";
    const terminalTitle = document.createElement("h3"); terminalTitle.textContent = scene().location;
    const hint = document.createElement("p"); hint.textContent = systemText("act_s04_drag_book").text;
    terminal.append(terminalTitle, hint); wrap.append(card, terminal);
    showPanel({ eyebrow: "CATALOG SCAN", title: scene().name, contentNode: wrap, continueLabel: "扫描证据", onContinue: () => {
      if (!gameState.acquiredEvidenceIds.includes("evidence_blue_book")) { showToast("目前没有可扫描的证据。", { error: true }); return showCatalogScanner(); }
      flag("catalog:scanned");
      startCatalogScanSequence();
    }});
  }

  async function startCatalogScanSequence() {
    const sequenceId = await showTimedSequencePrompt(systemText("screen_s04_scanning").text, 1100);
    if (sequenceId !== gameState.asyncSequenceId || gameState.currentSceneId !== "scene_04_catalog_terminal") return;
    textScreen("screen_s04_catalog_result", { title: scene().name, onContinue: () => setNode("dlg_s04_001") });
  }

  function renderChoice(groupId) {
    if (gameState.promptVisible) clearInvestigationPrompt();
    const group = data.choiceGroups[groupId];
    if (!group) return console.error(`[WordsOnTrial] 找不到选项组 ${groupId}`);
    if (gameState.activeChoiceGroupId !== groupId) gameState.wrongTokenIndices = [];
    gameState.activeChoiceGroupId = groupId;
    gameState.inputLocked = false;
    gameState.choiceActivationAt = global.performance.now() + 260;
    setMode("choice");
    gameState.activeChoiceGroupId = groupId;
    el.choiceType.textContent = group.choiceType.replace("word_click", "证词选词").replace("evidence_submit", "证据提交").replace("single_choice", "三选一辩词");
    el.choicePrompt.textContent = group.prompt;
    el.choiceOptions.replaceChildren();
    el.choiceHelp.textContent = group.choiceType === "evidence_submit" ? "仅可提交已经取得的证据" : "";
    if (group.choiceType === "word_click") renderWordChoice(group);
    else if (group.choiceType === "evidence_submit") renderEvidenceChoice(group);
    else renderSingleChoice(group);
    schedule(() => el.choiceOptions.querySelector("button")?.focus(), 270);
  }

  function renderWordChoice(group) {
    const line = document.createElement("p"); line.className = "word-testimony";
    group.selectableTokens.forEach((token, index) => {
      const target = document.createElement("button");
      target.type = "button";
      target.className = "word-token";
      target.dataset.tokenIndex = String(index);
      target.textContent = token;
      target.setAttribute("aria-label", `选择词语：${token}`);
      if (gameState.wrongTokenIndices.includes(index)) target.classList.add("is-incorrect");
      line.append(target);
    });
    const punctuation = document.createElement("span");
    punctuation.className = "word-punctuation";
    punctuation.textContent = group.punctuation || "";
    line.append(punctuation);
    const feedback = document.createElement("p");
    feedback.className = "word-feedback";
    feedback.setAttribute("role", "status");
    feedback.hidden = true;
    el.choiceOptions.append(line, feedback);
  }

  function chooseWordToken(group, tokenIndex, button) {
    if (gameState.inputLocked || global.performance.now() < gameState.choiceActivationAt || !Number.isInteger(tokenIndex)) return;
    const feedback = el.choiceOptions.querySelector(".word-feedback");
    if (tokenIndex !== group.correctTokenIndex) {
      addUnique(gameState.wrongTokenIndices, tokenIndex);
      button.classList.add("is-incorrect");
      feedback.className = "word-feedback is-error";
      feedback.hidden = false;
      appendBalancedPlainText(feedback, group.wrongFeedback);
      return;
    }
    gameState.inputLocked = true;
    button.classList.add("is-correct");
    feedback.className = "word-feedback is-correct";
    feedback.hidden = false;
    appendBalancedPlainText(feedback, group.correctFeedback);
    const option = group.options.find((entry) => entry.isCorrect) || group.options[0];
    schedule(() => presentChoiceFeedback(group, option), 520);
  }

  function renderEvidenceChoice(group) {
    const wrap = document.createElement("div"); wrap.className = "evidence-submit-options";
    for (const evidenceId of gameState.acquiredEvidenceIds) {
      const evidence = data.evidence[evidenceId];
      const option = group.options.find((candidate) => candidate.text === evidence.displayName);
      if (!option) continue;
      const button = document.createElement("button"); button.type = "button"; button.className = "submit-evidence-card"; button.dataset.optionId = option.optionId;
      button.setAttribute("aria-label", `提交证据：${evidence.displayName}`);
      const frame = document.createElement("img"); frame.className = "frame"; frame.src = data.assets.ui.evidenceCardFrameFilled; frame.alt = "";
      const thumbSafe = document.createElement("span"); thumbSafe.className = "submit-evidence-thumb-safe";
      const thumb = document.createElement("img"); thumb.className = "thumb"; thumb.src = evidence.imageAssetPath; thumb.alt = "";
      thumbSafe.append(thumb);
      const label = document.createElement("span"); label.className = "label"; label.textContent = evidence.displayName;
      button.append(frame, thumbSafe, label); wrap.append(button);
    }
    if (!wrap.children.length) {
      const empty = document.createElement("p"); empty.className = "word-testimony"; empty.textContent = "目前还没有取得可提交的证据。"; wrap.append(empty);
    }
    el.choiceOptions.append(wrap);
  }

  function renderSingleChoice(group) {
    for (const [index, option] of [...group.options].sort((a, b) => a.order - b.order).entries()) {
      const button = document.createElement("button"); button.type = "button"; button.className = "choice-option"; button.dataset.optionId = option.optionId;
      const letterBox = document.createElement("span"); letterBox.className = "choice-letter-box";
      const letter = document.createElement("span"); letter.className = "choice-letter"; letter.textContent = String.fromCharCode(65 + index);
      letterBox.append(letter);
      const label = document.createElement("span"); label.className = "choice-label"; appendBalancedPlainText(label, option.text);
      const mark = document.createElement("span"); mark.className = "choice-mark";
      button.append(letterBox, label, mark); el.choiceOptions.append(button);
    }
  }

  function choose(optionId, button) {
    if (gameState.inputLocked || global.performance.now() < gameState.choiceActivationAt || !gameState.activeChoiceGroupId) return;
    const group = data.choiceGroups[gameState.activeChoiceGroupId];
    const option = group.options.find((entry) => entry.optionId === optionId);
    if (!option) return;
    gameState.inputLocked = true;
    el.choiceOptions.querySelectorAll("button").forEach((item) => { item.disabled = true; });
    button.classList.add("is-selected");
    schedule(() => {
      button.classList.remove("is-selected");
      button.classList.add(option.isCorrect ? "is-correct" : "is-incorrect");
      const mark = button.querySelector(".choice-mark"); if (mark) mark.textContent = option.isCorrect ? "✓" : "×";
      schedule(() => presentChoiceFeedback(group, option), CHOICE_REVEAL_MS);
    }, 150);
  }

  function presentChoiceFeedback(group, option) {
    const feedback = option.feedbackTextId ? systemText(option.feedbackTextId) : null;
    const navigate = () => completeChoice(group, option);
    if (!feedback) return navigate();
    showPanel({ eyebrow: option.isCorrect ? "VALIDATED" : "RETRY", title: feedback.speakerId ? data.characters[feedback.speakerId].displayName : scene().name, content: feedback.text, continueLabel: option.isCorrect ? "继续" : "重新判断", onContinue: navigate, isError: !option.isCorrect });
  }

  function completeChoice(group, option) {
    gameState.inputLocked = false;
    if (!option.isCorrect) {
      gameState.currentNodeId = option.failureNextNodeId || gameState.currentNodeId;
      return renderChoice(group.choiceGroupId);
    }
    addUnique(gameState.completedChoiceGroupIds, group.choiceGroupId);
    gameState.currentInteractionPhase = null;
    flag(`choiceComplete:${group.choiceGroupId}`);
    if (group.choiceGroupId === "choice_trial_word") return enterScene("scene_06_evidence_submit");
    const targetNodeId = option.successNextNodeId;
    if (targetNodeId) return setNode(targetNodeId);
    enterNextScene();
  }

  function showCorpusResults() {
    const grid = document.createElement("div"); grid.className = "data-grid";
    for (const corpus of Object.values(data.corpus)) {
      const card = document.createElement("article"); card.className = "data-card";
      const title = document.createElement("h3"); title.textContent = corpus.corpusId;
      const sentence = document.createElement("p"); sentence.className = "corpus-sentence";
      appendStructuredEmphasis(sentence, corpus.sentence, corpus.emphasisTokens);
      const detail = document.createElement("p"); detail.textContent = `${corpus.objectType}｜${corpus.informationMethod}｜${corpus.contextFeature}`;
      const reviewed = document.createElement("p"); reviewed.textContent = corpus.teacherReviewed ? "✓ 教师审核" : "";
      card.append(title, sentence, detail, reviewed); grid.append(card);
    }
    const rule = document.createElement("article"); rule.className = "data-card"; rule.style.gridColumn = "1 / -1";
    const ruleTitle = document.createElement("h3"); ruleTitle.textContent = systemText("sys_s08_reviewed").text;
    const ruleText = document.createElement("p"); ruleText.textContent = systemText("screen_s08_rule").text;
    rule.append(ruleTitle, ruleText); grid.append(rule);
    showPanel({ eyebrow: "TEACHER-REVIEWED CORPUS", title: scene().name, contentNode: grid, onContinue: () => setNode(scene().entryNodeId) });
  }

  function showTimedSequencePrompt(text, duration = 1100) {
    const sequenceId = ++gameState.asyncSequenceId;
    gameState.inputLocked = true;
    gameState.currentUiMode = "sequencePrompt";
    el.dialogueUi.hidden = true;
    el.choiceLayer.hidden = true;
    el.hotspotLayer.hidden = true;
    hideAllCharacters();
    el.systemToast.textContent = text;
    el.systemToast.className = "system-toast is-sequence-prompt";
    el.systemToast.hidden = false;
    return new Promise((resolve) => {
      schedule(() => {
        if (sequenceId !== gameState.asyncSequenceId) return;
        el.systemToast.classList.add("is-leaving");
        schedule(() => {
          if (sequenceId !== gameState.asyncSequenceId) return;
          hideToast();
          el.systemToast.classList.remove("is-leaving");
          gameState.inputLocked = false;
          resolve(sequenceId);
        }, 190);
      }, duration);
    });
  }

  async function startCorpusSequence() {
    const sequenceId = await showTimedSequencePrompt(systemText("sys_s08_searching").text, 1100);
    if (sequenceId !== gameState.asyncSequenceId || gameState.currentSceneId !== "scene_08_corpus") return;
    showCorpusResults();
  }

  function showJudgment(judgmentId, onContinue) {
    const judgment = data.judgments[judgmentId];
    const article = document.createElement("article"); article.className = "judgment-text";
    const result = document.createElement("span"); result.className = "judgment-result"; result.textContent = judgment.result;
    const original = document.createElement("p"); original.append("原句：");
    const originalText = document.createElement("span"); appendStructuredEmphasis(originalText, judgment.originalText, judgment.originalEmphasisTokens); original.append(originalText);
    const recommended = document.createElement("p"); recommended.append("判决：");
    const recommendedText = document.createElement("span"); appendStructuredEmphasis(recommendedText, judgment.recommendedText, judgment.recommendedEmphasisTokens); recommended.append(recommendedText);
    const reasoning = document.createElement("p"); appendStructuredEmphasis(reasoning, judgment.reasoning, judgment.reasoningEmphasisTokens);
    article.append(result, original, recommended, reasoning);
    if (judgment.acceptableAlternative) {
      const alt = document.createElement("p"); alt.append("可接受表达：");
      const altText = document.createElement("span"); appendStructuredEmphasis(altText, judgment.acceptableAlternative, judgment.alternativeEmphasisTokens); alt.append(altText);
      article.append(alt);
    }
    showPanel({ eyebrow: "SEMANTIC JUDGMENT", title: "词义判决书", contentNode: article, onContinue });
  }

  function showDefinitions(onContinue) {
    gameState.endingStage = "three_word_comparison";
    hideAllCharacters();
    el.dialogueUi.hidden = true;
    const grid = document.createElement("div"); grid.className = "definition-grid";
    for (const entry of data.ending.filter((item) => item.category === "definition").sort((a, b) => a.order - b.order)) {
      const card = document.createElement("article"); card.className = "data-card";
      const title = document.createElement("h3"); title.textContent = entry.title;
      const text = document.createElement("p"); text.textContent = entry.text;
      card.append(title, text); grid.append(card);
    }
    const takeaway = data.ending.find((item) => item.category === "takeaway");
    if (takeaway) {
      const card = document.createElement("article"); card.className = "data-card definition-takeaway";
      const title = document.createElement("h3"); title.textContent = takeaway.title;
      const text = document.createElement("p"); text.textContent = takeaway.text;
      card.append(title, text); grid.append(card);
    }
    showPanel({ eyebrow: "MEANING SUMMARY", title: scene().name, contentNode: grid, onContinue });
  }

  function beginCaseResultStage() {
    clearScheduledTimers();
    gameState.asyncSequenceId += 1;
    gameState.endingStage = "case_result_waiting_for_click";
    gameState.inputLocked = true;
    gameState.currentUiMode = "caseResultWait";
    gameState.achievementRevealed = false;
    closePanel();
    clearInvestigationPrompt();
    hideToast();
    hideAllCharacters();
    el.dialogueUi.hidden = true;
    el.choiceLayer.hidden = true;
    el.hotspotLayer.hidden = true;
    renderSceneChrome(data.assets.backgrounds.bg_case_result);
    el.caseResultAdvance.hidden = false;
    el.caseResultAdvance.disabled = true;
    schedule(() => {
      if (gameState.endingStage !== "case_result_waiting_for_click") return;
      gameState.inputLocked = false;
      el.caseResultAdvance.disabled = false;
      el.caseResultAdvance.focus();
    }, 260);
  }

  function revealAchievement() {
    if (gameState.endingStage !== "case_result_waiting_for_click" || gameState.inputLocked || gameState.achievementRevealed) return;
    gameState.achievementRevealed = true;
    gameState.endingStage = "achievement_revealed";
    el.caseResultAdvance.hidden = true;
    finishGame();
  }

  function finishGame() {
    flag("gameComplete");
    gameState.endingStage = "achievement_revealed";
    setMode("ending");
    hideAllCharacters();
    el.dialogueUi.hidden = true;
    const wrap = document.createElement("div");
    const result = data.ending.find((item) => item.category === "result");
    const achievement = data.ending.find((item) => item.category === "achievement");
    const takeaway = data.ending.find((item) => item.category === "takeaway");
    const title = document.createElement("p");
    const resultTitle = document.createElement("strong"); resultTitle.textContent = result.title;
    title.append(resultTitle, document.createElement("br"), document.createTextNode(result.text));
    const rule = document.createElement("p"); rule.textContent = `${takeaway.title}：${takeaway.text}`;
    const badge = document.createElement("section"); badge.className = "achievement-card";
    const trophy = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    trophy.setAttribute("class", "achievement-trophy"); trophy.setAttribute("viewBox", "0 0 64 64"); trophy.setAttribute("aria-hidden", "true"); trophy.setAttribute("focusable", "false");
    const cup = document.createElementNS("http://www.w3.org/2000/svg", "path");
    cup.setAttribute("d", "M18 8h28v10c0 11-5.8 19.4-14 22-8.2-2.6-14-11-14-22V8Zm-7 5h7v7c0 6.2 2.4 11.2 6.6 14.4C16.7 33.4 11 27 11 18v-5Zm35 0h7v5c0 9-5.7 15.4-13.6 16.4C43.6 31.2 46 26.2 46 20v-7ZM28 40h8v9h10v7H18v-7h10v-9Z");
    trophy.append(cup);
    const badgeCopy = document.createElement("div"); badgeCopy.className = "achievement-copy";
    const badgeKicker = document.createElement("p"); badgeKicker.className = "achievement-kicker"; badgeKicker.textContent = "获得成就";
    const badgeTitle = document.createElement("h3"); badgeTitle.textContent = achievement.title;
    const badgeText = document.createElement("p"); badgeText.className = "achievement-description"; badgeText.textContent = achievement.text;
    badgeCopy.append(badgeKicker, badgeTitle, badgeText); badge.append(trophy, badgeCopy); wrap.append(title, rule, badge);
    showPanel({ eyebrow: "CASE CLOSED", title: result.title, contentNode: wrap, continueLabel: "重新开始", onContinue: restartGame });
  }

  function renderEvidenceCount() { el.evidenceCount.textContent = String(gameState.acquiredEvidenceIds.length); }

  function renderEvidencePanel() {
    const ids = gameState.acquiredEvidenceIds;
    el.evidenceEmpty.hidden = ids.length > 0;
    el.evidenceDetail.hidden = ids.length === 0;
    el.evidenceList.replaceChildren();
    if (!ids.length) return;
    if (!ids.includes(gameState.selectedEvidenceId)) gameState.selectedEvidenceId = ids[0];
    for (const evidenceId of ids) {
      const evidence = data.evidence[evidenceId];
      const button = document.createElement("button"); button.type = "button"; button.className = "evidence-option"; button.dataset.evidenceId = evidenceId;
      button.setAttribute("aria-label", `查看证据：${evidence.displayName}`);
      const frame = document.createElement("img"); frame.className = "evidence-option-frame"; frame.src = data.assets.ui.evidenceCardFrameFilled; frame.alt = "";
      const thumb = document.createElement("img"); thumb.className = "evidence-option-thumb"; thumb.src = evidence.imageAssetPath; thumb.alt = "";
      const name = document.createElement("span"); name.className = "evidence-option-name"; name.textContent = evidence.displayName;
      button.append(frame, thumb, name); el.evidenceList.append(button);
    }
    selectEvidence(gameState.selectedEvidenceId);
  }

  function selectEvidence(evidenceId) {
    if (!gameState.acquiredEvidenceIds.includes(evidenceId)) return;
    const evidence = data.evidence[evidenceId];
    gameState.selectedEvidenceId = evidenceId;
    setImage(el.evidencePreview, evidence.imageAssetPath, evidence.thumbnailAssetId);
    el.evidencePreview.alt = evidence.displayName;
    el.evidenceIndex.textContent = `EVIDENCE ${String(gameState.acquiredEvidenceIds.indexOf(evidenceId) + 1).padStart(2, "0")}`;
    el.evidenceName.textContent = evidence.displayName;
    el.evidenceDescription.textContent = evidence.description;
    el.evidenceLocation.textContent = evidence.acquisitionDescription;
    el.evidencePurpose.textContent = evidence.purpose;
    el.evidenceTags.textContent = evidence.tags.join("｜");
    el.evidenceList.querySelectorAll(".evidence-option").forEach((button) => button.classList.toggle("is-selected", button.dataset.evidenceId === evidenceId));
  }

  function openEvidence(evidenceId, options = {}) {
    if (gameState.promptVisible) clearInvestigationPrompt();
    if (gameState.evidencePanelOpen || gameState.currentUiMode === "screen" || gameState.currentUiMode === "ending") return;
    if (gameState.inputLocked && !options.automatic) return;
    if (evidenceId && gameState.acquiredEvidenceIds.includes(evidenceId)) gameState.selectedEvidenceId = evidenceId;
    gameState.evidencePanelOpen = true;
    gameState.returnUiMode = gameState.currentUiMode;
    gameState.evidenceCloseCallback = options.onClose || null;
    el.gameStage.classList.remove("is-investigating");
    renderEvidencePanel();
    el.evidenceOverlay.hidden = false;
    el.evidenceEntry.setAttribute("aria-expanded", "true");
    el.evidenceClose.focus();
  }

  function closeEvidence() {
    if (!gameState.evidencePanelOpen) return;
    const onClose = gameState.evidenceCloseCallback;
    gameState.evidencePanelOpen = false;
    gameState.evidenceCloseCallback = null;
    gameState.inputLocked = false;
    el.evidenceOverlay.hidden = true;
    el.evidenceEntry.setAttribute("aria-expanded", "false");
    if (gameState.returnUiMode === "investigation") el.gameStage.classList.add("is-investigating");
    el.evidenceEntry.focus();
    if (onClose) schedule(onClose, 0);
    else if (gameState.currentSceneId === "scene_02_return_cart") schedule(requestReturnCartCompletion, 0);
  }

  function restartGame() {
    global.clearTimeout(gameState.toastTimer);
    clearScheduledTimers();
    clearInvestigationPrompt();
    Object.assign(gameState, {
      currentSceneId: data.runtime.startSceneId, currentNodeId: data.runtime.startNodeId, currentDialoguePage: 0, dialoguePages: [],
      acquiredEvidenceIds: [], investigatedHotspotIds: [], completedChoiceGroupIds: [], selectedEvidenceId: null, sceneFlags: {},
      currentUiMode: "transition", evidencePanelOpen: false, inputLocked: false, returnUiMode: null, activeChoiceGroupId: null,
      panelContinue: null, evidenceCloseCallback: null, toastTimer: null, promptTimer: null, activePromptId: null,
      promptVisible: false, pendingAction: null, lastAdvanceAt: -Infinity, previousSpeakerId: null, previousSceneId: null,
      currentExpressionByCharacter: {}, wrongTokenIndices: [],
      completedInvestigationFlows: [], activeInvestigationFlowId: null, investigationQueue: [], asyncSequenceId: gameState.asyncSequenceId + 1,
      endingStage: null, achievementRevealed: false,
      currentInteractionPhase: null, choiceActivationAt: -Infinity,
    });
    closePanel(); el.caseResultAdvance.hidden = true; el.evidenceOverlay.hidden = true; el.systemToast.hidden = true; renderEvidenceCount(); enterScene(data.runtime.startSceneId);
  }

  function handleKeydown(event) {
    if (event.repeat) return;
    if (event.code === "KeyE") { event.preventDefault(); gameState.evidencePanelOpen ? closeEvidence() : openEvidence(); return; }
    if (gameState.evidencePanelOpen) { if (event.code === "Escape") { event.preventDefault(); closeEvidence(); } return; }
    if (!el.screenPanel.hidden) { if (event.code === "Escape" && gameState.currentUiMode !== "ending") return; if (event.code === "Enter" || event.code === "Space") { event.preventDefault(); continuePanel(); } return; }
    if (gameState.currentUiMode === "choice" && (event.code === "Enter" || event.code === "Space")) {
      const activeChoice = document.activeElement?.closest?.("#choice-options button:not(:disabled)");
      if (activeChoice) {
        event.preventDefault();
        activeChoice.click();
      }
      return;
    }
    if (gameState.currentUiMode === "choice" && ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
      const buttons = [...el.choiceOptions.querySelectorAll("button:not(:disabled)")];
      const current = Math.max(0, buttons.indexOf(document.activeElement));
      const delta = event.code === "ArrowDown" || event.code === "ArrowRight" ? 1 : -1;
      buttons[(current + delta + buttons.length) % buttons.length]?.focus();
      return;
    }
    if (gameState.currentUiMode === "dialogue" && (event.code === "Enter" || event.code === "Space")) { event.preventDefault(); advanceDialogue(); }
  }

  function bindEvents() {
    global.addEventListener("resize", resizeStage, { passive: true });
    document.addEventListener("keydown", handleKeydown);
    el.dialogueAdvance.addEventListener("click", advanceDialogue);
    el.evidenceEntry.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); openEvidence(); });
    el.evidenceClose.addEventListener("click", closeEvidence);
    el.evidenceList.addEventListener("click", (event) => { const button = event.target.closest(".evidence-option"); if (button) selectEvidence(button.dataset.evidenceId); });
    el.panelContinue.addEventListener("click", continuePanel);
    el.restartButton.addEventListener("click", restartGame);
    el.caseResultAdvance.addEventListener("click", revealAchievement);
    el.hotspotLayer.addEventListener("click", (event) => { const button = event.target.closest(".hotspot"); if (button) investigate(button); });
    el.hotspotLayer.addEventListener("pointerover", (event) => { const button = event.target.closest(".hotspot"); if (!button) return; el.investigationCursor.classList.toggle("is-done", button.classList.contains("is-investigated")); el.investigationCursor.classList.toggle("is-valid", !button.classList.contains("is-investigated")); });
    el.hotspotLayer.addEventListener("pointerout", () => { el.investigationCursor.classList.remove("is-valid", "is-done"); });
    el.gameStage.addEventListener("pointermove", (event) => {
      if (gameState.currentUiMode !== "investigation" || gameState.evidencePanelOpen) return;
      const rect = el.gameStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / (rect.width / DESIGN_WIDTH);
      const y = (event.clientY - rect.top) / (rect.height / DESIGN_HEIGHT);
      el.investigationCursor.style.left = `${x}px`; el.investigationCursor.style.top = `${y}px`;
    });
    el.choiceOptions.addEventListener("click", (event) => {
      const wordButton = event.target.closest("button[data-token-index]");
      if (wordButton) {
        const group = data.choiceGroups[gameState.activeChoiceGroupId];
        if (group?.choiceType === "word_click") chooseWordToken(group, Number(wordButton.dataset.tokenIndex), wordButton);
        return;
      }
      const button = event.target.closest("button[data-option-id]");
      if (button) choose(button.dataset.optionId, button);
    });
  }

  function validateRuntimeData() {
    for (const sceneId of sceneIds) if (!data.scenes[sceneId]) console.error(`[WordsOnTrial] 场景顺序引用缺失：${sceneId}`);
    for (const [nodeId, item] of Object.entries(data.dialogueNodes)) {
      if (item.nextNodeId && !data.dialogueNodes[item.nextNodeId]) console.error(`[WordsOnTrial] ${nodeId} 的 nextNodeId 无效：${item.nextNodeId}`);
      if (item.choiceGroupId && !data.choiceGroups[item.choiceGroupId]) console.error(`[WordsOnTrial] ${nodeId} 的 choiceGroupId 无效：${item.choiceGroupId}`);
    }
  }

  function initialize() {
    validateRuntimeData(); resizeStage(); bindEvents(); renderEvidenceCount(); el.evidenceEntry.setAttribute("aria-expanded", "false");
    global.__WOT_DEMO__ = { state: gameState, data, restart: restartGame, enterScene, snapshot: () => JSON.parse(JSON.stringify(gameState)) };
    enterScene(data.runtime.startSceneId);
  }

  initialize();
})(window, document);
