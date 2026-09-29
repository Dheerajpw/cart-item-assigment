const {
    createUser,
    findUserById,
    updateUserCart
} = require("../models/userModel");


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
// DELETE CART ITEM
// ========================================

const deleteCartItem = async (req, res) => {

    try {

        const userId = req.params.userId;
        const productId = req.params.productId;

        const user = await findUserById(userId);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cart = user.cart || [];

        const newCart = cart.filter(
            item => String(item.productId) !== String(productId)
        );

        if (newCart.length === cart.length) {

            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        await updateUserCart(userId, newCart);

        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            cart: newCart
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete cart item",
            error: error.message
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
    deleteCartItem
};