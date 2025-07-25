#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import subprocess
import logging
import configparser
import time
import sys

class DeviceConnector:
    """实现与Android设备的连接与通信"""
    
    def __init__(self, config_path='config.ini'):
        """初始化连接器"""
        self.logger = logging.getLogger('HustRun.DeviceConnector')
        self.config = configparser.ConfigParser()
        self.config.read(config_path, encoding='utf-8')
        
        # 获取ADB配置
        self.adb_path = self._get_adb_path()
        self.device_id = self._get_device_id()
        self.logger.info(f"ADB路径: {self.adb_path}")
        self.logger.info(f"设备ID: {self.device_id}")
    
    def _get_adb_path(self):
        """获取ADB路径，如果配置为auto则自动查找"""
        adb_path = self.config.get('Device', 'adb_path')
        
        if adb_path.lower() == 'auto':
            # 尝试从环境变量中获取
            if os.system('adb version > nul 2>&1') == 0:
                return 'adb'
            
            # 常见的ADB安装路径
            common_paths = [
                os.path.join(os.environ.get('LOCALAPPDATA', ''), 'Android', 'Sdk', 'platform-tools', 'adb.exe'),
                os.path.join(os.environ.get('ANDROID_HOME', ''), 'platform-tools', 'adb.exe'),
                os.path.join(os.environ.get('ANDROID_SDK_ROOT', ''), 'platform-tools', 'adb.exe'),
            ]
            
            for path in common_paths:
                if os.path.exists(path):
                    return path
                
            self.logger.error("无法找到ADB路径，请在config.ini中手动设置")
            sys.exit(1)
        
        return adb_path
    
    def _get_device_id(self):
        """获取设备ID，如果配置为auto则自动获取已连接的设备"""
        device_id = self.config.get('Device', 'device_id')
        
        if device_id.lower() == 'auto':
            # 获取已连接的设备列表
            try:
                result = subprocess.run(
                    [self.adb_path, 'devices'], 
                    capture_output=True, 
                    text=True, 
                    check=True
                )
                
                lines = result.stdout.strip().split('\n')[1:]  # 跳过第一行"List of devices attached"
                devices = [line.split('\t')[0] for line in lines if '\t' in line and 'device' in line]
                
                if not devices:
                    self.logger.error("未找到已连接的设备，请检查USB连接")
                    sys.exit(1)
                
                if len(devices) > 1:
                    self.logger.warning(f"发现多个设备: {devices}，将使用第一个设备")
                
                return devices[0]
                
            except subprocess.CalledProcessError as e:
                self.logger.error(f"获取设备列表失败: {e}")
                sys.exit(1)
        
        return device_id
    
    def is_connected(self):
        """检查设备是否连接"""
        try:
            result = subprocess.run(
                [self.adb_path, '-s', self.device_id, 'shell', 'echo', 'connected'], 
                capture_output=True, 
                text=True,
                check=True
            )
            return 'connected' in result.stdout
        except subprocess.CalledProcessError:
            return False
    
    def wait_for_device(self, timeout=60):
        """等待设备连接，带超时"""
        self.logger.info(f"等待设备连接，超时时间: {timeout}秒")
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            if self.is_connected():
                self.logger.info("设备已连接")
                return True
            time.sleep(1)
            
        self.logger.error(f"等待设备连接超时（{timeout}秒）")
        return False
    
    def mock_location(self, latitude, longitude, package_name='net.crigh.hzkjsport'):
        """模拟位置，使用Android的模拟位置API直接设置"""
        try:
            # 检查位置模拟权限
            self._check_mock_location_permission(package_name)
            
            # 尝试关闭GPS
            try:
                subprocess.run([
                    self.adb_path, '-s', self.device_id, 'shell',
                    'settings', 'put', 'secure', 'location_mode', '0'
                ], check=False)
            except:
                self.logger.warning("尝试关闭GPS失败，请手动关闭")
            
            # 第一种方式: 使用带特殊标志的广播
            cmd_app_mock = [
                self.adb_path, '-s', self.device_id, 'shell', 
                'am', 'broadcast',
                '-f', '0x01000000',  # FLAG_RECEIVER_INCLUDE_BACKGROUND
                '-a', 'net.crigh.hzkjsport.MOCK_LOCATION',
                '-e', 'latitude', str(latitude), 
                '-e', 'longitude', str(longitude),
                '-e', 'accuracy', '0.1',
                '-e', 'provider', 'gps',
                '-n', f'{package_name}/.receiver.LocationMockReceiver'
            ]
            
            success = False
            
            # 尝试应用特定的广播接收器方式
            try:
                self.logger.info("尝试通过应用广播接收器发送模拟位置...")
                result = subprocess.run(cmd_app_mock, check=False, capture_output=True, text=True)
                if "Broadcast completed: result=0" in result.stdout:
                    self.logger.info("应用广播接收器方式发送模拟位置成功")
                    time.sleep(1)  # 等待位置更新生效
                    success = True
                else:
                    self.logger.warning(f"应用广播接收器方式失败: {result.stdout}")
            except Exception as e:
                self.logger.warning(f"应用广播接收器方式异常: {e}")
            
            if not success:
                self.logger.warning("模拟位置失败，请确保：")
                print("\n1. 完全关闭手机GPS（不仅是定位服务）")
                print("2. 在开发者选项中正确设置模拟位置应用")
                print("3. 重启手机后再试")
                print("4. 确保应用有位置权限且设置为'始终允许'")
                if input("\n是否继续尝试？(y/n): ").lower() != 'y':
                    return False
            
            return success
            
        except Exception as e:
            self.logger.error(f"模拟位置失败: {e}")
            return False
    
    def _check_mock_location_permission(self, package_name):
        """检查应用是否有模拟位置权限"""
        try:
            # 1. 检查开发者选项是否启用
            dev_settings = subprocess.run(
                [self.adb_path, '-s', self.device_id, 'shell', 'settings', 'get', 'global', 'development_settings_enabled'],
                capture_output=True, text=True, check=True
            )
            
            if '1' not in dev_settings.stdout:
                self.logger.warning("开发者选项未启用，尝试启用...")
                subprocess.run(
                    [self.adb_path, '-s', self.device_id, 'shell', 'settings', 'put', 'global', 'development_settings_enabled', '1'],
                    check=True
                )
            
            # 2. 检查模拟位置应用设置
            mock_app = subprocess.run(
                [self.adb_path, '-s', self.device_id, 'shell', 'settings', 'get', 'secure', 'mock_location'],
                capture_output=True, text=True
            )
            
            # 如果未设置或不是目标应用
            if package_name not in mock_app.stdout and 'net.crigh.hzkjsport' not in mock_app.stdout:
                self.logger.warning("应用未设置为模拟位置应用，请在开发者选项中手动设置")
                # 显示一条提示
                print("\n请在手机的开发者选项中将'选择模拟位置信息应用'设置为'华中科技大学体育'应用\n")
                input("设置完成后按回车键继续...")
                
        except subprocess.CalledProcessError as e:
            self.logger.error(f"检查模拟位置权限失败: {e}")
            
    def install_app(self, apk_path):
        """安装APK"""
        try:
            self.logger.info(f"正在安装应用: {apk_path}")
            result = subprocess.run(
                [self.adb_path, '-s', self.device_id, 'install', '-r', apk_path],
                capture_output=True, text=True, check=True
            )
            self.logger.info("安装成功")
            return True
        except subprocess.CalledProcessError as e:
            self.logger.error(f"安装应用失败: {e.stdout}")
            return False
            
    def start_app(self, package_name='net.crigh.hzkjsport'):
        """启动应用"""
        try:
            self.logger.info(f"启动应用: {package_name}")
            subprocess.run(
                [self.adb_path, '-s', self.device_id, 'shell', 'monkey', '-p', package_name, '-c', 'android.intent.category.LAUNCHER', '1'],
                capture_output=True, check=True
            )
            return True
        except subprocess.CalledProcessError as e:
            self.logger.error(f"启动应用失败: {e}")
            return False

# 测试代码
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    connector = DeviceConnector()
    
    if connector.wait_for_device(30):
        print("设备连接成功!")
    else:
        print("设备连接失败")