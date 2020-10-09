/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2020-04-26 18:13
 */
import {config} from "../config/config";
import {promisic} from "../utils/util";

class Token {
    // 1. 携带Token
    // server 请求Token

    // 登录 token -> storage

    // token 1. token不存在 2.token 过期时间
    // 静默登录

    constructor() {
        this.tokenUrl = config.apiBaseUrl + "token"
        this.verifyUrl = config.apiBaseUrl + "token/verify"
    }

    async verify() {
        const token = wx.getStorageSync('token')
        if (!token) {
            await this.getTokenFromServer()
        } else {
            await this._verifyFromServer(token)
        }
    }

    async getTokenFromServer() {
        // code
        const r = await wx.login()
        const code = r.code

        const res = await promisic(wx.request)({
            url: this.tokenUrl,
            method: 'POST',
            data: {
                account: code,
                type: 0
            },
        })
        wx.setStorageSync('token', res.data.token)
        return res.data.token
    }

    async _verifyFromServer(token) {
        const res = await promisic(wx.request)({
            url: this.verifyUrl,
            method: 'POST',
            data: {
                token
            }
        })

        const valid = res.data.is_valid
        if (!valid) {
            return this.getTokenFromServer()
        }
    }

}

export {
    Token
}
