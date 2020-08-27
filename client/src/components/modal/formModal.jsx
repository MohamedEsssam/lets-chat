import React from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import CustomInput from "../forms/inputComponent";
import createRoomSchema from "./validation";
import { create, update } from "../../services/chatRoomServices";
import { currentUser } from "../../services/userServices";

const FromModal = React.memo(({ initialValues, type, roomId, onHide }) => {
  const onSubmit = async (values) => {
    try {
      const user = currentUser();
      let room;
      values["userId"] = user.userId;
      if (type === "Create") room = await create(values);
      else {
        values["roomId"] = roomId;
        room = await update(values);
      }

      if (room) {
        toast.success(`Room ${type} Successfully 🎉🎊`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
        onHide();
      }
    } catch (err) {
      if (err.response.status === 500)
        toast.error(`Failed to ${type} room 😞`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000,
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={createRoomSchema}
        onSubmit={onSubmit}
      >
        {(handleChange, handleSubmit, error, setFieldTouched, touched) => (
          <>
            <Form>
              <CustomInput
                initialValues={initialValues.name}
                type="name"
                name="name"
                placeholder="Enter Room Name"
              />
              <Button type="submit" variant="primary">
                {type} Room
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});

export default FromModal;
