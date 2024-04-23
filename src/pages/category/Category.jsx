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
  const [categoryName, setCategoryName] = useState();

  const { categoryId } = useParams();
  useEffect(() => {
    (async () => {
      await base
        .get("/products")
        .then((res) => {
          const catagoryItems = res.data.filter(
            (x) => x.category.id == categoryId
          );
          setcategory(catagoryItems);
          setCategoryName(catagoryItems[0].category.name);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("error", error);
        });
    })();
  }, [categoryId]);

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
