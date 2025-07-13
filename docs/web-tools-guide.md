# 网站工具使用指南 🌐

> 本指南将详细介绍如何安装和使用 Hust-ToolBox 中的网站工具

---

## 🛠️ 前置准备

### 系统要求

- 支持的操作系统：Windows 10/11、macOS 10.14+、Linux
- 支持的浏览器：Chrome 88+、Firefox 85+、Edge 88+、Safari 14+
- 网络环境：稳定的互联网连接

### 重要提醒

⚠️ **在使用任何网站工具前，请确保已正确安装用户脚本管理器（Tampermonkey）**

---

## 🌏 浏览器扩展安装

### Chrome 浏览器 🔵

#### 方法一：Chrome 网上应用店（推荐）

1. 打开 [Chrome 网上应用店](https://chrome.google.com/webstore)
2. 搜索 `Tampermonkey` 或直接访问：
   ```
   https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
   ```
3. 点击 **"添加至 Chrome"** 按钮
4. 在弹出的确认对话框中点击 **"添加扩展程序"**
5. 安装完成后，浏览器工具栏会出现 Tampermonkey 图标 🐒

#### 方法二：离线安装（网络受限时）

1. 下载 Tampermonkey 的 `.crx` 文件
2. 打开 Chrome，输入 `chrome://extensions/`
3. 开启 **"开发者模式"**
4. 将 `.crx` 文件拖拽到扩展程序页面
5. 点击 **"添加扩展程序"** 确认安装

### Firefox 浏览器 🦊

#### 官方商店安装

1. 打开 [Firefox Add-ons](https://addons.mozilla.org/)
2. 搜索 `Tampermonkey` 或直接访问：
   ```
   https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/
   ```
3. 点击 **"添加到 Firefox"** 按钮
4. 在权限确认对话框中点击 **"添加"**
5. 安装完成后重启浏览器

#### 手动安装

1. 下载 `.xpi` 扩展文件
2. 打开 Firefox，按 `Ctrl+Shift+A` 打开扩展管理器
3. 点击齿轮图标，选择 **"从文件安装附加组件"**
4. 选择下载的 `.xpi` 文件完成安装

### Microsoft Edge 浏览器 🔷

#### Edge 扩展商店安装

1. 打开 [Microsoft Edge 扩展商店](https://microsoftedge.microsoft.com/addons)
2. 搜索 `Tampermonkey` 或直接访问：
   ```
   https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd
   ```
3. 点击 **"获取"** 按钮
4. 确认添加扩展程序
5. 安装完成后在工具栏查看图标

#### 兼容性提示

💡 Edge 浏览器也可以安装 Chrome 网上应用店的扩展：

1. 访问 Chrome 网上应用店
2. 允许来自其他商店的扩展
3. 按照 Chrome 安装步骤操作

### Safari 浏览器 🦁 (macOS)

#### App Store 安装

1. 打开 Mac App Store
2. 搜索 `Tampermonkey`
3. 点击 **"获取"** 或 **"安装"**
4. 安装完成后：
   - 打开 Safari
   - 前往 `Safari → 偏好设置 → 扩展`
   - 启用 Tampermonkey 扩展

#### 权限配置

```
Safari → 偏好设置 → 网站 → 页面内容 → Tampermonkey → 允许
```

---

## 📜 脚本安装与配置

### 安装脚本的方法

#### 方法一：直接导入（推荐）

1. 点击浏览器工具栏的 Tampermonkey 图标 🐒
2. 选择 **"管理面板"**
3. 点击 **"实用工具"** 标签
4. 在 **"从 URL 安装"** 中输入脚本地址
5. 点击 **"安装"** 按钮

#### 方法二：手动添加

1. 打开 Tampermonkey 管理面板
2. 点击 **"添加新脚本"** 按钮（+ 号）
3. 删除默认模板代码
4. 粘贴目标脚本代码
5. 按 `Ctrl+S` 保存脚本

#### 方法三：文件导入

1. 下载 `xxx.js` 脚本文件
2. 直接双击文件或拖拽到浏览器
3. Tampermonkey 会自动识别并询问是否安装
4. 点击 **"安装"** 确认

---

<div align="center">
  <b>愿这些工具能让你的学习生活更轻松 🎓</b>
  <br>
  <i>使用愉快！如有问题随时联系 Orange 🍊</i>
</div>
