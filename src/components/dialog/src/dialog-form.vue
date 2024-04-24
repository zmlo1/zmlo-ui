<template>
  <ml-dialog v-bind="$props" v-model="visible">
    <template #header>
      <slot name="header">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
      </slot>
    </template>

    <template #default>
      <ml-form ref="mlFormRef" v-bind="form" />
    </template>

    <template #footer>
      <el-button>{{ cancelText }}</el-button>
      <el-button type="primary" @click="confirm">{{ confirmText }}</el-button>
    </template>
  </ml-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { dialogFormProps } from "./dialog";

import MlForm from "@/components/form";
import MlDialog from "./dialog.vue";

export default defineComponent({
  name: "ml-dialog-form",
  inheritAttrs: false,
  components: {
    MlDialog,
    MlForm,
  },
  props: dialogFormProps,
  setup(props, { expose }) {
    const mlFormRef = ref<InstanceType<typeof MlForm>>();
    const visible = ref(false);

    const changeVisible = (value?: boolean) => {
      if (value !== undefined) {
        visible.value = value;
        return;
      }

      visible.value = !visible.value;
    };

    const confirm = () => {
      console.log("Confirm");
      mlFormRef.value?.validate().then((valid) => {
        if (valid) {
          console.log("Form is valid");
        } else {
          console.log("Form is invalid");
        }
      });
    };

    expose({
      visible,
      changeVisible,
    });

    return {
      mlFormRef,
      visible,
      confirm,
      changeVisible,
    };
  },
});
</script>

<style scoped></style>
