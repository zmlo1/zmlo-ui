<template>
  <div class="h-[100vh] w-[100vw] bg-[#f2f2f3]">
    <div class="container h-full mx-auto bg-white shadow-sm p-10">
      <ml-form v-bind="formProps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormProps } from "./components/form";
import { MlForm } from "./components/form";

function useFormProps(): FormProps {
  return {
    labelPosition: "top",
    // labelPosition: "right",
    // labelWidth: 120,
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
      {
        label: "abc",
        prop: "abc",
        span: 24,
        component: {
          name: "ml-table",
          props: {
            placeholder: "Enter abc",
            columns: [
              {
                prop: "date",
                label: "Date",
                width: "180",
              },
              {
                prop: "name",
                label: "Name",
                width: "180",
              },
              {
                prop: "address",
                label: "Address",
              },
            ],
          },
        },
      },
    ],
  };
}

const formProps = useFormProps();
</script>

<style scoped></style>
