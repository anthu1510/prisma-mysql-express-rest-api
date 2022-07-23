import React from "react";
import Layout from "../layouts/Layout";

const AuthLayout = ({ children, title }) => {
  return (
    <Layout>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="col-xxl-4">
          <div className="card">
            <div className="card-header">{title}</div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
