// ==UserScript==
// @name SBHub验证码
// @namespace 
// @match https://pass.hust.edu.cn/cas/login
// @grant
// @version 1.0
// @author Orange
// @description sbhust
// ==/UserScript==

HTMLCanvasElement.prototype.getContext = (function (original) {
    return function (type, attributes = {}) {
        attributes.willReadFrequently = true;
        return original.call(this, type, attributes);
    };
})(HTMLCanvasElement.prototype.getContext);

(function (q) {
    typeof define == "function" && define.amd ? define(q) : q()
})(function () {
    "use strict";
    const q = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]];
    (function (D, F) {
        typeof define == "function" && define.amd ? define([], F) : typeof exports == "object" ? module.exports = F() : D.SuperGif = F()
    })(globalThis, function () {
        var D = function (a) { return a.reduce(function (e, s) { return e * 2 + s }, 0) },
            F = function (a) {
                for (var e = [], s = 7; s >= 0; s--)e.push(!!(a & 1 << s)); return e
            },
            G = function (a) {
                this.data = a, this.len = this.data.length, this.pos = 0, this.readByte = function () {
                    if (this.pos >= this.data.length) throw new Error("Attempted to read past end of stream.");
                    return a instanceof Uint8Array ? a[this.pos++] : a.charCodeAt(this.pos++) & 255
                },
                    this.readBytes = function (e) {
                        for (var s = [], n = 0; n < e; n++)s.push(this.readByte()); return s
                    },
                    this.read = function (e) { for (var s = "", n = 0; n < e; n++)s += String.fromCharCode(this.readByte()); return s },
                    this.readUnsigned = function () { var e = this.readBytes(2); return (e[1] << 8) + e[0] }
            },
            L = function (a, e) {
                for (var s = 0, n = function (p) { for (var _ = 0, C = 0; C < p; C++)e.charCodeAt(s >> 3) & 1 << (s & 7) && (_ |= 1 << C), s++; return _ },
                    o = [], v = 1 << a, x = v + 1, E = a + 1, c = [],
                    t = function () {
                        c = [], E = a + 1;
                        for (var p = 0; p < v; p++)c[p] = [p]; c[v] = [],
                            c[x] = null
                    }, u, h; ;) {
                    if (h = u, u = n(E), u === v) { t(); continue } if (u === x) break; if (u < c.length) h !== v && c.push(c[h].concat(c[u][0]));
                    else {
                        if (u !== c.length) throw new Error("Invalid LZW code.");
                        c.push(c[h].concat(c[h][0]))
                    } o.push.apply(o, c[u]),
                        c.length === 1 << E && E < 12 && E++
                } return o
            }, U = function (a, e) {
                e || (e = {});
                var s = function (t) {
                    for (var u = [], h = 0; h < t; h++)u.push(a.readBytes(3)); return u
                },
                    n = function () {
                        var t, u;
                        u = "";
                        do t = a.readByte(), u += a.read(t); while (t !== 0); return u
                    },
                    o = function () {
                        var t = {};
                        if (t.sig = a.read(3), t.ver = a.read(3), t.sig !== "GIF") throw new Error("Not a GIF file.");
                        t.width = a.readUnsigned(), t.height = a.readUnsigned();
                        var u = F(a.readByte());
                        t.gctFlag = u.shift(), t.colorRes = D(u.splice(0, 3)),
                            t.sorted = u.shift(), t.gctSize = D(u.splice(0, 3)),
                            t.bgColor = a.readByte(), t.pixelAspectRatio = a.readByte(),
                            t.gctFlag && (t.gct = s(1 << t.gctSize + 1)), e.hdr && e.hdr(t)
                    },
                    v = function (t) {
                        var u = function (i) {
                            a.readByte();
                            var y = F(a.readByte());
                            i.reserved = y.splice(0, 3), i.disposalMethod = D(y.splice(0, 3)),
                                i.userInput = y.shift(), i.transparencyGiven = y.shift(),
                                i.delayTime = a.readUnsigned(), i.transparencyIndex = a.readByte(), i.terminator = a.readByte(), e.gce && e.gce(i)
                        },
                            h = function (i) {
                                i.comment = n(), e.com && e.com(i)
                            },
                            p = function (i) {
                                a.readByte(), i.ptHeader = a.readBytes(12), i.ptData = n(), e.pte && e.pte(i)
                            },
                            _ = function (i) {
                                var y = function (f) {
                                    a.readByte(), f.unknown = a.readByte(), f.iterations = a.readUnsigned(), f.terminator = a.readByte(), e.app && e.app.NETSCAPE && e.app.NETSCAPE(f)
                                },
                                    A = function (f) {
                                        f.appData = n(), e.app && e.app[f.identifier] && e.app[f.identifier](f)
                                    };
                                switch (a.readByte(), i.identifier = a.read(8), i.authCode = a.read(3), i.identifier) { case "NETSCAPE": y(i); break; default: A(i); break }
                            },
                            C = function (i) {
                                i.data = n(), e.unknown && e.unknown(i)
                            };
                        switch (t.label = a.readByte(), t.label) {
                            case 249: t.extType = "gce", u(t); break; case 254: t.extType = "com", h(t); break; case 1: t.extType = "pte", p(t); break; case 255: t.extType = "app", _(t); break; default: t.extType = "unknown", C(t); break
                        }
                    },
                    x = function (t) {
                        var u = function (_, C) {
                            for (var i = new Array(_.length), y = _.length / C, A = function (Q, J) { var Y = _.slice(J * C, (J + 1) * C); i.splice.apply(i, [Q * C, C].concat(Y)) }, f = [0, 4, 2, 1], X = [8, 8, 4, 2], Z = 0, M = 0; M < 4; M++)for (var z = f[M]; z < y; z += X[M])A(z, Z), Z++; return i
                        };
                        t.leftPos = a.readUnsigned(), t.topPos = a.readUnsigned(), t.width = a.readUnsigned(), t.height = a.readUnsigned();
                        var h = F(a.readByte());
                        t.lctFlag = h.shift(), t.interlaced = h.shift(), t.sorted = h.shift(), t.reserved = h.splice(0, 2), t.lctSize = D(h.splice(0, 3)), t.lctFlag && (t.lct = s(1 << t.lctSize + 1)), t.lzwMinCodeSize = a.readByte(); var p = n(); t.pixels = L(t.lzwMinCodeSize, p), t.interlaced && (t.pixels = u(t.pixels, t.width)), e.img && e.img(t)
                    },
                    E = function () {
                        var t = {};
                        switch (t.sentinel = a.readByte(), String.fromCharCode(t.sentinel)) { case "!": t.type = "ext", v(t); break; case ",": t.type = "img", x(t); break; case ";": t.type = "eof", e.eof && e.eof(t); break; default: throw new Error("Unknown block: 0x" + t.sentinel.toString(16)) }t.type !== "eof" && setTimeout(E, 0)
                    },
                    c = function () {
                        o(), setTimeout(E, 0)
                    };
                c()
            },
            S = function (a) {
                var e = { vp_l: 0, vp_t: 0, vp_w: null, vp_h: null, c_w: null, c_h: null };
                for (var s in a) e[s] = a[s]; e.vp_w && e.vp_h && (e.is_vp = !0);
                var n, o, v = null, x = !1, E = null, c = null, t = null, u = null, h = null, p = null, _ = null,
                    C = !0, i = !1, y = [], A = [], f = e.gif; typeof e.auto_play > "u" && (e.auto_play = !f.getAttribute("rel:auto_play") || f.getAttribute("rel:auto_play") == "1");
                var X = e.hasOwnProperty("on_end") ? e.on_end : null, Z = e.hasOwnProperty("loop_delay") ? e.loop_delay : 0,
                    M = e.hasOwnProperty("loop_mode") ? e.loop_mode : "auto", z = e.hasOwnProperty("draw_while_loading") ? e.draw_while_loading : !0, Q = z ? e.hasOwnProperty("show_progress_bar") ? e.show_progress_bar : !0 : !1, J = e.hasOwnProperty("progressbar_height") ? e.progressbar_height : 25,
                    Y = e.hasOwnProperty("progressbar_background_color") ? e.progressbar_background_color : "rgba(255,255,255,0.4)", f1 = e.hasOwnProperty("progressbar_foreground_color") ? e.progressbar_foreground_color : "rgba(255,0,22,.8)",
                    t1 = function () {
                        E = null, c = null, h = t, t = null, p = null
                    },
                    r1 = function () {
                        try { U(n, h1) } catch { $("parse") }
                    },
                    a1 = function (r, l) {
                        T.width = r * w(), T.height = l * w(), H.style.minWidth = r * w() + "px", b.width = r, b.height = l, b.style.width = r + "px", b.style.height = l + "px",
                            b.getContext("2d").setTransform(1, 0, 0, 1, 0, 0)
                    },
                    d1 = function (r, l) {
                        if (!A[r]) { A[r] = l; return } typeof l.x < "u" && (A[r].x = l.x), typeof l.y < "u" && (A[r].y = l.y)
                    },
                    n1 = function (r, l, g) {
                        if (g && Q) {
                            var d = J, B, P, O, R;
                            e.is_vp ? i ? (O = (e.vp_t + e.vp_h - d) / w(), d = d / w(), B = e.vp_l / w(), P = B + r / l * (e.vp_w / w()), R = T.width / w())
                                : (O = e.vp_t + e.vp_h - d, d = d, B = e.vp_l, P = B + r / l * e.vp_w, R = T.width) : (O = (T.height - d) / (i ? w() : 1), P = r / l * T.width / (i ? w() : 1), R = T.width / (i ? w() : 1), d /= i ? w() : 1), m.fillStyle = Y, m.fillRect(P, O, R - P, d), m.fillStyle = f1, m.fillRect(0, O, P, d)
                        }
                    },
                    $ = function (r) {
                        var l = function () {
                            m.fillStyle = "black", m.fillRect(0, 0, e.c_w ? e.c_w : o.width, e.c_h ? e.c_h : o.height), m.strokeStyle = "red", m.lineWidth = 3, m.moveTo(0, 0), m.lineTo(e.c_w ? e.c_w : o.width, e.c_h ? e.c_h : o.height), m.moveTo(0, e.c_h ? e.c_h : o.height), m.lineTo(e.c_w ? e.c_w : o.width, 0), m.stroke()
                        };
                        v = r, o = { width: f.width, height: f.height }, y = [], l()
                    },
                    c1 = function (r) {
                        o = r, a1(o.width, o.height)
                    },
                    p1 = function (r) {
                        o1(), t1(), E = r.transparencyGiven ? r.transparencyIndex : null, c = r.delayTime, t = r.disposalMethod
                    },
                    o1 = function () {
                        p && (y.push({ data: p.getImageData(0, 0, o.width, o.height), delay: c }), A.push({ x: 0, y: 0 }))
                    },
                    v1 = function (r) {
                        p || (p = p = b.getContext("2d", { willReadFrequently: true }));
                        var l = y.length, g = r.lctFlag ? r.lct : o.gct; l > 0 && (h === 3 ? u !== null ? p.putImageData(y[u].data, 0, 0) : p.clearRect(_.leftPos, _.topPos, _.width, _.height) : u = l - 1, h === 2 && p.clearRect(_.leftPos, _.topPos, _.width, _.height));
                        var d = p.getImageData(r.leftPos, r.topPos, r.width, r.height);
                        r.pixels.forEach(function (B, P) {
                            B !== E && (d.data[P * 4 + 0] = g[B][0], d.data[P * 4 + 1] = g[B][1], d.data[P * 4 + 2] = g[B][2], d.data[P * 4 + 3] = 255)
                        }),
                            p.putImageData(d, r.leftPos, r.topPos), i || (m.scale(w(), w()), i = !0), z && (m.drawImage(b, 0, 0), z = e.auto_play), _ = r
                    },
                    N = function () {
                        var r = -1, l = 0, g = function () {
                            var I = 1; return (r + I + y.length) % y.length
                        },
                            d = function (I) {
                                r = r + I, P()
                            },
                            B = function () {
                                var I = !1, g1 = function () { X !== null && X(f), l++, M !== !1 || l < 0 ? e1() : (I = !1, C = !1) }, e1 = function () {
                                    if (I = C, !!I) {
                                        d(1); var W = y[r].delay * 10; W || (W = 100);
                                        var y1 = g(); y1 === 0 ? (W += Z, setTimeout(g1, W)) : setTimeout(e1, W)
                                    }
                                }; return function () {
                                    I || setTimeout(e1, 0)
                                }
                            }(),
                            P = function () {
                                var I;
                                r = parseInt(r, 10), r > y.length - 1 && (r = 0), r < 0 && (r = 0), I = A[r], b.getContext("2d").putImageData(y[r].data, I.x, I.y), m.globalCompositeOperation = "copy", m.drawImage(b, 0, 0)
                            },
                            O = function () {
                                C = !0, B()
                            },
                            R = function () { C = !1 };
                        return {
                            init: function () {
                                v || (e.c_w && e.c_h || m.scale(w(), w()), e.auto_play ? B() : (r = 0, P()))
                            },
                            step: B, play: O, pause: R, playing: C, move_relative: d, current_frame: function () {
                                return r
                            },
                            length: function () {
                                return y.length
                            },
                            move_to: function (I) {
                                r = I, P()
                            }
                        }
                    }(),
                    i1 = function (r) {
                        n1(n.pos, n.data.length, r)
                    },
                    s1 = function () { },
                    j = function (r, l) {
                        return function (g) {
                            r(g), i1(l)
                        }
                    },
                    h1 = {
                        hdr: j(c1), gce: j(p1), com: j(s1), app: { NETSCAPE: j(s1) }, img: j(v1, !0), eof: function (r) {
                            o1(), i1(!1), e.c_w && e.c_h || (T.width = o.width * w(), T.height = o.height * w()), N.init(), x = !1, K && K(f)
                        }
                    },
                    u1 = function () {
                        var r = f.parentNode, l = document.createElement("div");
                        T = document.createElement("canvas"), m = T.getContext("2d", { willReadFrequently: true }), H = document.createElement("div"), b = document.createElement("canvas"), l.width = T.width = f.width, l.height = T.height = f.height, H.style.minWidth = f.width + "px", l.className = "jsgif", H.className = "jsgif_toolbar", l.appendChild(T), l.appendChild(H), r.insertBefore(l, f), r.removeChild(f), e.c_w && e.c_h && a1(e.c_w, e.c_h), k = !0
                    },
                    w = function () {
                        var r;
                        return e.max_width && o && o.width > e.max_width ? r = e.max_width / o.width : r = 1, r
                    }, T, m, H, b, k = !1, K = !1, l1 = function (r) {
                        return x ? !1 : (r ? K = r : K = !1, x = !0, y = [], t1(), u = null, h = null, p = null, _ = null, !0)
                    };
                return {
                    play: N.play, pause: N.pause, move_relative: N.move_relative, move_to: N.move_to, get_playing: function () {
                        return C
                    },
                    get_canvas: function () {
                        return T
                    },
                    get_canvas_scale: function () {
                        return w()
                    },
                    get_loading: function () {
                        return x
                    },
                    get_auto_play: function () {
                        return e.auto_play
                    },
                    get_length: function () {
                        return N.length()
                    },
                    get_current_frame: function () {
                        return N.current_frame()
                    },
                    load_url: function (r, l) {
                        if (l1(l)) {
                            var g = new XMLHttpRequest;
                            g.open("GET", r, !0), "overrideMimeType" in g ? g.overrideMimeType("text/plain; charset=x-user-defined") : "responseType" in g ? g.responseType = "arraybuffer" : g.setRequestHeader("Accept-Charset", "x-user-defined"), g.onloadstart = function () { k || u1() }, g.onload = function (d) {
                                this.status != 200 && $("xhr - response"), "response" in this || (this.response = new VBArray(this.responseText).toArray().map(String.fromCharCode).join(""));
                                var B = this.response; B.toString().indexOf("ArrayBuffer") > 0 && (B = new Uint8Array(B)), n = new G(B), setTimeout(r1, 0)
                            },
                                g.onprogress = function (d) {
                                    d.lengthComputable && n1(d.loaded, d.total, !0)
                                },
                                g.onerror = function () { $("xhr") }, g.send()
                        }
                    },
                    load: function (r) {
                        this.load_url(f.getAttribute("rel:animated_src") || f.src, r)
                    },
                    load_raw: function (r, l) { l1(l) && (k || u1(), n = new G(r), setTimeout(r1, 0)) }, set_frame_offset: d1
                }
            };
        return S
    });
    const V = new window.SuperGif({
        gif: document.querySelector("#codeImage"),
        ctx_options: { willReadFrequently: true }
    });
    V.load(() => {
        const D = Array.from({ length: V.get_length() }).map((S, a) => (V.move_to(a), V.get_canvas().toDataURL("image/jpeg"))), F = [], G = [], L = document.createElement("canvas"); L.width = "90", L.height = "58"; const U = L.getContext("2d", { willReadFrequently: true }); D.forEach(S => {
            const a = document.createElement("img");
            a.src = S; let e;
            F.push(new Promise(s => { e = s })), a.onload = () => {
                U.drawImage(a, 0, 0); const s = U.getImageData(0, 0, 90, 58), n = [];
                for (let o = 0; o < s.data.length; o += 4).3 * s.data[o] + .59 * s.data[o + 1] + .11 * s.data[o + 2] < 200 ? n.push(0) : n.push(255); G.push(n), e()
            }
        }),
            Promise.all(F).then(() => {
                const S = U.getImageData(0, 0, 90, 58);
                for (let n = 0; n < G[0].length; n++) {
                    let o = 0; for (let v = 0; v < 4; v++)G[v][n] === 0 && o++; o > 1 ? S.data[4 * n] = S.data[4 * n + 1] = S.data[4 * n + 2] = 0 : S.data[4 * n] = S.data[4 * n + 1] = S.data[4 * n + 2] = 255
                }
                U.putImageData(S, 0, 0);
                const a = [], e = [0, 22, 43, 65];
                for (let n = 0; n < 4; n++) {
                    const o = U.getImageData(e[n], 17, 17, 20), v = []; for (let x = 0; x < o.data.length; x += 4)v.push(o.data[x] === 0 ? 0 : 1); a.push(v)
                }
                const s = [];
                for (let n = 0; n < a.length; n++) {
                    s[n] = { number: 0, value: -1 / 0, history: [] };
                    for (let o = 0; o < 10; o++) {
                        const v = q[o]; let x = 0; for (let E = 0; E < v.length; E += 17) {
                            let c = 0, t = 0; for (let u = 0; u < 17; u++)v[E + u] === 0 && c++, a[n][E + u] === 0 && t++; c - t === 0 && x++
                        }
                        s[n].history.push(x), x > s[n].value && (s[n].value = x, s[n].number = o)
                    }
                } document.querySelector("#code").value = s.map(n => n.number).join("")
            })
    })


});