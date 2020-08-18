import React from "react";
import { Formik } from "formik";
import RegisterForm from "./registerForm";
import registerSchema from "./validation";

const Register = React.memo(() => {
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <RegisterForm />
          </>
        )}
      </Formik>
    </>
  );
});

export default Register;
