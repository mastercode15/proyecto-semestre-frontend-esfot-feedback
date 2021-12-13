import React, { useEffect } from "react";
import { useAuth } from "../providers/Auth";
import withAuth from "../hocs/withAuth";
import API from "../data";
import Cookies from "js-cookie";
import { Spin } from "antd";

const Logout = () => {
  const { setAuthenticated, setCurrentUser } = useAuth();
  useEffect(() => {
    async function doLogout() {
      try {
        console.log("loggin out");
        await API.post("/logout");
        Cookies.remove("token");
        delete API.headers["Authorization"];
        window.localStorage.setItem("login", JSON.stringify(false));
        setAuthenticated(false);
        setCurrentUser(null);
        window.location.reload(true);
      } catch (e) {
        console.log("e", e);
      }
    }

    doLogout();
  }, [setAuthenticated, setCurrentUser]);
  return (
    <div style={{ textAlign: "center", marginTop: "8%" }}>
      <Spin size="large" />
      <h2 style={{ marginTop: 50 }}>Cerrando Sesión</h2>
    </div>
  );
};

export default withAuth(Logout, "/");
