// src/pages/CheckoutSuccessPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { toast } from "react-hot-toast";

export default function CheckoutSuccessPage() {
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    clear();
    toast.success("Checkout successful – thank you!");
  }, [clear]);

  return (
    <section>
      <h1>Order Confirmed</h1>
      <p>Your cart has been cleared.</p>
      <Link to="/" className="link">Back to store</Link>
    </section>
  );
}
