/* Kiếm Võng Giang Hồ — Cẩm Nang Đa Trang (Genshin-Inspired Interactive Controller) */
(() => {
  'use strict';

  /* 1. Single Source of Truth: All 12 Focused Guide Pages */
  const GUIDE_ARTICLES = [
    {
      slug: 'the-gioi.html',
      cat: 'the-gioi',
      catLabel: 'Thế Giới & SimBot',
      tag: 'Cổng 3 Thế Giới',
      title: 'Chọn Thế Giới Phù Hợp: Phàm Giới · Linh Giới · Tiên Giới',
      desc: 'Phàm Giới chơi đồ Xanh–Tím giới hạn cấp 120; Linh Giới chinh phục trang bị Hoàng Kim; Tiên Giới mở thế giới mới với bộ animation đặc thù & hệ sinh thái SimBot riêng biệt.',
      img: './assets/world_tien_gioi.webp',
      featured: true,
      date: 'Cốt lõi'
    },
    {
      slug: 'cay-vang.html',
      cat: 'vang-datau',
      catLabel: 'Vàng & Dã Tẩu',
      tag: 'Kinh Tế',
      title: 'Cách Cày Vàng Không Khóa (KNB) Hiệu Quả Nhất & Quản Lý Tiền Trang',
      desc: 'Phân biệt Vàng Không Khóa (KNB), Vàng Khóa & Xu; tối ưu tỉ lệ 15% nổ 25K–50K KNB từ Dã Tẩu 4–5 Sao, chợ sạp SimBot & tích lũy mốc 1.000 Vạn Vàng mở Vũ Khí Thần.',
      img: './assets/guide_cay_vang.webp',
      featured: true,
      date: 'Mẹo cày'
    },
    {
      slug: 'hoa-son.html',
      cat: 'phoban-pk',
      catLabel: 'Phó Bản & PK',
      tag: 'Thưởng Khủng',
      title: 'Hệ Thống Nhiệm Vụ Cổ Địa Hoa Sơn (Map 51): Rèn Kiếm Thần Long & Mặt Nạ 3D',
      desc: 'Vượt 3 Khu Kết Giới, giải đố Kinh Dịch & Tứ Linh Long Mạch, nhận 100 Chuyển Sinh Đan, +200 Tiềm Năng, Kiếm Thần Long (6052) và Mặt Nạ Tiên Nhân/Tiên Tử cho phép giao dịch.',
      img: './assets/guide_hoason_chain3.webp',
      featured: true,
      date: 'Siêu thưởng'
    },
    {
      slug: 'da-tau.html',
      cat: 'vang-datau',
      catLabel: 'Vàng & Dã Tẩu',
      tag: 'Boss Giữa Chừng',
      title: 'Nhiệm Vụ Dã Tẩu: Boss Mốc Mỗi 10 NV, Boss 5 Sao & Phần Thưởng Bạch Kim 2 Dòng Thái Cực',
      desc: 'Hướng dẫn chi tiết chuỗi Dã Tẩu 1★–5★, cách gọi lại Boss Mốc Dã Tẩu Thủ Hộ (Map 26) rớt đồ VIP Bạch Kim Ám C10 Tiềm Năng 150 và 7 mốc tích lũy tới 3.000 NV.',
      img: './assets/guide_da_tau_boss.webp',
      date: 'Hướng dẫn'
    },
    {
      slug: 'tho-ren.html',
      cat: 'trang-bi',
      catLabel: 'Trang Bị & Rèn',
      tag: 'NPC Thợ Rèn',
      title: 'Hướng Dẫn NPC Thợ Rèn: 7 Tính Năng Đập Đồ, Truyền Thừa, Tẩy Luyện & Ghép Hoàng Kim',
      desc: 'Giải thích đơn giản 7 chức năng tại Thợ Rèn: mua vũ khí tân thủ, cường hóa +1 đến +15, chuyển cấp đập sang đồ mới, nâng tiềm năng không tụt, tẩy luyện dòng đẹp, ghép Hoàng Kim và nâng cấp Ấn / Trang Sức.',
      img: './assets/guide_thoren_live.webp',
      date: 'Toàn tập'
    },
    {
      slug: 'tho-ren-huyen-bi.html',
      cat: 'trang-bi',
      catLabel: 'Trang Bị & Rèn',
      tag: 'Thợ Rèn Huyền Bí',
      title: 'Hướng Dẫn NPC Thợ Rèn Huyền Bí: Hủy Khóa, Đổi Đồ, Rút Dòng Kết Tinh, Khảm Ngọc & Lò Bát Quái',
      desc: 'Giải thích dễ hiểu 5 tính năng của Thợ Rèn Huyền Bí: hủy khóa bán đồ, đổi vũ khí/ngựa/bộ đồ, rút dòng ngon sang đồ chính, đục lỗ Cực Phẩm nhân đôi cộng hưởng, tách ngọc 100%, Lò Bát Quái & đặt lại Ấn.',
      img: './assets/guide_forge_items_real.webp',
      date: 'Chuyên sâu'
    },
    {
      slug: 'cuong-hoa.html',
      cat: 'trang-bi',
      catLabel: 'Trang Bị & Rèn',
      tag: 'Thợ Rèn',
      title: 'Tóm Tắt Cường Hóa Trang Bị, 5 Loại Bùa Chống Tụt Cấp & Kế Thừa Cường Hóa',
      desc: 'Mốc tụt cấp từ +4 đến +15, cách chọn Thiên Duyên Thạch, Cát Tinh Thạch hay Phù Bảo Hộ và cách chuyển cấp cường hóa sang đồ mới bằng Truyền Thừa Thạch.',
      img: './assets/guide_thoren_live.webp',
      date: 'Tóm tắt'
    },
    {
      slug: 'tay-luyen.html',
      cat: 'trang-bi',
      catLabel: 'Trang Bị & Rèn',
      tag: 'Tẩy Luyện',
      title: 'Tóm Tắt Tẩy Luyện Dòng Đẹp (4 Loại Đá) & Nâng Tiềm Năng Không Tụt',
      desc: 'Cách khóa dòng ngon, dùng 4 bậc Đá Tẩy Luyện để giảm tới miễn phí 100% tiền Xu và nâng Tiềm Năng trang bị lên tối đa 150 không bao giờ tụt.',
      img: './assets/guide_xilian_ui_real.webp',
      date: 'Tóm tắt'
    },
    {
      slug: 'kham-tach-da.html',
      cat: 'trang-bi',
      catLabel: 'Trang Bị & Rèn',
      tag: 'Kho Đồ & Ngọc',
      title: 'Kho Đồ (F1), Rương Từ Xa, Tự Phân Giải & Mẹo Tách Đá Bảo Toàn 100%',
      desc: 'Mẹo quản lý túi đồ, cất Xu an toàn, bật tự phân giải khi treo máy, đục lỗ – nâng lỗ Cực Phẩm nhân đôi cộng hưởng và cách gỡ ngọc không mất một viên nào.',
      img: './assets/guide_forge_items_real.webp',
      date: 'Tóm tắt'
    },
    {
      slug: 'tong-kim.html',
      cat: 'phoban-pk',
      catLabel: 'Phó Bản & PK',
      tag: 'Chiến Trường',
      title: 'Hệ Thống Chiến Trường Tống Kim 25v25: 6 Quân Hàm, Boss Sa Mạc & Thưởng Top 1–3',
      desc: 'Lịch mở mỗi 30 phút (27p đánh + 3p nghỉ), cân lực ±10%, săn Boss Sa Mạc Chiến Thần (+200 điểm), cày Công Huân lên Nguyên Soái và hốt 1.000.000 Xu + 500K Vàng Khóa Top 1.',
      img: './assets/world_linh_gioi.webp',
      date: 'PvP 25v25'
    },
    {
      slug: 'simbot-pk.html',
      cat: 'the-gioi',
      catLabel: 'Thế Giới & SimBot',
      tag: 'AI & Ngũ Hành',
      title: 'Hệ Thống SimBot Đặc Thù Từng Thế Giới, PK, Tỷ Thí & Công Cụ Tra Kích Hoạt Ngũ Hành',
      desc: 'Khám phá SimBot riêng biệt ở Phàm/Linh/Tiên Giới, mời 3 SimBot theo mọi phó bản nhân ×4 rơi đồ, Bạn Tâm Giao (/tamsu), Nemesis, Tỷ Thí 5s/10s & tra kích hoạt đồ Ngũ Hành.',
      img: '../updates/assets/ingame_combat_hud.webp',
      date: 'Tương tác'
    },
    {
      slug: 'pho-ban.html',
      cat: 'phoban-pk',
      catLabel: 'Phó Bản & PK',
      tag: 'Hoạt Động',
      title: '5 Đại Phó Bản (Bán Nguyệt, Sa Mạc, Thông Thiên Tháp, Phong Lăng Độ), Phúc Lợi & Quà Hồi Hương',
      desc: 'Săn Mật Thư thú cưỡi bay Bạch Long (5570), leo Tháp tầng 25+ săn Tiềm Năng 90, lịch Thuyền Phong Lăng Độ 2h giờ lẻ, Phúc Lợi 3 Tab, Quà Hồi Hương ×2 EXP & Vòng Quay Thiên Cơ.',
      img: '../updates/assets/ingame_phuc_loi_7day.webp',
      date: 'Phúc lợi'
    }
  ];

  /* 2. Mobile Menu Toggle & Dropdown Accessibility */
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('.nav-drop-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.nav-item');
      document.querySelectorAll('.nav-item.open').forEach((el) => {
        if (el !== parent) el.classList.remove('open');
      });
      parent?.classList.toggle('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach((el) => el.classList.remove('open'));
    }
  });

  /* 3. Hub Directory: Featured 3-Card Deck + Category Filter + Horizontal Feed (index.html) */
  const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const featMount = document.getElementById('featured-deck');
  const feedMount = document.getElementById('hub-feed');
  const hubSearch = document.getElementById('hub-search');
  const catTabs = Array.from(document.querySelectorAll('[data-cat-tab]'));

  if (featMount) {
    featMount.innerHTML = GUIDE_ARTICLES.filter((a) => a.featured).map((a) => `
      <a class="feat-card" href="./${a.slug}">
        <div class="feat-thumb"><img src="${a.img}" alt="${a.title}" width="1280" height="720" loading="eager" /></div>
        <div class="feat-body">
          <h2>${a.title}</h2>
          <p>${a.desc}</p>
          <div class="feat-meta"><span>${a.catLabel}</span><span class="feat-tag">${a.tag} →</span></div>
        </div>
      </a>
    `).join('');
  }

  if (feedMount) {
    let activeCat = 'all';
    const renderFeed = () => {
      const q = fold((hubSearch?.value || '').trim());
      const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
      const rows = GUIDE_ARTICLES.filter((a) => {
        if (activeCat !== 'all' && a.cat !== activeCat) return false;
        if (!tokens.length) return true;
        const hay = fold(`${a.title} ${a.desc} ${a.catLabel} ${a.tag}`);
        return tokens.every((tk) => hay.includes(tk));
      });
      if (!rows.length) {
        feedMount.innerHTML = `<div class="feed-card" style="display:block;text-align:center;padding:28px;">Không tìm thấy bài hướng dẫn khớp. Hãy thử từ khóa ngắn như <code>cường hóa</code>, <code>tẩy luyện</code>, <code>dã tẩu</code>, <code>vàng</code>, <code>hoa sơn</code>, <code>tống kim</code>, <code>phàm giới</code>.</div>`;
        return;
      }
      feedMount.innerHTML = rows.map((a) => `
        <a class="feed-card" href="./${a.slug}">
          <div class="feed-thumb"><img src="${a.img}" alt="${a.title}" width="1280" height="720" loading="lazy" /></div>
          <div class="feed-content">
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <div class="feed-foot">
              <span class="feed-cat-pill">${a.catLabel} · ${a.tag}</span>
              <span>Đọc chi tiết →</span>
            </div>
          </div>
        </a>
      `).join('');
    };

    catTabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-cat-tab') || 'all';
        catTabs.forEach((b) => {
          const on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        renderFeed();
      });
    });
    hubSearch?.addEventListener('input', renderFeed);
    renderFeed();
  }

  /* 4. Interactive Full-Viewport 3-Worlds Switcher (the-gioi.html — Genshin Image 1!) */
  const worldStage = document.getElementById('world-stage');
  if (worldStage) {
    const WORLDS = {
      pham: {
        emblem: '凡',
        badge: 'CẢNH GIỚI NHẬP MÔN · CỔ ĐIỂN NGUYÊN BẢN',
        title: 'Phàm Giới',
        desc: 'Không gian Võ Lâm thuần khiết dành cho người chơi yêu nhịp độ cổ điển: chinh phục hành trình Lv.1 đến giới hạn cấp 120 hoàn toàn miễn phí với hệ thống trang bị Xanh – Tím kích hoạt Ngũ Hành, cường hóa vừa tay và kho Tu Vi Tích Trữ.',
        stats: ['Trang bị chủ lực: Xanh & Tím', 'Giới hạn cấp: Lv.120', 'Quái: 20% HP · 50% Công', 'SimBot: Tân thủ & Chợ thôn (50%)'],
        href: '#chi-tiet-pham',
        btnText: 'Xem Chi Tiết Phàm Giới'
      },
      linh: {
        emblem: '靈',
        badge: 'CẢNH GIỚI THẦN BINH · TRANG BỊ HOÀNG KIM',
        title: 'Linh Giới',
        desc: 'Thế giới dành riêng cho đại hiệp đam mê săn lùng và hoàn thiện bộ trang bị Hoàng Kim, Định Quốc, An Bang và Bạch Kim. Mở khóa trọn vẹn tinh hoa Thợ Rèn Thần Bí: đục 4 lỗ, mạ lỗ Ngũ Sắc, khảm/tách ngọc bảo toàn 100%, săn Boss Mốc Dã Tẩu và chiến trường Tống Kim 25v25.',
        stats: ['Trang bị chủ lực: Hoàng Kim · Bạch Kim', 'Full Thợ Rèn & Thợ Rèn Thần Bí', 'Quái: 50% HP · 75% Công', 'SimBot: Tổ đội Phó Bản & Nemesis (75%)'],
        href: '#chi-tiet-linh',
        btnText: 'Xem Chi Tiết Linh Giới'
      },
      tien: {
        emblem: '仙',
        badge: 'THẾ GIỚI HOÀN TOÀN MỚI · BỘ ANIMATION ĐẶC THÙ',
        title: 'Tiên Giới',
        desc: 'Bước vào cảnh giới hoàn toàn mới vượt khỏi khuôn mẫu võ lâm truyền thống: sở hữu bộ chuyển động & animation chiến đấu đặc thù (Kiếm Sĩ BnS, Thú Cưỡi Bay 3D Bạch Long, Hào Quang Thiên Cơ, Rig 55 xương & Tuyệt Kỹ Thiên Ngoại Nhất Chưởng), chinh phục Cổ Địa Hoa Sơn và Chuyển Sinh Lv.200.',
        stats: ['Bộ Animation & Chiêu Thức Đặc Thù', 'Cổ Địa Hoa Sơn 51 · Kiếm Thần Long', 'Quái & Boss: 100% Nguyên Bản', 'SimBot V4 Cao Thủ 10 Phái (100%)'],
        href: '#chi-tiet-tien',
        btnText: 'Xem Chi Tiết Tiên Giới'
      },
      simbot: {
        emblem: '俠',
        badge: 'CỘNG ĐỒNG AI ĐẶC THÙ TỪNG CẢNH GIỚI',
        title: 'SimBot Từng Thế Giới',
        desc: 'Mỗi thế giới vận hành một hệ sinh thái SimBot riêng biệt từ ngoại hình, trang bị, cách bày bán mặc cả cho tới trí tuệ chiến đấu: từ bạn đồng hành tân thủ ở Phàm Giới, đội kéo phó bản nhân ×4 rơi đồ ở Linh Giới cho tới Cao Thủ V4 đánh hội đồng & đại chiến Tống Kim ở Tiên Giới.',
        stats: ['Phàm Giới: 50% chỉ số · Sạp Xanh–Tím', 'Linh Giới: 75% chỉ số · Kéo Phó Bản ×4', 'Tiên Giới: 100% V4 · 10 Phái 23 Nhánh', 'Tương tác: Bạn Tâm Giao & Nemesis'],
        href: '#simbot-cac-the-gioi',
        btnText: 'Xem Hệ Thống SimBot'
      }
    };

    const bgs = Array.from(worldStage.querySelectorAll('.world-bg-layer'));
    const railBtns = Array.from(worldStage.querySelectorAll('[data-world-id]'));
    const elEmblem = document.getElementById('w-emblem');
    const elBadge = document.getElementById('w-badge');
    const elTitle = document.getElementById('w-title');
    const elDesc = document.getElementById('w-desc');
    const elStats = document.getElementById('w-stats');
    const elLink = document.getElementById('w-detail-link');
    const elBtnTxt = document.getElementById('w-detail-text');

    const activateWorld = (id) => {
      const w = WORLDS[id] || WORLDS.pham;
      bgs.forEach((img) => img.classList.toggle('active', img.getAttribute('data-bg-id') === id));
      railBtns.forEach((b) => {
        const on = b.getAttribute('data-world-id') === id;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      if (elEmblem) elEmblem.textContent = w.emblem;
      if (elBadge) elBadge.textContent = w.badge;
      if (elTitle) elTitle.textContent = w.title;
      if (elDesc) elDesc.textContent = w.desc;
      if (elStats) elStats.innerHTML = w.stats.map((s) => `<span class="world-stat-pill">${s}</span>`).join('');
      if (elLink) elLink.setAttribute('href', w.href);
      if (elBtnTxt) elBtnTxt.textContent = w.btnText;
    };

    railBtns.forEach((b) => b.addEventListener('click', () => activateWorld(b.getAttribute('data-world-id'))));
    const initParam = new URLSearchParams(window.location.search).get('realm');
    activateWorld(initParam && WORLDS[initParam] ? initParam : 'pham');
  }

  /* 5. Auto-Populate Right Sidebar "Bài Viết Liên Quan" on Every Detail Page */
  const relatedRail = document.getElementById('related-rail');
  if (relatedRail) {
    const curSlug = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const curItem = GUIDE_ARTICLES.find((a) => a.slug === curSlug);
    const siblings = GUIDE_ARTICLES.filter((a) => a.slug !== curSlug && curItem && a.cat === curItem.cat);
    const others = GUIDE_ARTICLES.filter((a) => a.slug !== curSlug && (!curItem || a.cat !== curItem.cat));
    const picks = [...siblings, ...others].slice(0, 6);
    relatedRail.innerHTML = picks.map((a) => `
      <a class="rail-card" href="./${a.slug}">
        <div class="rail-thumb"><img src="${a.img}" alt="${a.title}" width="320" height="200" loading="lazy" /></div>
        <div>
          <div class="rail-card-title">${a.title}</div>
          <div class="rail-card-tag">${a.catLabel} · ${a.tag}</div>
        </div>
      </a>
    `).join('');
  }

  /* 6. Click-to-Copy Chat Commands */
  document.querySelectorAll('.cmd-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy') || btn.textContent.trim();
      navigator.clipboard?.writeText(text).catch(() => {});
      const orig = btn.getAttribute('data-orig') || btn.innerHTML;
      btn.setAttribute('data-orig', orig);
      btn.classList.add('copied');
      btn.textContent = `Đã chép: ${text}`;
      window.setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 1400);
    });
  });

  /* 7. Interactive WuXing (Ngũ Hành) Activation Lookup (simbot-pk.html) */
  const wxRoot = document.getElementById('wuxing-calc');
  if (wxRoot) {
    const WUXING = {
      kim: { sects: 'Thiếu Lâm · Thiên Vương', khac: 'Hệ Mộc (+20% ST)', biKhac: 'Hệ Hỏa (-20% ST)', sinh: 'Thổ sinh Kim · Kim sinh Thủy',
        slots: [['Vũ Khí & Mũ', 'Hệ Kim', 'Dây Chuyền & Áo hệ Thổ'], ['Áo & Dây Chuyền', 'Hệ Thổ', 'Thắt Lưng & Nhẫn Dưới hệ Hỏa'], ['Thắt Lưng & Nhẫn Dưới', 'Hệ Hỏa', 'Hộ Uyển & Ngọc Bội hệ Mộc'], ['Hộ Uyển & Ngọc Bội', 'Hệ Mộc', 'Giày & Nhẫn Trên hệ Thủy'], ['Giày & Nhẫn Trên', 'Hệ Thủy', 'Vũ Khí & Mũ hệ Kim']] },
      moc: { sects: 'Đường Môn · Ngũ Độc', khac: 'Hệ Thổ (+20% ST)', biKhac: 'Hệ Kim (-20% ST)', sinh: 'Thủy sinh Mộc · Mộc sinh Hỏa',
        slots: [['Vũ Khí & Mũ', 'Hệ Mộc', 'Dây Chuyền & Áo hệ Thủy'], ['Áo & Dây Chuyền', 'Hệ Thủy', 'Thắt Lưng & Nhẫn Dưới hệ Kim'], ['Thắt Lưng & Nhẫn Dưới', 'Hệ Kim', 'Hộ Uyển & Ngọc Bội hệ Thổ'], ['Hộ Uyển & Ngọc Bội', 'Hệ Thổ', 'Giày & Nhẫn Trên hệ Hỏa'], ['Giày & Nhẫn Trên', 'Hệ Hỏa', 'Vũ Khí & Mũ hệ Mộc']] },
      thuy: { sects: 'Nga Mi · Thúy Yên', khac: 'Hệ Hỏa (+20% ST)', biKhac: 'Hệ Thổ (-20% ST)', sinh: 'Kim sinh Thủy · Thủy sinh Mộc',
        slots: [['Vũ Khí & Mũ', 'Hệ Thủy', 'Dây Chuyền & Áo hệ Kim'], ['Áo & Dây Chuyền', 'Hệ Kim', 'Thắt Lưng & Nhẫn Dưới hệ Thổ'], ['Thắt Lưng & Nhẫn Dưới', 'Hệ Thổ', 'Hộ Uyển & Ngọc Bội hệ Hỏa'], ['Hộ Uyển & Ngọc Bội', 'Hệ Hỏa', 'Giày & Nhẫn Trên hệ Mộc'], ['Giày & Nhẫn Trên', 'Hệ Mộc', 'Vũ Khí & Mũ hệ Thủy']] },
      hoa: { sects: 'Cái Bang · Thiên Nhẫn', khac: 'Hệ Kim (+20% ST)', biKhac: 'Hệ Thủy (-20% ST)', sinh: 'Mộc sinh Hỏa · Hỏa sinh Thổ',
        slots: [['Vũ Khí & Mũ', 'Hệ Hỏa', 'Dây Chuyền & Áo hệ Mộc'], ['Áo & Dây Chuyền', 'Hệ Mộc', 'Thắt Lưng & Nhẫn Dưới hệ Thủy'], ['Thắt Lưng & Nhẫn Dưới', 'Hệ Thủy', 'Hộ Uyển & Ngọc Bội hệ Kim'], ['Hộ Uyển & Ngọc Bội', 'Hệ Kim', 'Giày & Nhẫn Trên hệ Thổ'], ['Giày & Nhẫn Trên', 'Hệ Thổ', 'Vũ Khí & Mũ hệ Hỏa']] },
      tho: { sects: 'Võ Đang · Côn Lôn', khac: 'Hệ Thủy (+20% ST)', biKhac: 'Hệ Mộc (-20% ST)', sinh: 'Hỏa sinh Thổ · Thổ sinh Kim',
        slots: [['Vũ Khí & Mũ', 'Hệ Thổ', 'Dây Chuyền & Áo hệ Hỏa'], ['Áo & Dây Chuyền', 'Hệ Hỏa', 'Thắt Lưng & Nhẫn Dưới hệ Mộc'], ['Thắt Lưng & Nhẫn Dưới', 'Hệ Mộc', 'Hộ Uyển & Ngọc Bội hệ Thủy'], ['Hộ Uyển & Ngọc Bội', 'Hệ Thủy', 'Giày & Nhẫn Trên hệ Kim'], ['Giày & Nhẫn Trên', 'Hệ Kim', 'Vũ Khí & Mũ hệ Thổ']] }
    };
    const out = document.getElementById('wuxing-output');
    const btns = Array.from(wxRoot.querySelectorAll('[data-wx]'));
    const renderWx = (k) => {
      const d = WUXING[k] || WUXING.kim;
      btns.forEach((b) => { const on = b.getAttribute('data-wx') === k; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
      if (!out) return;
      out.innerHTML = `
        <div class="wx-summary">
          <div><span class="wx-k">Môn phái</span><strong>${d.sects}</strong></div>
          <div><span class="wx-k">Khắc chế mạnh</span><strong class="txt-jade">${d.khac}</strong></div>
          <div><span class="wx-k">Bị khắc chế</span><strong class="txt-red">${d.biKhac}</strong></div>
          <div><span class="wx-k">Vòng Tương Sinh</span><strong>${d.sinh}</strong></div>
        </div>
        <div class="table-wrap" style="margin-top:12px;"><table class="data-table">
          <thead><tr><th>Cặp Vị Trí Trang Bị</th><th>Hệ Nên Mang</th><th>Nguồn Kích Hoạt Dòng Ẩn (Đồ Xanh/Tím)</th></tr></thead>
          <tbody>${d.slots.map(([p, e, s]) => `<tr><td><strong>${p}</strong></td><td><code>${e}</code></td><td>Kích bằng ${s}</td></tr>`).join('')}</tbody>
        </table></div>`;
    };
    btns.forEach((b) => b.addEventListener('click', () => renderWx(b.getAttribute('data-wx'))));
    renderWx('kim');
  }

  /* 8. Accessible Lightbox for All Clickable Figures */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const lbCount = document.getElementById('lightbox-count');
  const figs = Array.from(document.querySelectorAll('.zoomable-fig'));
  let lbIdx = 0;
  const showLb = (i) => {
    if (!lb || !figs.length) return;
    lbIdx = (i + figs.length) % figs.length;
    const img = figs[lbIdx].querySelector('img');
    const cap = figs[lbIdx].querySelector('figcaption span');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lbCap.textContent = cap ? cap.textContent.trim() : img.alt;
    lbCount.textContent = `${lbIdx + 1} / ${figs.length}`;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => { if (!lb) return; lb.hidden = true; document.body.style.overflow = ''; };
  figs.forEach((f, i) => {
    f.setAttribute('tabindex', '0'); f.setAttribute('role', 'button');
    f.addEventListener('click', () => showLb(i));
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showLb(i); } });
  });
  if (lb) {
    lb.querySelector('.lb-close')?.addEventListener('click', closeLb);
    lb.querySelector('.lb-prev')?.addEventListener('click', () => showLb(lbIdx - 1));
    lb.querySelector('.lb-next')?.addEventListener('click', () => showLb(lbIdx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') showLb(lbIdx + 1);
      else if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    });
  }
})();
