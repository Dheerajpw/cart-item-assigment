const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb");


// ========================================
// CREATE USER
// ========================================

const createUser = async (user) => {

    const db = getDB();

    const result = await db
        .collection("users")
        .insertOne(user);

    return result;
};


// ========================================
// FIND USER BY ID
// ========================================

const findUserById = async (userId) => {

    const db = getDB();

    const user = await db
        .collection("users")
        .findOne({
            _id: new ObjectId(userId)
        });

    return user;
};


// ========================================
// UPDATE USER CART
// ========================================

const updateUserCart = async (userId, cart) => {

    const db = getDB();

    const result = await db
        .collection("users")
        .updateOne(
            {
                _id: new ObjectId(userId)
            },
            {
                $set: {
                    cart: cart
                }
            }
        );

    return result;
};


module.exports = {
    createUser,
    findUserById,
    updateUserCart
};