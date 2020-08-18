import React from "react";
import CustomInput from "../forms/inputComponent";
import { Form } from "formik";

const RegisterForm = () => {
  return (
    <>
      <h1>Login</h1>
      <Form>
        <CustomInput type="text" name="name" placeholder="Name" />
        <div>
          <CustomInput type="email" name="email" placeholder="Email" />
          <CustomInput type="password" name="password" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default RegisterForm;
