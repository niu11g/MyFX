// components/relam/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../model/spu";
import {Cell} from "../models/cell";

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
              // skuIntact:true
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
          this.bindTipData()
          console.log(this.skuIntact)
          this.bindFenceGroupData(fenceGroup)
      },
      bindSpuData(){
          const spu = this.properties.spu
          this.setData({
              previewImg:spu.img,
              title:spu.title,
              price:spu.price,
              discountPrice:spu.discount_price
          })
      },
      bindSkuData(sku){
          console.log("judger-sku" + sku.discount_price)
          this.setData({
              previewImg:sku.img,
              title:sku.title,
              price:sku.price,
              discountPrice:sku.discount_price,
              stock:sku.stock
          })
      },
      bindTipData(){
         this.setData({
           skuIntact:this.data.judge.isSkuIntact(),
           currentValues:this.data.judge.getCurrentValues(),
           missingKeys:this.data.judge.getMissingKeys()
         })
      },
      bindFenceGroupData(fenceGroup) {
          this.setData({
              fences: fenceGroup.fences
          })
      },
      onCellTap(event){
          const data = event.detail.cell
          const x = event.detail.x
          const y = event.detail.y

          const cell = new Cell(data.spec)
          cell.status = data.status
          console.log(event.detail)
          const judge = this.data.judge
          judge.judge(cell,x,y)
          const skuIntact = judge.isSkuIntact()
          console.log("skuIntact"+skuIntact);
          if(skuIntact){
              const currentSku = judge.getDeterminateSku()
              console.log("currentSku"+currentSku)
              this.bindSkuData(currentSku)
          }
          this.bindTipData()
          this.bindFenceGroupData(judge.fenceGroup)
      }
  }
})
