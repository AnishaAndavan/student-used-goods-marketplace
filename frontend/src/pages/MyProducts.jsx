import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/mine").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container">
      <h2>My Products</h2>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p className="price">₹{p.price}</p>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/products/${p._id}`} className="btn">
                View
              </Link>

              <Link to={`/products/${p._id}?edit=true`} className="btn">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
