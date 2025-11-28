document.addEventListener('DOMContentLoaded', () => {
    const menu = {
        starters: [
            { name: "Garlic Bread", price: 45.00 },
            { name: "Chicken Wings (BBQ / Spicy)", price: 90.00 },
            { name: "Mozzarella Sticks", price: 80.00 },
            { name: "Calamari Rings", price: 110.00 },
        ],
        mainCourses: [
            { name: "Classic Beef Burger", price: 130.00 },
            { name: "Crispy Chicken Burger", price: 120.00 },
            { name: "Veggie Delight Burger", price: 115.00 },
            { name: "Spaghetti Bolognese", price: 140.00 },
            { name: "Chicken Alfredo Pasta", price: 150.00 },
            { name: "Veggie Stir-Fry Noodles", price: 110.00 },
            { name: "Grilled Chicken Breast", price: 160.00 },
            { name: "BBQ Ribs", price: 220.00 },
            { name: "Sirloin Steak", price: 280.00 },
        ],
        sides: [
            { name: "French Fries", price: 35.00 },
            { name: "Onion Rings", price: 40.00 },
            { name: "Mashed Potatoes", price: 40.00 },
            { name: "Steamed Veggies", price: 35.00 },
        ],
        desserts: [
            { name: "Chocolate Lava Cake", price: 75.00 },
            { name: "Cheesecake", price: 70.00 },
            { name: "Ice Cream Scoop", price: 45.00 },
        ],
        beverages: [
            { name: "Soft Drinks", price: 25.00 },
            { name: "Fresh Juice", price: 35.00 },
            { name: "Milkshakes", price: 50.00 },
        ],
    };

    let cart = {};

    const menuSelectionArea = document.querySelector('.menu-selection-area');
    const cartItemsDiv = document.getElementById('cart-items');
    const subtotalSpan = document.getElementById('subtotal');
    const deliveryFeeSpan = document.getElementById('delivery-fee');
    const totalSpan = document.getElementById('total');
    const deliveryDetailsDiv = document.getElementById('delivery-details');
    const pickupRadio = document.getElementById('pickup');
    const deliveryRadio = document.getElementById('delivery');
    const checkoutBtn = document.getElementById('checkout-btn');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    // Function to render the menu on the page
    function renderMenu() {
        for (const category in menu) {
            const categorySection = document.createElement('section');
            categorySection.classList.add('menu-category');
            categorySection.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}</h2>`;

            menu[category].forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('menu-item-card');
                itemCard.innerHTML = `
                    <h3>${item.name}</h3>
                    <span>R ${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">Add</button>
                `;
                categorySection.appendChild(itemCard);
            });
            menuSelectionArea.appendChild(categorySection);
        }
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let subtotal = 0;

        for (const itemName in cart) {
            const item = cart[itemName];
            if (item.quantity > 0) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <p>${item.name} x ${item.quantity}</p>
                    <p>R ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-from-cart-btn" data-name="${item.name}">Remove</button>
                `;
                cartItemsDiv.appendChild(cartItem);
                subtotal += item.price * item.quantity;
            }
        }

        subtotalSpan.textContent = `R ${subtotal.toFixed(2)}`;
        
        let total = subtotal;
        if (deliveryRadio.checked) {
            const deliveryFee = subtotal < 300 ? 50.00 : 30.00;
            deliveryFeeSpan.textContent = `R ${deliveryFee.toFixed(2)}`;
            total += deliveryFee;
        } else {
            deliveryFeeSpan.textContent = `R 0.00`;
        }

        totalSpan.textContent = `R ${total.toFixed(2)}`;
        
        checkoutBtn.disabled = subtotal === 0;

        const emptyCartMessage = document.querySelector('.empty-cart-message');
        if (Object.keys(cart).length === 0 || subtotal === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        }
    }

    menuSelectionArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);

            if (cart[name]) {
                cart[name].quantity++;
            } else {
                cart[name] = { name, price, quantity: 1 };
            }
            updateCart();
        }
    });

    cartItemsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart-btn')) {
            const name = e.target.dataset.name;
            if (cart[name]) {
                delete cart[name];
            }
            updateCart();
        }
    });

    // Event listener for pickup/delivery choice
    pickupRadio.addEventListener('change', () => {
        deliveryDetailsDiv.style.display = 'none';
        updateCart();
    });

    deliveryRadio.addEventListener('change', () => {
        deliveryDetailsDiv.style.display = 'block';
        updateCart();
    });

    checkoutBtn.addEventListener('click', () => {
        confirmationPopup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', () => {
        confirmationPopup.style.display = 'none';
        window.location.reload();
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const answer = button.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Contact form submitted!");
            const confirmationMessage = "Thank you. We'll get back to you as soon as possible";
            alert(confirmationMessage);
            window.location.reload();
        });
    }

    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const confirmationMessage = "Thank you for booking with us! We look forward to serving you! If you have any questions or need to make any changes to your reservation, please don't hesitate to contact us.";
            alert(confirmationMessage);
            window.location.reload();
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
             if (document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    if (menuSelectionArea) {
        renderMenu();
        updateCart();
    }
});

