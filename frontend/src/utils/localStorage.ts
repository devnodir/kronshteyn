// get value from localStorage
export const getLocalStorage = (key: string) => {
	return localStorage.getItem(key)
}

// set value to localStorage
export const setLocalStorage = (key: string, value: any) => {
	return localStorage.setItem(key, value)
}

// remove item from localStorage
export const removeLocalStorage = (key: string) => {
	return localStorage.removeItem(key)
}

