(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}var n=function(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))};function o(){var e=document.querySelector(".popup_is-opened");e.addEventListener("click",(function(n){n.currentTarget===n.target&&t(e)})),e.removeEventListener("click",o)}function r(){var e=document.querySelector(".popup_is-opened");e.querySelector(".popup__close").addEventListener("click",(function(){t(e),e.removeEventListener("click",r)}))}var c={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"19b2254e-2f5b-43b9-afd8-9e008d28635a","Content-Type":"application/json"}},u=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},a=function(){return fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(u)},i=function(){return fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(u)};function l(e,t,n,o,r,c,u,a,i){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__title"),p=l.querySelector(".card__delete-button"),f=l.querySelector(".card__like-button"),_=l.querySelector(".card__like-count");return s.src=t,d.textContent=e,s.alt=e,_.textContent=n.length,i!==a._id?p.style.display="none":p.addEventListener("click",(function(){r(o,l)})),s.addEventListener("click",(function(){c(e,t)})),n.some((function(e){return e._id===i}))&&f.classList.add("card__like-button_is-active"),f.addEventListener("click",(function(){u(o,f,_)})),l}function s(e,t){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then(u)})(e).then((function(){t.closest(".card").remove()})).catch((function(e){console.error(e)}))}function d(e,t,n){t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then(u)}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then(u)}(e).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},f=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},_=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function m(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){f(e,n,t)})),_(n,o,t)}document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);var v=document.querySelector(".profile__add-button"),y=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type-image"),E=document.querySelector(".popup_type_avatar"),k=document.forms["edit-profile"],C=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),A=document.querySelector(".popup__image"),U=document.querySelector(".popup__caption"),T=document.forms["new-place"],w=document.forms["edit-avatar"],B=document.querySelector(".popup__input_type_card-name"),D=document.querySelector(".popup__input_type_url"),P=document.querySelector(".popup__input_type_avatar"),N=document.querySelectorAll(".popup"),O=document.querySelector(".popup__form"),j=O.querySelector(".popup__input"),J=(O.querySelector(".".concat(j.id,"-error")),document.querySelector(".profile__image")),M=document.querySelectorAll(".popup__button"),H="";function V(t,n){A.src=n,A.alt=t,U.textContent=t,e(q)}a().then((function(e){g.textContent=e.name,x.textContent=e.about,J.setAttribute("style","background-image: url('".concat(e.avatar,"')")),H=e._id})).catch((function(e){console.error(e)})),i().then((function(e){e.forEach((function(e){var t=l(e.name,e.link,e.likes,e._id,s,V,d,e.owner,H);y.append(t)}))})).catch((function(e){console.log(e)})),N.forEach((function(e){e.addEventListener("click",o),e.addEventListener("click",r)})),v.addEventListener("click",(function(){m(T,p),e(S)})),h.addEventListener("click",(function(){C.value=g.textContent,L.value=x.textContent,m(k,p),e(b)})),J.addEventListener("click",(function(){m(w,p),e(E)})),k.addEventListener("submit",(function(e){e.preventDefault();var n=C.value,o=L.value;M.forEach((function(e){e.textContent="Сохранение..."})),function(e,t){return fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})}).then(u)}(n,o).then((function(e){g.textContent=e.name,x.textContent=e.about,t(b)})).catch((function(e){console.log(e)})).finally((function(){M.forEach((function(e){e.textContent="Сохранить"}))}))})),T.addEventListener("submit",(function(e){e.preventDefault();var n=B.value,o=D.value;M.forEach((function(e){e.textContent="Сохранение..."})),function(e,t){return fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:e,link:t})}).then(u)}(n,o).then((function(e){var n;n=l(e.name,e.link,e.likes,e._id,s,V,d,e.owner,H),y.prepend(n),T.reset(),t(S)})).catch((function(e){console.log(e)})).finally((function(){M.forEach((function(e){e.textContent="Сохранить"}))}))})),w.addEventListener("submit",(function(e){e.preventDefault();var n=P.value;M.forEach((function(e){e.textContent="Сохранение..."})),function(e){return fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})}).then(u)}(n).then((function(e){J.setAttribute("style","background-image: url('".concat(e.avatar,"')")),w.reset(),t(E)})).catch((function(e){console.log(e)})).finally((function(){M.forEach((function(e){e.textContent="Сохранить"}))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);_(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),_(n,o,t)}))}))}(t,e)}))}(p),Promise.all([a(),i()]).then((function(){})).catch((function(e){console.error(e)}))})();