/* =========================================================
   Films のデータ（YouTube動画）
   ---------------------------------------------------------
   ■ 動画を設定する
     youtube: "" の中に、YouTube動画のURLをそのまま貼り付けます。
       例: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
           "https://youtu.be/XXXXXXXXXXX" でもOK
     ・サムネイル画像はYouTubeから自動で表示されます（APIキー不要）。
     ・いちばん上の動画が「最新の動画」として大きく表示されます。

   ■ URLが空欄の動画について
     ・config.js の showSetupHints が true の間は「動画のURLが未設定です」と表示されます。
     ・false にすると、未設定の動画はサイトに表示されません（偽のリンクは出ません）。

   ■ 新しい動画は、いちばん上に追加してください（いちばん上が「最新の動画」になります）。
   ========================================================= */

window.FILMS_DATA = [
  {
    id: "copenhagen",              // Travel Journal や Little Joys から参照する名前（半角英小文字）
    youtube: "https://youtu.be/ZhzrqosA1ms",   // ★ いちばん上 ＝ Home と Films で大きく表示
    title: {
      en: "Copenhagen Travel Vlog — Café, Design, Michelin Smørrebrød, Canal Cruise, Tivoli, Nyhavn",
      ja: "コペンハーゲン旅行Vlog — カフェ、デザイン、ミシュランのスモーブロー、運河クルーズ、チボリ公園、ニューハウン"
    },
    description: {
      en: "Cafés, Danish design, a Michelin smørrebrød lunch, a canal cruise, Tivoli Gardens and Nyhavn.",
      ja: "カフェ、デンマークデザイン、ミシュランのスモーブローのランチ、運河クルーズ、チボリ公園、そしてニューハウン。"
    },
    journal: "copenhagen"          // 関連する Travel Journal の都市 id（なければ ""）
  },
  {
    id: "copenhagen-day4",
    youtube: "https://youtu.be/UkC7dm9h0-M",
    title: {
      en: "Copenhagen Travel Vlog Day 4 — Why I Fell in Love with Copenhagen: Bakeries, Michelin & Design",
      ja: "コペンハーゲン旅行Vlog 4日目 — コペンハーゲンに恋した理由：ベーカリー、ミシュラン、デザイン"
    },
    description: {
      en: "Day 4 in Copenhagen — bakeries, a Michelin meal and Danish design, and why this city stole my heart.",
      ja: "コペンハーゲン4日目。ベーカリー、ミシュランの食事、デンマークデザイン。この街に心をつかまれた理由。"
    },
    journal: "copenhagen"
  },
  {
    id: "copenhagen-museums",
    youtube: "https://youtu.be/jUdUummmonA",
    title: {
      en: "Copenhagen Travel Vlog — Museum, Coffee, Food, New Hotel, Noma Projects Shop, Ny Carlsberg, Aamanns",
      ja: "コペンハーゲン旅行Vlog — ミュージアム、コーヒー、食、新しいホテル、Noma Projects Shop、Ny Carlsberg、Aamanns"
    },
    description: {
      en: "Museums, coffee and good food — a new hotel, the Noma Projects shop, Ny Carlsberg and Aamanns.",
      ja: "ミュージアム、コーヒー、おいしい食事。新しいホテル、Noma Projects のショップ、Ny Carlsberg、Aamanns へ。"
    },
    journal: "copenhagen"
  },
  {
    id: "copenhagen-design-day",
    youtube: "https://youtu.be/tMUZtCO81IM",
    title: {
      en: "Copenhagen Travel Vlog — A Design Lover’s Day: Arne Jacobsen, Finn Juhl, Louisiana Museum & Cafés",
      ja: "コペンハーゲン旅行Vlog — デザイン好きの1日：アルネ・ヤコブセン、フィン・ユール、ルイジアナ美術館とカフェ"
    },
    description: {
      en: "A day for design lovers: Arne Jacobsen, Finn Juhl, the Louisiana Museum of Modern Art and cafés along the way.",
      ja: "デザイン好きのための1日。アルネ・ヤコブセン、フィン・ユール、ルイジアナ近代美術館、そして道中のカフェ。"
    },
    journal: "copenhagen"
  }
];
