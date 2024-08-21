import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import CanvasJSReact from '@canvasjs/react-charts';
import "../Dashboard/dashboard.css"
import { MdInventory, MdOutlineEmojiTransportation, MdProductionQuantityLimits } from "react-icons/md";
import { RiStockLine } from "react-icons/ri";
import { Gauge, gaugeClasses, LineChart, lineElementClasses, pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { GoDotFill } from "react-icons/go";


const Dashboard = () => {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const xLabels = [
        'Mangement',
        'Products',
        'Inventory',
        'Stocks',
        'Orders',
        'Sales',
        'Revenue',
    ];

    const data = [
        { label: 'Sony', value: 400, color: '#0088FE' },
        { label: 'Apple', value: 300, color: '#00C49F' },
        { label: 'Samsung', value: 500, color: '#FFBB28' },
        { label: 'MI', value: 200, color: '#FF8042' },
        { label: 'Lenova', value: 200, color: '#E03437' }
    ];

    const sizing = {
        margin: { right: 5 },
        width: 180,
        height: 200,
        legend: { hidden: true },
    };
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    const [productList, setProductList] = useState([]);
    const [inventoryList, setInventoryList] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    // List 
    useEffect(() => {
        fetch('http://localhost:5001/product/list')
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
        fetch('http://localhost:5002/stock/list')
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
        fetch('http://localhost:5003/order/list')
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


    const cards = [
        {
            icon: <MdProductionQuantityLimits size="30px" />,
            title: "Product",
            data: productList.length,
            path: '/product'
        },
        {
            icon: <MdInventory style={{ color: "red" }} size="30px" />,
            title: "Inventory",
            data: inventoryList.length,
            path: '/inventory'
        },
        {
            icon: <RiStockLine style={{ color: "#D268CC" }} size="30px" />,
            title: "Stock",
            data: stockList.length,
            path: '/stock'
        },
        {
            icon: <MdOutlineEmojiTransportation style={{ color: "#007DFE" }} size="30px" />,
            title: "Order",
            data: orderList.length,
            path: '/order'
        }

    ]

    const pieChart1 = [
        {
            icon: <GoDotFill style={{ color: "#0088FE" }} size="25px" />,
            name: "Sony",
            value: "55%"
        },
        {
            icon: <GoDotFill style={{ color: "#00C49F" }} size="25px" />,
            name: "Apple",
            value: "55%"
        },
        {
            icon: <GoDotFill style={{ color: "#FFBB28" }} size="25px" />,
            name: "Samsung",
            value: "55%"
        },
        {
            icon: <GoDotFill style={{ color: "##F6AA6B" }} size="25px" />,
            name: "Lenova",
            value: "55%"
        },
        {
            icon: <GoDotFill style={{ color: "#FF8042" }} size="25px" />,
            name: "MI",
            value: "55%"
        }

    ]

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-head">
                    <div className="heading-name">
                        <h3 className="title">Dashboard</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/home">Home</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="first-dahsboard-card">
                        {
                            cards.map((item, index) => (
                                <div className="dashboard-detail-card" key={index}>
                                    <NavLink to={item.path} className="nav-link">
                                        <div className="detail-icon">
                                            {item.icon}
                                        </div>
                                        <div className="detail-title">
                                            {item.title}
                                        </div>
                                        <div className="detail-id">
                                            {item.data}
                                        </div>
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chart-card">
                        <div className="dashboard-chart1">
                            <div className="linechart-title">
                                <h4 className="linechart-text">ABC Inventory Management System</h4>
                            </div>
                            <div className="linechart">
                                <LineChart
                                    width={600}
                                    height={300}
                                    series={[{ data: uData, area: true, showMark: false }]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                    sx={{
                                        [`& .${lineElementClasses.root}`]: {
                                            display: 'flex',
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="dashboard-chart2">
                            <div className="chart1">
                                <div className="piechart1-title">
                                    <h4 className="piechart1-text">Most Sales Product</h4>
                                </div>
                                <div className="piechart1">
                                    <PieChart
                                        series={[
                                            {
                                                data,
                                                highlightScope: { faded: 'global', highlighted: 'item' },
                                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                                arcLabel: getArcLabel
                                            },
                                        ]}
                                        sx={{
                                            [`& .${pieArcLabelClasses.root}`]: {
                                                fill: 'white',
                                                fontSize: 13,
                                                margin: 5
                                            },
                                        }}
                                        {...sizing}
                                    />
                                </div>
                                <div className="piechart-datas">
                                    {
                                        pieChart1.map((item, index) => (
                                            <div className="piechart-detail" key={index}>
                                                <div className="piechart-icon">
                                                    {item.icon}
                                                </div>
                                                <div className="piechart-item">
                                                    <p >{item.name}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="chart2">
                                <div className="product-chart">
                                    <div className="piechart1-title">
                                        <h4 className="piechart1-text">Products</h4>
                                    </div>
                                    <div className="product-gauge">
                                        <Gauge width={110} height={110} value={50}
                                            cornerRadius="50%"
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueArc}`]: {
                                                    fill: '#08A423',
                                                },
                                                // [`& .${gaugeClasses.referenceArc}`]: {
                                                //     fill: theme.palette.text.disabled,
                                                // },
                                            })}
                                        />
                                        <p className="gauge-text">Our Stock Products</p>
                                    </div>
                                </div>
                                <div className="sales-chart">
                                    <div className="piechart1-title">
                                        <h4 className="piechart1-text">Orders</h4>
                                    </div>
                                    <div className="product-gauge">
                                        <Gauge width={110} height={110} value={80}
                                            cornerRadius="50%"
                                            sx={(theme) => ({
                                                [`& .${gaugeClasses.valueArc}`]: {
                                                    fill: '#D268CC',
                                                }
                                            })}
                                        />
                                        <p className="gauge-text">Online Orders in weekly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Dashboard;
