import React from "react";
import AuthLayout from "./AuthLayout";

const Login = () => {
  return (
    <AuthLayout title="Login">
      <form action="">
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Login</button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
