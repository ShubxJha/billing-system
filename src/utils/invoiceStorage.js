export const getInvoices = () => {
    return JSON.parse(
        localStorage.getItem("invoices")
    ) || [];
};

export const saveInvoice = (invoice) => {

    const invoices = getInvoices();

    invoices.push({
        id: Date.now(),
        ...invoice
    });

    localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
    );
};

export const deleteInvoice = (id) => {

    const invoices = getInvoices();

    const updated = invoices.filter(
        invoice => invoice.id !== id
    );

    localStorage.setItem(
        "invoices",
        JSON.stringify(updated)
    );
};