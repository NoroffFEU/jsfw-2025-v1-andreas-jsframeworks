import { useEffect, useState } from "react";
import { getProducts } from "../api/client";
import ProductCard from "../components/ProductCard/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProducts()
      .then((list) => { setProducts(list); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p style={{ padding: 16 }}>Loading products…</p>;
  if (status === "error")   return <p style={{ padding: 16, color: "#b91c1c" }}>Could not load products.</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
