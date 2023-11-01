import { ref, watch } from "vue"

export function useStorage(key: string, newValue: string = '') {
  const value = ref('')
  const storedValue = get()

  if (storedValue) {
    value.value = storedValue
  } else {
    value.value = newValue
    set()
  }

  function get() {
    // const isS
    if (localStorage.getItem(key) !== undefined) {
      const data = localStorage.getItem(key) || ''
      return JSON.parse(data)
    }
    return ''
  }

  function set() {
    if (value.value === null || value.value === '' && value.value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value.value))
    }
  }

  watch(value, set)

  return value
}
