import {Http} from "../utils/Http";

class Category{
    static async getHomeLocationC(){
        return await Http.request({
            url:`category/grid/all`
        })
    }
}

export{
    Category
}