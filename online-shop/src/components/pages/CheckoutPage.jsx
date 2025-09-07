// src/pages/CheckoutPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart";

export default function CheckoutPage() {
  const total = useCart((s) => s.total());
  const navigate = useNavigate();

  return (
    <section>
      <h1>Checkout</h1>
      <p>Total to pay: <strong>${total.toFixed(2)}</strong></p>
      <div className="actions">
        <Link to="/cart" className="link">Back to cart</Link>
        <button className="btn" onClick={() => navigate("/checkout/success")}>
          Pay now
        </button>
      </div>
    </section>
  );
}
