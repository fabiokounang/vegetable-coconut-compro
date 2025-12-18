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
    description: "Our premium cabbage is freshly harvested from trusted local farms and stored in a temperature-controlled facility to maintain its crisp texture and natural flavor.",
    benefits: [
      "🥬 High in vitamins C and K to support immunity and bone health",
      "🌱 Rich in antioxidants that help protect cells from damage",
      "💪 Good source of fiber for better digestion",
      "🔥 Low in calories, ideal for weight-management diets",
      "💧 Contains water-rich nutrients that support hydration"
    ],
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
      "images/image14.jpeg"
    ],
    short_desc: "Fresh semi-husk coconuts for export",
    description: "Our semi-husk coconuts are sourced from high-quality farms and processed with care to maintain freshness. Ideal for export to Taiwan, Singapore, Malaysia, and Thailand.",
    benefits: [
      "🥥 Naturally hydrating with essential electrolytes",
      "💪 Rich in healthy fats that support sustained energy",
      "🛡️ Contains lauric acid, known for antimicrobial properties",
      "🌿 Long shelf life, making it excellent for export use",
      "🔥 Versatile ingredient for beverages, cooking, and cosmetics"
    ],
    tips: [],
    availability: []
  },
  lemon: {
    category: "fruit",
    title: "Lemon",
    image: "images/image11.png",
    gallery: [
      "images/image11.png",
      "images/image12.jpeg",
      "images/image13.jpeg"
    ],
    short_desc: "Fresh, premium lemon for export and perfect for lifestyle",
    description: "Our fresh lemons are handpicked from trusted farms to ensure the best flavor and quality. Perfect for export markets such as Taiwan, Singapore, Malaysia, and Thailand.",
    benefits: [
      "🍋 High in vitamin C to boost immunity and skin health",
      "💧 Supports hydration and natural detox processes",
      "🔥 Aids digestion and helps maintain a healthy metabolism",
      "🛡️ Rich in antioxidants that fight free radicals",
      "🌿 Fresh aroma that enhances culinary and beverage recipes"
    ],
    tips: [],
    availability: []
  },
  corn: {
    category: "vegetable",
    title: "Sweet Corn",
    image: "images/image15.jpeg",
    gallery: [
      "images/image15.jpeg",
      "images/image16.jpeg",
      "images/image17.png"
    ],
    short_desc: "Fresh, naturally sweet corn for export and daily consumption",
    description: "Our sweet corn is selected from quality farms, known for its natural sweetness and tender kernels. Carefully packed to maintain freshness, making it an excellent choice for export to Taiwan, Singapore, Malaysia, and Thailand.",
    benefits: [
      "🌽 Naturally rich in fiber to support digestion",
      "💪 Provides essential B vitamins for energy metabolism",
      "👀 Contains lutein and zeaxanthin to support eye health",
      "⚡ Good source of natural carbohydrates for long-lasting energy",
      "🥗 Versatile for salads, soups, grilling, and daily meals"
    ],
    tips: [],
    availability: []
  },
  tamarind: {
    category: "vegetable",
    title: "Tamarind",
    image: "images/image18.jpeg",
    gallery: [
      "images/image18.jpeg",
      "images/image19.jpeg",
      "images/image20.jpeg"
    ],
    short_desc: "Premium tamarind with a balanced sweet–sour taste for culinary and beverage use",
    description: "Our tamarind is carefully sourced and selected for its rich aroma and naturally tangy flavor. Ideal for export and food manufacturing, it is suitable for sauces, seasonings, beverages, and traditional cooking. Packed to maintain quality and freshness during delivery.",
    benefits: [
      "🍋 Naturally contains organic acids that add a refreshing tangy taste",
      "🧪 Contains antioxidants that help support overall wellness",
      "🥣 Traditionally used to support digestion when consumed in moderation",
      "💧 Often used in drinks and recipes for a refreshing flavor profile",
      "🍲 Perfect for sauces, soups, marinades, sambal, and beverages"
    ],
    tips: [
      "✅ For cooking: soak tamarind pulp in warm water 10–15 minutes, then strain for tamarind juice",
      "✅ Store in an airtight container in a cool, dry place to preserve aroma",
      "✅ For consistent taste in production, use measured tamarind extract/juice"
    ],
    availability: [
      "Fresh / Pulp (seasonal depending on harvest)",
      "Dried Tamarind",
      "Seedless Tamarind (selected batches)",
      "Tamarind Paste / Block (on request)",
      "Tamarind Extract (on request)"
    ]
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
        <img src="${img}" alt="${title}" loading="lazy" class="w-full h-32 object-cover rounded-lg mb-4" onerror="this.src=''; this.alt='${key} image failed to load'; this.style.display='none';">
        <h3 data-i18n="${key}" class="text-lg font-semibold text-gray-800 mb-2">${title}</h3>
        <p data-i18n="${key}-short-desc" class="text-gray-600 text-sm mb-3">${short_desc}</p>
      </div>
    `;
  });
})();

function t(key) {
  return i18next.t(key);
}

// Product detail functions
function showProductDetail(productId) {
  const product = productDetails[productId];
  if (!product) return;

  // check lang
  const zhBtn = document.getElementById('lang-zh');
  const zhBtnMobile = document.getElementById('lang-zh-mobile');
  const isActive = zhBtn.classList.contains('bg-gradient-to-r');
  const isActiveMobile = zhBtnMobile.classList.contains('bg-gradient-to-r');
  const isZh = isActive || isActiveMobile;

  if (isZh) {
    document.getElementById('modal-title').innerHTML = t([productId.trim()]);
    document.getElementById('modal-image').alt = t([productId.trim()]);
    document.getElementById('modal-description').innerHTML = t([productId.trim() + '-description']);
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
    img.setAttribute('loading', 'lazy');
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

  // Update benefits
  const benefitsList = document.getElementById('modal-benefits');
  benefitsList.innerHTML = '';

  product.benefits.forEach((benefit, i) => {
    const li = document.createElement('li');
    li.className = 'flex items-start';

    const key = `${productId}-nutritional-${i + 1}`;
    li.setAttribute('data-i18n', key);

    // kalau Chinese aktif → pakai i18n.t
    // kalau English → pakai data dari product.benefits
    li.textContent = isZh ? t(key) : benefit;

    benefitsList.appendChild(li);
  });


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