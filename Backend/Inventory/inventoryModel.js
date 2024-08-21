const mongoose = require('mongoose')

const InventorySchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        cetagory: String,
        location: String,
        reserved: Number,
        available: Number,
        on_hand: Number
    }, {
    collection: "inventory"
}
)

mongoose.model("inventory", InventorySchema)