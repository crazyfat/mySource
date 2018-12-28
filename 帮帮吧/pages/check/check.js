// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad:function(){
    var that=this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        getApp().globalData.latitude = res.latitude,
          getApp().globalData.longitude = res.longitude
      }
    })
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation'])
          that.openConfirm()
      }
    })
    if (wx.getStorageSync('jwttoken')==''){
      wx.reLaunch({
        url: '../loginbyphone/loginbyphone',
      })
    }else{
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/order/getReceivedOrder',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': wx.getStorageSync('jwttoken')
      },
      success: function (res) {
        if(res.data.status==401){
          wx.reLaunch({
            url: '../login/login',
          })
        }else if(res.data.status==200){
          wx.switchTab({
            url: '../ordercalog/ordercalog',
          })
        }
      }
    })
    }
  },
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开帮帮吧的定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => { }
          })
        }
      }
    });
  },

})