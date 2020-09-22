// pages/detail/detail.js
import {Spu} from "../../model/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../model/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";

Page({

  /**
   * 页面的初始数据
   */
  data: {
     spu:null,
     showRelam:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getSpuById(pid);
    const explain = await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100;
    // console.log(spu)
    this.setData({
      spu,
      explain,
      h
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
  onBuy:function(){
    this.setData({
      showRelam:true,
      orderWay:ShoppingWay.BUY
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
