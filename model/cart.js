import {Sku} from "./sku";

class Cart{
    static SKU_MIN_COUNT = 1
    static SKU_MAX_COUNT = 77
    static CART_ITEM_MAX_COUNT = 77
    static STORAGE_KEY = 'cart'

    //代理模式
    _cartData = null



    //单例模式
    constructor() {
        if(typeof Cart.instance === 'Object'){
            return Cart.instance
        }
        Cart.instance = this
        return this
    }

    isAllChecked(){
        let allChecked = true
        const cartItems = this._getCartData().items
        for (let item of cartItems){
            if(!item.checked){
                allChecked = false
                break
            }
        }
        return allChecked
    }

    getAllCartItemFromLocal(){
        return this._getCartData()
    }

    _refreshByServerData(serverData){
        const cartData = this._getCartData()
        cartData.items.forEach(item=>{
            this._setLatestCartItem(item,serverData)
        })
    }

    _setLatestCartItem(item,serverData){
        let removed = true
        for(let sku of serverData){
            if(sku.id === item.skuId){
                removed = false;
                item.sku = sku
                break
            }
        }
        if(removed){
            item.sku.online = false
        }
    }

    async getAllSkuFromServer(){
        const cartData = this._getCartData();
        if(cartData.items.length === 0){
            return null
        }
        const skuIds = this.getSkuIds()
        const serverData = await Sku.getSkusByIds(skuIds)
        this._refreshByServerData(serverData)
        this._refreshStorage()
        return this._getCartData()

    }

    getSkuIds(){
        const cartData = this._getCartData()
        if(cartData.items.length === 0){
            return []
        }
        return cartData.items.map(item => item.skuId)
    }

    replaceItemCount(skuId,newCount){
        const oldItem = this.findEqualItem(skuId)
        if(!oldItem){
            console.error('异常情况，更新CartItem中的数量不应当找不到相应数据')
            return
        }
        if(newCount < 1){
            console.error('异常情况，CartItem的Count不可能小于1')
            return
        }
        oldItem.count = newCount
        if(oldItem.count >= Cart.SKU_MAX_COUNT){
            oldItem.count = Cart.SKU_MAX_COUNT
        }
        this._refreshStorage()
    }

    allCheck(checked){
        const cartItem = this._getCartData().items
        for(let item of cartItem){
            item.checked = checked
        }
        this._refreshStorage()
    }

    static isSoldOut(item){
        return item.sku.stock === 0
    }

    static isOnline(item){
        return item.sku.online
    }

    getAllCartItemFromLocal(){
        return this._getCartData()
    }

    checkItem(skuId){
        const oldItem = this.findEqualItem(skuId)
        oldItem.checked = !oldItem.checked
        this._refreshStorage()
    }

    findEqualItem(skuId){
        let oldItem = null
        const items = this._getCartData().items
        for (let i = 0;i < items.length; i++){
            if(this._isEqualItem(items[i],skuId)){
                oldItem = items[i]
                break
            }
        }
        return oldItem
    }

    _isEqualItem(oldItem,skuId){
        return oldItem.skuId === skuId;
    }

    isEmpty() {
        const cartData = this._getCartData()
        return cartData.items.length === 0;
    }

    addItem(newItem){
        if(this.beyondMaxCartItemCount()){
            throw new Error('超过购物车最大数量')
        }
        this._pushItem(newItem)
        this._refreshStorage()
    }

    getCartItemCount(){

        return this._getCartData().items.length
    }

    removeItem(skuId){
        const oldItemIndex = this._findEqualItemIndex(skuId)
        const cartData = this._getCartData()
        cartData.items.splice(oldItemIndex,1)
        this._refreshStorage()
    }

    _findEqualItemIndex(skuId){
        const cartData = this._getCartData()
        return cartData.items.findIndex(item=>{
            return item.skuId === skuId
        })
    }

    _refreshStorage(){
        wx.setStorageSync(Cart.STORAGE_KEY,this._cartData)
    }

    getCheckedItems(){
        const cartItems = this._getCartData().items
        const checkedCartItems = []
        cartItems.forEach(item =>{
            if(item.checked){
                checkedCartItems.push(item)
            }
        })
        return checkedCartItems
    }

    _pushItem(newItem){
        const cartData = this._getCartData()

        const oldItem = this.findEqualItem(newItem.skuId)
        if(!oldItem){
            cartData.items.unshift(newItem)
        }else{
            this._combineItems(oldItem,newItem)
        }
    }

    _combineItems(oldItem,newItem){
        this._plusCount(oldItem,newItem.count)
    }

    _plusCount(item,count){
        item.count += count
        if (item.count >= Cart.SKU_MAX_COUNT){
            item.count = Cart.SKU_MAX_COUNT
        }
    }

    _getCartData(){
        if(this._cartData !== null){
            return this._cartData
        }
        let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
        if(!cartData){
            cartData = this._initCartDataStorage()
        }
        this._cartData = cartData
        return cartData
    }

    _initCartDataStorage(){
        const cartData = {
            items:[]
        }
        wx.setStorageSync(Cart.STORAGE_KEY,cartData)
        return cartData
    }

    beyondMaxCartItemCount(){
        const cartData = this._getCartData()
        return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
    }
}

export {
    Cart
}
