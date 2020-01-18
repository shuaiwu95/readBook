/**
 * 设备定位
 * @class Geolocation
 * @method shuaiwu Li
 * */
export default class Geolocation {
  constructor (setting = {}) {
    const _self = this
    // eslint-disable-next-line no-prototype-builtins
    if (!window.hasOwnProperty('plus')) {
      alert('当前设备不支持定位')
      return
    }
    Object.assign(_self, {
      enableHighAccuracy: false, // 是否高精度获取地理位置
      timeout: 10000, // 获取位置超时时间
      maximumAge: 5000, // 获取位置时间间隔
      provider: 'system', // 优先使用定位模块 system baidu amap
      // coordsType: "gcj02", //获取的定位坐标系 wgs84 gcj02 bd09 bd09ll
      geocode: true // 是否解析地址信息
    }, setting)
    _self.currentPosition = null
    _self.getCurrentPosition()
  }

  // 获取当前设备位置信息
  // 位置信息将通过手机GPS设备或其它信息如IP地址、移动网络信号获取
  getCurrentPosition () {
    const _self = this
    const option = {
      enableHighAccuracy: this.enableHighAccuracy, // 是否高精度获取地理位置
      timeout: this.timeout, // 获取位置超时时间
      maximumAge: this.maximumAge, // 获取位置时间间隔
      provider: this.provider, // 优先使用定位模块 system baidu amap
      coordsType: this.coordsType, // 获取的定位坐标系 wgs84 gcj02 bd09 bd09ll
      geocode: this.geocode // 是否解析地址信息
    }
    // eslint-disable-next-line no-undef
    plus.geolocation.getCurrentPosition((p) => {
      _self.currentPosition = p
    }, (e) => {
      alert('定位出错' + JSON.stringify(e))
    }, option)
  }

  // 监听位置
  watchPosition (callback) {
    const option = {
      enableHighAccuracy: this.enableHighAccuracy, // 是否高精度获取地理位置
      timeout: this.timeout, // 获取位置超时时间
      maximumAge: this.maximumAge, // 获取位置时间间隔
      provider: this.provider, // 优先使用定位模块 system baidu amap
      coordsType: this.coordsType, // 获取的定位坐标系 wgs84 gcj02 bd09 bd09ll
      geocode: this.geocode // 是否解析地址信息
    }
    // eslint-disable-next-line no-undef
    const watchId = plus.geolocation.watchPosition((p) => {
      if (callback !== undefined && typeof callback === 'function') {
        callback(p)
      }
    }, (e) => {
      alert('定位出错' + JSON.stringify(e))
    }, option)
    return watchId
  }

  // 清空监听定位
  clearWatch (watchId) {
    // eslint-disable-next-line no-undef
    plus.geolocation.clearWatch(watchId)
  }

  // 获取当前位置信息
  getPosition () {
    return JSON.stringify(this.currentPosition)
  }
}
