const observerOptions = {
  root: null, // usa a tela como referência
  threshold: 1.0, // dispara quando 100% do elemento estiver visível
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      // Opcional: remove a classe se quiser que o texto oculte ao sair da tela
      entry.target.classList.remove("is-visible");
    }
  });
}, observerOptions);

// Seleciona os cards
const cardsProcedimento = document.querySelectorAll(".procedimentos-card");
cardsProcedimento.forEach((card) => observer.observe(card));

const cardsTec = document.querySelectorAll(".box-tec");
cardsTec.forEach((card) => observer.observe(card));