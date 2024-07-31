import { initialCards } from "./components/cards.js";
import "./pages/index.css";
import { openPopup, closePopup, closePopupOverlay, closePopupButton } from "./components/modal.js";
import { addCard, deleteCard, putLike } from "./components/card.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const card = cardTemplate.querySelector(".card").cloneNode(true);

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const formEdit = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const formPlace = document.forms["new-place"];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const popup = document.querySelectorAll(".popup")

initialCards.forEach((item) => {
  const newCards = addCard(
    item.name,
    item.link,
    deleteCard,
    openPopupImg,
    putLike
  );
  cardsContainer.append(newCards);
});

//Вешаем слушатели закрытия по Overlay и крестику на все popup
popup.forEach((item) => {
item.addEventListener("click", closePopupOverlay);
item.addEventListener("click", closePopupButton);
})

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
function EditPersonalSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value;
  const description = descriptionInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме персональных данных:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", EditPersonalSubmit);

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
  cardsContainer.prepend(card);
}

// Прикрепляем обработчик к форме нового места:
// он будет следить за событием “submit” - «отправка»
formPlace.addEventListener("submit", placeFormSubmit);
