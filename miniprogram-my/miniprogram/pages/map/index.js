"use strict";
var common_vendor = require("../../common/vendor.js");
var myControl = require( "../../common/share-control.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const markers = common_vendor.ref([
      {
        iconPath: "../../static/images/nav.png",
        id: 0,
        width: 50,
        height: 50,
        latitude: "30",
        longitude: "104"
      }
    ]);
    const heNumber = common_vendor.ref("");
    const sheNumber = common_vendor.ref("");
    var connectText = "";
    common_vendor.onMounted(() => {
      const db = wx.cloud.database();
      const common = db.collection("common");
      common.get().then((res) => {
        heNumber.value = res.data[myControl.getCurrentSwitchIndex()].heNumber;
        sheNumber.value = res.data[myControl.getCurrentSwitchIndex()].sheNumber;
        connectText = res.data[myControl.getCurrentSwitchIndex()].connectText;
        markers.value[0].latitude = res.data[myControl.getCurrentSwitchIndex()].location.latitude;
        markers.value[0].longitude = res.data[myControl.getCurrentSwitchIndex()].location.longitude;
      });
    });
    const toNav = () => {
      wx.openLocation({
        latitude: Number(markers.value[0].latitude),
        longitude: Number(markers.value[0].longitude),
        scale: 18
      });
    };
    const linkHe = () => {
      wx.makePhoneCall({
        phoneNumber: heNumber.value
      });
    };
    const linkShe = () => {
      wx.makePhoneCall({
        phoneNumber: sheNumber.value
      });
    };
    const jumpFunc0 = () => {
        myControl.setInitSwitch("pages/index/index?index=0") // 将完整的首次进入链接缓存起来
        wx.reLaunch({
                  url: 'index?index=0'
            })
      };
      const jumpFunc1 = () => {
        myControl.setInitSwitch("pages/index/index?index=1") // 将完整的首次进入链接缓存起来
        wx.reLaunch({
                  url: 'index?index=1'
            })
      };
      const jumpFunc2 = () => {
        myControl.setInitSwitch("pages/index/index?index=2") // 将完整的首次进入链接缓存起来
        wx.reLaunch({
                  url: 'index?index=2'
            })
      };
    return (_ctx, _cache) => {
      return {
        a: markers.value[0].longitude,
        b: markers.value[0].latitude,
        c: markers.value,
        d: common_vendor.o(toNav),
        e: common_vendor.o(linkHe),
        f: common_vendor.o(linkShe),
        text: connectText,
        jump0: common_vendor.o(jumpFunc0),
        jump1: common_vendor.o(jumpFunc1),
        jump2: common_vendor.o(jumpFunc2),
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30ce350b"], ["__file", "/data/code/wedding-invitation/src/pages/map/index.vue"]]);
wx.createPage(MiniProgramPage);
