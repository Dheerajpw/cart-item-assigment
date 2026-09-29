const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
    connectMongoDB
} = require("./config/mongodb");

const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 5000;


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Cart Items API is running"
    });

});


// ========================================
// USER ROUTES
// ========================================

app.use("/api", userRoutes);


// ========================================
// START SERVER
// ========================================

const startServer = async () => {

    try {

        await connectMongoDB();

        app.listen(PORT, () => {

            console.log(
                `Server is running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Server failed to start:",
            error.message
        );

    }

};

startServer();