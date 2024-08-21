import React from "react";
import { Link } from "react-router-dom";
import '../Home/home.css'
import HomeImg from "../../../Assets/inventory-home.jpg"


const Home = () => {

    return (
        <>
            <div className="product-home-container">
                <div className="product-home-head">
                    <div className="heading-name">
                        <h3 className="title">Home</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/home">Home</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="home-product-container">
                    <div className="welcome-container">
                        <div className="home-page-img">
                            <img src={HomeImg} alt="home-img" className="home-img" />
                        </div>
                        <div className="welcome-card">
                            <div className="welcome-title">
                                <h3>Welcome</h3>
                            </div>
                            <div className="welcome-para">
                                <p>
                                    <h5>
                                        An inventory management system (or inventory system) is the process by which you track your goods throughout your entire supply
                                        chain, from purchasing to production to end sales.
                                        It governs how you approach inventory management for your business.
                                        Any company dealing with physical goods must find a solution for managing inventory.
                                        In some cases, an Excel or Google Sheets spreadsheet will suffice as a company’s inventory management system.
                                        However, many firms opt for dedicated inventory management software designed to boost efficiency and bring costs down.
                                        Factors such as your business’s size, complexity, and inventory requirements determine what the best inventory management
                                        system will be for your specific circumstances.
                                    </h5>
                                </p>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>

    )
}

export default Home;
