// pages/senderInfo/senderInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },
  callPhone: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/order/getOrderDetail',
      data: { id: getApp().globalData.id },
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': wx.getStorageSync('jwttoken')
      },
      success: function (res) {
        if (res.data.status == 401) {
          wx.showModal({
            title: '提示',
            content: "请重新登录",
            confirmText: "确定",
            showCancel: false,
            success: function (res) {
              wx.redirectTo({
                url: '../login/login'
              })
            }
          })
        }
        if (res.data.status == 200) {
          that.setData({
            inFo: res.data.data,
            phone: res.data.data.sender.phone
          })
          if (res.data.data.sender.sex == 1) {
            that.setData({
              Sex: '男'
            })
          } else {
            that.setData({
              Sex: '女'
            })
          }
        }

      },
    })
  },
})