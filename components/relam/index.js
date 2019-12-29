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
       // fenceGroup.initFences();
        this.bindInitData(fenceGroup)
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
  methods:{
      bindInitData(fenceGroup) {
          this.setData({
              fences: fenceGroup.fences
          })
      }


  }
})
