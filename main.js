(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}var n=function(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))};function r(){var e=document.querySelector(".popup_is-opened");e.addEventListener("click",(function(n){n.currentTarget===n.target&&t(e)})),e.removeEventListener("click",r)}function o(){var e=document.querySelector(".popup_is-opened");e.querySelector(".popup__close").addEventListener("click",(function(){t(e),e.removeEventListener("click",o)}))}var c={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"19b2254e-2f5b-43b9-afd8-9e008d28635a","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function u(e,t,n,r,o,c,a,u,i){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__title"),p=l.querySelector(".card__delete-button"),f=l.querySelector(".card__like-button"),m=l.querySelector(".card__like-count");return s.src=t,d.textContent=e,s.alt=e,m.textContent=n.length,i!==u._id?p.style.display="none":p.addEventListener("click",(function(){o(r,l)})),s.addEventListener("click",(function(){c(e,t)})),n.some((function(e){return e._id===i}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){a(r,f,m)})),l}function i(e,t){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then(a)})(e).then((function(){t.remove()})).catch((function(e){console.error(e)}))}function l(e,t,n){t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then(a)}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then(a)}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),p(n,r,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);var _=document.querySelector(".profile__add-button"),v=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type-image"),q=document.querySelector(".popup_type_avatar"),E=document.forms["edit-profile"],g=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),L=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),A=document.querySelector(".popup__image"),x=document.querySelector(".popup__caption"),B=document.forms["new-place"],U=document.forms["edit-avatar"],w=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),j=document.querySelector(".popup__input_type_avatar"),O=document.querySelectorAll(".popup"),D=document.querySelector(".popup__form"),P=D.querySelector(".popup__input"),N=(D.querySelector(".".concat(P.id,"-error")),document.querySelector(".profile__image"));document.querySelectorAll(".popup__button").forEach((function(e){e.textContent}));var M="";function I(t,n){A.src=n,A.alt=t,x.textContent=t,e(b)}O.forEach((function(e){e.addEventListener("click",r),e.addEventListener("click",o)})),_.addEventListener("click",(function(){f(B,s),e(h)})),y.addEventListener("click",(function(){g.value=L.textContent,k.value=C.textContent,f(E,s),e(S)})),N.addEventListener("click",(function(){f(U,s),e(q)})),E.addEventListener("submit",(function(e){e.preventDefault();var n=g.value,r=k.value;saveButton="Сохранение...",function(e,t){return fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})}).then(a)}(n,r).then((function(e){L.textContent=e.name,C.textContent=e.about,t(S)})).catch((function(e){console.log(e)})).finally((function(){saveButton="Сохранить"}))})),B.addEventListener("submit",(function(e){e.preventDefault();var n=w.value,r=T.value;saveButton="Сохранение...",function(e,t){return fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:e,link:t})}).then(a)}(n,r).then((function(e){var n;n=u(e.name,e.link,e.likes,e._id,i,I,l,e.owner,M),v.prepend(n),B.reset(),t(h)})).catch((function(e){console.log(e)})).finally((function(){saveButton="Сохранить"}))})),U.addEventListener("submit",(function(e){e.preventDefault();var n=j.value;saveButton="Сохранение...",function(e){return fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})}).then(a)}(n).then((function(e){N.setAttribute("style","background-image: url('".concat(e.avatar,"')")),U.reset(),t(q)})).catch((function(e){console.log(e)})).finally((function(){saveButton="Сохранить"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(s),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(a),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(a)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];L.textContent=o.name,C.textContent=o.about,N.setAttribute("style","background-image: url('".concat(o.avatar,"')")),M=o._id,c.forEach((function(e){var t=u(e.name,e.link,e.likes,e._id,i,I,l,e.owner,M);v.append(t)}))})).catch((function(e){console.error(e)}))})();