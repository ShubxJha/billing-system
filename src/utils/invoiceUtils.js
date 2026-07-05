
    // Generating Invoice Number
 export function getCurrentInvoiceNumber(){
        return localStorage.getItem("currentInvoice");
    }

 export function generateInvoiceNumber() {
        const today = new Date();

        const extractDate =
            String(today.getDate()).padStart(2, "0") +
            String(today.getMonth() + 1).padStart(2, "0") +
            today.getFullYear();


        const storedDate = localStorage.getItem("invoiceDate");

        let counter = Number(localStorage.getItem("invoiceCounter")) || 0;

        if (storedDate === extractDate) {
            counter++;
        }
        else {
            counter = 1;
            localStorage.setItem("invoiceDate", extractDate)
        }

        localStorage.setItem("invoiceCounter", counter);

        const invoice = `INV-${extractDate}-${String(counter).padStart(3, "0")}`;

        localStorage.setItem("currentInvoice",invoice);

        return invoice;

    }
