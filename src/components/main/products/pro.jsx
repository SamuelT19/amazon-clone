import React, { useEffect, useState } from "react";
import ProductCategory from "./productCategory";
import AllProducts from "./AllProducts";
import LoadingSpinner from "../../../pages/LoadingSpinner";
import { request } from "../../../utils/requests";
import classes from "./product.module.css";

function Pro() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <div className={classes.catagory_container}>
            {request.map((address) => (
              <ProductCategory key={address} address={address} />
            ))}
          </div>
          <AllProducts />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Pro;
