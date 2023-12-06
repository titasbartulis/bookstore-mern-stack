import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  deleteAllFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQuantity(title) {
    const quantity = cartProducts.find(
      (product) => product.title === title
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(title, price, stripeId) {
    const quantity = getProductQuantity(title);

    if (quantity === 0) {
      setCartProducts([...cartProducts, { title: title, price: price, stripeId: stripeId, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.title === title
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(title) {
    const quantity = getProductQuantity(title);

    if (quantity === 1) {
      deleteFromCart(title);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.title === title
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(title) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.title != title;
      })
    );
  }

  function deleteAllFromCart() {
    setCartProducts([]);
  }

  function getTotalCost() {}

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    deleteAllFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
