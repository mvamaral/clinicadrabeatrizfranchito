const menu = document.getElementById("header");
const menuAbrir = document.getElementById("open");
const menuFechar = document.getElementById("close");

// Função para abrir o menu
menuAbrir.addEventListener("click", () => {
  menu.classList.add("nav-open");
});

// Função para fechar o menu
const fecharMenu = () => {
  menu.classList.remove("nav-open");
};

// Fecha ao clicar no botão de fechar (X)
menuFechar.addEventListener("click", fecharMenu);

// Fecha automaticamente ao rolar o scroll
window.addEventListener("scroll", () => {
  // Executa o fechamento apenas se o menu estiver visível
  if (menu.classList.contains("nav-open")) {
    fecharMenu();
  }
});
