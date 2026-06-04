import { simulateApiCall } from './api';
import { MOCK_USERS } from './mockData';

const getUsers = () => {
  const users = localStorage.getItem('nc_users');
  if (!users) {
    localStorage.setItem('nc_users', JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  }
  return JSON.parse(users);
};

export const authService = {
  login: async (email, password) => {
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userWithoutPassword } = user;
    return simulateApiCall(userWithoutPassword);
  },

  register: async (userData) => {
    const users = getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      throw new Error('Email is already registered');
    }
    const newUser = {
      id: Date.now(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role || 'buyer',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80`,
      addresses: [],
      wishlist: [],
      storeName: userData.role === 'seller' ? userData.storeName : undefined,
      description: userData.role === 'seller' ? userData.description : undefined,
    };
    users.push(newUser);
    localStorage.setItem('nc_users', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = newUser;
    return simulateApiCall(userWithoutPassword);
  },

  updateProfile: async (userId, updatedData) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    users[index] = { ...users[index], ...updatedData };
    localStorage.setItem('nc_users', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = users[index];
    return simulateApiCall(userWithoutPassword);
  },

  saveAddress: async (userId, address) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const user = users[index];
    if (!user.addresses) user.addresses = [];
    
    if (address.id) {
      // Edit
      user.addresses = user.addresses.map((addr) => 
        addr.id === address.id ? { ...addr, ...address } : addr
      );
    } else {
      // Add
      const newAddress = { ...address, id: Date.now() };
      if (address.isDefault) {
        user.addresses = user.addresses.map((addr) => ({ ...addr, isDefault: false }));
      }
      user.addresses.push(newAddress);
    }

    users[index] = user;
    localStorage.setItem('nc_users', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = user;
    return simulateApiCall(userWithoutPassword);
  },

  deleteAddress: async (userId, addressId) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const user = users[index];
    user.addresses = (user.addresses || []).filter((addr) => addr.id !== addressId);
    
    users[index] = user;
    localStorage.setItem('nc_users', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = user;
    return simulateApiCall(userWithoutPassword);
  }
};
