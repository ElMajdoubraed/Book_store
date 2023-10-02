"use client";

interface Book {
  _id: string | number | null | undefined;
  price?: number;
  cover?: string;
  quantity?: number;
}
/*
const CART_KEY = "cart";
const LOCAL_ORDERS = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
export const addBookToCart = async (book: Book) => {
  if (LOCAL_ORDERS && LOCAL_ORDERS.length > 0) {
    const existingProduct = LOCAL_ORDERS.find((b: Book) => b._id === book._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      LOCAL_ORDERS.push(book);
    }
  } else {
    LOCAL_ORDERS.push(book);
  }
};
export const removeBook = async (bookId: string) => {
  const newOrders = LOCAL_ORDERS.filter((b: Book) => b._id !== bookId);
  if (newOrders && newOrders.length > 0) {
    localStorage.setItem(CART_KEY, JSON.stringify(newOrders));
  } else {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  }
};
export const updateProduct = async (bookId: string, quantity: number) => {
  const newOrders = LOCAL_ORDERS.map((b: Book) => {
    if (b._id === bookId) {
      b.quantity = quantity;
    }
    return b;
  });
  localStorage.setItem(CART_KEY, JSON.stringify(newOrders));
};
export const getProducts = async () => {
  const orders = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  return orders;
};
export const clearCart = async () => {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
};
export const getCartTotal = async () => {
  const orders = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const total = orders.reduce(
    (acc: number, cur: Book) =>
      acc + (cur.price as number) * (cur.quantity as number),
    0
  );
  return total;
};
export const getCartCount = async () => {
  const orders = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const count = orders.reduce(
    (acc: number, cur: Book) => acc + (cur.quantity as number),
    0
  );
  return count;
};
*/

if (typeof window !== "undefined") {
  console.log("You are on the browser");
  // 👉️ can use localStorage here
} else {
  console.log("You are on the server");
  // 👉️ can't use localStorage
}
