import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ShopModal from "../components/home/ShopModal/ShopModal";

function Checkout() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <button
        className="bg-sky-600 text-white py-6 px-12 rounded-lg mb-12"
        onClick={() => setShow(true)}
      >
        Cart ( {productsCount} Items)
      </button>
      {show && <ShopModal onClose={() => setShow(false)} />}
    </>
  );
}

export default Checkout;
