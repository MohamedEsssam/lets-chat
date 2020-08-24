import React from "react";
import { Field, useFormikContext } from "formik";

const MessageInput = ({ initialValues, name, ...otherProps }) => {
  const { handleChange, setFieldTouched } = useFormikContext();

  return (
    <>
      <Field
        as="textarea"
        defaultValue={initialValues}
        className="form-control"
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        {...otherProps}
        style={{ width: "40rem" }}
      />
    </>
  );
};

export default MessageInput;
