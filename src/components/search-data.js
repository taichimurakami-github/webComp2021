export const searchData = {
  categolize: {
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
  },

  genre: {
    //正統派ジャンル系
    pops: {
      keyword: ["j-pop", "k-pop", "pops"],
      attribute: ["popular", "environment", "season"],
      subwords: [
        ["ドラマ", "映画", "CM"],
        ["懐かしの", "最新", "人気", "流行", "80年代", "90年代", "2000年代"],
        ["春", "夏", "秋", "冬", "寝る前", "朝", "夜", "昼"],
      ]
    },
    // rock: {
    //   keyword: ["ロック"],
    //   attribute: ["intence", "region", "offvocal"],
    // },
    // jazz: {
    //   keyword: ["ジャズ", "jazz"],
    //   attribute: ["environment", "age", "region"]
    // },
    // heavyMetal: {
    //   keyword: ["ヘヴィメタル"],
    //   attribute: ["intence"]
    // },
    // folk: {
    //   keyword: ["フォークソング", "民謡",],
    //   attribute: ["bgm", "region"],
    // },
    // reggae: {
    //   keyword: ["レゲエソング"],
    //   attribute: [],
    // },
    // classic: {
    //   keyword: ["クラシック音楽"],
    //   attribute: [],
    // },

    //二次創作、サブカル系 -> 範囲が広いので、さらに検索
    anime: {
      keyword: ["アニソン", "A-POP"],
      attribute: ["widerange"],
      subwords: [
        ["エヴァ", "ルパン", "ジブリ", "新海誠", "細田守", "深夜アニメ",
          "マドマギ", "攻殻機動隊", "ガンダム", "日常系", "ひぐらし", "トラウマ",
        ],
        ["映画", "OP", "ED", "メドレー", "アレンジ"],
        []
      ]
    },
    game: {
      keyword: ["ゲーム bgm メドレー"],
      attribute: ["widerange"]
    },
    vocaloid: {
      keyword: ["ボカロ"],
      attribute: ["widerange"]
    },
  },
  subwords: {
    region: {
      asia: [["日本", "韓国", "中国", "アジア"], ["japan", "korea", "china", "asia"]],
      europe: ["england", "spain", "scotland"],
      america: ["america", "canada"],
    },
    widerange: {
      anime: [
        "新海誠", "細田守", "ジブリ", ""
      ],
      game: [
        "任天堂", "カプコン", "スクエニ", ""
      ],
      vocaloid: [],
    },
    season: ["spring", "summer", "autumn", "winter"],
    environment: ["春", "夏", "秋", "冬", "寝る前", "朝", "夜", "昼"],
    situation: ["作業用", "集中", "カフェ", "やる気が出る", ""],
    age: ["70年代", "80年代", "90年代", "2000年代", "2010年代"],
    popular: ["人気", "最新", "流行"],
  },

  filter: {
    instrumental: ["instrumental"],
  }
}