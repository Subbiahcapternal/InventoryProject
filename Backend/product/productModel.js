const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        price: Number,
        stock: Number,
        status: String
    }, {
    collection: "product"
}
)

mongoose.model("product", ProductSchema)