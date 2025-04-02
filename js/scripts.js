// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для обновления количества товаров в корзине
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// Функция для добавления товара в корзину
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    showAddToCartPopup(name);
}

// Функция для удаления товара из корзины
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Функция для отображения товаров в корзине
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-list');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sepetiniz boş.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border-b');

        itemElement.innerHTML = `
            <div>
                <h5 class="text-lg font-bold">${item.name}</h5>
                <p class="text-sm text-gray-600">${item.price} TL</p>
            </div>
            <div class="flex items-center">
                <span class="mr-4">Adet: ${item.quantity}</span>
                <button class="text-red-500 hover:underline" onclick="removeFromCart('${item.name}')">Sil</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });
}

// Показ всплывающего окна при добавлении товара
function showAddToCartPopup(productName) {
    const popup = document.getElementById('add-to-cart-popup');
    popup.querySelector('.popup-content').textContent = `${productName} başarıyla sepete eklendi!`;
    popup.classList.remove('hidden');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}

// Функция для открытия всплывающего окна корзины
function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.toggle('hidden');
    renderCartItems();
}

// Функция для показа формы оформления заказа
function showOrderPopup() {
    const orderPopup = document.getElementById('order-popup');
    orderPopup.classList.remove('hidden');
}

// Функция для закрытия формы оформления заказа
function toggleOrderPopup() {
    const orderPopup = document.getElementById('order-popup');
    orderPopup.classList.add('hidden');
}

// Функция для отправки заказа
function submitOrder(event) {
    event.preventDefault();
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;

    if (!customerName || !customerPhone || !customerAddress) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    // Очистка корзины после отправки заказа
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();

    alert(`Teşekkürler, ${customerName}! Siparişiniz alınmıştır.`);
    toggleOrderPopup();
}

// Инициализация отображения корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();

    // Закрытие корзины при клике вне её области
    document.addEventListener('click', (event) => {
        const cartPopup = document.getElementById('cart-popup');
        if (!cartPopup.contains(event.target) && !event.target.closest('.text-xl')) {
            cartPopup.classList.add('hidden');
        }
    });
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = '/thanks.html';
    });
});