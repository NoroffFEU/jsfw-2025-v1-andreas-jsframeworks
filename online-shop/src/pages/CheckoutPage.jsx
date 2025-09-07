import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();

  function handleCheckout() {
    clear();
    toast.success("Checkout successful");
    navigate("/checkout/success");
  }

  return (
    <section style={{ padding: 16 }}>
      <h1>Checkout</h1>
      <p>Confirm your order.</p>
      <button onClick={handleCheckout} style={{ padding: "10px 16px", borderRadius: 10, background: "#111827", color: "#fff", border: 0 }}>
        Pay now
      </button>
    </section>
  );
}
