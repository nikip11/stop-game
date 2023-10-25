import { ref, watch } from "vue"

type Props = {
  key: string
  newValue?: unknown
}
export function useStorage(key: string, newValue: unknown = null) {
  const value = ref('')
  const storedValue = get()

  if (storedValue) {
    value.value = storedValue
  } else {
    value.value = newValue
    set()
  }

  function get() {
    if (localStorage.getItem(key) !== undefined) {
      return JSON.parse(localStorage.getItem(key))
    }
    return ''
  }

  function set() {
    console.log({value: value.value, key})
    if (value.value === null || value.value === '' && value.value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value.value))
    }
  }

  watch(value, set)

  return value
}
