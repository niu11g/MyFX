import {Http} from "../utils/http";

class Categories{
    roots = []
    subs = []

    async getAll(){
        const data = await Http.request({
            url:`category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots(){
        return this.roots
    }

    getRoot(rootId){
        //== 与 === 的区别：==只判断值相等 ===不仅需要值相等 数字类型也必须相等
        return this.roots.find(r=>r.id === rootId)
    }

    getSubs(parentId){
        return this.subs.filter(sub=>sub.parent_id === parentId)
        // return this.roots.find(r=>r.id === rootId)
    }
}

export {
    Categories
}
