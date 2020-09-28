// pages/search/search.js
import {HistoryKeyword} from "../../model/history-keyword";
import {Tag} from "../../model/tag";
import {Search} from "../../model/search";

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
  onLoad: async function (options) {
    const historyTags = historyKeyword.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(event){
    this.setData({
      search:true,
      items:[]
    })
    const keyword = event.detail.value || event.detail.name
    if(!keyword){
      wx.showToast({
        title: '请输入关键字',
      })
      return
    }
    historyKeyword.save(keyword)

    this.setData({
      historyTags:historyKeyword.get()
    })

    const paging = Search.search(keyword)
    wx.lin.showLoading({
      color:'#157658',
      type:'flash',
      fullScreen:true
    })
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    this.bindItems(data)
  },

  onCancel(event){
    this.setData({
      search:false
    })
  },

  bindItems(data){
    if(data.accumulator.length !== 0){
      this.setData({
        items:data.accumulator
      })
    }
  },

  onDeleteHistory(event){
    historyKeyword.clear()
    this.setData({
      historyTags:[]
    })
  }

})
