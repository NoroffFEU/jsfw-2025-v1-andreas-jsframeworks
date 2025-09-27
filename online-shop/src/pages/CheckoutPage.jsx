import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart";

export default function CheckoutPage() {
  const total = useCart(s => s.total());
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Checkout</h1>
      <p>We don’t need real payment for this assignment. Click the button to “complete” checkout.</p>

      <div className="cart-total" style={{ marginTop: 16 }}>
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <button className="btn" style={{ marginTop: 16 }} onClick={() => navigate("/checkout/success")}>
        Complete order
      </button>
    </div>
  );
}
