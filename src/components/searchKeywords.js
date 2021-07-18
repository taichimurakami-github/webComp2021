export const searchKeywords = {
  categolize: {
    emotion: {
      //通常状態
      neutral: {
        genre: ["pops", "rock", "anime", "jazz", "heavyMetal", "folk", "regae"],
        sub: ["気分が上がる", "人気", "最新"],
      },
      //怒り
      anger: {
        genre: ["pops", "rock", "anime"],
        sub: ["リラックス", "落ち着く", "気分が上がる"],
      },
      //侮蔑
      contempt: {
        genre: ["pops", "rock", "anime"],
        sub: ["リラックス", "落ち着く", "気分が上がる"],
      },
      //嫌悪
      disgust: {
        genre: ["pops", "rock", "classic", "anime"],
        sub: ["気分が上がる", "", ""]
      },
      //恐怖
      fear: {
        genre: ["pops", "rock", "anime"]
      },
      //幸せ
      happiness: {
        genre: ["pops", "rock", "anime"]
      },
      //悲しみ
      sadness: {
        genre: ["pops", "rock", "anime"]
      },
      //驚き
      surprise: {
        genre: ["pops", "rock", "anime"]
      },
    },
  },

  instrumental: ["オフボーカル"],

  genre: {
    pops: {
      keyword: ["j-pop", "k-pop", "pops"],
      attribute: ["popular", "lyrics", "regional"]
    },
    rock: {
      keyword: ["ロック"],
      attribute: ["intence", "lyrics", "regional"],
    },
    anime: {
      keyword: ["アニソン", "A-POP"],
      attribute: ["popular", "lyrics","wide"],
    },
    jazz: {
      keyword: ["ジャズ", "jazz"],
      attribute: ["calm","environment"]
    },
    heavyMetal: {
      keyword: ["ヘヴィメタル"],
      attribute: ["intence", "non-bgm"]
    },
    folk: {
      keyword: ["フォーク"],
      attribute: ["confort", "bgm", "non-bgm"],
    },
    reggae: {
      keyword: [""],
      attribute: [],
    },
    classic: {
      keyword: [""],
      attribute: [],
    },
  },
  subwords: {
    region: {
      asia: [["日本", "韓国", "中国", "アジア"],["japan", "korea", "china", "asia"]],
      europe: ["england", "spain", "scotland"],
      america: ["america", "canada"],
    },
    season: ["spring", "summer", "autumn", "winter"],
    environment: ["朝", "日中", "夕方", "寝る前", "深夜",],
    situation: ["作業用", "集中", "カフェ", "やる気が出る", ""],
    series: ["ジブリ", "エヴァ"],
    others: ["人気", "最新", "流行"]
  },

  filter: {
    lyrics: {
      none: ["offvocal", "カラオケ"],
    },
  }
}