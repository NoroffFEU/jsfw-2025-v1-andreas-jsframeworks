// src/components/Layout/Header.jsx
import { Link, NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">Online Shop</Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart" className="cart-link">
            <CartIcon />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
