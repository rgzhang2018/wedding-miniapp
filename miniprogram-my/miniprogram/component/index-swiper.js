"use strict";
var common_vendor = require("../common/vendor.js");
var myControl = require( "../common/share-control.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    list: Array,
    info: Object,
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    var myautoplay = common_vendor.ref(true);
    const props = __props;
    const showOverlay0 = common_vendor.ref(false);
    const showOverlay1 = common_vendor.ref(false);
    const showOverlay2 = common_vendor.ref(false);
    const showOverlay3 = common_vendor.ref(false);
    const showOverlay4 = common_vendor.ref(false);
    const showOverlay5 = common_vendor.ref(false);
    const changeFlag = common_vendor.ref(false);
    const lastIndex = common_vendor.ref(0);
    common_vendor.ref(-1);
    setTimeout(() => {
      showOverlay0.value = true;
    }, 1500);
    // const change = () => {
    //     changeFlag.value = true;
    // };
    const change = (val) => {
      console.log("index-swiper change:" + val.target.current + ",total:" + props.list.length);
      changeFlag.value = true;
      if (val.target.current === props.list.length-1) { // 最后一个的下一个
        myautoplay = common_vendor.ref(false);
      }
    };
    const animationfinish = (val) => {
      if (!changeFlag.value) {
        return;
      }
      showOverlay0.value = val.target.current === 0;
      showOverlay1.value = val.target.current === 1;
      showOverlay2.value = val.target.current === 2;
      showOverlay3.value = val.target.current === 3;
    //   showOverlay4.value = val.target.current === 4;
    //   showOverlay5.value = val.target.current === 5;
      props.list[lastIndex.value].show = false;
      props.list[val.target.current].show = true;
      lastIndex.value = val.target.current;
      changeFlag.value = false;
    };

    const db = wx.cloud.database();
    const common = db.collection("common");
    var titleInfo ={
    };
    common.get().then((res) => {
        titleInfo.titleName = res.data[myControl.getCurrentSwitchIndex()].titleName;
        titleInfo.titleDate = res.data[myControl.getCurrentSwitchIndex()].titleDate;
        titleInfo.titleTime = res.data[myControl.getCurrentSwitchIndex()].titleTime;
        titleInfo.titleHotel = res.data[myControl.getCurrentSwitchIndex()].titleHotel;
        titleInfo.titleDetail = res.data[myControl.getCurrentSwitchIndex()].titleDetail;
    });

    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, index, i0) => {
          return common_vendor.e({
            a: item.url,
            b: common_vendor.n(item.class),
            c: item.show,
            d: showOverlay0.value && index === 0
          }, showOverlay0.value && index === 0 ? {
            // e: common_vendor.t(__props.info.name),
            // f: common_vendor.t(__props.info.date),
            // g: common_vendor.t(__props.info.time),
            // h: common_vendor.t(__props.info.hotel),
            // i: common_vendor.t(__props.info.detail)
            e: common_vendor.t(titleInfo.titleName),
            f: common_vendor.t(titleInfo.titleDate),
            g: common_vendor.t(titleInfo.titleTime),
            h: common_vendor.t(titleInfo.titleHotel),
            i: common_vendor.t(titleInfo.titleDetail)
          } : {}, {
            j: showOverlay1.value && index === 1
          }, showOverlay1.value && index === 1 ? {} : {}, {
            k: showOverlay2.value && index === 2
          }, showOverlay2.value && index === 2 ? {} : {}, {
            l: showOverlay3.value && index === 3
          }, showOverlay3.value && index === 3 ? {} : {}, {
            m: showOverlay4.value && index === 4
          }, showOverlay4.value && index === 4 ? {} : {}, {
            n: showOverlay5.value && index === 5
          }, showOverlay5.value && index === 5 ? {} : {}, {
            o: index
          });
        }),
        // b: __props.autoplay,
        b: myautoplay,
        c: common_vendor.o(change),
        d: common_vendor.o(animationfinish),
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a14d2b84"], ["__file", "/data/code/wedding-invitation/src/component/index-swiper.vue"]]);
wx.createComponent(Component);
