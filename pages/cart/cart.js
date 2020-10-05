// pages/cart/cart.js
import {Cart} from "../../model/cart";
import {Calculator} from "../../model/calculator";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    isEmpty:true,
    allChecked:false,
    totalPrice:0,
    totalSkuCount:0
  },
  async onLoad(){
    const cart = new Cart()
    await cart.getAllSkuFromServer();
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
    this.notEmpty()
    this.isAllChecked()
    this.refreshCartData()

  },
  refreshCartData(){
    const cart = new Cart()
    const checkItems = cart.getCheckedItems()
    const calculator = new Calculator(checkItems)
    calculator.calc()
    this.setCalcData(calculator)
  },
  setCalcData(calculator){
    const totalPrice = calculator.getTotalPrice()
    const totalSkuCount = calculator.getTotalSkuCount()
    this.setData({
      totalPrice,
      totalSkuCount
    })
  },
  isAllChecked(){
    const cart = new Cart()
    let allChecked = cart.isAllChecked()
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
    this.refreshCartData()
  },

  onDeleteItem(event){
    this.isAllChecked()
    this.refreshCartData()
  },

  onSelCount(event){
    this.refreshCartData()
  },

  empty(){
    this.setData({
      isEmpty:true
    })
    wx.hideTabBarRedDot({
      index:2
    })
  },

  notEmpty(){
    this.setData({
      isEmpty:false
    })
    wx.showTabBarRedDot({
      index:2
    })
  }
})
