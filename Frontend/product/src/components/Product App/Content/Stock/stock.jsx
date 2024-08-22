import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiEdit, CiExport, CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { GrSystem } from "react-icons/gr";
import { Link } from "react-router-dom";
import '../Stock/stock.css'
import Modal from "../../../Popup/Modal/modal";
import validator from "validator";
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const Stock = () => {

    // List State
    const [stockList, setStockList] = useState([]);

    // Input State
    const [stockInput, setStockInput] = useState(
        {
            product_id: "",
            product_name: "",
            cetagory: "",
            quanity: "",
            location: "",
            status: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStockInput({ ...stockInput, [name]: value })
        validateForm(e.target)
    }

    // Filter
    const [stockFilter, setStockFilter] = useState("");

    const handleFilter = (event) => {
        setStockFilter(event.target.value);
    }

    // Status Option
    const status = [
        { value: "Available", label: "Available" },
        { value: "Not Found", label: "Not Found" },
        { value: "Pending", label: "Pending" }
    ]

    const getColor = (status) => {
        if (status === 'Available') {
            return '#08A423';
        }
        else if (status === 'Not Found') {
            return '#FF2831';
        }
        else if (status === 'Pending') {
            return '#FF9926';
        }
        else
            return '';
    };

    const getBgColor = (status) => {
        if (status === 'Available') {
            return '#CCEED7';
        }
        else if (status === 'Not Found') {
            return '#FFD9DB';
        }
        else if (status === 'Pending') {
            return '#FFE8CC';
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
    const [isEditable, setIsEditable] = useState(false);

    // Edit Modal open popup
    const handleEdit = (data) => {
        setIsEditable(!isEditable);
        setIsOpen(!isOpen)
        setStockInput(data)
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
                let isText = validator.isAlpha(value)
                if (isCetagory) {
                    setError({ ...error, [name]: "Cetagory is required" })
                }
                else if (!isText) {
                    setError({ ...error, [name]: "Please enter alphabets only" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "quanity":
                let isQuanity = validator.isEmpty(value)
                let isQuanityNumber = validator.isNumeric(value)
                if (isQuanity) {
                    setError({ ...error, [name]: "Quanity is required" })
                }
                else if (!isQuanityNumber) {
                    setError({ ...error, [name]: "Quanity must be number" })
                }
                else {
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
        const title = "Stock"
        const padding = 10
        const titleWidth = doc.getTextWidth(title)
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
        doc.setTextColor('black')
        doc.text(title, center, padding)

        doc.autoTable({
            head: [['No', 'Product ID', 'Product Name', 'Cetagory', 'Quanity', 'location', 'Status']],
            body: stockList.map((data, index) =>
                [
                    index + 1,
                    data.product_id,
                    data.product_name,
                    data.cetagory,
                    data.quanity,
                    data.location,
                    data.status
                ]),
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 30 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 },
                6: { cellWidth: 30 }
            },
            minCellHeight: 10,
            headStyles: {
                fillColor: "#FFC55B",
                textColor: "white"
            }
        })

        doc.save('stock.pdf')
    }

    // List 
    useEffect(() => {
        fetch('http://localhost:5000/stock/list')
            .then(response => {
                if (!response.ok) {
                    console.log("Error fetching data")
                }
                return response.json();
            })
            .then(user => {
                setStockList(user);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // List Did Mount
    useEffect(() => {
        getStockData()
    }, [])

    const getStockData = async () => {
        let resp = await fetch('http://localhost:5000/stock/list')
        let result = await resp.json();
        setStockList(result)
    }

    // Delete
    const handleDelete = async (id) => {
        let headers = {
            method: 'DELETE'
        }

        let response = await fetch(`http://localhost:5000/stock/delete/${id}`, headers)
        let result = await response.json()
        getStockData(result)
    }

    // Add
    const addStock = async () => {
        let headers = {
            method: 'POST',
            body: JSON.stringify(stockInput),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        }
        let resp = await fetch('http://localhost:5000/stock/add', headers)
        let result = await resp.json()
        getStockData(result)
    }

    // edit
    const editStock = async () => {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(stockInput),
            headers: {
                'Content-type': 'application/json'
            }
        }

        let id = stockInput._id
        let response = await fetch(`http://localhost:5000/stock/edit/${id}`, headers)
        let result = await response.json()
        getStockData(result)
    }

    const formEmpty = () => {
        setStockInput(
            {
                product_name: "",
                product_id: "",
                cetagory: "",
                quanity: "",
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
        if (stockInput._id) {
            editStock()
        }
        else {
            addStock()
        }
    }

    return (
        <>
            <div className="stock-container">
                <div className="stock-head">
                    <div className="heading-name">
                        <h3 className="title">Stock</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/stock">Stock</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="stock-btn">
                        <div className="export-stock" onClick={handleGenerate}>
                            <CiExport className="export-icon" size="30px" />
                            <button className="export-btn">Export</button>
                        </div>
                        <div className="add-stock" onClick={toggleOpen}>
                            <IoMdAdd className="add-icon" size="30px" />
                            <button className="add-btn" >Add Stock</button>
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
                                                    isEditable ? "Edit Stock" : "Add Stock"
                                                }
                                            </h3>
                                            <button className="close-btn" onClick={handleClose} ><IoMdClose size="25px" /></button>
                                        </div>
                                        <div className="modal-form">
                                            <form className="add-form" onSubmit={handleSubmit}>
                                                <div className="form-control">
                                                    <label className="form-label">Product Name</label>
                                                    <input
                                                        className="form-input"
                                                        name="product_name"
                                                        placeholder="Enter Product Name"
                                                        value={stockInput.product_name}
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
                                                        value={stockInput.product_id}
                                                        onChange={handleChange}
                                                    />
                                                    {error.product_id && <span className="error-msg">{error.product_id}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Category</label>
                                                    <input
                                                        className="form-input"
                                                        name="cetagory"
                                                        placeholder="Enter Category"
                                                        value={stockInput.cetagory}
                                                        onChange={handleChange}
                                                    />
                                                    {error.cetagory && <span className="error-msg">{error.cetagory}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Quanity</label>
                                                    <input
                                                        className="form-input"
                                                        name="quanity"
                                                        placeholder="Enter Quanity"
                                                        value={stockInput.quanity}
                                                        onChange={handleChange}
                                                    />
                                                    {error.quanity && <span className="error-msg">{error.quanity}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Location</label>
                                                    <input
                                                        className="form-input"
                                                        name="location"
                                                        placeholder="Enter Location"
                                                        value={stockInput.location}
                                                        onChange={handleChange}
                                                    />
                                                    {error.location && <span className="error-msg">{error.location}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Status</label>
                                                    <select className="status-select" name="status" value={stockInput.status} onChange={handleChange}>
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
                                                            <button className="submit-btn" type="submit" value="Submit"
                                                                disabled={
                                                                    !(error.product_name === "" &&
                                                                        error.product_id === "" &&
                                                                        error.cetagory === "" &&
                                                                        error.quanity === "" &&
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
                <div className="stock-content-card">
                    <div className="stock-content">
                        <div className="search-items">
                            <div className="search-card">
                                <CiSearch size="20px" />
                                <input
                                    className="search"
                                    id="search"
                                    type="text"
                                    placeholder="Search Stock"
                                    onChange={handleFilter} />
                            </div>
                        </div>
                        <div className="stock-items-container">
                            <div className="stock-item-card">
                                {
                                    stockList.filter((item) => {
                                        return (
                                            stockFilter === "" ||
                                            item.product_name
                                                .toLowerCase()
                                                .includes(stockFilter.toLowerCase()) ||
                                            item.status
                                                .toLowerCase()
                                                .includes(stockFilter.toLowerCase()) ||
                                            item.cetagory
                                                .toLowerCase()
                                                .includes(stockFilter.toLowerCase()) ||
                                            item.location
                                                .toLowerCase()
                                                .includes(stockFilter.toLowerCase())

                                        );
                                    }).map((item, index) => (
                                        <div className="stock-items" key={index}>
                                            <div className="action-btns">
                                                <ul className="action-ul">
                                                    <li className="action-list">
                                                        <button
                                                            className="stock-upt"
                                                            onClick={() => {
                                                                handleEdit(item)
                                                            }}
                                                        >
                                                            <CiEdit size="18px" />
                                                        </button>
                                                    </li>
                                                    <li className="action-list"> <button className="stock-upt" onClick={() => { handleDelete(item._id) }}><GoTrash size="15px" /></button></li>
                                                </ul>
                                            </div>
                                            <div className="stock-img">
                                                <div className="product-img">
                                                    <GrSystem size="20px" className="stock-icon" />
                                                </div>
                                            </div>
                                            <div className="stock-name">
                                                <div className="stock-product">
                                                    <h4 className="stock-product-text">{item.product_name}</h4>
                                                </div>
                                                <div className="stock-productId">
                                                    <span className="product-id">ID : {item.product_id}</span>
                                                </div>
                                            </div>
                                            <div className="stock-others">
                                                <ul className="others-ul">
                                                    <li className="others-list"><p className="stock-first">Category :</p> <p className="stock-second">{item.cetagory}</p></li>
                                                    <li className="others-list"><p className="stock-first">Quanity :</p> <p className="stock-second">{item.quanity}/100</p> </li>
                                                    <li className="others-list"><p className="stock-first">Location :</p> <p className="stock-second">{item.location}</p> </li>
                                                    <li className="others-list"><p className="stock-first">Status :</p><p className="stock-second"><span className="status-stock" style={{ color: getColor(item.status), backgroundColor: getBgColor(item.status) }}>{item.status}</span> </p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Stock;
