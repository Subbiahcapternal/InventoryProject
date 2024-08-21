import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu"
import { MdProductionQuantityLimits, MdInventory } from "react-icons/md";
import { RiStockLine } from "react-icons/ri";
import { MdOutlineEmojiTransportation } from "react-icons/md";
// import { HiBars4 } from "react-icons/hi2";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../../../App.css"


const Sidebar = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleClose = () => {
        setIsOpen(!isOpen)
    }


    const mainMenuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <LuLayoutDashboard size="18px" />
        },
        {
            path: "/product",
            name: "Product",
            icon: <MdProductionQuantityLimits size="18px" />
        },
        {
            path: "/inventory",
            name: "Inventory",
            icon: <MdInventory size="18px" />
        },
        {
            path: "/stock",
            name: "Stock",
            icon: <RiStockLine size="18px" />
        },
        {
            path: "/order",
            name: "Order",
            icon: <MdOutlineEmojiTransportation size="18px" />
        }
    ]

    return (
        <>
            <div className="container">
                <div className="sidebar" style={{ width: isOpen ? "230px" : "70px" }}>
                    <div className="sidebar-head">
                        <h3 className="side-head" style={{ display: isOpen ? "block" : "none" }}>ABC Inv..</h3>
                        <div style={{ marginLeft: isOpen ? "10px" : "0px" }} className="bars">
                            {
                                isOpen ? <IoArrowBackCircleOutline onClick={toggleClose} /> : <IoArrowForwardCircleOutline onClick={toggleOpen} />
                            }
                            {/* // <HiBars4 onClick={toggleOpen} /> */}
                        </div>
                    </div>
                    <div className="menu-items">
                        <div className="main-menu">
                            <h5 style={{ display: isOpen ? "block" : "none" }} className="menu-item-head">Main Menu</h5>
                            {mainMenuItem.map((item, index) => (
                                <NavLink to={item.path} key={index} className="link">
                                    <div className="icon">{item.icon}</div>
                                    <div style={{ display: isOpen ? "block" : "none" }} className="link-name">{item.name}</div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <main>{children}</main>
            </div>
        </>
    )

}

export default Sidebar;