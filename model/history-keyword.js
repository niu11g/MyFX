
class HistoryKeyword{
    static MAX_ITEM_COUNT = 20
    static KEY = 'keywords'

    keywords = []

    constructor() {

        if(typeof HistoryKeyword.instance === 'object'){
            return HistoryKeyword.instance
        }
        this.keywords = this._getLocalKeywords()
        HistoryKeyword.instance = this
        return this
    }
    //单例模式

    //缓存中写入数据-限制缓存大小 需去除重复数据
    save(keyword){
        const items = this.keywords.filter(k=>{
            return k === keyword
        })
        if(items.length !== 0){
            return
        }
        if(this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT){
            //队列 先进先出(pop、unshift) 栈 先进后出
            this.keywords.pop()
        }
        this.keywords.unshift(keyword)
        // [].push(keyword)
        this._refreshLocal()
    }

    //获取缓存
    get(){
        return this.keywords
    }

    //清除缓存
    clear(){
        this.keywords = []
        this._refreshLocal()
    }

    _refreshLocal(){
        wx.setStorageSync(HistoryKeyword.KEY,this.keywords)
    }

    _getLocalKeywords(){
        const keywords = wx.getStorageSync(HistoryKeyword.KEY)
        if(!keywords){
            wx.setStorageSync(HistoryKeyword.KEY,[])
            return []
        }
        return keywords
    }


}

export {
    HistoryKeyword
}
