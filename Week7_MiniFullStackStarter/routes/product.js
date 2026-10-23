const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET all products
router.get("/", async (req, res) => {
    try {
        const Products = await Product.find();
        res.json(Products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;