
// ================= SUPABASE CONFIGURATION =================
const SUPABASE_URL = "https://imtofnjwhvalseffdagv.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_pPCh_B1H7--pLxHaLKAwWQ_eHPAbdCx";

let supabaseClient = null;

if (window.supabase && SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_") && !SUPABASE_ANON_KEY.includes("YOUR_")) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ================= MENU DATA =================
// Original Mojito images are preserved.
const MENU = [
  { category: "Soups", icon: "fa-bowl-food", items: [
    ["Tomato Soup",130,"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&auto=format&fit=crop&q=85"],
    ["Manchow Soup",169,"https://images.unsplash.com/photo-1603105037880-880cd4edfb6d?w=700&auto=format&fit=crop&q=85"],
    ["Sweet Corn Soup",149,"https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=85"],
    ["Healthy Vegetables Soup",199,"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Munchies", icon: "fa-bowl-rice", items: [
    ["Masala Papad",140,"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=85"],
    ["French Fries",149,"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=85"],
    ["Onion Rings",169,"https://images.unsplash.com/photo-1639024471283-03518883512d?w=700&auto=format&fit=crop&q=85"],
    ["Cheese Nachos",179,"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=700&auto=format&fit=crop&q=85"],
    ["Peanut Masala",169,"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=700&auto=format&fit=crop&q=85"],
    ["Crispy Corn",199,"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=85"],
    ["Peri Peri Fries",179,"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=700&auto=format&fit=crop&q=85"],
    ["Creamy Fries",169,"https://images.unsplash.com/photo-1585109649139-366815a0d713?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Burger", icon: "fa-burger", items: [
    ["Allo Tikki Burger",69,"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85"],
    ["Crispy Veg Burger",89,"https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=85"],
    ["Paneer Burger",120,"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=85"],
    ["Nacho Cheese Burger",110,"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Sandwich", icon: "fa-bread-slice", items: [
    ["Corn Fresh Sandwich",130,"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=85"],
    ["Veg Grilled Sandwich",150,"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=85"],
    ["Veg Double Decker Sandwich",219,"https://images.unsplash.com/photo-1554471062-e5dd4695b38d?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Wrap", icon: "fa-utensils", items: [
    ["Fries Wrap",150,"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=85"],
    ["Nacho Wrap",150,"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&auto=format&fit=crop&q=85"],
    ["Veggies Wrap",140,"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&auto=format&fit=crop&q=85"],
    ["Paneer Wrap",150,"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Starter", icon: "fa-utensils", items: [
    ["Veg Spring Roll",149,"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=85"],
    ["Honey Chilli Cauliflower",210,"https://images.unsplash.com/photo-1525755662778-989d0524087e?w=700&auto=format&fit=crop&q=85"],
    ["Chilli Mushroom",230,"https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?w=700&auto=format&fit=crop&q=85"],
    ["Hara Bhara Kabab",300,"https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=85"],
    ["Tandoori Mushroom",300,"https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=85"],
    ["Tandoori Soya Chaap",220,"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=700&auto=format&fit=crop&q=85"],
    ["Malai Soya Chaap",249,"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop&q=85"],
    ["Veg Manchurian Dry",220,"https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=700&auto=format&fit=crop&q=85"],
    ["Honey Chilli Potato",200,"https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Pasta", icon: "fa-bowl-food", items: [
    ["White Sauce Pasta",189,"https://images.unsplash.com/photo-1621996346565-e3d5d6281298?w=700&auto=format&fit=crop&q=85"],
    ["Red Sauce Pasta",199,"https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=85"],
    ["Alfredo Pasta",249,"https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Pizza (Veg)", icon: "fa-pizza-slice", items: [
    ["Classic Margherita",200,"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=85",270],
    ["Double Cheese Mag",300,"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=85",400],
    ["Spicy Delight",320,"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=85",450],
    ["Perry Paneer",340,"https://images.unsplash.com/photo-1595750017130-9b3438e3e414?w=700&auto=format&fit=crop&q=85",400],
    ["Farmer Delight",350,"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700&auto=format&fit=crop&q=85",420]
  ]},
  { category: "Noodles", icon: "fa-bowl-rice", items: [
    ["Veg Noodles",220,"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=85"],
    ["Hakka Noodles",200,"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&auto=format&fit=crop&q=85"],
    ["Chilli Garlic Noodles",250,"https://images.unsplash.com/photo-1612927601601-6638404737dd?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Desserts", icon: "fa-ice-cream", items: [
    ["Choice of Ice Cream",99,"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=700&auto=format&fit=crop&q=85"],
    ["Walnut Brownie With Ice Cream",120,"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Soft Drinks", icon: "fa-glass-water", items: [
    ["Sprite",20,"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&auto=format&fit=crop&q=85"],
    ["Coke",20,"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=700&auto=format&fit=crop&q=85"],
    ["Fanta",20,"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=700&auto=format&fit=crop&q=85"],
    ["Mountain Dew",20,"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Shakes", icon: "fa-mug-hot", items: [
    ["Cold Coffee",140,"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=85"],
    ["Vanilla Shake",169,"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=700&auto=format&fit=crop&q=85"],
    ["Chocolate Shake",169,"https://images.unsplash.com/photo-1553787499-6f9133860278?w=700&auto=format&fit=crop&q=85"],
    ["Strawberry Shake",169,"https://images.unsplash.com/photo-1553177791-57f3695d9fbc?w=700&auto=format&fit=crop&q=85"],
    ["Butter Scotch",169,"https://images.unsplash.com/photo-1577805947697-89e18249d767?w=700&auto=format&fit=crop&q=85"],
    ["Kitkat Shake",149,"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700&auto=format&fit=crop&q=85"],
    ["Mango Shake",220,"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=700&auto=format&fit=crop&q=85"],
    ["Bubblegum Shake",160,"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=85"]
  ]},
  { category: "Mojito", icon: "fa-martini-glass-citrus", items: [
    ["Orange Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrqDAbzI_COp3ra8sOXS6Q0LqTYpkGUS65MFq_VhrZw&s=10"],
    ["Watermelon Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClvVGHxlBPKD8JlxsiwwjZgEMJeM_zlioLH2mIEXXGg&s=10"],
    ["Blue Berry Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BQR0dZf9u-8ijElN0UU-NRctCVEVM0JxEEdM5ix9aA&s=10"],
    ["Mango Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyzotNa-9CjeSOym-SUeaCitgni0nAahfDyy8yB6ESg&s=10"],
    ["Mint Mojito",140,"https://puffnsip.in/_next/image?url=%2Fuploads%2Fmedia_2026-10_9875870a-4313-48ea-90c6-c085afb12ac1.webp&w=1080&q=75"]
  ]},
  { category: "Coffee", icon: "fa-mug-saucer", items: [
    ["Hot Coffee",99,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3P6ktvrer8ZSkE5KImYsvAfDNb0q9WKTQTIILVFM0g&s=10"],
    ["Black Coffee",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ZRC6OXdpCFE57ibsXHt5Tou_PZGFwaCp6sBOT0HSQA&s=10"]
  ]}
];

let cart = [];
let authMode = "login";
let currentUser = null;
let phoneInput = null;

// ================= MENU RENDERING =================
function renderMenu() {
  const nav = document.getElementById("category-nav");
  const root = document.getElementById("menu-sections");
  nav.innerHTML = "";
  root.innerHTML = "";

  MENU.forEach((group, index) => {
    const id = "category-" + index;
    const pill = document.createElement("button");
    pill.className = "category-pill" + (index === 0 ? " active" : "");
    pill.type = "button";
    pill.innerHTML = `<i class="fa-solid ${group.icon}"></i><span>${escapeHTML(group.category)}</span>`;
    pill.addEventListener("click", () => {
      document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
    });
    nav.appendChild(pill);

    const section = document.createElement("section");
    section.className = "category-section";
    section.id = id;
    section.innerHTML = `<h2>${escapeHTML(group.category)}</h2><div class="menu-grid"></div>`;
    const grid = section.querySelector(".menu-grid");

    group.items.forEach(item => {
      const [name, price, image, largePrice] = item;
      const card = document.createElement("article");
      card.className = "menu-card";
      const safeName = escapeHTML(name);
      card.innerHTML = `
        <img src="${image}" alt="${safeName}" loading="lazy" referrerpolicy="no-referrer"
             onerror="this.onerror=null;this.src='https://placehold.co/700x450/eee3dc/6b161b?text='+encodeURIComponent('${safeName}')">
        <div class="item-details">
          <h3>${safeName}</h3>
          <p class="price">${largePrice ? `₹${price} / ₹${largePrice}` : `₹${price}`}</p>
          ${largePrice
            ? `<button type="button" onclick="addToCart('${safeName} (Med)', ${price})">Add Med (₹${price})</button>
               <button class="secondary" type="button" onclick="addToCart('${safeName} (Large)', ${largePrice})">Add Large (₹${largePrice})</button>`
            : `<button type="button" onclick="addToCart('${safeName}', ${price})"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>`}
        </div>`;
      grid.appendChild(card);
    });
    root.appendChild(section);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));
}

// ================= CART =================
function toggleCart() {
  const modal = document.getElementById("cart-modal");
  modal.classList.toggle("open");
  modal.setAttribute("aria-hidden", String(!modal.classList.contains("open")));
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCartUI();
}

function updateCartUI() {
  const items = document.getElementById("cart-items");
  let count = 0, total = 0;
  items.innerHTML = "";

  if (!cart.length) {
    items.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      count += item.quantity;
      total += item.price * item.quantity;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `<div><h4>${escapeHTML(item.name)}</h4><p>₹${item.price} × ${item.quantity}</p></div>
        <button class="remove-item" type="button" onclick="removeFromCart(${index})">Remove</button>`;
      items.appendChild(row);
    });
  }

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total-price").textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

async function checkout() {
  if (!cart.length) return alert("Your cart is empty!");

  if (!currentUser) {
    toggleCart();
    openAuth();
    setAuthMode("login");
    showAuthMessage("Please login before placing your order.", false);
    return;
  }

  const summary = cart.map(item => `${item.name} × ${item.quantity}`).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  alert(`Order summary:\n${summary}\n\nTotal: ₹${total}\n\nYour cart is ready. Connect an order-management/WhatsApp workflow to submit this order to the restaurant.`);

  cart = [];
  updateCartUI();
  toggleCart();
}

// ================= AUTH UI =================
function openAuth() {
  if (currentUser) {
    const choice = confirm("You are logged in. Do you want to log out?");
    if (choice) logout();
    return;
  }

  const modal = document.getElementById("auth-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setAuthMode("login");
}

function closeAuth() {
  const modal = document.getElementById("auth-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  showAuthMessage("", false);
}

function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";

  document.getElementById("signup-fields").classList.toggle("hidden", !signup);
  document.getElementById("login-tab").classList.toggle("active", !signup);
  document.getElementById("signup-tab").classList.toggle("active", signup);

  document.getElementById("auth-title").textContent = signup ? "Create your account" : "Welcome back!";
  document.getElementById("auth-subtitle").textContent = signup
    ? "Enter your details to create your Amir Cafe account."
    : "Login to continue ordering your favourites.";

  document.getElementById("auth-submit").textContent = signup ? "Create Account" : "Login";
  document.getElementById("customer-password").setAttribute("autocomplete", signup ? "new-password" : "current-password");

  showAuthMessage("", false);
}

function showAuthMessage(message, success) {
  const el = document.getElementById("auth-message");
  el.textContent = message || "";
  el.classList.toggle("success", Boolean(success));
}

function togglePassword() {
  const input = document.getElementById("customer-password");
  input.type = input.type === "password" ? "text" : "password";
}

function setBusy(busy) {
  const button = document.getElementById("auth-submit");
  button.disabled = busy;
  button.textContent = busy ? "Please wait..." : (authMode === "signup" ? "Create Account" : "Login");
}

function getPhoneNumber() {
  if (!phoneInput) throw new Error("Country selector is not ready. Please refresh the page.");

  const number = phoneInput.getNumber();

  if (!number || !phoneInput.isValidNumber()) {
    throw new Error("Please enter a valid mobile number with the correct country code.");
  }

  return number;
}

async function saveCustomerProfile(user, fullName, phone, address) {
  if (!supabaseClient || !user) return;

  const profile = {
    id: user.id,
    full_name: fullName || user.user_metadata?.full_name || "",
    phone: phone || user.phone || "",
    address: address || user.user_metadata?.address || ""
  };

  const { error } = await supabaseClient
    .from("customer_profiles")
    .upsert(profile, { onConflict: "id" });

  if (error) console.error("Profile save error:", error.message);
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  if (!supabaseClient) {
    showAuthMessage("Supabase config is missing. Add your Project URL and Publishable/anon key in script.js.", false);
    return;
  }

  setBusy(true);
  showAuthMessage("", false);

  try {
    const phone = getPhoneNumber();
    const password = document.getElementById("customer-password").value;

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    if (authMode === "signup") {
      const fullName = document.getElementById("customer-name").value.trim();
      const address = document.getElementById("customer-address").value.trim();

      if (!fullName) throw new Error("Please enter your full name.");
      if (!address) throw new Error("Please enter your delivery address.");

      const { data, error } = await supabaseClient.auth.signUp({
        phone,
        password,
        options: {
          data: {
            full_name: fullName,
            address: address
          }
        }
      });

      if (error) throw error;

      if (!data.session) {
        throw new Error("Account created, but no login session was returned. Check that Phone Confirmations are OFF in Supabase.");
      }

      currentUser = data.user;

      await saveCustomerProfile(data.user, fullName, phone, address);
      updateAccountUI(fullName);

      showAuthMessage("Account created successfully. You are now logged in.", true);
      setTimeout(closeAuth, 900);

    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        phone,
        password
      });

      if (error) throw error;

      currentUser = data.user;

      const { data: profileData } = await supabaseClient
        .from("customer_profiles")
        .select("full_name, phone, address")
        .eq("id", data.user.id)
        .maybeSingle();

      const name = profileData?.full_name ||
        data.user.user_metadata?.full_name || "Customer";

      updateAccountUI(name);

      showAuthMessage("Login successful. Welcome!", true);
      setTimeout(closeAuth, 700);
    }

  } catch (error) {
    showAuthMessage(error.message || "Something went wrong. Please try again.", false);
  } finally {
    setBusy(false);
  }
}

function updateAccountUI(name) {
  const label = document.getElementById("account-label");

  label.textContent = currentUser
    ? `Welcome, ${name || "Customer"}`
    : "Login / Register";

  document.getElementById("account-button").title =
    currentUser ? "Click to log out" : "Login or create account";
}

async function logout() {
  if (supabaseClient) {
    const { error } = await supabaseClient.auth.signOut();
    if (error) return alert(error.message);
  }

  currentUser = null;
  updateAccountUI();
}

async function initAuth() {
  const form = document.getElementById("auth-form");
  form.addEventListener("submit", handleAuthSubmit);

  const phoneElement = document.getElementById("customer-phone");

  if (window.intlTelInput) {
    phoneInput = window.intlTelInput(phoneElement, {
      initialCountry: "in",
      separateDialCode: true,
      nationalMode: true,
      autoPlaceholder: "polite",
      formatOnDisplay: true,
      preferredCountries: ["in", "bd", "us", "gb", "ae", "ca"],
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
    });
  }

  if (!supabaseClient) return;

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session?.user) {
    await restoreUser(session.user);
  }

  supabaseClient.auth.onAuthStateChange((_event, sessionNow) => {
    if (sessionNow?.user) {
      currentUser = sessionNow.user;
      const name = sessionNow.user.user_metadata?.full_name || "Customer";
      updateAccountUI(name);
    } else {
      currentUser = null;
      updateAccountUI();
    }
  });
}

async function restoreUser(user) {
  currentUser = user;

  let name = user.user_metadata?.full_name || "Customer";

  if (supabaseClient) {
    const { data } = await supabaseClient
      .from("customer_profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (data?.full_name) name = data.full_name;
  }

  updateAccountUI(name);
}

// ================= START WEBSITE =================
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  updateCartUI();
  initAuth();
});
