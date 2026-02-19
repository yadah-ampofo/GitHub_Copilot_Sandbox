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

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <h2>${product.emoji} ${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)} ${product.unit}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    alert(`${product.name} added to cart!`);
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h2>${item.emoji} ${item.name}</h2>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Grand Total: $${total.toFixed(2)}`;
}

document.getElementById("proceed-to-checkout").addEventListener("click", () => {
    document.getElementById("cart").style.display = "none";
    document.getElementById("checkout").style.display = "block";
    renderCheckout();
});

document.getElementById("process-order").addEventListener("click", () => {
    alert("Order processed successfully!");
    cart.length = 0;
    renderCart();
    document.getElementById("checkout").style.display = "none";
    document.getElementById("products").style.display = "block";
});

function renderCheckout() {
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = "";
    cart.forEach(item => {
        const orderItem = document.createElement("div");
        orderItem.className = "cart-item";
        orderItem.innerHTML = `
            <h2>${item.emoji} ${item.name}</h2>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        orderSummary.appendChild(orderItem);
    });
}