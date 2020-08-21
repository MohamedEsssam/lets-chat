import * as Yup from "yup";

const createRoomSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export default createRoomSchema;
