import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";

export default function CheckoutSuccessPage() {
  const clear = useCart(s => s.clear);

  useEffect(() => {
    clear();
    toast.success("Order completed!");
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Thank you! 🎉</h1>
      <p>Your order was successful and the cart has been cleared.</p>
      <Link className="btn" to="/">Back to store</Link>
    </div>
  );
}
