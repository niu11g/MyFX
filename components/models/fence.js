import {Cell} from "./cell";


class Fence{

     cells = []
     specs
     title
     id

     constructor(specs) {
        this.specs = specs
         this.title = specs[0].key
         this.id = specs[0].key_id
     }

    init(){
        this._initCells()
    }

     _initCells(){
         this.specs.forEach(s=>{
             const existed = this.cells.some(c=>{
                 return c.id === s.value_id
             })
             if(existed){
                 return
             }
             // this.pushValueTitle(s.value)
             const cell = new Cell(s);
             this.cells.push(cell)
         })
     }
     setFenceSketch(skuList){
        this.cells.forEach(c=>{
            this._setCellSkuImg(c,skuList)
        })
     }

     _setCellSkuImg(cell,skuList){
        const specCode = cell.getCellCode();
        const matchSku = skuList.find(s=>s.code.includes(specCode));
        if(matchSku){
            cell.skuImg = matchSku.img;
        }
     }

     // pushValueTitle(title){
     //     this.cells.push(title)
     // }
}

export {
    Fence
}
