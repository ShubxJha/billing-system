import { useState, useEffect } from "react";
import {
    getCustomers,
    saveCustomer,
    deleteCustomer,
} from "../utils/customerStorage";

import "./CustomerManagement.css"


function CustomerManagement() {

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [editingId, setEditingId] = useState(null);

    // const loadCustomers = async () => {
    //     const data = await getCustomers();
    //     setCustomers(data);
    // }

    const loadCustomers = () => {
        setCustomers(getCustomers());
    };

    useEffect(() => {
        loadCustomers();
    }, []);



    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.address.trim()
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (editingId) {

            const updatedCustomers = customers.map(customer =>
                customer.id === editingId
                    ? { ...customer, ...formData }
                    : customer
            );

            localStorage.setItem(
                "customers",
                JSON.stringify(updatedCustomers)
            );

            setCustomers(updatedCustomers);

            setEditingId(null);

        } else {

            saveCustomer(formData);

            loadCustomers();
        }

        setFormData({
            name: "",
            phone: "",
            address: ""
        });

    };

    const handleEdit = (customer) => {

        setFormData({
            name: customer.name,
            phone: customer.phone,
            address: customer.address
        });

        setEditingId(customer.id);
    };

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this customer?"
            );

        if (!confirmDelete) return;

        deleteCustomer(id);

        loadCustomers();
    };

    const handleCancel = () => {

        setEditingId(null);

        setFormData({
            name: "",
            phone: "",
            address: ""
        });
    };

    return (
        <div className="customer-management">
            <h4>Customer Management</h4>

            <form
                className="customer-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="phone"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phone: e.target.value
                        })
                    }

                />

                <textarea
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            address: e.target.value
                        })
                    }
                />

                <button type="submit">

                    {editingId
                        ? "Update Customer"
                        : "Save Customer"}

                </button>

                {editingId && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <hr />


            <div className="customer-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="4">
                                    No customers found.
                                </td>
                            </tr>
                        ) : (
                            customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>

                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(customer)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(customer.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerManagement;

