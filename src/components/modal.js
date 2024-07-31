export { openPopup, closePopup };

//Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popupElement.addEventListener("click", closePopupOverlay);
  popupElement.addEventListener("click", closePopupButton);
}

//Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popupElement.removeEventListener("click", closePopupOverlay);
  popupElement.removeEventListener("click", closePopupButton);
}

//Закрытия popup клавишей Esc
const closePopupEsc = (e) => {
  if (e.key === "Escape") {
    const popupElement = document.querySelector(".popup_is-opened"); // находим открытый попап
    closePopup(popupElement);
  }
};

//Закрытия popup Overlay
function closePopupOverlay() {
  const popupElement = document.querySelector(".popup_is-opened"); // находим открытый попап
  popupElement.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupElement);
    }
  });
}

//Закрытия popup крестиком
function closePopupButton() {
  const popupElement = document.querySelector(".popup_is-opened");
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupElement);
  });
}
