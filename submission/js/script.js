/**
 * CAT 2 JavaScript Implementation
 * All features written in pure Vanilla JS.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Task 1: Click-to-reveal on your banner
    // ==========================================
    const bannerImage = document.querySelector('.banner-image') || document.querySelector('header img');
    const bannerCaption = document.getElementById('banner-caption');

    if (bannerImage && bannerCaption) {
        bannerImage.addEventListener('click', () => {
            bannerCaption.classList.toggle('reveal-active');
        });
    }

    // ==========================================
    // Task 2: Loop-rendered dynamic content
    // ==========================================
    const platformServices = [
        { name: "Premium Portrait Session", cost: "KSh 5,000", description: "1-hour outdoor shoot with edited digital copies." },
        { name: "Full Event Coverage", cost: "KSh 15,000", description: "Comprehensive photography for corporate or private events." },
        { name: "Commercial Product Shoot", cost: "KSh 25,000", description: "Studio-quality images tailored for branding and marketing." }
    ];

    const servicesContainer = document.getElementById('dynamic-services-list');

    if (servicesContainer) {
        platformServices.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <h3>${service.name}</h3>
                <p><strong>Price:</strong> ${service.cost}</p>
                <p>${service.description}</p>
            `;
            servicesContainer.appendChild(card);
        });
    }

    // ==========================================
    // Task 3: Form handling with validation feedback
    // ==========================================
    const bookingForm = document.getElementById('booking-form');
    const formFeedback = document.getElementById('booking-feedback');

    if (bookingForm && formFeedback) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const clientName = document.getElementById('client-name').value.trim();
            const clientEmail = document.getElementById('client-email').value.trim();

            if (clientName === "" || clientEmail === "") {
                formFeedback.textContent = "Error: Please fill in both your name and email address.";
                formFeedback.style.color = "crimson";
                formFeedback.className = "feedback-message error";
            } else {
                formFeedback.innerHTML = `<strong>Success!</strong> Thank you, ${clientName}. Your request has been logged.`;
                formFeedback.style.color = "seagreen";
                formFeedback.className = "feedback-message success";
                bookingForm.reset();
            }
        });
    }

    // ==========================================
    // Task 4 & 5: Dynamic add/remove (wishlist) & localStorage
    // ==========================================
    const wishlistInput = document.getElementById('wishlist-item-input');
    const addWishlistBtn = document.getElementById('add-wishlist-btn');
    const wishlistUl = document.getElementById('wishlist-display-list');

    function getStoredWishlist() {
        const stored = localStorage.getItem('userWishlistItems');
        return stored ? JSON.parse(stored) : [];
    }

    // Using "storage" terminology here instead of dependencies for modular design
    function saveWishlistToStorage(itemsArray) {
        localStorage.setItem('userWishlistItems', JSON.stringify(itemsArray));
    }

    function renderWishlistItem(itemName) {
        const li = document.createElement('li');
        li.textContent = itemName + " ";

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-item-btn";
        removeButton.style.marginLeft = "12px";

        removeButton.addEventListener('click', () => {
            li.remove();
            const currentItems = getStoredWishlist();
            const updatedItems = currentItems.filter(item => item !== itemName);
            saveWishlistToStorage(updatedItems);
        });

        li.appendChild(removeButton);
        wishlistUl.appendChild(li);
    }

    if (wishlistUl) {
        const initialLoadItems = getStoredWishlist();
        initialLoadItems.forEach(item => renderWishlistItem(item));
    }

    if (addWishlistBtn && wishlistInput && wishlistUl) {
        addWishlistBtn.addEventListener('click', () => {
            const newItemValue = wishlistInput.value.trim();
            if (newItemValue === "") return;

            renderWishlistItem(newItemValue);

            const currentList = getStoredWishlist();
            currentList.push(newItemValue);
            saveWishlistToStorage(currentList);

            wishlistInput.value = "";
        });
    }
});
