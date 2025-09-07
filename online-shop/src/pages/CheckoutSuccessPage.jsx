import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <section style={{ padding: 16, textAlign: "center" }}>
      <h1>🎉 Order placed!</h1>
      <p>Thanks for your purchase.</p>
      <Link to="/">Back to store</Link>
    </section>
  );
}
