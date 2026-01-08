import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Books");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !description || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/products", {
        title,
        description,
        price,
        category,
        image,
      });

      alert("Product added successfully");
      navigate("/");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="auth-card">
      <h2>Add Product</h2>

      <input
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />

      <input
        type="number"
        placeholder="Price (₹)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Books</option>
        <option>Laptops</option>
        <option>Accessories</option>
      </select>

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}
