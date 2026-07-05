import { useState, useEffect } from "react";
import './ProductForm.css';

function ProductCatalog() {

    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        gst: "",
        stock: ""
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const savedProducts =
            JSON.parse(localStorage.getItem("products")) || [];

        setProducts(savedProducts);
    }, []);

    const addProduct = (e) => {

        e.preventDefault();

        if (
            !product.name ||
            !product.price ||
            !product.gst ||
            !product.stock
        ) {
            alert("Please fill all fields");
            return;
        }

        let updatedProducts;

        if (editingId) {

            updatedProducts = products.map((p) =>
                p.id === editingId
                    ? {
                        ...p,
                        ...product
                    }
                    : p
            );

            setEditingId(null);

        } else {

            const newProduct = {
                id: Date.now(),
                ...product
            };

            updatedProducts = [
                ...products,
                newProduct
            ];
        }

        setProducts(updatedProducts);

        localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
        );

        setProduct({
            name: "",
            price: "",
            gst: "",
            stock: ""
        });
    };

    const editProduct = (product) => {

        setProduct({
            name: product.name,
            price: product.price,
            gst: product.gst,
            stock: product.stock
        });

        setEditingId(product.id);
    };


    const deleteProduct = (id) => {

        if(!window.confirm("Delete this product?"))
        return;

        const updatedProducts =
            products.filter((p) => p.id !== id);

        setProducts(updatedProducts);

        localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
        );
    };

    const handleCancel = () => {

        setEditingId(null);

        setProduct({
            name: "",
            price: "",
            gst: "",
            stock: ""
        });

    };

    return (
        <div className="product-catalog">

            <h2>Product Catalog</h2>

            <form className="product-form"
                  onSubmit = {addProduct}  
            >

                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            name: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            price: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="GST %"
                    value={product.gst}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            gst: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            stock: e.target.value
                        })
                    }
                />

                <div className="product-form-buttons">
                    <button type="submit" 
                        className="add-product-btn">
                        {editingId ? "Update Product" : "Add Product"}
                    </button>

                    {editingId && (
                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>

            </form>

            <div className="product-table-container">

                <table className="product-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>GST</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="no-products"
                                >
                                    No products added yet.
                                </td>
                            </tr>
                        ) : (

                            products.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>₹{Number(p.price).toLocaleString("en-IN")}</td>
                                    <td>{p.gst}%</td>
                                    <td>{p.stock}</td>

                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => editProduct(p)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteProduct(p.id)
                                            }
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

export default ProductCatalog;