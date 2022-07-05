import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SigninForm from "../SigninForm/SigninForm";

const SigninPage = () => {
  const signing = {
    position: "absolute",
    top: "270px",
    left: "640px",
  };

  const signingIn = useSelector((state) => state.auth.signingIn);
  return (
    <>
      {signingIn ? (
        <div style={signing}>
          <CircularProgress color="primary" style={{ width: "120px", height: "120px" }} /> 
        </div>) 
        : 
        (<SigninForm />)} 
    </>
  );
};

export default SigninPage;
