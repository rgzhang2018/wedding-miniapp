"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    url: String,
    poster: String
  },
  emits: ["closeVideo"],
  setup(__props, { emit: $emit }) {
    const inputValue = common_vendor.ref("");
    const danmuList = common_vendor.ref([]);
    const videoContext = common_vendor.ref(null);
    const musicPlay = common_vendor.ref(false);
    const instance = common_vendor.getCurrentInstance();
    const globalData = instance.appContext.config.globalProperties.globalData;
    common_vendor.onMounted(() => {
      getMessageList();
      videoContext.value = wx.createVideoContext("myVideo");
    });
    const play = (e) => {
      musicPlay.value = false;
      if (!globalData.innerAudioContext.paused) {
        musicPlay.value = true;
        globalData.innerAudioContext.pause();
      }
    };
    const ended = (e) => {
      if (musicPlay.value) {
        globalData.innerAudioContext.play();
      }
    };
    const bindInputBlur = (e) => {
      inputValue.value = e.detail.value;
    };
    const bindSendDanmu = () => {
      videoContext.value.sendDanmu({
        text: inputValue.value,
        color: getRandomColor()
      });
    };
    const getRandomColor = () => {
      let rgb = [];
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length === 1 ? "0" + color : color;
        rgb.push(color);
      }
      return "#" + rgb.join("");
    };
    const getMessageList = () => {
      const db = wx.cloud.database();
      const message = db.collection("message");
      message.get().then((res) => {
        let data = res.data.reverse();
        let arr = [];
        if (data.length > 0) {
          data.forEach((item, index) => {
            arr.push({
              text: item.desc,
              color: getRandomColor(),
              time: 1 + index * 2
            });
          });
          danmuList.value = arr;
        }
      });
    };
    const close = () => {
      videoContext.value.stop();
      $emit("closeVideo");
    };
    return (_ctx, _cache) => {
      return {
        a: __props.url,
        b: common_vendor.o(play),
        c: common_vendor.o(ended),
        d: danmuList.value,
        e: __props.poster,
        f: common_vendor.o(bindInputBlur),
        g: common_vendor.o(bindSendDanmu),
        h: common_vendor.o(close)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-059d39a0"], ["__file", "/data/code/wedding-invitation/src/component/video.vue"]]);
wx.createComponent(Component);
