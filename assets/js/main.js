/**
 * Site for Education Foundation of Bridgewater-Raritan
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Inline article data for modal popups on news.html
   * Keys correspond to the data-article attributes on the Read more links
   */
  const ARTICLES = {
    'mix-mingle': {
      title: 'Mix & Mingle for Education',
      author: 'Bob Builder',
      published: 'February 6, 2025',
      updated: 'February 28, 2025',
      featuredImage: 'assets/img/education/education-1.webp',
      authorImage: 'assets/img/person/person-m-6.webp',
      category: ['News'],
      content: `
        <p class="lead">Welcome to Mix & Mingle for Education! Join us at Dolce Bene for a fun-filled evening of networking and fundraising for a great cause. Whether you’re a teacher, parent, or education enthusiast, this is the perfect opportunity to meet new people and make a difference. Don’t miss out on this exciting event – mark your calendar and get ready to mix, mingle, and make an impact!</p>

        <p>Thank you to everyone who made this event a success!</p>

        <h4>Details</h4>
        <ul>
          <li><strong>When:</strong> February 27, 2025</li>
          <li><strong>Time:</strong> 6:00 pm – 9:00 pm</li>
          <li><strong>Where:</strong> Dolce Bene Ristorante, Martinsville</li>
          <li>Only 70 tickets will be sold so tell a friend and act quickly</li>
        </ul>

        <h4>Evening Agenda</h4>
        <ul>
          <li>Authentic Italian meal by Dolce Bene</li>
          <li>Red and white Italian wines poured to complement the meal</li>
          <li>First set of 5 free tickets per person for our valuable gift basket auction</li>
          <li>Free door prize ticket for chance to win carefully crafted Italian gift basket</li>
          <li>Mingle with the district community all in support of your Education Foundation Mini Grants</li>
        </ul>
      `
    },
    'mini-grants': {
      title: 'Mini Grants Money Tree',
      author: 'Bob Builder',
      published: 'February 8, 2024',
      updated: 'February 6, 2025',
      featuredImage: 'assets/img/education/activities-1.webp',
      authorImage: 'assets/img/person/person-f-13.webp',
      category: ['News', 'Mini Grants'],
      content: `
        <p>To be considered for funding through the Mini-Grant program, projects must demonstrate strategies that provide for innovative and creative educational opportunities to Bridgewater-Raritan District students. Grants are not intended to be used to conduct normal school curriculum and funding must otherwise not be available through traditional sources.</p>

        <h4>Apply for a Mini Grant</h4>
        <p>Grant applications may be submitted by Bridgewater-Raritan School District Teachers, Specialists, School Administrators and other Staff. The Foundation for Creative Education of Bridgewater-Raritan requires that all Mini-Grant applications have the approval of the building principal prior to submission.</p>
      `
    }
  };

  // Handler: open article modal and populate content
  document.querySelectorAll('.read-more').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const key = this.getAttribute('data-article');
      const data = ARTICLES[key];
      if (!data) return;

  // Build a fuller article HTML structure (closer to news-details.html)
  const html = [];
  html.push('<section id="blog-details" class="blog-details section">');
  html.push('  <div class="modal-article">');
  html.push('    <article class="article">');
  html.push('      <div class="article-header">');
  html.push('        <div class="meta-categories">' + data.category.map(c => ('<a href="#" class="category">' + c + '</a>')).join(' ') + '</div>');
  html.push('        <h1 class="title">' + data.title + '</h1>');
  html.push('        <div class="article-meta">');
  html.push('          <div class="author d-flex align-items-center">');
  html.push('            <img src="' + data.authorImage + '" alt="Author" class="author-img">');
  html.push('            <div class="author-info">');
  html.push('              <h4>' + data.author + '</h4>');
  html.push('            </div>');
  html.push('          </div>');
  html.push('          <div class="post-info">');
  html.push('            <span><i class="bi bi-calendar4-week"></i> ' + data.published + '</span>');
  if (data.updated) html.push('            <span class="ms-2"><i class="bi bi-arrow-repeat"></i> Updated ' + data.updated + '</span>');
  html.push('          </div>');
  html.push('        </div>');
  html.push('      </div>');

  // Featured image directly after header so the title and meta appear above it
  html.push('      <div class="article-featured-image" data-aos="zoom-in">');
  html.push('        <img src="' + data.featuredImage + '" alt="' + data.title + '" class="img-fluid">');
  html.push('      </div>');

  html.push('      <div class="article-wrapper">');
  html.push('        <div class="article-content">' + data.content + '</div>');

  // no article footer (removed as requested)
  html.push('      </div>');
  html.push('    </article>');
  html.push('  </div>');
  html.push('</section>');

  // set modal title and content
  const titleEl = document.getElementById('newsModalTitle');
  if (titleEl) titleEl.textContent = data.title;
  document.getElementById('modal-article-content').innerHTML = html.join('\n');

  // populate footer CTA for mini-grants article (move apply here)
  const footerEl = document.getElementById('modal-article-footer');
  if (footerEl) {
    if (key === 'mini-grants') {
      footerEl.innerHTML = '<div class="w-100 d-flex justify-content-end"><a href="grants/index.html" class="btn btn-primary">Apply for a Mini Grant</a></div>';
    } else {
      footerEl.innerHTML = '';
    }
  }

  // Use Bootstrap Modal to show
  const modalEl = document.getElementById('newsModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
    });
  });

})();