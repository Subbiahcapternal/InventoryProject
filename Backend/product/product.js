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
    }).then(() => app.listen(5001, () => {
        console.log("Server started");
    })).catch((error) => console.log(error))

require('./productModel');

const Product = mongoose.model("product")

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
    const { _id,  product_name, product_id, price, stock, status  } = req.body
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