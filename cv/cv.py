import pyperclip
from pynput import mouse, keyboard
import time
import pystray
from PIL import Image
import io
import signal
import sys
import os
from PyQt5.QtWidgets import QApplication
from PyQt5.QtGui import QIcon

def get_resource_path(relative_path):
    """获取资源的绝对路径"""
    try:
        # PyInstaller创建临时文件夹,将路径存储在_MEIPASS中
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

# 获取图标路径
ICON_PATH = get_resource_path('app.ico')

# 创建QApplication实例
app = QApplication([])
app.setWindowIcon(QIcon(ICON_PATH))

# 加载图标
try:
    icon = Image.open(ICON_PATH)
except Exception:
    # 如果加载失败，创建一个16x16的彩色图像作为备用图标
    icon = Image.new('RGBA', (16, 16), color = (0, 120, 212))

# 创建键盘控制器
keyboard_controller = keyboard.Controller()

# 创建鼠标监听器
mouse_listener = None

def on_click(x, y, button, pressed):
    """鼠标点击事件处理函数"""
    # 当鼠标中键按下时
    if button == mouse.Button.middle and pressed:
        # 获取剪贴板内容
        text = pyperclip.paste()
        if text:
            # 给用户一点时间将焦点切换到目标输入框
            time.sleep(0.1)
            # 模拟键盘输入
            keyboard_controller.type(text)

def exit_action(icon):
    """退出程序"""
    icon.stop()
    if mouse_listener:
        mouse_listener.stop()
    app.quit()
    sys.exit(0)

def setup_tray():
    """设置系统托盘"""
    menu = pystray.Menu(
        pystray.MenuItem("退出", exit_action)
    )
    tray_icon = pystray.Icon(
        "Ora-CV",
        icon,
        "Ora-CV",
        menu
    )
    return tray_icon

def main():
    # 设置Ctrl+C的信号处理
    signal.signal(signal.SIGINT, lambda x, y: exit_action(tray_icon))
    
    # 创建系统托盘图标
    global tray_icon
    tray_icon = setup_tray()
    
    # 创建并启动鼠标监听器
    global mouse_listener
    mouse_listener = mouse.Listener(on_click=on_click)
    mouse_listener.start()
    
    # 运行系统托盘
    tray_icon.run()

if __name__ == "__main__":
    main()