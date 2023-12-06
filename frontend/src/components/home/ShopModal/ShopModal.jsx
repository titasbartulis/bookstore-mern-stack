import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { AiOutlineClose } from "react-icons/ai";

const ShopModal = ({ show, onClose }) => {
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = cart.items.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const checkout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({items: cart.items})
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url);
      }
    })
  }

  return (
    <>
      <div
        className="fixed bg-black opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-c"
        onClick={onClose}
      >
        {productsCount > 0 ? (
          <>
            <div
              onClick={(event) => event.stopPropagation()}
              className="w-500 h-380 max-w-full bg-slate-200 rounded-xl mt-28 pb-16 flex flex-column relative"
            >
              <div className="p-16 border-bottom-grey-400">
                <AiOutlineClose
                  className="absolute right-24 top-24 fs-30 lh-36 text-red-600 cursor-pointer"
                  onClick={onClose}
                />
                <h4 className="fs-24 fw-5 lh-36">Shopping Cart</h4>
              </div>
              <div className="px-16 pt-16">
                <p className="fs-16 fw-4 lh-24 mb-16">Items in your cart:</p>
                <h3 className="fs-28 fw-5 lh-32 mb-8">Book</h3>
                <p className="fs-16 fw-4 lh-24 mb-16">
                  Amount: {productsCount}
                </p>
                <button
                  className="px-8 py-4 text-white bg-sky-600 rounded-lg"
                  onClick={cart.deleteAllFromCart}
                >
                  Remove
                </button>
                <hr className="my-16" />
                <h1 className="fs-40 fw-5 lh-48 mb-8">Total: {totalPrice}€</h1>
                <button
                  className="px-12 py-6 bg-green-purchase text-white rounded-lg"
                  onClick={checkout}
                >
                  Purchase items!
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={(event) => event.stopPropagation()}
              className="w-500 h-200 max-w-full bg-slate-200 rounded-xl mt-28 pb-16 flex flex-column relative"
            >
              <div className="p-16 border-bottom-grey-400">
                <AiOutlineClose
                  className="absolute right-24 top-24 fs-30 lh-36 text-red-600 cursor-pointer"
                  onClick={onClose}
                />
                <h4 className="fs-24 fw-5 lh-36">Shopping Cart</h4>
              </div>
              <div className="px-16 pt-16">
                <h1 className="fs-40 fw-5 lh-48">
                  There are no items in your cart!
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopModal;
