(() => {
  const anoAtual = document.getElementById('ano-atual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // ===== MENU DE NAVEGAÇÃO =====
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuSecoes = document.querySelector('[data-menu-secoes]');

  if (menuToggle && menuSecoes) {
    const linksMenu = menuSecoes.querySelectorAll('[data-menu-link]');

    const fecharMenu = () => {
      menuSecoes.classList.remove('is-aberto');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
    };

    const abrirMenu = () => {
      menuSecoes.classList.add('is-aberto');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.textContent = 'Fechar';
      linksMenu[0]?.focus();
    };

    menuToggle.addEventListener('click', () => {
      const estaAberto = menuSecoes.classList.contains('is-aberto');
      estaAberto ? fecharMenu() : abrirMenu();
    });

    linksMenu.forEach((link) => link.addEventListener('click', fecharMenu));

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && menuSecoes.classList.contains('is-aberto')) {
        fecharMenu();
        menuToggle.focus();
      }
    });
  }

  // ===== VOLTAR AO TOPO =====
  const botaoVoltarTopo = document.querySelector('[data-voltar-topo]');

  if (botaoVoltarTopo) {
    let tickingTopo = false;

    const atualizarVisibilidadeTopo = () => {
      botaoVoltarTopo.classList.toggle('is-visivel', window.scrollY > window.innerHeight * 0.6);
      tickingTopo = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!tickingTopo) {
          window.requestAnimationFrame(atualizarVisibilidadeTopo);
          tickingTopo = true;
        }
      },
      { passive: true }
    );
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
