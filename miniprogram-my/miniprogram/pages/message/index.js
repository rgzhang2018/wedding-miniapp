"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
if (!Math) {
  (HVideo + HForm + HFormlist)();
}
const HVideo = () => "../../component/video.js";
const HForm = () => "../../component/form.js";
const HFormlist = () => "../../component/formlist.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    var profileSwitch = true
    var showReal = false;
    var showJoinBord = false;
    const isOpen = common_vendor.ref(false);
    const desc = common_vendor.ref("");
    const messageList = common_vendor.ref([]);
    const openId = common_vendor.ref("");
    const userInfo = common_vendor.ref(null);
    const isForm = common_vendor.ref(false);
    const isVideo = common_vendor.ref(false);
    const isFormlist = common_vendor.ref(false);
    const formList = common_vendor.ref([]);
    const url = common_vendor.ref("");
    const poster = common_vendor.ref("");
    const adminsIds = common_vendor.ref([]);
    const musicPlay = common_vendor.ref(false);
    const formRef = common_vendor.ref(null);
    const instance = common_vendor.getCurrentInstance();
    const globalData = instance.appContext.config.globalProperties.globalData;
    const isAdmin = common_vendor.computed$1(() => {
      return adminsIds.value.indexOf(openId.value) !== -1;
    });
    common_vendor.onMounted(() => {
        const db = wx.cloud.database();
        const common = db.collection("common");
        common.get().then((res) => {
          if (res.data[0].showReal === "1") {
              showReal = true;
          }
          if (res.data[0].joinBord === "1") {
            showJoinBord = true;
          }
        });
      getVideoUrl();
      isVideo.value = false;
      isForm.value = false;
      isFormlist.value = false;
      getMessageList();
    });
    const getVideoUrl = () => {
      const db = wx.cloud.database();
      const common = db.collection("common");
      common.get().then((res) => {
        url.value = res.data[0].videoUrl;
        poster.value = res.data[0].poster;
        adminsIds.value = res.data[0].adminOpenId;
      });
    };
    const toMessage = (e) => {
      if (e.target.errMsg === "getUserInfo:ok") {
        wx.getUserInfo({
          success: function(res) {
            userInfo.value = res.userInfo;
            isOpen.value = true;
            getOpenId();
          }
        });
      }
    };


    const getUserProfile = () => {
        // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '授权获取昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            userInfo.value = res.userInfo;
            isOpen.value = true;
            getOpenId();
          }
        })
      };

    const cancel = () => {
      isOpen.value = false;
    };
    const sendMessage = () => {
      if (desc.value) {
        const db = wx.cloud.database();
        const message = db.collection("message");
        message.add({
          data: {
            desc: desc.value,
            type: "message",
            time: getNowFormatDate(),
            url: userInfo.value.avatarUrl,
            name: userInfo.value.nickName
          }
        }).then((res) => {
          isOpen.value = false;
          desc.value = "";
          getMessageList();
        });
      } else {
        utils_index.showToast("\u8BF4\u70B9\u4EC0\u4E48\u5427~");
      }
    };
    const deleteMessage = (item) => {
      wx.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u8BA4\u5220\u9664\uFF1F",
        success(res) {
          if (res.confirm) {
            if (isAdmin.value) {
              wx.cloud.callFunction({
                name: "message",
                data: {
                  _id: item._id
                }
              }).then((res2) => {
                desc.value = "";
                getMessageList();
              });
            } else {
              const db = wx.cloud.database();
              const message = db.collection("message");
              message.doc(item._id).remove().then((res2) => {
                desc.value = "";
                getMessageList();
              }).catch((e) => {
                console.log(e);
              });
            }
          } else if (res.cancel)
            ;
        }
      });
    };
    const getNowFormatDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hh = now.getHours();
      const mm = now.getMinutes();
      const ss = now.getSeconds();
      let clock = year + "-";
      if (month < 10) {
        clock += "0";
      }
      clock += month + "-";
      if (day < 10) {
        clock += "0";
      }
      clock += day + " ";
      if (hh < 10) {
        clock += "0";
      }
      clock += hh + ":";
      if (mm < 10) {
        clock += "0";
      }
      clock += mm + ":";
      if (ss < 10) {
        clock += "0";
      }
      clock += ss;
      return clock;
    };
    const getMessageList = () => {
      wx.cloud.callFunction({
        name: "messageList",
        data: {}
      }).then((res) => {
        messageList.value = res.result.data.reverse();
      });
    };
    const toForm = (e) => {
      if (e.target.errMsg === "getUserInfo:ok") {
        wx.getUserInfo({
          success: function(res) {
            userInfo.value = res.userInfo;
            getOpenId("present");
          }
        });
      }
    };
    const toFormWithProfile = () => {
        wx.getUserProfile({
          desc: '授权获取昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            userInfo.value = res.userInfo;
            getOpenId("present");
          }
        })
    };

    const closeForm = () => {
      isForm.value = false;
    };
    const addUser = () => {
      const db = wx.cloud.database();
      const user = db.collection("user");
      user.add({
        data: {
          user: userInfo.value
        }
      }).then((res) => {
      });
    };
    const getOpenId = (type) => {
      wx.cloud.callFunction({
        name: "user",
        data: {}
      }).then((res) => {
        openId.value = res.result.openid;
        if (type === "present") {
          getIsPresentExist();
        } else {
          getIsExist();
        }
      });
    };
    const getIsPresentExist = () => {
      const db = wx.cloud.database();
      const present = db.collection("present");
      present.where({
        _openid: openId.value
      }).get().then((res) => {
        const formData = {
          dataFlag: false,
          _id: ""
        };
        if (res.data.length !== 0) {
          formData.name = res.data[0].name;
          formData.phone = res.data[0].phone;
          formData.count = res.data[0].count;
          formData.phoneFlag = true;
          formData._id = res.data[0]._id;
        }
        formRef.value.updateForm(formData);
        isForm.value = true;
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
        }
      });
    };
    const toVideo = () => {
      isVideo.value = true;
      musicPlay.value = false;
      if (!globalData.innerAudioContext.paused) {
        musicPlay.value = true;
        globalData.innerAudioContext.pause();
      }
    };
    const closeVideo = () => {
      isVideo.value = false;
      if (musicPlay.value) {
        globalData.innerAudioContext.play();
      }
    };
    const lookList = () => {
      isFormlist.value = true;
      getFromlist();
    };
    const closeFormlist = () => {
      isFormlist.value = false;
    };
    const getFromlist = () => {
      wx.cloud.callFunction({
        name: "presentList",
        data: {}
      }).then((res) => {
        formList.value = res.result.data.reverse().map((x) => {
          return {
            count: x.count,
            desc: x.desc,
            name: x.name,
            phone: isAdmin.value ? x.phone : x.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
            _id: x._id,
            _openid: x._openid
          };
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(messageList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.url,
            b: item._openid === openId.value || common_vendor.unref(isAdmin)
          }, item._openid === openId.value || common_vendor.unref(isAdmin) ? {} : {}, {
            c: common_vendor.o(($event) => deleteMessage(item)),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.time),
            f: common_vendor.t(item.desc),
            g: index
          });
        }),
        b: common_vendor.o(toMessage),
        c: common_vendor.o(toForm),
        profile: profileSwitch,
        userProfile: common_vendor.o(getUserProfile),
        toFormNew: common_vendor.o(toFormWithProfile),
        d: desc.value,
        e: common_vendor.o(($event) => desc.value = $event.detail.value),
        f: common_vendor.o(sendMessage),
        g: common_vendor.o(cancel),
        h: isOpen.value,
        i: url.value !== "" && url.value !== void 0
      }, url.value !== "" && url.value !== void 0 ? {
        j: common_vendor.o(toVideo)
      } : {}, {
        k: common_vendor.o(lookList),
        l: isVideo.value
      }, isVideo.value ? {
        m: common_vendor.o(closeVideo),
        n: common_vendor.p({
          url: url.value,
          poster: poster.value
        })
      } : {}, {
        o: common_vendor.sr(formRef, "716a8bf6-1", {
          "k": "formRef"
        }),
        p: common_vendor.o(closeForm),
        q: common_vendor.o(getFromlist),
        r: isForm.value,
        s: common_vendor.o(closeFormlist),
        t: common_vendor.p({
          formList: formList.value
        }),
        v: isFormlist.value,
        isok: showReal,
        joinBord: showJoinBord
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-716a8bf6"], ["__file", "/data/code/wedding-invitation/src/pages/message/index.vue"]]);
wx.createPage(MiniProgramPage);

