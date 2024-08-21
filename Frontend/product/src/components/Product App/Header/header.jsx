import React from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FcFactoryBreakdown } from "react-icons/fc";
import "../../../App.css"

const Header = () => {

    const menuItem = [
        {
            path: "/home",
            name: "Home"
        },
        {
            path: "/about",
            name: "About"
        },
        {
            path: "/account",
            name: "Login"
        }
    ]

    return (
        <>
            <div className="header">
                <div className="header-content">
                    <div className="header-head">
                        <FcFactoryBreakdown className="header-logo" size="40px" />
                        <h4 className="logo">
                            ABC Inventory
                            <h6 className="sub-logo"> Mangement System</h6>
                        </h4>

                    </div>
                    <div className="header-menu-items">
                        <div className="head-search">
                            <CiSearch className="search-icon" size="25px" /> <input className="nav-search" id="search" placeholder="Search" />
                        </div>
                        {menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="header-link">
                                <div className="icon">{item.icon}</div>
                                <div className="header-link-name">{item.name}</div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;