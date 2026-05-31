(function () {
  var cfg = window.SEO_CONFIG || {
    siteUrl: 'https://studiosusino.it',
    siteName: 'Studio Ecografico Dr. Salvatore Susino',
    defaultImage: 'https://studiosusino.it/images/hero-studio.jpg',
  };

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var esame = (window.ESAMI || []).find(function (e) {
    return e.id === id;
  });
  var info = (window.ESAMI_PAZIENTE || {})[id] || {};

  function setMeta(name, content, isProperty) {
    if (!content) return;
    var sel = isProperty
      ? 'meta[property="' + name + '"]'
      : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    if (!el) {
      el = document.createElement('meta');
      if (isProperty) el.setAttribute('property', name);
      else el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLink(rel, href) {
    if (!href) return;
    var el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  function injectJsonLd(data) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  if (!esame) {
    document.title = 'Esame non trovato | ' + cfg.siteName;
    setMeta('robots', 'noindex, follow');
    setMeta('description', 'Pagina esame non trovata. Torna all’elenco ecografie.');
    return;
  }

  var sintesi =
    info.sintesi || esame.descrizione.split('.')[0].trim() + '.';
  var title = esame.nome + ' a Pozzallo (RG) | Dr. Susino';
  if (title.length > 60) {
    title = esame.nome + ' | Pozzallo (RG)';
  }
  var description = (sintesi + ' Prenota online o al telefono. Studio a Pozzallo (RG).').slice(
    0,
    160
  );
  var canonical = cfg.siteUrl + '/esame.html?id=' + encodeURIComponent(esame.id);
  var image = cfg.defaultImage;

  document.title = title;
  setMeta('description', description);
  setMeta('robots', 'index, follow, max-image-preview:large');
  setLink('canonical', canonical);

  setMeta('og:type', 'article', true);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', canonical, true);
  setMeta('og:image', image, true);
  setMeta('og:site_name', cfg.siteName, true);
  setMeta('og:locale', 'it_IT', true);

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: cfg.siteUrl + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ecografie',
        item: cfg.siteUrl + '/ecografie.html',
      },
      { '@type': 'ListItem', position: 3, name: esame.nome, item: canonical },
    ],
  });

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: esame.nome,
    description: sintesi,
    url: canonical,
    availableAtOrFrom: {
      '@type': 'MedicalBusiness',
      name: cfg.siteName,
      telephone: ['+39-0932-954441', '+39-351-3746102'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: "Via dell'Arno, 34",
        postalCode: '97016',
        addressLocality: 'Pozzallo',
        addressRegion: 'RG',
        addressCountry: 'IT',
      },
    },
  });
})();
