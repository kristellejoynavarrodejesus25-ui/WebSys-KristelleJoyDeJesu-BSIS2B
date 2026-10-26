const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/User");
const Product = require("../models/product");

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("products");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;