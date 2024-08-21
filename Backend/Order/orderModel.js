const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
    {
        product_id: String,
        product_name: String,
        order_id: String,
        customer_id: String,
        order_date: String,
        location: String,
        status: String
    }, {
    collection: "order"
}
)

mongoose.model("order", OrderSchema)