// =========================================
// 1. Inisialisasi Pustaka
// =========================================

// AOS (Animation On Scroll)
AOS.init({
    duration: 1000, // Durasi animasi (ms)
    once: true,     // Animasi hanya berjalan sekali saat di-scroll
    offset: 100     // Jarak scroll sebelum animasi mulai
});




// =========================================
// 2. Interaksi UI
// =========================================

// Menu Hamburger Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        // Toggle class 'active' untuk menampilkan/menyembunyikan menu
        navLinks.classList.toggle('active');
        // Animasi hamburger jadi silang (X)
        hamburger.classList.toggle('toggle-hamburger');
    });
}

// Menutup menu mobile saat salah satu tautan diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle-hamburger');
        }
    });
});

// Perubahan Style Navbar Saat di-Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        // Tambahkan shadow dan kecilkan height saat scroll ke bawah
        header.classList.add('scrolled');
    } else {
        // Kembalikan ke posisi semula saat di atas
        header.classList.remove('scrolled');
    }
});

// =========================================
// 3. Logika Navigasi & Formulir
// =========================================

// Menyoroti Link Navigasi yang Sedang Aktif (Active Scroll)
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a:not(.btn-ppdb-nav)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});
// =========================================
// COUNTER STATISTIK INTERACTION (Scroll Trigger)
// =========================================
const counters = document.querySelectorAll('.counter-number');
const counterSection = document.querySelector('.counter-section');
let started = false; // Flag agar animasi hanya berjalan 1 kali

function startCounter() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // Makin kecil nilainya, makin cepat hitungannya
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Menjalankan animasi saat section terlihat di layar (Scroll Event)
if (counterSection) {
    window.addEventListener('scroll', () => {
        const sectionPos = counterSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !started) {
            startCounter();
            started = true; // Kunci agar tidak berjalan terus saat di-scroll ulang
        }
    });
}
// =========================================
// KONTAK FORM HANDLER (Redirect ke WA)
// =========================================
const formPesan = document.getElementById('formPesan');

if (formPesan) {
    formPesan.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('namaPesan').value;
        const kontak = document.getElementById('emailPesan').value;
        const pesan = document.getElementById('isiPesan').value;

        // Format pesan otomatis ke WhatsApp Admin
        const nomorWA = "6281234567890"; // Ganti dengan nomor WA sekolah
        const teksWA = `Halo Admin, saya %0A*Nama:* ${encodeURIComponent(nama)} %0A*Kontak:* ${encodeURIComponent(kontak)} %0A*Pesan:* ${encodeURIComponent(pesan)}`;

        // Buka WhatsApp di tab baru
        window.open(`https://wa.me/${nomorWA}?text=${teksWA}`, '_blank');

        // Reset form
        formPesan.reset();
    });
}
// =========================================
// PROFIL TAB INTERACTION
// =========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hapus kelas 'active' dari semua tombol dan konten
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Aktifkan tombol yang diklik
        btn.classList.add('active');

        // Tampilkan konten yang sesuai dengan atribut data-tab
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});
// =========================================
// TYPING EFFECT (FIXED)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        new Typed('.typing-text', {
            strings: [
                'Teknologi Digital',
                'Jaringan LAN',
                'TKJ',

                
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});
// =========================================
// DARK MODE TOGGLE & LOCALSTORAGE
// =========================================
const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

// Cek preferensi tema sebelumnya yang tersimpan di browser
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Switch kelas 'dark-mode' pada tag <body>
        document.body.classList.toggle('dark-mode');

        // Simpan status tema ke LocalStorage
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
}
// =========================================
// POP-UP BROSUR PPDB LOGIC
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const ppdbModal = document.getElementById('ppdbModal');
    const closeModal = document.getElementById('closeModal');
    const dismissModal = document.getElementById('dismissModal');

    if (ppdbModal) {
        // Tampilkan modal secara otomatis setelah 1.5 detik
        setTimeout(() => {
            ppdbModal.classList.add('active');
        }, 1500);

        // Fungsi Menutup Modal
        const hideModal = () => {
            ppdbModal.classList.remove('active');
        };

        // Event listener saat tombol "X" atau "Nanti Saja" diklik
        if (closeModal) closeModal.addEventListener('click', hideModal);
        if (dismissModal) dismissModal.addEventListener('click', hideModal);

        // Tutup modal jika pengguna mengklik area di luar kotak modal (overlay)
        ppdbModal.addEventListener('click', (e) => {
            if (e.target === ppdbModal) {
                hideModal();
            }
        });
    }
});
// =========================================
// JURUSAN FILTER INTERACTION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jurusanCards = document.querySelectorAll('.jurusan-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Ubah status tombol aktif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Saring kartu jurusan
            jurusanCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});
// BACK TO TOP LOGIC
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// =========================================
// FAQ ACCORDION INTERACTION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;

            // Tutup FAQ lain yang sedang terbuka (opsional, agar rapi)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle buka/tutup FAQ yang diklik
            faqItem.classList.toggle('active');
        });
    });
});