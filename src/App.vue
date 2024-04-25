<template>
  <div class="h-[100vh] w-[100vw] bg-[#f2f2f3]">
    <div class="container h-full mx-auto bg-white shadow-sm p-10">
      <el-button @click="onClick">Open Dialog Form</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DialogFormProps } from "./components/dialog";
import { mlDialogForm } from "./components/dialog";

const dialogFormProps: DialogFormProps = {
  form: {
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
  },
  on: {
    submit: async ({ data }) => {
      return new Promise((resolve) => {
        console.log(data);
        setTimeout(() => {
          resolve(false);
        }, 1000);
      });
    },
  },
};

const onClick = () => {
  mlDialogForm(dialogFormProps, async ({ data }) => {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  });
};
</script>

<style scoped></style>
