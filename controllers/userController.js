const {
    createUser,
    findUserById,
    updateUserCart
} = require("../models/userModel");

const {
    createOrder,
    getOrdersByUserId
} = require("../models/orderModel");


// ========================================
// CREATE USER
// ========================================

const addUser = async (req, res) => {

    try {

        const user = req.body;

        user.cart = [];

        const result = await createUser(user);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            insertedId: result.insertedId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
};


// ========================================
// GET USER
// ========================================

const getUser = async (req, res) => {

    try {

        const user = await findUserById(req.params.userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User found successfully",
            data: user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to find user",
            error: error.message
        });
    }
};


// ========================================
// FIX CART FORMAT
// ========================================

const fixCart = async (req, res) => {

    try {

        const userId = req.params.userId;

        const user = await findUserById(userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const newCart = [
            {
                productId: "101",
                name: "Hair Cut",
                quantity: 1
            },
            {
                productId: "102",
                name: "Hair Spa",
                quantity: 2
            }
        ];

        await updateUserCart(userId, newCart);

        res.status(200).json({
            success: true,
            message: "Cart fixed successfully",
            cart: newCart
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fix cart",
            error: error.message
        });
    }
};


// ========================================
// ADD ITEM TO CART
// ========================================

const addCartItem = async (req, res) => {

    try {

        const userId = req.params.userId;

        const {
            productId,
            name,
            quantity
        } = req.body;


        // Validate input

        if (!productId || !name || !quantity) {

            return res.status(400).json({
                success: false,
                message:
                    "Product ID, name and quantity are required"
            });
        }


        // Find user

        const user = await findUserById(userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // Get existing cart

        const cart = user.cart || [];


        // Check if product already exists

        const existingItem = cart.find(
            item =>
                String(item.productId) ===
                String(productId)
        );


        // If product already exists,
        // increase quantity

        if (existingItem) {

            existingItem.quantity +=
                Number(quantity);

        } else {

            // Otherwise add new product

            cart.push({

                productId:
                    String(productId),

                name: name,

                quantity:
                    Number(quantity)

            });

        }


        // Update cart in MongoDB

        await updateUserCart(
            userId,
            cart
        );


        // Send response

        res.status(200).json({

            success: true,

            message:
                "Product added to cart successfully",

            cart: cart

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to add product to cart",

            error:
                error.message

        });
    }
};


// ========================================
// DELETE CART ITEM
// ========================================

const deleteCartItem = async (req, res) => {

    try {

        const userId =
            req.params.userId;

        const productId =
            req.params.productId;


        const user =
            await findUserById(userId);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });
        }


        const cart =
            user.cart || [];


        const newCart =
            cart.filter(

                item =>
                    String(item.productId) !==
                    String(productId)

            );


        if (
            newCart.length ===
            cart.length
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found in cart"

            });
        }


        await updateUserCart(
            userId,
            newCart
        );


        res.status(200).json({

            success: true,

            message:
                "Cart item deleted successfully",

            cart:
                newCart

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to delete cart item",

            error:
                error.message

        });
    }
};


// ========================================
// PLACE ORDER
// ========================================

const placeOrder = async (req, res) => {

    try {

        const userId =
            req.params.userId;


        const user =
            await findUserById(userId);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });
        }


        const cart =
            user.cart || [];


        if (cart.length === 0) {

            return res.status(400).json({

                success: false,

                message:
                    "Cart is empty"

            });
        }


        // Save every cart item
        // into orders collection

        for (const item of cart) {

            await createOrder({

                userId:
                    userId,

                productId:
                    item.productId,

                name:
                    item.name,

                quantity:
                    item.quantity

            });

        }


        // Empty cart

        await updateUserCart(
            userId,
            []
        );


        res.status(200).json({

            success: true,

            message:
                "Order placed successfully",

            orders:
                cart

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to place order",

            error:
                error.message

        });
    }
};


// ========================================
// GET USER ORDERS
// ========================================

const getUserOrders = async (req, res) => {

    try {

        const userId =
            req.params.userId;


        const user =
            await findUserById(userId);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });
        }


        const orders =
            await getOrdersByUserId(
                userId
            );


        console.log(
            "User Orders:",
            orders
        );


        res.status(200).json({

            success: true,

            message:
                "Orders retrieved successfully",

            orders:
                orders

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to retrieve orders",

            error:
                error.message

        });
    }
};


// ========================================
// EXPORT
// ========================================

module.exports = {

    addUser,

    getUser,

    fixCart,

    addCartItem,

    deleteCartItem,

    placeOrder,

    getUserOrders

};