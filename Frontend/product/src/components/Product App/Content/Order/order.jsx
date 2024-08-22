import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiExport, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import './order.css'
import { RiEditLine } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../../Popup/Modal/modal";
import validator from "validator";
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const Order = () => {

    // List State
    const [orderList, setOrderList] = useState([]);

    // Input State
    const [orderInput, setOrderInput] = useState(
        {
            product_id: "",
            product_name: "",
            order_id: "",
            customer_id: "",
            order_date: "",
            location: "",
            status: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderInput({ ...orderInput, [name]: value })
        validateForm(e.target)
    }

    // Filter
    const [orderFilter, setOrderFilter] = useState("");

    const handleFilter = (event) => {
        setOrderFilter(event.target.value);
    }

    // Select Option
    const status = [
        { value: "Delivered", label: "Delivered" },
        { value: "In Progress", label: "In Progress" },
        { value: "Declined", label: "Declined" },
        { value: "Return", label: "Return" },
        { value: "Cancel", label: "Cancel" }
    ]

    const getColor = (status) => {
        if (status === 'Delivered') {
            return '#08A423';
        }
        else if (status === 'Cancel') {
            return '#FF2831';
        }
        else if (status === 'In Progress') {
            return '#FF9926';
        }
        else if (status === 'Declined') {
            return '#267BFF';
        }
        else if (status === 'Return') {
            return '#923DFB';
        }
        else
            return '';
    };

    const getBgColor = (status) => {
        if (status === 'Delivered') {
            return '#CCEED7';
        }
        else if (status === 'Cancel') {
            return '#FFD9DB';
        }
        else if (status === 'In Progress') {
            return '#FFE8CC';
        }
        else if (status === 'Declined') {
            return '#D6E6FF';
        }
        else if (status === 'Return') {
            return '#F0E4FF';
        }
        else
            return '';
    };

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
    const handleEdit = (item) => {
        setIsEditable(!isEditable);
        setIsOpen(!isOpen)
        setOrderInput(item)
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
            case "order_id":
                let isOrderID = validator.isEmpty(value)
                if (isOrderID) {
                    setError({ ...error, [name]: "Order ID is required" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "customer_id":
                let isCustomer = validator.isEmpty(value)
                if (isCustomer) {
                    setError({ ...error, [name]: "Customer ID is required" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "order_date":
                let isOrderDate = validator.isEmpty(value)
                if (isOrderDate) {
                    setError({ ...error, [name]: "Order Date is required" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "location":
                let isLocation = validator.isEmpty(value)
                if (isLocation) {
                    setError({ ...error, [name]: "Location is required" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "status":
                let isStatus = validator.isEmpty(value)
                if (isStatus) {
                    setError({ ...error, [name]: "Status is required" })
                } else {
                    setError({ ...error, [name]: "" })
                }
                break;
            default:
        }
    }

    // Pdf
    const handleGenerate = () => {
        const doc = new jsPDF()
        const title = "Order"
        const padding = 10
        const titleWidth = doc.getTextWidth(title)
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
        doc.setTextColor('black')
        doc.text(title, center, padding)

        doc.autoTable({
            head: [['No', 'ID', 'Name', 'Order ID', 'Customer ID', 'Date', 'location', 'Status']],
            body: orderList.map((data, index) =>
                [
                    index + 1,
                    data.product_id,
                    data.product_name,
                    data.order_id,
                    data.customer_id,
                    data.order_date,
                    data.location,
                    data.status
                ]),
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 25 },
                2: { cellWidth: 25 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 },
                6: { cellWidth: 25 },
                7: { cellWidth: 25 },
            },
            minCellHeight: 10,
            headStyles: {
                fillColor: "#FFC55B",
                textColor: "white"
            }
        })

        doc.save('order.pdf')
    }

    // List 
    useEffect(() => {
        fetch('http://localhost:5000/order/list')
            .then(response => {
                if (!response.ok) {
                    console.log("Error fetching data")
                }
                return response.json();
            })
            .then(user => {
                setOrderList(user);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // List Did Mount
    useEffect(() => {
        getOrderData()
    }, [])

    const getOrderData = async () => {
        let resp = await fetch('http://localhost:5000/order/list')
        let result = await resp.json();
        setOrderList(result)
    }

    // Delete
    const handleDelete = async (id) => {
        let headers = {
            method: 'DELETE'
        }

        let response = await fetch(`http://localhost:5000/order/delete/${id}`, headers)
        let result = await response.json()
        getOrderData(result)
    }

    // Add
    const addOrder = async () => {
        let headers = {
            method: 'POST',
            body: JSON.stringify(orderInput),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        }
        let resp = await fetch('http://localhost:5000/order/add', headers)
        let result = await resp.json()
        getOrderData(result)
    }

    // edit
    const editOrder = async () => {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(orderInput),
            headers: {
                'Content-type': 'application/json'
            }
        }

        let id = orderInput._id
        let response = await fetch(`http://localhost:5000/order/edit/${id}`, headers)
        let result = await response.json()
        getOrderData(result)
    }

    const formEmpty = () => {
        setOrderInput(
            {
                product_id: "",
                product_name: "",
                order_id: "",
                customer_id: "",
                order_date: "",
                location: "",
                status: ""
            }
        )
    }

    // onSubmit
    const handleSubmit = (e) => {
        // console.log(inputData)
        e.preventDefault();
        formEmpty()
        handleClose()
        if (orderInput._id) {
            editOrder()
        }
        else {
            addOrder()
        }
    }

    return (
        <>
            <div className="order-container">
                <div className="order-head">
                    <div className="heading-name">
                        <h3 className="title">Order</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="">Order</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="order-btn">
                        <div className="export-order" onClick={handleGenerate}>
                            <CiExport className="export-icon" size="30px" />
                            <button className="export-btn">Export</button>
                        </div>
                        <div className="add-order" onClick={toggleOpen}>
                            <IoMdAdd className="add-icon" size="30px" />
                            <button className="add-btn">Add Order</button>
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
                                                    isEditable ? "Edit Order" : "Add Order"
                                                }
                                            </h3>
                                            <button className="close-btn" onClick={handleClose} ><IoMdClose size="25px" /></button>
                                        </div>
                                        <div className="modal-form">
                                            <form className="add-form" onSubmit={handleSubmit}>
                                                <div className="form-control">
                                                    <label className="form-label">Product ID</label>
                                                    <input
                                                        className="form-input"
                                                        name="product_id"
                                                        placeholder="Enter Product ID"
                                                        value={orderInput.product_id}
                                                        onChange={handleChange}
                                                    />
                                                    {error.product_id && <span className="error-msg">{error.product_id}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Product Name</label>
                                                    <input
                                                        className="form-input"
                                                        name="product_name"
                                                        placeholder="Enter Product Name"
                                                        value={orderInput.product_name}
                                                        onChange={handleChange}
                                                    />
                                                    {error.product_name && <span className="error-msg">{error.product_name}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Order ID</label>
                                                    <input
                                                        className="form-input"
                                                        name="order_id"
                                                        placeholder="Enter Order ID"
                                                        value={orderInput.order_id}
                                                        onChange={handleChange}
                                                    />
                                                    {error.order_id && <span className="error-msg">{error.order_id}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Customer ID</label>
                                                    <input
                                                        className="form-input"
                                                        name="customer_id"
                                                        placeholder="Enter Customer ID"
                                                        value={orderInput.customer_id}
                                                        onChange={handleChange}
                                                    />
                                                    {error.customer_id && <span className="error-msg">{error.customer_id}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Date</label>
                                                    <input
                                                        className="form-input"
                                                        name="order_date"
                                                        type="date"
                                                        placeholder="Enter Customer ID"
                                                        value={orderInput.order_date}
                                                        onChange={handleChange}
                                                    />
                                                    {error.order_date && <span className="error-msg">{error.order_date}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Location</label>
                                                    <input
                                                        className="form-input"
                                                        name="location"
                                                        placeholder="Enter Location"
                                                        value={orderInput.location}
                                                        onChange={handleChange}
                                                    />
                                                    {error.location && <span className="error-msg">{error.location}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Status</label>
                                                    <select className="status-select" name="status" value={orderInput.status} onChange={handleChange}>
                                                        <option>Select Status</option>
                                                        {status.map((data) => (
                                                            <option key={data.value} value={data.value}>{data.label}</option>
                                                        ))}
                                                    </select>
                                                    {error.status && <span className="error-msg">{error.status}</span>}
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
                                                                        error.order_id === "" &&
                                                                        error.customer_id === "" &&
                                                                        error.order_date === "" &&
                                                                        error.location === "" &&
                                                                        error.status === "")
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
                            <table className="table" width="100%" cellPadding={20} cellSpacing={5} style={{ borderCollapse: "collapse" }} border={1}>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Order Detail</th>
                                        <th>Order ID</th>
                                        <th>Customer ID</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderList.filter((item) => {
                                            return (
                                                orderFilter === "" ||
                                                item.product_name
                                                    .toLowerCase()
                                                    .includes(orderFilter.toLowerCase()) ||
                                                item.status
                                                    .toLowerCase()
                                                    .includes(orderFilter.toLowerCase())
                                            );
                                        }).map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>
                                                <td className="productName"> {item.product_name}
                                                    <div className="product-name">
                                                        <p className="productId">ID : <span className="product_id">{item.product_id}</span></p>
                                                    </div>
                                                </td>
                                                <td>{item.order_id}</td>
                                                <td>{item.customer_id}</td>
                                                <td>{item.order_date}</td>
                                                <td>{item.location}</td>
                                                <td className="status-items" >
                                                    <span className="status" style={{ color: getColor(item.status), backgroundColor: getBgColor(item.status) }}>{item.status}</span>
                                                </td>
                                                <td className="action-btn">
                                                    <ul className="action-ul">
                                                        <li className="action-list">
                                                            <button
                                                                className="update-btn"
                                                                onClick={() => {
                                                                    handleEdit(item)
                                                                }}
                                                            >
                                                                <RiEditLine size="15px" />
                                                            </button>
                                                        </li>
                                                        <li className="action-list"> <button className="delete-btn" onClick={() => { handleDelete(item._id) }}><FaTrashAlt size="15px" /></button></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Order;
