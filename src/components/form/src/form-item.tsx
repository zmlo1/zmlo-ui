import { defineComponent, resolveComponent, h, computed, inject } from "vue";
import { ElFormItem } from "element-plus";
import { formItemProps } from "./props";
import { FORM_INJECTION_KEY } from "./defaults";

export default defineComponent({
  name: "ml-form-item",
  inheritAttrs: false,
  props: formItemProps,
  emits: ["update:model-value"],
  setup(props, { emit }) {
    const form = inject(FORM_INJECTION_KEY);

    const value = computed({
      get: () => props.modelValue,
      set: (val: any) => emit("update:model-value", val),
    });

    const getSlots = (prop: string, name = "default") => {
      return form!.slots[`form-item.${prop}.${name}`];
    };

    return () => {
      const { name } = props.component || {};

      return (
        <ElFormItem {...props}>
          {{
            default: () => {
              return getSlots(props.prop, "default")
                ? getSlots(props.prop, "default")!({
                    value: value.value,
                    set: form.proxy.set,
                    ...props,
                  })
                : h(resolveComponent(name), {
                    ...props.component.props,
                    modelValue: value.value,
                    "onUpdate:modelValue": (val: any) =>
                      form.proxy.set(props.prop, val),
                  });
            },
          }}
        </ElFormItem>
      );
    };
  },
});
