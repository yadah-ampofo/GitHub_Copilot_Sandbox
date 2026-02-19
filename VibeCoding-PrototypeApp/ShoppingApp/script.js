const products = [
    { id: 1, name: "Apples", description: "Fresh, crisp red apples", price: 2.99, unit: "per pound", emoji: "🍎" },
    { id: 2, name: "Bananas", description: "Sweet, ripe bananas", price: 1.29, unit: "per pound", emoji: "🍌" },
    { id: 3, name: "Oranges", description: "Juicy, tangy oranges", price: 3.49, unit: "per pound", emoji: "🍊" },
    { id: 4, name: "Strawberries", description: "Fresh, sweet strawberries", price: 4.99, unit: "per pound", emoji: "🍓" },
    { id: 5, name: "Grapes", description: "Seedless, sweet grapes", price: 2.99, unit: "per pound", emoji: "🍇" },
    { id: 6, name: "Kiwis", description: "Tangy, fresh kiwis", price: 3.99, unit: "per pound", emoji: "🥝" },
    { id: 7, name: "Peaches", description: "Juicy, sweet peaches", price: 3.49, unit: "per pound", emoji: "🍑" },
    { id: 8, name: "Melons", description: "Refreshing, sweet melons", price: 5.99, unit: "per pound", emoji: "🍈" },
    { id: 9, name: "Blueberries", description: "Fresh, sweet blueberries", price: 6.99, unit: "per pound", emoji: "🫐" },
    { id: 10, name: "Lemons", description: "Tangy, fresh lemons", price: 1.99, unit: "per pound", emoji: "🍋" }
];

const cart = [];
let currentSelectedProduct = null;

// ========== NAVIGATION MANAGEMENT ==========
function navigateTo(section) {
    document.getElementById("products").style.display = "none";
    document.getElementById("product-details").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("checkout").style.display = "none";
    document.getElementById(section).style.display = "block";
    updateNavbarActive(section);
}

function updateNavbarActive(section) {
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section}`) {
            link.classList.add("active");
        }
    });
}

// ========== PRODUCTS SECTION ==========
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-emoji">${product.emoji}</div>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)} <span>${product.unit}</span></p>
            <div class="product-actions">
                <button class="btn-primary" onclick="viewProductDetails(${product.id})">View Details</button>
                <button class="btn-secondary" onclick="addToCart(${product.id}, 1)">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// ========== PRODUCT DETAILS SECTION ==========
function viewProductDetails(productId) {
    currentSelectedProduct = products.find(p => p.id === productId);
    renderProductDetails();
    navigateTo("product-details");
}

function renderProductDetails() {
    if (!currentSelectedProduct) return;
    
    const detailsContainer = document.getElementById("product-details-content");
    detailsContainer.innerHTML = `
        <div class="product-detail-card">
            <div class="detail-emoji">${currentSelectedProduct.emoji}</div>
            <h1>${currentSelectedProduct.name}</h1>
            <p class="detail-description">${currentSelectedProduct.description}</p>
            <p class="detail-price">$${currentSelectedProduct.price.toFixed(2)} <span>${currentSelectedProduct.unit}</span></p>
            <div class="quantity-selector">
                <label for="detail-quantity">Quantity:</label>
                <input type="number" id="detail-quantity" min="1" value="1" />
            </div>
            <div class="detail-actions">
                <button class="btn-primary" onclick="addToCartFromDetails()">Add to Cart</button>
                <button class="btn-secondary" onclick="navigateTo('products')">Back to Products</button>
            </div>
        </div>
    `;
}

function addToCartFromDetails() {
    const quantity = parseInt(document.getElementById("detail-quantity").value) || 1;
    if (quantity > 0) {
        addToCart(currentSelectedProduct.id, quantity);
        alert(`${currentSelectedProduct.name} (Qty: ${quantity}) added to cart!`);
        navigateTo("products");
    }
}

// ========== SHOPPING CART SECTION ==========
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const proceedBtn = document.getElementById("proceed-to-checkout");
    
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty. <a href='#products' onclick='navigateTo(\"products\")'>Continue Shopping</a></p>";
        proceedBtn.disabled = true;
        proceedBtn.classList.add("disabled");
        cartTotal.textContent = "Grand Total: $0.00";
        return;
    }
    
    proceedBtn.disabled = false;
    proceedBtn.classList.remove("disabled");
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-header">
                <h3>${item.emoji} ${item.name}</h3>
                <button class="btn-remove" onclick="removeFromCart(${index})" title="Remove item">✕</button>
            </div>
            <p class="cart-item-price">$${item.price.toFixed(2)} ${item.unit}</p>
            <div class="cart-item-controls">
                <label for="qty-${index}">Qty:</label>
                <input type="number" id="qty-${index}" min="1" value="${item.quantity}" onchange="updateCartQuantity(${index}, this.value)" />
            </div>
            <p class="cart-item-total">Subtotal: <strong>$${itemTotal.toFixed(2)}</strong></p>
        `;
        cartItems.appendChild(cartItem);
        total += itemTotal;
    });
    
    cartTotal.innerHTML = `<h2>Grand Total: <strong>$${total.toFixed(2)}</strong></h2>`;
}

function updateCartQuantity(index, quantity) {
    const q = parseInt(quantity);
    if (q > 0) {
        cart[index].quantity = q;
        renderCart();
    } else {
        removeFromCart(index);
    }
}

function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    renderCart();
}

// ========== CHECKOUT SECTION ==========
function renderCheckout() {
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = "";
    
    if (cart.length === 0) {
        orderSummary.innerHTML = "<p class='empty-checkout'>No items to checkout. <a href='#products' onclick='navigateTo(\"products\")'>Continue Shopping</a></p>";
        return;
    }
    
    let total = 0;
    const summaryDiv = document.createElement("div");
    summaryDiv.className = "checkout-summary";
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <h3>${item.emoji} ${item.name}</h3>
            <p class="order-details">Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
            <p class="order-subtotal">$${itemTotal.toFixed(2)}</p>
        `;
        summaryDiv.appendChild(orderItem);
        total += itemTotal;
    });
    
    const totalDiv = document.createElement("div");
    totalDiv.className = "order-total";
    totalDiv.innerHTML = `<h2>Order Total: <strong>$${total.toFixed(2)}</strong></h2>`;
    summaryDiv.appendChild(totalDiv);
    
    orderSummary.appendChild(summaryDiv);
}

// ========== EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", () => {
    // Initial renders
    renderProducts();
    renderCart();
    
    // Navigation click handlers
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const section = link.getAttribute("href").substring(1);
            if (section === "cart") {
                renderCart();
            } else if (section === "checkout") {
                renderCheckout();
            }
            navigateTo(section);
        });
    });
    
    // Proceed to checkout button
    document.getElementById("proceed-to-checkout").addEventListener("click", () => {
        if (cart.length > 0) {
            renderCheckout();
            navigateTo("checkout");
        }
    });
    
    // Process order button
    document.getElementById("process-order").addEventListener("click", () => {
        alert("Order processed successfully!");
        cart.length = 0;
        renderProducts();
        renderCart();
        navigateTo("products");
    });
});