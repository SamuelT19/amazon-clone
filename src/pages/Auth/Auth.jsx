import React, { useState } from "react";
import { auth } from "../../utils/FireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import amazonLogo from "../../assets/amazon-logo-black.png";
import classes from "./auth.module.css";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ACTIONS, contextData } from "../../components/DataProvider";

function Auth() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState({
    signin: false,
    signup: false,
  });
  const [{ user }, dispatch] = contextData();
  const navigate = useNavigate();
  const proRouteData = useLocation();

  const loader = (
    <ScaleLoader color="#FFD814" speedMultiplier={2} height={10} />
  );

  const userinput = (e) => {
    e.preventDefault();
    seterror("");

    if (e.target.name === "signIn") {
      setloading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: ACTIONS.SET_USER,
            userRes: userInfo.user,
          });
          setloading({ ...loading, signin: false });
          navigate(
            `${
              proRouteData?.state?.redirect
                ? proRouteData?.state?.redirect
                : "/"
            }`
          );
        })
        .catch((err) => {
          console.log(err);
          setloading({ ...loading, signin: false });
          seterror(`ERROR: ${err}`);
        });
    } else if (e.target.name === "signUp") {
      setloading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: ACTIONS.SET_USER,
            userRes: userInfo.user,
          });
          setloading({ ...loading, signup: false });
          navigate(
            `${
              proRouteData?.state?.redirect
                ? proRouteData?.state?.redirect
                : "/"
            }`
          );
        })
        .catch((err) => {
          console.log(err);

          setloading({ ...loading, signup: false });
          seterror(`ERROR: ${err}`);
        });
    }
  };
  return (
    <>
      <div className={`${classes.signin} ${classes.flex}`}>
        <Link to={"/"} className={`${classes.signinLogo} ${classes.flex}`}>
          <img src={amazonLogo} alt="amazon-logo" />
        </Link>
        {proRouteData?.state?.msg && (
          <small style={{ color: "red" }}>{proRouteData?.state?.msg}</small>
        )}
        <form className={`${classes.signinForm} ${classes.flex}`} action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="username"
              id="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            name="signIn"
            onClick={userinput}
            className={classes.signin_btn}
          >
            {loading.signin ? loader : ` Sign-in`}
          </button>

          <p style={{ fontStyle: "italic" }}>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>

          <button
            type="submit"
            name="signUp"
            onClick={userinput}
            className={classes.signup_btn}
          >
            {loading.signup ? loader : `Create your Amazon Account `}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

export default Auth;
