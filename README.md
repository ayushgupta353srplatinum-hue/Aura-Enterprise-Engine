# Aura Enterprise Engine

Enterprise-grade Inventory Management Backend System built using Node.js, Express.js, MongoDB, and Mongoose.

This project is designed to efficiently handle 50,000+ inventory records with optimized querying, aggregation pipelines, server-side pagination, and secure validation mechanisms.

---

# Project Overview

Aura Enterprise Engine is a high-performance backend system developed for large-scale inventory management operations.

The system is optimized to solve performance bottlenecks caused by loading massive inventory datasets into the browser at once.

This backend provides:

- Fast server-side pagination
- Full-text product search
- Advanced filtering & sorting
- MongoDB aggregation analytics
- Strict business validation rules
- Optimized indexed queries
- Massive mock data seeding

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Joi Validation
- Faker.js
- Morgan
- Dotenv
- CORS

---

# Features

## Inventory Management APIs

- Server-side Pagination
- Product Search
- Category Filtering
- Sorting (Ascending / Descending)
- Pagination Metadata
- CRUD Operations

---

## Analytics Engine

MongoDB Aggregation Pipelines are used for high-performance analytics.

### Analytics Provided

- Total Inventory Value
- Total SKUs
- Out of Stock Items
- Category-wise Inventory Valuation
- Top 10 Low Stock Products

---

## Performance Optimization

- MongoDB Indexing
- Text Search Indexes
- Aggregation Pipelines
- Optimized Query Engine
- Efficient Pagination Handling

---

# Database Indexes

Indexes implemented on:

- sku
- category
- productName

These indexes significantly improve query performance on large datasets.

---

# Validation Rules

Implemented using Joi middleware.

## Business Rules

- Product price cannot be lower than cost
- stockQuantity cannot be negative

Invalid requests return proper `400 Bad Request` responses.

---

# Massive Data Seeding

A standalone seeder script generates and inserts:

- 50,000 realistic mock products

using Faker.js for performance testing and scalability simulation.

---

# API Endpoints

## Base URL

```bash
https://aura-enterprise-engine.onrender.com
```

---

# Inventory APIs

## Get Products

```bash
GET /api/inventory
```

### Query Parameters

```bash
?page=1
&limit=50
&search=laptop
&category=Electronics
&sort=-price
```

---

## Create Product

```bash
POST /api/inventory
```

---

## Update Product

```bash
PUT /api/inventory/:id
```

---

## Delete Product

```bash
DELETE /api/inventory/:id
```

---

# Analytics API

```bash
GET /api/analytics
```

## Returns

- Inventory valuation
- SKU statistics
- Out-of-stock analysis
- Category distribution
- Low stock products

---

# Folder Structure

```bash
backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── seeders
├── validations
│
├── server.js
├── package.json
└── .env
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/ayushgupta353srplatinum-hue/Aura-Enterprise-Engine.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## Run Development Server

```bash
npm run dev
```

---

## Seed Database

```bash
npm run seed
```

---

# Deployment

## Live Backend URL

https://aura-enterprise-engine.onrender.com
---

# Performance Highlights

- Handles 50,000+ inventory records efficiently
- Optimized MongoDB queries using indexes
- Aggregation pipelines reduce server computation overhead
- Server-side pagination prevents browser freezing
- Fast analytics response generation

---

# Future Improvements

- Authentication & Authorization
- Role-based Access Control
- Redis Caching
- CSV Export Support
- Real-time Inventory Updates
- Frontend Dashboard Integration

---
