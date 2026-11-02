/* Travel Journal ページ：都市ごとの写真グリッド（写真ビューアーは gallery.js） */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;
  var cities = window.JOURNAL_DATA || [];

  /* ---- 都市の一覧 ---- */
  var index = document.getElementById("city-index");
  index.appendChild(RS.label("span", "journal.cities", "eyebrow"));
  cities.forEach(function (city) {
    var a = RS.text("a", city.name);
    a.href = "#" + city.id;
    index.appendChild(a);
  });

  /* ---- 各都市のセクション ---- */
  var wrap = document.getElementById("cities");
  cities.forEach(function (city) {
    var count = el("span");
    RS.bind(count, function (n) {
      n.textContent = RS.lang === "ja" ? city.photos.length + RS.t("journal.photos") : city.photos.length + " " + RS.t("journal.photos");
    });

    var links = el("div", { class: "city__links" });
    if (city.mapsUrl) {
      links.appendChild(RS.extLink(city.mapsUrl, RS.label("span", "journal.map"), "link-arrow"));
    } else {
      var h = RS.hint("journal.js の mapsUrl に Google マップのURLを入れると「Google マップで見る」ボタンが表示されます。");
      if (h) links.appendChild(h);
    }
    var film = city.filmId ? RS.filmById(city.filmId) : null;
    if (film && film.videoId) {
      var filmLink = RS.label("a", "journal.film", "link-arrow");
      filmLink.href = "films.html#film-" + film.id;
      links.appendChild(filmLink);
    }

    var head = el("header", { class: "city__head", "data-reveal-group": true }, [
      el("div", { "data-reveal": true }, [
        RS.text("h2", city.name, "city__name"),
        el("span", { class: "eyebrow city__country" }, [RS.text("span", city.country), " · ", count])
      ]),
      el("div", { "data-reveal": true }, [RS.text("p", city.intro, "city__intro"), links])
    ]);

    wrap.appendChild(el("section", { class: "city", id: city.id }, [
      head, RS.gallery.grid(city.photos, city.name), RS.label("p", "journal.hint", "grid-hint")
    ]));
  });

  RS.observeReveal(document.getElementById("main"));

  /* URLの #copenhagen などで来たときは、その都市の位置へ */
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) window.requestAnimationFrame(function () { target.scrollIntoView(); });
  }
})();
