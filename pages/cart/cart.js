// pages/cart/cart.js
import {Cart} from "../../model/cart";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 刷新频率高
   */
  onShow: function () {
    const cart = new Cart()
    const cartItems = cart.getAllCartItemFromLocal().items;
    if(cart.isEmpty()){
      this.empty()
    }
    this.setData({
      cartItems
    })

  },

  empty(){
    this.setData({
      isEmpty:true
    })
    wx.hideTabBarRedDot({
      index:2
    })
  }
})
