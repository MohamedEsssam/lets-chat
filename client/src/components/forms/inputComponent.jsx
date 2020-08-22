import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import "./style.css";

const CustomInput = ({ initialValues, name, ...otherProps }) => {
  const { handleChange, setFieldTouched, touched } = useFormikContext();

  return (
    <label id="label">
      {name}
      <Field
        defaultValue={initialValues}
        id="input"
        className="form-control"
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        {...otherProps}
      />
      {touched[name] && (
        <ErrorMessage
          id="error"
          className="form-control"
          name={name}
          component="div"
          style={{ color: "red" }}
        />
      )}
    </label>
  );
};

export default CustomInput;
