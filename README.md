# R’s Story 公式ウェブサイト

**Travel, Design & Little Joys** — 英語・日本語のバイリンガル・トラベルマガジンです。
HTML・CSS・JavaScript だけで作った「静的サイト」なので、データベースやログイン、APIキーは不要です。

---

## 1. いまの状態（実際の情報と仮の情報）

| 項目 | 状態 | 設定する場所 |
|---|---|---|
| ブランドカラー | **仮のカラー**（指示書のパレット） | `assets/css/style.css` の先頭 |
| 写真 | トップ写真・コペンハーゲン12枚・Little Joys は**設定済み**。About だけ未設定（「写真を準備中」の枠） | `assets/images/` |
| YouTube 動画 | **設定済み**（3本） | `assets/js/data/films.js` |
| YouTube / Instagram / Pinterest / Substack のURL | YouTube は**設定済み**。ほかは未設定（「Coming soon」と表示） | `assets/js/config.js` |
| Substack のおすすめ記事 | **未設定**（「近日掲載」と表示） | `assets/js/data/letters.js` |
| お問い合わせ | **未設定**（公開時は欄ごと非表示） | `assets/js/config.js` の `contact` |
| 文章（英語・日本語） | 仮の文章を用意済み。自由に書き換えてOK | `assets/js/i18n.js` |
| Little Joys のメッセージ | 4つの気分 × 3つずつ用意済み | `assets/js/data/joys.js` |

架空のURLや他の人の写真は使っていません。未設定の場所は、偽のリンクにならないようにしてあります。

---

## 2. ファイルの構成

```
R's Story Website/
├── index.html          … Home（トップページ）
├── journal.html        … Travel Journal（都市ごとの写真）
├── films.html          … Films（YouTube動画）
├── little-joys.html    … Little Joys（気分を選ぶ機能）
├── letters.html        … Letters from R（Substack）
├── about.html          … About & Follow
├── README.md           … この説明書
├── tools/serve.js      … 確認用の小さなサーバー
└── assets/
    ├── css/style.css   … デザイン（色・フォント・アニメーション）
    ├── images/         … 写真を入れるフォルダ
    └── js/
        ├── config.js   … ★ 外部サービスのURL（ここを一番よく使います）
        ├── i18n.js     … ★ 英語・日本語の文章
        ├── data/       … ★ 写真・動画・Little Joys・記事のデータ
        │   ├── journal.js
        │   ├── films.js
        │   ├── joys.js
        │   └── letters.js
        └── main.js ほか … 動きの仕組み（ふだんは触らなくてOK）
```

**★ のファイルだけ編集すれば、サイトの内容はすべて変えられます。**

> 用語メモ
> - **静的サイト**：サーバー側でプログラムを動かさず、ファイルをそのまま表示するサイト。無料で公開しやすいのが特長です。
> - **データ**：写真のファイル名や文章などの「中身」。`data/` フォルダにまとめ、見た目の仕組みと分けてあります。

---

## 3. パソコンで表示する（起動方法）

### かんたんな方法
`index.html` をダブルクリックすると、ブラウザで開けます。

### おすすめの方法（実際の公開に近い状態で確認）
「ターミナル」アプリを開き、次の2つを順番に入力します。

```bash
cd ~/Documents/"R's Story Website"
```

```bash
node tools/serve.js
```

ブラウザで **http://localhost:8000** を開きます。終了するときはターミナルで `control + C` を押します。
（`node` が見つからないと表示された場合は、https://nodejs.org から Node.js をインストールしてください。または上の「かんたんな方法」で確認できます）

> **localhost** とは、「自分のパソコンの中だけで動いているサイト」という意味です。他の人からは見えません。

---

## 4. 写真の入れ方

写真は **決められたファイル名で、決められたフォルダに入れるだけ** で表示されます。コードの編集は不要です。

| 場所 | フォルダ | ファイル名 | おすすめの形 |
|---|---|---|---|
| トップのメイン写真 | `assets/images/home/` | `hero.jpg`（いまは切手コラージュのバナー） | 横長（幅2400px程度） |
| About の写真 | `assets/images/about/` | `portrait.jpg` | 縦長 4:5 |
| コペンハーゲン（Home のギャラリーと Travel Journal） | `assets/images/journal/copenhagen/` | **設定済み**（Canva の差し込み用デザインから切り出した写真と、追加の写真で17枚） | 横長・縦長どちらも可 |
| Little Joys | いまはギャラリーの写真を使用 | 変えるときは `assets/images/joys/` に入れて `joys.js` の image を書き換え | 縦長 4:5 がきれい |

- どの番号にどんな写真が合うかは、サイト上の「写真を準備中」の枠に説明が出ています（例：「ニューハウンの港に並ぶカラフルな家々」）。
- 説明文は写真の **代替テキスト**（目の不自由な方の読み上げ用の説明）にもなります。写真を入れたら、`data/` の中の `alt` を実際の写真に合わせて書き換えてください。
- **写真の色味をそろえる**と、雑誌のような統一感が出ます（Lightroom で同じプリセットを使うなど）。
- 1枚 **500KB 以下** が目安です。大きすぎると表示が遅くなります（https://squoosh.app などで無料で軽くできます）。
- ファイル名は **半角英数字・小文字** にしてください（`.JPG` ではなく `.jpg`）。

### トップのメイン写真の表示のしかた
いまは切手コラージュのバナーを、端が切れないように16:9のまま表示しています。
普通の風景写真に替えて画面いっぱいに大きく見せたいときは、`index.html` の `class="hero__frame hero__frame--fit"` から ` hero__frame--fit` を消してください。

### 写真を増やす・都市を増やす
`assets/js/data/journal.js` を開き、ファイル内の説明どおりに `{ ... },` をコピーして増やします。
いちばん上の都市（いまはコペンハーゲン）の写真は、**Home の写真ギャラリーにも同じ順番で表示**されます。
`place` は写真の上に出る場所の名前です。写真の枠は写真の縦横比に自動で合わせるので、横長・縦長どちらでも切れずに表示されます。
新しい都市を追加すると、Travel Journal の都市一覧に自動で表示されます。

---

## 5. URLの設定方法

### SNS・Substack
`assets/js/config.js` を開き、`""` の間にURLを貼り付けます。

```js
links: {
  youtube:   "https://www.youtube.com/@あなたのチャンネル",
  instagram: "https://www.instagram.com/あなたのID/",
  pinterest: "",   // 空欄のままなら「Coming soon」表示
  substack:  "https://あなたの名前.substack.com",
  substackSubscribe: "https://あなたの名前.substack.com/subscribe"
},
```

フッター・Home・About・Films・Letters のリンクがまとめて切り替わります。

### YouTube 動画
`assets/js/data/films.js` の `youtube: ""` に、動画のURLをそのまま貼り付けます。

- `https://www.youtube.com/watch?v=xxxxxxxxxxx` でも `https://youtu.be/xxxxxxxxxxx` でもOK。
- サムネイルは自動で表示され、押すとページ内で再生されます。
- **いちばん上の動画が「最新の動画」** として Home と Films に大きく表示されます。新しい動画は上に追加してください。
- `title` と `description` を実際の動画に合わせて書き換えてください。

### Google マップ
`assets/js/data/journal.js` の `mapsUrl: ""` に、Google マップの「共有」→「リンクをコピー」で取得したURLを入れます。

### Substack のおすすめ記事
`assets/js/data/letters.js` の見本を参考に、記事のタイトルとURLを追加します。

### お問い合わせ（任意）
`assets/js/config.js` の `contact` に、**ご自身の実在するメールアドレス** またはフォームのURLを入れると、About ページに表示されます。

---

## 6. 文章・色の変え方

### 文章
`assets/js/i18n.js` に、英語と日本語が並んでいます。

```js
"home.hero.sub": { en: "A little inspiration for your own story.", ja: "あなた自身の物語に、小さなインスピレーションを。" },
```

`" "` の中だけを書き換えてください。`"` や `,` を消してしまうと表示されなくなるので注意してください。

### Little Joys のメッセージ
`assets/js/data/joys.js` で、気分ごとに写真・英語メッセージ・日本語訳・関連リンクを追加できます。何個でも増やせます。

### ブランドカラー
`assets/css/style.css` の先頭にある5色を書き換えるだけで、サイト全体の色が変わります。

```css
--color-ivory: #F8F5F0;   /* 背景 */
--color-pink:  #E6D4D8;
--color-brown: #C5B3A4;
--color-stone: #DEDCD4;
--color-text:  #514940;   /* 文字 */
```

---

## 7. 主な機能

- **英語 / 日本語の切り替え**：ヘッダー右上の `EN / 日本語`。ページを移動しても選んだ言語が保たれます（ブラウザに保存するのは言語設定だけです）。初めて訪れた人には英語で表示されます。
- **Travel Journal**：写真を押すと大きく表示。矢印ボタン・キーボードの ← →・スマホのスワイプで前後に移動、Esc か ✕ で閉じます。
- **Little Joys**：4つの気分から選ぶと、写真と英語メッセージ＋日本語訳を表示。「Another Little Joy」で、直前と同じものが続かないように別の内容に切り替わります。
- **アニメーション**：ファーストビューは写真がゆっくり現れ、タイトルが少し遅れて表示されます。スクロールすると要素が下からふわっと現れます（一度表示されたら消えません）。
- **動きを減らす設定**：パソコンやスマホで「視差効果を減らす（動きを減らす）」をオンにしている方には、アニメーションを止めて表示します。
- **外部リンク**：YouTube などの外部サイトは `↗` 印がつき、新しいタブで開きます。サイト内のリンクは `→` 印です。

---

## 8. 公開前のチェックリスト

1. `assets/js/config.js` の `showSetupHints` を **`false`** にする
   （ピンクの点線の「設定が必要」メモや、写真のファイル名表示が消えます。URL未設定の動画も非表示になります）
2. 写真を入れて、各ページで表示を確認する
3. `config.js` の `siteUrl` に公開後のURLを入れる
4. （任意）SNSでシェアしたときの画像を設定する：`assets/images/og-image.jpg`（1200×630px）を用意し、各HTMLの `<meta property="og:title" ...>` の下に次の1行を追加します
   ```html
   <meta property="og:image" content="https://公開後のURL/assets/images/og-image.jpg">
   ```

---

## 9. 無料で公開する方法

どれも無料で、このフォルダをそのままアップロードするだけで公開できます。

### Netlify（いちばん簡単）
1. https://app.netlify.com/drop を開く（無料アカウントを作成）
2. `R's Story Website` フォルダを、画面にドラッグ＆ドロップ
3. 数秒で `https://○○○.netlify.app` のURLが発行されます
4. 更新するときは、Netlify の管理画面「Deploys」に、もう一度フォルダをドラッグします

### Cloudflare Pages
Cloudflare のダッシュボード →「Workers & Pages」→「Pages」→「Upload assets」で、フォルダをアップロードします。

### GitHub Pages
GitHub にリポジトリ（ファイルの保管場所）を作ってファイルをアップロードし、「Settings」→「Pages」で公開します。

> 独自ドメイン（例：`rs-story.com`）も、どのサービスでも後から設定できます。
> `tools/` フォルダと `README.md` は公開されても問題ありませんが、気になる場合は除いてアップロードしてください。

---

## 10. 困ったときは

| 症状 | 確認すること |
|---|---|
| 写真が出ない | ファイル名とフォルダが合っているか、拡張子が `.jpg`（小文字）か |
| ページが真っ白・文章が出ない | 直前に編集したファイルで `"` や `,` `}` を消していないか |
| 変更が反映されない | ブラウザで再読み込み（Mac：`command + shift + R`） |
| 動画が再生されない | `films.js` の URL が正しいか、動画が「公開」または「限定公開」になっているか |
