
// Product filtering
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  const filters = document.querySelectorAll('.product-filter');

  filters.forEach(filter => filter.classList.remove('active'));
  event.target.classList.add('active');

  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Product detail modal
const productDetails = {
  cabbage: {
    category: "leafy",
    title: "Fresh Organic Cabbage",
    image: "images/image1.jpeg",
    gallery: [
      "images/image2.jpeg",
      "images/image3.jpeg",
      "images/image7.jpeg"
    ],
    short_desc: "Organic cabbage leaves, perfect for salads and cooking",
    description: "Our premium cabbage is freshly harvested from trusted local farms and stored in a temperature-controlled facility to maintain its crisp texture and natural flavor. Each head is carefully selected to ensure high quality, freshness, and purity. Ideal for stir-fries, soups, salads, hotpot, and a wide variety of international dishes. Naturally grown without harmful chemicals, making it a healthy choice for everyday cooking.",
    benefits: [],
    tips: [],
    availability: []
  },
  coconut: {
    category: "fruit",
    title: "Semi Husk Coconut",
    image: "images/image4.jpeg",
    gallery: [
      "images/image5.jpeg",
      "images/image6.jpeg",
      "images/image8.jpeg"
    ],
    short_desc: "Fresh semi-husk coconuts for export",
    description: "Our semi-husk coconuts are sourced from high-quality farms and processed with care to maintain freshness. Ideal for export to Taiwan, Singapore, Malaysia, and Thailand.",
    benefits: [],
    tips: [],
    availability: []
  }
  // benefits: [
  //   "🥬 Rich in vitamins C and K to support immunity and bone strength",
  //   "💪 High in fiber, promoting healthy digestion",
  //   "👀 Contains antioxidants that support eye and skin health",
  //   "⚡ Low in calories, perfect for healthy diets",
  //   "🧠 Folate content helps support brain function",
  //   "🔋 Natural energy-boosting nutrients"
  // ],
  // tips: [
  //   "❄️ Store in the refrigerator for up to 5–7 days to maintain freshness",
  //   "💧 Wash thoroughly before cutting or cooking",
  //   "🔪 Keep the outer leaves on to help extend shelf life",
  //   "🥗 Best used for soups, stir-fries, salads, and hotpot dishes",
  //   "📦 Do not store near ethylene-producing fruits (like apples) to prevent premature spoilage"
  // ],
  // availability: "✅ In Stock - Harvested Daily"
};

(function renderProduct() {
  const productItem = document.getElementById('product-item');
  Object.keys(productDetails).forEach((k, i) => {
    let key = k.trim();
    let cat = productDetails[key].category;
    let img = productDetails[key].image;
    let title = productDetails[key].title;
    let short_desc = productDetails[key].short_desc;
    productItem.innerHTML += `
          <div class="product-card bg-white rounded-2xl p-6 hover-lift fade-in cursor-pointer" data-category="${cat}" onclick="showProductDetail('${key}')">
            <img src="${img}" alt="${title}" class="w-full h-32 object-cover rounded-lg mb-4" onerror="this.src=''; this.alt='${key} image failed to load'; this.style.display='none';">
            <h3 data-lang="${key}" class="text-lg font-semibold text-gray-800 mb-2">${title}</h3>
            <p data-lang="${key}-short-desc" class="text-gray-600 text-sm mb-3">${short_desc}</p>
          </div>
        `;
  });
})();

// Product detail functions
function showProductDetail(productId) {
  let currentProduct = productId;
  const product = productDetails[productId];
  if (!product) return;

  // check lang
  const zhBtn = document.getElementById('lang-zh');
  const zhBtnMobile = document.getElementById('lang-zh-mobile');
  const isActive = zhBtn.classList.contains('bg-gradient-to-r');
  const isActiveMobile = zhBtnMobile.classList.contains('bg-gradient-to-r');

  if (isActive || isActiveMobile) {
    document.getElementById('modal-title').innerHTML = translations['zh'][productId.trim()];
    document.getElementById('modal-image').alt = translations['zh'][productId.trim()];
    document.getElementById('modal-description').innerHTML = translations['zh'][productId.trim() + '-description'];
  } else {
    document.getElementById('modal-title').innerHTML = product.title;
    document.getElementById('modal-image').alt = product.title;
    document.getElementById('modal-description').innerHTML = product.description;
  }


  // Update modal content
  document.getElementById('modal-image').src = product.image;

  // Update gallery
  const gallery = document.getElementById('modal-gallery');
  gallery.innerHTML = '';
  product.gallery.forEach((imageSrc, index) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `${product.title} view ${index + 1}`;
    img.className =
      'w-full h-16 sm:h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity';
    img.onclick = () => {
      document.getElementById('modal-image').src = imageSrc;
    };
    img.onerror = function () {
      this.style.display = 'none';
    };
    gallery.appendChild(img);
  });

  // // Update benefits
  // const benefitsList = document.getElementById('modal-benefits');
  // benefitsList.innerHTML = '';
  // product.benefits.forEach(benefit => {
  //   const li = document.createElement('li');
  //   li.textContent = benefit;
  //   li.className = 'flex items-start';
  //   benefitsList.appendChild(li);
  // });

  // // Update tips
  // const tipsList = document.getElementById('modal-tips');
  // tipsList.innerHTML = '';
  // product.tips.forEach(tip => {
  //   const div = document.createElement('div');
  //   div.textContent = tip;
  //   div.className = 'flex items-start';
  //   tipsList.appendChild(div);
  // });

  // // Update availability
  // const availability = document.getElementById('modal-availability');
  // availability.innerHTML = `<span class="text-green-600 font-medium">${product.availability}</span>`;

  // Show modal
  document.getElementById('product-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  document.getElementById('product-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
  currentProduct = null;
}

// Close modal when clicking outside
document.getElementById('product-modal').addEventListener('click', function (event) {
  if (event.target === this) {
    closeProductDetail();
  }
});