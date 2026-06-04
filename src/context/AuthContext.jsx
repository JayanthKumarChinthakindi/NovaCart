import React, { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nc_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('nc_current_user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nc_current_user');
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      localStorage.setItem('nc_current_user', JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(user.id, updatedData);
      setUser(updatedUser);
      localStorage.setItem('nc_current_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async (address) => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = await authService.saveAddress(user.id, address);
      setUser(updatedUser);
      localStorage.setItem('nc_current_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = await authService.deleteAddress(user.id, addressId);
      setUser(updatedUser);
      localStorage.setItem('nc_current_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateProfile,
        saveAddress,
        deleteAddress,
        isAuthenticated: !!user,
        isSeller: user?.role === 'seller',
        isBuyer: user?.role === 'buyer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
