import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";

const LoginComponent = () => {
  const { handleChange, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <h1>Login</h1>
      <Form>
        <label>
          Email:
          <Field
            type="email"
            name="email"
            onBlur={() => setFieldTouched("email")}
            onChange={handleChange("email")}
            placeholder="email"
            icon="email"
          />
          {touched["email"] && (
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />
          )}
        </label>
        <label>
          Password:
          <Field
            type="password"
            name="password"
            onBlur={() => setFieldTouched("password")}
            onChange={handleChange("password")}
            placeholder="password"
            icon="password"
          />
        </label>
        {touched["password"] && (
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />
        )}
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default LoginComponent;
