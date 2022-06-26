"use strict";

var controlSwitch = 0;
var argStr = '';

function getCurrentSwitchIndex() {
    console.log("getCurrentSwitchIndex:"+controlSwitch)
    return controlSwitch;
};

function setInitSwitch(str) {
    argStr = str;
    var url = argStr
    if (url.indexOf("?") != -1) {    //判断是否有参数 
        console.log("setInitSwitch url:" + url)     
        var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串      
        var strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）      
        controlSwitch = parseInt(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）   
    } else {
        console.log("setInitSwitch use default 0");
        controlSwitch = 0
    }
}

exports.getCurrentSwitchIndex = getCurrentSwitchIndex;
exports.setInitSwitch = setInitSwitch;
