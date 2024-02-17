import React, { useEffect } from "react";
import { contextData } from "./DataProvider";
import { useNavigate } from "react-router-dom";

function ProtectRouter({ children, msg, redirect }) {
  const [{ user }] = contextData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, []);
  return children;
}

export default ProtectRouter;
