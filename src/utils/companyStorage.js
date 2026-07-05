export const getCompany = () => {
    return JSON.parse(
        localStorage.getItem("company")
    ) || {
        shopName: "",
        ownerName: "",
        gstin: "",
        phone: "",
        email: "",
        address: "",
        logo: ""
    };
};

export const saveCompany = (company) => {

    localStorage.setItem(
        "company",
        JSON.stringify(company)
    );

};