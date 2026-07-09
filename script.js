// script.js

// Default mock database structure for local persistence
const defaultSiteData = {
  texts: {
    heroTitle: "Aqui nós <span class=\"highlight\">sonhamos</span> o seu sonho.",
    heroSubtitle: "Aulas de Canto e Instrumentos Musicais em Colatina. Desperte seu talento em uma escola apaixonada por música.",
    aboutTitle: "Uma família unida pela música",
    aboutText1: "Na Sonora Educação Musical, acolhemos crianças, jovens e adultos, oferecendo um ambiente caloroso onde a paixão pela música pode florescer. Nosso objetivo é transformar o aprendizado em uma experiência memorável e inspiradora.",
    aboutText2: "Na Sonora Educação Musical, acolhemos crianças, jovens e adultos de forma afetuosa e humanizada. Acreditamos que o aprendizado da música vai além da técnica: trata-se de conexão, expressão pessoal e união familiar.",
    aboutText3: "Nossa metodologia foca no desenvolvimento individual de cada aluno, adaptando as aulas aos seus ritmos e objetivos, seja para fins profissionais ou para hobby e bem-estar.",
    address: "R. Henrique Beletable, 46 - Santo Antônio, Colatina - ES, 29704-065",
    instagram: "@sonorae.m",
    instagramLink: "https://instagram.com/sonorae.m",
    whatsappLink: "https://api.whatsapp.com/message/GBODBOK3OAPBL1?autoload=1&app_absent=0&utm_source=ig",
    contactHours: "Segunda a Sexta: 08:00 às 20:00 | Sábado: 08:00 às 12:00"
  },
  courses: [
    {
      id: "canto",
      title: "Canto & Técnica Vocal",
      icon: "🎤",
      desc: "Domine a sua voz. Aprenda a controlar a respiração diafragmática, melhore a afinação e adquira presença de palco com acompanhamento personalizado.",
      topics: [
        "Respiração e Apoio Diafragmático",
        "Afinação e Percepção Rítmica",
        "Fisiologia Vocal e Saúde",
        "Expressão e Postura Cênica"
      ],
      audience: "Infantil, Jovens e Adultos",
      modality: "Presencial (Individual / Grupo)"
    },
    {
      id: "violao",
      title: "Violão & Guitarra",
      icon: "🎸",
      desc: "Desenvolva sua musicalidade nas cordas. Das primeiras posições de acordes às técnicas refinadas de solos, improvisação e estilos diversos (MPB, Rock, Pop).",
      topics: [
        "Acordes e Transições Rápidas",
        "Ritmos, Dedilhados e Palhetadas",
        "Escalas, Solos e Improvisação",
        "Prática de Repertório Customizado"
      ],
      audience: "A partir de 7 anos e Adultos",
      modality: "Presencial (Individual / Dupla)"
    },
    {
      id: "teclado",
      title: "Teclado & Piano",
      icon: "🎹",
      desc: "Compreenda a harmonia de forma visual e prática. Aprenda leitura de partitura, estruturação de acordes e desenvolva a independência das mãos.",
      topics: [
        "Postura Correta e Digitação",
        "Leitura Clave de Sol e Fá",
        "Estruturação de Acordes e Campo Harmônico",
        "Arranjo e Criação Musical"
      ],
      audience: "Todas as idades",
      modality: "Presencial (Individual)"
    }
  ],
  teachers: [
    {
      id: "gedeon",
      name: "Gedeon",
      fullName: "Professor Gedeon",
      avatar: "🎙️",
      imgUrl: "img/gedeon.jpg",
      tag: "Professor de Canto",
      instrument: "Canto & Técnica Vocal",
      bio: "Especialista em fisiologia vocal e performance cênica, o Professor Gedeon possui anos de dedicação ao ensino musical em Colatina. Sua metodologia une o rigor técnico (respiração, afinação e dicção) a uma abordagem acolhedora e inspiradora que respeita a identidade de cada voz.",
      quote: "Cantar é a expressão mais pura da nossa alma. Minha missão é ajudar você a encontrar e lapidar a sua própria voz.",
      specialties: [
        { title: "Técnica Vocal", desc: "Controle de apoio, agudos, graves e vibrato." },
        { title: "Saúde Vocal", desc: "Exercícios para aquecimento vocal seguro e longevidade." },
        { title: "Expressão Corporal", desc: "Como vencer a timidez e dominar o palco." }
      ]
    },
    {
      id: "beatriz",
      name: "Beatriz",
      fullName: "Professora Beatriz",
      avatar: "🎹",
      imgUrl: "img/beatriz.jpg",
      tag: "Professora de Teclado",
      instrument: "Teclado & Piano",
      bio: "Bacharel em Piano, a Professora Beatriz ensina com paciência e foco na independência das mãos, leitura de partituras de forma descomplicada e estruturação harmônica para teclado e piano clássico ou popular.",
      quote: "A música clássica e moderna se encontram nas teclas. Vamos tocar com sentimento e técnica.",
      specialties: [
        { title: "Partitura", desc: "Leitura e interpretação musical simplificada." },
        { title: "Independência", desc: "Exercícios de coordenação motora fina para teclado." },
        { title: "Piano Clássico", desc: "Postura, dedilhado e dinâmicas de expressão tradicionais." }
      ]
    },
    {
      id: "lucas",
      name: "Lucas",
      fullName: "Professor Lucas",
      avatar: "🎸",
      imgUrl: "img/lucas.jpg",
      tag: "Professor de Cordas",
      instrument: "Violão & Guitarra",
      bio: "Com ampla experiência em palcos de Colatina e região, o Professor Lucas ensina violão popular, violão clássico e guitarra elétrica, focando em improvisação, solos e no repertório preferido de cada aluno.",
      quote: "Toda grande música começa com um acorde simples. O segredo está na dedicação.",
      specialties: [
        { title: "Improvisação", desc: "Escalas pentatônicas, solos e formação de acordes." },
        { title: "Ritmos", desc: "Dedilhados, batidas e levadas para diversos estilos." },
        { title: "Guitarra Elétrica", desc: "Técnicas de palhetada alternada, legato e efeitos." }
      ]
    },
    {
      id: "sara",
      name: "Sara",
      fullName: "Professora Sara",
      avatar: "🥁",
      imgUrl: "img/sara.jpg",
      tag: "Professora Infantil",
      instrument: "Musicalização Infantil & Bateria",
      bio: "Pedagoga e especialista em educação musical, a Professora Sara conduz atividades lúdicas de iniciação ao ritmo, canto coletivo e reconhecimento de instrumentos para crianças de todas as idades.",
      quote: "A música é o primeiro idioma da imaginação da criança. Vamos brincar de fazer som!",
      specialties: [
        { title: "Jogos Musicais", desc: "Brincadeiras sonoras que ensinam teoria e ritmo de forma lúdica." },
        { title: "Iniciação Rítmica", desc: "Desenvolvimento motor e percepção musical primária." },
        { title: "Flauta Doce & Percussão", desc: "Introdução a instrumentos de sopro e percussão leve." }
      ]
    }
  ],
  enrollments: [],
  users: [
    { username: "admin", name: "Administrador Sonora", phone: "27999999999", password: "admin", role: "adm" }
  ]
};

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('site-header');
  const headerHeight = header ? header.offsetHeight : 80;

  // Fetch data from PHP backend
  fetch('data.php')
    .then(response => response.json())
    .then(data => {
      window.sonoraData = data;
      loadDynamicContent(data);
    })
    .catch(err => {
      console.error('Erro ao carregar dados do servidor:', err);
      // Fallback to default mock data if PHP is not running
      let localData = JSON.parse(localStorage.getItem('sonoraData'));
      if (!localData) {
        localData = defaultSiteData;
        localStorage.setItem('sonoraData', JSON.stringify(localData));
      }
      window.sonoraData = localData;
      loadDynamicContent(localData);
    });

  // Header dynamic opacity on scroll
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Smooth scroll for navigation links (local anchor links only)
  const navLinks = document.querySelectorAll('nav a, .hero-cta, .cta-button');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Mobile hamburger menu toggle functionality
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking navigation links
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close menu when clicking outside of the drawer or menu toggle
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
});

// Update authentication states in all headers
function updateHeaderAuth() {
  const currentUser = JSON.parse(localStorage.getItem('sonoraCurrentUser'));
  const headerContent = document.querySelector('.header-content');
  if (!headerContent) return;

  const navUl = headerContent.querySelector('.nav-menu ul');
  const ctaDiv = headerContent.querySelector('.cta');
  const mobileNavMenu = headerContent.querySelector('.nav-menu');

  // Find or create authentication link in navigation bar
  let authLi = navUl.querySelector('.auth-li');
  if (!authLi) {
    authLi = document.createElement('li');
    authLi.className = 'auth-li';
    navUl.appendChild(authLi);
  }

  if (currentUser) {
    if (currentUser.role === 'adm') {
      authLi.innerHTML = `<a href="admin.html" class="admin-link">Painel ADM</a>`;
      if (ctaDiv) {
        ctaDiv.innerHTML = `<a href="#" class="button logout-btn" style="background: #333; border: 1px solid #d95a11;">Sair</a>`;
      }
      const mobileCta = mobileNavMenu ? mobileNavMenu.querySelector('.cta-mobile') : null;
      if (mobileCta) {
        mobileCta.innerHTML = `<a href="#" class="button logout-btn" style="background: #333; border: 1px solid #d95a11;">Sair</a>`;
      }
    } else {
      authLi.innerHTML = `<span class="user-greeting" style="color: #a0a0a0; font-size: 0.9rem; margin-right: 0.5rem; font-weight: 600;">Olá, ${currentUser.name.split(' ')[0]}</span>`;
      if (ctaDiv) {
        ctaDiv.innerHTML = `<a href="#" class="button logout-btn" style="background: #333; border: 1px solid #d95a11; margin-left: 0.5rem;">Sair</a>`;
      }
      const mobileCta = mobileNavMenu ? mobileNavMenu.querySelector('.cta-mobile') : null;
      if (mobileCta) {
        mobileCta.innerHTML = `<a href="#" class="button logout-btn" style="background: #333; border: 1px solid #d95a11;">Sair</a>`;
      }
    }
  } else {
    authLi.innerHTML = ''; // Hide regular text link to avoid redundancy with the main button
    if (ctaDiv) {
      ctaDiv.innerHTML = `<a href="login.html" class="button enroll-btn">Entrar</a>`;
    }
    const mobileCta = mobileNavMenu ? mobileNavMenu.querySelector('.cta-mobile') : null;
    if (mobileCta) {
      mobileCta.innerHTML = `<a href="login.html" class="button enroll-btn">Entrar</a>`;
    }
  }

  // Bind logout action
  const logoutButtons = document.querySelectorAll('.logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('sonoraCurrentUser');
      alert('Sessão encerrada com sucesso.');
      window.location.href = 'index.html';
    });
  });
}

// Render dynamic homepage courses block
function renderHomepageCourses(data) {
  const cardsContainer = document.querySelector('#cursos .cards');
  if (!cardsContainer) return;

  if (!data) data = window.sonoraData;
  if (!data || !data.courses) return;

  cardsContainer.innerHTML = '';
  data.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="icon">${course.icon}</div>
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <button class="button enroll-course-btn" data-course-title="${course.title}" style="margin-top: 1.5rem; background: #d95a11; border: none; color: #fff; padding: 0.5rem 1rem; border-radius: 0.4rem; font-weight: 600; cursor: pointer; font-size: 0.9rem; transition: transform 0.2s ease; width: 100%;">Matricular-se</button>
    `;
    cardsContainer.appendChild(card);
  });

  bindEnrollButtons(data);
}

// Render dynamic course detailed grid in cursos.html
function renderDetailedCourses(data) {
  const container = document.querySelector('.courses-detailed-grid');
  if (!container) return;

  if (!data) data = window.sonoraData;
  if (!data || !data.courses) return;

  container.innerHTML = '';
  data.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-detail-card';

    let topicsLi = '';
    if (course.topics) {
      course.topics.forEach(topic => {
        topicsLi += `<li><span>✓</span> ${topic}</li>`;
      });
    }

    card.innerHTML = `
      <div class="course-icon-bg">${course.icon}</div>
      <h3>${course.title}</h3>
      <p class="course-desc">${course.desc}</p>
      <ul class="course-topics">
        ${topicsLi}
      </ul>
      <div class="course-meta">
        <span><strong>Público:</strong> ${course.audience || 'Geral'}</span>
        <span><strong>Modalidade:</strong> ${course.modality || 'Presencial'}</span>
      </div>
      <button class="button course-btn enroll-course-btn" data-course-title="${course.title}" style="width: 100%; border: none; cursor: pointer;">Quero me Matricular</button>
    `;
    container.appendChild(card);
  });

  bindEnrollButtons(data);
}

// Render dynamic teachers in professores.html
function renderTeachersPage(data) {
  const sidebarContainer = document.querySelector('.teacher-small-cards');
  const detailsPanel = document.querySelector('.teacher-details-panel');
  if (!sidebarContainer || !detailsPanel) return;

  if (!data) data = window.sonoraData;
  if (!data || !data.teachers) return;

  sidebarContainer.innerHTML = '';
  data.teachers.forEach((teacher, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const card = document.createElement('div');
    card.className = `teacher-small-card ${activeClass}`;
    card.setAttribute('data-teacher', teacher.id);
    card.innerHTML = `
      <div class="card-avatar">${teacher.avatar}</div>
      <div class="card-meta">
        <h4>${teacher.name}</h4>
        <p>${teacher.instrument}</p>
      </div>
    `;
    sidebarContainer.appendChild(card);
  });

  detailsPanel.innerHTML = '';
  data.teachers.forEach((teacher, index) => {
    const activeClass = index === 0 ? 'active' : '';

    let specsHtml = '';
    if (teacher.specialties) {
      teacher.specialties.forEach(spec => {
        specsHtml += `
          <div class="spec-card">
            <h5>${spec.title}</h5>
            <p>${spec.desc}</p>
          </div>
        `;
      });
    }

    const profile = document.createElement('div');
    profile.id = `prof-${teacher.id}`;
    profile.className = `teacher-detail-content ${activeClass}`;
    profile.innerHTML = `
      <div class="teacher-detail-flex">
        <div class="teacher-detail-img-container">
          <img src="${teacher.imgUrl || 'img/background.png'}" alt="Professor ${teacher.name}" class="teacher-detail-avatar" onerror="this.src='img/background.png';" />
        </div>
        <div class="teacher-detail-header-text">
          <span class="tag">${teacher.tag || 'Professor'}</span>
          <h2>${teacher.fullName || ('Professor ' + teacher.name)}</h2>
          <h3 class="teacher-instrument">${teacher.instrument}</h3>
        </div>
      </div>
      <p class="teacher-bio">${teacher.bio}</p>
      <blockquote class="teacher-quote">
        "${teacher.quote}"
      </blockquote>
      <h4 class="specs-heading">Especialidades de Ensino:</h4>
      <div class="specs-grid">
        ${specsHtml}
      </div>
      <div class="cta-teacher-box">
        <a href="${data.texts.whatsappLink}" class="button teacher-cta-btn" target="_blank" rel="noopener">Agendar Aula com ${teacher.name}</a>
      </div>
    `;
    detailsPanel.appendChild(profile);
  });

  bindTeacherSwitcher();
}

// Bind teacher item toggle interaction
function bindTeacherSwitcher() {
  const teacherCards = document.querySelectorAll('.teacher-small-card');
  const teacherDetails = document.querySelectorAll('.teacher-detail-content');

  if (teacherCards.length > 0 && teacherDetails.length > 0) {
    teacherCards.forEach(function (card) {
      card.addEventListener('click', function () {
        teacherCards.forEach(function (c) {
          c.classList.remove('active');
        });
        this.classList.add('active');

        teacherDetails.forEach(function (detail) {
          detail.classList.remove('active');
        });

        const teacherKey = this.getAttribute('data-teacher');
        const targetDetail = document.getElementById('prof-' + teacherKey);
        if (targetDetail) {
          targetDetail.classList.add('active');
        }
      });
    });
  }
}

// Handle Client interactive course enrollments
function bindEnrollButtons(data) {
  const enrollBtns = document.querySelectorAll('.enroll-course-btn');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const courseTitle = this.getAttribute('data-course-title');
      const currentUser = JSON.parse(localStorage.getItem('sonoraCurrentUser'));

      if (!currentUser) {
        alert('Por favor, faça login ou cadastre-se para se matricular no curso.');
        window.location.href = 'login.html';
        return;
      }

      if (currentUser.role === 'adm') {
        alert('Administradores não podem se matricular em cursos.');
        return;
      }

      if (!data) data = window.sonoraData;
      const alreadyEnrolled = data.enrollments.some(enc => enc.username === currentUser.username && enc.courseTitle === courseTitle);

      if (alreadyEnrolled) {
        alert(`Você já está matriculado no curso: ${courseTitle}`);
        return;
      }

      data.enrollments.push({
        username: currentUser.username,
        name: currentUser.name,
        phone: currentUser.phone || 'Não informado',
        courseTitle: courseTitle
      });

      fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          alert(`Matrícula solicitada com sucesso no curso: ${courseTitle}!`);
          window.open(data.texts.whatsappLink, '_blank');
        } else {
          alert('Erro ao enviar matrícula para o servidor.');
        }
      })
      .catch(err => {
        console.error(err);
        localStorage.setItem('sonoraData', JSON.stringify(data));
        alert(`Matrícula solicitada com sucesso no curso (salvo localmente): ${courseTitle}!`);
        window.open(data.texts.whatsappLink, '_blank');
      });
    });
  });
}

// Read site texts/data and inject it into the DOM
function loadDynamicContent(data) {
  if (!data) data = window.sonoraData;
  if (!data) return;

  // Update authentication links in headers
  updateHeaderAuth();

  // Dynamic layout texts
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.innerHTML = data.texts.heroTitle;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = data.texts.heroSubtitle;

  const aboutTitle = document.getElementById('about-title');
  if (aboutTitle) aboutTitle.textContent = data.texts.aboutTitle;

  const aboutHomepage = document.getElementById('about-text-homepage');
  if (aboutHomepage) aboutHomepage.textContent = data.texts.aboutText1;

  const aboutP2 = document.getElementById('about-text-p2');
  if (aboutP2) aboutP2.textContent = data.texts.aboutText2;

  const aboutP3 = document.getElementById('about-text-p3');
  if (aboutP3) aboutP3.textContent = data.texts.aboutText3;

  const contactAddress = document.getElementById('contact-address');
  if (contactAddress) contactAddress.innerHTML = data.texts.address.replace(', ', ',<br>');

  const contactHours = document.getElementById('contact-hours');
  if (contactHours) contactHours.textContent = data.texts.contactHours;

  const contactInsta = document.getElementById('contact-instagram');
  if (contactInsta) {
    contactInsta.textContent = data.texts.instagram;
    contactInsta.href = data.texts.instagramLink;
  }

  const contactWhatsapp = document.getElementById('contact-whatsapp');
  if (contactWhatsapp) contactWhatsapp.href = data.texts.whatsappLink;

  // Footer address & social links
  const footerContent = document.querySelector('.footer-content');
  if (footerContent) {
    const fAddress = footerContent.querySelector('p:nth-child(1)');
    if (fAddress) fAddress.innerHTML = `Endereço: ${data.texts.address}`;

    const fInstaLink = footerContent.querySelector('p:nth-child(2) a');
    if (fInstaLink) {
      fInstaLink.textContent = data.texts.instagram;
      fInstaLink.href = data.texts.instagramLink;
    }
  }

  // Render course & teacher items
  renderHomepageCourses(data);
  renderDetailedCourses(data);
  renderTeachersPage(data);
}
