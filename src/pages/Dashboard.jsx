import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

;

function Dashboard() {
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const [todaySales, setTodaySales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {

        const savedProducts =
            JSON.parse(localStorage.getItem("products")) || [];

        const savedCustomers =
            JSON.parse(localStorage.getItem("customers")) || [];

        const savedInvoices =
            JSON.parse(localStorage.getItem("invoices")) || [];

        setProducts(savedProducts);
        setCustomers(savedCustomers);
        setInvoices(savedInvoices);

        calculateSales(savedInvoices);

    }, []);

    console.log(invoices);
    console.log(products);
    console.log(customers);
    function calculateSales(invoiceList) {

        let revenue = 0;
        let today = 0;

        const currentDate =
            new Date().toLocaleDateString();

        invoiceList.forEach(invoice => {

            revenue += Number(invoice.grandTotal);

            if (invoice.billDate === currentDate) {
                today += Number(invoice.grandTotal);
            }

        });

        setTotalRevenue(revenue);
        setTodaySales(today);

    }

    return (

        <div className="dashboard">

            <h1 className="dashboard-title">
                Dashboard
            </h1>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Today's Sales</h3>
                    <h2>₹{todaySales}</h2>
                </div>

                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <h2>₹{totalRevenue}</h2>
                </div>

                <div className="stat-card">
                    <h3>Customers</h3>
                    <h2>{customers.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Products</h3>
                    <h2>{products.length}</h2>
                </div>

            </div>


            {/* Middle Section */}

            <div className="dashboard-middle">

                <div className="dashboard-box">
                    <h2>Sales Overview</h2>

                    <div className="placeholder">
                        Chart goes here
                    </div>

                </div>

                <div className="dashboard-box">

                    <h2>Quick Actions</h2>

                    <button onClick={() => navigate("/invoice")}>
                        New Invoice
                    </button>

                    <button onClick={() => navigate("/products")}>
                        Add Product
                    </button>

                    <button onClick={() => navigate("/customers")}>
                        Add Customer
                    </button>

                </div>

            </div>

            {/* Bottom Section */}

            <div className="dashboard-bottom">

                <div className="dashboard-box">

                    <h2>Recent Invoices</h2>

                    <table>

                        <thead>

                            <tr>
                                <th>Invoice</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Amount</th>
                            </tr>

                        </thead>

                        <tbody>

                            {invoices
                                .slice(-5)
                                .reverse()
                                .map(invoice => (

                                    <tr key={invoice.id}>

                                        <td>{invoice.invoiceNo}</td>

                                        <td>{invoice.date} </td>
                                        <td>{invoice.customerName}</td>

                                        <td>₹{invoice.grandTotal}</td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

                <div className="dashboard-box">

                    <h2>Low Stock</h2>

                    <ul>

                        {products
                            .filter(product => Number(product.stock) <= 5)
                            .map(product => (

                                <li key={product.name}>

                                    {product.name} ({product.stock} left)

                                </li>

                            ))}

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;