// pages/search/search.js
import {HistoryKeyword} from "../../model/history-keyword";

const historyKeyword = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const historyTags = historyKeyword.get()
    this.setData({
      historyTags
    })
  },

  onSearch(event){
    const keyword = event.detail.value
    historyKeyword.save(keyword)

    this.setData({
      historyTags:historyKeyword.get()
    })
  },

  onDeleteHistory(event){
    historyKeyword.clear()
    this.setData({
      historyTags:[]
    })
  }

})
