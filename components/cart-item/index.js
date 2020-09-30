// components/cart-item/index.js
import {Cart} from "../../model/cart";
import {parseSpecValue} from "../../utils/sku";

const cart = new Cart()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: Object

  },

  observers:{
    cartItem:function(cartItem){
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
      this.setData({
        specStr,
        discount,
        soldOut,
        online
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
    online: Boolean,
    stock: Cart.SKU_MAX_COUNT,
    skuCount: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
