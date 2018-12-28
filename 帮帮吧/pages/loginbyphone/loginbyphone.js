// pages/login/login.js
Page({
  data: {
    phone: '',
    code: '',
    color: '#DC143C',
    text: '点击获取', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用

  },
  onShow: function () {
    this.onLoad();
  },
  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;

    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {

      wx.request({
        url: "https://bang.hzcloudservice.com/api/v1/common/getCode",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "GET",

        data: {
          phone: this.data.phone

        },
        complete: function (res) {
          if (res.data.status == 200) {

            wx.showToast({
              title: '验证码已发送',
              icon: 'success',
              duration: 1000
            })
          } else if (res.data.status == 402) {
            wx.showToast({
              title: '请稍后重试',
              icon: 'loading',
              duration: 1000
            })
          }
        }

      })

      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          text: currentTime + 's', //按钮文字变成倒计时对应秒数

        })

        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#DC143C'
          })
        }
      }, 1000);

    };

    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })

      that.setData({
        disabled: false,
        color: '#DC143C'
      })
      return;

    };
  },


  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 登录 
  login: function () {
      var that = this;
      var app = getApp();
      getApp().globalData.phone=that.data.phone
      wx.request({
        url: "https://bang.hzcloudservice.com/api/v1/common/verify",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",

        data: {
          phone: this.data.phone,
          code: this.data.code,
        },
        complete: function (res) {
          if (res.data.status == 200) {
            wx.showToast({
              title: '验证成功',
              icon: 'success',
              duration: 800
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../login/login'
              })

            }, 1000) 
          } else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              confirmText: "知道了",
              showCancel: false
            })
          }

        }
      })
    

  },

}) 