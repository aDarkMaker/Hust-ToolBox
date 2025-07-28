import { execSync } from 'child_process';
import pkg from 'node-notifier';
const { notify } = pkg;
import { config } from './consts.js';
const placeholder = '{}';
export const copyToClipBoard = (text) => {
    var _a;
    if (!text || !((_a = config.clipboard) === null || _a === void 0 ? void 0 : _a.copy))
        return;
    const copyCmd = config.clipboard.copy;
    if (copyCmd.includes(placeholder)) {
        execSync(copyCmd.replace(placeholder, `"${text}"`));
    }
    else {
        throw 'wrong format for copyCmd!';
    }
};
export const pasteFromClipBoard = () => {
    var _a;
    if (!((_a = config.clipboard) === null || _a === void 0 ? void 0 : _a.paste)) {
        return '';
    }
    const pasteCmd = config.clipboard.paste;
    return execSync(pasteCmd).toString();
};
export const sleep = (ms) => new Promise((reslove) => {
    setTimeout(reslove, ms);
});
export const extractOpenId = (str) => { var _a; return str.length === 32 ? str : (_a = str.match('openid=(.*?)(?=&|$)')) === null || _a === void 0 ? void 0 : _a[1]; };
export const sendNotificaition = (message) => notify({ message, title: 'yatm' });
export const urlParamsToObject = (urlParams) => Object.fromEntries(new URLSearchParams(urlParams));
// verbose
export const debugLogger = (...args) => config.verbose && console.debug(...args);
export const makeDebugLogger = (prefix) => (...args) => debugLogger(prefix, ...args);
