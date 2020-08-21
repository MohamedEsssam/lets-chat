import React from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import CustomInput from "../forms/inputComponent";
import createRoomSchema from "./validation";
import { create } from "../../services/chatRoomServices";

const FromModal = React.memo(({ onHide }) => {
  const onSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      values["userId"] = user.userId;
      const room = await create(values);

      if (room) {
        toast.success("Room created successfully 🎉🎊", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
        onHide();
      }
    } catch (err) {
      if (err.response.status === 500)
        toast.error("Failed to create room 😞", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={createRoomSchema}
        onSubmit={onSubmit}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <Form>
              <CustomInput
                type="name"
                name="name"
                placeholder="Enter Room Name"
              />
              <Button type="submit" variant="primary">
                Create Room
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});

export default FromModal;
