/* Films ページ：最新動画・その他の動画・チャンネルへのリンク */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;
  var all = RS.visibleFilms();
  // URLが設定された動画を先に（いちばん上の設定済み動画が「最新」）
  var ready = all.filter(function (f) { return f.videoId; });
  var unset = all.filter(function (f) { return !f.videoId; });
  var list = ready.concat(unset);

  function filmLinks(film) {
    var links = el("div", { class: "film-links" });
    if (film.videoId) links.appendChild(RS.extLink(RS.youtubeWatchUrl(film), RS.label("span", "films.watchYT"), "link-arrow"));
    if (film.journal) {
      var j = RS.label("a", "films.journal", "link-arrow");
      j.href = "journal.html#" + film.journal;
      links.appendChild(j);
    }
    return links;
  }

  /* ---- 最新の動画 ---- */
  var latestBox = document.getElementById("films-latest");
  var latest = list[0];
  if (latest) {
    var block = el("article", { class: "film-latest", id: "film-" + latest.id, "data-reveal-group": true }, [
      el("div", { "data-reveal": true }, [RS.filmPlayer(latest, true)]),
      el("div", { class: "film-latest__text", "data-reveal": true }, [
        RS.text("h2", latest.title, "title-lg"),
        RS.text("p", latest.description),
        latest.videoId ? null : RS.hint("assets/js/data/films.js の youtube に動画のURLを入れてください。URLが空欄の動画は、公開時（showSetupHints: false）には表示されません。"),
        filmLinks(latest)
      ])
    ]);
    latestBox.appendChild(block);
  } else {
    var channelLink = RS.extLink(RS.config.links.youtube, RS.label("span", "films.channel"), "link-arrow");
    latestBox.appendChild(el("div", { class: "empty-state", "data-reveal": true }, [RS.label("p", "films.empty"), channelLink]));
  }

  /* ---- その他の動画 ---- */
  var more = list.slice(1);
  var grid = document.getElementById("films-more");
  if (more.length) {
    more.forEach(function (film) {
      grid.appendChild(el("article", { class: "film-card", id: "film-" + film.id, "data-reveal": true }, [
        RS.filmPlayer(film),
        RS.text("h3", film.title),
        RS.text("p", film.description),
        filmLinks(film)
      ]));
    });
  } else {
    document.getElementById("films-more-section").hidden = true;
  }

  /* ---- YouTubeチャンネル ---- */
  var channel = document.getElementById("films-channel");
  channel.appendChild(RS.extLink(RS.config.links.youtube, RS.label("span", "films.channel"), "btn"));
  var h = RS.hint("config.js の youtube にチャンネルのURLを入れてください。");
  if (h && !RS.config.links.youtube) channel.appendChild(h);

  RS.observeReveal(document.getElementById("main"));

  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) window.requestAnimationFrame(function () { target.scrollIntoView(); });
  }
})();
