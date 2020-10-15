// pages/detail/detail.js
import {Spu} from "../../model/spu";
import {CouponCenterType, ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../model/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cart-Item";
import {Coupon} from "../../model/coupon";

Page({

  /**
   * 页面的初始数据
   */
  data: {
     spu:null,
     showRelam:false,
     cartItemCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getSpuById(pid);
    const explain = await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx();
    console.log(spu)
    const coupons = await Coupon.getTop2CouponsByCategory(spu.category_id)
    const h = windowHeight - 100;
    this.setData({
      spu,
      explain,
      h,
      coupons
    })
    this.updateCartItemCount()
  },
  onGoToCouponCenter(event) {
    const type = CouponCenterType.SPU_CATEGORY
    const cid = this.data.spu.category_id
    wx.navigateTo({
      url: `/pages/coupon/coupon?cid=${cid}&type=${type}`
    })
  },
  onGotoHome(event){
    wx.switchTab({
      url:'/pages/home/home'
    })
  },
  onGotoCart(event){
    wx.switchTab({
      url:'/pages/cart/cart'
    })
  },
  onAddToCart:function(){
    this.setData({
      showRelam:true,
      orderWay:ShoppingWay.CART
    })
  },
  onSpecChange(event){
    this.setData({
      specs:event.detail
    })
  },
  onBuy(event){
    this.setData({
      showRelam:true,
      orderWay:ShoppingWay.BUY
    })
  },
  onShopping(event){
    const chosenSku = event.detail.sku
    const skuCount = event.detail.skuCount

    if(event.detail.orderWay == ShoppingWay.CART){
        const cart = new Cart()
        const cartItem = new CartItem(chosenSku,skuCount)
        cart.addItem(cartItem)
        this.updateCartItemCount()
    }

    if(event.detail.orderWay == ShoppingWay.BUY){
      wx.navigateTo({
        url:`/pages/order/order?sku_id=${chosenSku.id}&count=${skuCount}&way=${ShoppingWay.BUY}`
      })
    }
  },

  updateCartItemCount(){
     const cart = new Cart()
     this.setData({
       cartItemCount:cart.getCartItemCount(),
       showRelam:false
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
