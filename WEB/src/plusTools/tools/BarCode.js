/*  调用设备扫描摄像头
    @class BarCode
    @constructor
    @param
    id:String 扫码工具id
    barCodeType:String 扫码类型 QR EAN13 EAN8
    style:Object 扫码识别控件样式
                attribute String background;
                attribute String frameColor;
                attribute String scanbarColor;
                attribute String top;
                attribute String left;
                attribute String width;
                attribute String height;
                attribute String position;
    @method shauiwu Li
*/
export default class BarCoode {
  constructor (setting = {}) {
    const _self = this
    // eslint-disable-next-line no-prototype-builtins
    if (!window.hasOwnProperty('plus')) {
      alert('您当前环境不支持扫码')
      return
    }
    Object.assign(_self, {
      id: 'barcode',
      barCodeType: 'QR',
      style: {
        left: '0px',
        width: '100%',
        position: 'static'
      }
    }, setting)
    // eslint-disable-next-line no-undef
    _self.barcode = plus.barcode.create(_self.id, [plus.barcode.QR], _self.style)
    // eslint-disable-next-line no-undef
    const w = plus.webview.create()
    _self.w = w
    _self.barcode.onmarked = (type, result) => {
      _self.onSuccess(type, result)
    }
    // plus.webview.currentWebview().append(_self.barcode);
    w.append(_self.barcode)
    _self.createView(w)
    _self.barcode.start()
  }

  setStyle (styles) { // 设置扫码识别框样式
    this.barcode.setStyle(styles)
  }

  onSuccess (type, result) { // 扫码成功

  }

  onError () {}
  start () { // 开始扫码
    this.barcode.start()
  }

  close () { // 关闭扫码框
    this.barcode.close()
  }

  cancel () { // 取消扫码识别
    this.barcode.cancel()
  }

  createView (w) {
    const _self = this
    // 创建返回原生按钮
    // eslint-disable-next-line no-undef
    const backVew = new plus.nativeObj.View('backVew', {
      top: '0px',
      left: '0px',
      height: '40px',
      width: '10%'
    },
    [{
      tag: 'img',
      id: 'backBar',
      src: './static/androidIcon/back.png',
      position: {
        top: '10px',
        left: '10px',
        width: '16px',
        height: '16px'
      }
    }])
    // 创建展示类内容组件
    // eslint-disable-next-line no-undef
    const content = new plus.nativeObj.View('content', {
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%'
    },
    [{
      tag: 'font',
      id: 'scanTitle',
      text: '扫描二维码',
      textStyles: {
        size: '18px',
        color: '#ffffff'
      },
      position: {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '40px'
      }
    },
    {
      tag: 'font',
      id: 'scanTips',
      text: this.name,
      textStyles: {
        size: '14px',
        color: '#ffffff',
        whiteSpace: 'normal'
      },
      position: {
        top: '90px',
        left: '10%',
        width: '80%',
        height: 'wrap_content'

      }
    }
    ])
    // 相册
    // eslint-disable-next-line no-undef
    const xc = new plus.nativeObj.View('xc', {
      top: '0px',
      right: '0px',
      height: '10%',
      width: '100%'
    },
    [{
      tag: 'font',
      id: 'scanXc',
      text: '相册',
      textStyles: {
        size: '18px',
        color: '#ffffff'
      },
      position: {
        top: '0px',
        right: '10px',
        width: '10%',
        height: '40px'
      }
    }])

    // 创建打开手电筒的按钮
    // eslint-disable-next-line no-undef
    var scanBarVew = new plus.nativeObj.View('scanBarVew', {
      top: '80%',
      left: '54%',
      height: '10%',
      width: '30%'

    },
    [{
      tag: 'img',
      id: 'scanBar',
      src: './static/androidIcon/sdt.png',
      position: {
        width: '40px',
        left: '36%',
        height: '40px'
      }
    },
    {
      tag: 'font',
      id: 'font',
      text: '打开手电筒',
      textStyles: {
        size: '14px',
        color: '#ffffff'
      },
      position: {
        width: '100%',
        top: '20%',
        left: '6%'
      }
    }
    ])
    // 创建打输入编号按钮
    // eslint-disable-next-line no-undef
    var srbh = new plus.nativeObj.View('srbh', {
      top: '80%',
      left: '18%',
      height: '10%',
      width: '30%'

    },
    [{
      tag: 'img',
      id: 'srbh',
      src: './static/androidIcon/sr.png',
      position: {
        width: '40px',
        left: '36%',
        height: '40px'
      }
    },
    {
      tag: 'font',
      id: 'font',
      text: '输入编号入库',
      textStyles: {
        size: '14px',
        color: '#ffffff'
      },
      position: {
        width: '100%',
        top: '20%',
        left: '4%'
      }
    }
    ])
    _self.insertMenu()
    // backVew.interceptTouchEvent(true);
    w.append(content)
    w.append(xc)
    w.append(backVew)
    w.append(srbh)
    w.append(scanBarVew)
    w.show() // 显示窗口
    let flashFlag = true
    backVew.addEventListener('click', function (e) { // 返回按钮
      _self.cancel()
      _self.close()
      w.close()
    }, false)
    scanBarVew.addEventListener('click', function (e) { // 打开手电筒
      if (!flashFlag) {
        _self.barcode.setFlash(flashFlag)
        flashFlag = true
      } else {
        _self.barcode.setFlash(flashFlag)
        flashFlag = false
      }
    }, false)

    xc.addEventListener('click', function () { // 打开相册
      // eslint-disable-next-line no-undef
      plus.gallery.pick((data) => {
        // eslint-disable-next-line no-undef
        plus.barcode.scan(data, _self.onSuccess, function () {
          _self.onError()
        })
      }, (error) => {
        console.error(error)
      }, {
        animation: true,
        filter: 'image',
        multiple: false
      })
    })

    srbh.addEventListener('click', function (e) { // 手动输入入库
      _self.manualInput()
    }, false)
  }

  // 插入原生底部按钮
  insertMenu () {

  }

  // 点击手动输入编号按钮回调函数
  manualInput () {

  }
}
