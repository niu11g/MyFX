

class Fence{

     valueTitles = []
     specs
     constructor(specs) {
        this.specs = specs
     }

     init(){
         this.specs.forEach(s=>{
             this.pushValueTitle(s.value)
         })
     }

     pushValueTitle(title){
         this.valueTitles.push(title)
     }
}

export {
    Fence
}