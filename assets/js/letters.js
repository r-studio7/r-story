/* Letters from R：おすすめ記事と Substack へのリンク */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;
  var links = RS.config.links;
  var letters = (window.LETTERS_DATA || []).filter(function (l) { return l && l.url; });

  /* ---- Substackへのリンク ---- */
  document.getElementById("letters-visit").appendChild(RS.extLink(links.substack, RS.label("span", "letters.visit"), "link-arrow"));

  var actions = document.getElementById("letters-actions");
  actions.appendChild(RS.extLink(links.substackSubscribe, RS.label("span", "letters.subscribe"), "btn btn--solid"));
  actions.appendChild(RS.extLink(links.substack, RS.label("span", "letters.visit"), "btn"));
  if (!links.substack || !links.substackSubscribe) {
    var h = RS.hint("config.js の substack（Substackのトップ）と substackSubscribe（購読ページ）にURLを入れてください。");
    if (h) actions.appendChild(h);
  }

  /* ---- おすすめ記事 ---- */
  var listBox = document.getElementById("letters-list");
  if (!letters.length) {
    listBox.appendChild(el("div", { class: "empty-state", "data-reveal": true }, [
      RS.label("p", "letters.empty"),
      RS.hint("assets/js/data/letters.js に記事のタイトルとURLを追加すると、ここに一覧が表示されます。")
    ]));
  } else {
    var ul = el("ul", { class: "letter-list" });
    letters.forEach(function (l) {
      var textBox = el("div", null, [
        l.date ? el("time", { datetime: l.date, text: l.date.replace(/-/g, ".") }) : null,
        RS.text("h3", l.title),
        RS.text("p", l.excerpt)
      ]);
      var a = el("a", { href: l.url, target: "_blank", rel: "noopener noreferrer" }, [
        l.image ? RS.media({ src: l.image, alt: l.title }) : null,
        textBox
      ]);
      a.appendChild(RS.label("span", "ui.newTab", "visually-hidden"));
      ul.appendChild(el("li", { class: "letter-item", "data-reveal": true }, [a]));
    });
    listBox.appendChild(ul);
  }

  RS.observeReveal(document.getElementById("main"));
})();
