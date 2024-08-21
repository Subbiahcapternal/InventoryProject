const mongoose = require('mongoose')

const StockSchema = mongoose.Schema(
    {
        product_name: String,
        product_id: String,
        cetagory: String,
        quanity: Number,
        location: String,
        status: String
    }, {
    collection: "stock"
}
)

mongoose.model("stock", StockSchema)