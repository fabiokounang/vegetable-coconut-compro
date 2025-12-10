const defaultConfig = {
  company_name: "Alam Sayur Indonesia",
  tagline: "Panen Alam, Segar Setiap Hari",
  hero_headline_1: "Distributor Sayuran & Kelapa Berkualitas",
  hero_subtext_1: "Menyediakan sayuran segar dan kelapa berkualitas tinggi untuk kebutuhan bisnis kuliner, restoran, hotel, dan catering Anda.",
  hero_headline_2: "Langsung dari Petani Terpercaya",
  hero_subtext_2: "Bermitra dengan petani lokal pilihan untuk menjamin kualitas dan kesegaran produk. Solusi pasokan terpercaya untuk bisnis Anda.",
  hero_headline_3: "Pasokan Stabil, Harga Kompetitif",
  hero_subtext_3: "Gudang lengkap dengan stok melimpah. Siap memenuhi kebutuhan pasokan dalam jumlah besar dengan harga terbaik.",
  phone_number: "+62 81-905-060-408",
  email_address: "sales@alamsayur.com",
  store_address: "Jl. Raya Langsep No. 109, Bareng, Kec. Klojen, Kota Malang, Jawa Timur 65146"
};

// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
  currentSlide = index;
  const track = document.querySelector('.carousel-track');
  track.style.transform = `translateX(-${index * 100}%)`;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

// Auto-advance carousel
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}, 6000);

// Scroll functions
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({
    behavior: 'smooth'
  });
}

function scrollToServices() {
  document.getElementById('services').scrollIntoView({
    behavior: 'smooth'
  });
}

function scrollToAbout() {
  document.getElementById('about').scrollIntoView({
    behavior: 'smooth'
  });
}

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({
    behavior: 'smooth'
  });
}

// WhatsApp functionality
function openWhatsApp() {
  const config = window.elementSdk ?.config || defaultConfig;
  const phone = config.phone_number || defaultConfig.phone_number;
  const message = encodeURIComponent(
    `Halo ${config.company_name || defaultConfig.company_name}! Saya ingin mengetahui informasi lebih lanjut tentang produk dan layanan Anda.`
  );
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Contact form handling
function handleContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const originalHTML = form.innerHTML;

  form.innerHTML = `
    <div class="text-center py-12">
      <div class="text-6xl mb-6">✅</div>
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Pesan Terkirim!</h3>
      <p class="text-gray-600 mb-8">Terima kasih telah menghubungi kami. Kami akan segera merespons!</p>
      <button onclick="resetContactForm(this)" class="btn-primary text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
          Kirim Pesan Lain
      </button>
    </div>
  `;

  form.dataset.originalHtml = originalHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // cegah submit normal (yang bikin 405/404)

    // Honeypot: kalau bot-field terisi, jangan kirim apa-apa
    const botField = form.querySelector('input[name="bot-field"]');
    if (botField && botField.value) {
      return;
    }

    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      message: form.message.value
    };

    fetch('https://formsubmit.co/ajax/sales@alamsayur.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(function (data) {
        // Jika sukses → redirect ke success.html
        window.location.href = '/success.html';
      })
      .catch(function (error) {
        console.error('Form submit error:', error);
        alert('Sorry, something went wrong. Please try again or contact us via WhatsApp.');
      });
  });
});


function resetContactForm(button) {
  const form = button.closest('form');
  form.innerHTML = form.dataset.originalHtml;
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      document.getElementById('mobile-menu').classList.add('hidden');
    }
  });
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement('script');
      d.innerHTML =
        "window.__CF$cv$params={r:'9a1d17c0621d9cb0',t:'MTc2MzY5NTY2Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d)
    }
  }
  if (document.body) {
    var a = document.createElement('iframe');
    a.height = 1;
    a.width = 1;
    a.style.position = 'absolute';
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = 'none';
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    if ('loading' !== document.readyState) c();
    else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        'loading' !== document.readyState && (document.onreadystatechange = e, c())
      }
    }
  }
})();