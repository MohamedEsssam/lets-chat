import React from "react";
import CustomInput from "../forms/inputComponent";
import { Form } from "formik";

const LoginForm = () => {
  return (
    <>
      <h1>Login</h1>
      <Form>
        <CustomInput type="email" name="email" placeholder="Email" />
        <CustomInput type="password" name="password" placeholder="Password" />

        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default LoginForm;
