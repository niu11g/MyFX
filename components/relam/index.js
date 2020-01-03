// components/relam/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object

  },
  //自定义组件的生命周期
  /*lifetimes:{
    attached(){

    }
  },*/
  //监听器
  observers:{
    'spu':function(spu){
       if(!spu){
         return;
       }
       const fenceGroup = new FenceGroup(spu);
       fenceGroup.initFences1();
       const judger = new Judger(fenceGroup)
        this.data.judger = judger
       // fenceGroup.initFences();
        this.bindInitData(fenceGroup)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
     judger:Object
  },

  /**
   * 组件的方法列表
   */
  methods:{
      bindInitData(fenceGroup) {
          this.setData({
              fences: fenceGroup.fences
          })
      },
      onCellTap(event){
          const cell = event.detail.cell
          const x = event.detail.x
          const y = event.detail.y
          console.log(event.detail)
          const judge = this.data.judger
          judge.judge(cell,x,y)
          this.setData({
              fences:judge.fenceGroup.fences
          })
      }
  }
})
