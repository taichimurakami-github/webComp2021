export const searchKeywords = {
  fromInfoToAttr: {
    emotion: {
      neutral: {
        genre: ["pops"]
      },
      anger: {},
      contempt: {},
      disgust: {},
      fear: {},
      happiness: {},
      sadness: {},
      surprise: {},
    },
  },

  genre: {
    pops: {
      keyword: ["ポップス", "pops"],
      attribute: ["popular", "lyrics", "regional"]
    },
    rock: {
      keyword: ["ロック", "rock"],
      attribute: ["intence", "lyrics", "regional"],
    },
    anime: {
      keyword: ["アニソン", "A-POP"],
      attribute: ["popular", "lyrics",],
    },
    jazz: {
      keyword: ["ジャズ", "jazz"],
      attribute: ["calm",]
    }
    // heavyMetal: {
    //   keyword: ["ヘヴィメタル"],
    //   attribute: ["intence", "non-bgm"]
    // },
    // folk: {
    //   keyword: ["フォーク"],
    //   attribute: ["confort", "bgm", "non-bgm"],
    // },
    // reggae: {
    //   keyword: [""],
    //   attribute: [],
    // },
    // classic: {
    //   keyword: [""],
    //   attribute: [],
    // },
  },
  subwords: {
    region: {
      asia: ["japan", "korea", "china", "asia"],
      europe: ["england", "spain", "scotland"],
      america: ["america", "canada"],
      // others: {

      // }
    },
    season: ["spring", "summer", "autumn", "winter"],
    environment: ["朝", "日中", "夕方", "寝る前", "深夜",],
    situation: ["作業用", "集中", "カフェ"],
    series: {
      cinema: [],
      anime: ["ジブリ", "エヴァ"],
    }
  },

  filter: {
    lyrics: {
      none: ["offvocal", "カラオケ"],
    },
  }
}