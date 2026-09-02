const buttons = document.querySelectorAll(".menu-item button");
const orderForm = document.getElementById("order-form");
const selectedItem = document.getElementById("selected-item");
const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const quantity = document.getElementById("quantity");
const confirmOrder = document.getElementById("confirm-order");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const item = button.parentElement;
        const name = item.querySelector("h3").textContent;
        const price = item.querySelector("strong").textContent;

        selectedItem.textContent = name + " - " + price;
        orderForm.style.display = "block";
        customerName.focus();
    });
});

confirmOrder.addEventListener("click", function() {
    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const qty = quantity.value;

    if (name === "" || phone === "") {
        alert("Veuillez remplir votre nom et votre téléphone.");
        return;
    }

    const message =
        "Nouvelle commande%0A" +
        "Nom: " + encodeURIComponent(name) + "%0A" +
        "Téléphone: " + encodeURIComponent(phone) + "%0A" +
        "Commande: " + encodeURIComponent(selectedItem.textContent) + "%0A" +
        "Quantité: " + encodeURIComponent(qty);

    const whatsappNumber = "212771828559";

    window.open(
        "https://wa.me/" + whatsappNumber + "?text=" + message,
        "_blank"
    );
});