import React from "react";
import { useSelector } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { IStoreState } from "../../../store/reducers";

interface NavigationItemsProps {
  isAuthenticated: boolean;
}

const NavigationItems: React.FC<NavigationItemsProps> = props => {
  const { isAdmin } = useSelector((state: IStoreState) => state.user);

  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated ? (
        <React.Fragment>
          <NavigationItem link="/" exact>
            Main
          </NavigationItem>
          {isAdmin && <NavigationItem link="/users">Users</NavigationItem>}
          <NavigationItem link="/logout">Log out</NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem link="/">Log in</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
