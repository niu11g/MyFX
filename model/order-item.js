/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2020-04-25 19:54
 */
import {Cart} from "./cart";
import {accMultiply} from "../utils/number";
import {OrderException} from "../core/order-exception";
import {OrderExceptionType} from "../core/enum";

class OrderItem {
    count = 0
    singleFinalPrice
    finalPrice
    online
    title
    img
    stock
    categoryId
    rootCategoryId
    specs
    skuId

    cart = new Cart()

    constructor(sku, count) {
        this.title = sku.title
        this.img = sku.img
        this.skuId = sku.id
        this.stock = sku.stock
        this.online = sku.online
        this.categoryId = sku.category_id
        this.rootCategoryId = sku.root_catgory_id
        this.specs = sku.specs

        this.count = count

        this.singleFinalPrice = this.ensureSingleFinalPrice(sku)
        this.finalPrice = accMultiply(this.count, this.singleFinalPrice)
    }

    isOk() {
        this._checkStock()
        this._beyondMaxSkuCount()
    }

    _beyondMaxSkuCount() {
        if (this.count > Cart.SKU_MAX_COUNT) {
            throw new OrderException('超过商品最大购买数量', OrderExceptionType.BEYOND_SKU_MAX_COUNT)
        }
    }

    _checkStock() {
        if (this.stock === 0) {
            throw new OrderException('当前商品已售罄', OrderExceptionType.SOLD_OUT)
        }
        if (this.count > this.stock) {
            throw new OrderException('购买商品数量超过最大库存', OrderExceptionType.BEYOND_STOCK)
        }
    }

    ensureSingleFinalPrice(sku) {
        if (sku.discount_price) {
            return sku.discount_price
        }
        return sku.price
    }


}

export {
    OrderItem
}
