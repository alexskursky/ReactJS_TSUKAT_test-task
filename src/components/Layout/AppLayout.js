import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import classes from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default AppLayout;
