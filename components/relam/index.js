// components/relam/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object

  },
  observers:{
    'spu':function(spu){
       if(!spu){
         return;
       }
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
