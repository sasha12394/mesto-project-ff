import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openPopup, closePopup, closePopupOverlay, closePopupButton } from "./components/modal.js";
import { addCard, deleteCard, putLike } from "./components/card.js";
import { enableValidation, clearValidation, validationConfig } from "./components/validation.js";
import { getUserInfo, getInitialCards, patchUserInfo, postNewCard, patchAvatar } from "./components/api.js";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const card = cardTemplate.querySelector(".card").cloneNode(true);

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type-image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formEdit = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const formPlace = document.forms["new-place"];
const formAvatar = document.forms["edit-avatar"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const popup = document.querySelectorAll(".popup");
const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);
const Avatar = document.querySelector(".profile__image");
const popupButton = document.querySelectorAll(".popup__button");

let userId = "";
getUserInfo()
  .then((UserInfo) => {
    profileTitle.textContent = UserInfo.name;
    profileDescription.textContent = UserInfo.about;
    Avatar.setAttribute("style", `background-image: url('${UserInfo.avatar}')`);
    userId = UserInfo._id;
  })
  .catch((err) => {
    console.error(err);
  });

//Выводим карточки на страницу
getInitialCards()
  .then((data) => {
    data.forEach((item) => {
      const newCards = addCard(
        item.name,
        item.link,
        item.likes,
        item._id,
        deleteCard,
        openPopupImg,
        putLike,
        item.owner,
        userId
      );
      cardsContainer.append(newCards);
    }); // если мы попали в этот then, data — это объект
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//Вешаем слушатели закрытия по Overlay и крестику на все popup
popup.forEach((item) => {
  item.addEventListener("click", closePopupOverlay);
  item.addEventListener("click", closePopupButton);
});

addButton.addEventListener("click", function () {
  clearValidation(formPlace, validationConfig);
  openPopup(popupNewCard); // открываем попап добавления
});

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
  openPopup(popupEdit); // открываем попап редактирования профиля
});

Avatar.addEventListener("click", function () {
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar); // открываем попап редактирования аватара
});

function openPopupImg(name, link) {
  popupImageSrc.src = link;
  popupImageSrc.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

//форма персональных данных
function EditPersonalSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const about = descriptionInput.value;
  popupButton.forEach((item) => {
    item.textContent = "Сохранение...";
  });
  patchUserInfo(name, about)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupButton.forEach((item) => {
        item.textContent = "Сохранить";
      });
    });
}

// Прикрепляем обработчик к форме персональных данных:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", EditPersonalSubmit);

function placeFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = placeNameInput.value;
  const link = linkInput.value;
  popupButton.forEach((item) => {
    item.textContent = "Сохранение...";
  });
  postNewCard(name, link)
    .then((data) => {
      const newCard = addCard(
        data.name,
        data.link,
        data.likes,
        data._id,
        deleteCard,
        openPopupImg,
        putLike,
        data.owner,
        userId
      );
      addNewCard(newCard);
      formPlace.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupButton.forEach((item) => {
        item.textContent = "Сохранить";
      });
    });
}

function addNewCard(card) {
  cardsContainer.prepend(card);
}

// Прикрепляем обработчик к форме нового места:
// он будет следить за событием “submit” - «отправка»
formPlace.addEventListener("submit", placeFormSubmit);

//форма аватара
function EditAvatarSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const avatar = avatarInput.value;
  popupButton.forEach((item) => {
    item.textContent = "Сохранение...";
  });
  patchAvatar(avatar)
    .then((data) => {
      Avatar.setAttribute("style", `background-image: url('${data.avatar}')`);
      formAvatar.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      popupButton.forEach((item) => {
        item.textContent = "Сохранить";
      });
    });
}

// Прикрепляем обработчик к форме персональных данных:
// он будет следить за событием “submit” - «отправка»
formAvatar.addEventListener("submit", EditAvatarSubmit);

// Вызовем функцию проверки валидности
enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
