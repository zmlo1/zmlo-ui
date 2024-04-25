import { withInstall } from "../utils";

import Dialog from "./src/dialog.vue";
import DialogForm from "./src/dialog-form.vue";

export type { DialogProps, DialogFormProps } from "./src/dialog";
export const MlDialog = withInstall(Dialog);
export const MlDialogForm = withInstall(DialogForm);

export type DialogInstance = InstanceType<typeof MlDialog>;
export type DialogFormInstance = InstanceType<typeof MlDialogForm>;

export { mlDialogForm } from "./src/dialog-form";
export { dialogProps, dialogFormProps } from "./src/dialog";

export default MlDialog;
