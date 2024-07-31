export { addCard, deleteCard, putLike };

//Функция создания карточек на странице
function addCard(name, link, deleteCard, openPopupImg, putLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  cardImg.src = link;
  cardName.textContent = name;
  cardImg.alt = name;
  deleteButton.addEventListener("click", deleteCard);
  cardImg.addEventListener("click", function () {
    openPopupImg(name, link);
  });
  likeButton.addEventListener("click", putLike);
  return card;
}

//Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}

//Функция лайка на карточку
function putLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
