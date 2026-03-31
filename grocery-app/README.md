# 🌷 Forever Fresh - Grocery Store App

A modern, responsive React-based e-commerce platform for fresh groceries with home delivery. Built with Vite, React Router, and modern CSS.

## Features

- 🏠 **Home Page** - Hero section with featured product categories and latest items
- 📱 **Product Categories** - Browse Fruits, Vegetables, and Dairy products
- 🔍 **Product Details** - Detailed view for each product with pricing and descriptions
- 🚚 **Services** - Fast delivery, subscription boxes, and store pickup options
- ℹ️ **About Us** - Company mission and features
- 📞 **Contact** - Get in touch with our team
- 💌 **Newsletter** - Subscribe to seasonal offers and updates
- 🎨 **Responsive Design** - Fully optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: React 19.2.4
- **Bundler**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.0
- **Styling**: CSS (with responsive design)
- **Icons**: Font Awesome 6.4.0

## Project Structure

```
grocery-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer with links and newsletter
│   │   ├── Hero.jsx            # Hero section
│   │   ├── Navbar.css          # Navbar styles
│   │   └── Hero.css            # Hero styles
│   ├── pages/
│   │   ├── Home.jsx            # Home page with categories & featured products
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Services.jsx        # Services page
│   │   ├── CategoryPage.jsx    # Category-based product listing
│   │   └── ProductDetail.jsx   # Product detail page
│   ├── Data/
│   │   ├── categories.js       # Category data with images
│   │   └── products.js         # Product data
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   └── vite.config.js          # Vite configuration
├── public/
│   └── index.html              # Static HTML
├── package.json                # Dependencies and scripts
└── README.md                   # This file

```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/honey-js/forever-fresh-grocery.git
cd forever-fresh-grocery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5175/`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with categories and featured products |
| `/about` | About the company |
| `/services` | Our services (delivery, subscriptions, pickup) |
| `/contact` | Contact information |
| `/category/:category` | Products filtered by category (fruits, vegetables, dairy) |
| `/product/:id` | Detailed view for a specific product |

## Features Breakdown

### 🏠 Home Page
- Hero banner with CTA
- Category cards with images and quick navigation
- Featured product grid with "View More" buttons

### 📦 Product Pages
- **Category Page**: Displays all products in a selected category
- **Product Detail**: Full product information with image, price, description, and action buttons

### 🛍️ Services
Cards showcasing:
- Fast home delivery
- Weekly/monthly subscription boxes
- In-store pickup options

### 👥 About Us
- Company mission and values
- Key features (Fresh Quality, Fast Delivery, Sustainable)
- Why customers love us

## Product Data

Products include:
- **Fruits**: Apples, Bananas (with live prices and units)
- **Vegetables**: Carrots, Spinach
- **Dairy**: Milk, Cheese

All products feature:
- High-quality images from Unsplash/iStock
- Pricing per unit
- Category classification

## Styling

Global styles (`index.css`) include:
- Responsive grid layouts
- Color scheme: Green (`#2e7d32`) primary, white background
- Hover effects on cards
- Mobile-first responsive design
- Button, footer, and component-specific styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- 🛒 Shopping cart functionality
- 💳 Checkout and payment integration
- 👤 User authentication and profiles
- ⭐ Product reviews and ratings
- 🔐 Admin dashboard
- 📦 Order tracking
- 🎯 Personalized recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created with ❤️ for fresh food lovers.

---

**Ready to order fresh groceries?** Visit [Forever Fresh](http://localhost:5175/) today!
