// Seleciona todos os botões, popups e botões de fechar
const buttonsOpen = document.querySelectorAll(".p-open");
const popups = document.querySelectorAll(".popup-injetaveis");
const buttonsClose = document.querySelectorAll(".p-close");

// Função para abrir o popup específico
buttonsOpen.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    document.getElementById(targetId).classList.add("open");
  });
});

// Função para fechar qualquer popup
const closePopup = (popup) => {
  popup.classList.remove("open");
};

// Evento para fechar no ícone (X)
buttonsClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup-injetaveis");
    closePopup(popup);
  });
});

// Fecha ao rolar a página
window.addEventListener("scroll", () => {
  popups.forEach((popup) => {
    if (popup.classList.contains("open")) {
      closePopup(popup);
    }
  });
});
