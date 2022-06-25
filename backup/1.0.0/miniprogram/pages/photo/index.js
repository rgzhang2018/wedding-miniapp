"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  HSwiper();
}
const HSwiper = () => "../../component/swiper.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const list = common_vendor.ref([]);
    const isGif = common_vendor.ref(false);
    const background = common_vendor.ref("");
    const autoplay = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      getList();
      const db = wx.cloud.database();
      const common = db.collection("common");
      common.get().then((res) => {
        background.value = res.data[0].background;
      });
    });
    common_vendor.onShow(() => {
      autoplay.value = true;
    });
    common_vendor.onHide(() => {
      autoplay.value = false;
    });
    const getList = () => {
      const db = wx.cloud.database();
      const banner = db.collection("indexBanner");
      banner.get().then((res) => {
        let result = [];
        for (let i = 0; i < res.data[0].indexBanner.length; i++) {
          let show = i === 0;
          result.push({
            url: res.data[0].indexBanner[i],
            show
          });
        }
        list.value = result;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: background.value,
        b: common_vendor.p({
          list: list.value,
          isGif: isGif.value,
          autoplay: autoplay.value
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-870ab53e"], ["__file", "/data/code/wedding-invitation/src/pages/photo/index.vue"]]);
wx.createPage(MiniProgramPage);
