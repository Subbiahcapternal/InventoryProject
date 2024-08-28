const express = require("express")
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors")
app.use(cors());
require('dotenv').config({ path: "../.env" });


const { Inventory, Product, Order, Stock } = require('../Models/models');


//Mongoose connection
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => app.listen(process.env.PORT, () => {
        console.log("Server started");
    })).catch((error) => console.log(error))

//read
app.get("/inventory/list", async (req, res) => {

    try {
        let inventory = await Inventory.find();
        res.status(200).json(inventory)
    } catch (error) {
        res.status(500).json(error, "Inventory Data not found")
    }
})

//create
app.post("/inventory/add", async (req, res) => {
    const { product_name, product_id, cetagory, location, available, reserved } = req.body;
    try {
        await Inventory.create({
            product_name,
            product_id,
            cetagory,
            location,
            available,
            reserved
        })
        res.status(200).json("Inventory Successfully added")
    } catch (error) {
        res.status(500).json(error)
    }

})

//update
app.put("/inventory/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { _id, product_name, product_id, cetagory, location, available, reserved } = req.body
    if (id === _id) {
        try {
            const inventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ inventory })
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//delete
app.delete("/inventory/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Inventory.findByIdAndDelete(id);
        res.status(200).json("Inventory Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Product
app.get("/product/list", async (req, res) => {

    try {
        let product = await Product.find();
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error, "Product Data not found")
    }
})

//create
app.post("/product/add", async (req, res) => {
    const { product_name, product_id, price, stock, status } = req.body;
    try {
        await Product.create({
            product_id,
            product_name,
            price,
            stock,
            status
        })
        res.status(200).json("Product Successfully added")
    } catch (error) {
        res.status(500).json(error)
    }

})

//update
app.put("/product/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { _id, product_name, product_id, price, stock, status } = req.body
    if (id === _id) {
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ product })
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//delete
app.delete("/product/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json("Product Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }

})

// Stock
app.get("/stock/list", async (req, res) => {

    try {
        let stock = await Stock.find();
        res.status(200).json(stock)
    } catch (error) {
        res.status(500).json(error, "Stock Data not found")
    }
})

//create
app.post("/stock/add", async (req, res) => {
    const { product_name, product_id, cetagory, quanity, location, status } = req.body;
    try {
        await Stock.create({
            product_id,
            product_name,
            cetagory,
            quanity,
            location,
            status
        })
        res.status(200).json("Stock Successfully added")
    } catch (error) {
        res.status(500).json(error)
    }

})

//update
app.put("/stock/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { _id, product_name, product_id, cetagory, quanity, location, status } = req.body
    if (id === _id) {
        try {
            const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ stock })
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//delete
app.delete("/stock/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Stock.findByIdAndDelete(id);
        res.status(200).json("Stock Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }

})

// Order
app.get("/order/list", async (req, res) => {

    try {
        let order = await Order.find();
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error, "Order Data not found")
    }
})

//create
app.post("/order/add", async (req, res) => {
    const { product_name, product_id, order_id,
        customer_id,
        order_date,
        location,
        status } = req.body;
    try {
        await Order.create({
            product_id,
            product_name,
            order_id,
            customer_id,
            order_date,
            location,
            status
        })
        res.status(200).json("Order Successfully added")
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
app.put("/order/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { _id, product_name, product_id, order_id,
        customer_id,
        order_date,
        location,
        status } = req.body
    if (id === _id) {
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ order })
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//delete
app.delete("/order/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json("Order Deleted Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})
