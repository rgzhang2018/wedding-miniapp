"use strict";
var common_vendor = require("../common/vendor.js");
function showToast(name) {
  common_vendor.index.showToast({
    title: name,
    icon: "none",
    duration: 2e3,
    mask: true
  });
}
exports.showToast = showToast;
