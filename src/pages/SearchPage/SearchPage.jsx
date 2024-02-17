import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../../components/main/products/singleProduct";
import classes from "./SearchPage.module.css";
import { base } from "../../utils/axios";

function SearchPage() {
  const [closestProducts, setClosestProducts] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    if (searchQuery) {
      base
        .get(`/products`)
        .then((response) => {
          const filteredProducts = response.data.filter((product) => {
            
            const titleMatch = product.title
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase());
            const categoryMatch =
              !category ||
              category.toLowerCase() === "all products" ||
              product.category.toLowerCase() === category.toLowerCase();
            return titleMatch && categoryMatch;
          });
          setClosestProducts(filteredProducts);
        })
        .catch((error) => {
          console.error("Error fetching closest product titles:", error);
        });
    } else {
      setClosestProducts([]);
    }
  }, [searchQuery, category, location.search]);

  return (
    <div className={classes.searchPage_container}>
      <div className={classes.results_header}>
        <h1>Results</h1>
        <div>
          <p>Showing results from '{category}'</p>
          <p>
            {closestProducts?.length} result for
            <span style={{ color: "rgb(255, 165, 47)" }}> "{searchQuery}"</span>
          </p>
        </div>
      </div>
      <div className={classes.suggestion_container}>
        {closestProducts.map((product, index) => (
          <SingleProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
