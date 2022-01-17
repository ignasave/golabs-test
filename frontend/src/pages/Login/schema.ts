import * as yup from "yup";

const schema = yup.object({
    email: yup.string().email('must be valid email').required('required'),
    password: yup.string().required('required'),
  }).required();

export default schema;