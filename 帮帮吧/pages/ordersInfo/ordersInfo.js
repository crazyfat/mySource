Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModal: true,
    orders: [],
    type: '',
    phonecall: '',
    orderstatus:'',
    flag:false,


  },
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (getApp().globalData.hideBut==true){
      that.setData({
        flag:true
      })
    }
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderDetail?',
      data: { id: getApp().globalData.id },
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization':wx.getStorageSync('jwttoken')
      },
      success: function (res) {
        if (res.data.data != []) {
          that.setData({
            orders: res.data.data,
            phonecall: res.data.data.sender.phone,
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
      },
    })
  },

  
})