
/**
  * API接口默认参数配置
  */
export const API_DEFAULT_CONFIG = {
  mockBaseUrl: 'http://192.168.2.170:3000',
  prodBaseUrl: 'http://192.168.2.170:3000',
  isMocked: process.env.NODE_ENV !== 'production',
  isDebug: true,
  sep: '.'
}
/**
 * AXIOS默认参数配置
 */
export const AXIOS_DEFAULT_CONFIG = '10000'
