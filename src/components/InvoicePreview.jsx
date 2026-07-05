import { useLocation, useNavigate } from "react-router-dom";
import "./InvoicePreview.css"
// import Invoice from "./InvoiceForm";
import { generateInvoiceNumber } from "../utils/invoiceUtils";
import { saveInvoice } from "../utils/invoiceStorage";
import { getCompany } from "../utils/companyStorage";
// import { useEffect } from "react";

function InvoicePreview() {

    const location = useLocation();
    const navigate = useNavigate();
    const company = getCompany();
    
    const {
        invoiceNum,
        billDate,

        customerName,
        customerPhone,
        customerAddress,

        products,
        subtotal,
        gstTotal,
        discount,
        grandTotal

    } = location.state;

    function saveCurrentInvoice() {

        const invoices =
            JSON.parse(
                localStorage.getItem("invoices")
            ) || [];

        const alreadyExists = invoices.some(
            invoice =>
                invoice.invoiceNo === invoiceNum
        );

        if (alreadyExists) {
            return;
        }

        saveInvoice({
            invoiceNo: invoiceNum,

            customerName,
            customerPhone,
            customerAddress,

            date: billDate,

            products,

            subtotal,
            gstTotal,
            discount,
            grandTotal,

            amount: grandTotal,

            status: "Paid"
        });
    }

    // useEffect(() => {
    //     saveCurrentInvoice();
    // }, []);

    function finalizeInvoice() {

        const currentInvoice = invoiceNum;

        const finalized =
            localStorage.getItem(
                "lastFinalizedInvoice"
            );

        if (finalized === currentInvoice) {
            return;
        }

        localStorage.setItem(
            "lastFinalizedInvoice",
            currentInvoice
        );

        const nextInvoice =
            generateInvoiceNumber();

        localStorage.setItem(
            "currentInvoice",
            nextInvoice
        );
    }

    function handlePrint() {

        saveCurrentInvoice();

        window.print();

        finalizeInvoice();
    }

    function handleDownload() {

        saveCurrentInvoice();

        // Your PDF code here

        finalizeInvoice();
    }

    function handleSave() {

        saveCurrentInvoice();

        finalizeInvoice();

        alert(
            "Invoice saved successfully!"
        );
    }
    function handleNewInvoice() {

        const confirmNew = window.confirm(
            "Create a new invoice?"
        );

        if (!confirmNew) return;

        localStorage.removeItem(
            "draftInvoice"
        );

        const nextInvoice =
            generateInvoiceNumber();

        localStorage.setItem(
            "currentInvoice",
            nextInvoice
        );

        navigate("/");
    }

    return (
        <div className="preview-container">

            {/* <h1 className="preview-heading no-print">
                Invoice Preview
            </h1> */}

            <div className="invoice-preview">
                <div className="header-preview">
                    {/* <div className="header-preview">
                    <div className="header-top"></div>
                    <div className="header-logo"> 
                    {company.logo && (

                                <img
                                    src={company.logo}
                                    alt="Logo"
                                    className="invoice-logo"
                                />

                            )}
                    </div>

                    <div className="invoice-title">INVOICE</div>
                    
                    <div className="invoice-meta">

                        
                        <div>
                            <strong>Invoice #:</strong> {invoiceNum}
                        </div>

                        <div>
                            <strong>Date:</strong> {billDate}
                        </div>
                    </div>
                </div> */}
                    <div className="header-top">

                        <div className="header-logo">
                            {company.logo && (
                                <img
                                    src={company.logo}
                                    alt="Logo"
                                    className="invoice-logo"
                                />
                            )}
                        </div>

                        <div className="header-title">
                            <h1>INVOICE</h1>
                        </div>

                    </div>

                    <div className="header-bottom">

                        <div className="invoice-number">
                            <strong>Invoice #:</strong> {invoiceNum}
                        </div>

                        <div className="invoice-date">
                            <strong>Date:</strong> {billDate}
                        </div>

                    </div>

                </div>

                <div className="content-preview">
                    <div className="parties">
                        <div className="party">
                            <h3>FROM</h3>
                            <strong>{company.shopName}</strong>
                            <br />
                            {company.ownerName}
                            <br />
                            GSTIN : {company.gstin}
                            <br />
                            {company.address}
                            <br />
                            {company.phone}
                            <br />
                            {company.email}
                        </div>

                        <div className="party receiver">
                            <h3>TO</h3>

                            <strong>{customerName}</strong>
                            <br />
                            {customerPhone}
                            <br />
                            {customerAddress}
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>GST</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.qty}</td>
                                    <td>₹{product.rate}</td>
                                    <td>{product.gst}%</td>
                                    <td>₹{product.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className="totals">
                        <tbody>
                            <tr>
                                <td>Subtotal:</td>
                                <td className="right">₹{subtotal}</td>
                            </tr>

                            <tr>
                                <td>GST:</td>
                                <td className="right">₹{gstTotal}</td>
                            </tr>

                            <tr>
                                <td>Discount:</td>
                                <td className="right">₹{discount}</td>
                            </tr>

                            <tr className="total-row">
                                <td>Grand Total:</td>
                                <td className="right">₹{grandTotal}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="notes">
                        <strong>Thank You For Your Purchase!</strong>
                        <br />
                        Please visit again.
                    </div>
                </div>
            </div>
            <div className="preview-actions no-print">

                <button
                    onClick={() =>
                        navigate("/invoice", {
                            replace: true,
                            state: {
                                invoiceNum,
                                billDate,
                                customerName,
                                customerPhone,
                                customerAddress,
                                products
                            }
                        })
                    }
                >
                    Back
                </button>

                <button onClick={handleSave}>
                    Save
                </button>

                <button onClick={handleDownload} >
                    Download PDF
                </button>

                <button
                    onClick={handlePrint}
                >
                    Print Invoice
                </button>

                <button className="new-invoice"
                    onClick={handleNewInvoice}
                >
                    New Invoice
                </button>

            </div>

        </div>
    );
}

export default InvoicePreview;


