/* =========================================================
   PasarKoneksi — script.js
   Semua interaksi: marketplace, ekosistem, simulasi transaksi,
   favorit, navbar, toast, dan scroll animation.
   Website ini 100% statis — tidak ada backend atau database eksternal.
   Semua data tersimpan di localStorage browser pengguna.
   ========================================================= */

(function () {
  'use strict';

  /* =====================================================
     0. NOMOR WHATSAPP PENJUAL (DUMMY)
     Ganti angka di bawah ini dengan nomor WhatsApp asli
     dalam format internasional tanpa tanda "+".
     Contoh: 6281234567890
     ===================================================== */
  const WHATSAPP_NUMBER = '628123456789';

  /* =====================================================
     1. DATA PRODUK
     Untuk menambah/mengubah produk, cukup edit array ini.
     Setiap objek WAJIB memiliki seluruh properti di bawah.
     ===================================================== */
  const PRODUCTS = [
    {
      id: 'p01',
      name: 'Kopi Lokal Soppeng',
      category: 'Minuman',
      price: 45000,
      rating: 4.8,
      location: 'Soppeng',
      seller: 'Kopi Soppeng',
      icon: '☕',
      desc: 'Biji kopi robusta pilihan hasil panen petani lokal, disangrai secara tradisional untuk aroma yang khas dan tahan lama.',
      img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p02',
      name: 'Keripik Pisang Renyah',
      category: 'Makanan',
      price: 18000,
      rating: 4.7,
      location: 'Soppeng',
      seller: 'Rumah Keripik',
      icon: '🍌',
      desc: 'Keripik pisang dengan tekstur renyah dan rasa manis alami, diolah tanpa bahan pengawet dari kebun lokal.',
      img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p03',
      name: 'Madu Hutan Asli',
      category: 'Makanan',
      price: 65000,
      rating: 4.9,
      location: 'Makassar',
      seller: 'Bumi Tani',
      icon: '🍯',
      desc: 'Madu murni hasil panen dari hutan lokal, kaya nutrisi dan diproses tanpa campuran gula tambahan.',
      img: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p04',
      name: 'Abon Sapi Spesial',
      category: 'Makanan',
      price: 55000,
      rating: 4.6,
      location: 'Soppeng',
      seller: 'Rasa Lokal',
      icon: '🥩',
      desc: 'Abon sapi dengan bumbu rempah khas Sulawesi Selatan, cocok sebagai lauk maupun isian roti.',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p05',
      name: 'Kue Tradisional Bugis',
      category: 'Makanan',
      price: 25000,
      rating: 4.8,
      location: 'Makassar',
      seller: 'Rasa Lokal',
      icon: '🍰',
      desc: 'Aneka kue tradisional khas Bugis-Makassar yang dibuat setiap hari menggunakan resep turun-temurun.',
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p06',
      name: 'Kerajinan Anyaman Bambu',
      category: 'Kerajinan',
      price: 85000,
      rating: 4.7,
      location: 'Soppeng',
      seller: 'Karya Tangan',
      icon: '🧺',
      desc: 'Kerajinan anyaman bambu buatan tangan pengrajin lokal, cocok untuk dekorasi maupun kebutuhan rumah tangga.',
      img: 'https://images.unsplash.com/photo-1528283194042-ba1f8ea6b5f1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p07',
      name: 'Tas Rajut Handmade',
      category: 'Fashion',
      price: 120000,
      rating: 4.8,
      location: 'Makassar',
      seller: 'Karya Tangan',
      icon: '👜',
      desc: 'Tas rajut buatan tangan dengan desain modern dan bahan berkualitas, diproduksi dalam jumlah terbatas.',
      img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p08',
      name: 'Batik Tulis Lokal',
      category: 'Fashion',
      price: 250000,
      rating: 4.9,
      location: 'Soppeng',
      seller: 'Karya Tangan',
      icon: '🧵',
      desc: 'Kain batik tulis dengan motif khas daerah, dikerjakan oleh perajin batik lokal secara manual.',
      img: 'https://images.unsplash.com/photo-1610030181087-540716f7d6f9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p09',
      name: 'Sayuran Segar Kebun',
      category: 'Pertanian',
      price: 15000,
      rating: 4.6,
      location: 'Soppeng',
      seller: 'Bumi Tani',
      icon: '🥬',
      desc: 'Aneka sayuran segar hasil panen langsung dari kebun petani lokal, dipetik pagi hari untuk kesegaran maksimal.',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p10',
      name: 'Telur Ayam Kampung',
      category: 'Peternakan',
      price: 32000,
      rating: 4.7,
      location: 'Soppeng',
      seller: 'Bumi Tani',
      icon: '🥚',
      desc: 'Telur ayam kampung asli dari peternakan lokal, dipelihara secara alami tanpa suntik hormon.',
      img: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p11',
      name: 'Kemeja Katun Lokal',
      category: 'Fashion',
      price: 95000,
      rating: 4.5,
      location: 'Makassar',
      seller: 'Rasa Lokal',
      icon: '👕',
      desc: 'Kemeja berbahan katun lokal yang nyaman dipakai sehari-hari, dijahit oleh konveksi rumahan setempat.',
      img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p12',
      name: 'Camilan UMKM Pedas Manis',
      category: 'Makanan',
      price: 20000,
      rating: 4.7,
      location: 'Makassar',
      seller: 'Rumah Keripik',
      icon: '🌶️',
      desc: 'Camilan pedas manis buatan UMKM lokal dengan cita rasa khas, cocok menemani waktu santai.',
      img: 'https://images.unsplash.com/photo-1599490659213-e0b5b6d8b4e9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  /* =====================================================
     2. DATA PROFIL PELAKU USAHA
     ===================================================== */
  const PROFILES = [
    {
      name: 'Kopi Soppeng',
      category: 'Minuman',
      location: 'Soppeng',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80',
      icon: '☕'
    },
    {
      name: 'Rumah Keripik',
      category: 'Makanan',
      location: 'Soppeng',
      img: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?auto=format&fit=crop&w=500&q=80',
      icon: '🍌'
    },
    {
      name: 'Rasa Lokal',
      category: 'Kuliner',
      location: 'Makassar',
      img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80',
      icon: '🍰'
    },
    {
      name: 'Bumi Tani',
      category: 'Pertanian',
      location: 'Soppeng',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80',
      icon: '🌾'
    }
  ];

  /* =====================================================
     3. DATA EKOSISTEM (penjelasan tiap node)
     ===================================================== */
  const ECOSYSTEM_INFO = {
    usaha: {
      title: 'Pelaku Usaha',
      desc: 'Menyediakan produk dan layanan untuk menjangkau pasar yang lebih luas.'
    },
    konsumen: {
      title: 'Konsumen',
      desc: 'Menemukan produk dan layanan dengan lebih mudah.'
    },
    platform: {
      title: 'Platform Digital',
      desc: 'Menjadi penghubung antara pelaku usaha dan konsumen.'
    },
    pembayaran: {
      title: 'Pembayaran Digital',
      desc: 'Mendukung transaksi yang cepat dan praktis.'
    },
    data: {
      title: 'Data & Informasi',
      desc: 'Membantu memahami kebutuhan dan aktivitas pasar.'
    },
    lembaga: {
      title: 'Lembaga / Mitra Keuangan',
      desc: 'Mendukung pembiayaan dan layanan keuangan bagi pelaku usaha di dalam ekosistem.'
    }
  };

  /* =====================================================
     4. DATA PELUANG USAHA
     ===================================================== */
  const OPPORTUNITY_INFO = {
    pasar: 'Digitalisasi membuka akses ke konsumen dari berbagai wilayah, tidak lagi terbatas pada pasar sekitar tempat usaha berada.',
    promosi: 'Media digital memungkinkan produk dipromosikan lebih luas dengan biaya yang lebih efisien dibanding cara konvensional.',
    transaksi: 'Pembayaran digital seperti QRIS membuat proses jual-beli menjadi lebih cepat, praktis, dan tercatat rapi.',
    data: 'Data transaksi dan aktivitas pasar dapat dimanfaatkan pelaku usaha untuk memahami tren dan kebutuhan konsumen.',
    kolaborasi: 'Ekosistem digital membuka ruang kolaborasi antar pelaku usaha, mitra logistik, dan lembaga keuangan.',
    inovasi: 'Kemudahan akses teknologi mendorong pelaku usaha untuk terus berinovasi mengembangkan produk dan layanannya.'
  };

  /* =====================================================
     STATE & STORAGE KEYS
     ===================================================== */
  const STORAGE_FAVORITES = 'pasarkoneksi_favorites';
  const STORAGE_HISTORY = 'pasarkoneksi_sim_history';

  let state = {
    search: '',
    category: 'Semua',
    favorites: loadFavorites(),
    activeProduct: null,
    simQty: 1
  };

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_FAVORITES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(state.favorites));
    } catch (e) { /* storage unavailable, ignore */ }
  }
  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveHistoryEntry(entry) {
    try {
      const history = loadHistory();
      history.unshift(entry);
      localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(0, 50)));
    } catch (e) { /* storage unavailable, ignore */ }
  }

  function formatRupiah(num) {
    return 'Rp' + num.toLocaleString('id-ID');
  }

  /* =====================================================
     TOAST NOTIFICATION
     ===================================================== */
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 2900);
  }

  /* =====================================================
     IMAGE FALLBACK HANDLER
     ===================================================== */
  window.handleImgError = function (imgEl) {
    const wrap = imgEl.closest('.media-frame');
    if (wrap) wrap.classList.add('img-error');
  };

  /* =====================================================
     NAVBAR: hamburger + scroll spy + smooth active state
     ===================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  hamburgerBtn.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-nav]'));

  function updateActiveNav() {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(link => {
      const match = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', debounce(updateActiveNav, 80));
  updateActiveNav();

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* =====================================================
     PRODUCT RENDERING
     ===================================================== */
  const productGrid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const filterChips = document.getElementById('filterChips');

  function renderProducts() {
    const term = state.search.trim().toLowerCase();
    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = state.category === 'Semua' || p.category === state.category;
      const matchesSearch = !term ||
        p.name.toLowerCase().includes(term) ||
        p.seller.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = '';
    emptyState.hidden = filtered.length !== 0;

    filtered.forEach(p => {
      const isFav = state.favorites.includes(p.id);
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="media-frame product-image" data-icon="${p.icon}">
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="handleImgError(this)">
        </div>
        <div class="product-card-body">
          <span class="product-cat-badge">${p.category}</span>
          <span class="product-name">${p.name}</span>
          <span class="product-rating">★★★★★ <span>${p.rating.toFixed(1)}</span></span>
          <span class="product-price">${formatRupiah(p.price)}</span>
          <span class="product-location">📍 ${p.location}</span>
          <span class="product-seller">${p.seller}</span>
          <div class="product-card-footer">
            <button class="product-detail-btn" data-detail="${p.id}">Lihat Detail</button>
            <button class="product-fav-btn ${isFav ? 'is-active' : ''}" data-fav="${p.id}" aria-label="Simpan ke favorit">${isFav ? '♥' : '♡'}</button>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  filterChips.addEventListener('click', function (e) {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    filterChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    state.category = chip.dataset.filter;
    renderProducts();
  });

  searchInput.addEventListener('input', debounce(function () {
    state.search = searchInput.value;
    renderProducts();
  }, 200));

  productGrid.addEventListener('click', function (e) {
    const detailBtn = e.target.closest('[data-detail]');
    const favBtn = e.target.closest('[data-fav]');
    if (detailBtn) {
      openProductModal(detailBtn.dataset.detail);
    } else if (favBtn) {
      toggleFavorite(favBtn.dataset.fav);
    }
  });

  function toggleFavorite(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const idx = state.favorites.indexOf(id);
    if (idx === -1) {
      state.favorites.push(id);
      showToast(`"${product.name}" ditambahkan ke favorit`);
    } else {
      state.favorites.splice(idx, 1);
      showToast(`"${product.name}" dihapus dari favorit`);
    }
    saveFavorites();
    renderProducts();
    if (state.activeProduct === id) syncModalFavoriteButton(id);
  }

  /* =====================================================
     PRODUCT DETAIL MODAL
     ===================================================== */
  const productModal = document.getElementById('productModal');
  const modalImageWrap = document.getElementById('modalImageWrap');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalRating = document.getElementById('modalRating');
  const modalPrice = document.getElementById('modalPrice');
  const modalLocation = document.getElementById('modalLocation');
  const modalSeller = document.getElementById('modalSeller');
  const modalDesc = document.getElementById('modalDesc');
  const modalWhatsapp = document.getElementById('modalWhatsapp');
  const modalFavorite = document.getElementById('modalFavorite');
  const modalSimulate = document.getElementById('modalSimulate');
  const closeProductModal = document.getElementById('closeProductModal');

  function openProductModal(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    state.activeProduct = id;

    modalImageWrap.classList.remove('img-error');
    modalImageWrap.dataset.icon = p.icon;
    modalImage.src = p.img;
    modalImage.alt = p.name;
    modalCategory.textContent = p.category;
    modalTitle.textContent = p.name;
    modalRating.innerHTML = `★★★★★ ${p.rating.toFixed(1)}`;
    modalPrice.textContent = formatRupiah(p.price);
    modalLocation.textContent = `📍 ${p.location}`;
    modalSeller.textContent = p.seller;
    modalDesc.textContent = p.desc;
    modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo, saya tertarik dengan produk "' + p.name + '" di PasarKoneksi.')}`;
    syncModalFavoriteButton(id);

    openModal(productModal);
  }

  function syncModalFavoriteButton(id) {
    const isFav = state.favorites.includes(id);
    modalFavorite.textContent = isFav ? '♥ Tersimpan' : '♡ Simpan';
    modalFavorite.classList.toggle('is-active', isFav);
  }

  modalFavorite.addEventListener('click', function () {
    if (state.activeProduct) toggleFavorite(state.activeProduct);
  });

  modalSimulate.addEventListener('click', function () {
    if (!state.activeProduct) return;
    closeModal(productModal);
    openSimModal(state.activeProduct);
  });

  closeProductModal.addEventListener('click', () => closeModal(productModal));

  /* =====================================================
     SIMULASI TRANSAKSI MODAL
     ===================================================== */
  const simModal = document.getElementById('simModal');
  const simFormView = document.getElementById('simFormView');
  const simSuccessView = document.getElementById('simSuccessView');
  const simProductEl = document.getElementById('simProduct');
  const simPriceEl = document.getElementById('simPrice');
  const simQtyEl = document.getElementById('simQty');
  const simTotalEl = document.getElementById('simTotal');
  const simQtyMinus = document.getElementById('simQtyMinus');
  const simQtyPlus = document.getElementById('simQtyPlus');
  const simConfirm = document.getElementById('simConfirm');
  const simDone = document.getElementById('simDone');
  const closeSimModal = document.getElementById('closeSimModal');

  let simProductRef = null;

  function openSimModal(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    simProductRef = p;
    state.simQty = 1;

    simFormView.hidden = false;
    simSuccessView.hidden = true;

    simProductEl.textContent = p.name;
    simPriceEl.textContent = formatRupiah(p.price);
    updateSimTotal();

    openModal(simModal);
  }

  function updateSimTotal() {
    simQtyEl.textContent = state.simQty;
    simTotalEl.textContent = formatRupiah(simProductRef.price * state.simQty);
  }

  simQtyMinus.addEventListener('click', function () {
    if (state.simQty > 1) {
      state.simQty -= 1;
      updateSimTotal();
    }
  });
  simQtyPlus.addEventListener('click', function () {
    if (state.simQty < 99) {
      state.simQty += 1;
      updateSimTotal();
    }
  });

  simConfirm.addEventListener('click', function () {
    if (!simProductRef) return;
    const entry = {
      product: simProductRef.name,
      qty: state.simQty,
      total: simProductRef.price * state.simQty,
      date: new Date().toISOString()
    };
    saveHistoryEntry(entry);
    simFormView.hidden = true;
    simSuccessView.hidden = false;
    showToast('Simulasi transaksi berhasil disimpan');
  });

  simDone.addEventListener('click', function () {
    closeModal(simModal);
  });
  closeSimModal.addEventListener('click', () => closeModal(simModal));

  /* =====================================================
     MODAL HELPERS (generic open/close, ESC, backdrop click)
     ===================================================== */
  function openModal(modalEl) {
    modalEl.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modalEl) {
    modalEl.hidden = true;
    document.body.style.overflow = '';
  }
  [productModal, simModal].forEach(modalEl => {
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) closeModal(modalEl);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!productModal.hidden) closeModal(productModal);
      if (!simModal.hidden) closeModal(simModal);
    }
  });

  /* =====================================================
     EKOSISTEM DIAGRAM
     ===================================================== */
  const ecoNodes = document.querySelectorAll('.eco-node');
  const ecoInfoTitle = document.getElementById('ecoInfoTitle');
  const ecoInfoDesc = document.getElementById('ecoInfoDesc');

  function activateEcoNode(nodeKey) {
    ecoNodes.forEach(n => n.classList.toggle('active', n.dataset.node === nodeKey));
    const info = ECOSYSTEM_INFO[nodeKey];
    if (info) {
      ecoInfoTitle.textContent = info.title;
      ecoInfoDesc.textContent = info.desc;
    }
  }

  ecoNodes.forEach(node => {
    node.addEventListener('click', () => activateEcoNode(node.dataset.node));
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateEcoNode(node.dataset.node);
      }
    });
  });

  /* =====================================================
     PELUANG USAHA (opportunity items)
     ===================================================== */
  const opportunityGrid = document.getElementById('opportunityGrid');
  const opportunityDetail = document.getElementById('opportunityDetail');

  opportunityGrid.addEventListener('click', function (e) {
    const item = e.target.closest('.opportunity-item');
    if (!item) return;
    opportunityGrid.querySelectorAll('.opportunity-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    const key = item.dataset.opp;
    opportunityDetail.textContent = OPPORTUNITY_INFO[key] || '';
  });

  /* =====================================================
     PROFIL PELAKU USAHA
     ===================================================== */
  const profileGrid = document.getElementById('profileGrid');
  function renderProfiles() {
    profileGrid.innerHTML = PROFILES.map(profile => `
      <article class="profile-card">
        <div class="media-frame profile-image" data-icon="${profile.icon}">
          <img src="${profile.img}" alt="${profile.name}" loading="lazy" onerror="handleImgError(this)">
        </div>
        <div class="profile-body">
          <p class="profile-name">${profile.name}</p>
          <p class="profile-meta">${profile.category} • 📍 ${profile.location}</p>
        </div>
      </article>
    `).join('');
  }

  /* =====================================================
     SCROLL REVEAL ANIMATION (ringan, satu kali per elemen)
     ===================================================== */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.challenge-card, .stat-card, .journey-step, .impact-card, .opportunity-item, .profile-card, .tips-list li'
    );
    targets.forEach(el => el.classList.add('reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(el => observer.observe(el));
  }

  /* =====================================================
     INIT
     ===================================================== */
  function init() {
    renderProducts();
    renderProfiles();
    initScrollReveal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
