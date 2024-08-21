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
    }).then(() => app.listen(5002, () => {
        console.log("Server started");
    })).catch((error) => console.log(error))

require('./stockModel');

const Stock = mongoose.model("stock")

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
    const { _id,  product_name, product_id, cetagory, quanity, location, status  } = req.body
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