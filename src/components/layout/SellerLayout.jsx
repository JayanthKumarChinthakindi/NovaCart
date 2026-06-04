import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiPlusCircle, FiBarChart2, FiGrid, FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

export default function SellerLayout({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/seller/dashboard', icon: FiHome },
    { label: 'Products Listed', path: '/seller/products', icon: FiBox },
    { label: 'Add New Product', path: '/seller/add-product', icon: FiPlusCircle },
    { label: 'Analytics Reports', path: '/seller/analytics', icon: FiBarChart2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col md:flex-row text-left">
      
      {/* Mobile Sidebar Toggle Header */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-205 dark:border-slate-700 shadow-sm z-30">
        <span className="font-heading font-extrabold text-lg text-slate-905 dark:text-white">
          Vendor Desk
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 cursor-pointer"
        >
          {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Navigation Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-305 ease-in-out
          w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 space-y-6">
          {/* Header Brand */}
          <div className="hidden md:flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-750">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              <FiBriefcase className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-base text-slate-850 dark:text-white">
              Vendor Hub
            </span>
          </div>

          {/* Shop Meta Info */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 rounded-xl leading-snug">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Storefront</p>
            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.storeName || 'My Merchant'}</p>
          </div>

          {/* Navigation Links list */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all
                    ${isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-slate-750 dark:text-primary-400 font-extrabold shadow-sm shadow-primary-50/10'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-750/30'
                    }
                  `}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back link at bottom */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-750 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Buyer Portal
          </Link>
        </div>
      </aside>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-20 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main content pane (flex-1) */}
      <main className="flex-1 p-6 md:p-10 space-y-6 md:max-h-screen overflow-y-auto no-scrollbar">
        {children}
      </main>

    </div>
  );
}

// Inline helper icon since standard react-icons FiBriefcase is referenced
function FiBriefcase(props) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}
