(function registerWordsOnTrialGameData(global) {
  "use strict";
  global.WordsOnTrialGameData = {
  "meta": {
    "gameId": "words-on-trial-library-secret",
    "title": "词义审判：图书馆里的秘密",
    "language": "zh-CN",
    "runtimeTarget": "web",
    "schemaVersion": "1.0.0",
    "contentVersion": "1.1",
    "generatedAt": "2026-08-31",
    "sourceWorkbook": "demo_content_master.xlsx",
    "sourceSha256": "bfa5f2dfa090313e9b811bffa754fb1ee3c0b70c14ab5703fe3561148f4cb31f"
  },
  "runtime": {
    "designResolution": {
      "width": 1920,
      "height": 1080
    },
    "startSceneId": "scene_01_library_intro",
    "startNodeId": "dlg_s01_001",
    "sceneOrder": [
      "scene_01_library_intro",
      "scene_02_return_cart",
      "scene_03_display_case",
      "scene_04_catalog_terminal",
      "scene_05_trial_entry",
      "scene_06_evidence_submit",
      "scene_07_dynamic_followup",
      "scene_08_corpus",
      "scene_09_first_judgment",
      "scene_10_quick_chajue",
      "scene_11_quick_fajue",
      "scene_12_truth",
      "scene_13_ending"
    ],
    "controls": {
      "advance": [
        "pointer",
        "Enter",
        "Space"
      ],
      "evidence": "KeyE",
      "cancel": "Escape"
    },
    "supportedChoiceTypes": [
      "word_click",
      "evidence_submit",
      "single_choice"
    ]
  },
  "assets": {
    "backgrounds": {
      "bg_library_main_evening": {
        "path": "./public/assets/backgrounds/library_main.png",
        "status": "ready"
      },
      "bg_return_cart_closeup": {
        "path": "./public/assets/backgrounds/return_cart_investigation.png",
        "status": "ready"
      },
      "bg_display_case_closeup": {
        "path": "./public/assets/backgrounds/display_case_closeup.png",
        "status": "ready"
      },
      "bg_catalog_terminal": {
        "path": "./public/assets/backgrounds/catalog_terminal.png",
        "status": "ready"
      },
      "bg_word_trial_court": {
        "path": "./public/assets/backgrounds/word_trial_court.png",
        "status": "ready"
      },
      "bg_word_trial_shelf_variant": {
        "path": "./public/assets/backgrounds/court_shelf_followup.png",
        "status": "ready"
      },
      "bg_word_trial_corpus_panel": {
        "path": "./public/assets/backgrounds/word_trial_court.png",
        "status": "fallback"
      },
      "bg_word_trial_environment_panel": {
        "path": "./public/assets/backgrounds/word_trial_court.png",
        "status": "fallback"
      },
      "bg_word_trial_catalog_panel": {
        "path": "./public/assets/backgrounds/word_trial_court.png",
        "status": "fallback"
      },
      "bg_restoration_room": {
        "path": "./public/assets/backgrounds/restoration_room.png",
        "status": "ready"
      },
      "bg_case_result": {
        "path": "./public/assets/backgrounds/case_result.png",
        "status": "ready"
      }
    },
    "ui": {
      "dialogueBox": "./assets/ui/dialogue_box.png",
      "choiceOptionDefault": "./assets/ui/choice-option-default.png",
      "choiceOptionHover": "./assets/ui/choice-option-hover.png",
      "choiceOptionSelected": "./assets/ui/choice-option-selected.png",
      "choiceOptionCorrect": "./assets/ui/choice-option-correct.png",
      "choiceOptionIncorrect": "./assets/ui/choice-option-incorrect.png",
      "evidenceCardFrame": "./assets/ui/evidence-card-frame.png",
      "evidenceCardFrameFilled": "./assets/ui/evidence-card-frame-filled.png",
      "evidenceDetailPanel": "./assets/ui/evidence-detail-panel.png"
    }
  },
  "scenes": {
    "scene_01_library_intro": {
      "sceneId": "scene_01_library_intro",
      "order": 1,
      "name": "手稿失踪",
      "startTime": "0:00",
      "endTime": "0:25",
      "location": "云川大学图书馆校史阅览室·傍晚",
      "uiMode": "对话/案件导入",
      "backgroundAssetId": "bg_library_main_evening",
      "objective": "建立手稿失踪事件与三处错误用词",
      "entryConditionDescription": "Demo开始",
      "exitConditionDescription": "显示现场调查提示",
      "sourceRef": "demo脚本_重整版_v2.docx｜第一幕",
      "entryNodeId": "dlg_s01_001",
      "dialogueNodeIds": [
        "dlg_s01_001",
        "dlg_s01_002",
        "dlg_s01_003",
        "dlg_s01_004",
        "dlg_s01_005",
        "dlg_s01_006",
        "dlg_s01_007",
        "dlg_s01_008"
      ],
      "systemTextIds": [
        "sys_s01_investigate"
      ]
    },
    "scene_02_return_cart": {
      "sceneId": "scene_02_return_cart",
      "order": 2,
      "name": "调查还书车",
      "startTime": "0:25",
      "endTime": "0:50",
      "location": "校史阅览室·还书车近景",
      "uiMode": "调查热点",
      "backgroundAssetId": "bg_return_cart_closeup",
      "objective": "调查阅览室现场的四项线索",
      "entryConditionDescription": "进入现场调查",
      "exitConditionDescription": "蓝色新书、借阅卡、纸角和目录终端均已调查",
      "sourceRef": "demo脚本_重整版_v2.docx｜第二幕",
      "entryNodeId": "dlg_s02_001",
      "dialogueNodeIds": [
        "dlg_s02_001",
        "dlg_s02_002",
        "dlg_s02_003",
        "dlg_s02_004",
        "dlg_s02_005"
      ],
      "systemTextIds": [
        "act_s02_click_blue_book",
        "sys_s02_get_blue_book",
        "act_s02_click_borrow_card",
        "sys_s02_get_borrow_card",
        "act_s02_click_paper",
        "sys_s02_paper_locked",
        "sys_s02_complete"
      ],
      "investigationHotspots": [
        {
          "hotspotId": "return_cart_blue_book",
          "displayName": "蓝色新书",
          "initiallyInvestigated": false,
          "grantsEvidence": true,
          "rect": [198, 570, 148, 64],
          "description": "一本放在还书车最上层、封面醒目的新书。",
          "evidenceId": "evidence_blue_book",
          "evidenceToastTextId": "sys_s02_get_blue_book",
          "afterBehavior": "start_blue_book_dialogue"
        },
        {
          "hotspotId": "return_cart_library_card",
          "displayName": "安娜借阅卡",
          "initiallyInvestigated": false,
          "grantsEvidence": true,
          "rect": [417, 586, 62, 34],
          "description": "证明安娜到过图书馆，但不能说明她如何注意到蓝色新书。",
          "evidenceId": "evidence_borrow_card",
          "evidenceToastTextId": "sys_s02_get_borrow_card",
          "afterBehavior": "return_to_investigation"
        },
        {
          "hotspotId": "return_cart_paper_corner",
          "displayName": "车轮下的纸角",
          "initiallyInvestigated": false,
          "grantsEvidence": false,
          "rect": [140, 914, 137, 66],
          "description": "纸张被车轮压住，暂时无法取出。完成词义审判后可以继续调查。",
          "evidenceId": null,
          "afterBehavior": "record_locked_paper"
        },
        {
          "hotspotId": "return_cart_catalog_terminal",
          "displayName": "目录查询终端",
          "initiallyInvestigated": false,
          "grantsEvidence": false,
          "rect": [1352, 404, 318, 247],
          "description": "目录查询终端仍在运行，可以用于检索馆藏编号与借阅信息。",
          "evidenceId": null,
          "afterBehavior": "record_catalog_terminal"
        }
      ]
    },
    "scene_03_display_case": {
      "sceneId": "scene_03_display_case",
      "order": 3,
      "name": "调查恒温展柜",
      "startTime": "0:50",
      "endTime": "1:10",
      "location": "校史阅览室·恒温展柜近景",
      "uiMode": "调查热点",
      "backgroundAssetId": "bg_display_case_closeup",
      "objective": "记录湿度、警报、异响和异常安静",
      "entryConditionDescription": "完成还书车调查",
      "exitConditionDescription": "环境信息记录完成",
      "sourceRef": "demo脚本_重整版_v2.docx｜第三幕",
      "entryNodeId": "dlg_s03_001",
      "dialogueNodeIds": [
        "dlg_s03_001",
        "dlg_s03_002",
        "dlg_s03_003",
        "dlg_s03_004",
        "dlg_s03_005",
        "dlg_s03_006",
        "dlg_s03_007",
        "dlg_s03_008",
        "dlg_s03_009",
        "dlg_s03_010"
      ],
      "systemTextIds": [
        "act_s03_click_humidity",
        "screen_s03_environment"
      ]
    },
    "scene_04_catalog_terminal": {
      "sceneId": "scene_04_catalog_terminal",
      "order": 4,
      "name": "调查书目终端",
      "startTime": "1:10",
      "endTime": "1:35",
      "location": "图书馆·书目查询终端",
      "uiMode": "拖放扫描",
      "backgroundAssetId": "bg_catalog_terminal",
      "objective": "扫描蓝色新书并比较A071与M019",
      "entryConditionDescription": "已获得蓝色新书",
      "exitConditionDescription": "现场核对完成",
      "sourceRef": "demo脚本_重整版_v2.docx｜第四幕",
      "entryNodeId": "dlg_s04_001",
      "dialogueNodeIds": [
        "dlg_s04_001",
        "dlg_s04_002",
        "dlg_s04_003",
        "dlg_s04_004",
        "dlg_s04_005",
        "dlg_s04_006",
        "dlg_s04_007"
      ],
      "systemTextIds": [
        "act_s04_drag_book",
        "screen_s04_scanning",
        "screen_s04_catalog_result",
        "sys_s04_complete"
      ]
    },
    "scene_05_trial_entry": {
      "sceneId": "scene_05_trial_entry",
      "order": 5,
      "name": "进入词义审判",
      "startTime": "1:35",
      "endTime": "1:55",
      "location": "数字化词义审判庭",
      "uiMode": "证词选词",
      "backgroundAssetId": "bg_word_trial_court",
      "objective": "锁定证词中的争议词语“察觉”",
      "entryConditionDescription": "现场核对完成",
      "exitConditionDescription": "争议词语锁定",
      "sourceRef": "demo_script_master.docx｜第五幕",
      "entryNodeId": "dlg_s05_001",
      "dialogueNodeIds": [
        "dlg_s05_001",
        "dlg_s05_002"
      ],
      "systemTextIds": [
        "screen_s05_testimony",
        "sys_s05_word_locked"
      ]
    },
    "scene_06_evidence_submit": {
      "sceneId": "scene_06_evidence_submit",
      "order": 6,
      "name": "提交证据",
      "startTime": "1:55",
      "endTime": "2:20",
      "location": "数字化词义审判庭",
      "uiMode": "证据提交/辩词",
      "backgroundAssetId": "bg_word_trial_court",
      "objective": "提交蓝色新书并说明为什么使用“发现”",
      "entryConditionDescription": "争议词语锁定",
      "exitConditionDescription": "进入动态追问",
      "sourceRef": "demo_script_master.docx｜第六幕",
      "entryNodeId": "dlg_s06_001",
      "dialogueNodeIds": [
        "dlg_s06_001",
        "dlg_s06_002",
        "dlg_s06_003"
      ],
      "systemTextIds": [
        "act_s06_submit_evidence",
        "sys_s06_evidence_labels",
        "act_s06_argument",
        "err_s06_borrow_card",
        "err_s06_borrow_card_hint",
        "err_s06_argument_formality",
        "err_s06_argument_absolute_visual"
      ]
    },
    "scene_07_dynamic_followup": {
      "sceneId": "scene_07_dynamic_followup",
      "order": 7,
      "name": "动态追问",
      "startTime": "2:20",
      "endTime": "2:50",
      "location": "词义审判庭·书架变化场景",
      "uiMode": "动态问答",
      "backgroundAssetId": "bg_word_trial_shelf_variant",
      "objective": "区分直接发现具体物体与察觉隐藏情况",
      "entryConditionDescription": "第一轮辩词成立",
      "exitConditionDescription": "动态质询通过",
      "sourceRef": "demo_script_master.docx｜第七幕",
      "entryNodeId": "dlg_s07_001",
      "dialogueNodeIds": [
        "dlg_s07_001",
        "dlg_s07_002",
        "dlg_s07_003",
        "dlg_s07_004"
      ],
      "systemTextIds": [
        "act_s07_choose_usage",
        "sys_s07_pass",
        "err_s07_condition_object_only",
        "err_s07_condition_synonym",
        "err_s07_usage_discover",
        "err_s07_usage_realize"
      ]
    },
    "scene_08_corpus": {
      "sceneId": "scene_08_corpus",
      "order": 8,
      "name": "教师审核语料检索",
      "startTime": "2:50",
      "endTime": "3:10",
      "location": "词义审判庭·语料面板",
      "uiMode": "语料展示",
      "backgroundAssetId": "bg_word_trial_corpus_panel",
      "objective": "显示FX012、CJ008及教师审核规则",
      "entryConditionDescription": "动态质询通过",
      "exitConditionDescription": "移交法官判决",
      "sourceRef": "demo_script_master.docx｜第八幕",
      "entryNodeId": "dlg_s08_001",
      "dialogueNodeIds": [
        "dlg_s08_001"
      ],
      "systemTextIds": [
        "sys_s08_searching",
        "screen_s08_rule",
        "sys_s08_reviewed"
      ]
    },
    "scene_09_first_judgment": {
      "sceneId": "scene_09_first_judgment",
      "order": 9,
      "name": "第一轮判决",
      "startTime": "3:10",
      "endTime": "3:35",
      "location": "数字化词义审判庭",
      "uiMode": "判决书",
      "backgroundAssetId": "bg_word_trial_court",
      "objective": "判定“发现一本蓝色的新书”更自然",
      "entryConditionDescription": "语料检索完成",
      "exitConditionDescription": "第一轮判决成立",
      "sourceRef": "demo_script_master.docx｜第九幕",
      "entryNodeId": "dlg_s09_001",
      "dialogueNodeIds": [
        "dlg_s09_001",
        "dlg_s09_002",
        "dlg_s09_003",
        "dlg_s09_004"
      ],
      "systemTextIds": [
        "screen_s09_judgment"
      ]
    },
    "scene_10_quick_chajue": {
      "sceneId": "scene_10_quick_chajue",
      "order": 10,
      "name": "快速判词一：察觉",
      "startTime": "3:35",
      "endTime": "3:52",
      "location": "词义审判庭·环境信息面板",
      "uiMode": "单选题",
      "backgroundAssetId": "bg_word_trial_environment_panel",
      "objective": "根据异常迹象选择“察觉”",
      "entryConditionDescription": "第一轮判决成立",
      "exitConditionDescription": "显示推荐表达",
      "sourceRef": "demo_script_master.docx｜第十幕",
      "entryNodeId": "dlg_s10_001",
      "dialogueNodeIds": [
        "dlg_s10_001",
        "dlg_s10_002",
        "dlg_s10_003"
      ],
      "systemTextIds": [
        "screen_s10_environment",
        "screen_s10_question",
        "act_s10_choose",
        "sys_s10_recommendation",
        "err_quick_wrong",
        "err_quick_wrong_hint"
      ]
    },
    "scene_11_quick_fajue": {
      "sceneId": "scene_11_quick_fajue",
      "order": 11,
      "name": "快速判词二：发觉",
      "startTime": "3:52",
      "endTime": "4:10",
      "location": "词义审判庭·目录结果面板",
      "uiMode": "单选题",
      "backgroundAssetId": "bg_word_trial_catalog_panel",
      "objective": "根据编号比较后的认识变化选择“发觉”",
      "entryConditionDescription": "快速判词一完成",
      "exitConditionDescription": "显示推荐表达",
      "sourceRef": "demo_script_master.docx｜第十一幕",
      "entryNodeId": "dlg_s11_001",
      "dialogueNodeIds": [
        "dlg_s11_001",
        "dlg_s11_002",
        "dlg_s11_003"
      ],
      "systemTextIds": [
        "screen_s11_catalog",
        "screen_s11_question",
        "act_s11_choose",
        "sys_s11_recommendation"
      ]
    },
    "scene_12_truth": {
      "sceneId": "scene_12_truth",
      "order": 12,
      "name": "真相揭示",
      "startTime": "4:10",
      "endTime": "4:35",
      "location": "校史阅览室 → 修复室",
      "uiMode": "调查/场景切换",
      "backgroundAssetId": "bg_restoration_room",
      "objective": "取得应急转移记录并确认手稿完好",
      "entryConditionDescription": "两次快速判词完成",
      "exitConditionDescription": "邀请安娜重新陈述",
      "sourceRef": "demo_script_master.docx｜第十二幕",
      "entryNodeId": "dlg_s12_001",
      "dialogueNodeIds": [
        "dlg_s12_001",
        "dlg_s12_002",
        "dlg_s12_003",
        "dlg_s12_004",
        "dlg_s12_005",
        "dlg_s12_006"
      ],
      "systemTextIds": [
        "act_s12_move_cart",
        "screen_s12_transfer_record",
        "sys_s12_get_record"
      ]
    },
    "scene_13_ending": {
      "sceneId": "scene_13_ending",
      "order": 13,
      "name": "完整证词与结案",
      "startTime": "4:35",
      "endTime": "5:00",
      "location": "校史阅览室 → 词义审判庭",
      "uiMode": "结算",
      "backgroundAssetId": "bg_case_result",
      "objective": "重述完整证词、显示三词释义并结案",
      "entryConditionDescription": "真相揭示完成",
      "exitConditionDescription": "Demo结束",
      "sourceRef": "demo_script_master.docx｜第十三幕",
      "entryNodeId": "dlg_s13_001",
      "dialogueNodeIds": [
        "dlg_s13_001",
        "dlg_s13_002",
        "dlg_s13_003"
      ],
      "systemTextIds": [
        "screen_s13_definitions",
        "sys_s13_case_closed",
        "sys_s13_achievement"
      ]
    }
  },
  "characters": {
    "anna": {
      "characterId": "anna",
      "displayName": "安娜",
      "role": "国际学生",
      "expressions": {
        "anna_nervous_defense": {
          "expressionId": "anna_nervous_defense",
          "displayName": "紧张辩解",
          "performanceDirection": "眉头轻皱、嘴巴微张；左手轻握一侧学生证带子，两根带子保持自然分开。",
          "firstSceneId": "scene_01_library_intro",
          "assetPath": "./public/assets/characters/anna/expressions/anna_nervous_defending.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "anna_nervous_defense.png"
        },
        "anna_focused_recall": {
          "expressionId": "anna_focused_recall",
          "displayName": "认真回忆",
          "performanceDirection": "眼神微垂、神情专注；左手轻轻扣住下巴。",
          "firstSceneId": "scene_02_return_cart",
          "assetPath": "./public/assets/characters/anna/expressions/anna_focused_recalling.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "anna_focused_recall.png"
        },
        "anna_relaxed_confident": {
          "expressionId": "anna_relaxed_confident",
          "displayName": "释然自信",
          "performanceDirection": "肩膀放松、目光稳定，嘴角带克制而自然的轻微笑容。",
          "firstSceneId": "scene_12_truth",
          "assetPath": "./public/assets/characters/anna/expressions/anna_relaxed_confident.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "anna_relaxed_confident.png"
        }
      }
    },
    "shen_lan": {
      "characterId": "shen_lan",
      "displayName": "沈岚",
      "role": "馆藏保护主管",
      "expressions": {
        "shen_lan_composed_explain": {
          "expressionId": "shen_lan_composed_explain",
          "displayName": "镇定说明",
          "performanceDirection": "身体站直，神态镇定而有亲和力；一手抬起作说明，另一手持平板。",
          "firstSceneId": "scene_01_library_intro",
          "assetPath": "./public/assets/characters/shen_lan/expressions/shen_lan_serious_composed.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "shen_lan_composed_explain.png"
        },
        "shen_lan_focused_analysis": {
          "expressionId": "shen_lan_focused_analysis",
          "displayName": "专注分析",
          "performanceDirection": "低头查看平板，目光集中，动作理性克制。",
          "firstSceneId": "scene_02_return_cart",
          "assetPath": "./public/assets/characters/shen_lan/expressions/shen_lan_focused_analysis.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "shen_lan_focused_analysis.png"
        },
        "shen_lan_gentle_relieved": {
          "expressionId": "shen_lan_gentle_relieved",
          "displayName": "温和释然",
          "performanceDirection": "双手交叠托住平板并自然放在大腿前，神情放松，嘴角略微上扬。",
          "firstSceneId": "scene_12_truth",
          "assetPath": "./public/assets/characters/shen_lan/expressions/shen_lan_gentle_relieved_v3.png",
          "assetStatus": "fallback",
          "suggestedAssetFilename": "shen_lan_gentle_relieved.png"
        }
      }
    },
    "yan_ci": {
      "characterId": "yan_ci",
      "displayName": "严词",
      "role": "GAI词义检察官",
      "expressions": {
        "yan_ci_calm_review": {
          "expressionId": "yan_ci_calm_review",
          "displayName": "冷静审视",
          "performanceDirection": "正面站立，手持悬浮证词面板，目光锐利但不过度夸张。",
          "firstSceneId": "scene_05_trial_entry",
          "assetPath": "./public/assets/characters/yan_ci/reference/yan_ci_anchor.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "yan_ci_calm_review.png"
        },
        "yan_ci_sharp_question": {
          "expressionId": "yan_ci_sharp_question",
          "displayName": "犀利追问",
          "performanceDirection": "指向争议词语，暗红色数字光纹增强。",
          "firstSceneId": "scene_06_evidence_submit",
          "assetPath": "./public/assets/characters/yan_ci/reference/yan_ci_anchor.png",
          "assetStatus": "fallback",
          "suggestedAssetFilename": "yan_ci_sharp_question.png"
        },
        "yan_ci_acknowledgment_handoff": {
          "expressionId": "yan_ci_acknowledgment_handoff",
          "displayName": "认可移交",
          "performanceDirection": "收起证据面板，神情缓和并露出轻微笑容，双手自然垂放。",
          "firstSceneId": "scene_07_dynamic_followup",
          "assetPath": "./public/assets/characters/yan_ci/expressions/yan_ci_acknowledging_handoff.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "yan_ci_acknowledgment_handoff.png"
        }
      }
    },
    "ming_yi": {
      "characterId": "ming_yi",
      "displayName": "明义",
      "role": "GAI词义法官",
      "expressions": {
        "ming_yi_quiet_review": {
          "expressionId": "ming_yi_quiet_review",
          "displayName": "沉静审阅",
          "performanceDirection": "正面站立，目光落在证据面板上，双手自然交叠。",
          "firstSceneId": "scene_09_first_judgment",
          "assetPath": "./public/assets/characters/ming_yi/reference/ming_yi_anchor.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "ming_yi_quiet_review.png"
        },
        "ming_yi_affirmative_verdict": {
          "expressionId": "ming_yi_affirmative_verdict",
          "displayName": "肯定宣判",
          "performanceDirection": "目光稳定，带轻微鼓励性的笑容；右手伸出作介绍和宣告状。",
          "firstSceneId": "scene_09_first_judgment",
          "assetPath": "./public/assets/characters/ming_yi/expressions/ming_yi_affirmative_verdict.png",
          "assetStatus": "ready",
          "suggestedAssetFilename": "ming_yi_affirmative_verdict.png"
        }
      }
    },
    "player": {
      "characterId": "player",
      "displayName": "玩家",
      "role": "现场调查员",
      "expressions": {
        "player_default": {
          "expressionId": "player_default",
          "displayName": "默认",
          "performanceDirection": "无独立立绘要求；用于玩家台词和操作提示。",
          "firstSceneId": "scene_02_return_cart",
          "assetStatus": "virtual"
        }
      }
    },
    "narrator": {
      "characterId": "narrator",
      "displayName": "旁白",
      "role": "旁白",
      "expressions": {
        "narrator_default": {
          "expressionId": "narrator_default",
          "displayName": "旁白",
          "performanceDirection": "仅显示文字，不调用立绘。",
          "firstSceneId": "scene_01_library_intro",
          "assetStatus": "virtual"
        }
      }
    }
  },
  "dialogueNodes": {
    "dlg_s01_001": {
      "nodeId": "dlg_s01_001",
      "orderKey": 1010,
      "sceneId": "scene_01_library_intro",
      "speakerId": "narrator",
      "speakerName": "旁白",
      "expressionId": "narrator_default",
      "expressionName": "旁白",
      "textType": "narration",
      "text": "闭馆前，展览中的《星河手稿》突然从恒温展柜中消失。最后停留在现场国际学生安娜，给出了一段令人困惑的证词。",
      "triggerDescription": "场景建立后自动播放",
      "nextNodeId": "dlg_s01_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_002": {
      "nodeId": "dlg_s01_002",
      "orderKey": 1020,
      "sceneId": "scene_01_library_intro",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_composed_explain",
      "expressionName": "镇定说明",
      "textType": "dialogue",
      "text": "展柜空了，湿度也超标。安娜，先别紧张。你刚才一直在这里吗？",
      "nextNodeId": "dlg_s01_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_003": {
      "nodeId": "dlg_s01_003",
      "orderKey": 1030,
      "sceneId": "scene_01_library_intro",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_nervous_defense",
      "expressionName": "紧张辩解",
      "textType": "dialogue",
      "text": "对，我是来还书的，在还书车边停了一会儿。我没有碰过展柜。",
      "nextNodeId": "dlg_s01_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_004": {
      "nodeId": "dlg_s01_004",
      "orderKey": 1040,
      "sceneId": "scene_01_library_intro",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_composed_explain",
      "expressionName": "镇定说明",
      "textType": "dialogue",
      "text": "那就从你进门开始。看到什么，按顺序说说。",
      "nextNodeId": "dlg_s01_005",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_005": {
      "nodeId": "dlg_s01_005",
      "orderKey": 1050,
      "sceneId": "scene_01_library_intro",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_nervous_defense",
      "expressionName": "紧张辩解",
      "textType": "dialogue",
      "text": "我先在还书车上察觉了一本蓝色的新书。走进阅览室以后，我发现气氛有点异常。后来查了编号，我才察觉自己认错了。",
      "emphasisTokens": [
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        },
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        },
        {
          "token": "察觉",
          "occurrence": 2,
          "style": "chajue"
        }
      ],
      "nextNodeId": "dlg_s01_006",
      "notes": "三处目标词均为待审判的原始用词",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_006": {
      "nodeId": "dlg_s01_006",
      "orderKey": 1060,
      "sceneId": "scene_01_library_intro",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_composed_explain",
      "expressionName": "镇定说明",
      "textType": "dialogue",
      "text": "我大概明白你的意思了。不过这几个词会让人误解你是怎么知道这些事的哦。",
      "nextNodeId": "dlg_s01_007",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_007": {
      "nodeId": "dlg_s01_007",
      "orderKey": 1070,
      "sceneId": "scene_01_library_intro",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_nervous_defense",
      "expressionName": "紧张辩解",
      "textType": "dialogue",
      "text": "我也觉得自己没有说清楚。",
      "nextNodeId": "dlg_s01_008",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s01_008": {
      "nodeId": "dlg_s01_008",
      "orderKey": 1080,
      "sceneId": "scene_01_library_intro",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_composed_explain",
      "expressionName": "镇定说明",
      "textType": "dialogue",
      "text": "我们去现场对一遍。看到了什么，感觉到了什么，什么时候改变了判断，都要说清楚。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s02_001": {
      "nodeId": "dlg_s02_001",
      "orderKey": 2020,
      "sceneId": "scene_02_return_cart",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "你说的是这本书？",
      "triggerDescription": "点击蓝色新书",
      "nextNodeId": "dlg_s02_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s02_002": {
      "nodeId": "dlg_s02_002",
      "orderKey": 2030,
      "sceneId": "scene_02_return_cart",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "对。它就在还书车最上面，蓝色封面很显眼。我一走过来就看到了。",
      "nextNodeId": "dlg_s02_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s02_003": {
      "nodeId": "dlg_s02_003",
      "orderKey": 2040,
      "sceneId": "scene_02_return_cart",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "你翻找过其他书吗？",
      "nextNodeId": "dlg_s02_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s02_004": {
      "nodeId": "dlg_s02_004",
      "orderKey": 2050,
      "sceneId": "scene_02_return_cart",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "没有。我当时只是看了一眼，还以为它和展柜里的手稿有关系。",
      "nextNodeId": "dlg_s02_005",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s02_005": {
      "nodeId": "dlg_s02_005",
      "orderKey": 2060,
      "sceneId": "scene_02_return_cart",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "也就是说，这本书是你直接看到的。先把这一点记下来。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_001": {
      "nodeId": "dlg_s03_001",
      "orderKey": 3020,
      "sceneId": "scene_03_display_case",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "湿度78%，这正常吗？",
      "triggerDescription": "点击湿度显示屏",
      "nextNodeId": "dlg_s03_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_002": {
      "nodeId": "dlg_s03_002",
      "orderKey": 3030,
      "sceneId": "scene_03_display_case",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "不正常。展柜湿度通常保持在45%到55%之间。",
      "nextNodeId": "dlg_s03_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_003": {
      "nodeId": "dlg_s03_003",
      "orderKey": 3040,
      "sceneId": "scene_03_display_case",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "警报响之前会有什么迹象？",
      "nextNodeId": "dlg_s03_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_004": {
      "nodeId": "dlg_s03_004",
      "orderKey": 3050,
      "sceneId": "scene_03_display_case",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "可能会听见设备杂音，也可能闻到潮湿气味。当值的修复员也有应急处理权限。",
      "nextNodeId": "dlg_s03_005",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_005": {
      "nodeId": "dlg_s03_005",
      "orderKey": 3060,
      "sceneId": "scene_03_display_case",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "安娜，你当时注意到什么了吗？",
      "nextNodeId": "dlg_s03_006",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_006": {
      "nodeId": "dlg_s03_006",
      "orderKey": 3070,
      "sceneId": "scene_03_display_case",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "设备一直发出很轻的声音。沈老师盯着展柜，阅览室里也安静得有点奇怪。",
      "nextNodeId": "dlg_s03_007",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_007": {
      "nodeId": "dlg_s03_007",
      "orderKey": 3080,
      "sceneId": "scene_03_display_case",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "你那时已经知道设备出问题了吗？",
      "nextNodeId": "dlg_s03_008",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_008": {
      "nodeId": "dlg_s03_008",
      "orderKey": 3090,
      "sceneId": "scene_03_display_case",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "还不知道。我只是觉得哪里不太对，像是出了什么事。",
      "nextNodeId": "dlg_s03_009",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_009": {
      "nodeId": "dlg_s03_009",
      "orderKey": 3100,
      "sceneId": "scene_03_display_case",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "你当时掌握的信息不完整，只是从几个细节感觉到异常，对吗？",
      "nextNodeId": "dlg_s03_010",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s03_010": {
      "nodeId": "dlg_s03_010",
      "orderKey": 3110,
      "sceneId": "scene_03_display_case",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "对，就是这种感觉。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_001": {
      "nodeId": "dlg_s04_001",
      "orderKey": 4050,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "这两个编号一样吗？",
      "triggerDescription": "终端完成扫描",
      "nextNodeId": "dlg_s04_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_002": {
      "nodeId": "dlg_s04_002",
      "orderKey": 4060,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "不一样。看到编号，我才知道自己认错了。",
      "nextNodeId": "dlg_s04_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_003": {
      "nodeId": "dlg_s04_003",
      "orderKey": 4070,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "你原来为什么会把它们联系在一起？",
      "nextNodeId": "dlg_s04_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_004": {
      "nodeId": "dlg_s04_004",
      "orderKey": 4080,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "我只看了蓝色封面，就把它当成了和手稿有关的书。",
      "nextNodeId": "dlg_s04_005",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_005": {
      "nodeId": "dlg_s04_005",
      "orderKey": 4090,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "所以你的判断是在比较编号以后改变的？",
      "nextNodeId": "dlg_s04_006",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_006": {
      "nodeId": "dlg_s04_006",
      "orderKey": 4100,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "对。看到编号以后，我才反应过来，是自己先入为主了。",
      "nextNodeId": "dlg_s04_007",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s04_007": {
      "nodeId": "dlg_s04_007",
      "orderKey": 4110,
      "sceneId": "scene_04_catalog_terminal",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "现在三段经历对上了：一眼看到、感觉异常、查过以后意识到错误。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s05_001": {
      "nodeId": "dlg_s05_001",
      "orderKey": 5020,
      "sceneId": "scene_05_trial_entry",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_calm_review",
      "expressionName": "冷静审视",
      "textType": "dialogue",
      "text": "证词第一句：“我在还书车上察觉了一本蓝色的新书。”",
      "nextNodeId": "dlg_s05_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s05_002": {
      "nodeId": "dlg_s05_002",
      "orderKey": 5030,
      "sceneId": "scene_05_trial_entry",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_calm_review",
      "expressionName": "冷静审视",
      "textType": "dialogue",
      "text": "调查员，这句话里有一个词经不起推敲。指出它。",
      "choiceGroupId": "choice_trial_word",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s06_001": {
      "nodeId": "dlg_s06_001",
      "orderKey": 6040,
      "sceneId": "scene_06_evidence_submit",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_sharp_question",
      "expressionName": "犀利追问",
      "textType": "dialogue",
      "text": "书摆得很显眼，只能说明安娜看到了它。为什么一定要换成“发现”？",
      "triggerDescription": "正确提交蓝色新书",
      "choiceGroupId": "choice_argument_reason",
      "deferChoiceUntilAdvance": true,
      "choicePhases": {
        "dialogue": "yan_ci_evidence_question_dialogue",
        "waiting": "yan_ci_evidence_question_waiting",
        "choice": "yan_ci_evidence_question_choice"
      },
      "nextNodeId": "dlg_s06_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s06_002": {
      "nodeId": "dlg_s06_002",
      "orderKey": 6050,
      "sceneId": "scene_06_evidence_submit",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "对象是直接看到的一本具体书，常见搭配是“发现一本书”；“察觉”更偏向变化或异常。",
      "triggerDescription": "选择正确辩词",
      "nextNodeId": "dlg_s06_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s06_003": {
      "nodeId": "dlg_s06_003",
      "orderKey": 6060,
      "sceneId": "scene_06_evidence_submit",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_sharp_question",
      "expressionName": "犀利追问",
      "textType": "dialogue",
      "text": "你提到了对象和搭配。还不够，我改变一个条件。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s07_001": {
      "nodeId": "dlg_s07_001",
      "orderKey": 7020,
      "sceneId": "scene_07_dynamic_followup",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_sharp_question",
      "expressionName": "犀利追问",
      "textType": "dialogue",
      "text": "如果安娜只看到这一角封面，由此感觉书架后面藏着东西，“察觉”能使用吗？",
      "triggerDescription": "场景切换为书架变化",
      "choiceGroupId": "choice_dynamic_condition",
      "deferChoiceUntilAdvance": true,
      "choicePhases": {
        "dialogue": "yan_ci_hypothesis_dialogue",
        "waiting": "yan_ci_hypothesis_waiting_for_advance",
        "choice": "yan_ci_hypothesis_choice"
      },
      "nextNodeId": "dlg_s07_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s07_002": {
      "nodeId": "dlg_s07_002",
      "orderKey": 7030,
      "sceneId": "scene_07_dynamic_followup",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "可以。此时是从一角封面推知隐藏情况，重点变成由迹象感受到异常。",
      "triggerDescription": "动态选择正确",
      "nextNodeId": "dlg_s07_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s07_003": {
      "nodeId": "dlg_s07_003",
      "orderKey": 7040,
      "sceneId": "scene_07_dynamic_followup",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_sharp_question",
      "expressionName": "犀利追问",
      "textType": "dialogue",
      "text": "那么，“察觉”通常怎样使用？",
      "choiceGroupId": "choice_dynamic_usage",
      "deferChoiceUntilAdvance": true,
      "choicePhases": {
        "dialogue": "yan_ci_usage_question_dialogue",
        "waiting": "yan_ci_usage_question_waiting_for_advance",
        "choice": "yan_ci_usage_question_choice"
      },
      "nextNodeId": "dlg_s07_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s07_004": {
      "nodeId": "dlg_s07_004",
      "orderKey": 7060,
      "sceneId": "scene_07_dynamic_followup",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_acknowledgment_handoff",
      "expressionName": "认可移交",
      "textType": "dialogue",
      "text": "正确。“察觉”强调的不是直接看到某个具体物品，而是从迹象中感受到不易立刻确认的变化或异常。",
      "triggerDescription": "选择正确答案",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s08_001": {
      "nodeId": "dlg_s08_001",
      "orderKey": 8060,
      "sceneId": "scene_08_corpus",
      "speakerId": "yan_ci",
      "speakerName": "严词",
      "expressionId": "yan_ci_acknowledgment_handoff",
      "expressionName": "认可移交",
      "textType": "dialogue",
      "text": "现场信息和语料证据已经对应。请法官宣判。",
      "triggerDescription": "语料与辨析规则显示完成",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s09_001": {
      "nodeId": "dlg_s09_001",
      "orderKey": 9020,
      "sceneId": "scene_09_first_judgment",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_quiet_review",
      "expressionName": "沉静审阅",
      "textType": "dialogue",
      "text": "这句话需要判断两个问题：安娜看到的是什么，她又是怎样知道的。",
      "nextNodeId": "dlg_s09_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s09_002": {
      "nodeId": "dlg_s09_002",
      "orderKey": 9030,
      "sceneId": "scene_09_first_judgment",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_quiet_review",
      "expressionName": "沉静审阅",
      "textType": "dialogue",
      "text": "她一眼看到的是位置明显的具体书籍，因此“发现一本蓝色的新书”更加自然。",
      "nextNodeId": "dlg_s09_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s09_003": {
      "nodeId": "dlg_s09_003",
      "orderKey": 9040,
      "sceneId": "scene_09_first_judgment",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_quiet_review",
      "expressionName": "沉静审阅",
      "textType": "dialogue",
      "text": "如果使用“察觉”，听者会期待后面出现某种不易直接观察的变化或异常。",
      "nextNodeId": "dlg_s09_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s09_004": {
      "nodeId": "dlg_s09_004",
      "orderKey": 9060,
      "sceneId": "scene_09_first_judgment",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_affirmative_verdict",
      "expressionName": "肯定宣判",
      "textType": "dialogue",
      "text": "玩家提交的证据有效，第一轮词义判决成立。",
      "triggerDescription": "判决书显示完成",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s10_001": {
      "nodeId": "dlg_s10_001",
      "orderKey": 10020,
      "sceneId": "scene_10_quick_chajue",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_quiet_review",
      "expressionName": "沉静审阅",
      "textType": "dialogue",
      "text": "安娜还不知道发生了什么，只注意到设备杂音和人物反应。哪个词更能突出这种感觉？",
      "triggerDescription": "环境信息显示后",
      "choiceGroupId": "choice_quick_01",
      "deferChoiceUntilAdvance": true,
      "choicePhases": {
        "dialogue": "mingyi_abnormality_question_dialogue",
        "waiting": "mingyi_abnormality_question_waiting",
        "choice": "mingyi_abnormality_question_choice"
      },
      "nextNodeId": "dlg_s10_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s10_002": {
      "nodeId": "dlg_s10_002",
      "orderKey": 10050,
      "sceneId": "scene_10_quick_chajue",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "对，我当时只是觉得不对劲，还说不清原因。",
      "triggerDescription": "选择“察觉”",
      "nextNodeId": "dlg_s10_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s10_003": {
      "nodeId": "dlg_s10_003",
      "orderKey": 10060,
      "sceneId": "scene_10_quick_chajue",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_affirmative_verdict",
      "expressionName": "肯定宣判",
      "textType": "dialogue",
      "text": "“察觉”更能突出从细微迹象中形成的感受。",
      "emphasisTokens": [
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        }
      ],
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s11_001": {
      "nodeId": "dlg_s11_001",
      "orderKey": 11020,
      "sceneId": "scene_11_quick_fajue",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_quiet_review",
      "expressionName": "沉静审阅",
      "textType": "dialogue",
      "text": "安娜比较编号以后改变了原来的判断。请选择更贴合这一过程的词语。",
      "triggerDescription": "目录检索结果显示后",
      "choiceGroupId": "choice_quick_02",
      "nextNodeId": "dlg_s11_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s11_002": {
      "nodeId": "dlg_s11_002",
      "orderKey": 11050,
      "sceneId": "scene_11_quick_fajue",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_focused_recall",
      "expressionName": "认真回忆",
      "textType": "dialogue",
      "text": "是的。我看到编号以后，才明白自己判断错了。",
      "triggerDescription": "选择“发觉”",
      "nextNodeId": "dlg_s11_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s11_003": {
      "nodeId": "dlg_s11_003",
      "orderKey": 11060,
      "sceneId": "scene_11_quick_fajue",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_affirmative_verdict",
      "expressionName": "肯定宣判",
      "textType": "dialogue",
      "text": "“发觉”突出了观察和比较后的认识变化。“发现自己认错了”也可以成立，表达重点略有不同。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_001": {
      "nodeId": "dlg_s12_001",
      "orderKey": 12020,
      "sceneId": "scene_12_truth",
      "speakerId": "player",
      "speakerName": "玩家",
      "expressionId": "player_default",
      "expressionName": "默认",
      "textType": "dialogue",
      "text": "车轮下面有一张纸。",
      "triggerDescription": "移开还书车并点击纸张",
      "nextNodeId": "dlg_s12_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_002": {
      "nodeId": "dlg_s12_002",
      "orderKey": 12030,
      "sceneId": "scene_12_truth",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_focused_analysis",
      "expressionName": "专注分析",
      "textType": "dialogue",
      "text": "是应急转移记录。值班修复员已经把手稿送到防潮柜了。",
      "nextNodeId": "dlg_s12_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_003": {
      "nodeId": "dlg_s12_003",
      "orderKey": 12070,
      "sceneId": "scene_12_truth",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_relaxed_confident",
      "expressionName": "释然自信",
      "textType": "dialogue",
      "text": "原来手稿一直在图书馆。",
      "triggerDescription": "修复室防潮柜打开",
      "nextNodeId": "dlg_s12_004",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_004": {
      "nodeId": "dlg_s12_004",
      "orderKey": 12080,
      "sceneId": "scene_12_truth",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_gentle_relieved",
      "expressionName": "温和释然",
      "textType": "dialogue",
      "text": "修复员先处理了设备故障，纸条又掉在车轮下面，所以交接信息没有及时传过来。",
      "nextNodeId": "dlg_s12_005",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_005": {
      "nodeId": "dlg_s12_005",
      "orderKey": 12090,
      "sceneId": "scene_12_truth",
      "speakerId": "shen_lan",
      "speakerName": "沈岚",
      "expressionId": "shen_lan_gentle_relieved",
      "expressionName": "温和释然",
      "textType": "dialogue",
      "text": "事实已经清楚了。安娜，你愿意再说一次当时的经过吗？",
      "nextNodeId": "dlg_s12_006",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s12_006": {
      "nodeId": "dlg_s12_006",
      "orderKey": 12100,
      "sceneId": "scene_12_truth",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_relaxed_confident",
      "expressionName": "释然自信",
      "textType": "dialogue",
      "text": "当然。",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s13_001": {
      "nodeId": "dlg_s13_001",
      "orderKey": 13010,
      "sceneId": "scene_13_ending",
      "speakerId": "anna",
      "speakerName": "安娜",
      "expressionId": "anna_relaxed_confident",
      "expressionName": "释然自信",
      "textType": "dialogue",
      "text": "我在还书车上发现了一本蓝色的新书。进入阅览室后，我察觉到气氛有些异常。比较编号以后，我才发觉自己认错了。",
      "emphasisTokens": [
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        },
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        },
        {
          "token": "发觉",
          "occurrence": 1,
          "style": "fajue"
        }
      ],
      "backgroundAssetId": "bg_restoration_room",
      "presentationCast": {
        "left": "shen_lan",
        "right": "anna"
      },
      "nextNodeId": "dlg_s13_002",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s13_002": {
      "nodeId": "dlg_s13_002",
      "orderKey": 13030,
      "sceneId": "scene_13_ending",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_affirmative_verdict",
      "expressionName": "肯定宣判",
      "textType": "dialogue",
      "text": "同一段经历，换成符合语境的词语，事实和人物意图都会更加清楚。",
      "backgroundAssetId": "bg_word_trial_court",
      "presentationCast": {
        "center": "ming_yi"
      },
      "triggerDescription": "切换至词义审判庭",
      "nextNodeId": "dlg_s13_003",
      "sourceFile": "demo_script_master.docx"
    },
    "dlg_s13_003": {
      "nodeId": "dlg_s13_003",
      "orderKey": 13050,
      "sceneId": "scene_13_ending",
      "speakerId": "ming_yi",
      "speakerName": "明义",
      "expressionId": "ming_yi_affirmative_verdict",
      "expressionName": "肯定宣判",
      "textType": "dialogue",
      "text": "记住三个判断问题：对象是什么，信息怎样获得，认识是否发生了变化。",
      "triggerDescription": "三词释义显示完成",
      "sourceFile": "demo_script_master.docx"
    }
  },
  "choiceGroups": {
    "choice_trial_word": {
      "choiceGroupId": "choice_trial_word",
      "sceneId": "scene_05_trial_entry",
      "prompt": "证词中哪一个词经不起推敲？",
      "choiceType": "word_click",
      "selectableTokens": [
        "我",
        "在",
        "还书车",
        "上",
        "察觉",
        "了",
        "一本",
        "蓝色",
        "的",
        "新书"
      ],
      "punctuation": "。",
      "correctTokenIndex": 4,
      "wrongFeedback": "这个词与本题关注的用词辨析不符。请结合句子中的动作、对象和表达语境重新判断。",
      "correctFeedback": "判断正确，争议词语已锁定。",
      "correctNextNode": "dlg_s06_001",
      "options": [
        {
          "optionId": "target_chajue",
          "order": 1,
          "text": "察觉",
          "isCorrect": true,
          "feedbackTextId": "sys_s05_word_locked",
          "successNextNodeId": "dlg_s06_001",
          "status": "已定稿",
          "notes": "在完整证词句子中点击目标词，不是普通单选题。"
        }
      ]
    },
    "choice_trial_evidence": {
      "choiceGroupId": "choice_trial_evidence",
      "sceneId": "scene_06_evidence_submit",
      "prompt": "请选择一项能够说明安娜如何看到蓝色新书的证据。",
      "choiceType": "evidence_submit",
      "options": [
        {
          "optionId": "submit_blue_book",
          "order": 1,
          "text": "蓝色新书",
          "isCorrect": true,
          "feedbackTextId": "sys_s06_evidence_labels",
          "successNextNodeId": "dlg_s06_001",
          "status": "已定稿"
        },
        {
          "optionId": "submit_borrow_card",
          "order": 2,
          "text": "安娜借阅卡",
          "isCorrect": false,
          "feedbackTextId": "err_s06_borrow_card",
          "failureNextNodeId": "dlg_s06_001",
          "status": "已定稿"
        }
      ]
    },
    "choice_argument_reason": {
      "choiceGroupId": "choice_argument_reason",
      "sceneId": "scene_06_evidence_submit",
      "prompt": "哪一项最完整地说明为什么这里更适合使用“发现”？",
      "choiceType": "single_choice",
      "options": [
        {
          "optionId": "argument_formality",
          "order": 1,
          "text": "“发现”的语气更正式、更确定，所以在审判场景里比“察觉”更合适。",
          "isCorrect": false,
          "feedbackTextId": "err_s06_argument_formality",
          "failureNextNodeId": "dlg_s06_001",
          "status": "已定稿",
          "notes": "常见误区：把语体正式程度当作判断依据。"
        },
        {
          "optionId": "argument_object_and_collocation",
          "order": 2,
          "text": "对象是直接看到的一本具体书，常见搭配是“发现一本书”；“察觉”更偏向变化或异常。",
          "isCorrect": true,
          "successNextNodeId": "dlg_s06_002",
          "status": "已定稿",
          "notes": "正确答案B：同时判断对象类型和常见搭配。"
        },
        {
          "optionId": "argument_absolute_visual",
          "order": 3,
          "text": "“察觉”不能用于视觉信息，只能和情绪、危险等抽象对象搭配。",
          "isCorrect": false,
          "feedbackTextId": "err_s06_argument_absolute_visual",
          "failureNextNodeId": "dlg_s06_001",
          "status": "已定稿",
          "notes": "常见误区：把语义倾向误解为绝对禁用规则。"
        }
      ]
    },
    "choice_dynamic_condition": {
      "choiceGroupId": "choice_dynamic_condition",
      "sceneId": "scene_07_dynamic_followup",
      "prompt": "改变条件后，哪一项判断最合理？",
      "choiceType": "single_choice",
      "options": [
        {
          "optionId": "condition_object_only",
          "order": 1,
          "text": "不能。最终涉及的仍然是一本书，只要对象是书，就只能使用“发现”。",
          "isCorrect": false,
          "feedbackTextId": "err_s07_condition_object_only",
          "failureNextNodeId": "dlg_s07_001",
          "status": "已定稿",
          "notes": "常见误区：只依据对象名称判断。"
        },
        {
          "optionId": "condition_synonym",
          "order": 2,
          "text": "可以。“察觉”和“发现”只是语气不同，在描述视觉结果时可以自由互换。",
          "isCorrect": false,
          "feedbackTextId": "err_s07_condition_synonym",
          "failureNextNodeId": "dlg_s07_001",
          "status": "已定稿",
          "notes": "常见误区：认为两词可以自由互换。"
        },
        {
          "optionId": "condition_inference",
          "order": 3,
          "text": "可以。此时是从一角封面推知隐藏情况，重点变成由迹象感受到异常。",
          "isCorrect": true,
          "successNextNodeId": "dlg_s07_002",
          "status": "已定稿",
          "notes": "正确答案C：信息获得方式由直接看到变为根据迹象推知。"
        }
      ]
    },
    "choice_dynamic_usage": {
      "choiceGroupId": "choice_dynamic_usage",
      "sceneId": "scene_07_dynamic_followup",
      "prompt": "“察觉”通常怎样使用？",
      "choiceType": "single_choice",
      "options": [
        {
          "optionId": "usage_perceive_change",
          "order": 1,
          "text": "通过细微迹象感受到变化、情绪或异常情况。",
          "isCorrect": true,
          "feedbackTextId": "sys_s07_pass",
          "successNextNodeId": "dlg_s07_004",
          "status": "已定稿",
          "notes": "正确答案A：察觉的典型语境。"
        },
        {
          "optionId": "usage_discover_object",
          "order": 2,
          "text": "直接看到、找到一个具体物品，或者获得一条新信息。",
          "isCorrect": false,
          "feedbackTextId": "err_s07_usage_discover",
          "failureNextNodeId": "dlg_s07_003",
          "status": "已定稿",
          "notes": "该描述更接近“发现”。"
        },
        {
          "optionId": "usage_realize_change",
          "order": 3,
          "text": "经过观察、比较或思考，意识到自己的认识发生了变化。",
          "isCorrect": false,
          "feedbackTextId": "err_s07_usage_realize",
          "failureNextNodeId": "dlg_s07_003",
          "status": "已定稿",
          "notes": "该描述更接近“发觉”。"
        }
      ]
    },
    "choice_quick_01": {
      "choiceGroupId": "choice_quick_01",
      "sceneId": "scene_10_quick_chajue",
      "prompt": "走进阅览室以后，我＿＿到这里的气氛有些异常。",
      "choiceType": "single_choice",
      "options": [
        {
          "optionId": "quick1_faxian",
          "order": 1,
          "text": "发现",
          "isCorrect": false,
          "feedbackTextId": "err_quick_wrong",
          "failureNextNodeId": "dlg_s10_001",
          "status": "已定稿"
        },
        {
          "optionId": "quick1_fajue",
          "order": 2,
          "text": "发觉",
          "isCorrect": false,
          "feedbackTextId": "err_quick_wrong",
          "failureNextNodeId": "dlg_s10_001",
          "status": "已定稿"
        },
        {
          "optionId": "quick1_chajue",
          "order": 3,
          "text": "察觉",
          "isCorrect": true,
          "feedbackTextId": "sys_s10_recommendation",
          "successNextNodeId": "dlg_s10_002",
          "status": "已定稿"
        }
      ]
    },
    "choice_quick_02": {
      "choiceGroupId": "choice_quick_02",
      "sceneId": "scene_11_quick_fajue",
      "prompt": "查看编号以后，我才＿＿自己认错了。",
      "choiceType": "single_choice",
      "options": [
        {
          "optionId": "quick2_faxian",
          "order": 1,
          "text": "发现",
          "isCorrect": false,
          "feedbackTextId": "err_quick_wrong",
          "failureNextNodeId": "dlg_s11_001",
          "status": "已定稿",
          "notes": "脚本说明此表达也可成立，但本题推荐“发觉”。"
        },
        {
          "optionId": "quick2_fajue",
          "order": 2,
          "text": "发觉",
          "isCorrect": true,
          "feedbackTextId": "sys_s11_recommendation",
          "successNextNodeId": "dlg_s11_002",
          "status": "已定稿"
        },
        {
          "optionId": "quick2_chajue",
          "order": 3,
          "text": "察觉",
          "isCorrect": false,
          "feedbackTextId": "err_quick_wrong",
          "failureNextNodeId": "dlg_s11_001",
          "status": "已定稿"
        }
      ]
    }
  },
  "systemTexts": {
    "sys_s01_investigate": {
      "textId": "sys_s01_investigate",
      "orderKey": 1090,
      "sceneId": "scene_01_library_intro",
      "uiType": "system_prompt",
      "triggerDescription": "案件导入对白结束",
      "text": "请调查现场，核对安娜的三段经历：\n一、直接看到；\n二、感到异常；\n三、核对编号。",
      "nextNodeId": "dlg_s02_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s02_click_blue_book": {
      "textId": "act_s02_click_blue_book",
      "orderKey": 2010,
      "sceneId": "scene_02_return_cart",
      "uiType": "action_hint",
      "triggerDescription": "进入还书车近景",
      "text": "请探索阅览室现场。",
      "nextNodeId": "dlg_s02_001",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s02_get_blue_book": {
      "textId": "sys_s02_get_blue_book",
      "orderKey": 2070,
      "sceneId": "scene_02_return_cart",
      "uiType": "evidence_toast",
      "triggerDescription": "完成蓝色新书对话",
      "text": "获得证据卡：“蓝色新书”。\n证据标签：具体事物、直接看到、获得新信息。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s02_click_borrow_card": {
      "textId": "act_s02_click_borrow_card",
      "orderKey": 2080,
      "sceneId": "scene_02_return_cart",
      "uiType": "optional_action",
      "triggerDescription": "蓝色新书调查完成",
      "text": "请探索阅览室现场。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s02_get_borrow_card": {
      "textId": "sys_s02_get_borrow_card",
      "orderKey": 2090,
      "sceneId": "scene_02_return_cart",
      "uiType": "evidence_toast",
      "triggerDescription": "点击安娜借阅卡",
      "text": "获得证据卡：“安娜借阅卡”。\n证据说明：这张借阅卡能够证明安娜到过图书馆，但不能说明她如何注意到蓝色新书。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s02_click_paper": {
      "textId": "act_s02_click_paper",
      "orderKey": 2100,
      "sceneId": "scene_02_return_cart",
      "uiType": "action_hint",
      "triggerDescription": "调查车轮下的纸角",
      "text": "请探索阅览室现场。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s02_paper_locked": {
      "textId": "sys_s02_paper_locked",
      "orderKey": 2110,
      "sceneId": "scene_02_return_cart",
      "uiType": "locked_hint",
      "triggerDescription": "点击纸角",
      "text": "纸张被车轮压住，暂时无法取出。完成词义审判后可以继续调查。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s02_complete": {
      "textId": "sys_s02_complete",
      "orderKey": 2120,
      "sceneId": "scene_02_return_cart",
      "uiType": "system_prompt",
      "triggerDescription": "还书车四项热点全部调查完成",
      "text": "阅览室现场调查完成，四项内容均已确认。",
      "priority": "high",
      "sourceFile": "runtime_patch_20260831"
    },
    "act_s03_click_humidity": {
      "textId": "act_s03_click_humidity",
      "orderKey": 3010,
      "sceneId": "scene_03_display_case",
      "uiType": "action_hint",
      "triggerDescription": "进入恒温展柜近景",
      "text": "请探索阅览室现场。",
      "nextNodeId": "dlg_s03_001",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s03_environment": {
      "textId": "screen_s03_environment",
      "orderKey": 3120,
      "sceneId": "scene_03_display_case",
      "uiType": "screen_text",
      "triggerDescription": "展柜调查对白完成",
      "text": "环境信息已记录：\n湿度78%｜警报闪烁｜设备异响｜异常安静",
      "priority": "high",
      "notes": "该信息不进入证据栏。",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s04_drag_book": {
      "textId": "act_s04_drag_book",
      "orderKey": 4010,
      "sceneId": "scene_04_catalog_terminal",
      "uiType": "action_hint",
      "triggerDescription": "进入书目查询终端",
      "text": "将“蓝色新书”证据卡拖入扫描区域。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s04_scanning": {
      "textId": "screen_s04_scanning",
      "orderKey": 4020,
      "sceneId": "scene_04_catalog_terminal",
      "uiType": "loading_text",
      "triggerDescription": "证据卡进入扫描区",
      "text": "正在读取馆藏编号……",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s04_catalog_result": {
      "textId": "screen_s04_catalog_result",
      "orderKey": 4030,
      "sceneId": "scene_04_catalog_terminal",
      "uiType": "screen_text",
      "triggerDescription": "扫描完成",
      "text": "蓝色新书：A071\n《星河手稿》：M019\n检索结果：编号不一致。",
      "nextNodeId": "dlg_s04_001",
      "priority": "high",
      "notes": "编号结果不进入证据栏。",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s04_complete": {
      "textId": "sys_s04_complete",
      "orderKey": 4120,
      "sceneId": "scene_04_catalog_terminal",
      "uiType": "system_prompt",
      "triggerDescription": "书目终端对白完成",
      "text": "现场核对完成。词义审判开始。",
      "nextNodeId": "dlg_s05_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s05_testimony": {
      "textId": "screen_s05_testimony",
      "orderKey": 5010,
      "sceneId": "scene_05_trial_entry",
      "uiType": "screen_text",
      "triggerDescription": "进入审判庭",
      "text": "我在还书车上察觉了一本蓝色的新书。",
      "choiceGroupId": "choice_trial_word",
      "nextNodeId": "dlg_s05_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s05_word_locked": {
      "textId": "sys_s05_word_locked",
      "orderKey": 5040,
      "sceneId": "scene_05_trial_entry",
      "uiType": "system_prompt",
      "triggerDescription": "点击证词中的“察觉”",
      "text": "争议词语已锁定。请提交一项能够说明安娜如何看到这本书的证据。",
      "choiceGroupId": "choice_trial_evidence",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s06_submit_evidence": {
      "textId": "act_s06_submit_evidence",
      "orderKey": 6010,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "action_hint",
      "triggerDescription": "进入证据提交",
      "text": "提交证据卡“蓝色新书”。",
      "choiceGroupId": "choice_trial_evidence",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s06_evidence_labels": {
      "textId": "sys_s06_evidence_labels",
      "orderKey": 6020,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "screen_text",
      "triggerDescription": "正确提交蓝色新书",
      "text": "证据：蓝色新书\n证据标签：具体事物｜直接看到｜获得新信息",
      "nextNodeId": "dlg_s06_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s06_argument": {
      "textId": "act_s06_argument",
      "orderKey": 6030,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "action_hint",
      "triggerDescription": "严词提出证据质询",
      "text": "请选择最充分的理由。",
      "choiceGroupId": "choice_argument_reason",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s06_borrow_card": {
      "textId": "err_s06_borrow_card",
      "orderKey": 6901,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "提交安娜借阅卡",
      "text": "这张卡只能证明安娜来过图书馆。它和“怎样看到一本书”有什么关系？",
      "choiceGroupId": "choice_trial_evidence",
      "nextNodeId": "dlg_s06_001",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s06_borrow_card_hint": {
      "textId": "err_s06_borrow_card_hint",
      "orderKey": 6902,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "error_feedback",
      "triggerDescription": "严词错误反馈结束",
      "text": "证据与争议词语的使用语境无关，请重新选择。",
      "choiceGroupId": "choice_trial_evidence",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s06_argument_formality": {
      "textId": "err_s06_argument_formality",
      "orderKey": 6903,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“发现更正式”",
      "text": "正式程度不是判断依据。再想想——安娜看到的对象是什么，她又是怎样获得信息的？",
      "choiceGroupId": "choice_argument_reason",
      "nextNodeId": "dlg_s06_001",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s06_argument_absolute_visual": {
      "textId": "err_s06_argument_absolute_visual",
      "orderKey": 6904,
      "sceneId": "scene_06_evidence_submit",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“察觉不能用于视觉信息”",
      "text": "这个规则说得太绝对了。“察觉”也可能与视觉迹象有关，关键在于她是否直接看到了具体对象。",
      "choiceGroupId": "choice_argument_reason",
      "nextNodeId": "dlg_s06_001",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s07_choose_usage": {
      "textId": "act_s07_choose_usage",
      "orderKey": 7050,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "action_hint",
      "triggerDescription": "严词询问“察觉”的通常用法",
      "text": "请选择最准确的说明。",
      "choiceGroupId": "choice_dynamic_usage",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s07_pass": {
      "textId": "sys_s07_pass",
      "orderKey": 7070,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "system_prompt",
      "triggerDescription": "动态追问回答正确",
      "text": "动态质询通过。",
      "nextNodeId": "dlg_s08_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s07_condition_object_only": {
      "textId": "err_s07_condition_object_only",
      "orderKey": 7901,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“对象是书就只能用发现”",
      "text": "你把对象名称当成唯一标准了。关键不只是“书”，还要看安娜是直接看到，还是根据迹象作出判断。",
      "choiceGroupId": "choice_dynamic_condition",
      "nextNodeId": "dlg_s07_001",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s07_condition_synonym": {
      "textId": "err_s07_condition_synonym",
      "orderKey": 7902,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“察觉和发现可以互换”",
      "text": "“察觉”和“发现”并不能自由互换。一个更偏向直接发现具体对象，一个更偏向从迹象感知变化或异常。",
      "choiceGroupId": "choice_dynamic_condition",
      "nextNodeId": "dlg_s07_001",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s07_usage_discover": {
      "textId": "err_s07_usage_discover",
      "orderKey": 7903,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“直接看到或找到具体物品”",
      "text": "这更接近“发现”。它强调直接看到、找到具体事物，或者获得新的信息。",
      "choiceGroupId": "choice_dynamic_usage",
      "nextNodeId": "dlg_s07_003",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "err_s07_usage_realize": {
      "textId": "err_s07_usage_realize",
      "orderKey": 7904,
      "sceneId": "scene_07_dynamic_followup",
      "uiType": "error_dialogue",
      "speakerId": "yan_ci",
      "expressionId": "yan_ci_sharp_question",
      "triggerDescription": "选择“经过思考形成新的认识”",
      "text": "这更接近“发觉”。它通常表示经过观察或思考后，意识到某件事或自己的认识发生了变化。",
      "choiceGroupId": "choice_dynamic_usage",
      "nextNodeId": "dlg_s07_003",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s08_searching": {
      "textId": "sys_s08_searching",
      "orderKey": 8010,
      "sceneId": "scene_08_corpus",
      "uiType": "loading_text",
      "triggerDescription": "进入语料检索",
      "text": "正在检索教师审核语料库……",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s08_rule": {
      "textId": "screen_s08_rule",
      "orderKey": 8030,
      "sceneId": "scene_08_corpus",
      "uiType": "screen_text",
      "triggerDescription": "两条例句显示后",
      "text": "辨析依据：“发现”可以直接搭配具体事物；“察觉”常采用“察觉到”的形式，与变化、情绪和异常情况搭配。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s08_reviewed": {
      "textId": "sys_s08_reviewed",
      "orderKey": 8040,
      "sceneId": "scene_08_corpus",
      "uiType": "system_prompt",
      "triggerDescription": "语料与规则显示完成",
      "text": "以上语料及辨析规则均已通过教师审核。",
      "nextNodeId": "dlg_s08_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s09_judgment": {
      "textId": "screen_s09_judgment",
      "orderKey": 9050,
      "sceneId": "scene_09_first_judgment",
      "uiType": "screen_text",
      "triggerDescription": "明义完成判决说明",
      "text": "显示词义判决书。",
      "nextNodeId": "dlg_s09_004",
      "priority": "high",
      "notes": "实际判决正文见judgments工作表。",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s10_environment": {
      "textId": "screen_s10_environment",
      "orderKey": 10010,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "screen_text",
      "triggerDescription": "进入快速判词一",
      "text": "环境信息：\n湿度升至78%｜警报灯闪烁｜通风设备异响｜尚未确认具体原因",
      "nextNodeId": "dlg_s10_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s10_question": {
      "textId": "screen_s10_question",
      "orderKey": 10030,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "question",
      "triggerDescription": "明义提问完成",
      "text": "走进阅览室以后，我＿＿到这里的气氛有些异常。\n选项：发现｜发觉｜察觉",
      "choiceGroupId": "choice_quick_01",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s10_choose": {
      "textId": "act_s10_choose",
      "orderKey": 10040,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "action_hint",
      "triggerDescription": "显示题目",
      "text": "请选择一个词语。",
      "choiceGroupId": "choice_quick_01",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s10_recommendation": {
      "textId": "sys_s10_recommendation",
      "orderKey": 10070,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "system_prompt",
      "triggerDescription": "选择“察觉”",
      "text": "推荐表达：我察觉到这里的气氛有些异常。",
      "nextNodeId": "dlg_s11_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s11_catalog": {
      "textId": "screen_s11_catalog",
      "orderKey": 11010,
      "sceneId": "scene_11_quick_fajue",
      "uiType": "screen_text",
      "triggerDescription": "进入快速判词二",
      "text": "蓝色新书：A071\n《星河手稿》：M019\n检索结果：编号不一致",
      "nextNodeId": "dlg_s11_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s11_question": {
      "textId": "screen_s11_question",
      "orderKey": 11030,
      "sceneId": "scene_11_quick_fajue",
      "uiType": "question",
      "triggerDescription": "明义提问完成",
      "text": "查看编号以后，我才＿＿自己认错了。\n选项：发现｜发觉｜察觉",
      "choiceGroupId": "choice_quick_02",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s11_choose": {
      "textId": "act_s11_choose",
      "orderKey": 11040,
      "sceneId": "scene_11_quick_fajue",
      "uiType": "action_hint",
      "triggerDescription": "显示题目",
      "text": "请选择一个词语。",
      "choiceGroupId": "choice_quick_02",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s11_recommendation": {
      "textId": "sys_s11_recommendation",
      "orderKey": 11070,
      "sceneId": "scene_11_quick_fajue",
      "uiType": "system_prompt",
      "triggerDescription": "选择“发觉”",
      "text": "推荐表达：查看编号以后，我才发觉自己认错了。",
      "nextNodeId": "dlg_s12_001",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "err_quick_wrong": {
      "textId": "err_quick_wrong",
      "orderKey": 11901,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "error_dialogue",
      "speakerId": "ming_yi",
      "expressionId": "ming_yi_quiet_review",
      "triggerDescription": "快速判词选择错误",
      "text": "再看一次当前信息。这个句子强调的是直接看到、细微感知，还是认识变化？",
      "priority": "error",
      "notes": "同时适用于快速判词一和二。",
      "sourceFile": "demo_script_master.docx"
    },
    "err_quick_wrong_hint": {
      "textId": "err_quick_wrong_hint",
      "orderKey": 11902,
      "sceneId": "scene_10_quick_chajue",
      "uiType": "error_feedback",
      "triggerDescription": "明义错误反馈结束",
      "text": "请重新判断信息的获得方式。",
      "priority": "error",
      "sourceFile": "demo_script_master.docx"
    },
    "act_s12_move_cart": {
      "textId": "act_s12_move_cart",
      "orderKey": 12010,
      "sceneId": "scene_12_truth",
      "uiType": "action_hint",
      "triggerDescription": "场景返回阅览室",
      "text": "移开还书车，点击车轮下的纸张。",
      "nextNodeId": "dlg_s12_001",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s12_transfer_record": {
      "textId": "screen_s12_transfer_record",
      "orderKey": 12040,
      "sceneId": "scene_12_truth",
      "uiType": "screen_text",
      "triggerDescription": "沈岚确认纸张",
      "text": "应急转移记录\n17:37，展柜湿度异常，《星河手稿》已转移至修复室防潮柜。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s12_get_record": {
      "textId": "sys_s12_get_record",
      "orderKey": 12050,
      "sceneId": "scene_12_truth",
      "uiType": "evidence_toast",
      "triggerDescription": "显示转移记录",
      "text": "获得证据卡：“应急转移记录”。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "screen_s13_definitions": {
      "textId": "screen_s13_definitions",
      "orderKey": 13040,
      "sceneId": "scene_13_ending",
      "uiType": "screen_text",
      "triggerDescription": "明义总结第一句完成",
      "text": "显示“发现、察觉、发觉”的释义。",
      "nextNodeId": "dlg_s13_003",
      "priority": "high",
      "notes": "实际释义见ending工作表。",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s13_case_closed": {
      "textId": "sys_s13_case_closed",
      "orderKey": 13060,
      "sceneId": "scene_13_ending",
      "uiType": "system_prompt",
      "triggerDescription": "结案总结完成",
      "text": "案件结案。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "sys_s13_achievement": {
      "textId": "sys_s13_achievement",
      "orderKey": 13070,
      "sceneId": "scene_13_ending",
      "uiType": "achievement",
      "triggerDescription": "案件结案",
      "text": "获得成就：“语境调查员”。",
      "priority": "high",
      "sourceFile": "demo_script_master.docx"
    },
    "hint_idle": {
      "textId": "hint_idle",
      "orderKey": 19901,
      "sceneId": "global",
      "uiType": "idle_hint",
      "triggerDescription": "长时间没有操作",
      "text": "提示：先判断宾语类型，再判断信息获得方式。",
      "priority": "normal",
      "sourceFile": "demo_script_master.docx"
    }
  },
  "evidence": {
    "evidence_blue_book": {
      "evidenceId": "evidence_blue_book",
      "displayName": "蓝色新书",
      "acquiredSceneId": "scene_02_return_cart",
      "acquisitionDescription": "点击还书车最上层的蓝色新书",
      "description": "一本放在还书车最上层、封面醒目的新书。",
      "purpose": "第一次词义审判的正确证据",
      "entersInventory": true,
      "isOptional": false,
      "thumbnailAssetId": "evidence_blue_book_thumb.png",
      "implementationNotes": "证据卡文字由代码渲染",
      "sourceRef": "demo脚本_重整版_v2.docx｜2.1正式证据卡",
      "tags": [
        "具体事物",
        "直接看到",
        "获得新信息"
      ],
      "imageAssetPath": "./public/assets/evidence/blue_new_book.png",
      "assetStatus": "ready"
    },
    "evidence_borrow_card": {
      "evidenceId": "evidence_borrow_card",
      "displayName": "安娜借阅卡",
      "acquiredSceneId": "scene_02_return_cart",
      "acquisitionDescription": "可选点击安娜借阅卡",
      "description": "证明安娜到过图书馆，但不能说明她如何注意到蓝色新书。",
      "purpose": "错误提交分支",
      "entersInventory": true,
      "isOptional": true,
      "thumbnailAssetId": "evidence_borrow_card_thumb.png",
      "implementationNotes": "不应作为首次审判的正确证据",
      "sourceRef": "demo脚本_重整版_v2.docx｜2.1正式证据卡",
      "tags": [
        "到场证明",
        "干扰证据"
      ],
      "imageAssetPath": "./public/assets/evidence/anna_library_card.png",
      "assetStatus": "ready"
    },
    "evidence_transfer_record": {
      "evidenceId": "evidence_transfer_record",
      "displayName": "应急转移记录",
      "acquiredSceneId": "scene_12_truth",
      "acquisitionDescription": "移开还书车并点击车轮下的纸张",
      "description": "17:37，展柜湿度异常，《星河手稿》已转移至修复室防潮柜。",
      "purpose": "证明手稿因湿度异常被转移至防潮柜",
      "entersInventory": true,
      "isOptional": false,
      "thumbnailAssetId": "evidence_transfer_record_thumb.png",
      "detailAssetId": "evidence_transfer_record_detail.png",
      "implementationNotes": "17:37及正文必须由代码渲染",
      "sourceRef": "demo脚本_重整版_v2.docx｜2.1正式证据卡",
      "tags": [
        "纸质记录",
        "真相证据",
        "设备异常"
      ],
      "imageAssetPath": "./public/assets/evidence/emergency_transfer_record.png",
      "assetStatus": "ready"
    }
  },
  "corpus": {
    "FX012": {
      "corpusId": "FX012",
      "sentence": "她在旧报纸中发现了一张照片。",
      "targetWord": "发现",
      "emphasisTokens": [
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        }
      ],
      "objectType": "具体物品",
      "informationMethod": "直接视觉",
      "contextFeature": "获得新信息",
      "teacherReviewed": true,
      "sceneId": "scene_08_corpus",
      "notes": "教师审核语料",
      "sourceRef": "demo_script_master.docx｜第八幕",
      "tags": [
        "具体物品",
        "直接视觉",
        "获得新信息"
      ]
    },
    "CJ008": {
      "corpusId": "CJ008",
      "sentence": "他察觉到房间里的气氛有些异常。",
      "targetWord": "察觉",
      "emphasisTokens": [
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        }
      ],
      "objectType": "异常状态",
      "informationMethod": "间接感知",
      "contextFeature": "细微迹象",
      "teacherReviewed": true,
      "sceneId": "scene_08_corpus",
      "notes": "教师审核语料",
      "sourceRef": "demo_script_master.docx｜第八幕",
      "tags": [
        "细微迹象",
        "间接感知",
        "异常状态"
      ]
    }
  },
  "judgments": {
    "judgment_01_faxian": {
      "judgmentId": "judgment_01_faxian",
      "sceneId": "scene_09_first_judgment",
      "originalText": "我在还书车上察觉了一本蓝色的新书。",
      "originalTargetWord": "察觉",
      "originalEmphasisTokens": [
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        }
      ],
      "result": "建议修改",
      "recommendedText": "我在还书车上发现了一本蓝色的新书。",
      "recommendedWord": "发现",
      "recommendedEmphasisTokens": [
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        }
      ],
      "reasoning": "她一眼看到的是位置明显的具体书籍；若使用“察觉”，听者会期待不易直接观察的变化或异常。",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第九幕",
      "tags": [
        "具体事物",
        "直接观察",
        "获得新信息"
      ],
      "references": [
        "evidence_blue_book",
        "FX012",
        "CJ008"
      ]
    },
    "judgment_02_chajue": {
      "judgmentId": "judgment_02_chajue",
      "sceneId": "scene_10_quick_chajue",
      "originalText": "走进阅览室以后，我＿＿到这里的气氛有些异常。",
      "result": "推荐用词",
      "recommendedText": "我察觉到这里的气氛有些异常。",
      "recommendedWord": "察觉",
      "recommendedEmphasisTokens": [
        {
          "token": "察觉",
          "occurrence": 1,
          "style": "chajue"
        }
      ],
      "reasoning": "“察觉”更能突出从设备杂音、人物反应等细微迹象中形成的感受。",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十幕",
      "tags": [
        "细微迹象",
        "间接感知",
        "异常状态"
      ],
      "references": [
        "screen_s03_environment",
        "CJ008"
      ]
    },
    "judgment_03_fajue": {
      "judgmentId": "judgment_03_fajue",
      "sceneId": "scene_11_quick_fajue",
      "originalText": "查看编号以后，我才＿＿自己认错了。",
      "result": "推荐用词",
      "recommendedText": "查看编号以后，我才发觉自己认错了。",
      "recommendedWord": "发觉",
      "recommendedEmphasisTokens": [
        {
          "token": "发觉",
          "occurrence": 1,
          "style": "fajue"
        }
      ],
      "acceptableAlternative": "发现自己认错了",
      "alternativeEmphasisTokens": [
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        }
      ],
      "reasoning": "“发觉”突出观察和比较后的认识变化；“发现自己认错了”也可成立，但表达重点略有不同。",
      "reasoningEmphasisTokens": [
        {
          "token": "发觉",
          "occurrence": 1,
          "style": "fajue"
        },
        {
          "token": "发现",
          "occurrence": 1,
          "style": "faxian"
        }
      ],
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十一幕",
      "tags": [
        "观察比较",
        "认识变化"
      ],
      "references": [
        "screen_s04_catalog_result"
      ]
    }
  },
  "ending": [
    {
      "entryId": "ending_definition_faxian",
      "category": "definition",
      "order": 1,
      "title": "发现",
      "text": "直接看到、找到或了解到新的事物和信息。",
      "sceneId": "scene_13_ending",
      "triggerId": "screen_s13_definitions",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    },
    {
      "entryId": "ending_definition_chajue",
      "category": "definition",
      "order": 2,
      "title": "察觉",
      "text": "通过细微迹象感受到变化或异常。",
      "sceneId": "scene_13_ending",
      "triggerId": "screen_s13_definitions",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    },
    {
      "entryId": "ending_definition_fajue",
      "category": "definition",
      "order": 3,
      "title": "发觉",
      "text": "经过观察、比较或思考形成新的认识。",
      "sceneId": "scene_13_ending",
      "triggerId": "screen_s13_definitions",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    },
    {
      "entryId": "ending_rule",
      "category": "takeaway",
      "order": 4,
      "title": "三个判断问题",
      "text": "对象是什么，信息怎样获得，认识是否发生了变化。",
      "sceneId": "scene_13_ending",
      "triggerId": "dlg_s13_003",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    },
    {
      "entryId": "ending_case_closed",
      "category": "result",
      "order": 5,
      "title": "案件结案",
      "text": "案件结案。",
      "sceneId": "scene_13_ending",
      "triggerId": "sys_s13_case_closed",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    },
    {
      "entryId": "ending_achievement",
      "category": "achievement",
      "order": 6,
      "title": "语境调查员",
      "text": "获得成就：“语境调查员”。",
      "sceneId": "scene_13_ending",
      "triggerId": "sys_s13_achievement",
      "status": "已定稿",
      "sourceRef": "demo_script_master.docx｜第十三幕"
    }
  ]
};
})(window);
