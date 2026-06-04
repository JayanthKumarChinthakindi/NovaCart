import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.newsletterEmail.value;
    if (email) {
      toast.success('Thank you! You have successfully subscribed to our newsletter.');
      e.target.reset();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800 transition-colors duration-200">
      {/* Upper Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="text-left">
            <h4 className="text-white font-heading font-bold text-xl mb-2">Join our Newsletter</h4>
            <p className="text-sm text-slate-400">Get weekly updates on hot deals, trending products, and seller tips.</p>
          </div>
          <div className="lg:col-span-2">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-3.5 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  name="newsletterEmail"
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-750 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-primary-500/20 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-left">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                <FiShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                NovaCart
              </span>
            </div>
            <p className="text-sm text-slate-450 leading-relaxed max-w-sm">
              A premium multi-vendor marketplace connecting customers with verified sellers worldwide. Shop securely and discover exceptional local products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white rounded-full transition-all"><FiFacebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white rounded-full transition-all"><FiTwitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white rounded-full transition-all"><FiInstagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white rounded-full transition-all"><FiLinkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h5 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">Shop Categories</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link to="/products?category=beauty" className="hover:text-white transition-colors">Beauty & Wellness</Link></li>
            </ul>
          </div>

          {/* Business/Seller Links */}
          <div>
            <h5 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">Sell on NovaCart</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/register?role=seller" className="hover:text-white transition-colors">Apply as Vendor</Link></li>
              <li><Link to="/seller/dashboard" className="hover:text-white transition-colors">Seller Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Partner Login</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Fulfillment by Nova</a></li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h5 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">Support & Help</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Orders</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="bg-slate-950 py-6 text-center text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} NovaCart Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Certifications</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Payment Partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
