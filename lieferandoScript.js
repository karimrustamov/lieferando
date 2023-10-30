let food = [
    {
        "name": "Pizza Margherita",
        "ingredients": "Tomatensauce, Mozzarella, Basilikum",
        "price": 8.00
    },
    {
        "name": "Caesar Salad",
        "ingredients": "Römersalat, Caesar-Dressing, Croutons, Parmesan",
        "price": 7.00
    },
    {
        "name": "Burger Classic",
        "ingredients": "Rindfleischpatty, Salat, Tomate, Gurke, Käse, Burger-Sauce",
        "price": 9.50
    },
    {
        "name": "Spaghetti Carbonara",
        "ingredients": "Spaghetti, Speck, Ei, Parmesan, Pfeffer",
        "price": 8.00
    },
    {
        "name": "Sushi-Set",
        "ingredients": "Verschiedene Sushi-Rollen, Wasabi, Sojasauce",
        "price": 14.00
    },
    {
        "name": "Griechischer Salat",
        "ingredients": "Tomaten, Gurken, Oliven, Feta, Zwiebeln",
        "price": 7.00
    },
    {
        "name": "Schokoladenkuchen",
        "ingredients": "Schokolade, Mehl, Zucker, Eier",
        "price": 4.50
    },
    {
        "name": "Cola",
        "ingredients": "Getränk: 500ml",
        "price": 2.50
    },
    {
        "name": "Vegane Pasta",
        "ingredients": "Vollkornpasta, Gemüsemischung, Tomatensauce",
        "price": 9.00
    },
    {
        "name": "Chicken Wings",
        "ingredients": "Hühnerflügel, Gewürze, Sauce nach Wahl",
        "price": 7.50
    },
    {
        "name": "Fisch-Taco",
        "ingredients": "Fisch, Tortilla, Salat, Tomate, Zwiebel, Sauce",
        "price": 8.50
    },
    {
        "name": "Fruchtiger Smoothie",
        "ingredients": "Verschiedene Früchte, Joghurt",
        "price": 5.00
    }
]

let cart = [];
const basketElement = document.querySelector('.basket');
const foodsDiv = document.querySelector('.foods');
const orderButton = document.querySelector('button[onclick="placeOrder()"]');

function addToCart(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCartToLocalStorage();
    updateCart();
}

function removeFromCart(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }
    saveCartToLocalStorage();
    updateCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function placeOrder() {
    alert("Ihre Bestellung ist unterwegs!");
    cart.length = 0; // Leert den Warenkorb
    updateCart();
    localStorage.removeItem('cart');
}

function updateCart() {
    basketElement.innerHTML = '<img id="basketImg" src="./lieferandoImg/basket.jpg" alt="basket">';
    let total = 0;

    if (cart.length === 0) {
        basketElement.innerHTML += `
            <div id="basketTopic">Befülle deinen Korb</div>
            <div id="basketText">Wähle ein paar verlockende Produkte aus und bereite deine Bestellung vor.</div>
        `;
        orderButton.disabled = true;
    } else {
        orderButton.disabled = false;
        cart.forEach(item => {
            total += item.price * item.quantity;
            basketElement.innerHTML += `
                <div>
                    <p>${item.name} x${item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}€</p>
                    <button data-item="${item.name}" data-action="remove">Entfernen</button>

                </div>
            `;
        });
        basketElement.innerHTML += `<div><strong>Gesamtpreis: ${total.toFixed(2)}€</strong></div>`;
    }
}

function displayFoods() {
    foodsDiv.innerHTML = '';
    food.forEach(item => {
        foodsDiv.innerHTML += `
            <div>
                <h3>${item.name}</h3>
                <p>${item.ingredients}</p>
                <p>${item.price.toFixed(2)}€</p>
                <button data-item="${item.name}" data-price="${item.price}" data-action="add">In den Warenkorb</button>
            </div>
        `;
    });
}

foodsDiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const { item, price, action } = event.target.dataset;
        if (action === 'add') {
            addToCart(item, parseFloat(price));
        } else if (action === 'remove') {
            removeFromCart(item);
        }
    }
});


function render() {
    loadCartFromLocalStorage();
    displayFoods();
    updateCart();
}

basketElement.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const { item, action } = event.target.dataset;
        if (action === 'remove') {
            removeFromCart(item);
        }
    }
});


window.onload = render;