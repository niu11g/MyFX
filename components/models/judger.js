import {SkuCode} from "./sku_code";
import {CellStatus} from "../../core/enum";

class Judger{
    fenceGroup
    pathDict=[]

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
    }

    initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)
    }

    judge(cell){
        this._changeCellStatus(cell)
    }

    _changeCellStatus(cell){
        if(cell.status === CellStatus.WAITING){
            cell.status = CellStatus.SELECTED
        }
        if(cell.status === CellStatus.SELECTED){
            cell.status = CellStatus.WAITING
        }

    }
}

export{
    Judger
}