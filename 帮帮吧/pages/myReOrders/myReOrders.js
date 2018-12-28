// pages/myReOrders/myReOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:''
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
        if (res.data.data != []) {
          that.setData({
            orders: res.data.data,
          })
        }
        if (res.data.data.receiver != '') {
          that.setData({
            hideTip: false,
            Or: true,
            And: false
          })
        }
        if (that.data.orders.type == 0) {
          that.setData({
            type: '跑腿'
          })
        } else if (that.data.orders.type == 1) {
          that.setData({
            type: '悬赏提问'
          })
        } else if (that.data.orders.type == 2) {
          that.setData({
            type: '学习服务'
          })
        } else if (that.data.orders.type == 3) {
          that.setData({
            type: '技术服务'
          })
        } else if (that.data.orders.type == 4) {
          that.setData({
            type: '生活服务'
          })
        } else if (that.data.orders.type == 5) {
          that.setData({
            type: '其他'
          })
        }
        if (that.data.orders.status == 1) {
          that.setData({
            tip: '暂无接单哦'
          })
        } else if (that.data.orders.status == 2) {
          that.setData({
            tip: '服务进行中'
          })
        } else if (that.data.orders.status == 3) {
          that.setData({
            tip: '等待评价'
          })
        } else if (that.data.orders.status == 4) {
          that.setData({
            tip: '服务完成'

          })
        } else if (that.data.orders.status == 5) {
          that.setData({
            flag: true
          })
        }
      },
    })
  },
  TurnsenderInfo:function(){
    wx.navigateTo({
      url: '../ContactSender/ContactSender'
    })
  }

})