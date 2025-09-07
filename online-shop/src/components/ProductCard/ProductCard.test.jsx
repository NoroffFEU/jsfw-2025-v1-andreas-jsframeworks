import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

const product = {
  id: "1",
  title: "Test Product",
  description: "A test item",
  price: 200,
  discountedPrice: 150,
  imageUrl: "https://via.placeholder.com/300",
  rating: 4.5,
  tags: ["test"],
  reviews: [],
};

describe("ProductCard", () => {
  it("renders product title and discounted price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    // ✅ Title
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // ✅ Discounted price and original price (match the component format)
    expect(screen.getByText("$150.00")).toBeInTheDocument(); // discounted price
    expect(screen.getByText("$200.00")).toBeInTheDocument(); // original price
  });
});
