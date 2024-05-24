import { makeInstaller } from "./utils";

import { MlForm, MlFormItem } from "./form";
import { MlDialogForm, MlDialog, mlDialogForm } from "./dialog";
import { MlTable } from "./table";

export default makeInstaller([
  MlForm,
  MlFormItem,
  MlDialogForm,
  MlDialog,
  MlTable,
  mlDialogForm,
]);
