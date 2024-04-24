import type { ExtractPropTypes, PropType } from "vue";
import type { FormProps } from "@/components/form";
import { dialogProps as elDialogProps } from "element-plus";
import propTypes from "vue-types";

export const dialogProps = {
  ...elDialogProps,
  draggable: propTypes.bool.def(true),
  destroyOnClose: propTypes.bool.def(true),
  width: {
    type: [String, Number],
    default: "760",
  },
};

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

export const dialogFormProps = {
  title: propTypes.string.def("Title..."),
  cancelText: propTypes.string.def("Cancel"),
  confirmText: propTypes.string.def("Confirm"),
  form: {
    type: Object as PropType<FormProps>,
    required: true,
  },
};

export type DialogFormProps = ExtractPropTypes<typeof dialogFormProps>;
