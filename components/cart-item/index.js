// components/cart-item/index.js
import {Cart} from "../../model/cart";
import {parseSpecValue} from "../../utils/sku";

const cart = new Cart()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem:Object,
    stock:{
      type:Number,
      value:Cart.SKU_MAX_COUNT
    },
    count:{
      type:Number,
      value:Cart.CART_ITEM_MAX_COUNT
    }

  },

  observers:{
    cartItem:function(cartItem){
      console.log("observers-cartItem")
      this.setData({
        online:true
      })
      console.log(cartItem)
      if(!cartItem){
        return
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price ? true : false
      const soldOut = Cart.isSoldOut(cartItem)
      const online = Cart.isOnline(cartItem)
      const stock = cartItem.sku.stock
      const count = cartItem.count
      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock,
        count
      })
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    specStr: String,
    discount: Boolean,
    soldOut: Boolean,
    online: Boolean
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(event){
      const skuId = this.properties.cartItem.skuId
      cart.removeItem(skuId)
      this.setData({
         cartItem:null
      })
      this.triggerEvent('itemdelete',{
        skuId
      })
    },

    checkedItem(event){
      const checked = event.detail.checked
      cart.checkItem(this.properties.cartItem.skuId)
      this.properties.cartItem.checked = checked
      this.triggerEvent('itemcheck',{

      })
    }
  }
})
