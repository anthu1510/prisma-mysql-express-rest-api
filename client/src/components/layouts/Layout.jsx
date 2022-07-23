import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
