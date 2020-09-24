const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
      func(args);
    });
  };
};

// 尺寸单位
// rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
// 设备	        rpx换算px (屏幕宽度/750)	px换算rpx (750/屏幕宽度)
// iPhone5	    1rpx = 0.42px	        1px = 2.34rpx
// iPhone6	    1rpx = 0.5px	        1px = 2rpx
// iPhone6 Plus	1rpx = 0.552px	        1px = 1.81rpx

const px2rpx = function (pxNumber) {
  const { screenWidth } = wx.getSystemInfoSync();
  const rpxNumber = (750 / screenWidth) * pxNumber;
  return rpxNumber;
};

export {
  promisic,
  px2rpx
};
