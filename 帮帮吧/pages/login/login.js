
Page({
  data: {
    showView: true,
    Phone: '',
    password: '',
    phone:'',
    userInfo:'',
   
  },
  onLoad: function (){
    var that = this
    //判断是否获得了用户授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'])
          that.setData({
            showView:false
          })
      }
    })
  },
  onShow:function(options){
    this.onLoad();
  },
  onGotUserInfo: function (e) {
    var that=this
    //判断是否获得了用户授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']){
          that.openConfirm()
        }else{
          that.setData({
            showView: (!that.data.showView)
          })
          that.setData({
            userInfo: e.detail.userInfo,
          })

        }
      }
    })

  },
  openConfirm: function () {
    wx.showModal({
      title:'提醒',
      content: '检测到您没授予帮帮吧的用户权限，是否重新授予？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => { }
          })
        }
      }
    });
  },
  Taptap:function(){
    var that = this
    if(that.data.userInfo!=''){

    }
  },
  Login:function() {

    var that = this;
    if(that.data.userInfo.avatarUrl==undefined)
    {
      that.setData({
        avatar:''
      })
    }else
    {
      that.setData({
        avatar: that.data.userInfo.avatarUrl

      })
    }
    wx.login({
      success: function (res) {
        var wxCode = res.code;
        if (wxCode) {
          wx.request({
            url: "https://bang.hzcloudservice.com/api/v1/common/casLogin",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",

            data: {
              avatar: that.data.avatar,
              uid: that.data.uid,
              password: that.data.password,
              phone: that.data.Phone,
              code: wxCode,
            },
            complete: function (res) {

              if (res.data.status == 200) {

                wx.setStorage({
                  key: 'jwttoken',
                  data: res.data.data.token,
                })
                wx.showToast({
                  title: '登陆成功',
                  icon: 'success',
                  duration: 800
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../ordercalog/ordercalog',
                  })

                }, 1000)


              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  confirmText: "知道了",
                  showCancel: false
                })
              }

            }
          })
        }
      }
    })

  }, 
  // 获取输入账号 
  uidInput: function (e) {
    this.setData({
      uid: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 获取输入手机号 
  PhoneInput: function (e) {
    this.setData({
      Phone: e.detail.value
    })
  },
 
}) 