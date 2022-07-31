import storage from '@/utils/storage'

const TOKEN = 'token'

export const setToken = (value) => storage.set(TOKEN, value)
export const getToken = () => storage.get(TOKEN)
export const removeToken = () => storage.remove(TOKEN)
