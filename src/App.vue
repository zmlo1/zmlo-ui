<template>
  <div class="h-[100vh] w-[100vw] bg-[#f2f2f3]">
    <div class="container h-full mx-auto bg-white shadow-sm p-10">
      <el-button @click="onClick">Open Dialog Form</el-button>
      <ml-dialog-form ref="dialogFormRef" v-bind="dialogFormProps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormProps } from "./components/form";
import { ref } from "vue";
import { MlDialogForm } from "./components/dialog";

const dialogFormRef = ref<InstanceType<typeof MlDialogForm>>();

const onClick = () => {
  dialogFormRef.value?.changeVisible();
};

const formProps: FormProps = {
  labelPosition: "right",
  labelWidth: 120,
  size: "default",

  formItems: [
    {
      label: "Username",
      prop: "username",
      span: 12,
      required: true,
      component: {
        name: "el-input",
        props: {
          placeholder: "Enter your name",
        },
      },
    },
    {
      label: "Password",
      prop: "password",
      required: true,
      span: 12,
      component: {
        name: "el-input",
        props: {
          type: "password",
          placeholder: "Enter your password",
        },
      },
    },
  ],
};

const dialogFormProps = {
  form: formProps,
};
</script>

<style scoped></style>
