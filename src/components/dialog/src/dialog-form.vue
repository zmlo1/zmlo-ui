<template>
  <ml-dialog v-bind="$props" v-model="visible" @closed="closed">
    <template #header>
      <slot name="header">
        <h3 class="text-sm">{{ title }}</h3>
      </slot>
    </template>

    <template #default>
      <ml-form ref="mlFormRef" v-bind="form" />
    </template>

    <template #footer>
      <el-button @click="cancel">{{ cancelText }}</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">{{
        confirmText
      }}</el-button>
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
  emits: ["vanish"],
  setup(props, { expose, emit }) {
    const mlFormRef = ref<InstanceType<typeof MlForm>>();
    const visible = ref(false);
    const loading = ref(false);

    const changeVisible = (value?: boolean) => {
      if (value !== undefined) {
        visible.value = value;
        return;
      }

      visible.value = !visible.value;
    };

    const closed = () => {
      loading.value = false;
      visible.value = false;

      emit("vanish");
    };

    const cancel = () => {
      loading.value = false;
      visible.value = false;
    };

    const confirm = async () => {
      // Validate form
      const valid = await mlFormRef.value?.validate();
      if (!valid) return;

      loading.value = true;

      // Submit form
      const data = mlFormRef.value?.get();
      const success = await props.on.submit?.({ data });
      loading.value = false;

      if (success === false) return;

      visible.value = false;
    };

    expose({
      visible,
      changeVisible,
    });

    return {
      mlFormRef,
      visible,
      changeVisible,
      confirm,
      cancel,
      closed,
      loading,
    };
  },
});
</script>

<style scoped></style>
