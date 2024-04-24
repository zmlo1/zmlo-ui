<template>
  <el-form ref="elFormRef" v-bind="$props" :model="modelValue">
    <el-row :gutter="gutter">
      <template v-for="item in formItems" :key="item.prop">
        <el-col v-if="item.hidden !== true" :span="item.span">
          <ml-form-item
            v-bind="item"
            :model-value="get(item.prop)"
            @update:model-value="set(item.prop, $event)"
          />
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import type { FormInstance as ElFormInstance } from "element-plus";
import { defineComponent, getCurrentInstance, provide, ref } from "vue";
import { ElForm, ElRow, ElCol } from "element-plus";
import { useForm } from "./use-form";
import { formProps } from "./props";

import MlFormItem from "./form-item";

import { FORM_INJECTION_KEY } from "./defaults";

export default defineComponent({
  name: "ml-form",
  components: {
    ElForm,
    ElRow,
    ElCol,
    MlFormItem,
  },
  inheritAttrs: false,
  props: formProps,
  setup(props, { expose }) {
    const form: any = getCurrentInstance();
    const { modelValue, get, set, reset } = useForm(props);
    const elFormRef = ref<ElFormInstance>();

    const validate = async () => {
      return new Promise((resolve) => {
        elFormRef.value?.validate((valid) => {
          resolve(valid);
        });
      });
    };

    provide(FORM_INJECTION_KEY, form);

    expose({
      data: modelValue,
      get,
      set,
      reset,
      validate,
    });

    return { elFormRef, modelValue, get, set, validate };
  },
});
</script>
