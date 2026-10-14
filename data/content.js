// Generated from data/content.json by scripts/build-data.cjs. Do not edit.
window.MUSIC_CONTENT = {
  "schemaVersion": "2.0",
  "verifiedDateUtc": "2026-10-13",
  "purpose": "私人离线音乐网站首版的内容规格；未实现网站",
  "scope": {
    "albumCount": 9,
    "trackCount": 90,
    "catalogLabel": "部分收录目录（9发行）",
    "isCompleteDiscography": false,
    "doNotExpandCatalogAutomatically": true,
    "note": "收录9张发行；本轮仅新增网易云现场版与卷二，仍非完整目录。"
  },
  "editorialPolicy": {
    "showSourceLinks": true,
    "datePolicy": "按各发行已选定的平台版本日期排序：既有7张沿用原Apple口径，本轮新增2张使用网易云；平台日期不等于最早发行日。",
    "pendingPolicy": "缺失的背景、当前阵容、逐曲署名或听感笔记保持null与pending，界面可隐藏或显示待补，不能用通用句填空。",
    "lyricsPolicy": "不下载、不复制、不写入歌词；不根据题名或封面推断歌词含义。",
    "creditPolicy": "乐队分工与专辑级演职员不可批量填充逐曲词曲、演奏或制作署名。",
    "rightsPolicy": "来源可公开访问不代表本站获得音乐、封面、照片、歌词或采样的使用权。",
    "stylePolicy": "区分艺人自述、采访作者观点、平台流派标签、编辑试听分析；不混为客观或官方定论。"
  },
  "artists": [
    {
      "artistId": "zhang-weibo",
      "displayName": "张伟博",
      "entityType": "person",
      "relatedArtistIds": [
        "nanqing",
        "zanshi"
      ],
      "bio": {
        "text": "张伟博是南青、赞诗的主唱与创作者。在2024年的采访中，他说明南青的创作主要由自己推动，而在赞诗负责歌词、人声和旋律。他重视自主创作，希望持续制作自己认同的音乐，并把河南作为继续做乐队的地方。",
        "status": "verified_attributed",
        "sourceIds": [
          "interview-1701-20240125",
          "interview-zhengguan-20221030",
          "interview-streetvoice-20230216"
        ]
      },
      "roles": [
        {
          "artistId": "nanqing",
          "role": "主唱",
          "status": "verified",
          "sourceIds": [
            "interview-zhengguan-20221030",
            "label-sonice-hunter-20250504"
          ]
        },
        {
          "artistId": "nanqing",
          "role": "主要创作推动者",
          "status": "verified_self_report",
          "asOf": "2024-01-25",
          "sourceIds": [
            "interview-1701-20240125"
          ],
          "note": "角色概述，不转换为所有歌曲词曲或制作署名。"
        },
        {
          "artistId": "zanshi",
          "role": "歌词、人声、旋律",
          "status": "verified_self_report",
          "asOf": "2024-01-25",
          "sourceIds": [
            "interview-1701-20240125"
          ],
          "note": "乐队分工概述，不覆盖逐曲版权署名。"
        }
      ],
      "portraitAsset": {
        "status": "pending",
        "value": null,
        "note": "本包未获取或授权人物照片。"
      }
    },
    {
      "artistId": "nanqing",
      "displayName": "南青",
      "platformName": "南青乐队",
      "entityType": "band",
      "relatedArtistIds": [
        "zhang-weibo"
      ],
      "bio": {
        "text": "南青是一支扎根河南、在郑州活动的摇滚乐队，由张伟博在大学时期组建。Grunge是乐队的重要创作方向；张伟博在采访中谈到，希望写出年轻人成长时的疑问与烦恼。作品从早期自制唱片，延伸到与录音室及制作人的合作。",
        "status": "verified_attributed",
        "sourceIds": [
          "interview-1701-20240125",
          "interview-zhengguan-20221030",
          "label-sonice-hunter-20250504"
        ]
      },
      "formation": {
        "status": "conflict",
        "date": null,
        "displayText": "大学时期组建，确切年份待核",
        "alternatives": [
          {
            "date": "2016-11",
            "sourceIds": [
              "interview-1701-20240125"
            ]
          },
          {
            "date": "2017",
            "sourceIds": [
              "interview-zhengguan-20221030",
              "event-tour-nanqing-2022-repost"
            ]
          }
        ]
      },
      "currentLineup": {
        "status": "pending",
        "members": [],
        "note": "2025猎人与爱演职员可作专辑快照，不能当作2026最新固定阵容。"
      }
    },
    {
      "artistId": "zanshi",
      "displayName": "赞诗",
      "aliases": [
        "贊詩"
      ],
      "entityType": "band",
      "relatedArtistIds": [
        "zhang-weibo"
      ],
      "bio": {
        "text": "赞诗于2021年在郑州组建。乐队在街声自述中强调，用重复乐句、合成器、吉他效果与民族乐器营造迷幻听感。其创作由成员共同推进，张伟博承担人声、歌词和旋律；《神农尝百草》则被他们提出为一项持续探索不同声音的长期计划。",
        "status": "verified_attributed",
        "sourceIds": [
          "interview-streetvoice-20230216",
          "artist-streetvoice-zanshi-about",
          "interview-1701-20240125"
        ]
      },
      "formation": {
        "status": "verified",
        "date": "2021",
        "precision": "year",
        "location": "郑州",
        "sourceIds": [
          "interview-streetvoice-20230216"
        ],
        "note": "1701称2021年底；本包采用较保守年份。"
      },
      "currentLineup": {
        "status": "pending",
        "members": [],
        "note": "2023采访名单为历史阵容，不直接显示为当前阵容。"
      }
    }
  ],
  "albums": [
    {
      "albumId": "nanqing_march",
      "artistId": "nanqing",
      "title": "我在三月的早晨看到了七月的黄昏",
      "displayTitle": "我在三月的早晨看到了七月的黄昏",
      "editionType": "Album",
      "trackCount": 7,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-nanqing_march"
      ],
      "platformDate": {
        "value": "2020-03-11",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-nanqing_march"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "2024年的1701采访回顾：这张卧室自制唱片集中了张伟博少年时期、约11至18岁的歌曲创作。",
        "status": "verified_editorial_account",
        "sourceIds": [
          "interview-1701-20240125"
        ],
        "note": "不推算每首写作年份；标题用Apple版本全名。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "nanqing_four_seasons",
      "artistId": "nanqing",
      "title": "四季歌 - EP",
      "displayTitle": "四季歌",
      "editionType": "EP",
      "trackCount": 5,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-nanqing_four_seasons"
      ],
      "platformDate": {
        "value": "2020-06-30",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-nanqing_four_seasons"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": null,
        "status": "pending",
        "sourceIds": [],
        "note": "尚无足够直接来源支持具体创作背景。可显示五首曲目和平台元数据，不从四季题名推导故事。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "nanqing_streetless_city",
      "artistId": "nanqing",
      "title": "无街之城",
      "displayTitle": "无街之城",
      "editionType": "Album",
      "trackCount": 11,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-nanqing_streetless_city"
      ],
      "platformDate": {
        "value": "2021-12-24",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-nanqing_streetless_city"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "1701的采访报道把这张唱片与乐队大学时期的共同生活和排练经历相联系，并以Grunge描述它的音乐取向。",
        "status": "verified_editorial_account",
        "sourceIds": [
          "interview-1701-20240125"
        ],
        "note": "这是报道的概述，不是逐曲作者解释；不标作乐队所有作品中的第一张。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "zanshi_jump_jinshui",
      "artistId": "zanshi",
      "title": "跳金水 - EP",
      "displayTitle": "跳金水",
      "editionType": "EP",
      "trackCount": 5,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-zanshi_jump_jinshui"
      ],
      "platformDate": {
        "value": "2022-02-18",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-zanshi_jump_jinshui"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "据2023年街声采访，乐队曾前往西安重录这张EP。张伟博也谈到，后来改用向摄影师购买的照片作为封面。",
        "status": "verified_interview_account",
        "sourceIds": [
          "interview-streetvoice-20230216"
        ],
        "note": "采访未给重录及换封面具体日期；不能把该过程擅自绑定任一平台日期。摄影师向乐队授权不等于向本站授权。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "alternatePlatformDates": [
        {
          "value": "2022-12-09",
          "platform": "StreetVoice",
          "type": "platform_displayed_release_date",
          "status": "verified",
          "sourceIds": [
            "artist-streetvoice-zanshi-albums"
          ],
          "note": "与Apple 2022-02-18不同；具体版本关系待核。"
        }
      ],
      "dateWarning": "存在跨平台日期差异，首次公开发行日待核；不要按最早或最晚日期自动消解。",
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "nanqing_scatter_wealth",
      "artistId": "nanqing",
      "title": "散财童子",
      "displayTitle": "散财童子",
      "editionType": "Album",
      "trackCount": 7,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-nanqing_scatter_wealth"
      ],
      "platformDate": {
        "value": "2023-02-08",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-nanqing_scatter_wealth"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": null,
        "status": "pending",
        "sourceIds": [],
        "note": "尚无足够直接来源支持专辑概念或制作背景，不根据标题或童年照片封面猜测寓意。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "zanshi_shennong_vol1",
      "artistId": "zanshi",
      "title": "神农尝百草·卷一",
      "displayTitle": "神农尝百草·卷一",
      "editionType": "Album",
      "trackCount": 10,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-zanshi_shennong_vol1"
      ],
      "platformDate": {
        "value": "2025-03-01",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-zanshi_shennong_vol1"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "乐队在2023年街声采访中谈及《神农尝百草》长期计划，设想以多卷作品探索不同声音。本次收录的是Apple所列2025年、十首曲目的《卷一》版本。",
        "status": "verified_plan_with_platform_edition",
        "sourceIds": [
          "interview-streetvoice-20230216",
          "apple-zanshi_shennong_vol1"
        ],
        "note": "当年的110首设想是计划；不写成已完成，也不把早期同名单曲、EP或未完曲单并入本版。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "dateWarning": "Qobuz搜索索引存在2025-02-28日期；本包只显示明确归属于Apple的2025-03-01，不猜测时区原因。",
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "nanqing_hunter_and_love",
      "artistId": "nanqing",
      "title": "猎人与爱",
      "displayTitle": "猎人与爱",
      "editionType": "Album",
      "trackCount": 14,
      "catalogStatus": "verified",
      "sourceIds": [
        "apple-nanqing_hunter_and_love"
      ],
      "platformDate": {
        "value": "2025-05-04",
        "type": "platform_displayed_release_date",
        "label": "Apple Music 页面标注日期",
        "platform": "Apple Music US",
        "status": "verified",
        "sourceIds": [
          "apple-nanqing_hunter_and_love"
        ]
      },
      "originalReleaseDate": {
        "value": "2025-05-04",
        "status": "verified",
        "sourceIds": [
          "label-sonice-hunter-20250504"
        ],
        "label": "已核实的数字发行日"
      },
      "background": {
        "text": "SONICE于2025年5月4日宣布专辑上线。乐队赴郊眠寺录音室，与李平合作完成这张十四首作品的唱片。",
        "status": "verified_label_account",
        "sourceIds": [
          "label-sonice-hunter-20250504"
        ],
        "note": "厂牌称其为第四张专辑；网站无需自行重算EP与专辑序号。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "逐曲署名未完成逐页核验。人物简介的角色与专辑演职员均不可自动继承。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "本次没有做逐曲试听分析，不生成乐器、节奏、情绪或歌词含义判断。"
      },
      "albumCredits": {
        "status": "verified",
        "scope": "album_level_only",
        "sourceIds": [
          "label-sonice-hunter-20250504"
        ],
        "performers": [
          {
            "name": "张伟博",
            "role": "人声"
          },
          {
            "name": "杨毅",
            "role": "吉他"
          },
          {
            "name": "赵博",
            "role": "贝斯"
          },
          {
            "name": "周天涯",
            "role": "鼓"
          },
          {
            "name": "王欢",
            "role": "中国鼓"
          },
          {
            "name": "禹哮宇",
            "role": "笛子"
          },
          {
            "name": "任雯雯、沈毅、安思宇",
            "role": "和声"
          }
        ],
        "production": [
          {
            "name": "李平",
            "role": "录音、混音、母带"
          },
          {
            "name": "大花",
            "role": "录音助理"
          },
          {
            "name": "郊眠寺录音室",
            "role": "录音棚"
          },
          {
            "name": "南青乐队",
            "role": "监制"
          },
          {
            "name": "design21",
            "role": "专辑设计"
          },
          {
            "name": "SONICE",
            "role": "所属厂牌"
          },
          {
            "name": "沈毅",
            "role": "出品人"
          },
          {
            "name": "郑州如幻文化传媒有限公司",
            "role": "出品"
          }
        ],
        "inheritToTracks": false
      }
    },
    {
      "albumId": "nanqing_i_wish_you_do_too_live",
      "artistId": "nanqing",
      "title": "I wish you do,too",
      "displayTitle": "I wish you do,too",
      "editionType": "Album",
      "editionSubtype": "现场版",
      "trackCount": 23,
      "catalogStatus": "verified_metadata_with_pending_song_ids_and_credits",
      "sourceIds": [
        "netease-artist-albums-32954300",
        "user-netease-tracklist-253303374-20261013"
      ],
      "platformDate": {
        "value": "2024-11-11",
        "type": "platform_displayed_release_date",
        "label": "网易云音乐页面标注日期",
        "platform": "网易云音乐",
        "status": "verified_api_and_user_screenshot",
        "sourceIds": [
          "netease-artist-albums-32954300",
          "user-netease-tracklist-253303374-20261013"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "《I wish you do,too》是南青乐队在网易云收录的现场版专辑，平台日期为2024-11-11，共23首。曲名均标有Live，本站按截图保留现场版本名称与曲序。",
        "status": "verified_editorial_metadata_summary",
        "sourceIds": [
          "netease-artist-albums-32954300",
          "user-netease-tracklist-253303374-20261013"
        ],
        "note": "原创简要转述发行事实，不表示已获得官方完整简介或试听分析。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "截图显示艺人只作展示；不能推断作词、作曲、编曲或制作署名。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "未做逐曲试听，不推断歌词、乐器或情绪。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      },
      "alternatePlatformDates": [],
      "dateWarning": null,
      "label": {
        "value": null,
        "status": "pending",
        "sourceIds": []
      },
      "officialDescription": {
        "text": null,
        "status": "pending",
        "sourceIds": []
      }
    },
    {
      "albumId": "zanshi_shennong_vol2",
      "artistId": "zanshi",
      "title": "神农尝百草·卷二",
      "displayTitle": "神农尝百草·卷二",
      "editionType": "Album",
      "editionSubtype": "录音室版",
      "trackCount": 8,
      "catalogStatus": "verified_metadata_with_pending_song_ids_and_credits",
      "sourceIds": [
        "netease-artist-albums-51533054",
        "user-netease-tracklist-382159655-20261013"
      ],
      "platformDate": {
        "value": "2026-06-20",
        "type": "platform_displayed_release_date",
        "label": "网易云音乐页面标注日期",
        "platform": "网易云音乐",
        "status": "verified_api_and_user_screenshot",
        "sourceIds": [
          "netease-artist-albums-51533054",
          "user-netease-tracklist-382159655-20261013"
        ]
      },
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "background": {
        "text": "《神农尝百草·卷二》是贊詩在网易云收录的录音室版专辑，平台日期为2026-06-20，共8首。本站按用户提供的网易云页面保留八首曲目的名称与曲序。",
        "status": "verified_editorial_metadata_summary",
        "sourceIds": [
          "netease-artist-albums-51533054",
          "user-netease-tracklist-382159655-20261013"
        ],
        "note": "原创简要转述发行事实，不表示已获得官方完整简介或试听分析。"
      },
      "trackCredits": {
        "status": "pending",
        "entries": [],
        "note": "截图显示艺人只作展示；不能推断作词、作曲、编曲或制作署名。"
      },
      "listeningNotes": {
        "status": "pending",
        "text": null,
        "note": "未做逐曲试听，不推断歌词、乐器或情绪。"
      },
      "albumCredits": {
        "status": "pending",
        "scope": "album_level_only",
        "performers": [],
        "production": [],
        "sourceIds": [],
        "inheritToTracks": false
      },
      "alternatePlatformDates": [],
      "dateWarning": null,
      "label": {
        "value": "郑州如幻文化传媒有限公司",
        "status": "verified_platform_metadata",
        "sourceIds": [
          "netease-artist-albums-51533054"
        ]
      },
      "officialDescription": {
        "text": null,
        "status": "pending",
        "sourceIds": []
      }
    }
  ],
  "releaseTimeline": [
    {
      "eventId": "release-nanqing_march",
      "albumId": "nanqing_march",
      "artistId": "nanqing",
      "date": "2020-03-11",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "我在三月的早晨看到了七月的黄昏",
      "description": "Album · 7 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-nanqing_march"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-nanqing_four_seasons",
      "albumId": "nanqing_four_seasons",
      "artistId": "nanqing",
      "date": "2020-06-30",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "四季歌",
      "description": "EP · 5 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-nanqing_four_seasons"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-nanqing_streetless_city",
      "albumId": "nanqing_streetless_city",
      "artistId": "nanqing",
      "date": "2021-12-24",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "无街之城",
      "description": "Album · 11 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-nanqing_streetless_city"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-zanshi_jump_jinshui",
      "albumId": "zanshi_jump_jinshui",
      "artistId": "zanshi",
      "date": "2022-02-18",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "跳金水",
      "description": "EP · 5 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-zanshi_jump_jinshui"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [
        {
          "value": "2022-12-09",
          "platform": "StreetVoice",
          "type": "platform_displayed_release_date",
          "status": "verified",
          "sourceIds": [
            "artist-streetvoice-zanshi-albums"
          ],
          "note": "与Apple 2022-02-18不同；具体版本关系待核。"
        }
      ],
      "warning": "存在跨平台日期差异，首次公开发行日待核；不要按最早或最晚日期自动消解。"
    },
    {
      "eventId": "release-nanqing_scatter_wealth",
      "albumId": "nanqing_scatter_wealth",
      "artistId": "nanqing",
      "date": "2023-02-08",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "散财童子",
      "description": "Album · 7 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-nanqing_scatter_wealth"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-nanqing_i_wish_you_do_too_live",
      "albumId": "nanqing_i_wish_you_do_too_live",
      "artistId": "nanqing",
      "date": "2024-11-11",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "网易云音乐页面标注日期",
      "title": "I wish you do,too",
      "description": "现场版 · 23 首",
      "status": "verified_platform_metadata_and_user_screenshot",
      "sourceIds": [
        "netease-artist-albums-32954300",
        "user-netease-tracklist-253303374-20261013"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-zanshi_shennong_vol1",
      "albumId": "zanshi_shennong_vol1",
      "artistId": "zanshi",
      "date": "2025-03-01",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "神农尝百草·卷一",
      "description": "Album · 10 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-zanshi_shennong_vol1"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": "Qobuz搜索索引存在2025-02-28日期；本包只显示明确归属于Apple的2025-03-01，不猜测时区原因。"
    },
    {
      "eventId": "release-nanqing_hunter_and_love",
      "albumId": "nanqing_hunter_and_love",
      "artistId": "nanqing",
      "date": "2025-05-04",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "Apple Music 页面标注日期",
      "title": "猎人与爱",
      "description": "Album · 14 首",
      "status": "verified_platform_metadata",
      "sourceIds": [
        "apple-nanqing_hunter_and_love"
      ],
      "originalReleaseDate": {
        "value": "2025-05-04",
        "status": "verified",
        "sourceIds": [
          "label-sonice-hunter-20250504"
        ],
        "label": "已核实的数字发行日"
      },
      "alternatePlatformDates": [],
      "warning": null
    },
    {
      "eventId": "release-zanshi_shennong_vol2",
      "albumId": "zanshi_shennong_vol2",
      "artistId": "zanshi",
      "date": "2026-06-20",
      "dateType": "platform_displayed_release_date",
      "dateLabel": "网易云音乐页面标注日期",
      "title": "神农尝百草·卷二",
      "description": "录音室版 · 8 首",
      "status": "verified_platform_metadata_and_user_screenshot",
      "sourceIds": [
        "netease-artist-albums-51533054",
        "user-netease-tracklist-382159655-20261013"
      ],
      "originalReleaseDate": {
        "value": null,
        "status": "pending",
        "sourceIds": [],
        "label": "首次公开发行日待核"
      },
      "alternatePlatformDates": [],
      "warning": null
    }
  ],
  "styleDescriptions": [
    {
      "styleId": "nanqing-artist-position",
      "artistId": "nanqing",
      "kind": "artist_interview_position",
      "text": "南青：以Grunge为重要方向，关注成长中的疑问与烦恼。",
      "status": "verified_attributed",
      "sourceIds": [
        "interview-zhengguan-20221030"
      ],
      "uiLabel": "采访中的创作方向"
    },
    {
      "styleId": "zanshi-profile-position",
      "artistId": "zanshi",
      "kind": "artist_self_description",
      "text": "赞诗：以重复乐句、效果器、合成器与民族乐器构成迷幻声响。",
      "status": "verified_attributed",
      "sourceIds": [
        "artist-streetvoice-zanshi-about"
      ],
      "uiLabel": "乐队自述"
    },
    {
      "styleId": "editorial-listening-analysis",
      "artistId": null,
      "kind": "editorial_listening_analysis",
      "text": null,
      "status": "pending",
      "sourceIds": [],
      "uiLabel": "听感笔记",
      "note": "以后如加入听感分析，需记录试听版本并明确这是编辑观点；不得标为艺人原意。"
    }
  ],
  "sources": [
    {
      "sourceId": "interview-1701-20240125",
      "title": "张伟博：想做自己喜欢的东西，不想去迎合市场写些爆曲",
      "publisher": "1701MusicPark",
      "author": "小鱼",
      "publishedDate": "2024-01-25",
      "url": "https://www.weibo.com/ttarticle/p/show?id=2309404994023084654752",
      "sourceType": "original_artist_interview",
      "verifiedStatus": "verified",
      "scope": "角色分工、大学组队、早期自制专辑、无街之城经历；访谈中的艺人自述与作者叙述须区分。",
      "caveats": [
        "正文把南青成立时间记为2016年11月，与2022正观采访的2017年冲突。",
        "文中第一张卧室专辑的标题有缺字或变体；网站标题遵从本次选定Apple发行版本。",
        "文中称无街之城为第一张专辑，不能据此覆盖2020作品；不混用首张DIY与首张录音室专辑。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "interview-zhengguan-20221030",
      "title": "Z世代 郑出彩③ 有料青年 不同的事业同样的出彩",
      "publisher": "正观新闻",
      "author": "程子鑫、周梦真",
      "publishedDate": "2022-10-30",
      "url": "https://wap.zhengguannews.cn/news/232409",
      "sourceType": "original_report_with_artist_interview",
      "verifiedStatus": "verified",
      "scope": "南青主唱身份、郑州活动、Grunge创作方向、青春成长主题。",
      "caveats": [
        "报道正文的成立年2017与1701的2016年11月不同；不能据一篇排除另一篇。",
        "本文为2022历史采访，不能据此断言当前阵容。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "interview-streetvoice-20230216",
      "title": "卧谈 赞诗乐队 做一张110首歌的专辑 不是吹的",
      "publisher": "StreetVoice 大事",
      "author": "肉饼",
      "publishedDate": "2023-02-16",
      "url": "https://dashi.streetvoice.cn/article/20230216/001/",
      "sourceType": "original_band_interview",
      "verifiedStatus": "verified",
      "scope": "赞诗2021郑州组队、成员当时分工、跳金水重录及封面更换、神农尝百草长期计划。",
      "caveats": [
        "110首及10卷是2023采访中的计划；不是已经完成的事实。",
        "采访中预计卷一完成时间不能代替2025选定发行版本的上线时间。",
        "对歌词与概念的解释只适用于明确被问到的作品；本包不复制歌词。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "artist-streetvoice-zanshi-about",
      "title": "赞诗 关于我",
      "publisher": "StreetVoice 音乐人账号 tiny_zanshi_xub",
      "url": "https://www.streetvoice.cn/tiny_zanshi_xub/about/",
      "sourceType": "artist_platform_profile",
      "verifiedStatus": "verified",
      "scope": "乐队在街声的风格自述。",
      "identityBasis": "StreetVoice原始采访末尾收听入口指向相同账号。",
      "caveats": [
        "自我介绍不是独立乐评；必须标明乐队自述。",
        "平台注册时间不是乐队成立时间。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "artist-streetvoice-zanshi-albums",
      "title": "跳金水 贊詩 StreetVoice 专辑页",
      "publisher": "StreetVoice 音乐人账号 tiny_zanshi_xub",
      "url": "https://streetvoice.com/tiny_zanshi_xub/songs/album/97319419/",
      "sourceType": "artist_platform_album_metadata",
      "verifiedStatus": "verified",
      "scope": "完整专辑页：跳金水、五首曲目、发行日期2022-12-09；曲序与本次Apple版本相同。",
      "specificAlbumUrl": "https://streetvoice.com/tiny_zanshi_xub/songs/album/97319419/",
      "caveats": [
        "同一账号.com与.cn列表抓取曾返回不同快照；最终以可读取的完整.com专辑页为据。",
        "街声平台的发行日期不是已独立验证全网首发日；曲序一致也不足以证明音频母带版本相同。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "label-sonice-hunter-20250504",
      "title": "南青乐队第四张专辑 猎人与爱 正式上线",
      "publisher": "SONICE厂牌",
      "publishedDate": "2025-05-04",
      "publishedTimeAsDisplayed": "10:01",
      "url": "https://weibo.com/6487289189/Pqeqozqwc",
      "sourceType": "official_label_release_announcement",
      "verifiedStatus": "verified",
      "scope": "专辑上线日、14首曲目、郊眠寺录音室、李平合作、专辑级演职员。",
      "identityBasis": "原帖资料页认证郑州如幻文化传媒有限公司，与Apple唱片版权行一致。",
      "caveats": [
        "整张专辑演职员表不等于每首歌都有每位演奏者；不得自动向14首继承。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "event-tour-nanqing-2022-repost",
      "title": "SONICE厂牌呈现 南青 和整个世界同居 2022巡演 青岛站",
      "publisher": "FUN青岛 收录Downtown Live演出信息",
      "url": "https://fun.dakabang.net/fun/fun/2563/",
      "sourceType": "secondary_repost_of_promotional_text",
      "verifiedStatus": "verified_secondary",
      "scope": "辅助核对四季歌2020年、无街之城2021平安夜及首张录音室专辑说法。",
      "caveats": [
        "不作为首发日唯一权威。",
        "将四季歌称为合辑；本包显示EP是Apple选定版本类型。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "label-sonice-catalog-check-20261013",
      "title": "SONICE厂牌账号动态",
      "publisher": "SONICE厂牌 新浪呈现",
      "url": "https://www.sina.cn/media/6487289189",
      "sourceType": "official_label_account_feed",
      "verifiedStatus": "verified_cached_snapshot",
      "scope": "账号2026-06-20发布神农尝百草·卷二三首歌曲上线信息，证明本次7发行不是完整唱片目录。",
      "caveats": [
        "这是目录范围提醒；不自动扩充用户当前批准的七发行。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-nanqing_march",
      "title": "我在三月的早晨看到了七月的黄昏 Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E6%88%91%E5%9C%A8%E4%B8%89%E6%9C%88%E7%9A%84%E6%97%A9%E6%99%A8%E7%9C%8B%E5%88%B0%E4%BA%86%E4%B8%83%E6%9C%88%E7%9A%84%E9%BB%84%E6%98%8F/1823200545",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-nanqing_four_seasons",
      "title": "四季歌 - EP Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E5%9B%9B%E5%AD%A3%E6%AD%8C-ep/1823195838",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-nanqing_streetless_city",
      "title": "无街之城 Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E6%97%A0%E8%A1%97%E4%B9%8B%E5%9F%8E/1823195921",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-zanshi_jump_jinshui",
      "title": "跳金水 - EP Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E8%B7%B3%E9%87%91%E6%B0%B4-ep/1817376115",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-nanqing_scatter_wealth",
      "title": "散财童子 Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E6%95%A3%E8%B4%A2%E7%AB%A5%E5%AD%90/1823196584",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-zanshi_shennong_vol1",
      "title": "神农尝百草·卷一 Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E7%A5%9E%E5%86%9C%E5%B0%9D%E7%99%BE%E8%8D%89-%E5%8D%B7%E4%B8%80/1797523461",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "apple-nanqing_hunter_and_love",
      "title": "猎人与爱 Apple Music",
      "publisher": "Apple Music US",
      "url": "https://music.apple.com/us/album/%E7%8C%8E%E4%BA%BA%E4%B8%8E%E7%88%B1/1811077408",
      "sourceType": "platform_release_metadata",
      "verifiedStatus": "verified",
      "scope": "选定版本的标题、艺人、曲目数、平台标注发行日期；由独立日期核验文件复核。",
      "caveats": [
        "平台标注发行日不自动等于全网首次公开日；℗年份另属版权元数据。"
      ],
      "checkedDateUtc": "2026-10-13"
    },
    {
      "sourceId": "netease-artist-albums-32954300",
      "title": "网易云音乐：南青乐队发行目录",
      "publisher": "网易云音乐",
      "url": "https://music.163.com/api/artist/albums/32954300?offset=0&limit=100",
      "sourceType": "official_public_artist_album_api",
      "verifiedStatus": "verified_release_metadata",
      "scope": "直接读取艺人发行目录，确认本发行的ID、艺人、名称、平台日期、类型、声明曲数与封面URL；不包含曲表。",
      "checkedDateUtc": "2026-10-13",
      "caveats": [
        "专辑详情接口返回手机绑定要求；没有绕过或将受限响应当成曲表证据。"
      ]
    },
    {
      "sourceId": "user-netease-tracklist-253303374-20261013",
      "title": "I wish you do,too：用户提供的网易云曲表截图",
      "publisher": "用户提供的网易云页面截图",
      "url": "https://music.163.com/album?id=253303374",
      "sourceType": "user_supplied_netease_album_tracklist_screenshots",
      "verifiedStatus": "verified_visual_transcription",
      "scope": "完整曲名、曲序、显示艺人与MM:SS时长已逐行核对；该URL为对应专辑入口，不代表网页详情已直接读取。",
      "checkedDateUtc": "2026-10-13",
      "evidenceFiles": [
        "image(20261013-135428).png",
        "image(20261013-135429).png"
      ],
      "evidenceSha256": [
        "4e8a4bbba9bf586e4bf1cd6a543329886de7dd18a4dc45170f3b989aa480db14",
        "e682c393784a018126dda9232a6678ef1608d7fdd5629dca7c1fa0c7305a8fd8"
      ],
      "caveats": [
        "网易song ID和独立歌曲URL不可见，保留null。",
        "时长为截图秒级显示值，不是毫秒元数据或实际音频测量值。"
      ]
    },
    {
      "sourceId": "netease-artist-albums-51533054",
      "title": "网易云音乐：贊詩发行目录",
      "publisher": "网易云音乐",
      "url": "https://music.163.com/api/artist/albums/51533054?offset=0&limit=100",
      "sourceType": "official_public_artist_album_api",
      "verifiedStatus": "verified_release_metadata",
      "scope": "直接读取艺人发行目录，确认本发行的ID、艺人、名称、平台日期、类型、声明曲数与封面URL；不包含曲表。",
      "checkedDateUtc": "2026-10-13",
      "caveats": [
        "专辑详情接口返回手机绑定要求；没有绕过或将受限响应当成曲表证据。"
      ]
    },
    {
      "sourceId": "user-netease-tracklist-382159655-20261013",
      "title": "神农尝百草·卷二：用户提供的网易云曲表截图",
      "publisher": "用户提供的网易云页面截图",
      "url": "https://music.163.com/album?id=382159655",
      "sourceType": "user_supplied_netease_album_tracklist_screenshots",
      "verifiedStatus": "verified_visual_transcription",
      "scope": "完整曲名、曲序、显示艺人与MM:SS时长已逐行核对；该URL为对应专辑入口，不代表网页详情已直接读取。",
      "checkedDateUtc": "2026-10-13",
      "evidenceFiles": [
        "image(20261013-135427).png"
      ],
      "evidenceSha256": [
        "14aaa8ee3d7c56efbbb55c441dc24d2bed4d8772ff600cdac7690d1a80c01504"
      ],
      "caveats": [
        "网易song ID和独立歌曲URL不可见，保留null。",
        "时长为截图秒级显示值，不是毫秒元数据或实际音频测量值。"
      ]
    }
  ],
  "openIssues": [
    {
      "issueId": "nanqing-formation-year",
      "status": "conflict",
      "summary": "南青成立时间2016年11月与2017年冲突；正文只写大学时期。"
    },
    {
      "issueId": "jump-jinshui-editions",
      "status": "pending",
      "summary": "2022-02-18 Apple日期、2022-12-09街声发表日和重录换封面的关系待核。"
    },
    {
      "issueId": "shennong-edition-date",
      "status": "pending",
      "summary": "Apple与Qobuz索引差一天；2022/2023同名计划、EP与2025十曲版本不能合并。"
    },
    {
      "issueId": "four-seasons-background",
      "status": "pending",
      "summary": "四季歌具体创作背景与原始EP/合辑口径待核。"
    },
    {
      "issueId": "scatter-wealth-background",
      "status": "pending",
      "summary": "散财童子具体创作背景待核。"
    },
    {
      "issueId": "track-credits",
      "status": "pending",
      "summary": "90条曲目记录的逐曲署名尚未完成核验；新增31条截图显示艺人不等于制作署名。"
    },
    {
      "issueId": "current-lineups",
      "status": "pending",
      "summary": "两支乐队2026当前固定阵容未确认。"
    },
    {
      "issueId": "netease-new-two-pending-song-ids-credits",
      "status": "pending",
      "summary": "新增两发行31条曲目的网易song ID、精确毫秒时长及详细署名待核；截图曲名、曲序及秒级显示时长已完整核对。"
    }
  ],
  "packageVersion": "2.0",
  "sourceFilePolicy": "content.json is the canonical editorial source. content-sources.json is a generated projection of its sources; do not edit both. Shared catalog basics are cross-checked snapshots; catalog.json owns runtime album and track metadata."
};
