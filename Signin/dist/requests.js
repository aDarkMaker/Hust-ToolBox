var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import { userAgent } from './consts.js';
const baseHeaders = {
    'User-Agent': userAgent,
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Accept-Language': 'zh-CN,en-US;qbaseHeaders=0.7,en;q=0.3',
};
const request = (url, init) => fetch(url, init).then((data) => data.json());
export const activeSign = (openId) => request('https://v18.teachermate.cn/wechat-api/v1/class-attendance/student/active_signs', {
    headers: Object.assign(Object.assign({}, baseHeaders), { openId, 'If-None-Match': '"38-djBNGTNDrEJXNs9DekumVQ"', Referrer: `https://v18.teachermate.cn/wechat-pro-ssr/student/sign?openid=${openId}` }),
    method: 'GET',
});
export const signIn = (openId, query) => request('https://v18.teachermate.cn/wechat-api/v1/class-attendance/student-sign-in', {
    headers: Object.assign(Object.assign({}, baseHeaders), { openId, Referrer: `https://v18.teachermate.cn/wechat-pro-ssr/student/sign?openid=${openId}` }),
    body: JSON.stringify(query),
    method: 'POST',
});
export const studentsRole = (openId) => request('https://v18.teachermate.cn/wechat-api/v2/students/role', {
    headers: Object.assign(Object.assign({}, baseHeaders), { openId, Referrer: `https://v18.teachermate.cn/wechat-pro/student/archive/lists?openid=${openId}` }),
    method: 'GET',
});
const studentInfo = (openId) => request('https://v18.teachermate.cn/wechat-api/v2/students', {
    headers: Object.assign(Object.assign({}, baseHeaders), { openId, Referrer: `https://v18.teachermate.cn/wechat-pro/student/edit?openid=${openId}` }),
    method: 'GET',
});
export const getStudentName = (openId) => studentInfo(openId).then((resp) => resp[0].find((item) => item.item_name === 'name').item_value);
export const checkInvaild = (openId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield studentsRole(openId);
    return 'message' in data || data.length === 0;
});
