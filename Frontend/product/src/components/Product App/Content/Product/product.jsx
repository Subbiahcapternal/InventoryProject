import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { CiExport, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import '../Product/product.css'
import Modal from "../../../Popup/Modal/modal";
import { FaTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import validator from "validator";
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const Product = () => {

    // List State
    const [productList, setProductList] = useState([]);

    // Input State
    const [productInput, setProductInput] = useState(
        {
            product_id: "",
            product_name: "",
            price: "",
            stock: "",
            status: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInput({ ...productInput, [name]: value })
        validateForm(e.target)
    }

    // Filter
    const [productFilter, setProductFilter] = useState("");

    const handleFilter = (event) => {
        setProductFilter(event.target.value);
    }

    // Status Option
    const status = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "On Sale", label: "On Sale" },
        { value: "Pending", label: "Pending" },
        { value: "Bouncing", label: "Bouncing" }
    ]

    const getColor = (status) => {
        if (status === 'Active') {
            return '#08A423';
        }
        else if (status === 'Inactive') {
            return '#FF2831';
        }
        else if (status === 'Pending') {
            return '#FF9926';
        }
        else if (status === 'On Sale') {
            return '#267BFF';
        }
        else if (status === 'Bouncing') {
            return '#923DFB';
        }
        else
            return '';
    };

    const getBgColor = (status) => {
        if (status === 'Active') {
            return '#CCEED7';
        }
        else if (status === 'Inactive') {
            return '#FFD9DB';
        }
        else if (status === 'Pending') {
            return '#FFE8CC';
        }
        else if (status === 'On Sale') {
            return '#D6E6FF';
        }
        else if (status === 'Bouncing') {
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
    const handleEdit = (data) => {
        setIsEditable(!isEditable);
        setIsOpen(!isOpen)
        setProductInput(data)
    }

    // Validation
    const [error, setError] = useState({});

    const validateForm = (data) => {
        const { name, value } = data;
        switch (name) {
            case "product_name":
                let isNameEmpty = validator.isEmpty(value);
                if (isNameEmpty) {
                    setError({ ...error, [name]: "Product Name is required" })
                }
                else {
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
            case "price":
                let isPrice = validator.isEmpty(value)
                let isNumber = validator.isNumeric(value)
                if (isPrice) {
                    setError({ ...error, [name]: "Price is required" })
                }
                else if (!isNumber) {
                    setError({ ...error, [name]: "Price must be number" })
                }
                else {
                    setError({ ...error, [name]: "" })
                }
                break;
            case "stock":
                let isStock = validator.isEmpty(value)
                let isStockNumber = validator.isNumeric(value)
                if (isStock) {
                    setError({ ...error, [name]: "Stock is required" })
                }
                else if (!isStockNumber) {
                    setError({ ...error, [name]: "Stock must be number" })
                }
                else {
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
        const title = "Product"
        const padding = 10
        const titleWidth = doc.getTextWidth(title)
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2)
        doc.setTextColor('black')
        doc.text(title, center, padding)

        doc.autoTable({
            head: [['No', 'Product ID', 'Product Name', 'Price', 'Stock', 'Status']],
            body: productList.map((data, index) =>
                [
                    index + 1,
                    data.product_id,
                    data.product_name,
                    data.price,
                    data.stock,
                    data.status
                ]),
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 35 },
                2: { cellWidth: 35 },
                3: { cellWidth: 35 },
                4: { cellWidth: 35 },
                5: { cellWidth: 33 }
            },
            minCellHeight: 10,
            headStyles: {
                fillColor: "#FFC55B",
                textColor: "white"
            }
        })

        doc.save('product.pdf')
    }

    // List 
    useEffect(() => {
        fetch('http://localhost:5000/product/list')
            .then(response => {
                if (!response.ok) {
                    console.log("Error fetching data")
                }
                return response.json();
            })
            .then(user => {
                setProductList(user);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // List Did Mount
    useEffect(() => {
        getProductData()
    }, [])

    const getProductData = async () => {
        let resp = await fetch('http://localhost:5000/product/list')
        let result = await resp.json();
        setProductList(result)
    }

    // Delete
    const handleDelete = async (id) => {
        let headers = {
            method: 'DELETE'
        }

        let response = await fetch(`http://localhost:5000/product/delete/${id}`, headers)
        let result = await response.json()
        getProductData(result)
    }

    // Add
    const addProduct = async () => {
        let headers = {
            method: 'POST',
            body: JSON.stringify(productInput),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        }
        let resp = await fetch('http://localhost:5000/product/add', headers)
        let result = await resp.json()
        getProductData(result)
    }

    // edit
    const editProduct = async () => {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(productInput),
            headers: {
                'Content-type': 'application/json'
            }
        }

        let id = productInput._id
        let response = await fetch(`http://localhost:5000/product/edit/${id}`, headers)
        let result = await response.json()
        getProductData(result)
    }

    const formEmpty = () => {
        setProductInput(
            {
                product_id: "",
                product_name: "",
                price: "",
                stock: "",
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
        if (productInput._id) {
            editProduct()
        }
        else {
            addProduct()
        }
    }


    return (
        <>
            <div className="product-container">
                <div className="product-head">
                    <div className="heading-name">
                        <h3 className="title">Product</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/product">Product</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-btn">
                        <div className="export-product" onClick={handleGenerate}>
                            <CiExport className="export-icon" size="30px" />
                            <button className="export-btn">Export</button>
                        </div>
                        <div className="add-product" onClick={toggleOpen}>
                            <IoMdAdd className="add-icon" size="30px" />
                            <button className="add-btn">Add Product</button>
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
                                                    isEditable ? "Edit Product" : "Add Product"
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
                                                        value={productInput.product_id}
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
                                                        value={productInput.product_name}
                                                        onChange={handleChange}
                                                    />
                                                    {error.product_name && <span className="error-msg">{error.product_name}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Price</label>
                                                    <input
                                                        className="form-input"
                                                        name="price"
                                                        placeholder="Enter Price"
                                                        value={productInput.price}
                                                        onChange={handleChange}
                                                    />
                                                    {error.price && <span className="error-msg">{error.price}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Stock</label>
                                                    <input
                                                        className="form-input"
                                                        name="stock"
                                                        placeholder="Enter Stock"
                                                        value={productInput.stock}
                                                        onChange={handleChange}
                                                    />
                                                    {error.stock && <span className="error-msg">{error.stock}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="form-label">Status</label>
                                                    <select className="status-select" name="status" value={productInput.status} onChange={handleChange}>
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
                                                                        error.price === "" &&
                                                                        error.stock === "" &&
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
                <div className="product-content-card">
                    <div className="product-content">
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
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.filter((item) => {
                                        return (
                                            productFilter === "" ||
                                            item.product_name
                                                .toLowerCase()
                                                .includes(productFilter.toLowerCase()) ||
                                            item.status
                                                .toLowerCase()
                                                .includes(productFilter.toLowerCase()) ||
                                            item.price
                                                .toString()
                                                .includes(productFilter) ||
                                            item.stock
                                                .toString()
                                                .includes(productFilter)
                                        );
                                    }).map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
                                            <td>{data.product_id}</td>
                                            <td>{data.product_name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.stock}</td>
                                            <td className="status-items" >
                                                <span className="status" style={{ color: getColor(data.status), backgroundColor: getBgColor(data.status) }}>{data.status}</span>
                                            </td>
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

export default Product;
