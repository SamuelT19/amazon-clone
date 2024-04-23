import React, { useEffect, useState } from "react";
import { base } from "../../../utils/axios";
import { Link } from "react-router-dom";
import classes from "./product.module.css";

function ProductCategory({ address }) {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    (async () => {
      const catagoryUrl = await base.get(address);
      const c = catagoryUrl.data;
      setCat(c);
    })().catch(console.error);
  }, []);
  const imageStyle = {
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundImage: `url(${cat.image})`,
  };
  return (
    <>
      <div className={classes.category}>
        <Link to={address}>
          <div className={classes.title}>{cat.name} </div>
          <div className={classes.poster} key={cat.id} style={imageStyle}></div>
        </Link>
        <Link to={address}>
          <p>shop now</p>
        </Link>
      </div>
    </>
  );
}

export default ProductCategory;
