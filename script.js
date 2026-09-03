// ===============================
// VARIABLES
// ===============================

const categoryCards = document.querySelectorAll(".category-card");
const categoriesPage = document.getElementById("categories-page");
const productsPage = document.getElementById("products-page");
const categoryTitle = document.getElementById("category-title");
const backButton = document.getElementById("back-button");

const menuItems = document.querySelectorAll(".menu-item");

const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const orderButton = document.getElementById("order-button");

const orderForm = document.getElementById("order-form");
const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const confirmOrder = document.getElementById("confirm-order");


// ===============================
// PANIER
// ===============================

let order = [];


// ===============================
// OUVRIR UNE CATÉGORIE
// ===============================

categoryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const category = card.dataset.category;

        categoriesPage.style.display = "none";
        productsPage.style.display = "block";

        menuItems.forEach(function(item) {

            if (item.dataset.category === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        if (category === "chaud") {
            categoryTitle.textContent = "☕ Boissons chaudes";
        }

        if (category === "froid") {
            categoryTitle.textContent = "🥤 Boissons froides";
        }

        if (category === "plats") {
            categoryTitle.textContent = "🍽️ Plats";
        }

        if (category === "desserts") {
            categoryTitle.textContent = "🍰 Desserts";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ===============================
// RETOUR AUX CATÉGORIES
// ===============================

backButton.addEventListener("click", function() {

    productsPage.style.display = "none";
    categoriesPage.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// AJOUTER AU PANIER
// ===============================

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const item = button.parentElement;

        const name = item.querySelector("h3").textContent;
        const priceText = item.querySelector("strong").textContent;

        const price = parseFloat(
            priceText.replace("DH", "").trim()
        );

        const existingItem = order.find(function(product) {
            return product.name === name;
        });

        if (existingItem) {

            existingItem.quantity++;

        } else {

            order.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cart.style.display = "block";

        cart.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ===============================
// AFFICHER LE PANIER
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    order.forEach(function(product, index) {

        const productTotal = product.price * product.quantity;

        total += productTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">
                    ${product.quantity} × ${product.name}
                </span>

                <span class="cart-item-price">
                    ${productTotal} DH
                </span>
            </div>

            <button class="remove-item" data-index="${index}">
                Supprimer
            </button>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.textContent = total;

    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index = parseInt(button.dataset.index);

            order.splice(index, 1);

            updateCart();

            if (order.length === 0) {
                cart.style.display = "none";
            }

        });

    });

}


// ===============================
// BOUTON COMMANDER
// ===============================

orderButton.addEventListener("click", function() {

    if (order.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    orderForm.style.display = "block";

    orderForm.scrollIntoView({
        behavior: "smooth"
    });

    customerName.focus();

});


// ===============================
// CONFIRMER LA COMMANDE
// ===============================

confirmOrder.addEventListener("click", function() {

    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();

    if (name === "" || phone === "") {

        alert("Veuillez remplir votre nom et votre téléphone.");

        return;
    }


    let message = "Bonjour Café Atlas !%0A%0A";
    message += "🛒 Nouvelle commande%0A%0A";

    message += "Nom : " + encodeURIComponent(name) + "%0A";
    message += "Téléphone : " + encodeURIComponent(phone) + "%0A%0A";

    message += "Commande :%0A";


    let total = 0;

    order.forEach(function(product) {

        const productTotal = product.price * product.quantity;

        total += productTotal;

        message +=
            encodeURIComponent(
                product.quantity +
                " × " +
                product.name +
                " - " +
                productTotal +
                " DH"
            ) + "%0A";

    });


    message += "%0A";
    message += "Total : " + encodeURIComponent(total + " DH");


    // NUMÉRO WHATSAPP DU CAFÉ
    const whatsappNumber = "212771828559";


    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message,
        "_blank"
    );

});
