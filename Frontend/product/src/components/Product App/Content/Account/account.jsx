import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Account/account.css"
import Student from "../../../../components/Assets/myImage.png";

const Account = () => {

    const [action, setAction] = useState("Login")

    return (
        <>
            <div className="account-container">
                <div className="account-head">
                    <div className="heading-name">
                        <h3 className="title">Account</h3>
                        <div className="sub-title">
                            <ul className="sub-title-ul">
                                <li className="sub-title-list"><Link className="sub-title-link" to="/home">Home</Link></li>
                                <li className="sub-title-list">/</li>
                                <li className="sub-title-list"><Link className="sub-title-link" to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="account-inventory-container">
                    <div className="signup-card">
                        <div className="signin-header">
                            <h1 style={{ textAlign: "center", textDecoration: "underline", paddingBottom: "20px" }}>{action}</h1>
                        </div>
                        <div className="admin-img">
                            <img className="myimage" src={Student} alt="person-image" /><br></br>
                        </div>
                        <div class="signin-forms">

                            {/* <!-- email input --> */}
                            {action === "Login" ? <div></div> : <input className="signin-email" name="email" id="text" placeholder="Name" />}


                            <input className="signin-email" name="email" id="text" placeholder="Email" />

                            {/* <!-- password input --> */}
                            <input name="password" className="signin-pass" id="password" placeholder="Password" />

                            {action === "Sign Up" ? <div></div> : <p class="forgot">Forgot Password?</p>}

                            {/* <!-- login btn --> */}
                            <div className="submit-container">
                                <button className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</button>
                                <button className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Account;