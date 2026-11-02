/* 写真ギャラリーと写真ビューアー（ライトボックス）— Home と Travel Journal で共通 */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;

  function captionText(photo) {
    var place = RS.pick(photo.place), alt = RS.pick(photo.alt);
    return place ? place + " — " + alt : alt;
  }

  /* ---- 写真ビューアー ---- */
  var viewer = (function () {
    var state = { photos: [], index: 0, title: null, trigger: null };
    var closeBtn = el("button", { type: "button", class: "lightbox__btn", "data-i18n-aria": "lightbox.close", "aria-label": RS.t("lightbox.close"), text: "✕" });
    var prevBtn = el("button", { type: "button", class: "lightbox__btn lightbox__nav lightbox__nav--prev", "data-i18n-aria": "lightbox.prev", "aria-label": RS.t("lightbox.prev"), text: "←" });
    var nextBtn = el("button", { type: "button", class: "lightbox__btn lightbox__nav lightbox__nav--next", "data-i18n-aria": "lightbox.next", "aria-label": RS.t("lightbox.next"), text: "→" });
    var counter = el("p", { class: "lightbox__counter", "aria-live": "polite" });
    var figure = el("figure", { class: "lightbox__figure" });
    var caption = el("p", { class: "lightbox__caption" });
    var dialog = el("dialog", { class: "lightbox", "data-i18n-aria": "lightbox.label", "aria-label": RS.t("lightbox.label") }, [
      el("div", { class: "lightbox__inner" }, [
        el("div", { class: "lightbox__top" }, [counter, closeBtn]),
        el("div", { class: "lightbox__stage" }, [prevBtn, figure, nextBtn]),
        caption
      ])
    ]);
    document.body.appendChild(dialog);

    function render() {
      var list = state.photos, photo = list[state.index];
      figure.innerHTML = "";
      figure.appendChild(RS.media({ src: photo.image, alt: photo.alt, eager: true }));
      var prefix = state.title ? RS.pick(state.title) + "  ·  " : "";
      counter.textContent = prefix + (state.index + 1) + " / " + list.length;
      caption.textContent = captionText(photo);
      var single = list.length < 2;
      prevBtn.hidden = single; nextBtn.hidden = single;
    }

    function go(step) {
      var n = state.photos.length;
      state.index = (state.index + step + n) % n;
      if (RS.reduceMotion.matches) { render(); return; }
      figure.classList.add("is-changing");
      window.setTimeout(function () { render(); figure.classList.remove("is-changing"); }, 220);
    }

    function open(photos, i, trigger, title) {
      state = { photos: photos, index: i, title: title || null, trigger: trigger };
      render();
      dialog.showModal();
      document.body.style.overflow = "hidden";
      void dialog.offsetWidth; // 表示を確定させてから、ふわっと開く
      dialog.classList.add("is-open");
      closeBtn.focus();
    }

    function close() {
      if (!dialog.open) return;
      dialog.classList.remove("is-open");
      var finish = function () {
        dialog.close();
        document.body.style.overflow = "";
        if (state.trigger) state.trigger.focus();
      };
      if (RS.reduceMotion.matches) finish(); else window.setTimeout(finish, 320);
    }

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { go(-1); });
    nextBtn.addEventListener("click", function () { go(1); });
    dialog.addEventListener("cancel", function (e) { e.preventDefault(); close(); }); // Escキー
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    // 写真の外側（暗い部分）をクリックすると閉じる
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.classList.contains("lightbox__stage") || e.target === figure) close();
    });
    // スマートフォン：左右にスワイプで前後の写真へ
    var startX = null, startY = null;
    dialog.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
    dialog.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    document.addEventListener("rs:langchange", function () { if (dialog.open) render(); });

    return { open: open };
  })();

  /* ---- 写真グリッド（写真を押すとビューアーで大きく表示） ---- */
  function grid(photos, title) {
    var box = el("div", { class: "photo-grid", "data-reveal-group": true });
    photos.forEach(function (photo, i) {
      var tile = el("button", { type: "button", class: "photo-tile" });
      RS.bind(tile, function (n) { n.setAttribute("aria-label", RS.t("journal.open") + ": " + captionText(photo)); });
      var item = el("div", { class: "photo-grid__item", "data-reveal": true }, [tile]);
      var m = RS.media({ src: photo.image, alt: photo.alt });
      // 写真が読み込まれたら、枠をその写真の縦横比に合わせる（写真が切れない）
      var img = m.querySelector("img");
      var fit = function () { if (img.naturalWidth) item.style.setProperty("--ar", (img.naturalWidth / img.naturalHeight).toFixed(4)); };
      if (img) { if (img.complete) fit(); else img.addEventListener("load", fit, { once: true }); }
      tile.appendChild(m);
      tile.appendChild(RS.text("span", photo.place || photo.alt, "photo-tile__caption"));
      tile.addEventListener("click", function () { viewer.open(photos, i, tile, title); });
      box.appendChild(item);
    });
    return box;
  }

  RS.gallery = { grid: grid, open: viewer.open };
})();
