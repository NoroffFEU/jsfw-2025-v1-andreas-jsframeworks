import { render, screen } from "@testing-library/react";
import CartIcon from "./CartIcon";
import * as cartStore from "../../store/cart";

test("shows badge when items exist", () => {
  jest.spyOn(cartStore, "useCart").mockImplementation((sel) =>
    sel({ totalItems: () => 3 })
  );
  render(<CartIcon />);
  expect(screen.getByText("Cart")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});
