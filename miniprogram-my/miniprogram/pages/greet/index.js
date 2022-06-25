"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");

const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const userList = common_vendor.ref([]);
    const openId = common_vendor.ref("");
    const userInfo = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      getUserList();
    });
    const sendGreet = (e) => {
      if (e.target.errMsg === "getUserInfo:ok") {
        wx.getUserInfo({
          success: function(res) {
            userInfo.value = res.userInfo;
            getOpenId();
          }
        });
      }
    };
    const sendGreetWithProfile = () => {
        wx.getUserProfile({
            desc: '授权获取昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                userInfo.value = res.userInfo;
                getOpenId();
            }
        })
    };

    const getOpenId = () => {
      wx.cloud.callFunction({
        name: "user",
        data: {}
      }).then((res) => {
        openId.value = res.result.openid;
        getIsExist();
      });
    };
    const getIsExist = () => {
      const db = wx.cloud.database();
      const user = db.collection("user");
      user.where({
        _openid: openId.value
      }).get().then((res) => {
        if (res.data.length === 0) {
          addUser();
        } else {
          utils_index.showToast("\u60A8\u5DF2\u7ECF\u9001\u8FC7\u795D\u798F\u4E86~");
        }
      });
    };
    const addUser = () => {
      const db = wx.cloud.database();
      const user = db.collection("user");
      user.add({
        data: {
          user: userInfo.value
        }
      }).then((res) => {
        getUserList();
      });
    };
    const getUserList = () => {
      wx.cloud.callFunction({
        name: "userList",
        data: {}
      }).then((res) => {
        userList.value = res.result.data.reverse();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(userList.value, (item, index, i0) => {
          return {
            a: item.user.avatarUrl,
            b: common_vendor.t(item.user.nickName),
            c: index
          };
        }),
        b: common_vendor.t(userList.value.length),
        c: common_vendor.o(sendGreetWithProfile)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb435510"], ["__file", "/data/code/wedding-invitation/src/pages/greet/index.vue"]]);
wx.createPage(MiniProgramPage);
