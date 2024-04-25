import { makeInstaller } from "./utils";

import { MlForm, MlFormItem } from "./form";
import { MlDialogForm, MlDialog, mlDialogForm } from "./dialog";

export default makeInstaller([
  MlForm,
  MlFormItem,
  MlDialogForm,
  MlDialog,
  mlDialogForm,
]);
