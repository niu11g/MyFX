import {Http} from "../utils/http";

class Coupon {
    static async collectCoupon(cid) {
        return await Http.request({
            method: 'POST',
            url: `coupon/collect/${cid}`,
            throwError: true
        })
        // return await Http
    }

    static getMyCoupons(status) {
        return Http.request({
            url: `coupon/myself/by/status/${status}`
        })
    }


    static async getCouponsByCategory(cid) {
        return await Http.request({
            url: `coupon/by/Category/${cid}`,
        })
    }

    static async getMySelfWithCategory() {
        return Http.request({
            url: `coupon/myself/available/with_category`
        })
    }

    static async getTop2CouponsByCategory(cid) {
        let coupons = await Http.request({
            url: `coupon/by/Category/${cid}`,
        })
        if (coupons.length === 0) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            return Coupon.getTop2(otherCoupons)
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            const otherCoupons = await Coupon.getWholeStoreCoupons()
            coupons = coupons.concat(otherCoupons)
            return Coupon.getTop2(coupons)
        }
    }

    static getTop2(coupons) {
        if (coupons.length === 0) {
            return []
        }
        if (coupons.length >= 2) {
            return coupons.slice(0, 2)
        }
        if (coupons.length === 1) {
            return coupons
        }
        return []
    }


    static async getWholeStoreCoupons() {
        return Http.request({
            url: `coupon/whole_store`
        })
    }
}

export {
    Coupon
}
