import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import api from "../services/api";
import { getUserId } from "../utils/auth";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEditMode = searchParams.get("edit") === "true";
  const userId = getUserId();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  const isOwner =
    product.seller &&
    String(product.seller._id) === String(userId);

  const handleUpdate = async () => {
    try {
      await api.put(`/products/${id}`, {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
      alert("Product updated");
      navigate("/my-products");
    } catch {
      alert("Update failed");
    }
  };

  const handleBuy = async () => {
    try {
      await api.post(`/products/${id}/buy`);
      alert("Product bought");
      navigate("/");
    } catch {
      alert("Buy failed");
    }
  };

  return (
    <div className="container">
      <div className="details">
        <img src={product.image} alt={product.title} />

        <div>
          {/* ========== EDIT MODE ========== */}
          {isOwner && isEditMode ? (
            <div className="edit-form">
              <h2>Edit Product</h2>

              <label>Title</label>
              <input
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />

              <label>Price (₹)</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />

              <label>Description</label>
              <textarea
                rows="4"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
              />

              <label>Category</label>
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value,
                  })
                }
              >
                <option>Books</option>
                <option>Laptops</option>
                <option>Accessories</option>
              </select>

              <label>Image URL</label>
              <input
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />

              <div className="edit-actions">
                <button className="btn" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button
                  className="btn secondary"
                  onClick={() => navigate("/my-products")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ========== VIEW MODE ========== */
            <>
              <h1>{product.title}</h1>
              <p className="price">₹{product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>

              <h4>Seller</h4>
              <p>{product.seller.name}</p>
              <p>{product.seller.email}</p>

              {!isOwner && product.status === "available" && (
                <button className="buy-btn" onClick={handleBuy}>
                  Buy
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
