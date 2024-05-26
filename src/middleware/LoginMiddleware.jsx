import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginMiddleware({ children }) {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("dataLogin") == null) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}
