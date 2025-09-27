import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>404 – Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link className="btn" to="/">Back to store</Link>
    </div>
  );
}
