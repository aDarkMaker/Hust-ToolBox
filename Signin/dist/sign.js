var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { activeSign, signIn } from './requests.js';
import { config } from './consts.js';
import { QRSign } from './QRSign.js';
import { sendNotificaition, sleep } from './utils.js';
export const signOnce = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activeSign(ctx.openId)
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!data.length) {
            (_a = ctx.qrSign) === null || _a === void 0 ? void 0 : _a.destory();
            throw 'No sign-in available';
        }
        const queue = [
            ...data.filter((sign) => !sign.isQR),
            ...data.filter((sign) => sign.isQR),
        ];
        for (const sign of queue) {
            const { signId, courseId, isGPS, isQR, name } = sign;
            console.log('current sign-in:', sign.name);
            if (ctx.signedIdSet.has(signId)) {
                throw `${name} already signed in`;
            }
            sendNotificaition(`INFO: ${name} sign-in is going on!`);
            if (isQR) {
                if (signId === ctx.lastSignId) {
                    return;
                }
                ctx.lastSignId = signId;
                sendNotificaition(`WARNING: ${name} QR sign-in is going on!`);
                (_b = ctx.qrSign) === null || _b === void 0 ? void 0 : _b.destory();
                ctx.qrSign = new QRSign(ctx, { courseId, signId });
                ctx.qrSign.start().then((result) => {
                    var _a;
                    ctx.signedIdSet.add(signId);
                    console.log(`QRSign:: result`, result);
                    if (!config.devtools) {
                        const prompt = 'Signed in successfully. However, you need to submit new openid!';
                        sendNotificaition(prompt);
                        console.warn(prompt);
                        ctx.openId = '';
                    }
                    (_a = ctx.qrSign) === null || _a === void 0 ? void 0 : _a.destory();
                });
            }
            else {
                let signInQuery = { courseId, signId };
                if (isGPS) {
                    const { lat, lon } = config;
                    signInQuery = Object.assign(Object.assign({}, signInQuery), { lat, lon });
                }
                yield sleep(config.wait);
                yield signIn(ctx.openId, signInQuery)
                    .then((data) => {
                    if (!data.errorCode || data.errorCode === 305) {
                        ctx.signedIdSet.add(signId);
                    }
                    console.log(data);
                })
                    .catch((e) => {
                    console.log(e);
                    sendNotificaition(`Error: failed to ${name} sign in. See output plz.`);
                });
            }
        }
    }))
        .catch((e) => {
        console.log(e);
    });
});
