let cart = [];

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartUI();
    alert(itemName + " has been added to your cart!");
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    
    let summaryDiv = document.getElementById("cart-summary");
    if (cart.length === 0) {
        summaryDiv.innerHTML = "No items selected yet.";
    } else {
        let total = 0;
        let html = "<ul>";
        cart.forEach(item => {
            html += `<li>${item.name} - ₹${item.price}</li>`;
            total += item.price;
        });
        html += `</ul><hr><p><b>Total Amount: ₹${total}</b></p>`;
        summaryDiv.innerHTML = html;
    }
}

function submitOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("Please add at least one item to your cart before ordering!");
        return;
    }
    
    let name = document.getElementById("fname").value;
    let phone = document.getElementById("phone").value;
    
    alert("Thank you, " + name + "! Your order has been successfully placed and will be delivered to your phone (" + phone + ").");
    
    // Reset form and cart
    cart = [];
    document.getElementById("checkout-form").reset();
    updateCartUI();
}
