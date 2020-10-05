// pages/category/category.js
import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../model/categories";
import {SpuListType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initCategoryData()
    this.setDynamicSegmentHeight()
  },

  async initCategoryData(){
    const categories = new Categories()
    this.data.categories = categories
    // this.setData({
    //   categories
    // })
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    // console.log(currentSubs)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg:defaultRoot.img
    })

  },

  onSegChange(event){
    //返回的是字符串 打印输出是黑色字体，如果是数字，则是蓝色字体
    const rootId = event.detail.activeKey
    const currentSubs = this.data.categories.getSubs(parseInt(rootId))
    const currentRoot = this.data.categories.getRoot(parseInt(rootId))
    // console.log(typeof currentSubs[0].id)
    // console.log(typeof 1)

    this.setData({

      currentSubs,
      currentBannerImg:currentRoot.img
    })
  },
  onJumpToSpuList(event){
    // console.log(event.detail)
    const cid = event.detail.cid;

    // wx.navigateTo({
    //   url:`/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    // })
    wx.navigateTo({
      url:`/pages/spu-list/spu-list`
    })
  },

  getDefaultRoot(roots){
    let defaultRoot = roots.find(r=>r.id === this.data.defaultRootId)
    if(!defaultRoot){
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  async setDynamicSegmentHeight(){
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 -20 -2
    // console.log("segHeight:"+h)
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
