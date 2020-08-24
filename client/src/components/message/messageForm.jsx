import React from "react";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import MessageInput from "./messageInput";
import messageSchema from "./validation";
import { create } from "../../services/messageService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MessageForm = React.memo(({ initialValues, type, roomId, onHide }) => {
  const params = useParams();
  const onSubmit = async (values, { resetForm }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      values["userId"] = user.userId;
      values["roomId"] = params.id;

      const message = await create(values);
      if (message) resetForm({ values: "" });
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
        initialValues={{ message: "" }}
        validationSchema={messageSchema}
        onSubmit={onSubmit}
      >
        {(
          handleChange,
          handleSubmit,
          error,
          setFieldTouched,
          touched,
          setFieldValue
        ) => (
          <>
            <Form>
              <MessageInput
                type="name"
                name="message"
                placeholder="Enter Message"
              />
              <Button
                type="submit"
                variant="dark"
                size="lg"
                style={{ position: "relative", left: "42rem", bottom: "60px" }}
              >
                Send
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});

export default MessageForm;
