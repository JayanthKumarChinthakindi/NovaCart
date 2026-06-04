import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiShoppingCart, FiHeart, FiUser, FiSearch, FiSun, FiMoon, 
  FiMenu, FiX, FiChevronDown, FiLogOut, FiShoppingBag, FiBriefcase 
} from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout, isSeller } = useContext(AuthContext);
  const { itemsCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Sync search input with URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = () => setIsProfileDropdownOpen(false);
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  const isSellerRoute = location.pathname.startsWith('/seller');

  return (
    <nav className="sticky top-0 z-40 w-full glass shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-primary-500/35">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-heading font-extrabold text-2xl bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">
              NovaCart
            </span>
          </Link>

          {/* Search Bar - Hidden on seller routes */}
          {!isSellerRoute && (
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-lg transition-all dark:text-white"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-primary-600 transition-colors cursor-pointer">
                <FiSearch className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Right Actions Menu */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Buyer Mode Links */}
            {!isSellerRoute ? (
              <>
                <Link to="/products" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Shop
                </Link>

                {/* Wishlist */}
                <Link to="/wishlist" className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
                  <FiHeart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link to="/cart" className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
                  <FiShoppingCart className="w-5 h-5" />
                  {itemsCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-primary-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {itemsCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              // Seller Mode Links
              <Link to="/products" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5">
                <FiShoppingBag className="w-4 h-4" /> Switch to Buyer
              </Link>
            )}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="text-left hidden lg:block leading-none">
                    <p className="text-xs font-bold text-slate-850 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-slate-105 dark:border-slate-700">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <FiUser className="w-4 h-4" /> Profile Details
                    </Link>
                    {user.role === 'buyer' ? (
                      <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <FiShoppingBag className="w-4 h-4" /> Order History
                      </Link>
                    ) : (
                      <Link to="/seller/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <FiBriefcase className="w-4 h-4" /> Seller Dashboard
                      </Link>
                    )}
                    {isSeller && !isSellerRoute && (
                      <Link to="/seller/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-slate-700/50 transition-colors">
                        <FiBriefcase className="w-4 h-4" /> Seller Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left cursor-pointer"
                    >
                      <FiLogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-md shadow-primary-200/50 dark:shadow-none transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3">
          
          {/* Search in mobile */}
          {!isSellerRoute && (
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary-500 rounded-lg dark:text-white"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-slate-400 cursor-pointer">
                <FiSearch className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="space-y-1">
            {!isSellerRoute ? (
              <>
                <Link to="/products" className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Shop
                </Link>
                <Link to="/wishlist" className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="flex items-center gap-2"><FiHeart className="w-5 h-5" /> Wishlist</span>
                  {wishlistItems.length > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{wishlistItems.length}</span>}
                </Link>
                <Link to="/cart" className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span className="flex items-center gap-2"><FiShoppingCart className="w-5 h-5" /> Shopping Cart</span>
                  {itemsCount > 0 && <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">{itemsCount}</span>}
                </Link>
              </>
            ) : (
              <Link to="/products" className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Switch to Buyer Mode
              </Link>
            )}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white leading-none">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                
                <Link to="/profile" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Profile Details
                </Link>
                {user.role === 'buyer' ? (
                  <Link to="/orders" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Order History
                  </Link>
                ) : (
                  <Link to="/seller/dashboard" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Seller Dashboard
                  </Link>
                )}
                {isSeller && !isSellerRoute && (
                  <Link to="/seller/dashboard" className="block px-3 py-2 rounded-lg text-base font-medium text-primary-600 dark:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left cursor-pointer"
                >
                  <FiLogOut className="w-5 h-5" /> Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-3 pt-1">
                <Link
                  to="/login"
                  className="px-4 py-2 text-center text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-55"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-center text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}
