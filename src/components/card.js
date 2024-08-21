export { addCard, deleteCard, putLike };
import { putLikesCard, deleteLikesCard, deleteMyCard } from "./api.js";

//Функция создания карточек на странице
function addCard(
  name,
  link,
  likes,
  id,
  deleteCard,
  openPopupImg,
  putLike,
  owner,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCount = card.querySelector(".card__like-count");
  cardImg.src = link;
  cardName.textContent = name;
  cardImg.alt = name;
  likeCount.textContent = likes.length;
  if (userId !== owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(id, card);
    });
  }
  cardImg.addEventListener("click", () => {
    openPopupImg(name, link);
  });
  const likeActive = likes.some((like) => like._id === userId);
  if (likeActive) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    putLike(id, likeButton, likeCount);
  });
  return card;
}

//Функция удаления карточки
function deleteCard(id, card) {
  deleteMyCard(id)
    .then(() => {
      card.closest(".card").remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

//Функция лайка на карточку
function putLike(id, likeButton, likeCount) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikesCard(id)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLikesCard(id)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
