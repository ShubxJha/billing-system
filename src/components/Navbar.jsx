import "./Navbar.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { FaBars, FaHome, FaReceipt,  FaBox,FaUsers,FaCog,FaSignOutAlt} from "react-icons/fa";

function Navbar({ isOpen, setIsOpen }) {

    const navigate = useNavigate();
    
    return (
        <>
            <button className="menu-icon" 
                    onClick={() => setIsOpen(!isOpen)}>
                <FaBars/>
            </button>

            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="top-section">
                    <h2 className="logo">Navigation</h2>

                    <nav className="menu">
                        <button onClick={() => navigate("/")}>
                            Dashboard
                        </button>

                        <button onClick={() => navigate("/invoice")}>
                            Billing
                        </button>
                        
                        <button onClick={() => navigate("/products")}>
                            Products
                        </button>

                        <button onClick={() => navigate("/customers")}>
                            Customers
                        </button>

                        <button onClick={() => navigate("/history")}>
                            Transactions
                        </button>
                    </nav>
                </div>

                <div className="bottom-buttons">
                    <button className="settings"
                           onClick={() => navigate("/setting")}
                    >
                        Settings
                    </button>

                    <button className="exit">
                        Exit
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Navbar;

