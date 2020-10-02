// pages/cart/cart.js
import {Cart} from "../../model/cart";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    isEmpty:true,
    allChecked:false
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
    this.isAllChecked()

  },
  isAllChecked(){
    const cart = new Cart()
    let allChecked = cart.isAllChecked()
    console.log(allChecked)
    this.setData({
        allChecked
    })
  },
  onCheckAll(event){
    const checked = event.detail.checked
    const cart = new Cart()
    cart.allCheck(checked)
    this.setData({
      cartItems:cart.getAllCartItemFromLocal().items
    })

  },
  onSingleCheck(event){
    this.isAllChecked()
  },
  onDeleteItem(event){
    this.isAllChecked()
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
