# r-story（R's Story 公式サイト）作業メモ

旅行YouTubeチャンネル「R's Story」の公式サイト（英語・日本語のバイリンガル）。
HTML / CSS / JavaScript だけの静的サイトで、ビルドは不要。使い方の詳細は README.md を参照。

## いまの状態
- リポジトリは **Private（非公開）**。公開するときは Public にして GitHub Pages（main / root）で公開する予定
- 公開予定のURL：https://r-studio7.github.io/r-story/（`assets/js/config.js` の `siteUrl` に設定済み）
- `assets/js/config.js` の `showSetupHints` は `false`（公開用）
- オーナーのMacには元のフォルダ（書類 →「R's Story Website」）が残っているが、**最新版はこの GitHub のリポジトリ**

## よく触る場所
- 外部リンク（YouTube / Instagram / Pinterest / Substack / お問い合わせ）：`assets/js/config.js`
- トラベルジャーナルの写真リスト：`assets/js/data/journal.js`、写真は `assets/images/journal/<都市>/`
- 動画：`assets/js/data/films.js`
- 文章（英語・日本語）：`assets/js/i18n.js`

## 作業ルール
- 写真を消すときは、画像ファイルと、それを参照しているデータ（`journal.js` など）の両方から消す。参照切れを残さない
- 画像を追加するときは Web 用に軽量化し、位置情報（EXIF の GPS）を消す
- オーナーの本名・メールアドレス・住所などの個人情報をファイルやコミットに入れない
- 公開後は、小さな修正は main に直接 push、デザイン変更などの大きな修正はプルリクエストで確認してから公開する
- オーナーは初心者なので、確認方法や操作はわかりやすく説明する
