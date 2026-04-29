# 🌹 Velvet House - Luxury Fragrance E-Commerce Platform

## ✨ Project Overview

Velvet House is a modern, responsive e-commerce platform built with **React**, **Redux**, and **Bootstrap**. It's designed to showcase a luxury fragrance collection with an elegant and sophisticated user interface.

### Technology Stack
- **Frontend:** React 19.2.5 + Vite
- **State Management:** Redux Toolkit + React-Redux
- **Routing:** React Router DOM v7
- **Styling:** Bootstrap 5 + Custom CSS
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Icons:** React Icons

---

## 📁 Project Structure

```
Velvet House/
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── features/
│   │   ├── cart/
│   │   │   └── cartSlice.js      # Cart state management
│   │   ├── products/
│   │   │   └── productsSlice.js  # Products state management
│   │   ├── auth/
│   │   │   └── authSlice.js      # Authentication state
│   │   └── wishlist/
│   │       └── wishlistSlice.js  # Wishlist state management
│   ├── pages/
│   │   ├── Home.jsx              # Home page
│   │   ├── Products.jsx          # Products listing page
│   │   └── Cart.jsx              # Shopping cart page
│   ├── components/
│   │   ├── Header.jsx            # Navigation header
│   │   └── Footer.jsx            # Footer component
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css                   # Application styles
│   └── main.jsx                  # App entry point
├── public/                        # Static assets
├── package.json                   # Dependencies
└── vite.config.js                # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Organize project files** (if not already done):
   
   **On Windows:**
   ```bash
   organize.bat
   ```
   
   **On macOS/Linux:**
   ```bash
   bash organize.sh
   ```
   
   This script will:
   - Create the proper directory structure
   - Move all files to their correct locations
   - Update all import statements automatically

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

---

## 📦 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🎨 Design System

### Color Palette
- **Primary Purple:** `#6b3fa0`
- **Gold Accent:** `#d4af37`
- **Cream Accent:** `#f1e5d1`
- **Dark Background:** `#1a1a1a`
- **Light Text:** `#ffffff`

### Components

#### Navigation (Header)
- Responsive navbar with Bootstrap
- Links to Home, Products, Cart, and Wishlist
- Icon integration with React Icons
- Sticky positioning for easy access

#### Product Pages
- Home: Welcome section with hero text
- Products: Showcase of fragrance collection
- Cart: Shopping cart management

#### Footer
- Company information
- Quick navigation links
- Contact details
- Border decoration with gold accent

---

## 🔄 State Management (Redux)

### Slices

#### Cart Slice
- `addToCart(item)` - Add item to cart
- `removeFromCart(id)` - Remove item from cart
- `updateQuantity(id, quantity)` - Update item quantity
- `clearCart()` - Empty the entire cart

#### Products Slice
- `setProducts(items)` - Set product list
- `setLoading(bool)` - Toggle loading state
- `setError(error)` - Set error message

#### Auth Slice
- `setUser(user)` - Set authenticated user
- `logout()` - Clear user session
- `setLoading(bool)` - Toggle authentication loading

#### Wishlist Slice
- `addToWishlist(item)` - Add to wishlist
- `removeFromWishlist(id)` - Remove from wishlist
- `clearWishlist()` - Clear entire wishlist

---

## 📝 Next Steps / Features to Implement

1. **Product Details**
   - Create detailed product pages
   - Add product images, descriptions, prices
   - Implement image gallery

2. **Shopping Functionality**
   - Connect cart to backend
   - Implement checkout process
   - Add payment integration

3. **Authentication**
   - User registration/login
   - Profile management
   - Order history

4. **Advanced Features**
   - Product filtering and search
   - Reviews and ratings
   - Wishlist to cart
   - Order tracking

5. **Backend Integration**
   - Connect to API endpoints
   - Set up database
   - Implement user sessions

---

## 🌐 Responsive Design

The application is fully responsive and includes breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

All components use Bootstrap's grid system and custom media queries for optimal viewing experience across all devices.

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [React Router Documentation](https://reactrouter.com)
- [Bootstrap Documentation](https://getbootstrap.com)
- [Vite Guide](https://vite.dev)

---

## 💡 Tips

1. **Hot Module Replacement (HMR):** Vite provides instant feedback as you make changes
2. **Redux DevTools:** Install the Redux DevTools browser extension for better debugging
3. **Bootstrap Utilities:** Leverage Bootstrap's utility classes for quick styling
4. **Component Reusability:** Keep components small and focused for better maintainability

---

## 📞 Support

For issues or questions, refer to the documentation files or create detailed error logs when debugging.

---

**Happy coding! 🚀**

Last Updated: 2026-04-29
