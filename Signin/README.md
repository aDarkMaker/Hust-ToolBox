# HustLogin

为什么不能一键进行签到？

---

## 写在最前面

1. 犯了事情不要将为师供出来！！！
2. 不要将为师供出来！！！
3. 不要犯错！！！

---

## 前提条件

1. 一部手机
2. 一个 Windows 系统电脑或服务器
3. 脑子+手

---

## 快速开始

### 1. 克隆项目

```sh
git clone https://github.com/aDarkMaker/Hust-ToolBox.git
cd Hust-ToolBox/Signin
```

### 2. 安装依赖

```sh
npm install
```

或

```sh
yarn
```

### 3. 配置参数

- 修改根目录下的 `config.json`，填写你的签到参数（如经纬度、User-Agent、扫码模式等）。

### 4. 编译 TypeScript

```sh
npm run build
```

或

```sh
yarn build
```

### 5. 运行

```sh
npm start
```

或

```sh
yarn start
```

---

## OpenId 获取方法

（以下方法均发生在电脑端）

1. 打开浏览器进行一次签到活动；
2. 手快直接趁未加载完成转发连接，获取 OpenId；
3. 转发连接至微信桌面版，获取连接（成功率最高）；
4. 企业微信法据说可行，没有测试，方法同 Method 3；

---

## 配置说明（config.json 示例）

```jsonc
{
  "interval": 3000,
  "wait": 5000,
  "lat": 30.511227,
  "lon": 114.41021,
  "qr": {
    "name": "xx",
    "mode": "terminal"
  },
  "ua": "你的User-Agent字符串"
}
```

- `interval`：签到轮询间隔（毫秒）
- `wait`：每次签到等待时间（毫秒）
- `lat`/`lon`：模拟定位
- `qr.mode`：二维码展示方式（terminal/plain/copy）
- `ua`：User-Agent

---

## 目录结构

```
├── src/           # TypeScript 源码
│   ├── index.ts
│   ├── requests.ts
│   ├── sign.ts
│   ├── QRSign.ts
│   ├── cdp.ts
│   ├── consts.ts
│   └── utils.ts
├── dist/          # 编译后输出目录
├── config.json    # 配置文件（需自行填写）
├── package.json
├── tsconfig.json
└── README.md
```

---

## 免责声明

本项目仅供学习与交流，严禁用于任何违反法律法规或学校规定的用途。由此产生的一切后果与作者无关。

---
