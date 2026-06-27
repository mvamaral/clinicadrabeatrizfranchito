const menu = document.getElementById("nav-open");
const menuAbrir = document.getElementById("btn-open");
const menuFechar = document.getElementById("btn-close");

// Função para abrir o menu
menuAbrir.addEventListener("click", () => {
  menu.classList.add("open");
});

// Função para fechar o menu
const fecharMenu = () => {
  menu.classList.remove("open");
};

// Fecha ao clicar no botão de fechar (X)
menuFechar.addEventListener("click", fecharMenu);

// Fecha automaticamente ao rolar o scroll
window.addEventListener("scroll", () => {
  // Executa o fechamento apenas se o menu estiver visível
  if (menu.classList.contains("open")) {
    fecharMenu();
  }
});
