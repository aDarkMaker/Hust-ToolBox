# Hust-Run 华中科技大学校园跑模拟工具

这是一个通过模拟 GPS 位置来完成华中科技大学校园跑步任务的工具。该工具通过数据线连接手机，模拟用户在校园内跑步的 GPS 轨迹，帮助完成体育锻炼任务。

## 功能特点

- 自动连接 Android 设备
- 支持圆形和矩形跑道轨迹生成
- 模拟真实跑步速度和轨迹
- 可配置跑步距离、速度等参数

## 系统要求

- Python 3.6 或更高版本
- Windows 系统
- ADB 工具（如未安装，请参考[ADB 安装指南](https://developer.android.com/studio/command-line/adb)）
- Android 手机（已开启开发者选项和 USB 调试）
- 华中科技大学体育应用（APK 文件应放在项目根目录）

## 安装步骤

1. 克隆或下载本项目到本地
2. 将华中科技大学体育 APK 文件放到项目根目录
3. 通过数据线连接手机和电脑
4. 在手机上允许 USB 调试授权

## 使用方法

### 第一次使用

首先需要安装应用并配置权限：

```
python Run/main.py --install
```

按照提示在手机上完成以下设置：

1. 允许应用获取位置权限
2. 在开发者选项中将"选择模拟位置信息应用"设置为"华中科技大学体育"应用

### 开始模拟跑步

```
python Run/main.py
```

默认将完成 3 公里的跑步任务，速度为 9km/h。

### 自定义参数

可以通过命令行参数自定义跑步距离和速度：

```
python Run/main.py --distance 5000 --speed 8
```

这将设置跑步距离为 5000 米，速度为 8km/h。

## 配置文件

配置文件位于`Run/config.ini`，可以修改以下参数：

- 基本设置（距离、速度、时间间隔）
- 位置设置（起点坐标、跑道类型）
- 设备连接设置（ADB 路径、设备 ID）
- 日志设置

## 注意事项

- 使用本工具前，请确保手机已正确连接到电脑
- 需要在手机上开启开发者选项和 USB 调试
- 使用过程中请保持手机屏幕处于点亮状态
- 请合理使用本工具，不要过度使用

## 免责声明

本工具仅供学习和研究使用，使用者应当遵守相关法律法规和校规校纪。作者不对因使用本工具而产生的任何问题负责。
