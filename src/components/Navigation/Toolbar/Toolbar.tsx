import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

interface ToolbarProps {
  drawerToggleClicked: () => void;
  isAuth: boolean;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div style={{ color: "white" }}>
        A project built by{" "}
        <a className={classes.Author} href="https://nam-huynh.com" target="_blank" rel="noreferrer">
          Nam Huynh
        </a>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
