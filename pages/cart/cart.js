// pages/cart/cart.js
import {Cart} from "../../model/cart";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    isEmpty:true
  },
  /**
   * 生命周期函数--监听页面显示
   * 刷新频率高
   */
  onShow: function () {
    console.log("onShow")
    const cart = new Cart()
    const cartItems = cart.getAllCartItemFromLocal().items;
    console.log(cartItems)
    if(cart.isEmpty()){
      this.empty()
    }
    this.setData({
      cartItems
    })
    this.notEmpty()

  },

  empty(){
    console.log("empty");
    this.setData({
      isEmpty:true
    })
    wx.hideTabBarRedDot({
      index:2
    })
  },

  notEmpty(){
    console.log("notEmpty");
    this.setData({
      isEmpty:false
    })
    wx.showTabBarRedDot({
      index:2
    })
  }
})
