const observerScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-s');
      observerScroll.unobserve(entry.target);
    } else {
      entry.target.classList.remove('show-s');
    }
  });
}, {
  threshold: 0.15 //15% do elemento visível na tela
});

const hiddenElements = document.querySelectorAll('hidden-s');
hiddenElements.forEach((element) => observerScroll.observe(element));