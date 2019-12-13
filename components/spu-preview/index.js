// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表-外部属性
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据-内部属性
   */
  data: {
    tags:Array
  },

  observers:{
    data:function(data){
      if(!data){
        return
      }
      if(!data.tags){
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgScale:function(e){
      const {width,height} = e.detail;
      this.setData({
        w:340,
        h:340*height/width
      })
    },
    onItemTap(e){
      const pid = e.currentTarget.dataset.pid;
      //自定义组件中一般不设置跳转 业务型组件与通用型组件
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    }
  }
})
