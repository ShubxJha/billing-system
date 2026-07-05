import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCustomers } from "../utils/customerStorage";
import "./InvoiceForm.css";

import {
    getCurrentInvoiceNumber,
    generateInvoiceNumber
} from "../utils/invoiceUtils";


function Invoice() {
    const location = useLocation();

    const [invoiceNum] = useState(() => {
        return getCurrentInvoiceNumber() || generateInvoiceNumber();
    });


    // Auto generation of bill Date
    const [billDate, setBillDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    // Customer Details
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setCustomers(getCustomers());
    }, []);

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");


    // Addition of product to table 
    const [products, setProducts] = useState([]);

    const [productName, setProductName] = useState("");
    const [qty, setQty] = useState("");
    const [rate, setRate] = useState("");
    const [gst, setGst] = useState("");

    const [catalogProducts, setCatalogProducts] = useState([]);
    const [selectedCatalogProduct, setSelectedCatalogProduct] = useState("");

    useEffect(() => {
        const savedProducts =
            JSON.parse(localStorage.getItem("products")) || [];

        setCatalogProducts(savedProducts);
    }, []);


    const addProduct = () => {
        if (!productName || qty <= 0 || rate <= 0 || gst < 0) {
            alert("Enter Valid Values");
            return;
        }

        const subtotal = Number(qty) * Number(rate);
        const gstAmt = subtotal * (Number(gst) / 100);

        const newProduct = {
            name: productName,
            qty: Number(qty),
            rate: Number(rate),
            gst: Number(gst),
            subtotal,
            gstAmt,
            total: subtotal + gstAmt,
        };

        setProducts(prevProducts => [
            ...prevProducts,
            newProduct
        ]);

        setProductName("");
        setQty("");
        setRate("");
        setGst("");
        setSelectedCatalogProduct("");
    };

    const deleteProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const subtotal = products.reduce(
        (sum, product) => sum + product.subtotal,
        0
    );

    const gstTotal = products.reduce(
        (sum, product) => sum + product.gstAmt,
        0
    );

    const grandTotal = products.reduce(
        (sum, product) => sum + product.total,
        0
    );

    const discount = 0;
    const balance = grandTotal - discount;

    // Sending data to Preview page
    const navigate = useNavigate();

    const openPreview = () => {

        if (products.length === 0) {
            alert("Please add at least one product.");
            return;
        }

        navigate("/preview", {
            state: {
                invoiceNum,
                billDate,

                customerName:
                    customerName.trim() || "Walk-in Customer",

                customerPhone:
                    customerPhone.trim() || "-",

                customerAddress:
                    customerAddress.trim() || "-",

                products,
                subtotal,
                gstTotal,
                discount,
                grandTotal
            }
        });
    };


    useEffect(() => {

    if (!location.state) return;

    setBillDate(location.state.billDate);

    setCustomerName(location.state.customerName);
    setCustomerPhone(location.state.customerPhone);
    setCustomerAddress(location.state.customerAddress);

    setProducts(location.state.products);

}, [location.state]);

    return (
        <main className="main" id="invoice">
            <div className="header">
                <div className="invoice-no">
                    Invoice # {invoiceNum}
                </div>

                <div className="heading no-print">
                    New Bill
                </div>

                <div className="invoice-date">
                    <label htmlFor="date">Bill Date</label>

                    <input
                        type="date"
                        id="date"
                        value={billDate}
                        onChange={(e) => setBillDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="customer-header">
                <div>Customer Details:</div>

                <select className="customer-select"
                    onChange={(e) => {

                        const customer = customers.find(
                            c => String(c.id) === (e.target.value)
                        );

                        if (customer) {
                            setCustomerName(customer.name);
                            setCustomerPhone(customer.phone);
                            setCustomerAddress(customer.address);
                        }
                    }}
                >
                    <option value="">
                        Select Customer
                    </option>

                    {customers.map(customer => (
                        <option
                            key={customer.id}
                            value={customer.id}
                        >
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>


            <div className="customer-info">

                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Billing Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                />
            </div>

            <div className="no-print">
                Product Details:
            </div>

            <select
                value={selectedCatalogProduct}
                onChange={(e) => {

                    const selectedId = Number(e.target.value);

                    setSelectedCatalogProduct(selectedId);

                    const selectedProduct =
                        catalogProducts.find(
                            (p) => p.id === selectedId
                        );

                    if (!selectedProduct) return;

                    setProductName(selectedProduct.name);
                    setRate(selectedProduct.price);
                    setGst(selectedProduct.gst);
                }}
            >
                <option value="">
                    Select Product From Catalog
                </option>

                {catalogProducts.map((product) => (
                    <option
                        key={product.id}
                        value={product.id}
                    >
                        {product.name}
                    </option>
                ))}
            </select>

            <div className="product-row no-print">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) =>
                        setProductName(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Qty"
                    value={qty}
                    onChange={(e) =>
                        setQty(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Rate"
                    value={rate}
                    onChange={(e) =>
                        setRate(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="GST"
                    value={gst}
                    onChange={(e) =>
                        setGst(e.target.value)
                    }
                />

                <button
                    onClick={addProduct}
                    className="add-btn"
                >
                    + Add
                </button>
            </div>

            <div className="content">
                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>GST</th>
                                <th>Total</th>
                                <th className="no-print">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(
                                (product, index) => (
                                    <tr key={index}>
                                        <td>
                                            {product.name}
                                        </td>

                                        <td>
                                            {product.qty}
                                        </td>

                                        <td>
                                            ₹{product.rate}
                                        </td>

                                        <td>
                                            {product.gst}%
                                        </td>

                                        <td>
                                            ₹
                                            {product.total.toFixed(
                                                2
                                            )}
                                        </td>

                                        <td className="no-print">
                                            <button
                                                onClick={() =>
                                                    deleteProduct(
                                                        index
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="summary">
                    <h3>Payment Summary</h3>

                    <div className="summary-item">
                        <span>Subtotal</span>

                        <span>
                            ₹
                            {subtotal.toFixed(
                                2
                            )}
                        </span>
                    </div>

                    <div className="summary-item">
                        <span>GST</span>

                        <span>
                            ₹
                            {gstTotal.toFixed(
                                2
                            )}
                        </span>
                    </div>

                    <div className="summary-item">
                        <span>Discount</span>

                        <span>
                            ₹
                            {discount.toFixed(
                                2
                            )}
                        </span>
                    </div>

                    <div className="summary-item">
                        <span>Balance</span>

                        <span>
                            ₹
                            {balance.toFixed(
                                2
                            )}
                        </span>
                    </div>

                    <div className="total">
                        <h4>
                            Grand Total: ₹
                            {grandTotal.toFixed(
                                2
                            )}
                        </h4>
                    </div>

                    <button
                        className="print-btn no-print"
                        onClick={openPreview}>
                        Print Bill
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Invoice;
