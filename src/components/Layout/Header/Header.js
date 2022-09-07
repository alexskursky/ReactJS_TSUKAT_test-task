import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { public_routes } from "../../../routes";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>To-do app</h1>
      </div>
      <nav className={classes.nav}>
        <ul className={classes.nav__list}>
          {public_routes.map((route) => (
            <li className={classes.nav__item} key={route.path}>
              <NavLink className={classes.nav__link} to={route.path}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
