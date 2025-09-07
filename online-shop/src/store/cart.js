// src/store/cart.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      items: {}, // { [id]: { id, title, price, imageUrl, qty } }

      add: (p, qty = 1) => {
        const items = { ...get().items };

        const hasDiscount =
          p && typeof p.discountedPrice === "number" && p.discountedPrice < p.price;
        const price = hasDiscount ? p.discountedPrice : p.price;

        let imageUrl = "";
        if (p && p.image && p.image.url) imageUrl = p.image.url;
        else if (p && typeof p.imageUrl === "string") imageUrl = p.imageUrl;
        else if (p && typeof p.image === "string") imageUrl = p.image;

        if (items[p.id]) {
          items[p.id] = { ...items[p.id], qty: items[p.id].qty + qty };
        } else {
          items[p.id] = { id: p.id, title: p.title, price, imageUrl, qty };
        }

        set({ items });
      },

      remove: (id) => {
        const items = { ...get().items };
        delete items[id];
        set({ items });
      },

      setQty: (id, qty) => {
        const items = { ...get().items };
        if (items[id]) {
          const n = Number(qty);
          items[id].qty = Math.max(1, isNaN(n) ? 1 : n);
          set({ items });
        }
      },

      clear: () => set({ items: {} }),

      total: () => {
        const list = Object.values(get().items);
        let sum = 0;
        for (let i = 0; i < list.length; i++) sum += list[i].price * list[i].qty;
        return sum;
      },

      totalItems: () => {
        const list = Object.values(get().items);
        let sum = 0;
        for (let i = 0; i < list.length; i++) sum += list[i].qty;
        return sum;
      },
    }),
    { name: "online-shop-cart" }
  )
);
