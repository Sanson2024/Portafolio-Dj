// panaderia.js

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. LÓGICA DEL CARRITO DE COMPRAS
    // ----------------------------------------------------
    let cart = [];

    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEl = document.getElementById('cartCount');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');

    // Función para añadir productos al carrito
    function addToCart(productName, productPrice) {
        // Busca si el producto ya existe en el carrito
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1; // Incrementa la cantidad
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 }); // Añade nuevo ítem
        }
        
        renderCart();
    }

    // Función para renderizar el carrito
    function renderCart() {
        cartItemsEl.innerHTML = ''; // Limpia la lista anterior
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<li>El carrito está vacío.</li>';
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} (${item.quantity}) - $${itemTotal.toFixed(2)}
                <button class="btn-remove" data-index="${index}" aria-label="Eliminar item">🗑️</button>
            `;
            cartItemsEl.appendChild(li);
        });

        cartTotalEl.textContent = `$${total.toFixed(2)}`;
        cartCountEl.textContent = count;
        
        // Almacenar el carrito en localStorage (IMPORTANTE para persistencia)
        localStorage.setItem('rakoCart', JSON.stringify(cart));
    }

    // Manejador de clic para los botones "Añadir al Pedido"
    document.getElementById('productGrid').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            
            addToCart(name, price);
        }
    });

    // Manejador de clic para eliminar items del carrito
    cartItemsEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            
            // Simplemente removemos 1 unidad del item
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Elimina el item si solo queda 1 unidad
            }
            renderCart();
        }
    });
    
    // Cargar carrito desde localStorage al inicio
    const storedCart = localStorage.getItem('rakoCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart();
    }

    // ----------------------------------------------------
    // 2. LÓGICA DE DIÁLOGO (Promoción)
    // ----------------------------------------------------
    const dialog = document.getElementById('promoDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');

    openBtn.addEventListener('click', () => {
        dialog.showModal(); // Usa showModal() para una mejor accesibilidad
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    // ----------------------------------------------------
    // 3. LÓGICA DEL FORMULARIO DE PAGO
    // ----------------------------------------------------
    const paymentRadios = document.querySelectorAll('input[name="pago"]');
    const paymentDetailsEl = document.getElementById('paymentDetails');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const method = e.target.value;
            let details = '';

            switch (method) {
                case 'bizum':
                    details = 'Instrucción: Una vez confirmes, te enviaremos nuestro número Bizum para realizar el pago de $${cartTotalEl.textContent}. Confirma el pago antes de 10 minutos.';
                    break;
                case 'transferencia':
                    details = 'Instrucción: Se te enviarán los datos bancarios (CLABE/IBAN) al correo. El pedido comenzará la preparación tras la confirmación de la transferencia (1-2 días hábiles).';
                    break;
                case 'efectivo':
                    details = 'Instrucción: Pagarás en efectivo al repartidor. Por favor, ten el monto exacto si es posible.';
                    break;
            }
            paymentDetailsEl.textContent = details;
        });
    });

    // Manejador del Formulario de Pedido
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const orderMessageEl = document.getElementById('orderMessage');

        if (cart.length === 0) {
            orderMessageEl.textContent = '❌ No puedes confirmar un pedido vacío.';
            orderMessageEl.style.color = 'red';
            return;
        }

        // SIMULACIÓN de Envío de Pedido
        const uniqueId = `RKP-${Math.floor(Math.random() * 90000) + 10000}`;

        // Lógica que realmente debería ir al Backend/API
        console.log("Pedido Enviado:", {
            id: uniqueId,
            cart: cart,
            direccion: document.getElementById('direccion').value,
            pago: document.querySelector('input[name="pago"]:checked')?.value || 'No Seleccionado'
        });

        orderMessageEl.innerHTML = `✅ **¡Pedido Confirmado!** Tu ID de seguimiento es: <strong>${uniqueId}</strong>. Revisa tu correo para los detalles de pago.`;
        orderMessageEl.style.color = 'green';
        
        // Limpiar el carrito después de la simulación de pedido
        cart = [];
        localStorage.removeItem('rakoCart');
        renderCart();
        document.getElementById('orderForm').reset();
    });
});

// ----------------------------------------------------
// 4. FUNCIONALIDAD GLOBAL (Simulación de Seguimiento)
// ----------------------------------------------------
function checkOrderStatus() {
    const trackingId = document.getElementById('trackingId').value.trim().toUpperCase();
    const statusResultEl = document.getElementById('statusResult');
    
    if (!trackingId.startsWith('RKP-')) {
        statusResultEl.innerHTML = '<p style="color:red;">Formato de ID de seguimiento incorrecto.</p>';
        return;
    }

    // SIMULACIÓN DEL BACKEND
    let status;
    const lastDigit = trackingId.slice(-1);

    if (['1', '2', '3'].includes(lastDigit)) {
        status = 'Preparando'; // Despachador
    } else if (['4', '5', '6'].includes(lastDigit)) {
        status = 'En camino'; // Repartidor
    } else if (['7', '8', '9'].includes(lastDigit)) {
        status = 'Entregado'; // Repartidor
    } else {
        status = 'Pendiente'; // Cliente
    }

    statusResultEl.innerHTML = `
        <h3>Estado del Pedido ${trackingId}:</h3>
        <p><strong>Estado Actual:</strong> <span class="status-${status.toLowerCase().replace(' ', '-')}">${status}</span></p>
        <p>Próxima actualización: El pedido está siendo atendido por el equipo de ${status === 'Preparando' ? 'Despacho' : 'Reparto'}.</p>
    `;
    // Aquí se necesitaría CSS adicional para los colores de estado.
}