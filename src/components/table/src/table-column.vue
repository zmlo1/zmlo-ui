<template>
  <el-table-column ref="elTableColumnRef" v-bind="getProps">
    <template #header>
      <span> {{ label }} </span>
    </template>
    <template #default="{ row }">
      <slot :row="row" :column="getProps" :prop="prop" :value="row[prop!]">
        <span> {{ row[prop!] }} </span>
      </slot>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { TableColumnProps } from "./table-column.props";
import { computed, ref } from "vue";
import { ElTableColumn } from "element-plus";
import { tableColumnProps } from "./table-column.props";

defineOptions({ name: "ml-table-column", inheritAttrs: false });

const props = defineProps(tableColumnProps);
const getProps = computed(() => ({ ...props } as TableColumnProps));
const elTableColumnRef = ref<InstanceType<typeof ElTableColumn> | null>(null);
</script>

<style scoped></style>
