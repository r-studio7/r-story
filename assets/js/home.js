/* Home ページ：最新動画・ジャーナルの写真・SNSリンクを表示 */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;

  /* ---- 最新の動画（films.js のいちばん上の動画） ---- */
  var filmBox = document.getElementById("home-film");
  var films = RS.visibleFilms();
  var latest = films.filter(function (f) { return f.videoId; })[0] || films[0];

  var head = [
    RS.label("p", "home.film.eyebrow", "eyebrow"),
  ];
  var title = latest ? RS.text("h2", latest.title, "title-lg") : RS.label("h2", "films.channelTitle", "title-lg");
  title.id = "home-film-title";

  if (latest) {
    var actions = el("div", { class: "feature-film__actions" });
    if (latest.videoId) {
      actions.appendChild(RS.extLink(RS.youtubeWatchUrl(latest), RS.label("span", "films.watchYT"), "link-arrow"));
    }
    var toFilms = RS.label("a", "home.film.cta", "link-arrow");
    toFilms.href = "films.html";
    actions.appendChild(toFilms);

    filmBox.appendChild(el("div", { "data-reveal": true }, [RS.filmPlayer(latest)]));
    filmBox.appendChild(el("div", { class: "feature-film__text", "data-reveal": true }, head.concat([
      title,
      RS.text("p", latest.description),
      latest.videoId ? null : RS.hint("films.js の1本目に動画URLを入れると、ここが最新動画になります。"),
      actions
    ])));
  } else {
    var link = RS.label("a", "home.film.cta", "link-arrow");
    link.href = "films.html";
    filmBox.appendChild(el("div", { class: "feature-film__text", "data-reveal": true }, head.concat([
      title, RS.label("p", "home.film.empty"), link
    ])));
  }

  /* ---- 写真ギャラリー（最初の都市の写真すべて。押すと大きく表示） ---- */
  var city = (window.JOURNAL_DATA || [])[0];
  if (city) {
    document.getElementById("home-journal").appendChild(RS.gallery.grid(city.photos, city.name));
  }

  /* ---- Substack の購読ボタン ---- */
  var lettersActions = document.getElementById("home-letters-actions");
  lettersActions.appendChild(RS.extLink(RS.config.links.substackSubscribe, RS.label("span", "letters.subscribe"), "link-arrow"));

  /* ---- SNS ---- */
  document.getElementById("home-follow").appendChild(RS.socialList("large"));

  RS.observeReveal(document.getElementById("main"));
})();
