import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { addCard, deleteCard, putLike } from "./components/card.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const card = cardTemplate.querySelector(".card").cloneNode(true);

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const placeList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const formElement = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const formPlace = document.forms["new-place"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

initialCards.forEach((item) => {
  const newCards = addCard(
    item.name,
    item.link,
    deleteCard,
    openPopupImg,
    putLike
  );
  placeList.append(newCards);
});

addButton.addEventListener("click", function () {
  openPopup(popupNewCard); // открываем попап добавления
});

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit); // открываем попап редактирования профиля
});

function openPopupImg(name, link) {
  popupImageSrc.src = link;
  popupImageSrc.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

//форма персональных данных
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const description = descriptionInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме персональных данных:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

function placeFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  const newCard = addCard(placeName, link, deleteCard, openPopupImg, putLike);
  addNewCard(newCard);
  formPlace.reset();
  closePopup(popupNewCard);
}

function addNewCard(card) {
  placeList.prepend(card);
}

// Прикрепляем обработчик к форме нового места:
// он будет следить за событием “submit” - «отправка»
formPlace.addEventListener("submit", placeFormSubmit);
