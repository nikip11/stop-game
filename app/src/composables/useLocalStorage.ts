
type LocalStorage = {
  getter: (key: string) => unknown
  setter: (key: string, value: unknown) => void
  clear: () => void
}

export function useLocalStorage(): LocalStorage {

  const getter = (key: string) => {
    const value = localStorage.getItem(key)
    return value !== null ? JSON.parse(value) : value
  }

  const setter = (key: string, value: unknown) => {
    const check = getter(key)
    if (!check) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const clear = () => {
    localStorage.clear()
  }

  return {
    getter,
    setter,
    clear
  }
}
