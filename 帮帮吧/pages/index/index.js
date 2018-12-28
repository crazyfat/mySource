// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inFo:'',
      Sex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onshow:function(options){
    this.onLoad
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/user/getUserInfo',
      data: {},
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
          if(res.data.status==200){
            that.setData({
              inFo:res.data.data
            })
            if(res.data.data.sex==1){
              that.setData({
                Sex:'男'
              })
            }else{
              that.setData({
                Sex: '女'
              })
            }
          }
        
      },
    })
  },
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开帮帮吧的定位权限，是否去设置打开？',
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
  onShow: function () {
    this.onLoad();
  },
  correctinfo:function(){
    wx.navigateTo({
      url: '../correctinfo/correctinfo'
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
  },


})