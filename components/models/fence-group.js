class FenceGroup{
    spu
    skuList = []
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }
}
export {
    FenceGroup
}