
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../store/cart";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const add = useCart(s => s.add);
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        if (!res.ok) throw new Error("Failed loading product");
        const data = await res.json();
        if (active) setP(data?.data || null);
      } catch (e) {
        setErr(e.message || "Unknown error");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  if (loading) return <p className="container">Loading…</p>;
  if (err) return <p className="container">Error: {err}</p>;
  if (!p) return <p className="container">No product found.</p>;

  const hasDiscount = typeof p.discountedPrice === "number" && p.discountedPrice < p.price;

  return (
    <div className="container product">
      <div>
        <img
          className="product-img"
          src={p.image?.url || p.imageUrl || "https://via.placeholder.com/600"}
          alt={p.image?.alt || p.title}
        />
      </div>

      <div className="product-body">
        <h1>{p.title}</h1>
        <div className="product-price">
          {hasDiscount && <span className="price-old">${p.price.toFixed(2)}</span>}
          <span className="price">${(hasDiscount ? p.discountedPrice : p.price).toFixed(2)}</span>
        </div>

        <div className="rating">Rating: {p.rating ?? "N/A"}/5</div>

        <p style={{ marginTop: 12 }}>{p.description}</p>

        {p.tags?.length ? (
          <div className="tags">
            {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        ) : null}

        <button
          className="btn"
          onClick={() => {
            add(p, 1);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>

        {p.reviews?.length ? (
          <section style={{ marginTop: 24 }}>
            <h3 style={{ margin: 0 }}>Reviews</h3>
            <ul>
              {p.reviews.map((r, i) => (
                <li key={i}>
                  <strong>{r.username || "Anonymous"}</strong>: {r.description} ({r.rating}/5)
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
