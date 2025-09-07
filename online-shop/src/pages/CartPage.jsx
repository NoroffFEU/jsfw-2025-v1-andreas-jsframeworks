import { useCart } from "../store/cart";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, setQty, remove, total } = useCart((s) => ({
    items: s.items, setQty: s.setQty, remove: s.remove, total: s.total
  }));
  const list = Object.values(items);
  const navigate = useNavigate();

  if (list.length === 0) {
    return (
      <section style={{ padding: 16 }}>
        <h1>Your cart is empty</h1>
        <Link to="/">Back to store</Link>
      </section>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      <h1>Cart</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {list.map((i) => (
          <div key={i.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto", gap: 12, alignItems: "center" }}>
            <img src={i.imageUrl || "https://via.placeholder.com/80"} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 600 }}>{i.title}</div>
              <div>${i.price.toFixed(2)}</div>
            </div>
            <input
              type="number" min="1" value={i.qty}
              onChange={(e) => setQty(i.id, e.target.value)}
              style={{ width: 70, padding: 6 }}
            />
            <button onClick={() => { remove(i.id); toast.success("Removed"); }}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Total: ${total().toFixed(2)}</strong>
        <button
          onClick={() => navigate("/checkout")}
          style={{ padding: "10px 16px", borderRadius: 10, background: "#111827", color: "#fff", border: 0 }}
        >
          Checkout
        </button>
      </div>
    </section>
  );
}
