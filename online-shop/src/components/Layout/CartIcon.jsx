import { useCart } from "../../store/cart";

export default function CartIcon() {
  const count = useCart((s) => s.totalItems());

  return (
    <span className="cart-indicator">
      Cart
      {count > 0 && <span className="cart-badge">{count}</span>}
    </span>
  );
}
