const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

const connectDB = require("../config/db");
const Product = require("../models/Product");

dotenv.config();

connectDB();

const categories = [
  "Electronics",
  "Apparel",
  "Furniture",
  "Sports",
  "Books",
  "Home",
  "Beauty",
  "Toys",
];

const generateProducts = async () => {
  try {
    // Purana data delete
    await Product.deleteMany();

    console.log("Old Products Deleted");

    const products = [];

    for (let i = 0; i < 50000; i++) {
      const cost = faker.number.int({ min: 50, max: 5000 });

      const price = cost + faker.number.int({ min: 20, max: 2000 });

      products.push({
        productName: faker.commerce.productName(),

        sku: `SKU-${i + 1}`,

        category:
          categories[Math.floor(Math.random() * categories.length)],

        price,

        cost,

        stockQuantity: faker.number.int({ min: 0, max: 500 }),

        reorderLevel: faker.number.int({ min: 5, max: 50 }),

        lastUpdated: faker.date.recent(),
      });
    }

    await Product.insertMany(products);

    console.log("50,000 Products Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

generateProducts();