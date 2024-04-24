import type { ExtractPropTypes, PropType } from "vue";
import {
  formProps as elFormProps,
  formItemProps as elFormItemProps,
} from "element-plus";
import propTypes from "vue-types";

export const formItemProps = {
  ...elFormItemProps,

  label: propTypes.string.def(""),
  prop: propTypes.string,
  required: propTypes.bool.def(false),
  hidden: propTypes.bool.def(false),
  span: propTypes.number.def(24),
  initValue: propTypes.any,
  modelValue: propTypes.any,
  rules: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  component: {
    type: Object,
    default: null,
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

export const formProps = {
  ...elFormProps,
  gutter: propTypes.number.def(8),
  formItems: {
    type: Array as PropType<Partial<FormItemProps>[]>,
    default: () => [],
  },
};

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;
