import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

const CustomInput = ({ name, ...otherProps }) => {
  const { handleChange, setFieldTouched, touched } = useFormikContext();

  return (
    <div>
      <label>
        {name}
        <Field
          name={name}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />
        {touched[name] && (
          <ErrorMessage name={name} component="div" style={{ color: "red" }} />
        )}
      </label>
    </div>
  );
};

export default CustomInput;
