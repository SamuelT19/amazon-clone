import React, { useEffect, useState } from "react";
import { contextData } from "../DataProvider";
import { Link } from "react-router-dom";
import classes from "../../pages/cart/cart.module.css";

function Subtotal() {
  const [price, setPrice] = useState(0);
  const [{ basket }] = contextData();

  useEffect(() => {
    const totalPrice = basket?.reduce((acc, current) => acc + current.price, 0);
    setPrice(parseFloat(totalPrice.toFixed(2)));
  }, [basket]);
  return (
    <div className={classes.subtotal}>
      <p>
        Subtotal ({basket.length} items) &nbsp;&nbsp;
        <span style={{ fontSize: "20px" }}>&#36;{price}</span>
      </p>
      <div>
        <input type="checkbox" name="" id="gift" />
        <label htmlFor="gift"> This order contains a gift</label>
      </div>

      <Link to={"/payment"}>
        <button className={classes.button}> Continue to checkout</button>
      </Link>
    </div>
  );
}

export default Subtotal;
