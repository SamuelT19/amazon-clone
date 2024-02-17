import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import classes from "./header.module.css";

function LowerHeader() {
  return (
    <div className={classes.lower_header}>
      <ul>
        <li>
          <GiHamburgerMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
