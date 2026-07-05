import { useEffect, useState } from "react";
import {
    getInvoices,
    deleteInvoice
} from "../utils/invoiceStorage";

import "./InvoiceHistory.css";

function InvoiceHistory() {

    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");

    const loadInvoices = () => {
        setInvoices(getInvoices());
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Delete this invoice?"
        );

        if (!confirmDelete) return;

        deleteInvoice(id);
        loadInvoices();
    };

    const filteredInvoices = invoices.filter(
        (invoice) =>
            invoice.invoiceNo
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            invoice.customerName
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    const totalRevenue = invoices.reduce(
        (sum, invoice) =>
            sum + Number(invoice.amount || 0),
        0
    );

    return (
        <div className="invoice-history">

            <h2>Invoice History</h2>

            <div className="invoice-summary">

                <div className="summary-card">
                    <h3>{invoices.length}</h3>
                    <p>Total Invoices</p>
                </div>

                <div className="summary-card">
                    <h3>
                        ₹{totalRevenue.toFixed(2)}
                    </h3>
                    <p>Total Revenue</p>
                </div>

            </div>

            <input
                className="search-box"
                type="text"
                placeholder="Search by Invoice No or Customer Name"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div className="invoice-table-container">

                <table className="invoice-table">

                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredInvoices.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="empty-row"
                                >
                                    No invoices found.
                                </td>
                            </tr>

                        ) : (

                            filteredInvoices.map(
                                (invoice) => (

                                    <tr
                                        key={invoice.id}
                                    >

                                        <td>
                                            {
                                                invoice.invoiceNo
                                            }
                                        </td>

                                        <td>
                                            {
                                                invoice.customerName
                                            }
                                        </td>

                                        <td>
                                            {
                                                invoice.date
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                Number(
                                                    invoice.amount
                                                ).toFixed(
                                                    2
                                                )
                                            }
                                        </td>

                                        <td>
                                            <span
                                                className={`status-badge ${
                                                    invoice.status ||
                                                    "Paid"
                                                }`}
                                            >
                                                {
                                                    invoice.status ||
                                                    "Paid"
                                                }
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        invoice.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default InvoiceHistory;