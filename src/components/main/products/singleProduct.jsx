import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import classes from "./product.module.css";
import { ACTIONS, contextData } from "../../DataProvider";
import CartAddArrow from "../../cartAddArrow/CartAddArrow";

function SingleProduct({
  product,
  flex,
  cartStore,
  noDesc,
  noAdd,
  noRating,
  noItems,
}) {
  const { id, title, description, rating, price} = product;
  const image = product.category.image;
  const [{ basket }, dispatch] = contextData();

  const cartAdd = () => {
    dispatch({
      type: ACTIONS.ADD_TO_BASKET,
      item: product,
    });
  };

  function customSort(basket) {
    const groups = {};
    const idOrder = [];

    for (const item of basket) {
      const id = item.id;
      if (!groups[id]) {
        idOrder.push(id);
        groups[id] = true;
      }
    }
    basket.sort((a, b) => idOrder.indexOf(a.id) - idOrder.indexOf(b.id));
  }
  customSort(basket);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <>
      {!flex ? (
        <div className={classes.item_container} key={id}>
          <Link to={`/productDetail/${id}`}>
            <div className={classes.item_image}>
              <img src={image} className={classes.items_image} />
            </div>
            <div className={classes.text}>
              <h2>{truncate(title, 70)}</h2>
              <Rating
                defaultValue={rating?.rate}
                size="larger"
                precision={0.5}
                readOnly
              />
              <span> {rating?.count}</span>
              <p>${price}</p>
            </div>
          </Link>
          <button className={classes.button} onClick={cartAdd}>
            Add to cart
          </button>
        </div>
      ) : (
        <section
          className={`${classes.singleProduct_container} ${
            noDesc && classes.for_payment
          }`}
        >
          <div
            className={`${classes.image} ${noDesc && classes.payment_image}`}
          >
            <img src={image} alt="" />
            {noItems && (
              <div className={classes.no_items}>
                <p>
                  {noItems} {noItems > 1 ? "Items" : "Item"}
                </p>
              </div>
            )}
          </div>
          <div className={classes.texts}>
            <h2 style={{ fontSize: "20px", fontWeight: "800" }}>{title}</h2>
            {!noDesc && <p style={{ fontWeight: "600" }}>{description}</p>}
            {noRating ? (
              ""
            ) : (
              <p>
                <Rating
                  defaultValue={rating?.rate}
                  size="larger"
                  precision={0.5}
                  readOnly
                />
                <span> {rating?.count}</span>
              </p>
            )}

            <p>${price}</p>
          </div>
          {!noAdd && (
            <button className={classes.button} onClick={cartAdd}>
              Add to cart
            </button>
          )}

          {cartStore && <CartAddArrow product={product} />}
        </section>
      )}
    </>
  );
}

export default SingleProduct;
