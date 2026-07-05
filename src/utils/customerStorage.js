const CUSTOMER_KEY = "customers";

export const getCustomers = () => {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY)) || [];
};

export const saveCustomer = (customer) => {
    const customers = getCustomers();

    customers.push({
        ...customer,
        id: Date.now()
    });

    localStorage.setItem(
        CUSTOMER_KEY,
        JSON.stringify(customers)
    );
};

export const deleteCustomer = (id) => {
    const customers = getCustomers().filter(
        customer => customer.id !== id
    );

    localStorage.setItem(
        CUSTOMER_KEY,
        JSON.stringify(customers)
    );
};




