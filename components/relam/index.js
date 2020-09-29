// components/relam/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Cart} from '../../model/cart'
import {Spu} from "../../model/spu";
import {Cell} from "../models/cell";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object,
    orderWay:String

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
       this.triggerSpecEvent();
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
      judge:Object,
      previewImg:String,
      currentSkuCount:Cart.SKU_MIN_COUNT
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
          this.setStockStatus(spu.sku_list[0].stock,this.data.currentSkuCount);
      },
      processHasSpec(spu){
          const fenceGroup = new FenceGroup(spu);
          fenceGroup.initFences();
          const jud = new Judger(fenceGroup)
          this.setData({
              judge:jud
          })
          // fenceGroup.initFences();
          const defaultSku = fenceGroup.getDefaultSku()
          if(defaultSku){
              this.bindSkuData(defaultSku)
              this.setStockStatus(defaultSku.stock,this.data.currentSkuCount);
          }
          else{
              this.bindSpuData()
          }
          this.bindTipData()
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
      triggerSpecEvent() {
          const noSpec = Spu.isNoSpec(this.properties.spu);
          if (noSpec) {
              this.triggerEvent('specchange', {
                  noSpec
              })
          } else {
              console.log(this.data.judge)
              this.triggerEvent('specchange', {
                  noSpec:noSpec,
                  skuIntact: this.data.judge.isSkuIntact(),
                  currentValues: this.data.judge.getCurrentValues(),
                  missingKeys: this.data.judge.getMissingKeys()
              })
          }
      },
      bindSkuData(sku){
          console.log("judger-sku" + sku.stock)
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
      setStockStatus(stock,currentCount){
          this.setData({
              outStock:this.isOutOfStock(stock,currentCount)
          })
      },
      isOutOfStock(stock,currentCount){
          return stock < currentCount;
      },
      noSpec(){
          const spu = this.properties.spu
          return Spu.isNoSpec(spu)
      },
      onSelectCount(event){
          const currentCount = event.detail.count
          this.data.currentSkuCount = currentCount

          if (this.noSpec()) {
              this.setStockStatus(this.getNoSpecSku().stock, currentCount)
          } else {
              if (this.data.judger.isSkuIntact()) {
                  const sku = this.data.judger.getDeterminateSku()
                  this.setStockStatus(sku.stock, currentCount)
              }
          }
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
              this.setStockStatus(currentSku.stock,this.data.currentSkuCount)
          }
          this.bindTipData()
          this.bindFenceGroupData(judge.fenceGroup)
          this.triggerSpecEvent()
      },
      onBuyOrCart(event){
          if(Spu.isNoSpec(this.properties.spu)){
              this.shoppingNoSpec();
          }else{
              this.shoppingVarious()
          }
      },
      shoppingVarious(){
          const intact = this.data.judge.isSkuIntact();
          if(!intact){
              const missKeys = this.data.judge.getMissingKeys()
              wx.showToast({
                  icon:"none",
                  title:`请选择：${missKeys.join(', ')}`,
                  duration:3000
              })
              return
          }
          this._triggerShoppingEvent(this.data.judge.getDeterminateSku())
      },
      shoppingNoSpec(){
          this._triggerShoppingEvent(this.getNoSpecSku())
      },

      getNoSpecSku(){
          return this.properties.spu.sku_list[0]
      },
      _triggerShoppingEvent(sku){
          this.triggerEvent('shopping',{
              orderWay:this.properties.orderWay,
              spuId:this.properties.spu.id,
              skuId:sku,
              skuCount:this.data.currentSkuCount,
          })
      }
  }
})
