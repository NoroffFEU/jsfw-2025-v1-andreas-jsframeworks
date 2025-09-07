// src/components/SearchBar/SearchBar.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SearchBar({ products }) {
  const [q, setQ] = useState("");
  const notified = useRef(false);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        (Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(s)))
    );
  }, [q, products]);

  useEffect(() => {
    if (!q) { notified.current = false; return; }
    if (q.length >= 2 && matches.length === 0 && !notified.current) {
      toast.error("No matching results");
      notified.current = true;
    }
    if (matches.length > 0) notified.current = false;
  }, [q, matches.length]);

  return (
    <div className="search">
      <input
        className="search-input"
        value={q}
        placeholder="Search products..."
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search products"
      />
      {q && (
        <div className="search-results">
          {matches.length === 0 ? (
            <div className="search-empty">No matches</div>
          ) : (
            matches.slice(0, 10).map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="search-item"
                onClick={() => setQ("")}
              >
                {p.title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
