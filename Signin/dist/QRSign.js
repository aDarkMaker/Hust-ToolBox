var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import WebSocket from 'ws';
import { toString as toQR } from 'qrcode';
import { qr } from './consts.js';
import { copyToClipBoard, makeDebugLogger } from './utils.js';
const debugLogger = makeDebugLogger('QRSign::');
var QRType;
(function (QRType) {
    QRType[QRType["default"] = 0] = "default";
    QRType[QRType["code"] = 1] = "code";
    QRType[QRType["unknown"] = 2] = "unknown";
    QRType[QRType["result"] = 3] = "result";
})(QRType || (QRType = {}));
export class QRSign {
    constructor(ctx, info) {
        // fields
        this._seqId = 0;
        this.clientId = '';
        this.client = null;
        this.onError = null;
        this.onSuccess = null;
        this.currentQRUrl = '';
        this.start = () => new Promise((resolve, reject) => {
            this.startSync(resolve, reject);
        });
        this.sendMessage = (msg) => {
            var _a;
            debugLogger(`sendMessage`, msg);
            const raw = JSON.stringify(msg ? [msg] : []);
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.send(raw);
        };
        this.handleQRSubscription = (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { data } = message;
            switch (data.type) {
                case QRType.code: {
                    const { qrUrl } = data;
                    if (!qrUrl || qrUrl === this.currentQRUrl) {
                        return;
                    }
                    this.currentQRUrl = qrUrl;
                    // TODO: should devtools conflict with printer?
                    if (this.ctx.devtools) {
                        // automation via devtools
                        const result = yield this.ctx.devtools.finishQRSign(qrUrl);
                        // reset openId is mandatory, for scanning QR code triggering another oauth
                        this.ctx.openId = result.openId;
                        // race with QRType.result
                        if (result.success) {
                            (_a = this.onSuccess) === null || _a === void 0 ? void 0 : _a.call(this, result);
                        }
                    }
                    // manually print or execute command
                    switch (qr.mode) {
                        case 'terminal': {
                            toQR(this.currentQRUrl, { type: 'terminal' }).then(console.log);
                            break;
                        }
                        case 'copy': {
                            copyToClipBoard(this.currentQRUrl);
                        }
                        case 'plain': {
                            console.log(this.currentQRUrl);
                            break;
                        }
                        default:
                            break;
                    }
                    break;
                }
                case QRType.result: {
                    const { student } = data;
                    // TODO: get student info from devtools
                    if (student && student.name === this.ctx.studentName) {
                        (_b = this.onSuccess) === null || _b === void 0 ? void 0 : _b.call(this, student);
                    }
                    break;
                }
                default:
                    break;
            }
        });
        this.handleMessage = (data) => {
            try {
                const messages = JSON.parse(data);
                // heartbeat response
                if (Array.isArray(messages) && messages.length === 0) {
                    return;
                }
                const message = messages[0];
                const { channel, successful } = message;
                if (!successful) {
                    // qr subscription
                    if (QRSign.testQRSubscription(message)) {
                        debugLogger(`${channel}: successful!`);
                        this.handleQRSubscription(message);
                    }
                    else {
                        throw `${channel}: failed!`;
                    }
                }
                else {
                    debugLogger(`${channel}: successful!`);
                    switch (message.channel) {
                        case '/meta/handshake': {
                            const { clientId } = message;
                            this.clientId = clientId;
                            this.connect();
                            break;
                        }
                        case '/meta/connect': {
                            const { advice: { timeout }, } = message;
                            this.startHeartbeat(timeout);
                            this.subscribe();
                            break;
                        }
                        case '/meta/subscribe': {
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            catch (err) {
                console.error(`QR: ${err}`);
            }
        };
        this.handshake = () => this.sendMessage({
            channel: '/meta/handshake',
            version: '1.0',
            supportedConnectionTypes: [
                'websocket',
                'eventsource',
                'long-polling',
                'cross-origin-long-polling',
                'callback-polling',
            ],
            id: this.seqId,
        });
        this.connect = () => {
            this.sendMessage({
                channel: '/meta/connect',
                clientId: this.clientId,
                connectionType: 'websocket',
                id: this.seqId,
            });
        };
        this.startHeartbeat = (timeout) => {
            this.sendMessage();
            this.interval = setInterval(() => {
                this.sendMessage();
                this.connect();
            }, timeout / 2);
        };
        this.subscribe = () => this.sendMessage({
            channel: '/meta/subscribe',
            clientId: this.clientId,
            subscription: `/attendance/${this.courseId}/${this.signId}/qr`,
            id: this.seqId,
        });
        this.courseId = info.courseId;
        this.signId = info.signId;
        this.ctx = ctx;
    }
    startSync(cb, err) {
        this.onError = err !== null && err !== void 0 ? err : null;
        this.onSuccess = cb !== null && cb !== void 0 ? cb : null;
        this.client = new WebSocket(QRSign.endpoint);
        this.client.on('open', () => {
            this.handshake();
        });
        this.client.on('message', (data) => {
            debugLogger(`receiveMessage`, data);
            this.handleMessage(data.toString());
        });
        this.onError && this.client.on('error', this.onError);
    }
    destory() {
        var _a;
        if (this.interval) {
            clearInterval(this.interval);
        }
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.close();
    }
    // getters
    get seqId() {
        return `${this._seqId++}`;
    }
}
// static
QRSign.endpoint = 'wss://www.teachermate.com.cn/faye';
QRSign.testQRSubscription = (msg) => /attendance\/\d+\/\d+\/qr/.test(msg.channel);
