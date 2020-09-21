import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup{
    spu
    skuList = []
    fences
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku(){
       const defaultSkuId = this.spu.default_sku_id;
       if(!defaultSkuId){
           return
       }
       return this.skuList.find(s=>s.id === defaultSkuId)
    }

    setCellStatusById(cellId,status){
        this.eachCell((cell)=>{
            if(cell.id === cellId){
                cell.status = status
            }
        })
    }

    getSku(skuCode){
        const fullSkuCode = `${this.spu.id}$${skuCode}`
        const sku = this.spu.sku_list.find(s=>s.code === fullSkuCode)
        console.log("sku~~~~~~~~~~"+sku)
        return sku?sku:null
    }

    setCelStatusByXY(x,y,status){
        this.fences[x].cells[y].status=status
    }

    initFences1(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        matrix.each((element,i,j)=>{
            if(currentJ !== j){
                //开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
        console.log(fences);
    }
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = [];
        const m = matrix.transpose()
        m.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            console.log("fence_id"+fence.id)
            if(this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
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
    _hasSketchFence(){
        console.log("sketch_spec_id"+this.spu.sketch_spec_id);
        return this.spu.sketch_spec_id?true:false
    }
    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId?true:false

    }

}
export {
    FenceGroup
}
