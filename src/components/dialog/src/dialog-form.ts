import { useDialog } from "./create-dialog";
import { DialogFormProps } from "./dialog";
import MlDialogForm from "./dialog-form.vue";

export const mlDialogForm: (
  props: DialogFormProps,
  callback: (args: any) => any
) => Promise<any> = useDialog(MlDialogForm);

export default mlDialogForm;
