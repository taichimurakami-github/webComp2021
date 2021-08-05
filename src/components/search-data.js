const environmentDataList = {
  weather: {
    thunderstorm: "thunderstorm",
    drizzle: "trizzle",
    rain: "rain",
    snow: "snow",
    atmosphere: "atmosphere",
    clear: "clear",
    clouds: "clouds"
  },
  season: {
    spring: "spring",
    summer: "summer",
    autumn: "autumn",
    winter: "winter"
  },
  time: {
    midnight: "midnight",
    morning: "morning",
    beforenoon: "beforenoon",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  }
}


const searchDataList = {
  emotion: {
    //通常状態
    neutral: ["pops", "jazz", "rock", "heavyMetal", "folk", "reggae", "anime", "game", "vocaloid"],
    //怒り
    anger: ["pops", "jazz", "folk", "reggae", "classic"],
    //侮蔑
    contempt: ["pops", "rock", "anime"],
    //嫌悪
    disgust: ["pops", "classic", "jazz", "folk", "reggae"],
    //恐怖
    fear: ["pops", "rock", "anime", "heavyMetal", "vocaloid"],
    //幸せ
    happiness: ["pops", "rock", "jazz", "anime", "game", "vocaloid"],
    //悲しみ
    sadness: ["pops", "rock", "anime", "game", "vocaloid", "heavyMetal"],
    //驚き
    surprise: ["pops", "rock", "heavyMetal", "anime", "game", "vocaloid"],
  },

  genre: {
    //正統派ジャンル系
    pops: {
      keyword: ["j-pop", "k-pop", "pops", "ポップス"],
      attribute: ["popular", "media", "arrange", "situation"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    rock: {
      keyword: ["ロック", "rock",],
      attribute: ["popular", "age", "new"],
      availability: {
        season: false,
        time: false,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    jazz: {
      keyword: ["ジャズ", "jazz"],
      attribute: ["popular", "age", "media", "new"],
      availability: {
        season: false,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: false,
        }
      }
    },
    heavyMetal: {
      keyword: ["ヘヴィメタル"],
      attribute: ["popular", "age", "new"],
      availability: {
        season: false,
        time: false,
        instrumental: true,
        random: {
          popular: false,
          artist: false,
        }
      }
    },
    electronica: {
      keyword: ["エレクトロニカ"],
      attribute: [],
      availability: {
        season: false,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    folk: {
      keyword: ["フォークソング", "民謡",],
      attribute: ["popular", "age", "media"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: false,
        }
      }
    },
    reggae: {
      keyword: ["レゲエ", "ヒップホップ", "R&B"],
      attribute: ["popular", "age"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    classic: {
      keyword: ["クラシック音楽"],
      attribute: ["popular", "age"],
      availability: {
        season: true,
        time: true,
        instrumental: false,
        random: {
          popular: false,
          artist: true,
        }
      }
    },

    //二次創作、サブカル系 -> 範囲が広いので、さらに検索
    anime: {
      keyword: ["アニソン"],
      attribute: ["popular", "arrange", "situation", "new", "media"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    game: {
      keyword: ["ゲーム bgm"],
      attribute: ["popular", "new", "arrange"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
    vocaloid: {
      keyword: ["vocaloid"],
      attribute: ["popular", "arrange", "situation", "new", "media"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
        random: {
          popular: false,
          artist: true,
        }
      }
    },
  },
  environment: {
    season: {
      spring: ["春"],
      summer: ["夏", "涼しい"],
      autumn: ["秋"],
      winter: ["冬"],
    },
    time: {
      midnight: ["真夜中", "深夜"],
      morning: ["朝"],
      beforenoon: ["午前", "やる気の出る"],
      afternoon: ["午後", "リラックス"],
      evening: ["夕方"],
      night: ["夜", "寝る前"],
    }
  },
  random: {
    popular: ["懐かしの", "人気", "流行"],
    artist: {
      pops: {
        jpop: ["Green", "桑田圭佑", "嵐", "Official髭男dism", "YOASOBI", "Eve", "GODIEGO", "ゆず", "米津玄師", "ケグ名刺", "milet", "Awesome City Club", "藤井 風", "Ado", "ロイ-RoE-", "清水翔太", "あいみょん", "星野源",
          "B'z", "菅田将暉", "Da-iCE", "sumika", "Novelbright", "緑黄色社会", "ヨルシカ", "supercell"],
        kpop: ["BTS", "BLACKPINK", "TWICE", "ENHYPEN", "ATEEZ", "SEVENTEEN", "SHAUN", "ITZY", "ASTRO", "Ailee", "Crush", "IU"]
      },
      rock: ["優里", "back number", "MAN WITH A MISSION", "BUMP OF CHICKEN", "DISH//", "Alexandoros", "Novelbright", "緑黄書屋社会", "シド", "ONE OF ROCK", "Mrs. GREEN APPLE", "キタニタツヤ", "Mr. Children",
        "MY FIRST STORY", "SEKAI NO OWARI", "WANIMA", "ORANGE RANGE", "ポルカドットスティングレイ", "和楽器バンド", "スピッツ", "MONGOL800", "ずっと真夜中でいいのに。", "東京事変", "椎名林檎", "フレデリック", "神はサイコロを振らない",
        "GLAY", "millenium parade, Belle", "UNISON SQUARE GARDEN", "さユり"],

      jazz: {},
      heavyMetal: {},
      electronica: ["Perfume", "きゃりーぱみゅぱみゅ", "t+pazolite", "DJ Genki", "Srav3R", "CAPSULE", "高木正勝", "ORIENTAL SPACE", "YELLOW MAGIC ORCHESTRA", "電気グルーヴ"],
      folk: {},
      reggae: ["平井大", "t-Ace", "変態紳士クラブ", "三浦大知", "キヨサク", "nobodyknows+", "ちゃんみな", "Crystal Kay", "LIFE STYLE", "ANARCHY", "SIRUP", "エイトMAN", "775"],
      classic: {},
      anime: ["LiSA", "millenium parade", "Belle", "Official髭男dism", "Eve", "MAN WITH A MISSION", "fhana", "May'n", "水瀬いのり", "宇多田ヒカル", "Linked Horizon", "３月のパンタシア", "宮野真守", "高橋洋子", "雨宮天", "オーイシマサヨシ",
        "鈴木このみ", "神聖かまってちゃん", "藍井エイル", "Claris", "西沢幸奏", "TRUE", "TrySail", "放課後ティータイム", "supercell", "大橋彩香", "結城アイラ", "μ's", "石川智晶", "さユり", "AKINO", "EGOIST", "戸松遥", "やなぎなぎ", "春菜るな",
        "伊藤美来",],

      game: ["任天堂", "ゼルダ", "モンスターハンター", "太鼓の達人", "グルーヴコースター", "マリオ", "マリオカート", "メトロイド", "エースコンバット", "ぼくの夏休み", "リズム天国", "key", "ファイナルファンタジー", "クロノトリガー", "ドラゴンクエスト",
        "NeiR", "バイオハザード", "Minecraft", "メタルギア", "ポケモン", "ドンキーコング", "Fate", "どうぶつの森", "キングダムハーツ", "星のカービィ", "グラセフ", "鬼武者", "戦国無双", "桃太郎電鉄", "コールオブデューティー", "Apex", "グランツーリスモ",
        "リッジレーサー", "スプラトゥーン", "スマブラ", "鉄拳", "パックマン", "ストリートファイター", "SEKIRO",],
    },
    media: ["ドラマ", "映画", "CM"],
    arrange: ["メドレー", "アレンジ"],
    situation: ["作業用", "集中", "カフェ", "やる気が出る"],
    age: ["70年代", "80年代", "90年代", "2000年代", "2010年代"],
    new: ["最新の", "2021", "2020", "2019"]
  },

  options: {
    instrumental: ["instrumental"],
  }
}

export { environmentDataList, searchDataList };