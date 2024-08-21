export default function Validation({ values }) {

    const errors = {}

    if (values.product_id === "") {
        errors.product_id = "Product ID is required"
    }

    if (values.product_name === "") {
        errors.product_name = "Product Name is required"
    }
}