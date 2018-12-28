// pages/order/order.js
Page({

 
  data: {
    style:[ '跑腿','悬赏提问','学习服务','技术服务','生活服务','其他',''],
    type:6,
    begindata:'请选择日期 >',
    enddata:'请选择日期 >',
    begintime: '请选择时间 >',
    endtime: '请选择时间 >',
    tip:'请选择类型 >',
    beginTime: '',
    endTime: '',
    title:'',
    content:'',
    price:'',
    hiddenModal:true,
    id:'',
    longitude:'',
    latitude: '',
    disableText:false,
    

  
  },

  onLoad:function(){
this.setData({
  style: ['跑腿', '悬赏提问', '学习服务', '技术服务', '生活服务', '其他', ''],
  type: 6,
  begindata: '请选择日期 >',
  enddata: '请选择日期 >',
  begintime: '请选择时间 >',
  endtime: '请选择时间 >',
  tip: '请选择类型 >',
  beginTime: '',
  endTime: '',
  title: '',
  content: '',
  price: '',
  hiddenModal: true,
  id: '',
  longitude: '',
  latitude: '',
  disableText: false,
})
  },
  //获取title
  gettitle: function (e) {
    
    this.setData({
      title: e.detail.value
    })
  },
  //获取content
  getcontent: function (e) {
    
    this.setData({
      content: e.detail.value
    })
  },  //获取price
  getprice: function (e) {
    
    this.setData({
      price: e.detail.value
    })
  },
  //发布订单
  Release: function () {

    var that = this;

    that.setData({
      hiddenModal: true,
      
    })
    
    if (that.data.title == '' || that.data.content == '' || that.data.begindata == '' || that.data.begintime == '' || that.data.enddata == '' || that.data.endtime == '' || that.data.type == '' || that.data.price==''){
      wx.showModal({
        title: '提示',
        content:'信息请填写完整',
        confirmText: "知道了",
        showCancel: false
      })
    } else if (that.data.price<=0){
      wx.showModal({
        title: '提示',
        content: '价格填写有误',
        confirmText: "知道了",
        showCancel: false
      })
    }
      else{
    wx.request({
      url: "https://bang.hzcloudservice.com/api/v1/askForHelp/releaseOrder",
      header: {             
        "content-type": "application/x-www-form-urlencoded",
        'Authorization':wx.getStorageSync('jwttoken')
      },
      method: "POST",

      data: {
        
        title: this.data.title,
        content: this.data.content,
        beginTime: this.data.begindata +' '+ this.data.begintime,
        endTime: this.data.enddata + ' ' + this.data.endtime,
        type:this.data.type,
        price: this.data.price,
        longitude: getApp().globalData.longitude,
        latitude: getApp().globalData.latitude
      },
      complete: function (res) {
        that.data.id=res.data.data.id
      if (res.data.status == 200) {
          wx.request({
            url: 'https://bang.hzcloudservice.com/api/v1/pay/unifyPay',
            header: {
              'Accept': 'application/json',
              'Authorization':wx.getStorageSync('jwttoken')
            },
            data: {
              id: that.data.id
            },
            method: 'GET',
            complete: function (res) {
              if (res.data) {
                wx.requestPayment({
                  'appId': res.data.data['appId'],
                  'timeStamp': res.data.data['timeStamp'],
                  'nonceStr': res.data.data['nonceStr'],
                  'package': res.data.data['package'],
                  'signType': 'MD5',
                  'paySign': res.data.data['paySign'],
                  'success': function (res) {
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.onLoad()

                    setTimeout(function () {
                      wx.switchTab({
                        url: '../ordercalog/ordercalog',
                      })
                    }, 1000) 
                  },
                  'fail': function (res) {
                    wx.request({
                      url: 'https://bang.hzcloudservice.com/api/v1/askForHelp/cancelOrder',
                      data: { id: that.data.id },
                      method: 'POST',
                      header: {
                        "content-type": "application/x-www-form-urlencoded",
                        'Authorization':wx.getStorageSync('jwttoken')
                      },
                      success: function (res) {
                        if (res.data.status == 200) {
                          wx.showToast({
                            title: '订单已取消',
                            icon: 'none',
                            duration: 1000
                          })
                        }
                      },
                    })
                  },

                });
              }
            }
          })
         
          
    

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
    }
  that.setData({
    disableText:false
  })

  }, 
  //选择类型
  changestyle:function(e){
    this.setData({
      type:e.detail.value,
      tip: '',
    })
    
    
  },
  choosestarttime: function (e) {
    this.setData({
      
      begintime: e.detail.value,

    })
    
    
  },
  choosestartdata: function (e) {
    this.setData({
      begindata: e.detail.value
    })
  },
  chooseendtime: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  chooseenddata: function (e) {
    this.setData({
      enddata: e.detail.value
    })
  },
  //确认订单提示
  showModal:function(){
    this.setData({
      hiddenModal: !this.data.hiddenModal,
      disableText:true
    })
  },
  //取消
  listenerCancel:function(){
    this.setData({
      hiddenModal:true,
      disableText: false
    })
  },
})