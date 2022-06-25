"use strict";
var common_vendor = require("../common/vendor.js");
var utils_index = require("../utils/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  emits: ["closeForm"],
  setup(__props, { emit: $emit }) {
    const list = common_vendor.ref([
      {
        name: "\u81EA\u5DF1\u51FA\u5E2D",
        value: "\u81EA\u5DF1\u51FA\u5E2D",
        checked: true
      },
      {
        name: "\u4E24\u4EBA\u51FA\u5E2D",
        value: "\u4E24\u4EBA\u51FA\u5E2D",
        checked: false
      },
      {
        name: "\u4E09\u4EBA\u51FA\u5E2D",
        value: "\u4E09\u4EBA\u51FA\u5E2D",
        checked: false
      },
      {
        name: "\u4E09\u4EBA\u4EE5\u4E0A",
        value: "\u4E09\u4EBA\u4EE5\u4E0A",
        checked: false
      }
    ]);
    const desc = common_vendor.ref("");
    const name = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const count = common_vendor.ref("\u81EA\u5DF1\u51FA\u5E2D");
    const phoneFlag = common_vendor.ref(false);
    const _id = common_vendor.ref("");
    const instance = common_vendor.getCurrentInstance();
    const cancel = () => {
      $emit("closeForm");
    };
    const radioChange = (e) => {
      count.value = e.detail.value;
      list.value.forEach((item) => {
        if (item.name === count.value) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    };
    const submit = () => {
      if (name.value) {
        if (phoneFlag.value) {
          addPresent();
        } else {
          utils_index.showToast("\u8BF7\u6B63\u786E\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801");
        }
      } else {
        utils_index.showToast("\u8BF7\u586B\u5199\u60A8\u7684\u59D3\u540D");
      }
    };
    const checkPhone = () => {
      let reg = /^(1[3-9][0-9])\d{8}$/;
      if (phone.value.length === 11) {
        if (reg.test(phone.value)) {
          phoneFlag.value = true;
        } else {
          phoneFlag.value = false;
          utils_index.showToast("\u624B\u673A\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E");
        }
      }
    };
    const addPresent = () => {
      const db = wx.cloud.database();
      const present = db.collection("present");
      if (_id.value !== "") {
        present.doc(_id.value).update({
          data: {
            name: name.value,
            phone: phone.value,
            count: count.value,
            desc: desc.value
          },
          success: function(res) {
            name.value = "";
            phone.value = "";
            count.value = "\u81EA\u5DF1\u51FA\u5E2D";
            desc.value = "";
            $emit("closeForm");
          }
        });
      } else {
        present.add({
          data: {
            name: name.value,
            phone: phone.value,
            count: count.value,
            desc: desc.value
          }
        }).then((res) => {
          name.value = "";
          phone.value = "";
          count.value = "\u81EA\u5DF1\u51FA\u5E2D";
          desc.value = "";
          $emit("closeForm");
        });
      }
    };
    const updateForm = (formData) => {
      name.value = formData.name;
      phone.value = formData.phone;
      phoneFlag.value = formData.phoneFlag;
      _id.value = formData._id;
      list.value.forEach((item) => {
        item.checked = formData.count === item.name;
      });
    };
    Object.assign(instance.proxy, {
      updateForm
    });
    return (_ctx, _cache) => {
      return {
        a: name.value,
        b: common_vendor.o(($event) => name.value = $event.detail.value),
        c: common_vendor.o([($event) => phone.value = $event.detail.value, checkPhone]),
        d: phone.value,
        e: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.name,
            b: item.checked,
            c: common_vendor.t(item.value),
            d: index
          };
        }),
        f: common_vendor.o(radioChange),
        g: desc.value,
        h: common_vendor.o(($event) => desc.value = $event.detail.value),
        i: common_vendor.o(submit),
        j: common_vendor.o(cancel)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4313dfaf"], ["__file", "/data/code/wedding-invitation/src/component/form.vue"]]);
wx.createComponent(Component);
