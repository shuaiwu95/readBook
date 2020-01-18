/**
 * plus.storage or localStorage
 * @method shuaiwuLi
 */
export const LocaStorage = window.plus ? window.plus.storage : localStorage
export const setToken = (tokenStr) => {
  window.LocaStorage.setItem('TOKEN_STR', tokenStr)
}
export const clearStorage = () => {
  window.LocaStorage.clear()
}
export const clearToken = () => {
  window.LocaStorage.clear('TOKEN_STR')
}
export const setStorage = (key, val) => {
  window.LocaStorage.setItem(key, val)
}
