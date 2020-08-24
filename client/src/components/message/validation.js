import * as Yup from "yup";

const messageSchema = Yup.object().shape({
  message: Yup.string().required("can't send empty message"),
});

export default messageSchema;
