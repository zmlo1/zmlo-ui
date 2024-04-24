import { useValue } from './composables'
import { FormProps } from './props'

export function useForm(props: FormProps) {
  const { modelValue, initModelValue, set, get, reset } = useValue(props)

  return {
    modelValue,
    initModelValue,
    set,
    get,
    reset,
  }
}
