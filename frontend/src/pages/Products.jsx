import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { getUserId } from "../utils/auth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const userId = getUserId();

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    // hide own products after login
    if (userId && p.seller._id === userId) return false;

    // search by title
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;

    // filter by category
    if (category && p.category !== category) return false;

    // filter by price
    if (price && p.price > Number(price)) return false;

    return true;
  });

  return (
    <div className="container">
      {/* 🔎 FILTER BAR */}
      <div style={styles.filterBar}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Laptops">Laptops</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Any Price</option>
          <option value="1000">Below ₹1,000</option>
          <option value="5000">Below ₹5,000</option>
          <option value="20000">Below ₹20,000</option>
        </select>
      </div>

      {/* 🧱 PRODUCT GRID */}
      <div className="grid">
        {filteredProducts.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p className="price">₹{p.price}</p>
            <Link to={`/products/${p._id}`} className="btn">
              View
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "20px" }}>No products found</p>
      )}
    </div>
  );
}

const styles = {
  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
};
