import { simulateApiCall } from './api';
import { MOCK_ORDERS, SELLER_ANALYTICS } from './mockData';

const getOrders = () => {
  const orders = localStorage.getItem('nc_orders');
  if (!orders) {
    localStorage.setItem('nc_orders', JSON.stringify(MOCK_ORDERS));
    return MOCK_ORDERS;
  }
  return JSON.parse(orders);
};

export const orderService = {
  getOrdersByUser: async (userId) => {
    const orders = getOrders();
    const userOrders = orders.filter((o) => o.userId === userId);
    return simulateApiCall(userOrders);
  },

  createOrder: async (orderData) => {
    const orders = getOrders();
    const newOrder = {
      ...orderData,
      id: `NC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      timeline: [
        { status: 'Order Placed', date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
        { status: 'Processing', date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
      ],
    };
    orders.unshift(newOrder);
    localStorage.setItem('nc_orders', JSON.stringify(orders));
    return simulateApiCall(newOrder);
  },

  getSellerAnalytics: async (sellerId) => {
    // Return mock analytics data
    return simulateApiCall(SELLER_ANALYTICS);
  },

  getSellerOrders: async (sellerId) => {
    const orders = getOrders();
    // Return all orders for mock dashboard visibility
    return simulateApiCall(orders);
  },
};
