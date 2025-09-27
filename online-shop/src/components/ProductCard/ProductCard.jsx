
  import { Link } from "react-router-dom";

  export default function ProductCard({ p, product }) {
    const item = p || product;
    if (!item) return null; 

    const hasDiscount =
      typeof item.discountedPrice === "number" &&
      item.discountedPrice < item.price;

    const percent = hasDiscount
      ? Math.round((1 - item.discountedPrice / item.price) * 100)
      : 0;

    return (
      <Link
        to={`/product/${item.id}`}
        className="product-card"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        {hasDiscount && (
          <span
            className="discount-badge"
            style={{
              position: "absolute",
              margin: 8,
              background: "#e11d48",
              color: "white",
              borderRadius: 8,
              fontSize: 12,
              padding: "2px 8px",
            }}
          >
            -{percent}%
          </span>
        )}

        <img
          src={item.imageUrl || item.image?.url || ""}
          alt={item.title}
          style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
        />

        <div style={{ padding: 12 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>{item.title}</h3>

          <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "baseline" }}>
            {hasDiscount ? (
              <>
                <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
                  ${item.price.toFixed(2)}
                </span>
                <span style={{ fontWeight: 600 }}>
                  ${item.discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 600 }}>${item.price.toFixed(2)}</span>
            )}
          </div>

          <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
            Rating: {item.rating}/5
          </div>
        </div>
      </Link>
    );
  }
