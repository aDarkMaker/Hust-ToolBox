// ==UserScript==
// @name        自动评教
// @namespace   
// @match       https://smartcourse.hust.edu.cn/pj/newesReception/questionnaireInfo*
// @grant       none
// @version     1.0
// @author      Orange
// @description sbhust
// ==/UserScript==
(function() {
    'use strict';

    // 等待页面加载完成
    window.addEventListener('load', function() {
        // 延迟执行，确保所有元素都已加载
        setTimeout(function() {
            addAutoEvaluationButton();
        }, 1000);
    });

    // 添加一键评价按钮
    function addAutoEvaluationButton() {
        // 检查是否为评教页面
        if (!isEvaluationPage()) {
            return;
        }

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        `;

        // 创建一键评价按钮
        const autoButton = document.createElement('button');
        autoButton.innerHTML = '⚡ 一键评价+提交';
        autoButton.style.cssText = `
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        `;

        // 创建手动提交按钮
        const manualSubmitButton = document.createElement('button');
        manualSubmitButton.innerHTML = '📝 手动提交';
        manualSubmitButton.style.cssText = `
            background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(255, 152, 0, 0.4);
            display: flex;
            align-items: center;
            gap: 6px;
        `;

        // 添加悬停效果
        autoButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.6)';
        });

        autoButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
        });

        // 手动提交按钮悬停效果
        manualSubmitButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.6)';
        });

        manualSubmitButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(255, 152, 0, 0.4)';
        });

        // 添加点击事件
        autoButton.addEventListener('click', function() {
            performAutoEvaluation();
        });

        // 手动提交按钮点击事件
        manualSubmitButton.addEventListener('click', function() {
            autoSubmit();
        });

        buttonContainer.appendChild(autoButton);
        buttonContainer.appendChild(manualSubmitButton);
        document.body.appendChild(buttonContainer);

        // 添加进度显示
        const progressDiv = document.createElement('div');
        progressDiv.id = 'evaluation-progress';
        progressDiv.style.cssText = `
            position: fixed;
            top: 140px;
            right: 20px;
            z-index: 9998;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 10px 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-size: 14px;
            color: #333;
            display: none;
            min-width: 200px;
        `;
        document.body.appendChild(progressDiv);
    }

    // 检查是否为评教页面
    function isEvaluationPage() {
        // 检查页面是否包含评教表单
        const form = document.getElementById('formId');
        const testBoxes = document.querySelectorAll('.testBox.groupTarget');
        return form && testBoxes.length > 0;
    }

    // 执行自动评教
    function performAutoEvaluation() {
        showProgress('开始自动评教...');
        
        try {
            // 获取所有选择题组
            const testBoxes = document.querySelectorAll('.testBox.groupTarget');
            let completedCount = 0;
            
            testBoxes.forEach((testBox, index) => {
                setTimeout(() => {
                    processTestBox(testBox, index + 1);
                    completedCount++;
                    
                    showProgress(`正在处理第 ${completedCount}/${testBoxes.length} 题...`);
                    
                    // 如果是最后一题，显示完成信息
                    if (completedCount === testBoxes.length) {
                        setTimeout(() => {
                            fillTextAreas();
                            showProgress('✅ 自动评教完成！正在自动提交...', 'success');
                            // 自动提交
                            setTimeout(() => {
                                autoSubmit();
                            }, 1000);
                        }, 500);
                    }
                }, index * 200); // 每题间隔200ms
            });
            
        } catch (error) {
            console.error('自动评教出错:', error);
            showProgress('❌ 自动评教出错，请手动完成', 'error');
        }
    }

    // 处理单个题目
    function processTestBox(testBox, questionNum) {
        // 查找所有单选按钮
        const radioButtons = testBox.querySelectorAll('input[type="radio"]');
        
        if (radioButtons.length > 0) {
            // 选择第一个选项（通常是最好的选项）
            const firstOption = radioButtons[0];
            
            // 模拟点击
            firstOption.checked = true;
            firstOption.click();
            
            // 触发相关事件
            const event = new Event('change', { bubbles: true });
            firstOption.dispatchEvent(event);
            
            console.log(`第 ${questionNum} 题已选择: ${firstOption.nextSibling.textContent.trim()}`);
        }
    }

    // 填写文本框（如果有的话）
    function fillTextAreas() {
        const textAreas = document.querySelectorAll('textarea');
        const defaultText = '教学质量很好，无需改进。';
        
        textAreas.forEach(textarea => {
            if (textarea.value.trim() === '') {
                textarea.value = defaultText;
                
                // 触发相关事件
                const event = new Event('input', { bubbles: true });
                textarea.dispatchEvent(event);
            }
        });
    }

    // 显示进度信息
    function showProgress(message, type = 'info') {
        const progressDiv = document.getElementById('evaluation-progress');
        if (!progressDiv) return;
        
        progressDiv.style.display = 'block';
        progressDiv.innerHTML = message;
        
        // 根据类型设置颜色
        switch (type) {
            case 'success':
                progressDiv.style.background = 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
                progressDiv.style.color = '#155724';
                progressDiv.style.border = '1px solid #c3e6cb';
                break;
            case 'error':
                progressDiv.style.background = 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
                progressDiv.style.color = '#721c24';
                progressDiv.style.border = '1px solid #f5c6cb';
                break;
            default:
                progressDiv.style.background = 'linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)';
                progressDiv.style.color = '#0c5460';
                progressDiv.style.border = '1px solid #bee5eb';
        }
        
        // 5秒后自动隐藏（除非是错误信息）
        if (type !== 'error') {
            setTimeout(() => {
                progressDiv.style.display = 'none';
            }, 5000);
        }
    }

    // 高亮提交按钮
    function highlightSubmitButton() {
        const submitButton = document.querySelector('.save');
        if (submitButton) {
            submitButton.style.cssText += `
                animation: pulse 2s infinite;
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%) !important;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.6) !important;
            `;
            
            // 添加CSS动画
            if (!document.getElementById('pulse-animation')) {
                const style = document.createElement('style');
                style.id = 'pulse-animation';
                style.textContent = `
                    @keyframes pulse {
                        0% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.6); }
                        50% { box-shadow: 0 0 30px rgba(255, 107, 107, 0.9); }
                        100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.6); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // 自动提交功能
    function autoSubmit() {
        try {
            showProgress('🔍 查找提交按钮...', 'info');
            
            // 查找提交按钮（多种可能的选择器）
            const submitButton = document.querySelector('.save');
            const submitButton2 = document.querySelector('a[onclick*="save(2)"]');
            const submitButton3 = document.querySelector('input[type="submit"]');
            const submitButton4 = document.querySelector('button[type="submit"]');
            const submitButton5 = document.querySelector('.botBtnBox .save');
            const submitButton6 = document.querySelector('a[onclick*="提交"]');
            
            const targetButton = submitButton || submitButton2 || submitButton3 || submitButton4 || submitButton5 || submitButton6;
            
            if (targetButton) {
                showProgress('🚀 正在提交评教...', 'info');
                
                // 确保所有必填项都已填写
                const requiredRadios = document.querySelectorAll('input[type="radio"][name]');
                const radioGroups = {};
                
                // 检查每个单选题组是否已选择
                requiredRadios.forEach(radio => {
                    const groupName = radio.name;
                    if (!radioGroups[groupName]) {
                        radioGroups[groupName] = false;
                    }
                    if (radio.checked) {
                        radioGroups[groupName] = true;
                    }
                });
                
                // 检查是否有未完成的题目
                const uncompletedGroups = Object.keys(radioGroups).filter(group => !radioGroups[group]);
                if (uncompletedGroups.length > 0) {
                    showProgress(`⚠️ 还有 ${uncompletedGroups.length} 题未完成，请先完成评价`, 'error');
                    return;
                }
                
                // 模拟点击提交按钮
                targetButton.click();
                
                // 等待确认弹窗出现并自动点击确定
                setTimeout(() => {
                    handleConfirmDialog();
                }, 500);

                showProgress('✅ 评教已自动提交完成！', 'success');
                
                // 3秒后隐藏进度提示
                setTimeout(() => {
                    const progressDiv = document.getElementById('evaluation-progress');
                    if (progressDiv) {
                        progressDiv.style.display = 'none';
                    }
                }, 3000);
                
            } else {
                showProgress('⚠️ 未找到提交按钮，请手动提交', 'error');
                highlightSubmitButton();
            }
            
        } catch (error) {
            console.error('自动提交出错:', error);
            showProgress('❌ 自动提交失败，请手动点击提交按钮', 'error');
            highlightSubmitButton();
        }
    }

    // 处理确认对话框
    function handleConfirmDialog() {
        try {
            // 查找确认对话框
            const confirmDialog = document.querySelector('.layui-layer-dialog');
            const confirmButton = document.querySelector('.layui-layer-btn0');
            const confirmButton2 = document.querySelector('a.layui-layer-btn0');
            const confirmButton3 = document.querySelector('.layui-layer-btn .layui-layer-btn0');
            
            if (confirmDialog && (confirmButton || confirmButton2 || confirmButton3)) {
                showProgress('🔍 检测到确认对话框，正在自动确认...', 'info');
                
                const targetConfirmButton = confirmButton || confirmButton2 || confirmButton3;
                
                // 点击确定按钮
                targetConfirmButton.click();
                
                showProgress('✅ 已自动确认提交！评教完全完成！', 'success');
                
                // 5秒后隐藏进度提示
                setTimeout(() => {
                    const progressDiv = document.getElementById('evaluation-progress');
                    if (progressDiv) {
                        progressDiv.style.display = 'none';
                    }
                }, 5000);
                
            } else {
                // 如果没有找到确认对话框，可能已经提交成功了
                console.log('未检测到确认对话框，可能已直接提交成功');
            }
            
        } catch (error) {
            console.error('处理确认对话框出错:', error);
            showProgress('⚠️ 请手动点击确认按钮完成提交', 'error');
        }
    }

    // 添加快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl + E 快捷键触发自动评教
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            if (isEvaluationPage()) {
                performAutoEvaluation();
            }
        }
    });

    console.log('🎯 自动评教脚本已加载！');
    console.log('📋 使用说明：');
    console.log('   1. 点击右上角的"⚡ 一键评价+提交"按钮（自动完成并提交）');
    console.log('   2. 或点击"📝 手动提交"按钮（仅提交，需先完成评价）');
    console.log('   3. 或使用快捷键 Ctrl + E');
    console.log('   4. 脚本会自动选择所有题目的第一个选项并自动提交');
    console.log('   5. 如果自动提交失败，会显示错误信息并高亮提交按钮');

})();
