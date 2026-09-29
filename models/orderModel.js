const { getDB } = require("../config/mongodb");


// ========================================
// CREATE ORDER
// ========================================

const createOrder = async (order) => {

    const db = getDB();

    const result = await db
        .collection("orders")
        .insertOne(order);

    return result;
};


// ========================================
// GET ALL ORDERS OF USER
// ========================================

const getOrdersByUserId = async (userId) => {

    const db = getDB();

    const orders = await db
        .collection("orders")
        .find({
            userId: userId
        })
        .toArray();

    return orders;
};


module.exports = {
    createOrder,
    getOrdersByUserId
};