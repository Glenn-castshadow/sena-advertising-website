// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Active nav link by current filename
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Team bio modal
(function () {
  const modal = document.getElementById('bio-modal');
  if (!modal) return;

  const bios = {
    scott: {
      name: 'Scott Sena',
      role: 'President',
      photo: 'images/scott_500px_round-tan.png',
      paragraphs: [
        'Before founding Sena Advertising, Scott served as the California Creative Director for GTB, a division of J. Walter Thompson, where he spent 11 years developing and executing creative strategies for regional Ford Dealer groups, managing billings exceeding $58 million.',
        'Prior to his time at JWT, Scott was the Executive Creative Director at The Intermark Group, one of the largest agencies in the Southeast. There, he played a key role in driving the agency\'s growth from $16 million to over $100 million in annual billings. His leadership helped shape major campaigns for clients such as Southeast Toyota, Gulf States Toyota, Office Furniture USA, St. Vincent\'s Hospital, Alabama Power, and Chevrolet Dealer Groups.',
        'With deep expertise in advertising strategy and a specialization in broadcast production, Scott has earned numerous national and regional awards for advertising excellence. His achievements have been featured in various trade publications, including a cover story in ADWEEK Magazine.',
        'Throughout his career, Scott has brought creative vision to life, conceptualizing, writing, and directing campaigns featuring renowned celebrities and athletes such as Trisha Yearwood, Ken Griffey Jr., Darrell Waltrip, Cal Ripken Jr., Trace Adkins, Mark Brunell, Madison Bumgarner, and many more.',
        'A dynamic and engaging communicator, Scott is widely recognized for his enthusiastic live presentation skills. His passion for storytelling has led him to numerous motivational speaking engagements and college lectures, where he inspires audiences with his expertise and energy.',
        'Outside of his professional work, Scott channels his creativity as a professional voice talent, lending his voice to hundreds of TV and radio spots, as well as digital content. His curiosity and dedication to lifelong learning have also led him to the world of wine. While he enjoys studying oenology and viticulture, he firmly believes that the best education comes through hands-on experience — one glass at a time.',
        'Originally from the Land of Enchantment — Albuquerque, N.M. — Scott now calls Carlsbad, California home, where he continues the cherished tradition of crafting his legendary New Mexico red and green chile enchiladas.'
      ]
    },
    tom: {
      name: 'Tom Signaigo',
      role: 'Director of Operations',
      photo: 'images/tom_500px_round-tan.png',
      paragraphs: [
        'For over 30 years, Tom has been a driving force in the video production and advertising industries, leading Satellite Video Productions in San Diego as Owner and President.',
        'A seasoned expert in production, direction, and creative strategy, Tom has built a reputation for delivering high-impact advertising campaigns and compelling visual storytelling. His expertise has played a critical role in shaping the success of top brands, including the San Diego Padres, Cox Communications, Jerome\'s Furniture, and Petco.',
        'Beyond advertising, Tom has directed and produced influential programming for industry giants such as Guthy-Renker, Tony Robbins, and SPAWAR, reinforcing Satellite Video\'s status as a leader in the field.',
        'Tom\'s deep understanding of production workflows, creative direction, and brand messaging has allowed him to build a team of highly skilled professionals — including producers, directors, editors, and motion graphic artists — who share his commitment to excellence.',
        'A recognized expert in working with high-profile talent, Tom has collaborated closely with some of the biggest names in sports and entertainment. He has directed and produced projects featuring Tony Robbins, Phil Mickelson, Tony Gwynn, Mike Rowe, Reggie Jackson, Dick Enberg, and LaDainian Tomlinson.',
        'Tom\'s expertise extends beyond video production; his strategic vision has contributed to the success of numerous marketing campaigns, helping brands connect with audiences in meaningful ways. As a principal partner and Senior Operations Manager at Sena Advertising, he applies his vast industry knowledge to develop innovative marketing strategies that drive brand growth and engagement.',
        'Originally from Michigan, Tom is a passionate University of Michigan Wolverines fan, though as a proud alumnus of San Diego State University, he also considers himself an "Aztec for Life." Outside of his professional endeavors, he and his wife, Lora, enjoy traveling, exploring fine wines, and embracing life\'s best experiences.'
      ]
    },
    glenn: {
      name: 'Glenn Capps',
      role: 'Lead Designer / Flame Artist',
      photo: 'images/glenn_500px_round-tan.png',
      paragraphs: [
        'With over 30 years of experience in graphic and motion design, Glenn has dedicated his career to mastering every aspect of print, video, and digital production. As the Senior Motion Graphics Designer and Flame Artist for Satellite, Inc., he has built an impressive portfolio of award-winning commercials and creative projects for clients worldwide.',
        'Glenn\'s journey began at San Diego State University, where he studied Graphic Design before launching his own print design firm. Specializing in smart visual design and advanced photo editing, his firm became known for developing impactful brand identities and sales materials for manufacturers and retail sales channels.',
        'His ability to adapt to emerging technologies and evolving market trends has allowed him to craft visually stunning campaigns that leave a lasting impression. Recognizing the power of collaboration, Glenn built strategic partnerships with other agencies to create comprehensive identity packages and advertising campaigns for industries ranging from action sports to real estate development.',
        'His passion for innovation led him to establish two additional firms focused on printing and design, where he refined workflows, developed compelling packaging concepts, and created advertising campaigns that resonated with both local startups and global enterprises. His dedication to excellence has earned him numerous regional and international awards.',
        'Driven by his fascination with digital animation and 3D design, Glenn transitioned into video and post-production, where he continues his creative exploration at Satellite Video Productions. His expertise in motion graphics, visual effects, and post-production allows him to craft dynamic content that captivates audiences and strengthens brand storytelling.',
        'Beyond his professional achievements, Glenn is just as passionate about his personal creative pursuits. He enjoys electronic music production, chocolate making, and fine woodworking. His curiosity extends to HD aerial drone photography, 3D printing, and refining his appreciation for single malt Scotch. Whether in the studio or in his personal endeavors, Glenn\'s commitment to creativity, craftsmanship, and innovation remains at the core of everything he does.'
      ]
    }
  };

  const modalPhoto = modal.querySelector('.bio-modal-photo');
  const modalName  = modal.querySelector('.bio-modal-name');
  const modalRole  = modal.querySelector('.bio-modal-role');
  const modalBody  = modal.querySelector('.bio-modal-body');

  function openBio(key) {
    const data = bios[key];
    if (!data) return;
    modalPhoto.src = data.photo;
    modalPhoto.alt = data.name;
    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalBody.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeBio() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 280);
  }

  document.querySelectorAll('.team-card[data-person]').forEach(card => {
    card.addEventListener('click', () => openBio(card.dataset.person));
  });

  modal.querySelector('.bio-modal-close').addEventListener('click', closeBio);
  modal.addEventListener('click', e => { if (e.target === modal) closeBio(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBio(); });
})();

// Lightbox for project gallery images
(function () {
  const imgs = document.querySelectorAll('.project-imgs img');
  if (!imgs.length) return;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close image">&times;</button>' +
    '<img class="lightbox-img" src="" alt="">';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lightbox-img');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      lbImg.src = '';
      document.body.style.overflow = '';
    }, 280);
  }

  imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

// Contact form — submitted natively to Formspree (redirect handled by _next)
