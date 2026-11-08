// ==========================================
// AMIR CAFE & RESTAURANT - JAVASCRIPT
// Supabase Phone + Password Authentication
// No SMS OTP
// ==========================================

// SUPABASE CONFIGURATION
const SUPABASE_URL = "https://imtofnjwhvalseffdagv.supabase.co/rest/v1/";

// এখানে তোমার Supabase Publishable / anon key বসাবে
const SUPABASE_ANON_KEY = "sb_publishable_pPCh_B1H7--pLxHaLKAwWQ_eHPAbdCx";

let supabaseClient = null;

if (
    window.supabase &&
    !SUPABASE_ANON_KEY.includes("PASTE_YOUR_")
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
}


// ==========================================
// COUNTRY CODE DATABASE
// ==========================================

const COUNTRY_CODES = `
af:93 al:355 dz:213 as:1684 ad:376 ao:244 ai:1264 ag:1268
ar:54 am:374 aw:297 au:61 at:43 az:994
bs:1242 bh:973 bd:880 bb:1246 by:375 be:32 bz:501
bj:229 bm:1441 bt:975 bo:591 ba:387 bw:267 br:55
io:246 vg:1284 bn:673 bg:359 bf:226 bi:257
kh:855 cm:237 ca:1 cv:238 ky:1345 cf:236 td:235
cl:56 cn:86 co:57 km:269 cg:242 cd:243 ck:682
cr:506 ci:225 hr:385 cu:53 cw:599 cy:357 cz:420
dk:45 dj:253 dm:1767 do:1809 ec:593 eg:20
sv:503 gq:240 er:291 ee:372 et:251
fk:500 fo:298 fj:679 fi:358 fr:33 gf:594 pf:689
ga:241 gm:220 ge:995 de:49 gh:233 gi:350 gr:30
gl:299 gd:1473 gp:590 gu:1671 gt:502 gg:44
gn:224 gw:245 gy:592 ht:509 hn:504 hk:852
hu:36 is:354 in:91 id:62 ir:98 iq:964
ie:353 im:44 il:972 it:39 jm:1876 jp:81 je:44
jo:962 kz:7 ke:254 ki:686 kw:965 kg:996
la:856 lv:371 lb:961 ls:266 lr:231 ly:218
li:423 lt:370 lu:352 mo:853 mk:389 mg:261
mw:265 my:60 mv:960 ml:223 mt:356 mh:692
mq:596 mr:222 mu:230 yt:262 mx:52 fm:691
md:373 mc:377 mn:976 me:382 ms:1664 ma:212 mz:258
mm:95 na:264 nr:674 np:977 nl:31 nc:687 nz:64
ni:505 ne:227 ng:234 nu:683 nf:672 kp:850
mp:1670 no:47 om:968 pk:92 pw:680 ps:970
pa:507 pg:675 py:595 pe:51 ph:63 pl:48
pt:351 pr:1787 qa:974 re:262 ro:40 ru:7 rw:250
bl:590 sh:290 kn:1869 lc:1758 mf:590 pm:508
vc:1784 ws:685 sm:378 st:239 sa:966 sn:221
rs:381 sc:248 sl:232 sg:65 sx:1721 sk:421
si:386 sb:677 so:252 za:27 kr:82 ss:211
es:34 lk:94 sd:249 sr:597 sz:268 se:46
ch:41 sy:963 tw:886 tj:992 tz:255 th:66
tl:670 tg:228 tk:690 to:676 tt:1868 tn:216
tr:90 tm:993 tc:1649 tv:688 vi:1340 ug:256
ua:380 ae:971 gb:44 us:1 uy:598 uz:998
vu:678 va:39 ve:58 vn:84 wf:681 ye:967
zm:260 zw:263
`.trim().split(/\s+/).map(item => {
    const [iso, dial] = item.split(":");
    return { iso, dial };
});

const displayNames =
    typeof Intl !== "undefined" && Intl.DisplayNames
        ? new Intl.DisplayNames(["en"], { type: "region" })
        : null;

function flagFor(iso) {
    return String.fromCodePoint(
        ...iso.toUpperCase().split("").map(
            char => 127397 + char.charCodeAt(0)
        )
    );
}

const COUNTRIES = COUNTRY_CODES.map(country => ({
    ...country,
    name:
        (displayNames &&
            displayNames.of(country.iso.toUpperCase())) ||
        country.iso.toUpperCase(),
    flag: flagFor(country.iso)
})).sort((a, b) => a.name.localeCompare(b.name));

let selectedCountry =
    COUNTRIES.find(country => country.iso === "in") ||
    COUNTRIES[0];

let cart = [];
let authMode = "login";
let currentUser = null;


// ==========================================
// RESTAURANT MENU
// ==========================================

const MENU = [

{
category: "Soups",
icon: "fa-bowl-food",
items: [
["Tomato Soup",130,"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700"],
["Manchow Soup",169,"https://images.unsplash.com/photo-1603105037880-880cd4edfb6d?w=700"],
["Sweet Corn Soup",149,"https://images.unsplash.com/photo-1547592180-85f173990554?w=700"],
["Healthy Vegetables Soup",199,"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"]
]},

{
category: "Munchies",
icon: "fa-bowl-rice",
items: [
["Masala Papad",140,"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700"],
["French Fries",149,"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700"],
["Onion Rings",169,"https://images.unsplash.com/photo-1639024471283-03518883512d?w=700"],
["Cheese Nachos",179,"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=700"],
["Peanut Masala",169,"https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=700"],
["Crispy Corn",199,"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700"],
["Peri Peri Fries",179,"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=700"],
["Creamy Fries",169,"https://images.unsplash.com/photo-1585109649139-366815a0d713?w=700"]
]},

{
category: "Burger",
icon: "fa-burger",
items: [
["Allo Tikki Burger",69,"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700"],
["Crispy Veg Burger",89,"https://images.unsplash.com/photo-1550547660-d9450f859349?w=700"],
["Paneer Burger",120,"https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700"],
["Nacho Cheese Burger",110,"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700"]
]},

{
category: "Sandwich",
icon: "fa-bread-slice",
items: [
["Corn Fresh Sandwich",130,"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700"],
["Veg Grilled Sandwich",150,"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700"],
["Veg Double Decker Sandwich",219,"https://images.unsplash.com/photo-1554471062-e5dd4695b38d?w=700"]
]},

{
category: "Wrap",
icon: "fa-utensils",
items: [
["Fries Wrap",150,"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700"],
["Nacho Wrap",150,"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700"],
["Veggies Wrap",140,"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700"],
["Paneer Wrap",150,"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700"]
]},

{
category: "Starter",
icon: "fa-utensils",
items: [
["Veg Spring Roll",149,"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700"],
["Honey Chilli Cauliflower",210,"https://images.unsplash.com/photo-1525755662778-989d0524087e?w=700"],
["Chilli Mushroom",230,"https://images.unsplash.com/photo-151500319-7210-e0cd7184f8b5?w=700"],
["Hara Bhara Kabab",300,"https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700"],
["Tandoori Mushroom",300,"https://images.unsplash.com/photo-1544025162-d76694265947?w=700"],
["Tandoori Soya Chaap",220,"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=700"],
["Malai Soya Chaap",249,"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700"],
["Veg Manchurian Dry",220,"https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=700"],
["Honey Chilli Potato",200,"https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=700"]
]},

{
category: "Pasta",
icon: "fa-bowl-food",
items: [
["White Sauce Pasta",189,"https://images.unsplash.com/photo-1621996346565-e3d5d6281298?w=700"],
["Red Sauce Pasta",199,"https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700"],
["Alfredo Pasta",249,"https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=700"]
]},

{
category: "Pizza (Veg)",
icon: "fa-pizza-slice",
items: [
["Classic Margherita",200,"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700",270],
["Double Cheese Mag",300,"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",400],
["Spicy Delight",320,"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700",450],
["Perry Paneer",340,"https://images.unsplash.com/photo-1595750017130-9b3438e3e414?w=700",400],
["Farmer Delight",350,"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700",420]
]},

{
category: "Noodles",
icon: "fa-bowl-rice",
items: [
["Veg Noodles",220,"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700"],
["Hakka Noodles",200,"https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700"],
["Chilli Garlic Noodles",250,"https://images.unsplash.com/photo-1612927601601-6638404737dd?w=700"]
]},

{
category: "Desserts",
icon: "fa-ice-cream",
items: [
["Choice of Ice Cream",99,"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=700"],
["Walnut Brownie With Ice Cream",120,"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700"]
]},

{
category: "Soft Drinks",
icon: "fa-glass-water",
items: [
["Sprite",20,"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700"],
["Coke",20,"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=700"],
["Fanta",20,"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=700"],
["Mountain Dew",20,"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=700"]
]},

{
category: "Shakes",
icon: "fa-mug-hot",
items: [
["Cold Coffee",140,"https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700"],
["Vanilla Shake",169,"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=700"],
["Chocolate Shake",169,"https://images.unsplash.com/photo-1553787499-6f9133860278?w=700"],
["Strawberry Shake",169,"https://images.unsplash.com/photo-1553177791-57f3695d9fbc?w=700"],
["Butter Scotch",169,"https://images.unsplash.com/photo-1577805947697-89e18249d767?w=700"],
["Kitkat Shake",149,"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700"],
["Mango Shake",220,"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=700"],
["Bubblegum Shake",160,"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700"]
]},

{
category: "Mojito",
icon: "fa-martini-glass-citrus",
items: [
["Orange Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrqDAbzI_COp3ra8sOXS6Q0LqTYpkGUS65MFq_VhrZw&s=10"],
["Watermelon Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClvVGHxlBPKD8JlxsiwwjZgEMJeM_zlioLH2mIEXXGg&s=10"],
["Blue Berry Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BQR0dZf9u-8ijElN0UU-NRctCVEVM0JxEEdM5ix9aA&s=10"],
["Mango Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyzotNa-9CjeSOym-SUeaCitgni0nAahfDyy8yB6ESg&s=10"],
["Mint Mojito",140,"https://puffnsip.in/_next/image?url=%2Fuploads%2Fmedia_2026-10_9875870a-4313-48ea-90c6-c085afb12ac1.webp&w=1080&q=75"]
]},

{
category: "Coffee",
icon: "fa-mug-saucer",
items: [
["Hot Coffee",99,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3P6ktvrer8ZSkE5KImYsvAfDNb0q9WKTQTIILVFM0g&s=10"],
["Black Coffee",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ZRC6OXdpCFE57ibsXHt5Tou_PZGFwaCp6sBOT0HSQA&s=10"]
]}

];


// ==========================================
// HELPER FUNCTIONS
// ==========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}


// ==========================================
// COUNTRY SELECTOR
// ==========================================

function renderCountryList(search = "") {

    const list = document.getElementById("country-list");
    const query = search.trim().toLowerCase();

    if (!list) return;

    const found = COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(query) ||
        country.dial.includes(query.replace("+", "")) ||
        country.iso.toLowerCase().includes(query)
    );

    list.innerHTML = "";

    if (!found.length) {
        list.innerHTML =
            '<div class="country-empty">No country found</div>';
        return;
    }

    found.forEach(country => {

        const item = document.createElement("button");

        item.type = "button";
        item.className = "country-option";

        item.innerHTML = `
            <span>${country.flag}</span>
            <span>${escapeHTML(country.name)}</span>
            <span>+${country.dial}</span>
        `;

        item.addEventListener("click", () => {
            selectCountry(country);
            toggleCountryMenu(false);
        });

        list.appendChild(item);
    });
}


function selectCountry(country) {

    selectedCountry = country;

    document.getElementById("selected-flag").textContent =
        country.flag;

    document.getElementById("selected-dial").textContent =
        "+" + country.dial;
}


function toggleCountryMenu(force) {

    const menu = document.getElementById("country-menu");
    const button = document.getElementById("country-trigger");

    if (!menu || !button) return;

    const open =
        typeof force === "boolean"
            ? force
            : menu.classList.contains("hidden");

    menu.classList.toggle("hidden", !open);

    button.setAttribute("aria-expanded", String(open));

    if (open) {
        document.getElementById("country-search").value = "";
        renderCountryList();
        document.getElementById("country-search").focus();
    }
}


// ==========================================
// PHONE NUMBER VALIDATION
// ==========================================

function getPhoneNumber() {

    const raw =
        document.getElementById("customer-phone").value.trim();

    let digits = raw.replace(/\D/g, "");

    if (!digits) {
        throw Error("Please enter your mobile number.");
    }

    // Detect country code if user enters number with +
    if (raw.startsWith("+")) {

        const match = [...COUNTRIES]
            .sort((a, b) => b.dial.length - a.dial.length)
            .find(country => digits.startsWith(country.dial));

        if (match) {

            selectedCountry = match;
            digits = digits.slice(match.dial.length);

            document.getElementById("selected-flag").textContent =
                match.flag;

            document.getElementById("selected-dial").textContent =
                "+" + match.dial;
        }
    }

    // INDIA
    if (selectedCountry.iso === "in") {

        if (digits.length === 11 && digits[0] === "0") {
            digits = digits.slice(1);
        }

        if (!/^[6-9]\d{9}$/.test(digits)) {
            throw Error(
                "India: enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
            );
        }
    }

    // BANGLADESH
    else if (selectedCountry.iso === "bd") {

        if (digits.length === 11 && digits[0] === "0") {
            digits = digits.slice(1);
        }

        if (!/^1[3-9]\d{8}$/.test(digits)) {
            throw Error(
                "Bangladesh: enter a valid mobile number, e.g. 017XXXXXXXX."
            );
        }
    }

    // OTHER COUNTRIES
    else {

        if (digits.length < 6 || digits.length > 15) {
            throw Error(
                "Enter a mobile number containing 6 to 15 digits."
            );
        }
    }

    return "+" + selectedCountry.dial + digits;
}


// ==========================================
// MENU RENDERING
// ==========================================

function renderMenu() {

    const nav = document.getElementById("category-nav");
    const root = document.getElementById("menu-sections");

    if (!nav || !root) return;

    nav.innerHTML = "";
    root.innerHTML = "";

    MENU.forEach((group, index) => {

        const id = "category-" + index;

        const button = document.createElement("button");

        button.className =
            "category-pill" + (index === 0 ? " active" : "");

        button.type = "button";

        button.innerHTML = `
            <i class="fa-solid ${group.icon}"></i>
            ${escapeHTML(group.category)}
        `;

        button.onclick = () => {

            document.getElementById(id).scrollIntoView({
                behavior: "smooth"
            });

            document.querySelectorAll(".category-pill")
                .forEach(item => item.classList.remove("active"));

            button.classList.add("active");
        };

        nav.appendChild(button);

        const section = document.createElement("section");

        section.className = "category-section";
        section.id = id;

        section.innerHTML = `
            <h2>${escapeHTML(group.category)}</h2>
            <div class="menu-grid"></div>
        `;

        const grid = section.querySelector(".menu-grid");

        group.items.forEach(([name, price, image, largePrice]) => {

            const card = document.createElement("article");

            card.className = "menu-card";

            const safeName = escapeHTML(name);

            card.innerHTML = `
                <img
                    src="${image}"
                    alt="${safeName}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/700x450/eee3dc/6b161b?text=Food'"
                >

                <div class="item-details">

                    <h3>${safeName}</h3>

                    <p class="price">
                        ${
                            largePrice
                                ? `₹${price} / ₹${largePrice}`
                                : `₹${price}`
                        }
                    </p>

                    ${
                        largePrice
                            ? `
                                <button onclick="addToCart('${safeName} (Med)',${price})">
                                    Add Med (₹${price})
                                </button>

                                <button
                                    class="secondary"
                                    onclick="addToCart('${safeName} (Large)',${largePrice})"
                                >
                                    Add Large (₹${largePrice})
                                </button>
                            `
                            : `
                                <button onclick="addToCart('${safeName}',${price})">
                                    <i class="fa-solid fa-cart-plus"></i>
                                    Add to Cart
                                </button>
                            `
                    }

                </div>
            `;

            grid.appendChild(card);
        });

        root.appendChild(section);
    });
}


// ==========================================
// SHOPPING CART
// ==========================================

function toggleCart() {

    const modal = document.getElementById("cart-modal");

    modal.classList.toggle("open");

    modal.setAttribute(
        "aria-hidden",
        String(!modal.classList.contains("open"))
    );
}


function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    updateCartUI();
}


function updateCartUI() {

    const root = document.getElementById("cart-items");

    if (!root) return;

    let count = 0;
    let total = 0;

    root.innerHTML = "";

    if (!cart.length) {

        root.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    } else {

        cart.forEach((item, index) => {

            count += item.quantity;
            total += item.price * item.quantity;

            const row = document.createElement("div");

            row.className = "cart-item";

            row.innerHTML = `
                <div>
                    <h4>${escapeHTML(item.name)}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>
            `;

            root.appendChild(row);
        });
    }

    document.getElementById("cart-count").textContent = count;

    document.getElementById("cart-total-price").textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartUI();
}


// ==========================================
// CHECKOUT
// ==========================================

async function checkout() {

    if (!cart.length) {
        return alert("Your cart is empty!");
    }

    if (!currentUser) {

        toggleCart();
        openAuth();
        setAuthMode("login");

        showAuthMessage(
            "Please login before placing your order.",
            false
        );

        return;
    }

    const summary = cart.map(item =>
        `${item.name} × ${item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        `Order summary:\n${summary}\n\nTotal: ₹${total}\n\nYour cart is ready. Connect an order-management/WhatsApp workflow to submit this order to the restaurant.`
    );

    cart = [];

    updateCartUI();

    toggleCart();
}


// ==========================================
// LOGIN / REGISTER
// ==========================================

function openAuth() {

    if (currentUser) {

        if (confirm("You are logged in. Do you want to log out?")) {
            logout();
        }

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

    toggleCountryMenu(false);
}


function setAuthMode(mode) {

    authMode = mode;

    const signup = mode === "signup";

    document.getElementById("signup-fields")
        .classList.toggle("hidden", !signup);

    document.getElementById("login-tab")
        .classList.toggle("active", !signup);

    document.getElementById("signup-tab")
        .classList.toggle("active", signup);

    document.getElementById("auth-title").textContent =
        signup ? "Create your account" : "Welcome back!";

    document.getElementById("auth-subtitle").textContent =
        signup
            ? "Enter your details to create your Amir Cafe account."
            : "Login to continue ordering your favourites.";

    document.getElementById("auth-submit").textContent =
        signup ? "Create Account" : "Login";

    document.getElementById("customer-password").autocomplete =
        signup ? "new-password" : "current-password";

    showAuthMessage("", false);
}


function showAuthMessage(message, success) {

    const element = document.getElementById("auth-message");

    element.textContent = message || "";

    element.classList.toggle("success", !!success);
}


function togglePassword() {

    const input = document.getElementById("customer-password");

    input.type =
        input.type === "password" ? "text" : "password";
}


function setBusy(value) {

    const button = document.getElementById("auth-submit");

    button.disabled = value;

    button.textContent = value
        ? "Please wait..."
        : (
            authMode === "signup"
                ? "Create Account"
                : "Login"
        );
}


// ==========================================
// SAVE CUSTOMER PROFILE
// ==========================================

async function saveCustomerProfile(user, name, phone, address) {

    if (!supabaseClient || !user) return;

    const { error } = await supabaseClient
        .from("customer_profiles")
        .upsert(
            {
                id: user.id,
                full_name: name || user.user_metadata?.full_name || "",
                phone: phone || user.phone || "",
                address: address || user.user_metadata?.address || ""
            },
            {
                onConflict: "id"
            }
        );

    if (error) {
        console.error("Profile save error:", error.message);
    }
}


// ==========================================
// AUTHENTICATION SUBMIT
// ==========================================

async function handleAuthSubmit(event) {

    event.preventDefault();

    if (!supabaseClient) {

        showAuthMessage(
            "Supabase key missing. Add your Publishable/anon key in script.js.",
            false
        );

        return;
    }

    setBusy(true);

    showAuthMessage("", false);

    try {

        const phone = getPhoneNumber();

        const password =
            document.getElementById("customer-password").value;

        if (password.length < 6) {
            throw Error("Password must be at least 6 characters.");
        }


        // REGISTER
        if (authMode === "signup") {

            const name =
                document.getElementById("customer-name").value.trim();

            const address =
                document.getElementById("customer-address").value.trim();

            if (!name) {
                throw Error("Please enter your full name.");
            }

            if (!address) {
                throw Error("Please enter your delivery address.");
            }

            const { data, error } =
                await supabaseClient.auth.signUp({

                    phone: phone,

                    password: password,

                    options: {
                        data: {
                            full_name: name,
                            address: address
                        }
                    }

                });

            if (error) throw error;

            if (!data.session) {

                throw Error(
                    "Supabase has not returned a session. In Supabase Dashboard, turn OFF Phone Confirmations to allow signup without SMS OTP."
                );
            }

            currentUser = data.user;

            await saveCustomerProfile(
                data.user,
                name,
                phone,
                address
            );

            updateAccountUI(name);

            showAuthMessage(
                "Account created successfully. You are now logged in.",
                true
            );

            setTimeout(closeAuth, 900);
        }


        // LOGIN
        else {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    phone: phone,

                    password: password

                });

            if (error) throw error;

            currentUser = data.user;

            const { data: profile } =
                await supabaseClient
                    .from("customer_profiles")
                    .select("full_name,phone,address")
                    .eq("id", data.user.id)
                    .maybeSingle();

            updateAccountUI(
                profile?.full_name ||
                data.user.user_metadata?.full_name ||
                "Customer"
            );

            showAuthMessage(
                "Login successful. Welcome!",
                true
            );

            setTimeout(closeAuth, 700);
        }

    } catch (error) {

        showAuthMessage(
            error.message || "Something went wrong. Please try again.",
            false
        );

    } finally {

        setBusy(false);
    }
}


// ==========================================
// ACCOUNT UI
// ==========================================

function updateAccountUI(name) {

    document.getElementById("account-label").textContent =
        currentUser
            ? `Welcome, ${name || "Customer"}`
            : "Login / Register";

    document.getElementById("account-button").title =
        currentUser
            ? "Click to log out"
            : "Login or create account";
}


async function logout() {

    if (supabaseClient) {

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return alert(error.message);
        }
    }

    currentUser = null;

    updateAccountUI();
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

        if (data?.full_name) {
            name = data.full_name;
        }
    }

    updateAccountUI(name);
}


// ==========================================
// INITIALIZE AUTHENTICATION
// ==========================================

async function initAuth() {

    document.getElementById("auth-form")
        .addEventListener("submit", handleAuthSubmit);

    document.getElementById("country-trigger")
        .addEventListener("click", () => toggleCountryMenu());

    document.getElementById("country-search")
        .addEventListener("input", event =>
            renderCountryList(event.target.value)
        );

    document.addEventListener("click", event => {

        const box = document.querySelector(".phone-control");

        if (box && !box.contains(event.target)) {
            toggleCountryMenu(false);
        }
    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            toggleCountryMenu(false);
        }
    });

    selectCountry(selectedCountry);

    renderCountryList();

    if (!supabaseClient) return;

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (session?.user) {
        await restoreUser(session.user);
    }

    supabaseClient.auth.onAuthStateChange(
        (_event, session) => {

            if (session?.user) {

                currentUser = session.user;

                updateAccountUI(
                    session.user.user_metadata?.full_name || "Customer"
                );

            } else {

                currentUser = null;

                updateAccountUI();
            }
        }
    );
}


// ==========================================
// WEBSITE START
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderMenu();

    updateCartUI();

    initAuth();
});
