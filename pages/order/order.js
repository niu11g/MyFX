// pages/order/order.js

import {Cart} from "../../model/cart";
import {Sku} from "../../model/sku";
import {OrderItem} from "../../model/order-item";
import {Order} from "../../model/order";
import {Coupon} from "../../model/coupon";

const cart = new Cart()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let orderItems;
    let localItemCount
    const skuIds = cart.getCheckedSkuIds()
    console.log(skuIds)
    orderItems = await this.getCartOrderItems(skuIds)
    localItemCount = skuIds.length
    const order = new Order(orderItems,localItemCount)
    order.checkOrderIsOk()

    const mycoupons = await Coupon.getMySelfWithCategory()
    console.log(mycoupons)
    // this.setData({
    //   coupons:mycoupons
    // })
  },

  async getCartOrderItems(skuIds){
    const skus = await Sku.getSkusByIds(skuIds)
    const orderItems = this.packageOrderItems(skus)
    return orderItems
  },

  packageOrderItems(skus){
    return skus.map(sku=>{
      const count = cart.getSkuCountBySkuId(sku.id)
      return new OrderItem(sku,count)
    })
  },

  onChooseAddress(event){
    const address = event.detail.address
    this.setData({
      address
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
