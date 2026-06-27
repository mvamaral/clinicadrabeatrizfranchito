const popup = document.getElementById("popup-close");
const popupAbrir = document.getElementById("p-open");
const popupFechar = document.getElementById("p-close");

// Função para abrir o popup
popupAbrir.addEventListener("click", () => {
  popup.classList.add("open");
});

// Função para fechar o popup
const fecharMenu = () => {
  popup.classList.remove("open");
};

// Fecha ao clicar no botão de fechar (X)
popupFechar.addEventListener("click", fecharMenu);

// Fecha automaticamente ao rolar o scroll
window.addEventListener("scroll", () => {
  // Executa o fechamento apenas se o popup estiver visível
  if (popup.classList.contains("open")) {
    fecharMenu();
  }
});
