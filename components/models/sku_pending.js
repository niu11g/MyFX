import {Cell} from "./cell";

class SkuPending{
   pending = []

   constructor(){

   }
   init(sku){
       for(let i = 0;i<sku.specs.length;i++){
           const cell = new Cell(sku.specs[i])
           this.insertCell(cell,i)
       }
   }

   insertCell(cell,x){
      this.pending[x] = cell
   }

   removeCell(x){
     this.pending[x] = null
   }

   findSelectedCellByX(x){
     return this.pending[x]
   }

   isSelected(cell,x){
     const pendingCell = this.pending[x]
     if (!pendingCell){
        return false
     }
     return cell.id === pendingCell.id


   }
}

export{
  SkuPending
}
