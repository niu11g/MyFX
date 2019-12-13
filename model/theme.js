import {Http} from "../utils/Http";

class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = [];

    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`;
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    async getHomeLocationA() {
        return await this.themes.find(t => t.name === Theme.locationA)
    }

    //删除无效引用 快捷键 ctrl+alt+o
    async getHomeLocationE() {
        return await this.themes.find(t => t.name === Theme.locationE)
    }

    async getHomeLocationF(){
        return await this.themes.find(t => t.name === Theme.locationF)
    }

    async getHomeLocationH() {
      return await this.themes.find(t => t.name === Theme.locationH)
    }

    static getHomeLocationESpu(){
      return  Theme.getThemeSpuByName(Theme.locationE);
    }

    static getThemeSpuByName(name){
        //async 包装方法体返回的结果是Promise的，如果方法体本身就是Promise，则可以不加
        //await 如果此方法后面没有需要等待此方法结果的步骤，可以省略
        return  Http.request({
            url:`theme/name/${name}/with_spu`
        })
    }
}

export {
    Theme
}