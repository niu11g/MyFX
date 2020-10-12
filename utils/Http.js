import {config} from "../config/config";
import {promisic} from "./util";
import {Token} from "../model/token";
import {codes} from "../config/exception-config";
import {HttpException} from "../core/http-exception";

class Http {
    static async request({
                             url,
                             data,
                             method = 'GET',
                             refetch = true,
                             throwError = false
                         }) {
        let res;
        try {
            res = await promisic(wx.request)({
                url: `${config.apiBaseUrl}${url}`,
                data,
                method,
                header: {
                    'content-type': 'application/json',
                    appkey: config.appkey,
                    'authorization': `Bearer ${wx.getStorageSync('token')}`
                }//,
                // success: res => callback(res.data)
            })
        }catch (e) {
            if(throwError){
                throw new HttpException(-1,codes[-1])
            }
            Http.showError(-1)
        }
        const code = res.statusCode.toString()
        if(code.startsWith('2')){
            return  res.data
        }else{
            if(code === '401'){
                //二次重发
                if(data.refreth) {
                    await Http._refetch({
                        url,
                        data,
                        method
                    })
                }
            }else{
                if(throwError){
                    throw new HttpException(res.data.code,res.data.message,code)
                }
                if(code === '404'){

                    if(res.data.code !== undefined){
                        return null
                    }
                    return res.data
                }
                const error_code = res.data.code;
                Http.showError(error_code,res.data)
            }
        }
        return res.data;
    }

    static async _refetch(data){
        const token = new Token()
        await token.getTokenFromServer()
        data.refreth = false
        return await Http.request(data)
    }
    //纯js不能引用lin-ui组件

    static showError(error_code,serverError){
        let tip
        if(!error_code){
            tip = codes[9999]
        }
        else{
            if(codes[error_code] === undefined){
                tip = serverError.message
            }else{
                tip = codes[error_code]
            }
        }
        // tip = serverError.message
        //code message request
        //error_code msg request_url
        // 规范 不用驼峰 用下滑线索
        // 不用缩写 用configuration 不用config
        wx.showToast({
            icon:"none",
            title:tip,
            duration:3000
        })
    }
}

//callback\promise\async await 处理异步调用
export {
    Http
}
