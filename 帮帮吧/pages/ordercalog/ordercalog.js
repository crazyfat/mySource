var app = getApp()
Page({
  
  data: {
    navbar: ['全部', '跑腿','悬赏提问', '学习服务','技术服务','生活服务','其他'],
    currentTab: 0,
    logo1:'<',
    logo2: '>',
    orders:[], 
    orders1:[],
    orders2:[],
    orders3:[],
    orders4:[],
    orders5:[],
    orders6:[],
    num: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: '',
    block: '\r\t\r\t\r\t\r\t\r\t\r\t\r\t',
    total_page:'',
    total_page1: '',
    total_page2: '',
    total_page3: '',
    total_page4: '',
    total_page5: '',
    total_page6: '',
    page:1,
    page1:1,
    page2:1,
    page3:1,
    page4:1,
    page5:1,
    page6:1,
    longitude: '',
    latitude: '',
    itemDisable:false,
    hide:true,
    hideNull:true

    
    
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading()
    this.onShow()
    setTimeout(function () {
      wx.hideNavigationBarLoading() 
      wx.stopPullDownRefresh()
    }, 1500) 
  },
  onReachBottom: function () {
    if (this.data.currentTab == 1) {
      if (this.data.page1 < this.data.total_page1) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page1: that.data.page1 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type:0,
            page: that.data.page1,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization':wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders1: that.data.orders1.concat(res.data.data.data)
            })
            if (that.data.page1 == that.data.total_page1) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    } else if (this.data.currentTab == 2) {
      if (this.data.page2 < this.data.total_page2) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page2: that.data.page2 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type: 1,
            page: that.data.page2,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization': wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders2: that.data.orders2.concat(res.data.data.data)
            })
            if (that.data.page2 == that.data.total_page2) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    } else if (this.data.currentTab == 3) {
      if (this.data.page3 < this.data.total_page3) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page3: that.data.page3 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type: 2,
            page: that.data.page3,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization': wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders3: that.data.orders3.concat(res.data.data.data)
            })
          }
        })
      }
    } else if (this.data.currentTab == 4) {
      if (this.data.page4 < this.data.total_page4) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page4: that.data.page4 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type: 3,
            page: that.data.page4,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization':wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders4: that.data.orders4.concat(res.data.data.data)
            })
            if (that.data.page4 == that.data.senttotal_page4) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    } else if (this.data.currentTab == 5) {
      if (this.data.page5 < this.data.total_page5) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page5: that.data.page5 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type: 4,
            page: that.data.page5,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization':wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders5: that.data.orders5.concat(res.data.data.data)
            })
            if (that.data.page5 == that.data.senttotal_page5) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    } else if (this.data.currentTab == 6) {
      if (this.data.page6 < this.data.total_page6) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page6: that.data.page6 + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            type: 5,
            page: that.data.page6,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization':wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders6: that.data.orders6.concat(res.data.data.data)
            })
            if (that.data.page6 == that.data.total_page6) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    } else if (this.data.currentTab == 0) {
      if (this.data.page < this.data.total_page) {
        var that = this
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 1500
        })
        that.setData({
          page: that.data.page + 1
        })
        wx.request({
          url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
          data: {
            page: that.data.page,
            longitude: getApp().globalData.longitude,
            latitude: getApp().globalData.latitude,
          },
          method: 'GET',
          header: {
            'Accept': 'application/jsosn',
            'Authorization': wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              orders: that.data.orders.concat(res.data.data.data)
            })
            if (that.data.page == that.data.total_page) {
              that.setData({
                hide: false
              })
            }
          }
        })
      }
    }
  },
      
  
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      itemDisable:true,
      hide:true,
      page: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      hideNull:true
    })
    this.load()
  },
  onShow:function(){
    this.setData({
      page:1,
      page1:1,
      page2:1,
      page3:1,
      page4:1,
      page5:1,
      page6:1,
      hide:true,
      hideNull: true
    })
    this.load()
  },
  load:function(){
    var that = this
    if (this.data.currentTab == 1) {
     
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=0',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization':wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders1: res.data.data.data,
              num1: res.data.data.data_count,
              total_page1: res.data.data.total_page

            })
          }else{
            that.setData({
              orders1: ''
            })
          }


        },
      })
    } else if (this.data.currentTab == 2) {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=1',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization': wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders2: res.data.data.data,
              num2: res.data.data.data_count,
              total_page2: res.data.data.total_page
            })
          }



        },
      })
    } else if (this.data.currentTab == 3) {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=2',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization': wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders3: res.data.data.data,
              num3: res.data.data.data_count,
              total_page3: res.data.data.total_page
            })
          }




        },
      })
    } else if (this.data.currentTab == 4) {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=3',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization': wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders4: res.data.data.data,
              num4: res.data.data.data_count,
              total_page4: res.data.data.total_page
            })
          }


        },
      })
    } else if (this.data.currentTab == 5) {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=4',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization':wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders5: res.data.data.data,
              num5: res.data.data.data_count,
              total_page5: res.data.data.total_page
            })
          }


        },
      })
    } else if (this.data.currentTab == 6) {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList?type=5',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization':wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data == '') {
            that.setData({
              hideNull: false
            })
          }
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders6: res.data.data.data,
              num6: res.data.data.data_count,
              total_page6: res.data.data.total_page
            })
          }


        },
      })
    } else {
      var that = this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
        data: {
          longitude: getApp().globalData.longitude,
          latitude: getApp().globalData.latitude,
        },
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
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders: res.data.data.data,
              num: res.data.data.data_count,
              total_page: res.data.data.total_page
            })
          }
          else {
            that.setData({
              orders: ''
            })
          }



        },
      })
    }
    that.setData({
      itemDisable:false
    })
  },

  onLoad:function(){
    var that = this
   
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
      data: {
      
        longitude: getApp().globalData.longitude,
        latitude: getApp().globalData.latitude,
      },
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': wx.getStorageSync('jwttoken')
      },
      success: function (res) {
      if(res.data.status==401){
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
        if (res.data.data.data_count > 0) {
          that.setData({
            orders: res.data.data.data,
            num: res.data.data.data_count,
            total_page: res.data.data.total_page
          })
        } else {
          that.setData({
            orders: ''
          })
        }



      },
    })

  },

  Loadpage:function(){
      var that=this
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/helpOthers/getReleasedOrderList',
        data: {
          longitude: that.data.longitude,
          latitude: that.data.latitude,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization':wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          if (res.data.data.data_count >= 0) {
            that.setData({
              orders: res.data.data.data,
              num: res.data.data.data_count,
              total_page: res.data.data.total_page
            })
          }



        },
      })
  },

  
  reorder:function(e){

    getApp().globalData.id = e.target.id
    wx.navigateTo({
      url: '../reorder/reorder'
    })
  },
  TurnsenderInfo: function (e) {
    getApp().globalData.id = e.currentTarget.id
    wx.navigateTo({
      url: '../senderInfo/senderInfo'
    })
  }
})  