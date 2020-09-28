
class Cart{
    static SKU_MIN_COUNT = 1
    static SKU_MAX_COUNT = 77
    static CART_ITEM_MAX_COUNT = 77

    _cartData = []

    //代理模式

    constructor() {
        if(typeof Cart.instance === 'Object'){
            return Cart.instance
        }
        Cart.instance = this
        return this
    }

    addItem(newItem){
        if(this.beyondMaxCartItemCount()){
            throw new Error('超过购物车最大数量')
        }
        this._pushItem(newItem)
    }

    _pushItem(newItem){
        const cartData = this._getCartData()
    }

    _getCartData(){

    }

    beyondMaxCartItemCount(){
        const cartData = this._getCartData()
        return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
    }
}

export {
    Cart
}
