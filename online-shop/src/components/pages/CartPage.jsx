// src/pages/CartPage.jsx
import { Link } from "react-router-dom";
import { useCart } from "../store/cart";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.total());

  const list = Object.values(items);

  if (list.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link to="/" className="link">Continue shopping</Link>
      </div>
    );
  }

  return (
    <section className="cart">
      <ul className="cart-list">
        {list.map((i) => (
          <li key={i.id} className="cart-item">
            <img src={i.imageUrl} alt="" className="cart-thumb" />
            <div className="cart-info">
              <div className="cart-title">{i.title}</div>
              <div className="cart-price">${i.price.toFixed(2)}</div>
            </div>
            <div className="cart-qty">
              <input
                type="number"
                min={1}
                value={i.qty}
                onChange={(e) => setQty(i.id, e.target.value)}
              />
              <button
                className="link danger"
                onClick={() => {
                  remove(i.id);
                  toast.success("Removed from cart");
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <div>Total: <strong>${total.toFixed(2)}</strong></div>
        <Link to="/checkout" className="btn">Checkout</Link>
      </div>
    </section>
  );
}
