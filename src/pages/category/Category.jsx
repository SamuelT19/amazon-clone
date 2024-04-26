import React, { useEffect, useState } from "react";
import { base } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { request } from "../../utils/requests";
import classes from "../../components/main/products/product.module.css";
import LoadingSpinner from "../LoadingSpinner";
import SingleProduct from "../../components/main/products/singleProduct";

function Category() {
  const [category, setcategory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    (async () => {
      await base
        .get(
          `${request.filter((x) => x === `/products/category/${categoryName}`)}`
        )
        .then((res) => {
          const catagoryItems = res.data;
          setcategory(catagoryItems);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("error", error);
        });
    })();
  }, [categoryName]);

  return (
    <>
      {loaded ? (
        <>
          <div className={classes.category_header}>
            <h1>CATEGORY/ {categoryName.toLocaleUpperCase()}</h1>
          </div>
          <div className={classes.products_container}>
            {category.map((i) => {
              return <SingleProduct key={i.id} product={i} />;
            })}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Category;
