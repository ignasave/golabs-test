import * as yup from "yup";

const schema = yup.object({
    title: yup.string().required('required'),
    description: yup.string().required('required'),
    duration: yup.number().required('required'),
  }).required();

export default schema;