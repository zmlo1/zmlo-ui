import Form from "./src/form.vue";
import FormItem from "./src/form-item";
import { withInstall } from "../utils";

export type { FormProps, FormItemProps } from "./src/props";
export { formProps, formItemProps } from "./src/props";
export const MlForm = withInstall(Form);
export const MlFormItem = withInstall(FormItem);
export type FormInstance = InstanceType<typeof Form>;
export type FormItemInstance = InstanceType<typeof FormItem>;

export default Form;
