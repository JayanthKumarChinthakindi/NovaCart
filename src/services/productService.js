import { simulateApiCall } from './api';
import { INITIAL_PRODUCTS } from './mockData';

const getProducts = () => {
  const products = localStorage.getItem('nc_products');
  if (!products) {
    localStorage.setItem('nc_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  let parsed = JSON.parse(products);
  // Migrate existing local storage: if no products exist for sellerId 2, assign 101/102 products to them
  if (!parsed.some((p) => p.sellerId === 2)) {
    parsed = parsed.map((p) => {
      if (p.sellerId === 101 || p.sellerId === 102) {
        return { ...p, sellerId: 2, sellerName: 'AeroSound & More' };
      }
      return p;
    });
    localStorage.setItem('nc_products', JSON.stringify(parsed));
  }
  return parsed;
};

export const productService = {
  getProducts: async (filters = {}) => {
    let products = getProducts();
    const { category, minPrice, maxPrice, rating, search, sortBy, sellerId } = filters;

    // Filter by Seller
    if (sellerId) {
      products = products.filter((p) => p.sellerId === Number(sellerId));
    }

    // Category Filter
    if (category && category !== 'all') {
      products = products.filter((p) => p.category === category);
    }

    // Search query
    if (search) {
      const query = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Price Filter
    if (minPrice !== undefined && minPrice !== '') {
      products = products.filter((p) => {
        const activePrice = p.discountPrice || p.price;
        return activePrice >= Number(minPrice);
      });
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      products = products.filter((p) => {
        const activePrice = p.discountPrice || p.price;
        return activePrice <= Number(maxPrice);
      });
    }

    // Rating Filter
    if (rating) {
      products = products.filter((p) => p.rating >= Number(rating));
    }

    // Sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price-desc':
          products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'rating-desc':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          products.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          break;
      }
    }

    return simulateApiCall(products);
  },

  getProductById: async (id) => {
    const products = getProducts();
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return simulateApiCall(product);
  },

  createProduct: async (productData, sellerId, sellerName) => {
    const products = getProducts();
    const newProduct = {
      ...productData,
      id: Date.now(),
      price: Number(productData.price),
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
      stock: Number(productData.stock),
      sellerId: Number(sellerId),
      sellerName: sellerName || 'Partner Store',
      rating: 0,
      reviewCount: 0,
      reviews: [],
      featured: false,
      trending: false,
      flashSale: false,
    };
    products.push(newProduct);
    localStorage.setItem('nc_products', JSON.stringify(products));
    return simulateApiCall(newProduct);
  },

  updateProduct: async (id, updatedData) => {
    const products = getProducts();
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const original = products[index];
    products[index] = {
      ...original,
      ...updatedData,
      price: Number(updatedData.price),
      discountPrice: updatedData.discountPrice ? Number(updatedData.discountPrice) : undefined,
      stock: Number(updatedData.stock),
    };
    
    localStorage.setItem('nc_products', JSON.stringify(products));
    return simulateApiCall(products[index]);
  },

  deleteProduct: async (id) => {
    const products = getProducts();
    const filtered = products.filter((p) => p.id !== Number(id));
    localStorage.setItem('nc_products', JSON.stringify(filtered));
    return simulateApiCall({ success: true, deletedId: Number(id) });
  },

  addReview: async (productId, reviewData) => {
    const products = getProducts();
    const index = products.findIndex((p) => p.id === Number(productId));
    if (index === -1) {
      throw new Error('Product not found');
    }

    const product = products[index];
    if (!product.reviews) product.reviews = [];

    const newReview = {
      id: Date.now(),
      user: reviewData.user,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
    };

    product.reviews.unshift(newReview);
    const sumRatings = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = Number((sumRatings / product.reviews.length).toFixed(1));
    product.reviewCount = product.reviews.length;

    products[index] = product;
    localStorage.setItem('nc_products', JSON.stringify(products));
    return simulateApiCall(product);
  },
};
