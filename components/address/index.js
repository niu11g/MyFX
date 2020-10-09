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
    showDialog:false
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
    onChooseAddress(event){
      // // console.log("onChooseAddress");
      // const authStatus = await this.hasAuthorizedAddress()

      // if(authStatus == "fail"){
      //   console.log(authStatus)
      //   this.setData({
      //     showDialog:true
      //   })
      //   return
      // }
      this.getUserAddress()

    },

    // async onDialogConfirm(event){
    //   //openSetting只能通过点击按钮生效
    //   await wx.chooseAddress({})
    // },
    getUserAddress(){
      let that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.address']) {
            wx.openSetting({
            })
          }else{
            //打开选择地址
            wx.chooseAddress({
              success: function (res) {
                console.log(res)
                that.setData({
                  address: res,
                  hasChosen:true
                });
                Address.setLocal(res)
                that.triggerEvent("address",{
                    address:res
                })
              }
            })
          }
        },
        fail(res){
          console.log('调用失败')
        }
      })
      // let res;
      // try {
      //   res = await wx.chooseAddress({})
      // }catch(e){
      // }
      // if(res){
      //   console.log("success")
      //   this.setData({
      //     address:res,
      //     hasChosen:true,
      //     resultMsg:"success"
      //   })
      //   Address.setLocal(res)
      // }else{
      //   this.setData({
      //     resultMsg:"fail"
      //   })
      // }
    },

    // async hasAuthorizedAddress(){
      // const setting = await wx.getSetting({})
      // console.log(setting) setting.authSetting['scope.address']
      // const addressSetting = this.data.resultMsg;
      // if(addressSetting === undefined){
      //   return AuthAddress.NOT_AUTH
      // }
      // if(addressSetting === false){
      //   return AuthAddress.DENY
      // }
      // if(addressSetting === true){
      //   return AuthAddress.AUTHORIZED
      // }
    //   return addressSetting;
    // }
  }
})
