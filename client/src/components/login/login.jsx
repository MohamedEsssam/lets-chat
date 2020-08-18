import React from "react";
import { Formik } from "formik";
import LoginComponent from "./loginComponent";
import loginSchema from "./validation";

const Login = () => {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <LoginComponent />
          </>
        )}
      </Formik>
    </>
  );
};

export default Login;
