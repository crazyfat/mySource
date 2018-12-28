// pages/reorder/reorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModal:true,
    orders:[],
    type:'',
    hiddenModal: true,
    phonecall:'',
    
    
  },
  onShow: function () {
    this.onLoad();
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
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderDetail?',
      data: { id: getApp().globalData.id},
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization':wx.getStorageSync('jwttoken')
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
        if(res.data.data!=[]){
        that.setData({
          orders: res.data.data,
          phonecall: res.data.data.sender.phone,
        })
        }
        if (that.data.orders.type==0){
          that.setData({
            type: '跑腿'
          })
        } else if (that.data.orders.type == 1){
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
  showModal: function () {
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
  },
  listenerCancel: function () {
    this.setData({
      hiddenModal: true
    })
  },
  TurnsenderInfo: function () {
    
    wx.navigateTo({
      url: '../ContactSender/ContactSender'
    })
  },
  Release:function(){
    var that=this
    wx.request({
      url:'https://bang.hzcloudservice.com/api/v1/helpOthers/receiveOrder',
      data:{
        id: getApp().globalData.id
      },
      header:{
        'Accept':'application/json',
        'Authorization': wx.getStorageSync('jwttoken')
      },
      method:'POST',
      success:function(res){
        if(res.data.status==402){
          wx.showToast({
            title: '不能接自己的单',
            icon: 'loading',
            image: '',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            hiddenModal: true
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../ordercalog/ordercalog'
            })
          }, 1000)
         
        } else if (res.data.status == 200) {
          wx.showToast({
            title: '已接单',
            icon: 'success',
            image: '',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            hiddenModal: true
          })

          setTimeout(function () {
            wx.switchTab({
              url: '../myorder/myorder'
            })
          }, 1000) 
        }
      }
   })
  },
})