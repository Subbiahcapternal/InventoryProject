const express = require("express")
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors")
app.use(cors());


//Mongoose connection
mongoose.connect('mongodb+srv://subbiah01999:subbiah27@cluster0.gkrwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => app.listen(5003, () => {
        console.log("Server started");
    })).catch((error) => console.log(error))

require('./orderModel');

const Order = mongoose.model("order")

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