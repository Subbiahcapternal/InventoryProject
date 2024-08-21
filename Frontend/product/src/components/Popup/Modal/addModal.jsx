import React, { useEffect, useState } from "react";
import '../modal.css'
import { IoMdClose } from "react-icons/io";

const AddModal = ({ onClose, onCancel }) => {

    // const [inventoryList, setInventoryList] = useState([]);

    const [inventoryInput, setInventoryInput] = useState(
        {
            product_name: "",
            product_id: "",
            category: "",
            location: "",
            available: "",
            reserved: "",
            on_hand: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryInput({ ...inventoryInput, [name]: value })
    }

    useEffect(() => {
        getInventoryData()
    }, [])

    const getInventoryData = async () => {
        let resp = await fetch('http://localhost:5000/products')
        let result = await resp.json();
        console.log(result)
        // setInventoryList(result)
    }

    // Add
    const addInventory = async () => {
        let headers = {
            method: 'POST',
            body: JSON.stringify(inventoryInput),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        }
        let resp = await fetch('http://localhost:5000/products', headers)
        let result = await resp.json()
        getInventoryData(result)
    }

    // onSubmit
    const handleAddSubmit = (e) => {
        // console.log(inputData)
        e.preventDefault();
        addInventory()
        setInventoryInput(
            {
                product_name: "",
                product_id: "",
                category: "",
                location: "",
                available: "",
                reserved: "",
                on_hand: ""
            }
        )
    }

    return (
        <>
            <div className="modal-container">
                <div className="modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Add Inventory</h3>
                        <button className="close-btn" onClick={() => onClose()}><IoMdClose size="25px" /></button>
                    </div>
                    <div className="modal-form">
                        <form className="add-form" onSubmit={handleAddSubmit}>
                            <div className="form-control">
                                <label className="form-label">Product</label>
                                <input
                                    className="form-input"
                                    name="product_name"
                                    placeholder="Enter Product Name"
                                    value={inventoryInput.product_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">Product ID</label>
                                <input
                                    className="form-input"
                                    name="product_id"
                                    placeholder="Enter Product ID"
                                    value={inventoryInput.product_id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">Category</label>
                                <input
                                    className="form-input"
                                    name="category"
                                    placeholder="Enter Category"
                                    value={inventoryInput.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">Location</label>
                                <input
                                    className="form-input"
                                    name="location"
                                    placeholder="Enter Location"
                                    value={inventoryInput.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">Available</label>
                                <input
                                    className="form-input"
                                    name="available"
                                    type="number"
                                    placeholder="Enter Available"
                                    value={inventoryInput.available}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">Reserved</label>
                                <input
                                    className="form-input"
                                    name="reserved"
                                    type="number"
                                    placeholder="Enter Reserved"
                                    value={inventoryInput.reserved}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-label">On Hand</label>
                                <input
                                    className="form-input"
                                    name="on_hand"
                                    type="number"
                                    placeholder="Enter On Hand"
                                    value={inventoryInput.on_hand}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-btn">
                                <button className="cancel-btn" type="reset" onClick={() => onCancel()}>Cancel</button>
                                <button className="submit-btn" type="submit" value="Submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModal;