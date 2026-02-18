# Product Requirements Document (PRD)
## E-Commerce Web Application Prototype

---

## 1. Product Overview
**Purpose:**  
A lightweight, client-side web application for an online fruit shop. This prototype demonstrates core e-commerce functionality including browsing a fruit product catalog, viewing detailed product information, managing a shopping cart, and completing a checkout process.

**Target Products:** Fresh fruits with details about pricing per unit (items, ounces, pounds, etc.)  
**Application Type:** Single-page application (SPA) with client-side navigation  
**Technology Stack:** HTML, CSS, JavaScript (vanilla)  
**Scope:** Prototype/MVP focusing on essential features and user flows

---

## 2. Target Audience
- **Primary Users:** Online shoppers interested in ordering fresh fruit products
- **Device Platforms:** Desktop computers and mobile phones (responsive scaling for both large and small screens)
- **Use Case Context:** Users browsing fruit products, selecting desired quantities, managing cart items, and completing purchases
- **Technical Assumptions:** Users have modern web browsers with JavaScript enabled

---

## 3. Key Features

### 3.1 Core Features
1. **Products Page**
   - Display list of 10 fruit products with product name, price per unit, and emoji image
   - Quantity selector to choose desired quantity
   - "Add to Cart" button for each product
   - Product name and emoji act as clickable links to ProductDetails page

2. **ProductDetails Page**
   - Display product name, full description, price per unit, and emoji image
   - Quantity selector for ordering
   - "Add to Cart" button
   - "Back to Products" button or link to return to Products page

3. **ShoppingCart Page**
   - Display table/list of cart items with product name, quantity ordered, and total price per product
   - Ability to update quantity for each item
   - Remove button for each item
   - Display grand total price for entire order
   - "Proceed to Checkout" button
   - Display message when cart is empty

4. **Checkout Page**
   - Display order summary showing product name, quantity, and price for each item
   - Clearly display the total price for the entire order
   - "Process Order" button to simulate order completion
   - Success/confirmation message after processing
   - Option to continue shopping or return to Products page

### 3.2 Navigation System
- **Left-side navigation menu** on all pages with links to: Products, ProductDetails, ShoppingCart, and Checkout
- Navigation menu text displays full names on normal screen widths
- Navigation menu collapses to display 1-2 letter abbreviations when screen width drops below 300 pixels
- Active page indicator in navigation menu
- Navigation is persistent and accessible from all pages

---

## 4. User Workflows

### Workflow 1: Browse Products
1. User lands on Products page
2. User views product list
3. User clicks on product to view details

### Workflow 2: View Product Details & Add to Cart
1. User views product details page
2. User reviews product information
3. User adds item to cart (with quantity selection)
4. Confirmation message displayed
5. User returns to products or proceeds to cart

### Workflow 3: Manage Shopping Cart
1. User navigates to Shopping Cart
2. User views all cart items
3. User can update quantities or remove items
4. Cart total updates dynamically
5. User proceeds to checkout

### Workflow 4: Complete Purchase
1. User navigates to Checkout
2. User fills in basic information (name, email, address)
3. User reviews order summary
4. User confirms purchase
5. User sees confirmation message

---

## 5. Sample Dataset
**Product Catalog: 10 Fruit Products**

Each product includes:
- Product ID (unique identifier)
- Product Name
- Description (brief details about the fruit)
- Price per Unit (with unit type: e.g., per pound, per dozen, per ounce)
- Emoji Image (simple emoji representation of the fruit)

**Required Fruit Products:**
1. 🍎 Apples
2. 🍌 Bananas
3. 🍊 Oranges
4. 🍓 Strawberries
5. 🍇 Grapes
6. 🥝 Kiwis
7. 🍑 Peaches
8. 🍈 Melons
9. 🫐 Blueberries
10. 🍋 Lemons

**Dataset Format Example:**
```javascript
{
  id: 1,
  name: "Apples",
  description: "Fresh, crisp red apples sourced from local orchards",
  price: 2.99,
  unit: "per pound",
  emoji: "🍎"
}
```

---

## 6. Technical Requirements

### 6.1 Architecture
- **Frontend Framework:** Vanilla JavaScript (no external frameworks required)
- **State Management:** Client-side storage (localStorage for persisting cart data)
- **Styling:** CSS (custom stylesheets, no CSS framework required)
- **Navigation:** Client-side routing or hash-based routing
- **Responsive Design:** Dynamic UI that scales automatically for desktop and mobile screens

### 6.2 Page Structure
- **Main Layout:** All pages include a left-side navigation sidebar
- **Products Page (`index.html` or `products.html`):** Product grid/list with prices, emoji, and add-to-cart options
- **ProductDetails Page (`product-details.html`):** Individual detailed product view with description
- **ShoppingCart Page (`cart.html`):** Cart management interface with item list and totals
- **Checkout Page (`checkout.html`):** Order summary and confirmation interface
- **Left Navigation Sidebar:** Persistent navigation menu with collapsible behavior for responsive scaling

### 6.3 Functionality Requirements
- Cart persistence (data survives page refreshes using localStorage)
- Dynamic content rendering (products and cart items rendered via JavaScript)
- Form validation (basic validation on checkout form if applicable)
- Error handling (graceful handling of missing data)
- **Responsive scaling:** UI automatically adjusts to display correctly on both large screens (desktop) and small screens (mobile phones)
- **Left navigation responsiveness:** Navigation menu collapses below 300px screen width to show 1-2 letter abbreviations
- Quantity management (users can select and adjust quantities before adding to cart)
- Cart operations (add items, update quantities, remove items)

### 6.4 Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript ES6+ support required

---

## 7. Design & Styling Guidelines

### 7.1 Visual Design
- **Theme:** Clean, modern, minimalist
- **Color Palette:** Primary color (e.g., blue), Neutral colors (grays, whites), Accent colors for CTAs
- **Typography:** Sans-serif font family (e.g., Arial, Roboto, or system fonts)
- **Spacing:** Consistent margins and padding throughout

### 7.2 Components
- Product cards displaying emoji, name, price, and quantity selector
- Left-side navigation menu with full labels (desktop) and abbreviations (mobile: width < 300px)
- Add to Cart buttons with clear visual states
- Quantity input fields (spinners or text inputs)
- Shopping cart item rows with product details and edit/delete options
- Order summary section on checkout page
- "Process Order" button as primary CTA
- Cart total and item count displays

### 7.3 User Experience
- Clear call-to-action buttons
- Confirmation feedback (e.g., "Item added to cart" message)
- Loading states (if applicable)
- Empty states (e.g., "No items in cart" message)

---

## 8. Success Criteria (Prototype)
- [ ] All four pages (Products, ProductDetails, ShoppingCart, Checkout) are functional
- [ ] Left-side navigation menu allows seamless navigation between all pages
- [ ] Products page displays all 10 fruit products with names, prices, and emoji images
- [ ] Users can select quantity and add items to cart from Products and ProductDetails pages
- [ ] ShoppingCart page displays cart items with quantity and total price per item
- [ ] Users can update quantities and remove items from the cart
- [ ] Cart data persists across page refreshes using localStorage
- [ ] Checkout page displays order summary with total price
- [ ] Left-side navigation collapses to abbreviations at screen width below 300px
- [ ] UI scales dynamically and displays correctly on both desktop and mobile screens
- [ ] Basic styling creates a visually appealing interface
- [ ] Application runs without console errors

---

## 9. Out of Scope (Future Enhancements)
- Payment gateway integration
- User authentication/accounts
- Product search and advanced filtering
- Inventory management
- Order history/persistence
- Backend API integration
- User account system
- Admin interface
- Email confirmations
- Advanced styling or animations

---

## 10. Assumptions & Notes
- All 10 fruit products use simple emoji representations (no external image files needed)
- No backend or server required—all processing is client-side
- No real payment processing—checkout simply confirms and displays the order summary
- Cart data is stored in browser's localStorage only (not persisted across different browsers or devices)
- Basic styling is sufficient—doesn't need to be production-quality or fully polished
- Responsive scaling achieved through CSS media queries (basic desktop and mobile optimization)
- This is a learning/prototype project to demonstrate core e-commerce concepts and vibe coding approach
- Navigation abbreviations for mobile: Consider using first 1-2 letters (e.g., "Pr" for Products, "PD" for ProductDetails, "SC" for ShoppingCart, "CO" for Checkout)