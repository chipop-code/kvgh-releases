/* Kiếm Võng Giang Hồ — Cẩm Nang Tân Thủ Interactive Controller */
(() => {
  'use strict';

  /* 1. Unified Search Index across all 5 Guide Pages */
  const SEARCH_INDEX = [
    { t: 'Bản đồ HUD & Phím tắt điều khiển (F1, F2, M, Q-V, Z, T, Space)', p: 'index.html#phim-tat', c: 'Tổng Quan', k: 'phim tat dieu khien hud balo f1 f2 ngua khinh cong auto z' },
    { t: 'Lộ trình Tân Thủ 4 bước từ Lv.1 tới Lv.120 & Chuyển Sinh', p: 'index.html#lo-trinh', c: 'Tổng Quan', k: 'lo trinh tan thu 11 buoc van moc linh thon bat dau moi choi' },
    { t: 'Câu hỏi thường gặp (FAQ) cho người mới', p: 'index.html#faq', c: 'Tổng Quan', k: 'faq hoi dap loi thuong gap ban do ket duong' },
    { t: 'Hành Trang (F1), Rương Thủ Khố Từ Xa & Máy Phân Giải Tự Động', p: 'trang-bi.html#kho-do', c: 'Trang Bị', k: 'kho do hanh trang balo ruong thu kho tu xa phan giai tu dong ghep chong' },
    { t: 'Cường Hóa Trang Bị & 5 Loại Bùa Chống Tụt Cấp (203–214)', p: 'trang-bi.html#cuong-hoa', c: 'Trang Bị', k: 'cuong hoa dap do tut cap thien duyen thach cat tinh phu bao ho 210 214' },
    { t: 'Kế Thừa Cường Hóa (Truyền Thừa Thạch 220, phôi >= +6)', p: 'trang-bi.html#ke-thua', c: 'Trang Bị', k: 'ke thua truyen thua cuong hoa 220 chuyen cap trang bi' },
    { t: 'Đục Lỗ Trang Bị (Hoàng Thủy Tinh 255–258, 4 lỗ Vũ Khí/Ngựa)', p: 'trang-bi.html#duc-lo', c: 'Trang Bị', k: 'duc lo hoang thuy tinh 255 258 so lo vu khi toa ky' },
    { t: 'Mạ Màu Lỗ, Hóa Lỗ Ngũ Sắc & Lỗ Cực Phẩm (+20%)', p: 'trang-bi.html#ma-lo', c: 'Trang Bị', k: 'ma lo doi mau lo tu thuy tinh bat quai bi ngan 334 thuy ngan ruc ro 333' },
    { t: 'Giám Định Ngọc Thạch (Cửu Tiêu Ngọc Chiếu Đăng 335)', p: 'trang-bi.html#giam-dinh', c: 'Trang Bị', k: 'giam dinh ngoc thach cuu tieu ngoc chieu dang 335 thanh minh xich viem tu ha' },
    { t: 'Khảm Đá / Ngọc Thạch Vào Trang Bị (Lục Thủy Tinh 250–253)', p: 'trang-bi.html#kham-da', c: 'Trang Bị', k: 'kham da kham ngoc luc thuy tinh 250 253 lo do lam tim ngu sac' },
    { t: 'Tách Đá / Gỡ Ngọc Bảo Toàn 100% (Đặt 1 Trang Bị Duy Nhất)', p: 'trang-bi.html#tach-da', c: 'Trang Bị', k: 'tach da go da thao ngoc bao toan 100 tra ngoc ve tui ui_itembox' },
    { t: 'Hợp 3 Ngọc (Phù 331 = 100%), Quy Chân Kính (330) & Hợp Thủy Tinh 6→1', p: 'trang-bi.html#hop-ngoc', c: 'Trang Bị', k: 'hop ngoc 3 vien phu bao ho 331 quy chan kinh 330 hop thuy tinh 6 thanh 1 di truyen 221' },
    { t: 'Tẩy Luyện Mới (Mở 11 Dòng, Đá 245–248) & Nâng Tiềm Năng (23 Mốc)', p: 'trang-bi.html#tay-luyen', c: 'Trang Bị', k: 'tay luyen xilian da 245 248 khoa dong tiem nang 240 243 hon tinh' },
    { t: 'Chiết Xuất & Khắc Kết Tinh Thuộc Tính (300–328)', p: 'trang-bi.html#ket-tinh', c: 'Trang Bị', k: 'chiet xuat khac ket tinh 300 309 chat tach 315 328 dong an dong hien' },
    { t: '3 Hợp 1 Hoàng Kim, Thăng Bạch Kim (+20%), Đổi Ngũ Hành & Ấn (336)', p: 'trang-bi.html#lo-bat-quai', c: 'Trang Bị', k: '3 hop 1 hoang kim bach kim tran pham thach 332 doi ngu hanh 237 huy khoa hua nguyen chau 336' },
    { t: 'Bán Nguyệt Bí Cảnh (Map 105) & Mật Thư Thú Cưỡi Bay Bạch Long', p: 'pho-ban.html#ban-nguyet', c: 'Phó Bản', k: 'ban nguyet bi canh 105 mat thu mon phai bach long 5570' },
    { t: 'Tử Vong Hoang Mạc (106/154) & Thông Thiên Thí Luyện Tháp (205/208)', p: 'pho-ban.html#sa-mac-thap', c: 'Phó Bản', k: 'tu vong hoang mac sa mac 106 154 thong thien thap 205 cuu tieu 208 tiem nang 90' },
    { t: 'Thuyền Phong Lăng Độ / Linh Chu Độ Hải (Map 206, 2h Giờ Lẻ)', p: 'pho-ban.html#phong-lang-do', c: 'Phó Bản', k: 'thuyen phong lang do linh chu do hai 206 gio le 30 dot boss hoang kim' },
    { t: 'Bí Cảnh Cổ Địa Hoa Sơn (Map 51): 3 Kết Giới, Kinh Dịch & Kiếm Thần Long', p: 'pho-ban.html#hoa-son', c: 'Phó Bản', k: 'co dia hoa son 51 ket gioi cau xich kinh dich kiem than long ma quan' },
    { t: 'Lịch Trình v3, Phúc Lợi 3 Tab (7 Ngày · VIP 42 Ô · Hộp Trưởng Thành)', p: 'pho-ban.html#phuc-loi', c: 'Hoạt Động', k: 'lich trinh phuc loi that nhat le vip 42 o hop truong thanh 17 moc' },
    { t: 'Quà Hồi Hương (Vắng >= 7 Ngày: ×2 EXP 3 Ngày + Khí Vận)', p: 'pho-ban.html#hoi-huong', c: 'Hoạt Động', k: 'qua hoi huong quay lai vang 7 ngay x2 exp 3 ngay khi van' },
    { t: 'Dã Tẩu, Kỳ Ngộ (Bảo Hiểm 80), Bình Cảnh Lv.115–120, Võ Lâm Lục & Vòng Quay', p: 'pho-ban.html#hoat-dong-khac', c: 'Hoạt Động', k: 'da tau ky ngo binh canh tam ma vo lam luc 30 thanh tuu vong quay thien co tang bao do' },
    { t: 'Đối Thoại SimBot V4, Bạn Tâm Giao (/tamsu) & Tổ Đội 3 SimBot Đi Phó Bản', p: 'simbot-pk.html#simbot', c: 'SimBot & PK', k: 'simbot chat doi thoai ban tam giao tamsu to doi pt keo xe pho ban roi do' },
    { t: 'Kẻ Thù Truyền Kiếp (Nemesis) — Phục Kích & Thu Phục Đồng Minh', p: 'simbot-pk.html#nemesis', c: 'SimBot & PK', k: 'ke thu truyen kiep nemesis phuc kich thu phuc dong minh danh hieu' },
    { t: '3 Chế Độ PK (Luyện Công · Chiến Đấu · Đồ Sát) & Tỷ Thí Công Bằng (5s/10s)', p: 'simbot-pk.html#che-do-pk', c: 'SimBot & PK', k: 'pk luyen cong chien dau do sat ty thi 2350 5 giay 10 giay ngung chien' },
    { t: 'Chiến Trường Tống Kim 25v25 (Map 200) & Võ Lâm Đại Hội (/daihoi)', p: 'simbot-pk.html#tong-kim-dai-hoi', c: 'SimBot & PK', k: 'tong kim 25v25 map 200 vo lam dai hoi daihoi 16 cao thu minh chu' },
    { t: 'Ngũ Hành Tương Sinh / Khắc (±20%), 10 Phái & Tra Cứu Kích Hoạt Dòng Ẩn', p: 'simbot-pk.html#ngu-hanh', c: 'SimBot & PK', k: 'ngu hanh kim moc thuy hoa tho tuong sinh khac kich hoat dong an trang bi 10 mon phai' },
    { t: 'Chọn Thế Giới: 3 Cảnh Giới Độ Khó (Hạ Giới · Linh Giới · Tiên Giới)', p: 'the-gioi.html#chon-the-gioi', c: 'Thế Giới', k: 'chon the gioi qua cau ha gioi linh gioi tien gioi do kho 20% 50% 100% hoi chieu 3s' },
    { t: 'Thần Hành Phù 7 Dòng & Trở Lại Địa Điểm Cũ (Thổ Địa Phù)', p: 'the-gioi.html#than-hanh-phu', c: 'Thế Giới', k: 'than hanh phu 7 dong tho dia phu tro lai dia diem cu luyen cong vip' },
    { t: 'Bản Đồ Luyện Công Theo Cấp (Lv.10 → Lv.250) & Phân Tầng Tiềm Năng 42–90', p: 'the-gioi.html#ban-do-train', c: 'Thế Giới', k: 'ban do luyen cong train map cap 10 250 tiem nang 42 60 70 80 90 boss hoang kim' },
    { t: 'Miễn Phí Tới Lv.120, Tu Vi Tích Trữ, Thử Map 50 & Chuyển Sinh Lv.200', p: 'the-gioi.html#chuyen-sinh', c: 'Thế Giới', k: 'mien phi lv 120 tu vi tich tru map 50 dot pha chuyen sinh lv 200 1200 quai tim' }
  ];

  /* 2. Mobile Topbar Menu Toggle */
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 3. Live Cross-Page Search on Hub (and any page with #guide-search) */
  const searchInput = document.getElementById('guide-search');
  const searchResults = document.getElementById('search-results');
  const fold = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

  if (searchInput && searchResults) {
    const renderSearch = (raw) => {
      const q = fold(raw.trim());
      if (!q) {
        searchResults.hidden = true;
        searchResults.innerHTML = '';
        return;
      }
      const tokens = q.split(/\s+/).filter(Boolean);
      const matches = SEARCH_INDEX.filter((item) => {
        const hay = fold(`${item.t} ${item.c} ${item.k}`);
        return tokens.every((tk) => hay.includes(tk));
      }).slice(0, 10);

      searchResults.hidden = false;
      if (!matches.length) {
        searchResults.innerHTML = `<div class="sr-empty">Không tìm thấy mục khớp với "<strong>${raw.replace(/</g, '&lt;')}</strong>". Thử từ khóa ngắn như <code>tách đá</code>, <code>cường hóa</code>, <code>simbot</code>, <code>hoa sơn</code>, <code>hạ giới</code>.</div>`;
        return;
      }
      searchResults.innerHTML = matches.map((m) => `
        <a class="sr-item" href="./${m.p}">
          <span class="sr-cat">${m.c}</span>
          <span class="sr-title">${m.t}</span>
          <span class="sr-arrow" aria-hidden="true">→</span>
        </a>
      `).join('');
    };

    searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
    document.querySelectorAll('[data-search-chip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        searchInput.value = btn.getAttribute('data-search-chip') || '';
        renderSearch(searchInput.value);
        searchInput.focus();
      });
    });
    document.addEventListener('click', (e) => {
      if (!searchResults.hidden && !e.target.closest('.search-box')) {
        searchResults.hidden = true;
      }
    });
  }

  /* 4. Sidebar TOC Scrollspy */
  const tocLinks = Array.from(document.querySelectorAll('.toc-list a[href^="#"]'));
  if (tocLinks.length) {
    const sections = tocLinks
      .map((a) => ({ a, el: document.querySelector(a.getAttribute('href')) }))
      .filter((x) => x.el);

    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = sections[0];
      for (const s of sections) {
        if (s.el.offsetTop <= y) cur = s;
      }
      tocLinks.forEach((l) => l.classList.remove('active'));
      if (cur) cur.a.classList.add('active');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 5. Click-to-Copy Chat Commands */
  document.querySelectorAll('.cmd-copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy') || btn.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      const orig = btn.getAttribute('data-orig') || btn.innerHTML;
      btn.setAttribute('data-orig', orig);
      btn.classList.add('copied');
      btn.textContent = `Đã chép: ${text}`;
      window.setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = orig;
      }, 1500);
    });
  });

  /* 6. Interactive WuXing (Ngũ Hành) Hidden-Stat Activation Calculator (simbot-pk.html) */
  const wxRoot = document.getElementById('wuxing-calc');
  if (wxRoot) {
    const WUXING = {
      kim: {
        name: 'Hệ Kim', color: '#ecd086',
        sects: 'Thiếu Lâm · Thiên Vương',
        khac: 'Hệ Mộc (+20% sát thương)',
        biKhac: 'Hệ Hỏa (-20% sát thương)',
        sinh: 'Hệ Thủy (Kim sinh Thủy)',
        duocSinh: 'Hệ Thổ (Thổ sinh Kim)',
        slots: [
          ['Vũ Khí & Mũ', 'Hệ Kim', 'Kích bằng Dây Chuyền & Áo hệ Thổ'],
          ['Áo & Dây Chuyền', 'Hệ Thổ', 'Kích bằng Thắt Lưng & Nhẫn Dưới hệ Hỏa'],
          ['Thắt Lưng & Nhẫn Dưới', 'Hệ Hỏa', 'Kích bằng Hộ Uyển & Ngọc Bội hệ Mộc'],
          ['Hộ Uyển & Ngọc Bội', 'Hệ Mộc', 'Kích bằng Giày & Nhẫn Trên hệ Thủy'],
          ['Giày & Nhẫn Trên', 'Hệ Thủy', 'Kích bằng Vũ Khí & Mũ hệ Kim']
        ]
      },
      moc: {
        name: 'Hệ Mộc', color: '#7ee0b4',
        sects: 'Đường Môn · Ngũ Độc',
        khac: 'Hệ Thổ (+20% sát thương)',
        biKhac: 'Hệ Kim (-20% sát thương)',
        sinh: 'Hệ Hỏa (Mộc sinh Hỏa)',
        duocSinh: 'Hệ Thủy (Thủy sinh Mộc)',
        slots: [
          ['Vũ Khí & Mũ', 'Hệ Mộc', 'Kích bằng Dây Chuyền & Áo hệ Thủy'],
          ['Áo & Dây Chuyền', 'Hệ Thủy', 'Kích bằng Thắt Lưng & Nhẫn Dưới hệ Kim'],
          ['Thắt Lưng & Nhẫn Dưới', 'Hệ Kim', 'Kích bằng Hộ Uyển & Ngọc Bội hệ Thổ'],
          ['Hộ Uyển & Ngọc Bội', 'Hệ Thổ', 'Kích bằng Giày & Nhẫn Trên hệ Hỏa'],
          ['Giày & Nhẫn Trên', 'Hệ Hỏa', 'Kích bằng Vũ Khí & Mũ hệ Mộc']
        ]
      },
      thuy: {
        name: 'Hệ Thủy', color: '#8ac8ff',
        sects: 'Nga Mi · Thúy Yên',
        khac: 'Hệ Hỏa (+20% sát thương)',
        biKhac: 'Hệ Thổ (-20% sát thương)',
        sinh: 'Hệ Mộc (Thủy sinh Mộc)',
        duocSinh: 'Hệ Kim (Kim sinh Thủy)',
        slots: [
          ['Vũ Khí & Mũ', 'Hệ Thủy', 'Kích bằng Dây Chuyền & Áo hệ Kim'],
          ['Áo & Dây Chuyền', 'Hệ Kim', 'Kích bằng Thắt Lưng & Nhẫn Dưới hệ Thổ'],
          ['Thắt Lưng & Nhẫn Dưới', 'Hệ Thổ', 'Kích bằng Hộ Uyển & Ngọc Bội hệ Hỏa'],
          ['Hộ Uyển & Ngọc Bội', 'Hệ Hỏa', 'Kích bằng Giày & Nhẫn Trên hệ Mộc'],
          ['Giày & Nhẫn Trên', 'Hệ Mộc', 'Kích bằng Vũ Khí & Mũ hệ Thủy']
        ]
      },
      hoa: {
        name: 'Hệ Hỏa', color: '#ff9a8a',
        sects: 'Cái Bang · Thiên Nhẫn',
        khac: 'Hệ Kim (+20% sát thương)',
        biKhac: 'Hệ Thủy (-20% sát thương)',
        sinh: 'Hệ Thổ (Hỏa sinh Thổ)',
        duocSinh: 'Hệ Mộc (Mộc sinh Hỏa)',
        slots: [
          ['Vũ Khí & Mũ', 'Hệ Hỏa', 'Kích bằng Dây Chuyền & Áo hệ Mộc'],
          ['Áo & Dây Chuyền', 'Hệ Mộc', 'Kích bằng Thắt Lưng & Nhẫn Dưới hệ Thủy'],
          ['Thắt Lưng & Nhẫn Dưới', 'Hệ Thủy', 'Kích bằng Hộ Uyển & Ngọc Bội hệ Kim'],
          ['Hộ Uyển & Ngọc Bội', 'Hệ Kim', 'Kích bằng Giày & Nhẫn Trên hệ Thổ'],
          ['Giày & Nhẫn Trên', 'Hệ Thổ', 'Kích bằng Vũ Khí & Mũ hệ Hỏa']
        ]
      },
      tho: {
        name: 'Hệ Thổ', color: '#dfbe84',
        sects: 'Võ Đang · Côn Lôn',
        khac: 'Hệ Thủy (+20% sát thương)',
        biKhac: 'Hệ Mộc (-20% sát thương)',
        sinh: 'Hệ Kim (Thổ sinh Kim)',
        duocSinh: 'Hệ Hỏa (Hỏa sinh Thổ)',
        slots: [
          ['Vũ Khí & Mũ', 'Hệ Thổ', 'Kích bằng Dây Chuyền & Áo hệ Hỏa'],
          ['Áo & Dây Chuyền', 'Hệ Hỏa', 'Kích bằng Thắt Lưng & Nhẫn Dưới hệ Mộc'],
          ['Thắt Lưng & Nhẫn Dưới', 'Hệ Mộc', 'Kích bằng Hộ Uyển & Ngọc Bội hệ Thủy'],
          ['Hộ Uyển & Ngọc Bội', 'Hệ Thủy', 'Kích bằng Giày & Nhẫn Trên hệ Kim'],
          ['Giày & Nhẫn Trên', 'Hệ Kim', 'Kích bằng Vũ Khí & Mũ hệ Thổ']
        ]
      }
    };

    const out = document.getElementById('wuxing-output');
    const btns = Array.from(wxRoot.querySelectorAll('[data-wx]'));
    const renderWx = (key) => {
      const d = WUXING[key] || WUXING.kim;
      btns.forEach((b) => {
        const active = b.getAttribute('data-wx') === key;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      if (!out) return;
      out.innerHTML = `
        <div class="wx-summary">
          <div><span class="wx-k">Môn phái</span><strong style="color:${d.color}">${d.sects}</strong></div>
          <div><span class="wx-k">Khắc chế mạnh</span><strong class="txt-jade">${d.khac}</strong></div>
          <div><span class="wx-k">Bị khắc chế</span><strong class="txt-red">${d.biKhac}</strong></div>
          <div><span class="wx-k">Vòng Tương Sinh</span><strong>${d.duocSinh} · ${d.sinh}</strong></div>
        </div>
        <div class="table-wrap" style="margin-top:14px;">
          <table class="data-table">
            <thead><tr><th>Cặp Vị Trí Trang Bị</th><th>Hệ Nên Mang</th><th>Nguồn Kích Hoạt Dòng Ẩn (Trang Bị Lam/Tím)</th></tr></thead>
            <tbody>
              ${d.slots.map(([pair, elem, src]) => `<tr><td><strong>${pair}</strong></td><td><code>${elem}</code></td><td>${src}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
    };
    btns.forEach((b) => b.addEventListener('click', () => renderWx(b.getAttribute('data-wx'))));
    renderWx('kim');
  }

  /* 7. Accessible Lightbox for All Clickable In-Game Screenshots */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const lbCount = document.getElementById('lightbox-count');
  const figures = Array.from(document.querySelectorAll('.zoomable-fig'));
  let lbIdx = 0;

  const showLb = (idx) => {
    if (!lb || !figures.length) return;
    lbIdx = (idx + figures.length) % figures.length;
    const f = figures[lbIdx];
    const img = f.querySelector('img');
    const cap = f.querySelector('figcaption');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lbCap.textContent = cap ? cap.textContent.trim() : img.alt;
    lbCount.textContent = `${lbIdx + 1} / ${figures.length}`;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
  };

  figures.forEach((f, i) => {
    f.setAttribute('tabindex', '0');
    f.setAttribute('role', 'button');
    f.addEventListener('click', () => showLb(i));
    f.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showLb(i); }
    });
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
