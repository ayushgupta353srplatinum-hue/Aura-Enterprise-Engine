const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    reorderLevel: {
      type: Number,
      required: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.index({ category: 1 });

productSchema.index({ productName: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;