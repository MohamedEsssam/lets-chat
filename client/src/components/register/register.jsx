import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import RegisterForm from "./registerForm";
import registerSchema from "./validation";
import { register } from "../../services/userServices";

const Register = React.memo(() => {
  const history = useHistory();
  const onSubmit = async (values) => {
    try {
      const user = await register(values);
      if (user) {
        toast.success(`Welcome ${user.name}🎉🎊`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });

        history.push({
          pathname: "/",
          user: user,
        });
      }
    } catch (err) {
      if (err.response.status === 409)
        toast.error("User already exists ! 😞", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
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
