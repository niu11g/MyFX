// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotList:Object
  },

  observers:{
    'hotList':function(hotList){
      if(!hotList){

        return;
      }
      if(hotList.items.length === 0){
        return;
      }
      const left = hotList.items.find(i=>i.name === 'left');
      const rightTop = hotList.items.find(i => i.name === 'right-top');
      const rightBottom = hotList.items.find(i => i.name === 'right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      })

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
