// components/address/index.js
import {Address} from "../../model/address";
import {AuthAddress} from "../../core/enum";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    address:Object,
    hasChosen:false,
    showDialog:false,
    errMsg:String
  },

  lifetimes:{
    attached() {
      const address = Address.getLocal()
      if(address){
        this.setData({
          address,
          hasChosen:true
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onChooseAddress(event){
      // console.log("onChooseAddress");
      const authStatus = await this.hasAuthorizedAddress()
      if(authStatus === AuthAddress.DENY){
        this.setData({
          showDialog:true
        })
        return
      }
      this.getUserAddress()
    },

    onDialogConfirm(event){
      //openSetting只能通过点击按钮生效
      wx.openSetting()
    },
    async getUserAddress(){
      let res;
      try {
        res = await wx.chooseAddress({
          success:function (res) {
          },
          fail:function (err) {
          }
        })
      }catch(e){
        console.log("error")
        // console.log(res)
        // console.error(e)
      }
      console.log( )
      if(res){
        this.setData({
          address:res,
          hasChosen:true
        })
        Address.setLocal(res)
      }
    },

    async hasAuthorizedAddress(){
      // const setting = await wx.getSetting({})
      // console.log(setting) setting.authSetting['scope.address']
      const addressSetting = this.data.errMsg;
      // if(addressSetting === undefined){
      //   return AuthAddress.NOT_AUTH
      // }
      // if(addressSetting === false){
      //   return AuthAddress.DENY
      // }
      // if(addressSetting === true){
      //   return AuthAddress.AUTHORIZED
      // }
      return addressSetting;
    }
  }
})
