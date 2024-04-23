import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import Auth from "./pages/Auth/Auth";
import Order from "./pages/order/Order";
import ProductDetail from "./pages/product_detail/ProductDetail";
import Layout from "./pages/Layout";
import Category from "./pages/category/Category";
import Four04 from "./pages/Four04";

import { useEffect, useState } from "react";
import LoadingSpinner from "./pages/LoadingSpinner";

import "./App.css";
import { ACTIONS, contextData } from "./components/DataProvider";
import { auth } from "./utils/FireBase";
import Payment from "./pages/payment/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectRouter from "./components/ProtectRouter";
import SearchPage from "./pages/SearchPage/SearchPage";

const stripePromise = loadStripe(
  "pk_test_51Oikc4ApmW7F9U3rPkZS0lb8oVgQYl6kh373zyQpldAq7HDzCDTumzeubwTgQiexqvyWlEv7PUE8Y2b3upbLCyPV00e6RUepD0"
);
function App() {
  const [{ user }, dispatch] = contextData();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: ACTIONS.SET_USER,
          userRes: authUser,
        });
      } else
        dispatch({
          type: ACTIONS.SET_USER,
          userRes: null,
        });
    });

    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/orders"
                element={
                  <ProtectRouter
                    msg={"you must logIn to see your orders"}
                    redirect={"/orders"}
                  >
                    <Order />
                  </ProtectRouter>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectRouter
                    msg={"you must logIn to pay"}
                    redirect={"/payment"}
                  >
                    <Elements stripe={stripePromise}>
                      <Payment />
                    </Elements>
                  </ProtectRouter>
                }
              />
              <Route
                path="/categories/:categoryId"
                element={<Category />}
              />
              <Route
                path="/productDetail/:productId"
                element={<ProductDetail />}
              />
              <Route path="*" element={<Four04 />} />
              <Route path="/search-suggestions" element={<SearchPage />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default App;
