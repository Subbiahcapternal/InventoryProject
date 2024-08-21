import React from "react";
import { Link } from "react-router-dom";
import '../Home/home.css'


const About = () => {

    // List State
    // const [productList, setProductList] = useState([]);


    return (
        <>
            <div className="product-home-container">
                <div className="home-head">
                    <div className="heading-name">
                        <h3 className="title">About</h3>
                        <div className="sub-title">
                        <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/home">Home</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default About;
