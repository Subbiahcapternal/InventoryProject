import React from "react";
import { Link } from "react-router-dom";
import './about.css'
import Mail from "../../../Assets/mail.png";
import Facebook from "../../../Assets/facebook.png";
import Insta from "../../../Assets/instagram.png";
import Linked from "../../../Assets/linkedin.png";
import Twitter from "../../../Assets/twitter.png";


const About = () => {

    // List State
    // const [productList, setProductList] = useState([]);


    return (
        <>
            <div className="product-about-container">
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
                <div className="about-product-container">
                    <div className="about-container">
                        {/* <div className="title">
                        <h3 style={{ color: "white", padding: 0, margin: 0, textAlign: "center" }}>ABOUT</h3>
                    </div> */}
                        <div className="first-about">
                            <main className="main-about">About Us,</main>
                            <section className="section-about">
                                Inventory management refers to the process of storing, ordering, and selling of goods and services. The discipline also involves the management of various supplies and processes.

                                One of the most critical aspects of inventory management is managing the flow of raw materials from their procurement to finished products. The goal is to minimize overstocks and improve efficiency so that projects can stay on time and within budget.

                                The proper inventory management technique for a particular industry can vary depending on the size of the company and the number of products needed. For instance, an oil depot can store a huge inventory for a long time. Or for businesses that deal in perishable goods, such as fast-fashion items, keeping on top of your inventory can be very costly.

                                One way to account for inventory is by grouping it into four categories: first-in-first-out, last-in-first-out, weighted-average, and first-in-first-out. Raw materials are the components used by a company to make its finished products.

                                Depending on the type of company that it is dealing with, different inventory management methods are used. Some of these include JIT, material requirement planning, and days sales of inventory.

                                Other methods of analyzing inventory can also be used depending on national and local regulations. For instance, the SEC requires public companies to report the existence of a so-called LIFO reserve.

                                Having frequent inventory write-offs can be a red flag that a company is struggling to sell its finished products or is prone to inventory obsolescence.
                            </section>
                            <div className="contact-card">
                                <h4 className="add-head">ABC Inventory</h4>
                                <address className="accademy-add">
                                    10 F2 Second Floor, Trivandrum Road,<br></br>
                                    Next to Thangamayil jewellery,<br></br>
                                    Palayamkottai,
                                    Tirunelveli 627002<br></br>
                                    Contact: 9445878954
                                </address>
                                <div>
                                    <ul className="social-class">
                                        <li className="social-list">
                                            <img className="face-img" src={Facebook} alt="facebook" />
                                        </li>
                                        <li className="social-list">
                                            <img className="insta-img" src={Insta} alt="instagram" />
                                        </li>
                                        <li className="social-list">
                                            <img className="linked-img" src={Linked} alt="Linkedin" />
                                        </li>
                                        <li className="social-list">
                                            <img className="twitter-img" src={Twitter} alt="twitter" />
                                        </li>
                                        <li className="social-list">
                                            <img className="mail-img" src={Mail} alt="facebook" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default About;
