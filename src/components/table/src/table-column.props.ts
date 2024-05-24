import type { ExtractPropTypes, PropType } from "vue";

export type TableColumnType = "default" | "selection" | "index" | "expand";

export const tableColumnProps = {
  prop: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "auto",
  },
  fixed: {
    type: [Boolean, String],
    default: false,
  },
  sortable: Boolean,
  minWidth: {
    type: Number,
  },
  type: {
    type: String as PropType<TableColumnType>,
    default: "default",
  },
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;
