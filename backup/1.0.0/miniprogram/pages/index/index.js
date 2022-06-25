"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
if (!Math) {
  IndexSwiper();
}
const IndexSwiper = () => "../../component/index-swiper.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const isPlaying = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const info = common_vendor.ref({});
    const autoplay = common_vendor.ref(false);
    const instance = common_vendor.getCurrentInstance();
    const globalData = instance.appContext.config.globalProperties.globalData;
    const innerAudioContext = globalData.innerAudioContext;
    const background = common_vendor.ref("");
    common_vendor.onLoad(() => {
      innerAudioContext.onEnded(onEnded);
      innerAudioContext.onPlay(onPlay);
      innerAudioContext.onPause(onPause);
      const db = wx.cloud.database();
      const common = db.collection("common");
      common.get().then((res) => {
        background.value = res.data[0].background;
        info.value = res.data[0].info;
      });
      getBannerList();
    });
    common_vendor.onShow(() => {
      autoplay.value = true;
    });
    common_vendor.onHide(() => {
      autoplay.value = false;
    });
    const audioPlay = () => {
      if (innerAudioContext.paused) {
        innerAudioContext.play();
        utils_index.showToast("\u80CC\u666F\u97F3\u4E50\u5DF2\u5F00\u542F~");
      } else {
        innerAudioContext.pause();
        utils_index.showToast("\u60A8\u5DF2\u6682\u505C\u97F3\u4E50\u64AD\u653E~");
      }
    };
    const onPlay = () => {
      isPlaying.value = true;
    };
    const onPause = () => {
      isPlaying.value = false;
    };
    const onEnded = () => {
      if (globalData.musicIndex >= globalData.musicList.length) {
        globalData.musicIndex = 0;
      }
      globalData.innerAudioContext.src = globalData.musicList[globalData.musicIndex].musicUrl;
      globalData.musicIndex += 1;
    };
    const getBannerList = () => {
      const db = wx.cloud.database();
      const banner = db.collection("banner");
      banner.get().then((res) => {
        let result = [];
        let animations = ["fadeInLeft", "slideInDown", "rotateInDownRight", "rollIn", "jackInTheBox", "flip"];
        for (let i = 0; i < res.data[0].bannerList.length; i++) {
          result.push({
            url: res.data[0].bannerList[i],
            show: i === 0,
            class: animations[i]
          });
        }
        list.value = result;
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: background.value,
        b: common_vendor.p({
          list: list.value,
          info: info.value,
          autoplay: autoplay.value
        }),
        c: isPlaying.value
      }, isPlaying.value ? {
        d: common_vendor.o(audioPlay)
      } : {
        e: common_vendor.o(audioPlay)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/data/code/wedding-invitation/src/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
