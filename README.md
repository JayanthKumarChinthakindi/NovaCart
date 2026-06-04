# NovaCart – SaaS-Grade Multi-Vendor E-Commerce Platform

NovaCart is a high-performance, fully responsive, and visually stunning multi-vendor e-commerce platform frontend built using **React (Vite)**, **Tailwind CSS v4**, and **Context API**. 

Designed to mimic a production SaaS application, NovaCart supports dual-portal workflows catering to both **Buyers (Customers)** looking to purchase items and **Sellers (Business Users)** managing inventory, stock levels, and store analytics.

---

## 🚀 Live Demo & Screenshots

* **Live Demo:** [Deploy Placeholder - Netlify link goes here]
* **Demo Credentials:**
  * **Buyer Portal:** `buyer@novacart.com` / `password123`
  * **Seller Portal:** `seller@novacart.com` / `password123`

---

## ✨ Features

### 🛒 Buyer Experience
* **Dynamic Catalog:** Browse products with instant searches, category selections, ratings, price ranges, and sorting (price low-high, high-low, newest, and popularity).
* **Interactive Cart & Wishlist:** Real-time quantity counters, coupon code applications (`WELCOME10`, `MEGA20`, `FREESHIP`), sales tax estimations, and direct wishlist-to-cart migration.
* **Product Details & Gallery:** Category-linked related products suggestions and custom star average recalculations upon customer review submissions.
* **Multi-Step Checkout Wizard:** Step-by-step checkout progress:
  * **Step 1:** Shipping address selection (saved address book vs. validated new address).
  * **Step 2:** Payment methods (Credit card regex, UPI validator, or Cash on Delivery).
  * **Step 3:** Final Order review.
  * **Step 4:** Transaction confirmation and Order ID receipt.

### 📊 Seller Dashboard
* **KPI Statistics:** Visual tiles tracking Total Revenue, Total Orders, Active products, and customer counts.
* **Interactive Recharts Analytics:**
  * **Revenue Trend:** Linear area gradient plotting monthly earnings.
  * **Monthly Sales:** Bar charts displaying volume sales.
  * **Category Distribution:** Pie charts detailing department sales shares.
* **Product Inventory Management (CRUD):** Complete interface to list new products (with category-based placeholder images), modify prices, manage stock quantities, or delete listings.

---

## 🛠️ Tech Stack
* **Core:** React.js (Vite) & JavaScript (ES6+)
* **Styling:** Tailwind CSS v4 & React Icons
* **Routing:** React Router DOM (with route-based lazy splitting)
* **Forms:** React Hook Form & React Toastify notifications
* **Charts:** Recharts
* **State Management:** Context API
* **API Layer:** Axios client (integrated with latency-simulated service layer)

---

## 📂 Folder Structure

```
src/
├── assets/           # Media files & brand logos
├── components/
│   ├── common/       # Reusable components: Button, Input, Modal, Rating, SkeletonLoader
│   ├── layout/       # App wrappers: Navbar, Footer, ProtectedRoute, SellerLayout
│   ├── product/      # ProductCard, ProductFilters
│   ├── cart/         # CartItem, CartSummary
│   └── checkout/     # AddressForm, PaymentForm, OrderSummary
├── pages/
│   ├── Home/         # Hero banner, Categories, Flash Sales
│   ├── Products/     # Product Catalog & Details Page
│   ├── Cart/         # Interactive Cart Page
│   ├── Wishlist/     # Saved Items Page
│   ├── Checkout/     # Multi-step checkout wizard
│   ├── Auth/         # Tabbed Login & Registration
│   ├── Profile/      # Profiles updates, Addresses CRUD, and Timelined Order histories
│   └── Seller/       # Vendor dashboard overview, Products inventory, Add/Edit forms, Analytics
├── routes/           # AppRoutes mapping lazy loaded chunks
├── context/          # React Contexts (Theme, Auth, Cart, Wishlist)
├── hooks/            # Custom Hooks (useLocalStorage, useAuth, useCart, useWishlist, useDebounce)
├── services/         # Mock Services matching standard backend API patterns
├── styles/           # CSS configs & global tailwind imports
├── App.jsx           # Main provider wrapper & layout switcher
└── main.jsx          # Entry point mounting StrictMode
```

---

## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JayanthKumarChinthakindi/NovaCart.git
   cd NovaCart
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Compile the production build:**
   ```bash
   npm run build
   ```

---

## 🌍 Deployment Steps (Netlify)

1. Run `npm run build` to generate the production `dist/` directory.
2. The built project is fully ready for client-side routing on site refreshes thanks to the `public/_redirects` file which maps:
   ```
   /*    /index.html   200
   ```
3. Drag-and-drop the generated `dist` folder into the Netlify Drop dashboard, or push the repository to GitHub and connect it for automatic Git-based CI/CD deploys.

