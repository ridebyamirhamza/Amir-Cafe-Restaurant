// ==========================================
// AMIR CAFE & RESTAURANT - JAVASCRIPT
// LocalStorage Based Authentication (No OTP/Server Required)
// ==========================================

let cart = [];
let authMode = "login";
let currentUser = null;


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


// ==========================================
// RESTAURANT MENU
// ==========================================

const MENU = [

{
category: "Soups",
icon: "fa-bowl-food",
items: [
["Tomato Soup",130,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTpQWSEZF_yhu4p1GKxtgnvcN65_s91vzCx-GGeRVfQ&s=10"],
["Manchow Soup",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-QGP109fM6v7wy2rXCmEtmyX6jjXwJuw2XKhTOW4b_g&s=10"],
["Sweet Corn Soup",149,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6jGUVfmT8Nl30a8Ou9Ty71kMEHrVuOLmvWe4i2AGfg&s=10"],
["Healthy Vegetables Soup",199,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnc6nLjqdgAHBvRdwNoLfaDzlsV6idvO5pPtAgVPtz2Q&s=10"]
]},

{
category: "Munchies",
icon: "fa-bowl-rice",
items: [
["Masala Papad",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KRCG3JEhqCbj6bsCC0XrMIFNwET6D6kORRKNRA0icA&s=10"],
["French Fries",149,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwn16qcQVv_D668Gzq1YGyWJQUfDeXGIxj0keiKgiSww&s=10"],
["Onion Rings",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3lLHtAtriRV4gy9sToxFmPBEKhEfgGMJGzqkyfqP1A&s=10"],
["Cheese Nachos",179,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohQveFUrOHixyozTAYmmkSBuVaBfEPk3qbPbXr-VvBg&s=10"],
["Peanut Masala",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXAIpkPZtOfe8zMhpS2m86NjDA9l1vWT1j-AaNHHoAGg&s=10"],
["Crispy Corn",199,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZbks-fzlHVwP1nhf9NoO3rIxEy0rlNRCMS2qKWHARg&s=10"],
["Peri Peri Fries",179,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEWj90itHgKlRUV5fkIhfRwuwg4eZBk4oJr9npwyZsQ&s=10"],
["Creamy Fries",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT163Rryvvt4sOj9hG262qYFtfIbgcYyGFdmwPAuqD91Q&s=10"]
]},

{
category: "Burger",
icon: "fa-burger",
items: [
["Allo Tikki Burger",69,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXU172PnubFYDoUdxMZZ5cDFITSxjuOxBdbna4yKzUsg&s=10"],
["Crispy Veg Burger",89,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnj05A6hiAZgSQUoM0lYFrEJinASFH6jB73dD0L_ix6Q&s=10"],
["Paneer Burger",120,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1jzUgQ5SkXVu45m6D7hfSWsQmTBzy56ppX-yVbSKDA&s=10"],
["Nacho Cheese Burger",110,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUUBiaYcb-AsCKow3c5qXEIBJhvNmQTMhkHeXeuAU3ug&s=10"]
]},

{
category: "Sandwich",
icon: "fa-bread-slice",
items: [
["Corn Fresh Sandwich",130,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR57Jt0sp3ZFbi02VcYcXF_gC7OBk_Z_h_hO-F5XgzLKw&s=10"],
["Veg Grilled Sandwich",150,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCLdlNhadIZGnREYmU-sSw783i5v8RPGwIKFvORkDIQ&s=10"],
["Veg Double Decker Sandwich",219,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIuhy3BRYimVlujgL8f-q9qnPubf1hSrYIWetSP5j9tw&s=10"]
]},

{
category: "Wrap",
icon: "fa-utensils",
items: [
["Fries Wrap",150,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPAroSqUlsOdG5NCkZPiGi5esL5cMzhERGKnVK_xueA&s=10"],
["Nacho Wrap",150,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-lu8sqTSnBvlgqXdIym2B_Ti2zxqyOcW7MHxoHWHug&s=10"],
["Veggies Wrap",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsv0aA7-p8mcmRCUuTJsdrq5BpdyHS7QhfFmN7wJQSg&s=10"],
["Paneer Wrap",150,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTotm7mHc2eXAcX1y5bvkYD35Icq45MdWG9fmnOFwEVtw&s=10"]
]},

{
category: "Starter",
icon: "fa-utensils",
items: [
["Veg Spring Roll",149,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8o4F88txz4mMjny3VB38zJldsQnmh18yZU2DCkyOegA&s=10"],
["Honey Chilli Cauliflower",210,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbDhiItnxoDFK7gh9Hi4ll75yyhZ4NYxNj7CFMXaejw&s=10"],
["Chilli Mushroom",230,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5YV3BdaRfgUnLXD5wG4ngM58crrA6_jagITfkaMrPOg&s=10"],
["Hara Bhara Kabab",300,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8QrdCCtmwtTJ4XQWTVgcdi2CYeWobHvNHRGGFwKeXw&s=10"],
["Tandoori Mushroom",300,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtZig_8RhOc8NMvGi30bxa4IeUerz70Mo-EEgCepfa4A&s=10"],
["Tandoori Soya Chaap",220,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVadJE7ct8l_pB2xFtFKLiEfdGNDSItY38aDVk9mvzA&s=10"],
["Malai Soya Chaap",249,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSscq0QVYVE4lJpQlSAxuVDYwn9OHEG8IV-7F7MgHucwg&s=10"],
["Veg Manchurian Dry",220,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOiM-yOgU2AA2hwB0z-tmNe3_fRhoKFRovYw4YaIZF9g&s=10"],
["Honey Chilli Potato",200,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssu0VDTWoPFSJzDhe1luR-Rl8v5rmoGdzOWffNrENRw&s=10"]
]},

{
category: "Pasta",
icon: "fa-bowl-food",
items: [
["White Sauce Pasta",189,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUZkxODW8I27Xb4XRu2g4ITGgwI8yjOqsLMTzlZAS0dg&s=10"],
["Red Sauce Pasta",199,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScatYna4nHtPAML_qJwTojSOUTkL6KX7E_1QKAakKyPQ&s=10"],
["Alfredo Pasta",249,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1dODQwba6ccV9Ptjz2ybTtlt47ipYUpT_kuo6dvcthw&s=10"]
]},

{
category: "Pizza (Veg)",
icon: "fa-pizza-slice",
items: [
["Classic Margherita Pizza",200,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdADV9IefUWQzd6DIFnyVtNnqjYT3OsOrbKa_-iYKpg&s=10",270],
["Double Cheese Mag. Pizza",300,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklR_4BJjCTFuKLUe4S74f4g-E_qZc4mv-LK6xTMV3gw&s=10",400],
["Spicy Delight Pizza",320,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLnOvWEZuQVo2ks9b0ID3JbUfMFK8Z22Yx2b8AxnOjw&s=10",450],
["Perry Paneer Pizza",340,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1e7OXtcThnhT1RW2Hx06cxonMYtJkP4_HCIdkYdgA&s=10",400],
["Farmer Delight Pizza",350,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr1deGSmA_otI24-xjZww64oMfFOvJT9SJ772KWdqT0A&s",420]
]},

{
category: "Noodles",
icon: "fa-bowl-rice",
items: [
["Veg Noodles",220,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGYMp4u6pOZ9F-L0fS-byPk-hDLxeoPHioF5LPWKUW7A&s=10"],
["Hakka Noodles",200,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7JrHKqToXv8maDyT-JxjJuLJjz0bt1dMWlNfkz68mg&s=10"],
["Chilli Garlic Noodles",250,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8s3bjlebvVM037gmEVy1yCkrkwDK7CMtajwuRfkaxvQ&s=10"]
]},

{
category: "Desserts",
icon: "fa-ice-cream",
items: [
["Choice of Ice Cream",99,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJ4dlm2VYrJjE8cZ31gPiOiAjDWr0HEReo1Rrsqac_g&s=10"],
["Walnut Brownie With Ice Cream",120,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQssxpaSsjhVUJYph2UrdOWkGFbzwN-rnxeVzM2uOdu1w&s=10"]
]},

{
category: "Soft Drinks",
icon: "fa-glass-water",
items: [
["Sprite",20,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Gw2R0aqMvSOdSg4ip3S0M4-3g90j7viD2DYNgFzPXQ&s=10"],
["Coke",20,"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700"],
["Fanta",20,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0HXj1tXRkNb_f0rrzKdQCOd-4m9SKSN6s9KBm63bhYQ&s=10"],
["Pepsi",20,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReemYuP2WJigeHzCmRZXbGfTIwRwmPewTxP0HbIbIYhg&s=10"]
]},

{
category: "Shakes",
icon: "fa-mug-hot",
items: [
["Cold Coffee",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrw0uRnqwJv1qCJyCo5Vetzz3t747iFGAXFHUTzjkXUQ&s=10"],
["Vanilla Shake",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRC28-rSWXgZIcK5BzoI0v9s0KLuQBBmq1k-uEsYMBA&s=10"],
["Chocolate Shake",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRD2PyunjcVS4MPFq_ODqQ9qy2H4HniEqX14x4R5QSoA&s=10"],
["Strawberry Shake",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOn71OmdbgjdgeTymjt7XzEdjUnCdEcpV-_0_-h1bCCg&s=10"],
["Butter Scotch",169,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7FXal_PBAnRYcuUZsbaMPfQa38OWUnDBL3tChsNxAA&s=10"],
["Kitkat Shake",149,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFDEofaM-a2qWqFaMp3Hx2YsSkXAsxGxyivqjQSNrKLw&s=10"],
["Mango Shake",220,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkTo3Db0Hly6vrpUWeCRL15oOQmr3AmNkvMkYwfgCApw&s=10"],
["Bubblegum Shake",160,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2t2hq8I5NqwJ_1ztqpJQbzfkNqKP9_VgeVzkLLn5lw&s=10"]
]},

{
category: "Mojito",
icon: "fa-martini-glass-citrus",
items: [
["Orange Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrqDAbzI_COp3ra8sOXS6Q0LqTYpkGUS65MFq_VhrZw&s=10"],
["Watermelon Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClvVGHxlBPKD8JlxsiwwjZgEMJeM_zlioLH2mIEXXGg&s=10"],
["Blue Berry Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeoo0ipa6WeExittd52UKUMAQZzm_-XrK3gDb5q2ChZw&s=10"],
["Mango Mojito",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZ1gwODF47B0JHUzufboqlFgNnSpaAu6NGd4Mpt8PgQ&s=10"],
["Mint Mojito",140,"https://puffnsip.in/_next/image?url=%2Fuploads%2Fmedia_2026-10_9875870a-4313-48ea-90c6-c085afb12ac1.webp&w=1080&q=75"]
]},

{
category: "Coffee",
icon: "fa-mug-saucer",
items: [
["Hot Coffee",99,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1HoJQPZWIIS0R54-3S2Dg3c-MA7ZQ0Cbk7F7CYQNQEA&s=10"],
["Black Coffee",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8G02J8e-z8Vhj-obUFEkjeG_Jpx7H55MNJthrGj7H-w&s=10"]
["Americano Coffee",140,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKinW44pcko5zDSbJsVxIkjd7zXZMdATE3mAfeu5fvQ&s=10"]
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
        list.innerHTML = '<div class="country-empty">No country found</div>';
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
    document.getElementById("selected-flag").textContent = country.flag;
    document.getElementById("selected-dial").textContent = "+" + country.dial;
}


function toggleCountryMenu(force) {
    const menu = document.getElementById("country-menu");
    const button = document.getElementById("country-trigger");

    if (!menu || !button) return;

    const open = typeof force === "boolean" ? force : menu.classList.contains("hidden");

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
    const raw = document.getElementById("customer-phone").value.trim();
    let digits = raw.replace(/\D/g, "");

    if (!digits) {
        throw Error("Please enter your mobile number.");
    }

    if (raw.startsWith("+")) {
        const match = [...COUNTRIES]
            .sort((a, b) => b.dial.length - a.dial.length)
            .find(country => digits.startsWith(country.dial));

        if (match) {
            selectedCountry = match;
            digits = digits.slice(match.dial.length);

            document.getElementById("selected-flag").textContent = match.flag;
            document.getElementById("selected-dial").textContent = "+" + match.dial;
        }
    }

    if (selectedCountry.iso === "in") {
        if (digits.length === 11 && digits[0] === "0") {
            digits = digits.slice(1);
        }
        if (!/^[6-9]\d{9}$/.test(digits)) {
            throw Error("India: enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.");
        }
    } else if (selectedCountry.iso === "bd") {
        if (digits.length === 11 && digits[0] === "0") {
            digits = digits.slice(1);
        }
        if (!/^1[3-9]\d{8}$/.test(digits)) {
            throw Error("Bangladesh: enter a valid mobile number, e.g. 017XXXXXXXX.");
        }
    } else {
        if (digits.length < 6 || digits.length > 15) {
            throw Error("Enter a mobile number containing 6 to 15 digits.");
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

        button.className = "category-pill" + (index === 0 ? " active" : "");
        button.type = "button";
        button.innerHTML = `
            <i class="fa-solid ${group.icon}"></i>
            ${escapeHTML(group.category)}
        `;

        button.onclick = () => {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
            document.querySelectorAll(".category-pill").forEach(item => item.classList.remove("active"));
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
                        ${largePrice ? `₹${price} / ₹${largePrice}` : `₹${price}`}
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
    modal.setAttribute("aria-hidden", String(!modal.classList.contains("open")));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
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
        root.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
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
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
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
        showAuthMessage("Please login before placing your order.", false);
        return;
    }

    const summary = cart.map(item => `${item.name} × ${item.quantity}`).join("\n");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    alert(`Order summary:\n${summary}\n\nTotal: ₹${total}\n\nOrder placed successfully! Thank you.`);
    cart = [];
    updateCartUI();
    toggleCart();
}


// ==========================================
// LOGIN / REGISTER (LocalStorage)
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

    document.getElementById("signup-fields").classList.toggle("hidden", !signup);
    document.getElementById("login-tab").classList.toggle("active", !signup);
    document.getElementById("signup-tab").classList.toggle("active", signup);

    document.getElementById("auth-title").textContent = signup ? "Create your account" : "Welcome back!";
    document.getElementById("auth-subtitle").textContent = signup ? "Enter your details to create your Amir Cafe account." : "Login to continue ordering your favourites.";
    document.getElementById("auth-submit").textContent = signup ? "Create Account" : "Login";
    document.getElementById("customer-password").autocomplete = signup ? "new-password" : "current-password";

    showAuthMessage("", false);
}

function showAuthMessage(message, success) {
    const element = document.getElementById("auth-message");
    element.textContent = message || "";
    element.classList.toggle("success", !!success);
}

function togglePassword() {
    const input = document.getElementById("customer-password");
    input.type = input.type === "password" ? "text" : "password";
}

function setBusy(value) {
    const button = document.getElementById("auth-submit");
    button.disabled = value;
    button.textContent = value ? "Please wait..." : (authMode === "signup" ? "Create Account" : "Login");
}


// AUTH SUBMIT HANDLER (LOCALSTORAGE)
async function handleAuthSubmit(event) {
    event.preventDefault();
    setBusy(true);
    showAuthMessage("", false);

    try {
        const phone = getPhoneNumber();
        const password = document.getElementById("customer-password").value;

        if (password.length < 6) {
            throw Error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
        }

        // SIGNUP
        if (authMode === "signup") {
            const name = document.getElementById("customer-name").value.trim();
            const address = document.getElementById("customer-address").value.trim();

            if (!name) throw Error("দয়া করে আপনার পুরো নাম লিখুন।");
            if (!address) throw Error("দয়া করে আপনার ডেলিভারি ঠিকানা লিখুন।");

            const userData = { name, phone, password, address };
            localStorage.setItem("amir_cafe_user_" + phone, JSON.stringify(userData));
            localStorage.setItem("amir_cafe_current_user", JSON.stringify(userData));

            currentUser = userData;
            updateAccountUI(name);

            showAuthMessage("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", true);
            setTimeout(closeAuth, 900);
        } 
        // LOGIN
        else {
            const savedData = localStorage.getItem("amir_cafe_user_" + phone);

            if (!savedData) {
                throw Error("এই নম্বর দিয়ে কোনো অ্যাকাউন্ট নেই! আগে 'Create Account' করুন।");
            }

            const userData = JSON.parse(savedData);

            if (userData.password !== password) {
                throw Error("ভুল পাসওয়ার্ড!");
            }

            localStorage.setItem("amir_cafe_current_user", JSON.stringify(userData));
            currentUser = userData;
            updateAccountUI(userData.name);

            showAuthMessage("লগইন সফল হয়েছে!", true);
            setTimeout(closeAuth, 700);
        }

    } catch (error) {
        showAuthMessage(error.message || "কোথাও কোনো সমস্যা হয়েছে।", false);
    } finally {
        setBusy(false);
    }
}


// ==========================================
// ACCOUNT UI
// ==========================================

function updateAccountUI(name) {
    document.getElementById("account-label").textContent = currentUser ? `Welcome, ${name || "Customer"}` : "Login / Register";
    document.getElementById("account-button").title = currentUser ? "Click to log out" : "Login or create account";
}

function logout() {
    localStorage.removeItem("amir_cafe_current_user");
    currentUser = null;
    updateAccountUI();
}


// ==========================================
// INITIALIZATION
// ==========================================

function initAuth() {
    document.getElementById("auth-form").addEventListener("submit", handleAuthSubmit);
    document.getElementById("country-trigger").addEventListener("click", () => toggleCountryMenu());
    document.getElementById("country-search").addEventListener("input", event => renderCountryList(event.target.value));

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

    // Restore existing session from localStorage
    const activeUserJSON = localStorage.getItem("amir_cafe_current_user");
    if (activeUserJSON) {
        try {
            currentUser = JSON.parse(activeUserJSON);
            updateAccountUI(currentUser.name);
        } catch (e) {
            localStorage.removeItem("amir_cafe_current_user");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
    updateCartUI();
    initAuth();
});
