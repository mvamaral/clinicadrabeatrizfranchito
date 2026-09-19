const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    
    if (entry.isIntersecting) {
      entry.target.classList.add('show-s');
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove('show-s');
    }
  });
}, {
  threshold: 0.15 //15% do elemento visível na tela
});

const hiddenElements = document.querySelectorAll('.hidden-s');
hiddenElements.forEach((el) => observer.observe(el));