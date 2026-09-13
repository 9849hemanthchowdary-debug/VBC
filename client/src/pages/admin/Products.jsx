import React, { useEffect, useState } from "react";
import api from "../../services/api";

function AdminProducts() {

  // Product list
  const [products, setProducts] = useState([]);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  // Store product ID when editing
  const [editingId, setEditingId] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error / success messages
  const [message, setMessage] = useState("");


  // ==========================================
  // GET PRODUCTS
  // ==========================================

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.error("GET PRODUCTS ERROR:", error);

      setMessage("Unable to load products.");

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD PRODUCTS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    fetchProducts();

  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: ""
    });

    setEditingId(null);

    setMessage("");

  };


  // ==========================================
  // CREATE / UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");


    // Basic validation

    if (
      !formData.name ||
      !formData.price
    ) {

      setMessage(
        "Product name and price are required."
      );

      return;

    }


    try {

      // UPDATE

      if (editingId) {

        await api.put(
          `/products/${editingId}`,
          formData
        );

        setMessage(
          "Product updated successfully."
        );

      }

      // CREATE

      else {

        await api.post(
          "/products",
          formData
        );

        setMessage(
          "Product created successfully."
        );

      }


      // Refresh product list

      await fetchProducts();

      // Clear form

      resetForm();

    } catch (error) {

      console.error(
        "SAVE PRODUCT ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Unable to save product."
      );

    }

  };


  // ==========================================
  // EDIT PRODUCT
  // ==========================================

  const handleEdit = (product) => {

    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || ""
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }


    try {

      await api.delete(
        `/products/${id}`
      );

      setMessage(
        "Product deleted successfully."
      );

      await fetchProducts();

    } catch (error) {

      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        "Unable to delete product."
      );

    }

  };


  // ==========================================
  // JSX
  // ==========================================

  return (

    <main className="admin-products">

      <div className="admin-container">

        <h1>
          Product Management
        </h1>

        <p className="admin-subtitle">
          Add, update and manage VBC Bricks products.
        </p>


        {/* MESSAGE */}

        {message && (

          <div className="admin-message">

            {message}

          </div>

        )}


        {/* ==================================
            PRODUCT FORM
        ================================== */}

        <section className="product-form-section">

          <h2>
            {editingId
              ? "Update Product"
              : "Add New Product"}
          </h2>


          <form
            onSubmit={handleSubmit}
            className="product-form"
          >

            {/* NAME */}

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
              />

            </div>


            {/* PRICE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />

              </div>


              {/* STOCK */}

              <div className="form-group">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  min="0"
                />

              </div>

            </div>


            {/* IMAGE */}

            <div className="form-group">

              <label>
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />

            </div>


            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
              >

                {editingId
                  ? "Update Product"
                  : "Add Product"}

              </button>


              {editingId && (

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>


        {/* ==================================
            PRODUCT LIST
        ================================== */}

        <section className="product-list-section">

          <h2>
            Products
          </h2>


          {loading ? (

            <p>
              Loading products...
            </p>

          ) : products.length === 0 ? (

            <p>
              No products found.
            </p>

          ) : (

            <div className="admin-product-table">

              <table>

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map((product) => (

                    <tr key={product.id}>

                      <td>
                        {product.id}
                      </td>

                      <td>
                        {product.name}
                      </td>

                      <td>
                        ₹{product.price}
                      </td>

                      <td>
                        {product.stock}
                      </td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(product)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>

  );
}

export default AdminProducts;
