import {Http} from "../utils/Http";


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