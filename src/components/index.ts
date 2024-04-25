import { makeInstaller } from "./utils";

import { MlForm, MlFormItem } from "./form";
import { MlDialogForm, MlDialog, mlDialogForm } from "./dialog";
import { MlDynamicForms } from "./table-forms";

export default makeInstaller([
  MlForm,
  MlFormItem,
  MlDialogForm,
  MlDialog,
  MlDynamicForms,
  mlDialogForm,
]);
