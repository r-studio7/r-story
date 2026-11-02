/* About & Follow：SNSリンクと、お問い合わせ（設定したときだけ表示） */
(function () {
  "use strict";
  var RS = window.RS, el = RS.el;
  var contact = RS.config.contact || {};

  document.getElementById("about-social").appendChild(RS.socialList("detailed"));

  var section = document.getElementById("about-contact");
  var body = document.getElementById("about-contact-body");
  if (contact.email || contact.formUrl) {
    if (contact.email) {
      body.appendChild(el("p", null, [el("a", { class: "contact-email", href: "mailto:" + contact.email, text: contact.email })]));
    }
    if (contact.formUrl) {
      body.appendChild(RS.extLink(contact.formUrl, RS.label("span", "about.contactForm"), "link-arrow"));
    }
    section.hidden = false;
  } else if (RS.config.showSetupHints) {
    // 制作中だけ：設定方法のメモを表示
    body.appendChild(RS.hint("お問い合わせ欄を出したい場合は、config.js の contact に、ご自身のメールアドレスまたはフォームのURLを入れてください。空欄なら、この欄は公開時に表示されません。"));
    section.hidden = false;
  }

  RS.observeReveal(document.getElementById("main"));
})();
