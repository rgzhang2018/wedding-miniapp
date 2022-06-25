"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    list: Array,
    isGif: Boolean,
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const changeFlag = common_vendor.ref(false);
    const lastIndex = common_vendor.ref(0);
    const lastRadom = common_vendor.ref(-1);
    const instance = common_vendor.getCurrentInstance();
    const globalData = instance.appContext.config.globalProperties.globalData;
    common_vendor.onHide(() => {
        console.log("swiper onHide");
    });
    const change = (val) => {
        console.log("swiper change");
      changeFlag.value = true;
    };
    const animationfinish = (val) => {
        console.log("swiper animationfinish");
      if (!changeFlag.value) {
        return;
      }
      props.list[lastIndex.value].show = false;
      props.list[val.target.current].show = true;
      let index = randomNum();
      props.list[val.target.current].class = globalData.animations[index];
      lastIndex.value = val.target.current;
      changeFlag.value = false;
    };
    const randomNum = () => {
      let minNum = 0;
      let maxNum = globalData.animations.length;
      let result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
      while (lastRadom.value === result) {
        result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
      }
      lastRadom.value = result;
      return result;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return common_vendor.e({
            a: item.show
          }, item.show ? {
            b: item.url,
            c: common_vendor.n(item.class)
          } : {}, {
            d: index
          });
        }),
        b: __props.autoplay,
        c: common_vendor.o(change),
        d: common_vendor.o(animationfinish)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2cc338a3"], ["__file", "/data/code/wedding-invitation/src/component/swiper.vue"]]);
wx.createComponent(Component);
