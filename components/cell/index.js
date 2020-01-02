// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   * 父组件通过properties向子组件传递属性
   * 子组件通过method向父组件传递属性
   */

  properties: {
    cell:Object,
    y:Number,
    x:Number
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
    onTap(event){
      this.triggerEvent('celltap',{
        cell:this.properties.cell,
        x:this.properties.x,
        y:this.properties.y

      },{
        //捕捉cell的自定义事件
        bubbles:true,
        composed:true
      })
    }
  }
})
