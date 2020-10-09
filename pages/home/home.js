// pages/home/home.js
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";
import {CouponCenterType} from "../../core/enum";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        themeA:null,
        themeE:null,
        themeF:null,
        themeH:null,
        bannerB:null,
        grid:[],
        activityD:null,
        bannerG:null,
        scales:{},
        sPaging:null,
        loadingType:null

    },

    onGoToCoupons(event){
        const name = event.currentTarget.dataset.aname
        wx.navigateTo({
            url:`/pages/coupon/coupon?name=${name}&type=${CouponCenterType.ACTIVITY}`
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initAllData();
        this.initBottomSpuList();
    },
    async initBottomSpuList(){
        const paging =  SpuPaging.getLatestPaging();
        this.data.sPaging = paging;
        const data = await paging.getMoreData()
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },
    async initAllData() {
        // const themeA = await Theme.getHomeLocationA();
        // const themes = await Theme.getThemes();
        //类可以保存数据，但不能保存状态
        //类的对象既可以保存数据，也可以保存状态
        const themes = new Theme();
        await themes.getThemes();

        //name = t-1
        //for(let theme of themes){
        //    if theme.name = t-1
        // }
        //集合
        //find,filter,map,some,reduce
        const themeA = await themes.getHomeLocationA();
        const themeE = await themes.getHomeLocationE();
        const themeF = await themes.getHomeLocationF();
        const themeH = await themes.getHomeLocationH();
      // console.log("themeH" + themeF);
        let themeESpu = []
        if(themeE.online){
          const data = await Theme.getHomeLocationESpu();
          if(data){
            //截取数组，用slice
            themeESpu = data.spu_list.slice(0,8)
          }
        }
        const grid = await Category.getHomeLocationC();
        const bannerB = await Banner.getHomeLocationB();
        const bannerG = await Banner.getHomeLocationG();
        const activityD = await Activity.getHomeLocationD();
        this.setData({
            themeA,
            themeE,
            themeF,
            themeH,
            themeESpu,
            bannerB,
            bannerG,
            grid,
            activityD
        })
    },
    onTap:  function(e){
      // console.log(e.target.dataset.id);
      let id = e.target.dataset.id;

      let widthView = e.detail.width;
      let heightView = e.detail.height;



      let scale = widthView / heightView ;
      let scales = this.data.scales;
      scales[id]={
        scale:scale
      }
      this.setData({
        scales:scales
      })
      //  console.log(scales)
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
      const data = await this.data.sPaging.getMoreData();
      if (!data) {
        return
      }
      wx.lin.renderWaterFlow(data.items)
      if(!data.moreData){
        this.setData({
          loadingType:'end'
        })
      }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
