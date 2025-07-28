var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CDP from 'chrome-remote-interface';
import { userAgent } from './consts.js';
import { extractOpenId, sleep, urlParamsToObject } from './utils.js';
const baseConfig = {
    port: 8000,
    local: true,
    host: '127.0.0.1',
};
const generateOpenWeixinRedirectURL = (url) => `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa153455f3ef1d9f9&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`;
export class WechatDevtools {
    constructor(options) {
        this._cdp = null;
        this.api = 'https://v18.teachermate.cn/api/v1/wechat/r';
        this.throttle = null;
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const { host, port, local } = this;
            this.cdp = yield CDP({
                host,
                port,
                local,
                target: (targets) => {
                    const target = targets[0];
                    if (target) {
                        if (target.id && !target.webSocketDebuggerUrl) {
                            target.webSocketDebuggerUrl = `ws://${this.host}:${this.port}/devtools/page/${target.id}`;
                        }
                        return target;
                    }
                    else {
                        throw new Error('No inspectable targets');
                    }
                },
            });
            const { Network, Page, Runtime } = this.cdp;
            yield Network.enable();
            yield Page.enable();
            yield this.cdp.Network.setUserAgentOverride({ userAgent });
            return this.cdp;
        });
        this.destroy = () => { var _a; return (_a = this.cdp) === null || _a === void 0 ? void 0 : _a.close(); };
        this.navigateTo = (url) => this.cdp.Page.navigate({
            url,
        });
        this.fetchNextOpenIDFromRequest = (filter = 'openid=') => this.waitForNextRequestUrl(filter).then(extractOpenId);
        this.waitForNextRequestUrl = (filter) => new Promise((resolve) => {
            const cleaner = this.cdp.Network.requestWillBeSent((params) => {
                const url = params.request.url;
                if (url.includes(filter)) {
                    this.throttle = sleep(10 * 1000);
                    cleaner();
                    resolve(url);
                }
            });
        });
        this.generateOpenId = () => __awaiter(this, void 0, void 0, function* () {
            yield this.throttle;
            this.navigateTo(generateOpenWeixinRedirectURL(`${this.api}?m=ssr_hub`));
            return this.fetchNextOpenIDFromRequest();
        });
        this.finishQRSign = (qrSignUrl) => __awaiter(this, void 0, void 0, function* () {
            yield this.throttle;
            // const url = generateOpenWeixinRedirectURL(
            //   `${this.api}?isTeacher=0&m=s_qr_sign&extra=${qrSignId}`
            // );
            this.navigateTo(qrSignUrl);
            const resultUrl = yield this.waitForNextRequestUrl('signresult?openid=');
            const result = urlParamsToObject(resultUrl.split('?').pop());
            return {
                success: result.success === '1',
                openId: result.openid,
                rank: +result.studentRank,
            };
        });
        const opt = Object.assign(Object.assign({}, baseConfig), options);
        this.host = opt.host;
        this.port = opt.port;
        this.local = opt.local;
    }
    get cdp() {
        if (!this._cdp)
            throw 'cdp: uninitialized';
        return this._cdp;
    }
    set cdp(val) {
        if (this._cdp)
            throw 'cdp: already connected';
        this._cdp = val;
    }
}
// (async () => {
//   const devtool = new WechatDevtools();
//   await devtool.init();
//   // console.log(await devtool.generateOpenId());
//   await devtool.navigateTo("");
//   await devtool.destroy();
// })();
