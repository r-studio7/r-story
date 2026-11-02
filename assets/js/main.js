/* =========================================================
   R’s Story — サイト共通の仕組み
   （ヘッダー・フッター・言語切り替え・写真の表示・スクロールの動き）
   ※ 文章や写真を変えるだけなら、このファイルを触る必要はありません。
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || { links: {}, contact: {}, showSetupHints: false };
  CONFIG.links = CONFIG.links || {};
  CONFIG.contact = CONFIG.contact || {};
  var DICT = window.I18N || {};
  var LANGS = ["en", "ja"];
  var STORAGE_KEY = "rs-story-lang"; // 保存するのは言語設定だけです
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function readStoredLang() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return LANGS.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }

  var lang = readStoredLang() || "en";
  var bindings = [];

  /* ---------- 小さな道具 ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function t(key) {
    var entry = DICT[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  }

  function pick(obj) {
    if (obj === null || obj === undefined) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  }

  /* 言語が変わったときに自動で書き換える要素を登録 */
  function bind(node, fn) {
    fn(node);
    bindings.push({ node: node, fn: fn });
    return node;
  }

  /* 両言語の文章 { en, ja } を持つ要素をつくる */
  function text(tag, obj, cls) {
    return bind(el(tag, { class: cls }), function (n) { n.textContent = pick(obj); });
  }

  /* i18n.js の key を使う要素をつくる */
  function label(tag, key, cls) {
    return el(tag, { class: cls, "data-i18n": key, text: t(key) });
  }

  function applyI18n(root) {
    root.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria"))); });
    root.querySelectorAll("[data-i18n-alt]").forEach(function (n) { n.setAttribute("alt", t(n.getAttribute("data-i18n-alt"))); });
  }

  function applyLang() {
    var html = document.documentElement;
    html.lang = lang;
    applyI18n(document);
    var titleKey = document.body.getAttribute("data-title-key");
    if (titleKey) document.title = t(titleKey);
    bindings = bindings.filter(function (b) { return b.node.isConnected; });
    bindings.forEach(function (b) { b.fn(b.node); });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === lang) return;
    var swap = function () {
      lang = next;
      try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* 保存できなくても動作します */ }
      applyLang();
      document.dispatchEvent(new CustomEvent("rs:langchange", { detail: { lang: lang } }));
    };
    if (reduceMotion.matches) { swap(); return; }
    // 文字がふっと入れ替わる、控えめなフェード
    document.body.classList.add("is-lang-switching");
    window.setTimeout(function () {
      swap();
      document.body.classList.remove("is-lang-switching");
    }, 180);
  }

  /* ---------- リンク ---------- */
  var SOCIALS = [
    { key: "youtube", name: "YouTube" },
    { key: "instagram", name: "Instagram" },
    { key: "pinterest", name: "Pinterest" },
    { key: "substack", name: "Substack" }
  ];

  /* 外部リンク：URLがあれば新しいタブで開くリンク、なければ「Coming soon」表示 */
  function extLink(url, content, cls) {
    var nodes = Array.isArray(content) ? content : [content];
    if (url) {
      return el("a", { class: "ext-link " + (cls || ""), href: url, target: "_blank", rel: "noopener noreferrer" },
        nodes.concat([
          el("span", { class: "ext-link__icon", "aria-hidden": "true", text: "↗" }),
          label("span", "ui.newTab", "visually-hidden")
        ]));
    }
    return el("span", { class: "is-pending " + (cls || "") },
      nodes.concat([label("span", "ui.comingSoon", "pending-tag")]));
  }

  /* 制作中だけ表示する「設定が必要」メモ（config.js の showSetupHints） */
  function hint(message) {
    if (!CONFIG.showSetupHints) return null;
    return el("p", { class: "setup-hint" }, [el("strong", { text: "設定が必要" }), " " + message]);
  }

  function socialList(variant) {
    var list = el("ul", { class: "social-list social-list--" + (variant || "simple") });
    SOCIALS.forEach(function (s) {
      var url = CONFIG.links[s.key];
      var inner = [el("span", { class: "social-list__name", text: s.name })];
      if (variant && variant !== "simple") inner.push(label("span", "social." + s.key, "social-list__desc"));
      list.appendChild(el("li", null, [extLink(url, inner, "social-list__link")]));
    });
    return list;
  }

  /* ---------- 写真（読み込めないときは上品なプレースホルダー） ---------- */
  var TONES = 4;
  var toneCounter = 0;

  function fileName(src) { return (src || "").split("/").pop(); }

  function markMissing(m, src, alt) {
    m.classList.add("is-missing");
    if (m.querySelector(".media__ph")) return;
    var desc = el("span", { class: "media__ph-desc" });
    bind(desc, function (n) { n.textContent = pick(alt); });
    var ph = el("span", { class: "media__ph", "aria-hidden": "true" }, [
      label("span", "ui.photoSoon", "media__ph-label"),
      desc,
      CONFIG.showSetupHints && src ? el("code", { class: "media__ph-file", text: src }) : null
    ]);
    m.appendChild(ph);
  }

  function wireImage(m, img, src, alt) {
    if (!src) { if (img) img.remove(); markMissing(m, src, alt); return; }
    var done = function () { m.classList.add("is-loaded"); };
    var fail = function () { img.remove(); markMissing(m, src, alt); };
    if (img.complete && img.getAttribute("src")) {
      if (img.naturalWidth > 0) done(); else fail();
    } else {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", fail, { once: true });
    }
  }

  /* opts: { src, alt:{en,ja}, cls, eager, fallbacks:[読み込めないときに順に試す画像] } */
  function media(opts) {
    var m = el("div", { class: "media " + (opts.cls || ""), "data-tone": String(toneCounter++ % TONES) });
    if (!opts.src) { markMissing(m, "", opts.alt); return m; }
    var img = el("img", { alt: "", decoding: "async", loading: opts.eager ? "eager" : "lazy" });
    var fallbacks = (opts.fallbacks || []).slice();
    bind(img, function (n) { n.alt = pick(opts.alt); });
    img.addEventListener("load", function () { m.classList.add("is-loaded"); }, { once: true });
    img.addEventListener("error", function onError() {
      if (fallbacks.length) { img.src = fallbacks.shift(); return; }
      img.removeEventListener("error", onError);
      img.remove(); markMissing(m, opts.src, opts.alt);
    });
    img.src = opts.src;
    m.appendChild(img);
    return m;
  }

  /* HTMLに直接書かれた写真（ヒーローなど）にも同じ仕組みを付ける */
  function upgradeStaticMedia() {
    document.querySelectorAll(".media[data-static]").forEach(function (m) {
      m.setAttribute("data-tone", String(toneCounter++ % TONES));
      var img = m.querySelector("img");
      var key = img && img.getAttribute("data-i18n-alt");
      var alt = key ? DICT[key] : "";
      wireImage(m, img, img ? img.getAttribute("src") : "", alt);
    });
  }

  /* ---------- YouTube ---------- */
  function youtubeId(value) {
    if (!value) return "";
    var v = String(value).trim();
    if (/^[\w-]{11}$/.test(v)) return v;
    var m = v.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  function films() {
    return (window.FILMS_DATA || []).map(function (f) {
      var copy = Object.assign({}, f);
      copy.videoId = youtubeId(f.youtube);
      return copy;
    });
  }

  /* 表示する動画（URL未設定の動画は、制作中ヒントがオンのときだけ表示） */
  function visibleFilms() {
    return films().filter(function (f) { return f.videoId || CONFIG.showSetupHints; });
  }

  function filmById(id) {
    return films().filter(function (f) { return f.id === id; })[0] || null;
  }

  /* 動画のプレーヤー：サムネイルを押すと、その場で再生 */
  function filmPlayer(film, eager) {
    var wrap = el("div", { class: "film-player" });
    if (!film.videoId) {
      wrap.classList.add("is-unset");
      wrap.appendChild(el("div", { class: "film-player__unset" }, [
        el("span", { class: "film-player__unset-icon", "aria-hidden": "true", text: "▷" }),
        label("span", "films.notSet", "film-player__unset-label"),
        CONFIG.showSetupHints ? el("span", { class: "film-player__unset-note", text: "assets/js/data/films.js の youtube にURLを入れてください" }) : null
      ]));
      return wrap;
    }
    var poster = el("button", { type: "button", class: "film-player__poster" });
    bind(poster, function (n) { n.setAttribute("aria-label", t("films.play") + ": " + pick(film.title)); });
    // 高画質（1280px）のサムネイル。ない動画は 640px → 480px の順に自動で切り替え
    var thumb = "https://i.ytimg.com/vi/" + film.videoId + "/";
    poster.appendChild(media({
      src: thumb + "maxresdefault.jpg",
      fallbacks: [thumb + "sddefault.jpg", thumb + "hqdefault.jpg"],
      alt: film.title, eager: eager
    }));
    poster.appendChild(el("span", { class: "film-player__play", "aria-hidden": "true" }));
    poster.addEventListener("click", function () {
      var frame = el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + film.videoId + "?autoplay=1&rel=0",
        title: pick(film.title),
        allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
        allowfullscreen: true
      });
      wrap.replaceChild(frame, poster);
      frame.focus();
    });
    wrap.appendChild(poster);
    return wrap;
  }

  function youtubeWatchUrl(film) {
    return film && film.videoId ? "https://www.youtube.com/watch?v=" + film.videoId : "";
  }

  /* ---------- ヘッダー・フッター ---------- */
  var NAV = [
    { href: "index.html", key: "nav.home", page: "home", cls: "site-nav__home" },
    { href: "journal.html", key: "nav.journal", page: "journal" },
    { href: "films.html", key: "nav.films", page: "films" },
    { href: "little-joys.html", key: "nav.joys", page: "joys" },
    { href: "letters.html", key: "nav.letters", page: "letters" },
    { href: "about.html", key: "nav.about", page: "about" }
  ];

  function navList(currentPage, cls) {
    var ul = el("ul", { class: cls });
    NAV.forEach(function (item) {
      var a = label("a", item.key);
      a.href = item.href;
      if (item.page === currentPage) a.setAttribute("aria-current", "page");
      ul.appendChild(el("li", { class: item.cls }, [a]));
    });
    return ul;
  }

  function buildHeader(currentPage) {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;
    var toggle = el("button", { type: "button", class: "nav-toggle", "aria-expanded": "false", "aria-controls": "site-nav" }, [
      el("span", { class: "nav-toggle__lines", "aria-hidden": "true" }, [el("span"), el("span")]),
      label("span", "ui.menu", "visually-hidden")
    ]);
    var langSwitch = el("div", { class: "lang-switch", role: "group", "data-i18n-aria": "ui.langLabel", "aria-label": t("ui.langLabel") }, [
      el("button", { type: "button", "data-lang": "en", lang: "en", "aria-pressed": "false", text: "EN" }),
      el("span", { class: "lang-switch__sep", "aria-hidden": "true", text: "/" }),
      el("button", { type: "button", "data-lang": "ja", lang: "ja", "aria-pressed": "false", text: "日本語" })
    ]);
    var nav = el("nav", { id: "site-nav", class: "site-nav", "data-i18n-aria": "ui.mainNav", "aria-label": t("ui.mainNav") },
      [navList(currentPage, "site-nav__list")]);

    header.appendChild(el("div", { class: "site-header__inner container" }, [
      el("a", { class: "wordmark", href: "index.html" }, [
        el("span", { class: "wordmark__text", text: "R’s Story" })
      ]),
      nav,
      el("div", { class: "site-header__tools" }, [langSwitch, toggle])
    ]));

    langSwitch.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-lang]");
      if (b) setLang(b.getAttribute("data-lang"));
    });

    /* モバイルメニューの開閉 */
    var isOpen = false;
    var toggleLabel = toggle.querySelector(".visually-hidden");
    function setOpen(open, returnFocus) {
      isOpen = open;
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggleLabel.setAttribute("data-i18n", open ? "ui.closeMenu" : "ui.menu");
      toggleLabel.textContent = t(open ? "ui.closeMenu" : "ui.menu");
      if (!open && returnFocus) toggle.focus();
      // キーボードで開いたときは、最初のリンクへ移動
      if (open && returnFocus) {
        var first = nav.querySelector("a");
        if (first) window.setTimeout(function () { first.focus(); }, 60);
      }
    }
    toggle.addEventListener("click", function (e) { setOpen(!isOpen, e.detail === 0); }); // detail 0 = キーボード操作
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) setOpen(false, true); });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (mq) { if (mq.matches) setOpen(false); });

    /* スクロールしたらヘッダーに細い線 */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function buildFooter(currentPage) {
    var footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    var top = label("a", "footer.top", "footer-top");
    top.href = "#top";
    footer.appendChild(el("div", { class: "container" }, [
      el("div", { class: "site-footer__grid" }, [
        el("div", { class: "site-footer__brand" }, [
          el("a", { class: "wordmark wordmark--large", href: "index.html" }, [el("span", { class: "wordmark__text", text: "R’s Story" })]),
          el("p", { class: "site-footer__tagline", text: "Travel, Design & Little Joys" }),
          label("p", "footer.tagline", "site-footer__sub")
        ]),
        el("div", { class: "site-footer__col" }, [label("h2", "footer.explore", "eyebrow"), navList(currentPage, "site-footer__nav")]),
        el("div", { class: "site-footer__col" }, [label("h2", "footer.follow", "eyebrow"), socialList("simple")])
      ]),
      el("div", { class: "footer-farewell", "data-reveal-group": true }, [
        label("p", "footer.farewell", "footer-farewell__text")
      ]),
      el("div", { class: "site-footer__bottom" }, [
        el("p", { text: "© " + new Date().getFullYear() + " R’s Story" }),
        top
      ])
    ]));
  }

  /* ---------- きらめく小さな飾り（ドゥードル） ----------
     HTMLに <span data-doodle="sparkle"></span> と書くと、ここの絵が入ります。
     種類：sparkle（星）/ stars（小さな星たち）/ moon（月）/ circle（光の丸）/ plane（飛行機）
     くっきりした4つ角の星と、光の粒（白からピンクへのグラデーション＋やわらかな光）で描いています。 */
  var STAR = "M20 2.5 22.8 17.2 37.5 20 22.8 22.8 20 37.5 17.2 22.8 2.5 20 17.2 17.2Z";
  var MOON = "M24.5 6.2A14.2 14.2 0 1 0 34.2 27.4 11.6 11.6 0 1 1 24.5 6.2z";
  var PLANE = "M36 20c0-1.2-1.3-1.9-2.8-1.9h-7.6L17 6.8h-2.8l4.2 11.3h-8.1L7.4 13.8H5.4l1.8 6.2-1.8 6.2h2l2.9-4.3h8.1l-4.2 11.3H17l8.6-11.3h7.6c1.5 0 2.8-.7 2.8-1.9z";
  function at(x, y, s) { return ' transform="translate(' + x + " " + y + ") scale(" + s + ') translate(-20 -20)"'; }
  function star(x, y, s, grad) { return '<path d="' + STAR + '" fill="url(#' + (grad || "rs-g-star") + ')"' + at(x, y, s) + "/>"; }
  function orb(cx, cy, r, grad) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + (grad || "rs-g-orb") + ')"/>'; }

  var DOODLES = {
    /* 星：くっきりした4つ角の星と、光の粒 */
    sparkle: star(20, 20, 1) + orb(33, 7.5, 2.1) + orb(7, 32.5, 1.5, "rs-g-orb-gold"),
    /* 小さな星たち */
    stars: star(15, 23, 0.7) + star(31, 10, 0.38, "rs-g-star-gold") + star(32, 31, 0.24) + orb(6.5, 7.5, 1.6, "rs-g-orb-gold") + orb(25, 3.5, 1.1),
    /* 月 */
    moon: '<path d="' + MOON + '" fill="url(#rs-g-moon)"/>' + star(34, 8, 0.2, "rs-g-star-gold") + orb(36, 30, 1.3),
    /* 光の丸：光の粒と、細い光の輪 */
    circle: '<circle cx="20" cy="20" r="15.5" fill="none" stroke="#FFFFFF" stroke-opacity=".95" stroke-width="1.1"/>' +
      '<circle cx="20" cy="20" r="15.5" fill="none" stroke="#C79DA6" stroke-opacity=".45" stroke-width=".6" stroke-dasharray="1.2 3"/>' +
      orb(20, 20, 8.5) + orb(34.5, 9, 1.5, "rs-g-orb-gold"),
    /* 飛行機（右向き・上から見た形） */
    plane: '<path d="' + PLANE + '" fill="url(#rs-g-plane)" stroke="#C79DA6" stroke-opacity=".55" stroke-width=".6" stroke-linejoin="round"/>'
  };

  /* 色のグラデーション（ページに1回だけ用意して、すべての飾りで使い回します） */
  function ensureDoodleDefs() {
    if (document.getElementById("rs-doodle-defs")) return;
    var holder = el("div", { id: "rs-doodle-defs", "aria-hidden": "true" });
    holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    holder.innerHTML = '<svg width="0" height="0" focusable="false"><defs>' +
      '<radialGradient id="rs-g-star" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".35" stop-color="#F3DDE2"/><stop offset="1" stop-color="#C79DA6"/></radialGradient>' +
      '<radialGradient id="rs-g-star-gold" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#F6E3B8"/><stop offset="1" stop-color="#D2A85E"/></radialGradient>' +
      '<radialGradient id="rs-g-orb" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#EBCFD5"/><stop offset="1" stop-color="#C79DA6"/></radialGradient>' +
      '<radialGradient id="rs-g-orb-gold" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#F3DDA8"/><stop offset="1" stop-color="#D2A85E"/></radialGradient>' +
      '<linearGradient id="rs-g-plane" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9D3D8"/><stop offset=".55" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F3E4E7"/></linearGradient>' +
      '<linearGradient id="rs-g-moon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6E2"/><stop offset=".55" stop-color="#F1D69A"/><stop offset="1" stop-color="#D2A85E"/></linearGradient>' +
      "</defs></svg>";
    document.body.appendChild(holder);
  }

  function doodleSvg(name) {
    ensureDoodleDefs();
    return '<svg viewBox="0 0 40 40" focusable="false">' + (DOODLES[name] || "") + "</svg>";
  }

  function doodle(name, cls) {
    var span = el("span", { class: "doodle " + (cls || ""), "aria-hidden": "true" });
    span.innerHTML = doodleSvg(name);
    return span;
  }

  function upgradeDoodles(root) {
    (root || document).querySelectorAll("[data-doodle]:not([data-doodle-ready])").forEach(function (n) {
      n.setAttribute("data-doodle-ready", "");
      n.classList.add("doodle");
      n.setAttribute("aria-hidden", "true");
      n.innerHTML = doodleSvg(n.getAttribute("data-doodle"));
    });
  }

  /* ---------- 航路（点線の航跡と、小さな飛行機） ----------
     HTMLに <div data-route></div> と書くと、画面に入ったときに点線がすっと描かれ、
     最後に小さな飛行機が現れます。 */
  var routeCount = 0;
  function routeSvg() {
    ensureDoodleDefs();
    var id = "rs-route-mask-" + (++routeCount);
    var d = "M14 62C120 66 190 18 300 30S470 66 548 28";
    return '<svg class="route__svg" viewBox="0 0 600 80" focusable="false">' +
      '<defs><mask id="' + id + '" maskUnits="userSpaceOnUse"><path class="route__reveal" d="' + d + '" pathLength="1" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/></mask></defs>' +
      '<path class="route__dots" d="' + d + '" mask="url(#' + id + ')" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.1 9"/>' +
      '<circle class="route__start" cx="14" cy="62" r="3.2" fill="url(#rs-g-orb)"/>' +
      '<g class="route__plane"><g transform="translate(560 24) rotate(-22) scale(1.35) translate(-20 -20)">' + DOODLES.plane + "</g></g>" +
      "</svg>";
  }
  function upgradeRoutes(root) {
    (root || document).querySelectorAll("[data-route]:not([data-route-ready])").forEach(function (n) {
      n.setAttribute("data-route-ready", "");
      n.classList.add("route");
      n.setAttribute("aria-hidden", "true");
      n.innerHTML = routeSvg();
    });
  }

  /* ---------- スクロールで、ふわっと表示 ---------- */
  var observer = null;
  function observeReveal(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      var items = group.querySelectorAll("[data-reveal]");
      items.forEach(function (item, i) {
        if (!item.style.getPropertyValue("--reveal-delay")) {
          item.style.setProperty("--reveal-delay", Math.min(i, 6) * 90 + "ms");
        }
      });
    });
    var targets = scope.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // 一度表示したら、もう消えません
          }
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    }
    targets.forEach(function (n) { observer.observe(n); });
  }

  /* ---------- 公開する道具 ---------- */
  window.RS = {
    config: CONFIG,
    get lang() { return lang; },
    t: t, pick: pick, el: el, bind: bind, text: text, label: label,
    extLink: extLink, hint: hint, socialList: socialList, media: media,
    films: films, visibleFilms: visibleFilms, filmById: filmById, filmPlayer: filmPlayer,
    youtubeWatchUrl: youtubeWatchUrl, observeReveal: observeReveal, setLang: setLang,
    doodle: doodle, upgradeDoodles: upgradeDoodles, upgradeRoutes: upgradeRoutes,
    reduceMotion: reduceMotion
  };

  /* ---------- 起動 ---------- */
  function init() {
    var page = document.body.getAttribute("data-page");
    buildHeader(page);
    buildFooter(page);
    upgradeStaticMedia();
    upgradeDoodles(document);
    upgradeRoutes(document);
    applyLang();
    observeReveal(document);
    document.documentElement.classList.add("reveal-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
