"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    formList: Array
  },
  emits: ["closeFormlist"],
  setup(__props, { emit: $emit }) {
    const close = () => {
      $emit("closeFormlist");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.formList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: common_vendor.t(item.count),
            d: item.desc
          }, item.desc ? {
            e: common_vendor.t(item.desc)
          } : {}, {
            f: index
          });
        }),
        b: common_vendor.o(close)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4806adcd"], ["__file", "/data/code/wedding-invitation/src/component/formlist.vue"]]);
wx.createComponent(Component);
