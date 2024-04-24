import { ref } from "vue";
import {
  set as lodashSet,
  get as lodashGet,
  cloneDeep,
  isString,
  isObject,
  merge,
} from "lodash-es";
import { FormProps } from "../props";

export function useValue(props: FormProps) {
  const { formItems } = props;

  const initModelValue: Record<string, any> = {};

  // init model value
  formItems!.forEach((item) => {
    if (!item.prop) return;
    lodashSet(initModelValue, item.prop, item.initValue);
  });

  const modelValue = ref(cloneDeep(initModelValue));

  // set
  const set = (key: any, value?: any) => {
    if (isString(key)) {
      lodashSet(modelValue.value, key, value);
      return;
    } else if (isObject(key)) {
      modelValue.value = merge(modelValue.value, key);
    }
  };

  // get
  const get = (key?: string) => {
    if (key) {
      return lodashGet(modelValue.value, key);
    }

    return modelValue.value;
  };

  // reset
  const reset = () => {
    modelValue.value = cloneDeep(initModelValue);
  };

  return {
    modelValue,
    initModelValue,
    set,
    get,
    reset,
  };
}
