// src/pages/ProductPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import { useCart } from "../store/cart";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const add = useCart((s) => s.add);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getProduct(id);
        if (mounted) setP(data);
      } catch (e) {
        setErr("Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>{err}</p>;
  if (!p) return null;

  const hasDiscount = typeof p.discountedPrice === "number" && p.discountedPrice < p.price;
  const imageUrl =
    (p.image && p.image.url) || p.imageUrl || p.image || "https://via.placeholder.com/800?text=No+Image";

  return (
    <article className="product">
      <img src={imageUrl} alt={p.title} className="product-img" />
      <div className="product-body">
        <h1>{p.title}</h1>
        <div className="product-price">
          {hasDiscount ? (
            <>
              <span className="price-old">${p.price.toFixed(2)}</span>
              <span className="price">${p.discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="price">${p.price.toFixed(2)}</span>
          )}
          <span className="rating">Rating: {p.rating}/5</span>
        </div>
        <p>{p.description}</p>

        {Array.isArray(p.tags) && p.tags.length > 0 && (
          <div className="tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        )}

        <button
          className="btn"
          onClick={() => {
            add(p, 1);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>

        {Array.isArray(p.reviews) && p.reviews.length > 0 && (
          <section className="reviews">
            <h2>Reviews</h2>
            <ul>
              {p.reviews.map((r) => (
                <li key={r.id}>
                  <strong>{r.username}</strong> — {r.rating}/5
                  {r.description && <p>{r.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
