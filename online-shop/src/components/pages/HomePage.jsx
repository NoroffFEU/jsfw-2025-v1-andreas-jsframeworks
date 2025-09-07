// src/pages/HomePage.jsx
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/SearchBar";

export default function HomePage() {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("name"); // name | priceAsc | priceDesc
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.listProducts();
        if (mounted) setList(data);
      } catch (e) {
        setErr("Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const sorted = useMemo(() => {
    const copy = [...list];
    if (sort === "name") copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "priceAsc")
      copy.sort((a, b) => (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price));
    if (sort === "priceDesc")
      copy.sort((a, b) => (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price));
    return copy;
  }, [list, sort]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>{err}</p>;

  return (
    <section>
      <div className="home-controls">
        <SearchBar products={list} />
        <label className="sort">
          Sort:&nbsp;
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name (A–Z)</option>
            <option value="priceAsc">Price (low → high)</option>
            <option value="priceDesc">Price (high → low)</option>
          </select>
        </label>
      </div>

      <div className="grid">
        {sorted.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
