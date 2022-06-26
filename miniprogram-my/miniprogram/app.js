"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/greet/index.js";
  "./pages/map/index.js";
  "./pages/message/index.js";
  "./pages/photo/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });

    const instance = common_vendor.getCurrentInstance();
    common_vendor.index.getSystemInfo({
      success: function(e) {
        instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight;
        if (e.platform === "android") {
          instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight + 50;
        } else {
          instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight + 45;
        }
        instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight;
        const custom = common_vendor.index.getMenuButtonBoundingClientRect();
        instance.appContext.config.globalProperties.$Custom = custom;
        instance.appContext.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
      fail: function(e) {
        console.log(e);
      }
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/data/code/wedding-invitation/src/App.vue"]]);
wx.cloud.init({
  env: "cloud1-7gwe6hko58203963"
});
let innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = true;
const globalData = {
  innerAudioContext,
  musicList: [],
  musicIndex: 1,
  animations: [
    `bounce`,
    `flash`,
    `pulse`,
    `rubberBand`,
    `shake`,
    `headShake`,
    `swing`,
    `tada`,
    `wobble`,
    `jello`,
    `bounceIn`,
    `bounceInDown`,
    `bounceInLeft`,
    `bounceInRight`,
    `bounceInUp`,
    `fadeIn`,
    `fadeInDown`,
    `fadeInDownBig`,
    `fadeInLeft`,
    `fadeInLeftBig`,
    `fadeInRight`,
    `fadeInRightBig`,
    `fadeInUp`,
    `fadeInUpBig`,
    `flipInX`,
    `flipInY`,
    `lightSpeedIn`,
    `rotateIn`,
    `rotateInDownLeft`,
    `rotateInDownRight`,
    `rotateInUpLeft`,
    `rotateInUpRight`,
    `jackInTheBox`,
    `rollIn`,
    `zoomIn`,
    `zoomInDown`,
    `zoomInLeft`,
    `zoomInRight`,
    `zoomInUp`,
    `slideInDown`,
    `slideInLeft`,
    `slideInRight`,
    `slideInUp`,
    `heartBeat`
  ]
};
const db = wx.cloud.database();
const music = db.collection("music");
music.get().then((res) => {
  console.log("init music");
  globalData.musicList = res.data;
  innerAudioContext.src = globalData.musicList[0].musicUrl;
});
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.globalData = globalData;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
