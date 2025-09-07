import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/client";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [status, setStatus] = useState("loading");
  const add = useCart((s) => s.add);

  useEffect(() => {
    getProduct(id)
      .then((data) => { setP(data); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <p style={{ padding: 16 }}>Loading…</p>;
  if (status === "error" || !p) return <p style={{ padding: 16 }}>Not found.</p>;

  const hasDiscount =
    typeof p.discountedPrice === "number" && p.discountedPrice < p.price;
  const priceNow   = hasDiscount ? p.discountedPrice : p.price;

  return (
    <div style={{ padding: 16, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      <img
        src={p.image?.url || "https://via.placeholder.com/600"}
        alt={p.title}
        style={{ width: "100%", objectFit: "cover", borderRadius: 12 }}
      />
      <div>
        <h1>{p.title}</h1>
        {hasDiscount ? (
          <p>
            <span style={{ textDecoration: "line-through", opacity: .6 }}>${p.price.toFixed(2)}</span>{" "}
            <strong>${priceNow.toFixed(2)}</strong>
          </p>
        ) : (
          <p><strong>${p.price.toFixed(2)}</strong></p>
        )}
        <p>{p.description}</p>
        <button
          onClick={() => { add(p, 1); toast.success("Added to cart"); }}
          style={{ padding: "10px 16px", borderRadius: 10, background: "#111827", color: "#fff", border: 0 }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
