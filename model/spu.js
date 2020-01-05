import {Http} from "../utils/http";


class Spu{

  static async getSpuById(pid){
    return await Http.request({
      url:`spu/id/${pid}/detail`
    })
    
  }

}

export {
  Spu
}