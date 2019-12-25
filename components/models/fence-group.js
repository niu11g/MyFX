import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup{
    spu
    skuList = []
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
        this.initFences()
    }
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        console.log(matrix.m)
        matrix.forEach((element,i,j)=>{
            if(currentJ !== j){
                //开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[j] = this._createFence(element)
            }
            fences[j].pushValueTitle(element.value)
        })
    }
    _createFence(element){
        const fence = new Fence()
        fence.pushValueTitle(element.value)
    }
    _createMatrix(skuList){
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

}
export {
    FenceGroup
}