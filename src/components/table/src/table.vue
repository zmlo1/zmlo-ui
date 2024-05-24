<template>
  <el-table ref="elTableRef" v-bind="getBindValues">
    <MlTableColumn
      v-for="column in columns"
      v-bind="column"
      :key="column.prop"
    />
  </el-table>
</template>

<script lang="ts" setup>
import type { TableProps } from "./table.props";
import { computed, ref } from "vue";
import { ElTable } from "element-plus";
import { tableProps } from "./table.props";
import MlTableColumn from "./table-column.vue";

defineOptions({ name: "ml-table", inheritAttrs: false });

const props = defineProps(tableProps);
const elTableRef = ref<InstanceType<typeof ElTable> | null>(null);

const getProps = computed(() => {
  return { ...props } as TableProps;
});

const getBindValues = computed(() => {
  return getProps.value as any;
});
</script>
