import React, { useEffect, useState } from "react";
import { base } from "../../../utils/axios";
import classes from "./product.module.css";
import SingleProduct from "./singleProduct";

function AllProducts({ searchQuery = "" }) {
  const [all, setAll] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        await base.get("/products").then((res) => {
          setAll(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const filteredProducts = all.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filteredProducts);
  }, [searchQuery, all]);
  return (
    <>
      <div className={classes.products_container}>
        {suggestions.map((i) => {
          return <SingleProduct key={i.id} product={i} />;
        })}
      </div>
    </>
  );
}

export default AllProducts;
