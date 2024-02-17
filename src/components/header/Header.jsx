import React, { useState, useEffect } from "react";
import amazonLogo from "../../assets/amazon-logo.png";
import usaFlag from "../../assets/usa-flag.jpg";
import { ImSearch } from "react-icons/im";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiMap } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import classes from "./header.module.css";
import { contextData } from "../DataProvider";
import { auth } from "../../utils/FireBase";
import { base } from "../../utils/axios";

function Header() {
  const [{ user, basket }] = contextData();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const response = await base.get(`/products`);
          let filteredProducts = response.data.filter((product) =>
            product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );

          if (selectedCategory !== "All products") {
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.category.toLowerCase() ===
                selectedCategory.toLowerCase()
            );
          }
          const titles = filteredProducts.map((product) => product.title);
          setSuggestions(titles);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchQuery, selectedCategory]);

  const handleSearch = async () => {
    if (searchQuery) {
      setTimeout(() => setInputFocused(false), 50);
      navigate(
        `/search-suggestions?query=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(selectedCategory)}`
      );
    } else {
      navigate("/");
    }
  };

  const handleSuggestionClick = (searchQuery) => {
    setTimeout(() => setInputFocused(false), 50);
    navigate(
      `/search-suggestions?query=${encodeURIComponent(
        searchQuery
      )}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  return (
    <>
      <div className={classes.header}>
        <section className={classes.header_outer_container}>
          <div className={classes.header_container}>
            <div className={classes.hp1}>
              <Link to="/">
                <img src={amazonLogo} alt="amazon-logo" />
              </Link>
              <Link to="" className={classes.delivery}>
                <span>
                  <BiMap />
                </span>
                <div className={classes.delivery_country}>
                  <p>Deliver to</p>
                  <span>Ethiopia</span>
                </div>
              </Link>
            </div>
            <div className={classes.search_container}>
              <div className={classes.hp2}>
                <select
                  name=""
                  id=""
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All products">All Products</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Amazon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onFocus={() => setInputFocused(true)}
                />
                <ImSearch className={classes.imsearch} onClick={handleSearch} />
              </div>
              {inputFocused && suggestions.length > 0 && (
                <div className={classes.suggestions}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={classes.suggestionItem}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.hp3}>
              <div className={classes.language}>
                <img src={usaFlag} alt="usa-flag" />
                <span>EN</span>
                <IoMdArrowDropdown />
              </div>
              <div className={classes.sign_in}>
                {user ? (
                  <>
                    <p>
                      Hello,
                      {`${user?.email.slice(0, user.email.indexOf("@"))}`}
                    </p>
                    <span onClick={() => auth.signOut()}>
                      Sign out
                      <IoMdArrowDropdown />
                    </span>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <p>Hello, sign in</p>
                      <span>
                        Account & Lists
                        <IoMdArrowDropdown />
                      </span>
                    </Link>
                  </>
                )}
              </div>
              <div className={classes.return}>
                <Link to="/orders">
                  <p>Returns</p>
                  <span>& Orders</span>
                </Link>
              </div>
              <div className={classes.cart}>
                <Link to="/cart">
                  <FiShoppingCart style={{ fontSize: "30px" }} />
                  <span>{basket?.length}</span>
                  <p>Cart</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <LowerHeader />
      </div>
    </>
  );
}

export default Header;
