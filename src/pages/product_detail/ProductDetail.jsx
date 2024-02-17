import React, { useEffect, useState } from "react";
import { base } from "../../utils/axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import SingleProduct from "../../components/main/products/singleProduct";

function ProductDetail() {
  const [singleItem, setsingleItem] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    (async () => {
      await base?.get(`/products/${productId}`).then((res) => {
        setsingleItem(res.data);
        setLoaded(true);
      });
    })();
  }, [productId]);
  return (
    <>
      {loaded ? (
        <SingleProduct product={singleItem} flex={true} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default ProductDetail;
