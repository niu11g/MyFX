// components/relam/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../model/spu";

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
       console.log(spu)
       if(Spu.isNoSpec(spu)){
           this.processNoSpec(spu)
       }else {
           this.processHasSpec(spu)
       }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
      judge:Object,
      previewImg:String
  },

  /**
   * 组件的方法列表
   */
  methods:{
      processNoSpec(spu){
          this.setData({
              noSpec:true,
              skuIntact:true
          })
          this.bindSkuData(spu.sku_list[0])
      },
      processHasSpec(spu){
          const fenceGroup = new FenceGroup(spu);
          fenceGroup.initFences1();
          console.log("fenceGroup"+fenceGroup)
          const jud = new Judger(fenceGroup)
          this.setData({
              judge:jud
          })
          // fenceGroup.initFences();
          const defaultSku = fenceGroup.getDefaultSku()
          if(defaultSku){
              this.bindSkuData(defaultSku)
          }
          else{
              this.bindSpuData()
          }
          console.log(this.skuIntact)
          this.bindFenceGroupData(fenceGroup)
      },
      bindSpuData(){
          const spu = this.properties.spu
          this.setData({
              previewImg:spu.img,
              title:spu.title,
              price:spu.price,
              discountPrice:spu.discount_price,
              skuIntact:this.data.judge.isSkuIntact()
          })
      },
      bindSkuData(sku){
          console.log("judger"+this.data)
          this.setData({
              previewImg:sku.img,
              title:sku.title,
              price:sku.price,
              discountPrice:sku.discount_price,
              stock:sku.stock,
              // skuIntact:this.data.judge.isSkuIntact()
          })
      },
      bindFenceGroupData(fenceGroup) {
          this.setData({
              fences: fenceGroup.fences
          })
      },
      onCellTap(event){
          const cell = event.detail.cell
          const x = event.detail.x
          const y = event.detail.y
          console.log(event.detail)
          const judge = this.data.judge
          judge.judge(cell,x,y)
          this.setData({
              fences:judge.fenceGroup.fences
          })
      }
  }
})
