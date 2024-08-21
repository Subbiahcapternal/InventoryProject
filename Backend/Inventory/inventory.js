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
    }).then(() => app.listen(5000, () => {
        console.log("Server started");
    })).catch((error) => console.log(error))

require('./inventoryModel')

const Inventory = mongoose.model("inventory")

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
    const { product_name, product_id, cetagory, location, available, reserved, on_hand } = req.body;
    try {
        await Inventory.create({
            product_name,
            product_id,
            cetagory,
            location,
            available,
            reserved,
            on_hand,
        })
        res.status(200).json("Inventory Successfully added")
    } catch (error) {
        res.status(500).json(error)
    }

})

//update
app.put("/inventory/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { _id, product_name, product_id, cetagory, location, available, reserved, on_hand } = req.body
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
