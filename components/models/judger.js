import {SkuCode} from "./sku_code";
import {CellStatus} from "../../core/enum";
import { SkuPending } from "./sku_pending";
import { Joiner } from "../../utils/joiner.js";
class Judger{
    fenceGroup
    pathDict=[]
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
        this._initSkuPending()
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }
    isSkuIntact(){
           console.log("调用skuintact")
           return this.skuPending.isIntact()
    }
    getMissingKeys(){
        const missingKeysIndex = this.skuPending.getMissingSpecKeys()
        return missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })
    }
    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }

    _initSkuPending(){
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if(!defaultSku){
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null,null,null,true);
        console.log(this.skuPending)
    }

    _initSelectedCell(){
        this.skuPending.pending.forEach(cell=>
            this.fenceGroup.setCellStatusById(cell.id,CellStatus.SELECTED)
        )
    }
    initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)
    }

    judge(cell,x,y,isInit=false){
        if(!isInit){
            this._changeCurrentCellStatus(cell,x,y)
        }
        this.fenceGroup.eachCell((cell,x,y)=>{
            const path = this._findPotentialPath(cell, x, y)
            console.log(path)
            if(!path){
              return
            }
            const isIn = this._isInDict(path)
            if(isIn){
                this.fenceGroup.setCelStatusByXY(x,y,CellStatus.WAITING)
            }
            else{
                this.fenceGroup.setCelStatusByXY(x,y,CellStatus.FORBIDDEN)
                // this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }

    _isInDict(path){
      return this.pathDict.includes(path)
    }

    // _changeOtherCellStatus(cell,x,y){
    //   const path = this._findPotentialPath(cell,x,y)
    //   console.log(path)
    // }

    _findPotentialPath(cell,x,y){
      const joiner = new Joiner('#')
      for(let i = 0;i<this.fenceGroup.fences.length;i++){
        const select = this.skuPending.findSelectedCellByX(i)
          if(x === i){
            if(this.skuPending.isSelected(cell,x)){
              return
            }
            //如果是当前行,把选择的cell加入潜在路径里
            // const cell = new Cell(cell.spec)
            const cellCode = this._getCellCode(cell.spec)
            joiner.join(cellCode)
          }else{
            if (select){
              const selectedCellCode = this._getCellCode(select.spec)
              joiner.join(selectedCellCode)

            }
          }
      }
      return joiner.getStr()

    }

    _getCellCode(spec){
      return spec.key_id + '-' +spec.value_id
    }

    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fenceGroup.setCelStatusByXY(x,y,CellStatus.SELECTED)
            // this.fenceGroup.fences[x].cells[y].status=CellStatus.SELECTED
            this.skuPending.insertCell(cell,x)
        }
        if(cell.status === CellStatus.SELECTED){
            this.fenceGroup.setCelStatusByXY(x,y,CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }

    }
}

export{
    Judger
}
