
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";

export default function CartPage() {
  const items = useCart(s => s.items);
  const setQty = useCart(s => s.setQty);
  const remove = useCart(s => s.remove);
  const total = useCart(s => s.total());
  const navigate = useNavigate();

  const list = Object.values(items);

  if (!list.length) {
    return (
      <div className="container">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link className="btn" to="/">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your cart</h1>

      <ul className="cart-list">
        {list.map(i => (
          <li key={i.id} className="cart-item">
            <img
              className="cart-thumb"
              src={i.imageUrl || "https://via.placeholder.com/128"}
              alt={i.title}
            />
            <div className="cart-info">
              <div className="cart-title">{i.title}</div>
              <div className="cart-qty">
                <label>
                  Qty:
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => setQty(i.id, e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div style={{ fontWeight: 600 }}>${(i.price * i.qty).toFixed(2)}</div>
            <button
              className="link danger"
              onClick={() => {
                remove(i.id);
                toast("Removed from cart", { icon: "🗑️" });
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="btn" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
