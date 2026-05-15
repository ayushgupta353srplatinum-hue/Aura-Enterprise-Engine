const express = require("express");

const router = express.Router();

const {
  getProducts,
  getAnalytics,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validateProduct = require("../validations/productValidation");

// Inventory Routes
router.get("/inventory", getProducts);

router.post("/inventory", validateProduct, createProduct);

router.put("/inventory/:id", validateProduct, updateProduct);

router.delete("/inventory/:id", deleteProduct);

// Analytics Route
router.get("/analytics", getAnalytics);

module.exports = router;