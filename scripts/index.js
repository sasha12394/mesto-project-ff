// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const placeList = document.querySelector(".places__list");
 // @todo: Функция создания карточки

 initialCards.forEach((item) => {
  item.link, item.name
}); 


function addCard(item, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  cardImg.src = item.link;
  cardName.textContent = item.name;
  cardImg.alt = item.name;
  deleteButton.addEventListener('click', deleteCard);
  return card;
  
}
function deleteCard(event){
  event.target.closest(".card").remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placeList.append(addCard(item, deleteCard));
});
