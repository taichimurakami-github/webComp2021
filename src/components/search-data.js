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
    neutral: ["pops", "rock", "anime", "jazz", "heavyMetal", "folk", "regae", "game", "vocaloid"],
    //怒り
    anger: ["pops", "rock", "anime"],
    //侮蔑
    contempt: ["pops", "rock", "anime"],
    //嫌悪
    disgust: ["pops", "rock", "classic", "anime"],
    //恐怖
    fear: ["pops", "rock", "anime", "heavyMetal"],
    //幸せ
    happiness: ["pops", "rock", "anime"],
    //悲しみ
    sadness: ["pops", "rock", "anime"],
    //驚き
    surprise: ["pops", "rock", "anime"],
  },

  genre: {
    //正統派ジャンル系
    pops: {
      keyword: ["j-pop", "k-pop", "pops"],
      attribute: ["popular", "media", "arrange", "situation"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
      }
    },
    rock: {
      keyword: ["ロック"],
      attribute: ["popular", "age", "new"],
      availability: {
        season: false,
        time: false,
        instrumental: true,
      }
    },
    jazz: {
      keyword: ["ジャズ", "jazz"],
      attribute: ["popular", "age", "media", "new"],
      availability: {
        season: false,
        time: true,
        instrumental: true,
      }
    },
    heavyMetal: {
      keyword: ["ヘヴィメタル"],
      attribute: ["popular", "age", "new"],
      availability: {
        season: false,
        time: false,
        instrumental: true,
      }
    },
    folk: {
      keyword: ["フォークソング", "民謡",],
      attribute: ["popular", "age", "media"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
      }
    },
    reggae: {
      keyword: ["レゲエソング"],
      attribute: ["popular", "age"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
      }
    },
    classic: {
      keyword: ["クラシック音楽"],
      attribute: ["popular", "age"],
      availability: {
        season: true,
        time: true,
        instrumental: false,
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
      }
    },
    game: {
      keyword: ["ゲーム bgm"],
      attribute: ["popular", "new", "arrange"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
      }
    },
    vocaloid: {
      keyword: ["vocaloid"],
      attribute: ["popular", "arrange", "situation", "new", "media"],
      availability: {
        season: true,
        time: true,
        instrumental: true,
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