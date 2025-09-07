// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>404 – Page not found</h1>
      <p style={{ marginBottom: 16 }}>
        The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="link">Back to store</Link>
    </section>
  );
}
