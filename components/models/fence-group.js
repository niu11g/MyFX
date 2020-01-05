import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup{
    spu
    skuList = []
    fences
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        matrix.each((element,i,j)=>{
            if(currentJ !== j){
                //开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            // fences[currentJ].pushValueTitle(element.value)
        })
        console.log(fences);
    }
    initFences1(){
        const matrix = this._createMatrix(this.skuList)
        const fences = [];
        const m = matrix.transpose()
        m.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
        console.log(fences)
    }
    _createFence(element){
        const fence = new Fence()
        return fence;
    }
    _createMatrix(skuList){
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }
    eachCell(cb){
        for(let i =0;i<this.fences.length;i++){
          for(let j = 0;j<this.fences[i].cells.length;j++){
            const cell = this.fences[i].cells[j]
            cb(cell,i,j)
          }
        }
    }

}
export {
    FenceGroup
}