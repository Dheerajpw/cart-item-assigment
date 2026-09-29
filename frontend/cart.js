const USER_ID =
    "6abbb271cdb8b556c19ddd40";

const API_BASE_URL =
    "http://localhost:5000/api";

const cartContainer =
    document.getElementById("cartContainer");

const message =
    document.getElementById("message");


// ========================================
// GET CART
// ========================================

const getCart = async () => {

    try {

        const response = await fetch(
            `${API_BASE_URL}/users/${USER_ID}`
        );

        const data =
            await response.json();

        if (!data.success) {

            message.innerText =
                "Failed to load cart.";

            return;

        }

        const cart =
            data.data.cart || [];

        if (cart.length === 0) {

            message.innerText =
                "Cart is empty.";

            document.getElementById(
                "orderButton"
            ).style.display = "none";

            return;

        }

        message.innerText =
            `Total Items: ${cart.length}`;

        cartContainer.innerHTML = "";

        cart.forEach(item => {

            const cartCard =
                document.createElement("div");

            cartCard.className =
                "product-card";

            cartCard.innerHTML = `

                <h2>
                    ${item.name}
                </h2>

                <p>
                    Product ID:
                    ${item.productId}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

                <button
                    onclick="deleteItem(
                        '${item.productId}'
                    )"
                >
                    Delete
                </button>

            `;

            cartContainer.appendChild(
                cartCard
            );

        });

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to connect to server.";

    }

};


// ========================================
// DELETE CART ITEM
// ========================================

const deleteItem = async (
    productId
) => {

    try {

        const response = await fetch(

            `${API_BASE_URL}/users/${USER_ID}/cart/${productId}`,

            {
                method: "DELETE"
            }

        );

        const data =
            await response.json();

        if (data.success) {

            getCart();

        }

    } catch (error) {

        console.error(error);

    }

};


// ========================================
// PLACE ORDER
// ========================================

const placeOrder = async () => {

    try {

        const response = await fetch(

            `${API_BASE_URL}/users/${USER_ID}/order`,

            {
                method: "POST"
            }

        );

        const data =
            await response.json();

        if (!data.success) {

            message.innerText =
                data.message;

            return;

        }

        alert(
            "Order placed successfully!"
        );

        openOrders();

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to place order.";

    }

};


// ========================================
// NAVIGATION
// ========================================

const openProducts = () => {

    window.location.href =
        "index.html";

};


const openOrders = () => {

    window.location.href =
        "orders.html";

};


// ========================================
// LOAD CART
// ========================================

getCart();