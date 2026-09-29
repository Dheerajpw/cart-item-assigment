const USER_ID =
    "6abbb271cdb8b556c19ddd40";

const API_BASE_URL =
    "http://localhost:5000/api";


// ========================================
// PRODUCTS
// ========================================

const products = [

    {
        productId: "101",
        name: "Hair Cut",
        quantity: 1
    },

    {
        productId: "102",
        name: "Hair Spa",
        quantity: 1
    },

    {
        productId: "103",
        name: "Hair Coloring",
        quantity: 1
    },

    {
        productId: "104",
        name: "Face Cleanup",
        quantity: 1
    }

];


// ========================================
// ELEMENTS
// ========================================

const productsContainer =
    document.getElementById("productsContainer");

const message =
    document.getElementById("message");


// ========================================
// SHOW PRODUCTS
// ========================================

const showProducts = () => {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className =
            "product-card";

        productCard.innerHTML = `

            <h2>
                ${product.name}
            </h2>

            <p>
                Product ID:
                ${product.productId}
            </p>

            <button
                onclick="addToCart(
                    '${product.productId}',
                    '${product.name}'
                )"
            >
                Add to Cart
            </button>

        `;

        productsContainer.appendChild(
            productCard
        );

    });

};


// ========================================
// ADD TO CART
// ========================================

const addToCart = async (
    productId,
    name
) => {

    try {

        const response = await fetch(
            `${API_BASE_URL}/users/${USER_ID}/cart`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    productId: productId,

                    name: name,

                    quantity: 1

                })

            }
        );

        const data =
            await response.json();

        if (!data.success) {

            message.innerText =
                "Failed to add product.";

            return;

        }

        message.innerText =
            `${name} added to cart successfully.`;

        // =================================
        // OPEN CART PAGE
        // =================================

        setTimeout(() => {

            openCart();

        }, 500);

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to connect to server.";

    }

};


// ========================================
// OPEN CART PAGE
// ========================================

const openCart = () => {

    window.location.href =
        "cart.html";

};


// ========================================
// OPEN ORDERS PAGE
// ========================================

const openOrders = () => {

    window.location.href =
        "orders.html";

};


// ========================================
// LOAD PRODUCTS
// ========================================

showProducts();