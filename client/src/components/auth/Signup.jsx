import React from "react";
import AuthLayout from "./AuthLayout";

const Signup = () => {
  return (
    <AuthLayout title="SignUp">
      <form action="">
        <div className="mb-3">
          <label htmlFor="">Role</label>
          <select className="form-select" aria-label="Select the Role">
            {/* <option selected>Open this select menu</option> */}
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success">Signup</button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
