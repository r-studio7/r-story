/* Little Joys：気分を選ぶと、写真とメッセージを表示（外部APIなし） */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;
  var DATA = window.JOYS_DATA || {};
  var MOODS = ["calm", "escape", "beauty", "joy"];

  var stage = document.getElementById("joy-stage");
  var mediaBox = document.getElementById("joy-media");
  var body = document.getElementById("joy-body");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".mood-btn"));

  var current = { mood: null, index: -1 };
  var lastIndex = {}; // 気分ごとに、直前に表示した番号

  /* 直前と同じものが続かないように、次の番号を選ぶ */
  function nextIndex(mood) {
    var items = DATA[mood] || [];
    if (items.length <= 1) return 0;
    var prev = lastIndex[mood];
    var choices = [];
    for (var i = 0; i < items.length; i++) if (i !== prev) choices.push(i);
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function relatedLink(link) {
    if (!link) return null;
    if (link.type === "journal" && link.city) {
      var a = RS.label("a", "joys.toJournal", "link-arrow");
      a.href = "journal.html#" + link.city;
      return a;
    }
    if (link.type === "film" && link.film) {
      var film = RS.filmById(link.film);
      if (!film || !film.videoId) return null; // 動画URLが未設定のときはボタンを出さない
      var f = RS.label("a", "joys.toFilms", "link-arrow");
      f.href = "films.html#film-" + film.id;
      return f;
    }
    return null;
  }

  function render() {
    var item = DATA[current.mood][current.index];
    mediaBox.innerHTML = "";
    mediaBox.appendChild(RS.media({ src: item.image, alt: item.alt, eager: true }));

    var another = el("button", { type: "button", class: "btn btn--solid" }, [RS.label("span", "joys.another")]);
    another.addEventListener("click", function () { show(current.mood, true); });

    body.innerHTML = "";
    body.appendChild(RS.label("p", "mood." + current.mood + ".name", "eyebrow"));
    body.appendChild(el("blockquote", { class: "joy-quote", lang: "en" }, [item.message.en]));
    body.appendChild(el("p", { class: "joy-translation", lang: "ja" }, [item.message.ja]));
    body.appendChild(el("div", { class: "joy-actions" }, [another, relatedLink(item.link)]));
    return another;
  }

  /* 切り替わった瞬間、写真の角から小さな星・月・丸がはじける（1回だけ） */
  var BITS = ["sparkle", "circle", "sparkle", "moon", "sparkle"];
  function burst() {
    if (RS.reduceMotion.matches) return;
    var old = stage.querySelector(".joy-burst");
    if (old) old.remove();
    var box = el("div", { class: "joy-burst", "aria-hidden": "true" });
    var media = mediaBox.getBoundingClientRect(), s = stage.getBoundingClientRect();
    box.style.left = (media.right - s.left - 24) + "px";
    box.style.top = (media.top - s.top + 24) + "px";
    BITS.forEach(function (name, i) {
      var d = RS.doodle(name);
      var angle = (-150 + i * 30) * Math.PI / 180; // 左上〜上〜右上へ広がる
      var dist = 46 + (i % 2) * 18;
      d.style.setProperty("--x", Math.round(Math.cos(angle) * dist) + "px");
      d.style.setProperty("--y", Math.round(Math.sin(angle) * dist) + "px");
      d.style.setProperty("--r", (i % 2 ? -25 : 25) + "deg");
      d.style.setProperty("--d", i * 60 + "ms");
      box.appendChild(d);
    });
    stage.appendChild(box);
    window.setTimeout(function () { box.remove(); }, 1700);
  }

  function show(mood, fromAnother) {
    if (!DATA[mood] || !DATA[mood].length) return;
    var idx = nextIndex(mood);
    current = { mood: mood, index: idx };
    lastIndex[mood] = idx;

    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-mood") === mood)); });
    try { history.replaceState(null, "", "?mood=" + mood); } catch (e) { /* file:// では使えないことがあります */ }

    var swap = function () {
      var another = render();
      // 「Another」を押したときは、そのボタンにフォーカスを戻す（キーボード操作のため）
      if (fromAnother) another.focus();
      stage.classList.remove("is-changing");
    };
    if (RS.reduceMotion.matches) { swap(); return; }
    stage.classList.add("is-changing");
    window.setTimeout(swap, 320);
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-mood"), false); });
  });

  /* Homeから ?mood=calm などで来たときは、その気分を表示 */
  var param = new URLSearchParams(location.search).get("mood");
  if (MOODS.indexOf(param) > -1) {
    current = { mood: param, index: nextIndex(param) };
    lastIndex[param] = current.index;
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-mood") === param)); });
    render();
  }

  RS.observeReveal(document.getElementById("main"));
})();
