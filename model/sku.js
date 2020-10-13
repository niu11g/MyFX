import {Http} from "../utils/http";

class Sku{
    static async getSkusByIds(ids){
        return await Http.request({
            url:`sku?ids=${ids}`
        })
    }
}

export {
    Sku
}
