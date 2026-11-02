/* =========================================================
   Little Joys のデータ（気分ごとの写真とメッセージ）
   ---------------------------------------------------------
   ■ 4つの気分: calm / escape / beauty / joy
   ■ 写真
     いまはギャラリー（assets/images/journal/copenhagen/）の写真を使っています。
     別の写真にしたいときは、assets/images/joys/ に写真を入れて image の場所を書き換えてください。
   ■ メッセージを増やす
     { ... }, をひとつコピーして、同じ気分の中に貼り付けます。何個でも増やせます。
   ■ link（関連ページへのボタン）
     { type: "journal", city: "copenhagen" } … Travel Journal のその都市へ
     { type: "film", film: "copenhagen" }    … Films のその動画へ（動画URLを設定するまでボタンは出ません）
     null                                    … ボタンなし
   ========================================================= */

window.JOYS_DATA = {
  calm: [
    { image: "assets/images/journal/copenhagen/cafe-black-chairs.jpg",
      alt: { en: "Black chairs around dark wooden tables in a softly lit room", ja: "やわらかな光の部屋に、黒い椅子と濃い木のテーブル" },
      message: { en: "Quiet rooms and unhurried coffee are a calm kind of luxury.", ja: "静かな部屋と、急がないコーヒー。それは穏やかな贅沢。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/ordrupgaard.jpg",
      alt: { en: "An ivy-covered manor house under a blue summer sky", ja: "夏の青空の下、ツタに覆われた館" },
      message: { en: "Let the day unfold at its own pace.", ja: "一日が、自分のペースでほどけていくのにまかせて。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/bellevue-beach.jpg",
      alt: { en: "Arne Jacobsen’s striped lifeguard tower by a calm blue sea", ja: "穏やかな青い海と、アルネ・ヤコブセンのしま模様の監視塔" },
      message: { en: "A little stillness makes room for wonder.", ja: "少しの静けさが、驚きの入る余白をつくる。" },
      link: null }
  ],

  escape: [
    { image: "assets/images/journal/copenhagen/nyhavn.jpg",
      alt: { en: "Colourful houses along Nyhavn, reflected in the canal", ja: "運河に映る、ニューハウンのカラフルな家並み" },
      message: { en: "Somewhere, a harbour you’ve never seen is waiting for you.", ja: "まだ見たことのない港が、どこかであなたを待っている。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/tivoli-gardens.jpg",
      alt: { en: "Painted folk-art figures and little lanterns at Tivoli", ja: "チボリ公園の民芸風の人形の装飾と小さなランタン" },
      message: { en: "Pack light, notice everything.", ja: "荷物は軽く、目にするものはすべて大切に。" },
      link: { type: "film", film: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/nyhavn-ice-cream.jpg",
      alt: { en: "A soft-serve ice cream held up in front of a Danish flag", ja: "デンマーク国旗を背にしたソフトクリーム" },
      message: { en: "The best souvenirs are the moments you didn’t plan.", ja: "最高のおみやげは、予定していなかった瞬間。" },
      link: { type: "journal", city: "copenhagen" } }
  ],

  beauty: [
    { image: "assets/images/journal/copenhagen/design-museum-ant-chairs.jpg",
      alt: { en: "Arne Jacobsen’s Ant chairs displayed in glass boxes", ja: "ガラスケースに並ぶアルネ・ヤコブセンのアントチェア" },
      message: { en: "Beauty lives in the details — a curve, a shadow, a chair.", ja: "美しさは細部に宿る。曲線にも、影にも、椅子にも。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/house-of-finn-juhl.jpg",
      alt: { en: "A bright showroom with Finn Juhl sofas and chairs on a herringbone floor", ja: "ヘリンボーンの床にフィン・ユールのソファと椅子が並ぶ明るいショールーム" },
      message: { en: "Good design feels like a kind word.", ja: "良いデザインは、やさしい言葉のよう。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/grundtvigs-church.jpg",
      alt: { en: "A pale yellow brick altar lit by tall windows", ja: "高い窓の光に照らされた、淡い黄色のレンガの祭壇" },
      message: { en: "Light and simple brick — sometimes that is all a poem needs.", ja: "光と、素朴なレンガ。詩になるには、それだけで十分なときがある。" },
      link: { type: "journal", city: "copenhagen" } }
  ],

  joy: [
    { image: "assets/images/journal/copenhagen/lille-bakery.jpg",
      alt: { en: "Rows of freshly baked bread on the counter, seen from above", ja: "上から見た、カウンターに並ぶ焼きたてのパン" },
      message: { en: "Fresh bread in the morning counts as happiness.", ja: "朝の焼きたてのパン。それも立派な幸せ。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/norrlyst-lunch.jpg",
      alt: { en: "Open-faced shrimp sandwich with flowers and a glass of white wine", ja: "花を添えた小エビのオープンサンドと白ワイン" },
      message: { en: "Collect little joys, and the days begin to shine.", ja: "小さな喜びを集めると、毎日が輝きはじめる。" },
      link: { type: "journal", city: "copenhagen" } },
    { image: "assets/images/journal/copenhagen/churros-kiosk.jpg",
      alt: { en: "A pink churros kiosk with a red awning and a painted door", ja: "赤いひさしと絵柄の扉がある、ピンクのチュロスのお店" },
      message: { en: "Something sweet on a sunny afternoon is reason enough to smile.", ja: "晴れた午後の甘いもの。それだけで、笑顔になる理由になる。" },
      link: { type: "film", film: "copenhagen" } }
  ]
};
