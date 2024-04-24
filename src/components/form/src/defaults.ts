import type { ComponentInternalInstance, InjectionKey } from 'vue'

interface Form extends ComponentInternalInstance {
  get: (key?: any) => any
  set: (key: any, value?: any) => void
  reset: () => void
}

export const FORM_INJECTION_KEY: InjectionKey<Form> = Symbol('MlForm')
