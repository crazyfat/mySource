Page({
  data: {
    navbar: ['我接的单', '我发的单'],
    currentTab: 0,
    block: '\r\t\r\t\r\t\r\t\r\t\r\t\r\t',
    logo1: '<',
    logo2: '>',
    logo3: '<<',
    logo4: '>>',
    sentorders:[],
    sentnum: [],
    senttotal_page: '',
    sentnext_page_url: '',
    sentprev_page_url: '',
    reorder: [],
    renum:[],
    retotal_page:'',
    renext_page_url:'',
    reprev_page_url:'',
    thisid:'',
    status:[],
    butw:[],
    key:'',
    page:1,
    firstbut:false,
    fontbut:false,
    pagenum:false,
    nextbut:false,
    lastbut:false,
    newdata:[],
    itemDisable:false,
    hide:true,
    hideNull:true,
    myAvatar:''
  },
  onShow: function () {
    this.setData({
      page:1,
      hideNull:true
    })
    this.load()
  },

  //上拉加载
  onReachBottom: function () {
    if (this.data.currentTab == 1 ){
      if ( this.data.page < this.data.senttotal_page){
      var that=this
      wx.showToast({
        title: '努力加载中',
        icon: 'loading',
        duration: 1500
      })
      that.setData({
        page:that.data.page+1
      })
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/order/getSentOrder',
        data: {
          page:that.data.page
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization': wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          that.setData({
            sentorders:that.data.sentorders.concat( res.data.data.data)
          })
          if (that.data.page == that.data.senttotal_page){
            that.setData({
              hide: false
            })
          }
          for (var i = (that.data.page - 1) * 10; i < (that.data.page - 1) * 10+res.data.data.data.length; i++) {
            if (that.data.sentorders[i].status == 2) {
              var status = 'status[' + i + ']';
            
              that.setData({
                [status]: '正在服务',
            
              })

            } else if (that.data.sentorders[i].status == 1) {
              var status = 'status[' + i + ']';
           
              that.setData({
                [status]: '等待接单',
              
              })
           
     
            } else if (that.data.sentorders[i].status == 5) {
              var status = 'status[' + i + ']';
          
              that.setData({
                [status]: '订单取消',
              
              })
      
            } else if (that.data.sentorders[i].status == 3) {
              var status = 'status[' + i + ']';
        
              that.setData({
                [status]: '等待评价',
       
              })
  
            } else if (that.data.sentorders[i].status == 4) {
              var status = 'status[' + i + ']';
         
              that.setData({
                [status]: '服务完成',
            
              })

            }
          }

        }
      })
    }

    } else if (this.data.currentTab == 0){
      if (this.data.page < this.data.retotal_page) {
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
          url: 'https://bang.hzcloudservice.com/api/v1/order/getReceivedOrder',
          data: {
            page: that.data.page
          },
          method: 'GET',
          header: {
            'Accept': 'application/json',
            'Authorization':wx.getStorageSync('jwttoken')
          },
          success: function (res) {
            that.setData({
              reorders: that.data.reorders.concat(res.data.data.data)
            })
            if (that.data.page == that.data.senttotal_page) {
              that.setData({
                hide: false
              })
            }
       
            for (var i = (that.data.page - 1) * 10; i < (that.data.page - 1) * 10 + res.data.data.data.length; i++) {
              if (that.data.reorders[i].status == 2) {
                var status = 'status[' + i + ']';
        
                that.setData({
                  [status]: '正在服务',
                
                })

              } else if (that.data.reorders[i].status == 1) {
                var status = 'status[' + i + ']';
           
                that.setData({
                  [status]: '等待接单',
       
                })

              } else if (that.data.reorders[i].status == 5) {
                var status = 'status[' + i + ']';
            
                that.setData({
                  [status]: '订单取消',
              
                })

              } else if (that.data.reorders[i].status == 3) {
                var status = 'status[' + i + ']';
            
                that.setData({
                  [status]: '等待评价',
                
                })

              } else if (that.data.reorders[i].status == 4) {
                var status = 'status[' + i + ']';
             
                that.setData({
                  [status]: '服务完成',
             
                })

              }
            }

          }
        })
      } else {
        var that = this
        that.setData({
          hide: false
        })
      }



    }

  },

  
  navbarTap: function (e) {
    this.setData({
      page:1,
      itemDisable:true,
      hide:true,
      hideNull:true
    })
    var that=this
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    that.load()
  },
  load:function(){
    var that = this
    if (this.data.currentTab == 1) {
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/order/getSentOrder',
        data: {},
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
              sentnum: res.data.data.data_count,
              senttotal_page: res.data.data.total_page,
              sentorders: res.data.data.data
            })
            for (var i = 0; i < res.data.data.data.length; i++) {

              if (that.data.sentorders[i].status == 2) {
                var status = 'status[' + i + ']';
               
                that.setData({
                  [status]: '正在服务',
                 
                })

              } else if (that.data.sentorders[i].status == 1) {
                var status = 'status[' + i + ']';
               
                that.setData({
                  [status]: '等待接单',
               
                })

              } else if (that.data.sentorders[i].status == 5) {
                var status = 'status[' + i + ']';
               
                that.setData({
                  [status]: '订单取消',
                 
                })

              } else if (that.data.sentorders[i].status == 3) {
                var status = 'status[' + i + ']';
               
                that.setData({
                  [status]: '等待评价',
               
                })

              } else if (that.data.sentorders[i].status == 4) {
                var status = 'status[' + i + ']';
           
                that.setData({
                  [status]: '服务完成',
                 
                })

              }
            }
          }

        },

      })
    } else {
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/order/getReceivedOrder',
        data: {},
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
              reorders: res.data.data.data,
              renum: res.data.data.data_count,
              retotal_page: res.data.data.total_page,
            })

            for (var i = 0; i < res.data.data.data.length; i++) {

              if (that.data.reorders[i].status == 2) {
                var status = 'status[' + i + ']';
              
                that.setData({
                  [status]: '正在服务',
                 
                })
              } else if (that.data.reorders[i].status == 1) {
                var status = 'status[' + i + ']';
          
                that.setData({
                  [status]: '等待接单',
                 
                })

              } else if (that.data.reorders[i].status == 3) {
                var status = 'status[' + i + ']';
              
                that.setData({
                  [status]: '等待评价',
                
                })

              } else if (that.data.reorders[i].status == 4) {
                var status = 'status[' + i + ']';
              
                that.setData({
                  [status]: '服务完成',
                 
                })

              }
            }

          }

        },
      })
    }
    that.setData({
      itemDisable:false
    })
  },
  onLoad: function (options) {

    var that = this
    if (!wx.getStorageSync('avatar')){
      wx.request({
        url: 'https://bang.hzcloudservice.com/api/v1/user/getUserInfo',
        data: {},
        method: 'GET',
        header: {
          'Accept': 'application/json',
          'Authorization': wx.getStorageSync('jwttoken')
        },
        success: function (res) {
          wx.setStorage({
            key: 'avatar',
            data: res.data.data.avatar
          })
        }
      })
    }
    that.setData({
      myAvatar: wx.getStorageSync('avatar')
    })
    wx.request({
      url: 'https://bang.hzcloudservice.com/api/v1/order/getReceivedOrder',
      data: {},
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
          reorders: res.data.data.data,
          renum: res.data.data.data_count,
          retotal_page: res.data.data.total_page,
        })
        

        for (var i = 0; i < res.data.data.data.length; i++) {
   
          if (that.data.reorders[i].status == 2) {
            var status = 'status[' + i + ']';
            
            that.setData({
              [status]: '正在服务',
             
            })

          } else if (that.data.reorders[i].status == 1) {
            var status = 'status[' + i + ']';
          
            that.setData({
              [status]: '等待接单',
            
            })

          } else if (that.data.reorders[i].status == 3) {
            var status = 'status[' + i + ']';
        
            that.setData({
              [status]: '等待评价',
          
            })

          } else if (that.data.reorders[i].status == 4) {
            var status = 'status[' + i + ']';
         
            that.setData({
              [status]: '服务完成',
           
            })

          }
        }
        }

      },
    })
  },
  MoreDetail:function(e){
    getApp().globalData.id = e.currentTarget.id
    wx.navigateTo({
      url: '../mySenOrders/mySenOrders'
    })
  },
  MoreDetailB: function (e) {
    getApp().globalData.id = e.currentTarget.id
    getApp().globalData.hideBut = true
    wx.navigateTo({
      url: '../myReOrders/myReOrders'
    })
  },
  TurnsenderInfo:function(e){
    getApp().globalData.id = e.currentTarget.id
    wx.navigateTo({
      url: '../senderInfo/senderInfo'
    })
  }
 
})  