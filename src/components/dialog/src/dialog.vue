<template>
  <el-dialog v-bind="$props">
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>

    <template #default v-if="$slots.default">
      <slot />
    </template>

    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElDialog } from "element-plus";
import { dialogProps } from "./dialog";

export default defineComponent({
  name: "ml-dialog",
  inheritAttrs: false,
  components: {
    ElDialog,
  },
  props: dialogProps,
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
