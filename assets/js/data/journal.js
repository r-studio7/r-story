/* =========================================================
   Travel Journal のデータ（都市と写真）
   ---------------------------------------------------------
   ■ 写真を差し替える
     1. 写真を assets/images/journal/copenhagen/ に入れる
     2. ファイル名を下の image と同じにする（例: copenhagen-01.jpg）
        → 名前を合わせれば自動で表示されます。
     ・写真がまだない場所には「写真を準備中」の枠が表示されます。

   ■ 写真を増やす
     photos の { ... }, をひとつコピーして下に貼り付け、内容を書き換えます。
     写真の枠は、写真の縦横比に自動で合わせます（写真が切れません）。

   ■ 都市を増やす
     いちばん下の「都市を追加するときの見本」をコピーして使います。

   ■ リンク
     mapsUrl … Google マップのURL（空欄ならボタンは表示されません）
     filmId  … films.js に登録した動画の id（空欄なら表示されません）
   ========================================================= */

window.JOURNAL_DATA = [
  {
    id: "copenhagen",                       // URLに使う名前（半角英小文字）
    name:    { en: "Copenhagen", ja: "コペンハーゲン" },
    country: { en: "Denmark", ja: "デンマーク" },
    intro: {
      en: "A harbour city of soft light and thoughtful design — colourful canals, museums full of beautiful chairs, a quiet sea and bakeries worth crossing town for.",
      ja: "やわらかな光と心地よいデザインの港町。カラフルな運河、美しい椅子が並ぶミュージアム、静かな海、遠回りしてでも行きたいベーカリー。"
    },
    cover: "assets/images/journal/copenhagen/norrlyst-lunch.jpg",
    mapsUrl: "",          // 例: "https://maps.app.goo.gl/xxxx"（ご自身で作成したリンク）
    filmId: "copenhagen", // films.js の id
    /* Home のギャラリーに出す代表写真（ファイル名だけを書く。並びもこの順番）
       ここにない写真は、Travel Journal のページで全部見られます。 */
    homePhotos: ["nyhavn.jpg", "lille-bakery-interior.jpg", "bellevue-beach.jpg", "norrlyst-lunch.jpg"],
    /* 写真はすべて Canva の「Copenhagen Day1〜4」のデザインから、色加工済みのものを切り出しています。
       place … 写真の上に出る場所の名前 / alt … 写真の説明（読み上げ用にも使われます）
       この順番で Travel Journal に表示されます（Home に出す写真は上の homePhotos で選びます）。 */
    photos: [
      { image: "assets/images/journal/copenhagen/nyhavn.jpg",
        place: { en: "Nyhavn", ja: "ニューハウン" },
        alt: { en: "Colourful houses along Nyhavn, reflected in the canal", ja: "運河に映る、ニューハウンのカラフルな家並み" } },
      { image: "assets/images/journal/copenhagen/nyhavn-ice-cream.jpg",
        place: { en: "Nyhavn", ja: "ニューハウン" },
        alt: { en: "A soft-serve ice cream held up in front of a Danish flag", ja: "デンマーク国旗を背にしたソフトクリーム" } },
      { image: "assets/images/journal/copenhagen/norrlyst-lunch.jpg",
        place: { en: "Lunch at Norrlyst", ja: "Norrlystでランチ" },
        alt: { en: "Open-faced shrimp sandwich with flowers and a glass of white wine", ja: "花を添えた小エビのオープンサンドと白ワイン" } },
      { image: "assets/images/journal/copenhagen/design-museum-ant-chairs.jpg",
        place: { en: "Design Museum", ja: "デザインミュージアム" },
        alt: { en: "Arne Jacobsen’s Ant chairs displayed in glass boxes", ja: "ガラスケースに並ぶアルネ・ヤコブセンのアントチェア" } },
      { image: "assets/images/journal/copenhagen/bellevue-beach.jpg",
        place: { en: "Bellevue Beach", ja: "ベルビュー・ビーチ" },
        alt: { en: "Arne Jacobsen’s striped lifeguard tower by a calm blue sea", ja: "穏やかな青い海と、アルネ・ヤコブセンのしま模様の監視塔" } },
      { image: "assets/images/journal/copenhagen/finn-juhls-house.jpg",
        place: { en: "Finn Juhl’s House", ja: "フィン・ユール邸" },
        alt: { en: "A living room with a pink leather armchair, a sofa and a white fireplace", ja: "ピンクの革のアームチェア、ソファ、白い暖炉があるリビング" } },
      { image: "assets/images/journal/copenhagen/house-of-finn-juhl-storefront.jpg",
        place: { en: "House of Finn Juhl", ja: "ハウス・オブ・フィン・ユール" },
        alt: { en: "The wooden shopfront of House of Finn Juhl on a cobbled street", ja: "石畳の通りに面した、ハウス・オブ・フィン・ユールの木の店構え" } },
      { image: "assets/images/journal/copenhagen/house-of-finn-juhl.jpg",
        place: { en: "House of Finn Juhl", ja: "ハウス・オブ・フィン・ユール" },
        alt: { en: "A bright showroom with Finn Juhl sofas and chairs on a herringbone floor", ja: "ヘリンボーンの床にフィン・ユールのソファと椅子が並ぶ明るいショールーム" } },
      { image: "assets/images/journal/copenhagen/black-diamond.jpg",
        place: { en: "The Black Diamond", ja: "ブラック・ダイヤモンド" },
        alt: { en: "The black glass library building beside the harbour", ja: "港沿いに建つ黒いガラスの図書館" } },
      { image: "assets/images/journal/copenhagen/grundtvigs-church.jpg",
        place: { en: "Grundtvig’s Church", ja: "グルントヴィ教会" },
        alt: { en: "A pale yellow brick altar lit by tall windows", ja: "高い窓の光に照らされた、淡い黄色のレンガの祭壇" } },
      { image: "assets/images/journal/copenhagen/cafe-black-chairs.jpg",
        place: { en: "A quiet café", ja: "静かなカフェ" },
        alt: { en: "Black chairs around dark wooden tables in a softly lit room", ja: "やわらかな光の部屋に、黒い椅子と濃い木のテーブル" } },
      { image: "assets/images/journal/copenhagen/churros-kiosk.jpg",
        place: { en: "Churros kiosk", ja: "チュロスのお店" },
        alt: { en: "A pink churros kiosk with a red awning and a painted door", ja: "赤いひさしと絵柄の扉がある、ピンクのチュロスのお店" } },
      { image: "assets/images/journal/copenhagen/tivoli-gardens.jpg",
        place: { en: "Tivoli Gardens", ja: "チボリ公園" },
        alt: { en: "Painted folk-art figures and little lanterns at Tivoli", ja: "チボリ公園の民芸風の人形の装飾と小さなランタン" } },
      { image: "assets/images/journal/copenhagen/lille-bakery-interior.jpg",
        place: { en: "Lille Bakery", ja: "Lille Bakery" },
        alt: { en: "The bakery seen from above, with bakers at work and long wooden tables", ja: "上から見たベーカリー。働くパン職人と長い木のテーブル" } },
      { image: "assets/images/journal/copenhagen/noma-projects.jpg",
        place: { en: "Noma Projects", ja: "Noma Projects" },
        alt: { en: "The glass greenhouse shop of Noma Projects, full of plants", ja: "植物があふれる、Noma Projects のガラスの温室ショップ" } },
      { image: "assets/images/journal/copenhagen/ordrupgaard.jpg",
        place: { en: "Ordrupgaard Museum", ja: "オードロップゴー美術館" },
        alt: { en: "An ivy-covered manor house under a blue summer sky", ja: "夏の青空の下、ツタに覆われた館" } }
    ]
  }

  /* ---- 都市を追加するときの見本（使うときは上の } の後ろに , を付けて貼り付け） ----
  ,{
    id: "stockholm",
    name:    { en: "Stockholm", ja: "ストックホルム" },
    country: { en: "Sweden", ja: "スウェーデン" },
    intro:   { en: "English introduction.", ja: "日本語の紹介文。" },
    cover: "assets/images/journal/stockholm/stockholm-01.jpg",
    mapsUrl: "",
    filmId: "",
    photos: [
      { image: "assets/images/journal/stockholm/stockholm-01.jpg",
        alt: { en: "Photo description", ja: "写真の説明" } }
    ]
  }
  ---------------------------------------------------------------------- */
];
