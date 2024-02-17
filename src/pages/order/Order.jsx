import React, { useEffect, useState } from "react";
import { dbase } from "../../utils/FireBase";
import { contextData } from "../../components/DataProvider";
import SingleProduct from "../../components/main/products/singleProduct";
import classes from "./order.module.css";

function Order() {
  const [{ user}] = contextData();
  const [orders, setorders] = useState([]);

  useEffect(() => {
    if (user) {
      dbase
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setorders(
            snapshot?.docs?.map((doc) => ({
              id: doc?.id,
              dataBasket: doc?.data(),
            }))
          );
        });
    }
  }, []);

  return (
    <div>
      <div className={classes.order_head}>
        <h1>Your orders</h1>
      </div>
      {
        <div className={classes.orders_outer_container}>
          {orders.length < 1 ? (
            <div style={{ fontStyle: "oblique", fontSize: "20px" }}>
              You don't have orders yet
            </div>
          ) : (
            orders.map((order, i) => {
              const allItems = order.dataBasket.basket;

              const filtered = allItems?.filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.id === item.id)
              );
              const date = new Date(
                order.dataBasket.created * 1000
              ).toLocaleString();
              
              const itemCounts = {};
              allItems.forEach((item) => {
                itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
              });

              return (
                <div key={i} className={classes.orders_inner_container}>
                  <p>
                    <span>Ordered Date:</span> {date}
                  </p>
                  <p>
                    <span>Order ID:</span> {order?.id}
                  </p>
                  <p>
                    <span>Ordered Total_price:</span> ${order.dataBasket.amount}
                  </p>
                  <div>
                    {filtered.map((i) => {
                      return (
                        <SingleProduct
                          product={i}
                          noItems={itemCounts[i.id]}
                          key={i.id}
                          flex={true}
                          noDesc={true}
                          noAdd={true}
                          noRating={true}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      }
    </div>
  );
}

export default Order;
