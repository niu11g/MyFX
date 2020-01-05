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

    _initSkuPending(){
      this.skuPending = new SkuPending()

    }

    initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)
    }

    judge(cell,x,y){
      this._changeCurrentCellStatus(cell,x,y)
      this.fenceGroup.eachCell((cell,x,y)=>{
        const path = this._findPotentialPath(cell, x, y)
        console.log(path)
        if(!path){
          return
        }
        const isIn = this._isInDict(path)
        if(isIn){
          this.fenceGroup.fences[x].cells[y].status=CellStatus.WAITING
        }
        else{
          this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
        }
      })
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
            this.fenceGroup.fences[x].cells[y].status=CellStatus.SELECTED
            this.skuPending.insertCell(cell,x)
        }
        if(cell.status === CellStatus.SELECTED){
            this.fenceGroup.fences[x].cells[y].status=CellStatus.WAITING
            this.skuPending.removeCell(x)
        }

    }
}

export{
    Judger
}