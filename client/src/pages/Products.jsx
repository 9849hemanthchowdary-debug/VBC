import React, {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Products() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const addToOrder = (product) => {
    if (!localStorage.getItem("vbcToken")) {
      navigate("/login", { state: { from: "/products" } });
      return;
    }
    const current = JSON.parse(localStorage.getItem("vbcOrder") || "[]");
    if (!current.some((item) => item.id === product.id)) current.push(product);
    localStorage.setItem("vbcOrder", JSON.stringify(current));
    navigate("/contact", { state: { product: product.name } });
  };


  // ==========================================
  // GET PRODUCTS
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response =
          await api.get("/products");

        setProducts(response.data);

      } catch (err) {

        console.error(
          "PRODUCT API ERROR:",
          err
        );

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="page">

        <h1>
          Loading Products...
        </h1>

      </div>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div className="page">

        <h1>
          {error}
        </h1>

        <p>
          Please make sure the backend
          server is running.
        </p>

      </div>
    );

  }


  // ==========================================
  // PRODUCTS
  // ==========================================

  return (

    <main className="page">

      <h1>
        Our Products
      </h1>

      <p>
        Quality bricks for strong foundations.
      </p>


      <div className="product-grid">

        {products.length === 0 ? (

          <p>
            No products available.
          </p>

        ) : (

          products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>

              <h3>
                ₹{product.price}
              </h3>

              <p>
                Stock: {product.stock}
              </p>

              <button onClick={() => addToOrder(product)}>
                Request this product
              </button>

            </div>

          ))

        )}

      </div>

    </main>

  );
}

export default Products;
