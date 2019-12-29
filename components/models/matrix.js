class Matrix{
    m
   constructor(matrix) {
       this.m = matrix
   }

   get rowsNum(){
        return this.m.length
   }

   get colsNum(){
        return this.m[0].length
   }

   //问题：若后台sku传回来的值顺序是打乱的代码该如何写？  --待研究 -难点：如何从一个二维数组中循环取到某个属性相等的值范围并重新排列
    // 比如：[[{key_id:1,key_value:颜色，value_id:1,value:白},{}...],[{key_id:1,key_value:颜色，value_id:2,value:黑},{},{}],[{}],[{}]...]
    //找出相等key_id的组合并重新排列，结果为[[{key_id:1,key_value:颜色，value_id:1,value:白},{key_id:1,key_value:颜色，value_id:2,value:黑},{}.],[],[]...]

   each(cb){
        for(let j = 0;j < this.colsNum; j++){
            for(let i = 0;i < this.rowsNum;i++){
                   const element = this.m[i][j]
                   cb(element,i,j)
            }
        }
   }
   transpose(){
        const desArr = []
        for (let i = 0 ;i < this.colsNum;i++){
            desArr[i] = []
            for(let j = 0;j < this.rowsNum;j++){
                desArr[i][j] = this.m[j][i]
            }
        }
        return desArr;
   }
}

export {
    Matrix
}