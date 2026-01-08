import { Link } from "react-router-dom";

export default function Navbar({ loggedIn, onLogout }) {
  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <h2>Gradious Marketplace</h2>

        <div>
          <Link to="/">Home</Link>

          {!loggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/my-products">My Products</Link>
              <Link to="/add">Add Product</Link>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
