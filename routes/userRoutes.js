const express = require("express");

const router = express.Router();

const {
    addUser,
    getUser,
    fixCart,
    deleteCartItem,
    placeOrder,
    getUserOrders,
    addCartItem
} = require("../controllers/userController");


// ========================================
// CREATE USER
// ========================================

router.post(
    "/users",
    addUser
);


// ========================================
// GET USER
// ========================================

router.get(
    "/users/:userId",
    getUser
);


// ========================================
// FIX CART FORMAT
// ========================================

router.put(
    "/users/:userId/fix-cart",
    fixCart
);


// ========================================
// ADD ITEM TO CART
// ========================================

router.post(
    "/users/:userId/cart",
    addCartItem
);


// ========================================
// DELETE CART ITEM
// ========================================

router.delete(
    "/users/:userId/cart/:productId",
    deleteCartItem
);


// ========================================
// PLACE ORDER
// ========================================

router.post(
    "/users/:userId/order",
    placeOrder
);


// ========================================
// GET USER ORDERS
// ========================================

router.get(
    "/users/:userId/orders",
    getUserOrders
);


module.exports = router;