import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("relevance");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("https://v2.api.noroff.dev/online-shop");
        if (!res.ok) throw new Error("Failed loading products");
        const data = await res.json();
        if (active) setProducts(data?.data || []);
      } catch (e) {
        setErr(e.message || "Unknown error");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(p =>
        p.title?.toLowerCase().includes(needle) ||
        p.description?.toLowerCase().includes(needle)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => (priceOf(a) - priceOf(b)));
    if (sort === "price-desc") list.sort((a, b) => (priceOf(b) - priceOf(a)));
    if (sort === "title-asc") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, q, sort]);

  if (loading) return <p className="container">Loading products…</p>;
  if (err) return <p className="container">Error: {err}</p>;

  return (
    <div className="container">
      <div className="home-controls">
        <div className="search" style={{ flex: 1, minWidth: 220 }}>
          <input
            className="search-input"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="sort">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Title: A → Z</option>
          </select>
        </div>
        <Link className="btn" to="/cart">Go to Cart</Link>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {!filtered.length && (
        <p className="search-empty" style={{ marginTop: 12 }}>
          No results for “{q}”.
        </p>
      )}
    </div>
  );
}

function priceOf(p) {
  const has = typeof p.discountedPrice === "number" && p.discountedPrice < p.price;
  return has ? p.discountedPrice : p.price;
}
