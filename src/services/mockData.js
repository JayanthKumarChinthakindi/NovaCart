// Unsplash image search links used as premium assets
export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'FiCpu', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&q=80' },
  { id: 'fashion', name: 'Fashion & Apparel', icon: 'FiShoppingBag', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' },
  { id: 'home', name: 'Home & Living', icon: 'FiHome', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'FiSmile', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80' },
  { id: 'sports', name: 'Sports & Outdoors', icon: 'FiActivity', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80' },
];

export const COUPONS = [
  { code: 'WELCOME10', discountType: 'percentage', value: 10, minSpend: 50 },
  { code: 'MEGA20', discountType: 'percentage', value: 20, minSpend: 150 },
  { code: 'FREESHIP', discountType: 'flat', value: 15, minSpend: 100 }, // value represents shipping cost offset
];

export const INITIAL_PRODUCTS = [
  // Electronics
  {
    id: 1,
    name: 'AeroSound Pro Wireless Headphones',
    description: 'Immerse yourself in pure sound. Featuring hybrid active noise cancellation, 40-hour battery life, spatial audio, and memory foam earcups for ultimate comfort.',
    price: 199.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    rating: 4.8,
    reviewCount: 142,
    stock: 45,
    sellerId: 2,
    sellerName: 'AeroSound & More',
    featured: true,
    trending: true,
    flashSale: true,
    discountPrice: 159.99,
    reviews: [
      { id: 1, user: 'John Doe', rating: 5, comment: 'Absolutely incredible sound quality. Noise cancellation is top notch!', date: '2026-05-15' },
      { id: 2, user: 'Sarah Jenkins', rating: 4, comment: 'Very comfortable for long flights. Battery lasts forever.', date: '2026-05-20' }
    ]
  },
  {
    id: 2,
    name: 'VividWatch Series 5 Smartwatch',
    description: 'Track your fitness, track your life. Always-on Retina display, ECG monitoring, fall detection, workout routing, and seamless smartphone sync.',
    price: 329.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    rating: 4.6,
    reviewCount: 98,
    stock: 12,
    sellerId: 2,
    sellerName: 'AeroSound & More',
    featured: true,
    trending: false,
    flashSale: false,
    reviews: [
      { id: 1, user: 'Michael Scott', rating: 5, comment: 'This watch tracks everything. Looks clean too.', date: '2026-04-10' }
    ]
  },
  {
    id: 3,
    name: 'ProClick Mechanical Keyboard',
    description: 'Experience typing perfection. Hot-swappable tactile switches, double-shot PBT keycaps, per-key RGB backlighting, and a solid aluminum frame.',
    price: 129.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    rating: 4.7,
    reviewCount: 65,
    stock: 24,
    sellerId: 2,
    sellerName: 'AeroSound & More',
    featured: false,
    trending: true,
    flashSale: true,
    discountPrice: 109.99,
    reviews: [
      { id: 1, user: 'Dev Guru', rating: 5, comment: 'Excellent tactile feel. Recommended for programmers.', date: '2026-05-12' }
    ]
  },
  {
    id: 4,
    name: 'StreamCast 4K Ultra Webcam',
    description: 'Crystal-clear video conferencing and streaming. 4K resolution, auto-focus, dual noise-reducing microphones, and automatic light adjustment.',
    price: 89.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    rating: 4.4,
    reviewCount: 37,
    stock: 60,
    sellerId: 2,
    sellerName: 'AeroSound & More',
    featured: false,
    trending: false,
    flashSale: false,
    reviews: []
  },

  // Fashion
  {
    id: 5,
    name: 'Classic Leather Bomber Jacket',
    description: 'Timeless outerwear style. Handcrafted from genuine top-grain leather, featuring heavy-duty zippers, ribbed cuffs, and custom lining.',
    price: 249.99,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    rating: 4.9,
    reviewCount: 215,
    stock: 15,
    sellerId: 201,
    sellerName: 'Urban Heritage',
    featured: true,
    trending: true,
    flashSale: false,
    reviews: [
      { id: 1, user: 'Brad Pitt', rating: 5, comment: 'Fits like a glove, leather quality is exceptional.', date: '2026-03-01' }
    ]
  },
  {
    id: 6,
    name: 'Minimalist Canvas Sneakers',
    description: 'Everyday shoes redefined. Made with organic cotton canvas, natural rubber outsoles, and orthotic insoles for non-stop comfort.',
    price: 65.00,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    rating: 4.5,
    reviewCount: 88,
    stock: 50,
    sellerId: 201,
    sellerName: 'Urban Heritage',
    featured: false,
    trending: true,
    flashSale: true,
    discountPrice: 45.00,
    reviews: [
      { id: 1, user: 'Lara C.', rating: 4, comment: 'Simple, lightweight, matches with almost everything.', date: '2026-05-18' }
    ]
  },
  {
    id: 7,
    name: 'Classic Silk Wrap Dress',
    description: 'Elegant drape, luxurious comfort. 100% pure mulberry silk dress featuring an adjustable tie waist and flared sleeves.',
    price: 180.00,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    rating: 4.7,
    reviewCount: 52,
    stock: 8,
    sellerId: 202,
    sellerName: 'Atelier Mode',
    featured: true,
    trending: false,
    flashSale: false,
    reviews: []
  },

  // Home & Living
  {
    id: 8,
    name: 'Sleek Ceramic Table Lamp',
    description: 'Illuminate with style. Handcrafted matte ceramic base, natural linen shade, and dimmable smart LED bulb included.',
    price: 75.00,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    rating: 4.3,
    reviewCount: 29,
    stock: 35,
    sellerId: 301,
    sellerName: 'Nordic Spaces',
    featured: false,
    trending: false,
    flashSale: false,
    reviews: []
  },
  {
    id: 9,
    name: 'Ergonomic Mid-Century Office Chair',
    description: 'Work in absolute style. Molded walnut plywood shell, high-density foam padding, top-grain leather upholstery, and adjustable height.',
    price: 299.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&q=80',
    rating: 4.8,
    reviewCount: 74,
    stock: 10,
    sellerId: 301,
    sellerName: 'Nordic Spaces',
    featured: true,
    trending: true,
    flashSale: false,
    reviews: [
      { id: 1, user: 'A. Lin', rating: 5, comment: 'Looks great in my study. Great lower back support.', date: '2026-05-02' }
    ]
  },
  {
    id: 10,
    name: 'Velvet Throw Pillows (Set of 2)',
    description: 'Add a touch of luxury to your living room. Ultra-soft velvet covers with premium down-alternative inserts.',
    price: 39.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
    rating: 4.6,
    reviewCount: 110,
    stock: 120,
    sellerId: 301,
    sellerName: 'Nordic Spaces',
    featured: false,
    trending: false,
    flashSale: true,
    discountPrice: 29.99,
    reviews: []
  },

  // Beauty & Wellness
  {
    id: 11,
    name: 'Organic Rosehip Facial Oil',
    description: '100% pure cold-pressed oil. Rich in vitamins and essential fatty acids, designed to restore glow and hydrate deeply.',
    price: 24.50,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
    rating: 4.7,
    reviewCount: 312,
    stock: 90,
    sellerId: 401,
    sellerName: 'Glow Apothecary',
    featured: true,
    trending: true,
    flashSale: false,
    reviews: [
      { id: 1, user: 'Emily R.', rating: 5, comment: 'My skin has never felt softer. Truly organic.', date: '2026-05-22' }
    ]
  },
  {
    id: 12,
    name: 'Sandalwood & Jasmine Aromatherapy Candle',
    description: 'Create a sanctuary at home. Soy wax candle hand-poured with premium natural essential oils, 50-hour burn time.',
    price: 28.00,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
    rating: 4.5,
    reviewCount: 45,
    stock: 80,
    sellerId: 401,
    sellerName: 'Glow Apothecary',
    featured: false,
    trending: false,
    flashSale: true,
    discountPrice: 19.99,
    reviews: []
  },

  // Sports & Outdoors
  {
    id: 13,
    name: 'Apex Trail Hydration Backpack',
    description: 'Designed for serious hikers and runners. 10L storage capacity, integrated 2L leak-proof hydration bladder, and lightweight mesh shoulder straps.',
    price: 69.99,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    rating: 4.6,
    reviewCount: 84,
    stock: 30,
    sellerId: 501,
    sellerName: 'Apex Outdoor Gear',
    featured: false,
    trending: true,
    flashSale: false,
    reviews: []
  },
  {
    id: 14,
    name: 'Premium Cork Yoga Mat',
    description: 'Eco-friendly and naturally anti-microbial. Heavy-duty natural rubber base with a smooth, non-slip organic cork top surface.',
    price: 85.00,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    rating: 4.8,
    reviewCount: 104,
    stock: 25,
    sellerId: 501,
    sellerName: 'Apex Outdoor Gear',
    featured: true,
    trending: false,
    flashSale: true,
    discountPrice: 68.00,
    reviews: [
      { id: 1, user: 'Yogi B.', rating: 5, comment: 'Unbelievable grip, even when sweaty. Highly recommend cork mats.', date: '2026-05-19' }
    ]
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    email: 'buyer@novacart.com',
    password: 'password123',
    name: 'Jayanth Kumar',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    addresses: [
      { id: 1, type: 'Home', street: '123 Main Street', city: 'Bengaluru', state: 'Karnataka', zip: '560001', country: 'India', isDefault: true },
      { id: 2, type: 'Office', street: 'Tech Park, Block B', city: 'Bengaluru', state: 'Karnataka', zip: '560103', country: 'India', isDefault: false }
    ],
    wishlist: [1, 5]
  },
  {
    id: 2,
    email: 'seller@novacart.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    storeName: 'AeroSound & More',
    description: 'Premium gadget and apparel distributor since 2021.'
  }
];

export const MOCK_ORDERS = [
  {
    id: 'NC-2026-9812',
    date: '2026-05-24',
    userId: 1,
    items: [
      { id: 1, name: 'AeroSound Pro Wireless Headphones', price: 159.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
      { id: 10, name: 'Velvet Throw Pillows (Set of 2)', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100&q=80' }
    ],
    shippingAddress: { street: '123 Main Street', city: 'Bengaluru', state: 'Karnataka', zip: '560001', country: 'India' },
    paymentMethod: 'Credit Card',
    summary: { subtotal: 219.97, shipping: 0, tax: 17.60, total: 237.57 },
    status: 'Delivered',
    timeline: [
      { status: 'Order Placed', date: '2026-05-24 10:15 AM' },
      { status: 'Processing', date: '2026-05-24 02:30 PM' },
      { status: 'Shipped', date: '2026-05-25 09:00 AM' },
      { status: 'Delivered', date: '2026-05-27 04:45 PM' }
    ]
  },
  {
    id: 'NC-2026-3245',
    date: '2026-05-30',
    userId: 1,
    items: [
      { id: 6, name: 'Minimalist Canvas Sneakers', price: 45.00, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&q=80' }
    ],
    shippingAddress: { street: '123 Main Street', city: 'Bengaluru', state: 'Karnataka', zip: '560001', country: 'India' },
    paymentMethod: 'UPI',
    summary: { subtotal: 45.00, shipping: 15.00, tax: 3.60, total: 63.60 },
    status: 'Shipped',
    timeline: [
      { status: 'Order Placed', date: '2026-05-30 08:00 AM' },
      { status: 'Processing', date: '2026-05-30 03:15 PM' },
      { status: 'Shipped', date: '2026-06-02 11:30 AM' }
    ]
  }
];

// Seller dashboard analytics mock data (Recharts ready)
export const SELLER_ANALYTICS = {
  kpis: {
    totalProducts: 45,
    totalOrders: 142,
    revenue: 12480.50,
    customers: 84
  },
  revenueChart: [
    { name: 'Jan', revenue: 1200 },
    { name: 'Feb', revenue: 1900 },
    { name: 'Mar', revenue: 1500 },
    { name: 'Apr', revenue: 2400 },
    { name: 'May', revenue: 3200 },
    { name: 'Jun', revenue: 2280.50 }
  ],
  monthlySalesChart: [
    { name: 'Jan', sales: 15 },
    { name: 'Feb', sales: 22 },
    { name: 'Mar', sales: 18 },
    { name: 'Apr', sales: 30 },
    { name: 'May', sales: 42 },
    { name: 'Jun', sales: 25 }
  ],
  topProducts: [
    { name: 'AeroSound Pro Headphones', sales: 54, revenue: 8639.46 },
    { name: 'ProClick Keyboard', sales: 28, revenue: 3079.72 },
    { name: 'StreamCast 4K Webcam', sales: 14, revenue: 1259.86 }
  ],
  categorySales: [
    { name: 'Electronics', value: 85 },
    { name: 'Fashion', value: 10 },
    { name: 'Home', value: 5 }
  ]
};
