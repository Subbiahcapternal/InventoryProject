import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiExport, CiSearch } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import Modal from "../../../Popup/Modal/modal";
import "../Inventory/inventory.css"
import '../../../Popup/modal.css'
import { Link } from "react-router-dom";
import validator from 'validator'
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const Inventory = () => {

    // List State
    const [inventoryList, setInventoryList] = useState([]);

    // Input State
    const [inventoryInput, setInventoryInput] = useState(
        {
            product_name: "",
            product_id: "",
            cetagory: "",
            location: "",
            available: "",
            reserved: "",
            on_hand: "",
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryInput({ ...inventoryInput, [name]: value })
        validateForm(e.target)
    }

    // Filter
    const [inventoryFilter, setInventoryFilter] = useState("");

    const handleFilter = (event) => {
        setInventoryFilter(event.target.value);
    }

    // Validation
    const [error, setError] = useState({});

    const validateForm = (data) => {
        const { name, value } = data;
        switch (name) {
            case "product_name":
                let isvalid = validator.isAlpha(value);
                let isNameEmpty = validator.isEmpty(value);
                if (isNameEmpty) {
                    setError({ ...error, [name]: "Product Name is required" })
                }
                else if (!isvalid) {
                    setError({ ...error, [name]: "Please enter alphabets only" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "product_id":
                let isIdEmpty = validator.isEmpty(value)
                if (isIdEmpty) {
                    setError({ ...error, [name]: "Product ID is required" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "cetagory":
                let isCetagory = validator.isEmpty(value)
                if (isCetagory) {
                    setError({ ...error, [name]: "Cetagory is required" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "location":
                let isLocation = validator.isEmpty(value)
                if (isLocation) {
                    setError({ ...error, [name]: "Location is required" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "available":
                let isAvailable = validator.isEmpty(value)
                let isAvaiNumber = validator.isNumeric(value)
                if (isAvailable) {
                    setError({ ...error, [name]: "Available is required" })
                }
                else if (!isAvaiNumber) {
                    setError({ ...error, [name]: "Available must be number" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "reserved":
                let isReserved = validator.isEmpty(value)
                let isReserNumber = validator.isNumeric(value)
                if (isReserved) {
                    setError({ ...error, [name]: "Reserved is required" })
                }
                else if (!isReserNumber) {
                    setError({ ...error, [name]: "Reserved must be number" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "on_hand":
                let isOnHand = validator.isEmpty(value)
                let isHandNumber = validator.isNumeric(value)
                if (isOnHand) {
                    setError({ ...error, [name]: "On Hand is required" })
                }
                else if (!isHandNumber) {
                    setError({ ...error, [name]: "On Hand must be number" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            default:
        }
    }

    // Modal State
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    // Edit Modal State
    const [isEditable, setIsEditable] = useState(false)

    // Edit Modal open popup
    const handleEdit = (data) => {
        setIsEditable(!isEditable);
        setIsOpen(!isOpen)
        setInventoryInput(data)
    }

    const handleGenerate = () => {
        const doc = new jsPDF()
        const title = "Inventory"
        const padding = 10
        const titleWidth = doc.getTextWidth(title)
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
        doc.setTextColor('black')
        doc.text(title, center, padding)

        doc.autoTable({
            head: [['No', 'Product Name', 'Product ID', 'Cetagory', 'Location', 'Available', 'Reserved', 'On Hand']],
            body: inventoryList.map((data, index) =>
                [
                    index + 1,
                    data.product_name,
                    data.product_id,
                    data.cetagory,
                    data.location,
                    data.available,
                    data.reserved,
                    data.on_hand
                ]),
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 35 },
                2: { cellWidth: 25 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 20 },
                6: { cellWidth: 20 },
                7: { cellWidth: 20 },
            },
            minCellHeight: 10,
            headStyles: {
                fillColor: "#FFC55B",
                textColor: "white"
            }
        })

        doc.save('inventory.pdf')
    }

    // List 
    useEffect(() => {
        fetch('http://localhost:5000/inventory/list')
            .then(response => {
                if (!response.ok) {
                    console.log("Error fetching data")
                }
                return response.json();
            })
            .then(user => {
                setInventoryList(user);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // List Did Mount
    useEffect(() => {
        getInventoryData()
    }, [])

    const getInventoryData = async () => {
        let resp = await fetch('http://localhost:5000/inventory/list')
        let result = await resp.json();
        setInventoryList(result)
    }

    // Delete
    const handleDelete = async (id) => {
        let headers = {
            method: 'DELETE'
        }

        let response = await fetch(`http://localhost:5000/inventory/delete/${id}`, headers)
        let result = await response.json()
        getInventoryData(result)
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
        let resp = await fetch('http://localhost:5000/inventory/add', headers)
        let result = await resp.json()
        getInventoryData(result)
    }

    // edit
    const editInventory = async () => {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(inventoryInput),
            headers: {
                'Content-type': 'application/json'
            }
        }

        let id = inventoryInput._id
        let response = await fetch(`http://localhost:5000/inventory/edit/${id}`, headers)
        let result = await response.json()
        getInventoryData(result)
    }

    // formEmpty
    const formEmpty = () => {
        setInventoryInput(
            {
                product_name: "",
                product_id: "",
                cetagory: "",
                location: "",
                available: "",
                reserved: "",
                on_hand: ""
            }
        )
    }

    // onSubmit
    const handleSubmit = (e) => {
        // console.log(inputData)
        e.preventDefault();
        formEmpty()
        handleClose()
        if (inventoryInput._id) {
            editInventory()
        }
        else {
            addInventory()
        }
    }

    return (
        <>
            <div className="inventory-container">
                <div className="inventory-head">
                    <div className="heading-name">
                        <h3 className="title">Inventory</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/inventory">Inventory</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="inventory-btn">
                        <div className="export-inventory" onClick={handleGenerate}>
                            <CiExport className="export-icon" size="30px" />
                            <button className="export-btn">Export</button>
                        </div>
                        <div className="add-inventory" onClick={toggleOpen}>
                            <IoMdAdd className="add-icon" size="30px" />
                            <button className="add-btn">Add Inventory</button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Modal
                        content={
                            <>
                                <div className="modal-container">
                                    <div className="modal">
                                        <div className="modal-header">
                                            <h3 className="modal-title">
                                                {
                                                    isEditable ? "Edit Inventory" : "Add Inventory"
                                                }
                                            </h3>
                                            <button className="close-btn" onClick={handleClose} ><IoMdClose size="25px" /></button>
                                        </div>
                                        <div className="modal-form">
                                            <form className="add-form" onSubmit={handleSubmit}>
                                                <div className="form-control">
                                                    <label className="form-label">Product</label>
                                                    <input
                                                        className="form-input"
                                                        name="product_name"
                                                        placeholder="Enter Product Name"
                                                        value={inventoryInput.product_name}
                                                        onChange={handleChange}
                                                    />
                                                    {error.product_name && <span className="error-msg">{error.product_name}</span>}
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
                                                    {error.product_id && <span className="error-msg">{error.product_id}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Cetagory</label>
                                                    <input
                                                        className="form-input"
                                                        name="cetagory"
                                                        placeholder="Enter Cetagory"
                                                        value={inventoryInput.cetagory}
                                                        onChange={handleChange}
                                                    />
                                                    {error.Cetagory && <span className="error-msg">{error.Cetagory}</span>}
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
                                                    {error.location && <span className="error-msg">{error.location}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Available</label>
                                                    <input
                                                        className="form-input"
                                                        name="available"
                                                        placeholder="Enter Available"
                                                        value={inventoryInput.available}
                                                        onChange={handleChange}
                                                    />
                                                    {error.available && <span className="error-msg">{error.available}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Reserved</label>
                                                    <input
                                                        className="form-input"
                                                        name="reserved"
                                                        placeholder="Enter Reserved"
                                                        value={inventoryInput.reserved}
                                                        onChange={handleChange}
                                                    />
                                                    {error.reserved && <span className="error-msg">{error.reserved}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">On Hand</label>
                                                    <input
                                                        className="form-input"
                                                        name="on_hand"
                                                        placeholder="Enter On Hand"
                                                        value={inventoryInput.on_hand}
                                                        onChange={handleChange}
                                                    />
                                                    {error.on_hand && <span className="error-msg">{error.on_hand}</span>}
                                                </div>
                                                <div className="form-btn">
                                                    <button className="cancel-btn" type="reset" onClick={handleClose}>Cancel</button>
                                                    {
                                                        isEditable ?
                                                            <button className="submit-btn" type="submit" style={{ backgroundColor: "#007DFE" }}>Save</button> :
                                                            <button
                                                                className="submit-btn"
                                                                type="submit"
                                                                value="Submit"
                                                                disabled={
                                                                    !(error.product_name === "" &&
                                                                        error.product_id === "" &&
                                                                        error.cetagory === "" &&
                                                                        error.location === "" &&
                                                                        error.available === "" &&
                                                                        error.reserved === "" &&
                                                                        error.on_hand === "")
                                                                }
                                                            >Submit</button>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    />
                )}

                <div className="inventory-content-card">
                    <div className="inventory-content">
                        <div className="table-head">
                            <div className="table-search">
                                <CiSearch className="table-search-icon" size="25px" />
                                <input
                                    className="table-search-input"
                                    id="search"
                                    placeholder="Search"
                                    onChange={handleFilter}
                                />
                            </div>
                        </div>
                        <div className="table-card">
                            <table className="table" width="100%" cellPadding={20} cellSpacing={10} style={{ borderCollapse: "collapse" }} border={1}>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Product</th>
                                        <th>Product ID</th>
                                        <th>Cetagory</th>
                                        <th>Location</th>
                                        <th>Available</th>
                                        <th>Reserved</th>
                                        <th>On Hand</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryList.filter((item) => {
                                        return (
                                            inventoryFilter === "" ||
                                            item.product_name
                                                .toLowerCase()
                                                .includes(inventoryFilter.toLowerCase()) ||
                                            item.cetagory
                                                .toLowerCase()
                                                .includes(inventoryFilter.toLowerCase()) ||
                                            item.location
                                                .toLowerCase()
                                                .includes(inventoryFilter.toLowerCase()) ||
                                            item.available
                                                .toString()
                                                .includes(inventoryFilter) ||
                                            item.on_hand
                                                .toString()
                                                .includes(inventoryFilter) ||
                                            item.reserved
                                                .toString()
                                                .includes(inventoryFilter)
                                        );
                                    }).map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
                                            <td>{data.product_name}</td>
                                            <td>{data.product_id}</td>
                                            <td className="category">
                                                <span className="items">{data.cetagory}</span>
                                            </td>
                                            <td>{data.location}</td>
                                            <td>{data.available}</td>
                                            <td>{data.reserved}</td>
                                            <td>{data.on_hand}</td>
                                            <td className="action-btn">
                                                <ul className="action-ul">
                                                    <li className="action-list">
                                                        <button
                                                            className="update-btn"
                                                            onClick={() => {
                                                                handleEdit(data)
                                                            }}
                                                        >
                                                            <RiEditLine size="15px" />
                                                        </button>
                                                    </li>
                                                    <li className="action-list"> <button className="delete-btn" onClick={() => { handleDelete(data._id) }}><FaTrashAlt size="15px" /></button></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Inventory;
