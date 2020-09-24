// pages/category/category.js
import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";

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
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 -20 -2
    console.log("segHeight:"+h)
    this.setData({
      segHeight:h
    })
  },

  onGotoSearch(event){
    wx.navigateTo({
      url:`/pages/search/search`
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
