import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import classes from "../main/products/product.module.css";
import { ACTIONS, contextData } from "../DataProvider";

function CartAddArrow({ product }) {
  const [{ basket }, dispatch] = contextData();

  const countItemsInBasket = () => {
    return basket.filter((item) => item.id === product.id).length;
  };

  const cartAdder = () => {
    dispatch({
      type: ACTIONS.ADD_TO_BASKET,
      item: product,
    });
  };

  const cartRemover = () => {
    const indexToRemove = basket.findIndex((item) => item.id === product.id);
    if (indexToRemove !== -1) {
      const newBasket = [
        ...basket.slice(0, indexToRemove),
        ...basket.slice(indexToRemove + 1),
      ];
      dispatch({
        type: ACTIONS.SET_BASKET,
        basket: newBasket,
      });
    }
  };

  return (
    <>
      <div className={classes.item_counter}>
        <IoIosArrowUp size={25} onClick={cartAdder} />
        <span style={{ fontSize: "20px" }}>{countItemsInBasket()}</span>
        <IoIosArrowDown size={25} onClick={cartRemover} />
      </div>
    </>
  );
}

export default CartAddArrow;
