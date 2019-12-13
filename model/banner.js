import {Http} from "../utils/Http";

class Banner {
    static locationB = 'b-1'
    static locationG = 'b-2'
    static async getHomeLocationB() {
        return await Http.request({
            //模板字符串
            url: `banner/name/${Banner.locationB}`
        })
    }
    static async getHomeLocationG() {
      return await Http.request({
        //模板字符串
        url: `banner/name/${Banner.locationG}`
      })
    }
}

export {
    Banner
}