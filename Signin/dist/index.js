var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { question } from 'readline-sync';
import { env } from 'process';
import { checkInvaild, getStudentName } from './requests.js';
import { config } from './consts.js';
import { extractOpenId, sendNotificaition, sleep, pasteFromClipBoard, } from './utils.js';
import { WechatDevtools } from './cdp.js';
import { signOnce } from './sign.js';
const getOpenId = (_a) => __awaiter(void 0, [_a], void 0, function* ({ devtools, openIdSet }) {
    var _b, _c;
    let openId;
    if (devtools) {
        openId = yield devtools.generateOpenId();
    }
    else if ((_b = config.clipboard) === null || _b === void 0 ? void 0 : _b.paste) {
        while (true) {
            openId = extractOpenId(pasteFromClipBoard());
            if (openId) {
                if (openIdSet.has(openId)) {
                    continue;
                }
                openIdSet.add(openId);
                break;
            }
            yield sleep(config.wait);
        }
    }
    else {
        openId = extractOpenId((_c = env.OPEN_ID) !== null && _c !== void 0 ? _c : question('Paste openId or URL here: '));
    }
    if (!openId) {
        throw 'Error: invalid openId or URL';
    }
    return openId;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const ctx = {
        openId: '',
        studentName: '',
        lastSignId: 0,
        signedIdSet: new Set(),
        openIdSet: new Set(),
    };
    if (config.devtools) {
        ctx.devtools = new WechatDevtools(config.devtools);
        yield ctx.devtools.init();
    }
    for (;;) {
        try {
            if (!ctx.openId.length || (yield checkInvaild(ctx.openId))) {
                let prompt = 'Error: expired or invaild openId!';
                if (config.clipboard) {
                    prompt = `${prompt} Waiting for new openId from clipboard...`;
                }
                else if (ctx.devtools) {
                    prompt = `${prompt} Generating new openId via devtools...`;
                }
                sendNotificaition(prompt);
                console.warn(prompt);
                if (!ctx.openIdSet.has(ctx.openId)) {
                    ctx.openIdSet.add(ctx.openId);
                }
                ctx.openId = yield getOpenId(ctx);
                console.log('Applied new openId:', ctx.openId);
                ctx.studentName = yield getStudentName(ctx.openId);
                console.log(ctx.studentName);
            }
            yield signOnce(ctx);
            yield sleep(config.interval);
        }
        catch (err) {
            console.warn('Error:', err);
        }
    }
}))();
