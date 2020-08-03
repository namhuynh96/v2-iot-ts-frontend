import React, { useState, useCallback } from "react";

import Toolbar from "../../Navigation/Toolbar/Toolbar";
import classes from "./AppLayout.module.css";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";

interface AppLayoutProps {
  isAuth: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = props => {
  const [sideDrawIsVisible, setsideDrawIsVisible] = useState(false);

  const toggleSideDrawerHandler = useCallback(() => {
    setsideDrawIsVisible(!sideDrawIsVisible);
  }, [setsideDrawIsVisible, sideDrawIsVisible]);

  const closeSideDrawerHandler = useCallback(() => {
    setsideDrawIsVisible(false);
  }, [setsideDrawIsVisible]);

  return (
    <React.Fragment>
      <Toolbar
        drawerToggleClicked={toggleSideDrawerHandler}
        isAuth={props.isAuth}
      />
      <SideDrawer
        open={sideDrawIsVisible}
        backdropClicked={closeSideDrawerHandler}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default AppLayout;