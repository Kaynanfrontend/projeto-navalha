(() => {
  const anoAtual = document.getElementById('ano-atual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefereMovimentoReduzido) return;

  // ===== SCROLL REVEAL =====
  const elementosRevelaveis = document.querySelectorAll('.secao, .hero__conteudo');

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelar--visivel');
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosRevelaveis.forEach((el) => {
    el.classList.add('revelar');
    observer.observe(el);
  });

  // ===== PARALLAX LEVE NO HERO =====
  const heroImagem = document.querySelector('.hero__imagem');

  if (heroImagem) {
    let ticking = false;

    const atualizarParallax = () => {
      const deslocamento = window.scrollY * 0.3;
      heroImagem.style.transform = `translateY(${deslocamento}px)`;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(atualizarParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
})();
