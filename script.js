let cart = [];

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    let totalCount = 0;
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: red; color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer;">X</button>
                </div>
            `;
        });
    }

    cartCount.innerText = totalCount;
    cartTotalPrice.innerText = totalPrice;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully! Thank you for ordering from Amir Cafe & Restaurant.');
    cart = [];
    updateCartUI();
    toggleCart();
}
