/* =========================================================
   R’s Story — サイト設定ファイル（URLの設定場所）
   ---------------------------------------------------------
   ★ 外部サービスのURLは、すべてこのファイルで設定します。
   ・"" （空欄）のままにすると、サイト上では「Coming soon / 準備中」と表示され、
     リンクにはなりません（存在しないページへ飛ぶことはありません）。
   ・URLは "https://" から始まる正確なものを、" " の間に貼り付けてください。
   ========================================================= */

window.SITE_CONFIG = {

  /* 公開後のサイトのURL（例: "https://rs-story.netlify.app"）
     SNSでシェアしたときの画像表示などに使います。わからなければ空欄でOK。 */
  siteUrl: "https://r-studio7.github.io/r-story/",

  /* 外部サービスのURL */
  links: {
    youtube:   "https://www.youtube.com/@r-story-travel",
    instagram: "",   // 例: "https://www.instagram.com/あなたのID/"
    pinterest: "",   // 例: "https://www.pinterest.com/あなたのID/"
    substack:  "",   // 例: "https://あなたの名前.substack.com"
    substackSubscribe: "" // 購読ページ。例: "https://あなたの名前.substack.com/subscribe"
  },

  /* お問い合わせ先（任意）
     空欄のままなら About ページに問い合わせ欄は表示されません。
     例: email: "hello@example.com"（必ずご自身の実在するアドレスを入れてください） */
  contact: {
    email: "",
    formUrl: ""   // Googleフォームなどを使う場合はそのURL
  },

  /* 制作中のヒント表示
     true  … 未設定の場所に「設定が必要」という点線のメモを表示します（作業中に便利）。
     false … メモを隠します。★ サイトを公開する前に false にしてください。 */
  showSetupHints: false
};
