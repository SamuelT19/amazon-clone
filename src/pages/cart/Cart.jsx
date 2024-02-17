import React, { useEffect, useState } from "react";
import { contextData } from "../../components/DataProvider";
import SingleProduct from "../../components/main/products/singleProduct";
import classes from "./cart.module.css";
import Subtotal from "../../components/subtotal/Subtotal";

function Cart() {
  const [{ basket }] = contextData();
  const [filteredBasket, setFilteredBasket] = useState([]);
  useEffect(() => {
    const filtered = basket.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
    setFilteredBasket(filtered);
  }, [basket]);

  return (
    <>
      <section className={classes.cart_outer_container} >
        <div className={`${classes.cart_container} ${!basket.length && classes.no_basket}`}>
          <p>Your cart</p>
          {basket.length ? (
            <>
              {filteredBasket.map((i) => (
                <SingleProduct
                  key={i.id}
                  flex={true}
                  cartStore={true}
                  noAdd={true}
                  product={i}
                />
              ))}
            </>
          ) : (
            <div>
              <p>No items in cart</p>
            </div>
          )}
        </div>
        <Subtotal />
      </section>
    </>
  );
}

export default Cart;
