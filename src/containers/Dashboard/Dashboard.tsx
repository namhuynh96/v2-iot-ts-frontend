import React from "react";
import { useSelector } from "react-redux";
import AdminControll from "./AdminControll/AdminControll";
import UserControll from "./UserControll/UserControll";
import Request from "./Request/Request";
import { IStoreState } from "../../store/reducers";

const Dashboard = () => {
  const {
    isAdmin,
    userData: { isAccepted }
  } = useSelector((state: IStoreState) => state.user);

  let content;
  if (isAdmin) {
    content = <AdminControll />;
  } else if (isAccepted) {
    content = <UserControll />;
  } else {
    content = <Request />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "72px" }}>{content}</div>
  );
};

export default Dashboard;
