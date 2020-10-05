import {Http} from "./http";

class Paging{
  start
  count
  req
  locker = false
  url
  moreData = true
  accumulator = []

  constructor(req,count = 10,start = 0){
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }

  async getMoreData(){
    //getLocker
    //request
    //releaseLocker
      if(!this.moreData){
        return
      }
      if(!this._getLocker()){
          return
      }
      const data = await this._actualGetData()
      this._releaseLocker()
      return data
  }

  async _actualGetData(){
    const req = this._getCurrentReq()
    let spupage = await Http.request(req)
    if (!spupage){
      return null
    }
    if (spupage.total === 0){
      return {
        empty:true,
        items:[],
        moreData:false,
        accumulator:[]
      }
    }
    this.moreData = Paging._moreData(spupage.total_page, spupage.page)
    if(this.moreData){
      this.start += this.count
    }
    this._accumulate(spupage.items)
    return {
      empty:false,
      items: spupage.items,
      moreData:this.moreData,
      accumulator: this.accumulator
    }
  }
  _accumulate(items){
    this.accumulator = this.accumulator.concat(items)
  }

  static _moreData(totalPage,pageNum){
    return pageNum < totalPage -1
  }
  _getCurrentReq(){
      let url = this.url
      const params = `start=${this.start}&count=${this.count}`
      // 第一种 url = v1/spu/latest + '?' + params
      // 第二种 url = v1/spu/latest?other=abc + '&'+params
      if(url.includes('?')){
          url += '&' + params
          // contains
      }else{
          url += '?' + params
      }
      this.req.url = url
      return this.req
      //值类型 引用类型
  }

  _getLocker(){
    if(this.locker){
      return false
    }
    this.locker = true
    return true
  }

  _releaseLocker(){
    this.locker = false
  }

}
export{
    Paging
}
