const USER_ID =
    "6abbb271cdb8b556c19ddd40";

const API_URL =
    `http://localhost:5000/api/users/${USER_ID}/orders`;

const ordersContainer =
    document.getElementById(
        "ordersContainer"
    );

const message =
    document.getElementById("message");


// ========================================
// GET USER ORDERS
// ========================================

const getOrders = async () => {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        if (!data.success) {

            message.innerText =
                "Failed to load orders.";

            return;

        }

        const orders =
            data.orders;

        if (orders.length === 0) {

            message.innerText =
                "No orders found.";

            return;

        }

        message.innerText =
            `Total Orders: ${orders.length}`;

        ordersContainer.innerHTML = "";

        orders.forEach(order => {

            const orderCard =
                document.createElement(
                    "div"
                );

            orderCard.className =
                "product-card";

            orderCard.innerHTML = `

                <h2>
                    ${order.name}
                </h2>

                <p>
                    Product ID:
                    ${order.productId}
                </p>

                <p>
                    Quantity:
                    ${order.quantity}
                </p>

                <p>
                    Order ID:
                    ${order._id}
                </p>

            `;

            ordersContainer.appendChild(
                orderCard
            );

        });

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to connect to server.";

    }

};


// ========================================
// NAVIGATION
// ========================================

const openProducts = () => {

    window.location.href =
        "index.html";

};


const openCart = () => {

    window.location.href =
        "cart.html";

};


// ========================================
// CALL
// ========================================

getOrders();