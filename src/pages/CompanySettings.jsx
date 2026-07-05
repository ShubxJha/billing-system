import { useEffect, useState } from "react";
import {
    getCompany,
    saveCompany
} from "../utils/companyStorage";

import "./CompanySettings.css";

function CompanySettings() {

    const [company, setCompany] = useState({
        shopName: "",
        ownerName: "",
        gstin: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        setCompany(getCompany());
    }, []);

    const handleSave = () => {

        if (!company.shopName.trim()) {
            alert("Shop name is required.");
            return;
        }

        saveCompany(company);

        alert("Company details saved successfully.");
    };

    const handleLogoUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setCompany({
                ...company,
                logo: reader.result
            });

        };

        reader.readAsDataURL(file);
    };

    return (

        <div className="company-settings">

            <h2>Company Settings</h2>

            <div className="company-form">

                <input
                    type="text"
                    placeholder="Shop Name"
                    value={company.shopName}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            shopName: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Owner Name"
                    value={company.ownerName}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            ownerName: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="GSTIN"
                    value={company.gstin}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            gstin: e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={company.phone}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            phone: e.target.value
                        })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={company.email}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            email: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Address"
                    value={company.address}
                    onChange={(e) =>
                        setCompany({
                            ...company,
                            address: e.target.value
                        })
                    }
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                />

                {company.logo && (

                    <img
                        src={company.logo}
                        alt="Company Logo"
                        className="company-logo-preview"
                    />

                )}
                <button
                    className="save-company-btn"
                    onClick={handleSave}
                >
                    Save Company Details
                </button>

            </div>

        </div>

    );
}

export default CompanySettings;