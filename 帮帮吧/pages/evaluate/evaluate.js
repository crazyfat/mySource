// pages/evaluate/evaluate.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    userStars: [
      '../images/icon-start-emty.png',
      '../images/icon-start-emty.png',
      '../images/icon-start-emty.png',
      '../images/icon-start-emty.png',
      '../images/icon-start-emty.png'
    ],
    Score:0,
    block:'\r\t\r\t\r\t\r\t\r\t\r\t\r\t',
    orders:[],
  },
  onShow: function () {
    this.onLoad();
  },
  // 星星点击事件
  starTap: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = '../images/icon-start-full.png'
      } else { // 其他是空心
        tempUserStars[i] = '../images/icon-start-emty.png'
      }
      
    }
    this.data.Score=index+1
    // 重新赋值就可以显示了
    this.setData({
      userStars: tempUserStars
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderDetail?',
      data: { id: getApp().globalData.id },
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization':wx.getStorageSync('jwttoken')
      },
      success: function (res) {
        that.setData({
          orders: res.data.data
        })
      },
    })
  },
  putevalu:function(){
    var that = this;
    wx.request({
      url: "https://bang.hzcloudservice.com/api/v1/order/commentOrder",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'Authorization':wx.getStorageSync('jwttoken')
      },
      method: "POST",

      data: {
        star:that.data.Score,
        id: getApp().globalData.id,
      },
      complete: function (res) {
        if (res.data.status == 200) {    
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../myorder/myorder'
            })
          }, 1000) 

        } else if (res.data.status == 401) {
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
        }else{
          wx.showModal({
            title:'提示',
            content: res.data.msg,
            confirmText: "知道了",
            showCancel: false
          })
        }

      }
    })
  },

})