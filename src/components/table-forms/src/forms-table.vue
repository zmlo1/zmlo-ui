<template>
  <h1 class="flex items-center gap-2 mb-2">
    <div class="text-sm text font-bold flex items-center gap-2">
      <slot
        name="title"
        :attrs="$attrs"
        :set="set"
        :index="currentIndex"
        :value="currentValue"
        :item="currentItem"
        :data="formData"
        :rows="values"
        :row="values[currentIndex]"
        :initRow="originValue"
        :prop="currentItem?.prop"
      >
        <el-text>{{ title }} </el-text>
      </slot>
    </div>
    <el-button
      class="!h-[16px]"
      type="primary"
      size="small"
      plain
      :icon="Plus"
      @click="add()"
      v-if="showAddBtn"
    />
  </h1>
  <div class="w-full py-1 px-2 border rounded shadow-sm overflow-hidden">
    <el-table
      class="ops-table w-full"
      :border="true"
      :class="$attrs.class"
      :header-cell-style="() => headerCellStyle"
      :data="values"
      @selection-change="onSelectionChange"
    >
      <template v-for="column in columns" :key="column.prop ?? column.type">
        <el-table-column
          type="selection"
          fixed="left"
          :width="25"
          v-if="column.type === 'selection'"
        />

        <el-table-column
          :prop="column.prop"
          :fixed="column.fixed"
          :type="column.type"
          v-bind="getTableColumnProps(column)"
          v-else
        >
          <template v-if="showHeader" #header="{ $index }">
            <el-text v-if="typeof column.label === 'string'">
              {{ column.label }}
            </el-text>
            <component
              :is="column.label"
              :data="formData"
              :rows="modelValue"
              :value="modelValue[$index]?.[column.prop]"
              v-else
            >
            </component>
          </template>

          <template v-if="!column.type" #default="{ row, $index }">
            <component
              :size="props.size"
              :is="column.component.name"
              :model-value="row[column.prop]"
              :index="$index"
              :row="row"
              :formData="formData"
              @update:model-value="(val) => onUpdate(val, $index, column)"
              v-bind="{ ...$attrs, ...column.component?.props }"
            />
          </template>
        </el-table-column>
      </template>

      <el-table-column fixed="right" width="95px">
        <template #default="{ row, $index }">
          <el-space :size="2">
            <el-button
              type="primary"
              :size="props.size"
              :icon="DocumentCopy"
              @click="add(row, $index)"
              link
            />
            <el-button
              type="danger"
              :size="props.size"
              :icon="Minus"
              :disabled="length <= 1"
              @click="sub($index)"
              link
            />
            <template v-if="seqProp">
              <el-button
                class="py-0 h-4"
                size="small"
                :icon="CaretTop"
                :disabled="$index === 0"
                @click.stop="onMove($index, 'top')"
                link
              />
              <el-button
                class="py-0 h-4"
                size="small"
                :icon="CaretBottom"
                :disabled="maxIndex === $index"
                @click.stop="onMove($index, 'bottom')"
                link
              />
            </template>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <div class="ml-[25px] px-[4px]">
      <slot
        name="footer"
        :rows="values"
        :data="formData"
        :attrs="$attrs"
        :set="set"
        :index="currentIndex"
        :value="currentValue"
        :item="currentItem"
        :row="values[currentIndex]"
        :initRow="originValue"
        :prop="currentItem?.prop"
        :selection="selection"
      >
        <el-text type="primary" v-if="footer">
          {{ isFunction(footer) ? footer({ selection }) : footer }}
        </el-text>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, CSSProperties } from "vue";
import { useAttrs } from "vue";
import _, { isFunction } from "lodash-es";
import {
  CaretTop,
  CaretBottom,
  DocumentCopy,
  Plus,
  Minus,
} from "@element-plus/icons-vue";
import { isEmpty, isUndefined } from "@ops-ui/utils";
import { getTableColumnProps } from "./utils";

defineOptions({ name: "forms-table", inheritAttrs: false });

const props = defineProps({
  seqProp: String,
  on: Object,
  title: {
    type: String,
    default: "",
  },
  columnPadding: {
    type: String,
    default: "4px",
  },
  showAddBtn: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<"small" | "default" | "large">,
    default: "default",
  },
  omitPaths: {
    type: Array as PropType<string[]>,
    default: () => ["id", "createTime", "updateTime", "createBy", "updateBy"],
  },
  formData: {
    type: Object,
  },
  modelValue: {
    type: Array as PropType<any[]>,
  },
  columns: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  footer: {
    type: Function,
  },
});

const emit = defineEmits(["update:model-value"]);
const attrs = useAttrs();

const currentIndex = ref(-1);
const currentValue = ref();
const currentItem = ref(null);
const cellBackgroundColor = "#f9f9f9";

const headerCellStyle: CSSProperties = {
  fontWeight: 400,
  backgroundColor: cellBackgroundColor,
};

const originValue: Record<string, any> = {};

props.columns.forEach((c) => {
  return (originValue[c.prop!] = c.component?.props?.defaultValue);
});

function getInitModelValue() {
  const values = props.modelValue?.length ? props.modelValue : [originValue];
  return _.chain(values)
    .sortBy(props.seqProp)
    .map((i) => _.omit(i, props.seqProp))
    .value();
}

const values = ref(getInitModelValue());
const selection = ref(values.value);
const length = computed(() => values.value.length);
const maxIndex = computed(() => length.value - 1);

const set = (prop: string, value: any, autoIndex = true) => {
  if (autoIndex && !prop.includes("[") && !prop.includes("]")) {
    prop = `[${currentIndex.value}].${prop}`;
  }
  _.set(values.value, prop, value);
};

const onUpdate = (value, index, item) => {
  currentIndex.value = index;
  currentValue.value = value;
  currentItem.value = item;
  values.value[index][item.prop] = value;

  const params = {
    attrs,
    set,
    index,
    item,
    value,
    data: props.formData,
    rows: values.value,
    row: values.value[index],
    initRow: _.cloneDeep(originValue),
    prop: item.prop,
  };

  props.on?.updated?.(params);
  item.on?.updated?.(params);
};

const add = (data = originValue, index?) => {
  let newRow = _.cloneDeep(data);

  if (!isEmpty(newRow)) {
    newRow = _.omit(newRow, props.omitPaths);
  }

  currentIndex.value = index;
  values.value.splice(
    isUndefined(index) ? values.value.length : index + 1,
    0,
    newRow
  );
};

const sub = (index: number) => {
  currentIndex.value = index;
  values.value.splice(index, 1);
};

const onMove = (index, to) => {
  const targetIndex = to === "top" ? index - 1 : index + 1;

  const currentRow = values.value[index];
  const targetRow = values.value[targetIndex];

  values.value[index] = targetRow;
  values.value[targetIndex] = currentRow;
};

const onSelectionChange = (rows: any[]) => {
  if (!rows?.length) {
    selection.value = values.value;
    return;
  }

  selection.value = rows;
};

watch(
  () => props.modelValue,
  (nval) => {
    if (_.isEqual(values.value, nval)) return;
    values.value = nval;
  }
);

watch(
  values,
  (val) => {
    if (props.seqProp) {
      val = _.chain(val)
        .mapKeys((v, i) => i)
        .mapValues((v, k) => ({ ...v, [props.seqProp]: +k }))
        .map((v) => v)
        .value();
    }

    emit("update:model-value", val, {
      currentIndex: currentIndex.value,
      currentValue: currentValue.value,
      currentItem: currentItem.value,
    });
  },
  { deep: true, immediate: true }
);

defineExpose({
  values,
  selection,
  add,
  sub,
  set,
  onUpdate,
  onMove,
  onSelectionChange,
});
</script>

<style lang="scss" scoped>
$cellBackgroundColor: v-bind(cellBackgroundColor);
$columnPadding: v-bind(columnPadding);

/* 优化背景颜色 */
.el-table.ops-table {
  background-color: $cellBackgroundColor;

  :deep(tr) {
    background-color: $cellBackgroundColor;
    td {
      background-color: $cellBackgroundColor;
    }
  }
}

/* 优化内边距 */
.el-table.ops-table {
  :deep(.el-table__cell) {
    padding-top: $columnPadding;
    padding-bottom: $columnPadding;
    .cell {
      padding-right: $columnPadding;
      padding-left: $columnPadding;
    }
  }
}

/* 针对边框的优化 */
.el-table.ops-table {
  background-color: $cellBackgroundColor;

  :deep(.el-table__inner-wrapper::before) {
    background-color: $cellBackgroundColor;
  }

  :deep(.el-table__border-left-patch) {
    background-color: $cellBackgroundColor;
  }

  :deep(.el-table--border::after) {
    background-color: $cellBackgroundColor;
  }

  :deep(.el-table__cell) {
    border: none !important;
  }

  :deep(.el-table__inner-wrapper::after) {
    height: 0px !important;
  }
}

.el-table--border::after,
.el-table--border::before,
.el-table--border .el-table__inner-wrapper::after,
.el-table__inner-wrapper::before {
  height: 0px;
  width: 0px;
  background-color: $cellBackgroundColor !important;
}
</style>
