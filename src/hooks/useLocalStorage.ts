export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('[Error] Setting to localStorage ...', error)
        }
    }
    const getItem = () => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error('[Error] Getting from localStorage ...', error)
        }
    }
    const removeItem = () => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error('[Error] Removing from localStorage ...', error)
        }
    }

    return { setItem, getItem, removeItem }
}
