import type { PropType, ExtractPropTypes } from "vue";
import type { TableColumnProps } from "./table-column.props";
export type TableSize = "" | "large" | "default" | "small";
export type TableLayout = "fixed" | "auto";

export const tableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumnProps[]>,
    default: () => [],
  },
  height: {
    type: [Number, String],
  },
  maxHeight: {
    type: [Number, String],
  },
  stripe: Boolean,
  border: Boolean,
  size: {
    type: String as PropType<TableSize>,
    default: "default",
  },
  fit: Boolean,
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
  currentRowKey: [String, Number],
  rowClassName: {
    type: [Function, String],
  },
  rowStyle: {
    type: [Function, Object],
  },
  cellClassName: {
    type: [Function, String],
  },
  cellStyle: {
    type: [Function, Object],
  },
  headerRowClassName: {
    type: [Function, String],
  },
  headerRowStyle: {
    type: [Function, Object],
  },
  headerCellClassName: {
    type: [Function, String],
  },
  headerCellStyle: {
    type: [Function, Object],
  },
  rowKey: {
    type: [String, Function],
    default: "key",
  },
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: {
    type: Object,
    default: () => ({
      prop: "",
      order: "",
    }),
  },
  tooltipEffect: String,
  tooltipOptions: Object,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  indent: {
    type: Number,
    default: 16,
  },
  lazy: Boolean,
  load: Function,
  treeProps: {
    type: Object,
    default: () => ({
      hasChildren: "hasChildren",
      children: "children",
    }),
  },
  tableLayout: {
    type: String as PropType<TableLayout>,
    default: "auto",
  },
  showOverflowTooltip: {
    type: Boolean,
    default: true,
  },
  flexible: Boolean,
};

export type TableProps = ExtractPropTypes<typeof tableProps>;
