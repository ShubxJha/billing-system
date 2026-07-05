import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import Footer from "./components/Footer";
import CustomerManagement from "./pages/CustomerManagement";
import ProductCatalog from "./pages/ProductForm";
import InvoiceHistory from "./pages/InvoiceHistory";
import CompanySettings from "./pages/CompanySettings";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function Layout() {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="app-container">

            <div className="content-area">

                <Navbar 
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

                <div className={`main-layout ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard/>}
                        />

                        <Route
                            path="/invoice"
                            element={<InvoiceForm />}
                        />

                        <Route
                            path="/preview"
                            element={<InvoicePreview />}
                        />

                        <Route
                            path="/customers"
                            element={<CustomerManagement />}
                        />

                        <Route
                            path="/products"
                            element={<ProductCatalog />}
                        />

                        <Route
                            path="/history"
                            element={<InvoiceHistory />}
                        />

                        <Route
                            path="/setting"
                            element={<CompanySettings />}
                        />
                    </Routes>

            
                     {location.pathname !== "/preview" && <Footer />}
                </div>

            </div>
       
            
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;


// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import InvoiceForm from "./components/InvoiceForm";
// import InvoicePreview from "./components/InvoicePreview";
// import Footer from "./components/Footer";
// import "./App.css";

// function App() {

//     const location = useLocation();
//     return (
//         <BrowserRouter>

//             <div className="app-container">

//                 <div className="content-area">

//                     <Navbar />

//                     <div className="main-layout">
//                         <Routes>
//                             <Route
//                                 path="/"
//                                 element={<InvoiceForm />}
//                             />

//                             <Route
//                                 path="/preview"
//                                 element={<InvoicePreview />}
//                             />
//                         </Routes>
//                     </div>

//                 </div>


//                 <Footer />

//             </div>

//         </BrowserRouter>
//     );
// }

// export default App;


