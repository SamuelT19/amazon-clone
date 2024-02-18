import React, { useEffect, useState } from "react";
import classes from "./payment.module.css";
import { ACTIONS, contextData } from "../../components/DataProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { functionAxios } from "../../utils/axios";
import { dbase } from "../../utils/FireBase";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import SingleProduct from "../../components/main/products/singleProduct";
import paymentDone from "../../assets/payment-done.png";
import paymentFailed from "../../assets/payment-failed.png";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const [{ user, basket }, dispatch] = contextData();
  const [filteredBasket, setFilteredBasket] = useState([]);
  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemCounts, setItemCounts] = useState({});
  const [payStatus, setpayStatus] = useState({ done: false, failed: false });
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = basket.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
    setFilteredBasket(filtered);

    const counts = {};
    basket.forEach((item) => {
      counts[item.id] = (counts[item.id] || 0) + 1;
    });
    setItemCounts(counts);
  }, [basket]);

  const handleErr = (e) => {
    setCardError(e?.error?.message);
  };
  const totalPrice = parseFloat(
    basket?.reduce((acc, current) => acc + current.price, 0).toFixed(2)
  );
  const emptyBasket = () => {
    dispatch({
      type: ACTIONS.EMPTY_BASKET,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await functionAxios?.post(`/payment?t=${totalPrice * 100}`);
      const clientSecret = res.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      await dbase
        ?.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent?.id)
        .set({
          basket: basket,
          amount: paymentIntent?.amount / 100,
          created: paymentIntent?.created,
        });
      setLoading(false);
      setpayStatus({ done: true, failed: false });
      setTimeout(() => {
        emptyBasket();
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setpayStatus({ done: false, failed: true });
    }
  };

  return (
    <div className={classes.payment_container}>
      <div className={classes.total_items}>
        <p>Checkout ({basket.length}) items</p>
      </div>
      <div className={classes.flex}>
        <div>
          <h1>Delivery Address</h1>
        </div>
        <div>
          <p>{user?.email}</p>
          <p>123 snowless</p>
          <p>Siberia,XX</p>
        </div>
      </div>
      <div className={classes.flex}>
        <div>
          <h1>Review items and delivery</h1>
        </div>
        <div>
          {filteredBasket.map((i) => {
            return (
              <SingleProduct
                product={i}
                noItems={itemCounts[i.id]}
                flex={true}
                noDesc={true}
                noAdd={true}
                key={i.id}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <div>
          <h1>Payment methods</h1>
        </div>
        <div className={classes.card_element}>
          <form onSubmit={handlePayment}>
            {cardError && <small style={{ color: "red" }}>{cardError}</small>}
            <CardElement onChange={handleErr} />
            <div className={classes.total_price}>
              <p>
                Total price | <span>${totalPrice}</span>
              </p>
              <button type="submit" className={classes.pay_btn}>
                {loading ? (
                  <div>
                    <ClipLoader color="#141615" size={10} /> <p>processing</p>
                  </div>
                ) : (
                  <div>
                    <p>Pay now</p>
                  </div>
                )}
              </button>
              {}
              {payStatus.done && (
                <div className={classes.payment_done}>
                  <img src={paymentDone} alt="payment done" />
                  <p>Payment Done</p>
                </div>
              )}
              {payStatus.failed && (
                <div className={classes.payment_failed}>
                  <img src={paymentFailed} alt="payment failed" />
                  <p style={{}}>Payment Failed</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
