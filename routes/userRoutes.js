const express = require("express");

const router = express.Router();

const {
    addUser,
    getUser,
    fixCart,
    deleteCartItem
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
// DELETE CART ITEM
// ========================================

router.delete(
    "/users/:userId/cart/:productId",
    deleteCartItem
);


module.exports = router;