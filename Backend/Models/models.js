const mongoose = require('mongoose')

const InventorySchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        cetagory: String,
        location: String,
        reserved: Number,
        available: Number
    });

const OrderSchema = mongoose.Schema(
    {
        product_id: String,
        product_name: String,
        order_id: String,
        customer_id: String,
        order_date: String,
        location: String,
        status: String
    });

const ProductSchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        price: Number,
        stock: Number,
        status: String
    });

const StockSchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        cetagory: String,
        quanity: Number,
        location: String,
        status: String
    });

const Inventory = mongoose.model("inventory", InventorySchema);
const Product = mongoose.model("product", ProductSchema);
const Order = mongoose.model("order", OrderSchema);
const Stock = mongoose.model("stock", StockSchema)

module.exports = {
    Inventory, Product, Order, Stock
}