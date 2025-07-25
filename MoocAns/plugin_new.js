// ==UserScript==
// @name         MOOC答题助手优化版
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  基于EduQuest API的MOOC自动答题脚本，优化版支持逐题处理
// @author       Orange
// @match        https://www.icourse163.org/spoc/learn/*
// @match        https://www.icourse163.org/learn/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 配置选项
    const config = {
        autoAnswer: true,
        highlightAnswers: true,
        showAnswerInfo: true,
        debugMode: false,
        // EduQuest API配置
        eduquestToken: 'qqqqq',
        eduquestBaseUrl: 'http://api.wkexam.com',
        apiTimeout: 15000,
        // 答题延迟配置
        answerDelay: 2000,
        requestInterval: 1000,
        // 多选题分步选择配置
        stepwiseMultipleChoice: true,
        stepDelayMin: 200,
        stepDelayMax: 500,
        humanLikeDelay: true
    };

    // 工具函数
    const utils = {
        // 延迟函数
        delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

        // 清理文本
        cleanText: (text) => {
            return text.trim().replace(/\s+/g, ' ');
        },

        // 创建样式
        createStyles: () => {
            GM_addStyle(`
                :root {
                --primary-color: #007BFF;
                --secondary-color: #6C757D;
                --success-color: #28A745;
                --error-color: #DC3545;
                --background-color: #F8F9FA;
                --border-radius: 8px;
                --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .mooc-answer-highlight {
                background-color: #D9ECFF !important;
                border: 2px solid var(--primary-color) !important;
                border-radius: var(--border-radius) !important;
                box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
                transition: all 0.3s ease;
            }

            .mooc-answer-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 320px;
                background: var(--background-color);
                border: 1px solid #C2D6FF;
                border-radius: var(--border-radius);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                font-family: var(--font-family);
                overflow: hidden;
                transform: translateZ(0);
            }

            .mooc-answer-panel.dragging {
                opacity: 0.8;
                transition: none;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
            }

            .mooc-panel-header {
                background: linear-gradient(90deg, var(--primary-color), #0088FF);
                color: white;
                padding: 14px 18px;
                border-radius: var(--border-radius) var(--border-radius) 0 0;
                font-weight: 600;
                font-size: 17px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
                user-select: none;
            }

            .mooc-panel-content {
                padding: 16px;
                background: rgba(248, 250, 255, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .mooc-btn {
                background: linear-gradient(145deg, var(--primary-color), #0088FF);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: var(--border-radius);
                cursor: pointer;
                margin: 8px 0;
                font-size: 15px;
                font-weight: 600;
                box-shadow: 0 4px 8px rgba(0, 123, 255, 0.25);
                transition: all 0.2s ease;
                width: 80%;
                text-align: center;
                display: block;
            }

            .mooc-btn:hover {
                background: linear-gradient(145deg, #0055EE, #0077EE);
                box-shadow: 0 6px 12px rgba(0, 123, 255, 0.35);
                transform: translateY(-2px);
            }

            .mooc-btn:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
            }

            .mooc-btn:disabled {
                background: linear-gradient(145deg, #A0A0A0, #B0B0B0);
                color: #E0E0E0;
                box-shadow: none;
                cursor: not-allowed;
                transform: none;
            }

            .mooc-status {
                margin: 12px 0;
                padding: 12px;
                border-radius: var(--border-radius);
                font-size: 14px;
                box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
            }

            .mooc-status.success {
                background: linear-gradient(145deg, #D4EDDA, #E8F5E9);
                color: #155724;
                border: 1px solid #C3E6CB;
            }

            .mooc-status.error {
                background: linear-gradient(145deg, #F8D7DA, #FFEBEE);
                color: #721C24;
                border: 1px solid #F5C6CB;
            }

            .mooc-status.info {
                background: linear-gradient(145deg, #D1ECF1, #E3F2FD);
                color: #0C5460;
                border: 1px solid #BEE5EB;
            }

            .mooc-answer-display {
                background: #F8F9FA;
                border: 1px solid #DEE2E6;
                border-radius: var(--border-radius);
                padding: 12px;
                margin: 8px 0;
                font-size: 14px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            }

            .mooc-question-counter {
                font-size: 13px;
                color: var(--secondary-color);
                margin: 8px 0;
                padding: 8px;
                background: #F0F7FF;
                border-radius: var(--border-radius);
                text-align: center;
            }

            .mooc-progress-bar {
                height: 6px;
                background: #E0E0E0;
                border-radius: 3px;
                margin: 12px 0;
                overflow: hidden;
            }

            .mooc-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--success-color), #8BC34A);
                border-radius: 3px;
                transition: width 0.3s ease;
            }

            .mooc-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .mooc-close-btn:hover {
                opacity: 1;
            }
            `);
        }
    };

    const api = {
        // 检测题目类型（单选/多选）
        detectQuestionType(options) {
            if (!options || options.length === 0) {
                return { type: 'unknown', isMultiple: false };
            }

            const hasCheckbox = options.some(opt => opt.input && opt.input.type === 'checkbox');
            const hasRadio = options.some(opt => opt.input && opt.input.type === 'radio');

            if (hasCheckbox) {
                return { type: 'multiple', isMultiple: true };
            } else if (hasRadio) {
                return { type: 'single', isMultiple: false };
            } else {
                return {
                    type: options.length > 4 ? 'multiple' : 'single',
                    isMultiple: options.length > 4
                };
            }
        },

        // 调用EduQuest API获取答案
        async searchAnswerWithEduQuest(question, options = []) {
            if (!config.eduquestToken) {
                return {
                    success: false,
                    message: 'EduQuest API token未配置'
                };
            }

            const questionTypeInfo = this.detectQuestionType(options);
            console.log(`[EduQuest] 题目类型: ${questionTypeInfo.type} (多选: ${questionTypeInfo.isMultiple})`);

            return new Promise((resolve) => {
                const cleanQuestion = question.trim();
                const apiUrl = `${config.eduquestBaseUrl}/api/?token=${config.eduquestToken}&q=${encodeURIComponent(cleanQuestion)}`;

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: apiUrl,
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    timeout: config.apiTimeout,
                    onload: function(response) {
                        try {
                            if (response.status !== 200) {
                                throw new Error(`HTTP状态码: ${response.status}`);
                            }

                            const data = JSON.parse(response.responseText);
                            if (data.code === 1 && data.data) {
                                let answer = data.data.answer || data.data;
                                if (typeof data.data === 'string') {
                                    answer = data.data;
                                }

                                answer = answer.toString().trim();
                                let answers = [];
                                
                                if (questionTypeInfo.isMultiple) {
                                    if (answer.includes('||')) {
                                        answers = answer.split('||').map(a => a.trim()).filter(a => a);
                                    } else if (answer.includes('|')) {
                                        answers = answer.split('|').map(a => a.trim()).filter(a => a);
                                    } else if (answer.includes('；')) {
                                        answers = answer.split('；').map(a => a.trim()).filter(a => a);
                                    } else if (answer.includes(';')) {
                                        answers = answer.split(';').map(a => a.trim()).filter(a => a);
                                    } else if (answer.includes('，')) {
                                        answers = answer.split('，').map(a => a.trim()).filter(a => a);
                                    } else if (answer.includes(',')) {
                                        answers = answer.split(',').map(a => a.trim()).filter(a => a);
                                    } else {
                                        answers = [answer];
                                    }
                                } else {
                                    answers = [answer];
                                }

                                // 验证答案是否在选项中
                                if (options && options.length > 0) {
                                    const optionTexts = options.map(opt => opt.text.replace(/^[A-Z][\.\:：]\s*/, '').trim());
                                    const validAnswers = [];

                                    for (const ans of answers) {
                                        const cleanAns = ans.replace(/^[A-Z][\.\:：]\s*/, '').trim();
                                        const isValid = optionTexts.some(optText =>
                                            optText.toLowerCase() === cleanAns.toLowerCase() ||
                                            optText.toLowerCase().includes(cleanAns.toLowerCase()) ||
                                            cleanAns.toLowerCase().includes(optText.toLowerCase())
                                        );

                                        if (isValid) validAnswers.push(cleanAns);
                                    }

                                    // 智能匹配：选择包含答案关键词最多的选项
                                    if (validAnswers.length === 0) {
                                        for (const ans of answers) {
                                            const ansKeywords = ans.toLowerCase().replace(/[，,。.；;！!？?\s]/g, '').split('');
                                            let bestMatch = null;
                                            let bestScore = 0;

                                            for (const optText of optionTexts) {
                                                let score = 0;
                                                for (const keyword of ansKeywords) {
                                                    if (optText.toLowerCase().includes(keyword)) score++;
                                                }
                                                if (score > bestScore) {
                                                    bestMatch = optText;
                                                    bestScore = score;
                                                }
                                            }
                                            if (bestMatch && bestScore > 0) validAnswers.push(bestMatch);
                                        }
                                    }

                                    // 兜底：使用第一个选项
                                    if (validAnswers.length === 0 && optionTexts.length > 0) {
                                        validAnswers.push(optionTexts[0]);
                                    }

                                    answers = validAnswers;
                                }

                                const finalAnswer = answers.length === 1 ? answers[0] : answers;
                                resolve({
                                    success: true,
                                    data: {
                                        question: question,
                                        answer: finalAnswer,
                                        answers: answers,
                                        type: questionTypeInfo.isMultiple ? 1 : 0,
                                        isMultiple: questionTypeInfo.isMultiple,
                                        explanation: questionTypeInfo.isMultiple ? 'EduQuest题库(多选)' : 'EduQuest题库(单选)',
                                        source: 'eduquest'
                                    }
                                });
                            } else {
                                const errorMsg = data.msg || data.message || '未找到答案';
                                resolve({
                                    success: false,
                                    message: `EduQuest API: ${errorMsg}`
                                });
                            }
                        } catch (error) {
                            resolve({
                                success: false,
                                message: `EduQuest API响应解析失败: ${error.message}`
                            });
                        }
                    },
                    onerror: function(error) {
                        resolve({
                            success: false,
                            message: 'EduQuest API请求失败'
                        });
                    },
                    ontimeout: function() {
                        resolve({
                            success: false,
                            message: 'EduQuest API请求超时'
                        });
                    }
                });
            });
        },

        // 搜索答案
        async searchAnswer(question, options = []) {
            return await this.searchAnswerWithEduQuest(question, options);
        }
    };

    // 问题检测模块
    const questionDetector = {
        // 获取所有选择题
        getChoiceQuestions() {
            const questions = [];
            const questionElements = document.querySelectorAll('.m-choiceQuestion.u-questionItem');

            questionElements.forEach((element, index) => {
                const titleElement = element.querySelector('.qaDescription .j-richTxt');
                if (titleElement && titleElement.textContent.trim()) {
                    const questionText = utils.cleanText(titleElement.textContent);

                    const optionInputs = element.querySelectorAll('.j-choicebox input[type="radio"], .j-choicebox input[type="checkbox"]');
                    const options = [];

                    optionInputs.forEach((input) => {
                        const label = element.querySelector(`label[for="${input.id}"]`);
                        if (label) {
                            const optionTextElement = label.querySelector('.optionCnt p') ||
                                                    label.querySelector('.optionCnt') ||
                                                    label;
                            const optionText = utils.cleanText(optionTextElement.textContent);
                            options.push({
                                input: input,
                                text: optionText,
                                element: label
                            });
                        }
                    });

                    questions.push({
                        type: 'choice',
                        index: index,
                        element: element,
                        question: questionText,
                        options: options
                    });
                }
            });

            return questions;
        },

        // 获取所有填空题
        getFillBlankQuestions() {
            const questions = [];
            const questionElements = document.querySelectorAll('.m-FillBlank');

            questionElements.forEach((element, index) => {
                const titleElement = element.querySelector('.qaDescription .j-richTxt') ||
                                   element.querySelector('.j-richTxt');
                if (titleElement && titleElement.textContent.trim()) {
                    const questionText = utils.cleanText(titleElement.textContent);
                    const inputs = element.querySelectorAll('input[type="text"], textarea');
                    questions.push({
                        type: 'fillblank',
                        index: index,
                        element: element,
                        question: questionText,
                        inputs: Array.from(inputs)
                    });
                }
            });
            return questions;
        },

        // 获取作业题目
        getHomeworkQuestions() {
            const questions = [];
            const questionElements = document.querySelectorAll('.f-richEditorText.j-richTxt.f-fl');

            questionElements.forEach((element, index) => {
                if (element.textContent.trim()) {
                    const questionText = utils.cleanText(element.textContent);
                    questions.push({
                        type: 'homework',
                        index: index,
                        element: element,
                        question: questionText
                    });
                }
            });
            return questions;
        }
    };

    // 答案处理模块
    const answerHandler = {
        // 处理选择题答案
        async handleChoiceQuestion(questionData, apiResult) {
            if (!apiResult.success || !apiResult.data.answer) {
                this.showQuestionError(questionData, '未找到答案');
                return false;
            }

            const answerData = apiResult.data;
            const questionTypeInfo = api.detectQuestionType(questionData.options);
            let answersToMatch = [];
            
            if (answerData.isMultiple && Array.isArray(answerData.answers)) {
                answersToMatch = answerData.answers;
            } else if (Array.isArray(answerData.answer)) {
                answersToMatch = answerData.answer;
            } else {
                answersToMatch = [answerData.answer];
            }

            // 二次验证
            const optionTexts = questionData.options.map(opt => opt.text.replace(/^[A-Z][\.\:：]\s*/, '').trim());
            const validatedAnswers = [];
            
            for (const ans of answersToMatch) {
                const isValid = optionTexts.some(optText =>
                    optText.toLowerCase() === ans.toLowerCase() ||
                    optText.toLowerCase().includes(ans.toLowerCase()) ||
                    ans.toLowerCase().includes(optText.toLowerCase())
                );
                if (isValid) validatedAnswers.push(ans);
            }

            // 兜底
            if (validatedAnswers.length === 0 && optionTexts.length > 0) {
                validatedAnswers.push(optionTexts[0]);
            }

            answersToMatch = validatedAnswers;

            // 匹配并选择答案
            const selectedOptions = [];
            for (const targetAnswer of answersToMatch) {
                const matchedOption = this.findMatchingOption(questionData.options, targetAnswer);
                if (matchedOption) selectedOptions.push(matchedOption);
            }

            if (selectedOptions.length === 0 && questionData.options.length > 0) {
                selectedOptions.push(questionData.options[0]);
            }

            // 验证选择逻辑
            if (!questionTypeInfo.isMultiple && selectedOptions.length > 1) {
                selectedOptions.splice(1);
            }

            // 延迟答题
            if (config.answerDelay > 0) {
                await utils.delay(config.answerDelay);
            }

            // 自动选择答案
            if (config.autoAnswer) {
                // 清除已选选项
                if (questionTypeInfo.isMultiple) {
                    questionData.options.forEach(option => {
                        if (option.input.checked) {
                            option.input.checked = false;
                            option.input.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    });
                    await utils.delay(200);
                }

                // 分步选择模式
                if (questionTypeInfo.isMultiple && selectedOptions.length > 1 && config.stepwiseMultipleChoice) {
                    for (let i = 0; i < selectedOptions.length; i++) {
                        const option = selectedOptions[i];
                        if (!option.input.checked) {
                            option.input.focus();
                            if (config.humanLikeDelay) await utils.delay(30 + Math.random() * 50);
                            option.input.checked = true;
                            option.input.dispatchEvent(new Event('change', { bubbles: true }));
                            option.input.dispatchEvent(new Event('click', { bubbles: true }));
                        }

                        // 视觉反馈
                        if (config.highlightAnswers) {
                            option.element.style.backgroundColor = '#d4edda';
                            option.element.style.border = '2px solid #28a745';
                        }

                        // 选项间延迟
                        if (i < selectedOptions.length - 1) {
                            const stepDelay = config.humanLikeDelay
                                ? config.stepDelayMin + Math.random() * (config.stepDelayMax - config.stepDelayMin)
                                : config.stepDelayMin;
                            await utils.delay(stepDelay);
                        }
                    }
                } else {
                    // 直接选择
                    for (const option of selectedOptions) {
                        option.input.checked = true;
                        option.input.dispatchEvent(new Event('change', { bubbles: true }));
                        option.input.dispatchEvent(new Event('click', { bubbles: true }));

                        if (config.highlightAnswers) {
                            option.element.style.backgroundColor = '#d4edda';
                            option.element.style.border = '2px solid #28a745';
                        }
                    }
                }
            }

            // 显示答案信息
            if (config.showAnswerInfo) {
                this.showQuestionAnswer(questionData, answerData, selectedOptions);
            }

            return true;
        },

        // 查找匹配的选项
        findMatchingOption(options, targetAnswer) {
            if (!targetAnswer || !options || options.length === 0) return null;
            const cleanTarget = targetAnswer.toString().trim();

            for (const option of options) {
                const optionText = option.text;
                const cleanOptionText = optionText.replace(/^[A-Z][\.\:：]\s*/, '').trim();

                // 精确匹配
                if (cleanOptionText.toLowerCase() === cleanTarget.toLowerCase()) return option;
                // 去标点匹配
                if (cleanOptionText.replace(/[，,。.；;！!？?\s]/g, '').toLowerCase() ===
                    cleanTarget.replace(/[，,。.；;！!？?\s]/g, '').toLowerCase()) return option;
                // 包含匹配
                if (cleanOptionText.toLowerCase().includes(cleanTarget.toLowerCase())) return option;
                if (cleanTarget.toLowerCase().includes(cleanOptionText.toLowerCase()) && cleanOptionText.length >= 2) return option;
            }
            return null;
        },

        // 处理填空题答案
        async handleFillBlankQuestion(questionData, apiResult) {
            if (!apiResult.success || !apiResult.data.answer) {
                this.showQuestionError(questionData, '未找到答案');
                return false;
            }

            const answers = apiResult.data.answer.split(/[,，;；\/\\|]/);
            if (config.answerDelay > 0) await utils.delay(config.answerDelay);

            questionData.inputs.forEach((input, index) => {
                if (answers[index] && config.autoAnswer) {
                    input.value = answers[index].trim();
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            if (config.showAnswerInfo) {
                this.showQuestionAnswer(questionData, apiResult.data);
            }

            return true;
        },

        // 显示问题答案
        showQuestionAnswer(questionData, answerData, selectedOptions = []) {
            const existingAnswer = questionData.element.querySelector('.mooc-answer-display');
            if (existingAnswer) existingAnswer.remove();

            const sourceText = '📚 EduQuest题库';
            const typeText = answerData.isMultiple ? '(多选题)' : '(单选题)';
            let answerText = Array.isArray(answerData.answers) ? answerData.answers.join(', ') : answerData.answer;

            const answerDiv = document.createElement('div');
            answerDiv.className = 'mooc-answer-display';
            answerDiv.innerHTML = `
                <strong>${sourceText}${typeText}：</strong>${answerText}<br>
                ${selectedOptions.length > 0 ? `<strong>已选择：</strong>${selectedOptions.map(opt => opt.text.replace(/^[A-Z][\.\:：]\s*/, '')).join(', ')}<br>` : ''}
                ${answerData.explanation ? `<strong>解释：</strong>${answerData.explanation}<br>` : ''}
            `;

            questionData.element.appendChild(answerDiv);
        },

        // 显示问题错误
        showQuestionError(questionData, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'mooc-answer-display';
            errorDiv.style.color = '#dc3545';
            errorDiv.innerHTML = `<strong>错误：</strong>${message}`;
            questionData.element.appendChild(errorDiv);
        }
    };

    // 主控制面板
    const controlPanel = {
        panel: null,
        statusElement: null,
        progressBar: null,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },

        // 创建控制面板
        create() {
            this.panel = document.createElement('div');
            this.panel.className = 'mooc-answer-panel';
            this.panel.innerHTML = `
                <div class="mooc-panel-header">
                    <span>MOOC答题助手 v3.0</span>
                    <button class="mooc-close-btn" title="关闭面板">×</button>
                </div>
                <div class="mooc-panel-content">
                    <div class="mooc-question-counter" id="questionCounter">检测题目中...</div>
                    <div class="mooc-progress-bar">
                        <div class="mooc-progress-fill" id="progressFill" style="width:0%"></div>
                    </div>
                    <button class="mooc-btn" id="autoAnswerBtn">开始自动答题</button>
                    <button class="mooc-btn" id="clearBtn">清除答案</button>
                    <div class="mooc-status" id="statusDisplay">准备就绪</div>
                </div>
            `;

            document.body.appendChild(this.panel);
            this.statusElement = document.getElementById('statusDisplay');
            this.progressBar = document.getElementById('progressFill');

            // 绑定事件
            document.getElementById('autoAnswerBtn').addEventListener('click', () => this.startAutoAnswer());
            document.getElementById('clearBtn').addEventListener('click', () => this.clearAnswers());
            this.panel.querySelector('.mooc-close-btn').addEventListener('click', () => {
                this.panel.style.display = 'none';
            });
            
            this.setupDraggable();
            this.updateQuestionCounter();
        },

        setupDraggable() {
        const header = this.panel.querySelector('.mooc-panel-header');
        
        // 鼠标按下开始拖拽
        header.addEventListener('mousedown', (e) => {
            // 只允许左键拖拽
            if (e.button !== 0) return;
            
            this.isDragging = true;
            
            // 计算鼠标相对于面板的偏移量
            const rect = this.panel.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            
            // 添加拖拽中的样式
            this.panel.classList.add('dragging');
            
            // 防止文本被选中
            e.preventDefault();
        });
        
        // 鼠标移动过程中更新面板位置
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            // 计算新位置
            const x = e.clientX - this.dragOffset.x;
            const y = e.clientY - this.dragOffset.y;
            
            // 设置面板新位置
            this.panel.style.left = `${x}px`;
            this.panel.style.top = `${y}px`;
            this.panel.style.right = 'auto'; // 清除默认定位
        });
        
        // 鼠标松开结束拖拽
        document.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            
            this.isDragging = false;
            this.panel.classList.remove('dragging');
            
            // 保存面板位置到本地存储，以便下次打开时恢复
            const rect = this.panel.getBoundingClientRect();
            localStorage.setItem('moocPanelPosition', JSON.stringify({
                x: rect.left,
                y: rect.top
            }));
        });
        
        // 恢复上次保存的位置
        const savedPosition = localStorage.getItem('moocPanelPosition');
            if (savedPosition) {
                try {
                    const { x, y } = JSON.parse(savedPosition);
                    this.panel.style.left = `${x}px`;
                    this.panel.style.top = `${y}px`;
                    this.panel.style.right = 'auto';
                } catch (e) {
                    console.error('恢复面板位置失败:', e);
                }
            }
        },

        // 更新题目计数
        updateQuestionCounter() {
            const choiceQuestions = questionDetector.getChoiceQuestions();
            const fillBlankQuestions = questionDetector.getFillBlankQuestions();
            const homeworkQuestions = questionDetector.getHomeworkQuestions();
            const total = choiceQuestions.length + fillBlankQuestions.length + homeworkQuestions.length;

            const counterElement = document.getElementById('questionCounter');
            if (counterElement) {
                counterElement.textContent = total > 0
                    ? `检测到 ${total} 道题目 (选:${choiceQuestions.length} 填:${fillBlankQuestions.length} 作:${homeworkQuestions.length})`
                    : '未检测到题目';
            }
        },

        // 更新状态
        updateStatus(message, type = 'info') {
            this.statusElement.textContent = message;
            this.statusElement.className = `mooc-status ${type}`;
        },

        // 更新进度条
        updateProgress(current, total) {
            const percent = Math.round((current / total) * 100);
            this.progressBar.style.width = `${percent}%`;
        },

        // 开始自动答题（顺序处理）
        async startAutoAnswer() {
            this.updateStatus('正在准备答题...', 'info');
            const btn = document.getElementById('autoAnswerBtn');
            btn.disabled = true;

            // 获取所有题目
            const choiceQuestions = questionDetector.getChoiceQuestions();
            const fillBlankQuestions = questionDetector.getFillBlankQuestions();
            const homeworkQuestions = questionDetector.getHomeworkQuestions();
            const allQuestions = [...choiceQuestions, ...fillBlankQuestions, ...homeworkQuestions];
            const totalCount = allQuestions.length;

            if (totalCount === 0) {
                this.updateStatus('未检测到题目', 'error');
                btn.disabled = false;
                return;
            }

            let successCount = 0;
            let processedCount = 0;

            // 逐题处理
            for (const [index, question] of allQuestions.entries()) {
                processedCount++;
                this.updateProgress(processedCount, totalCount);
                this.updateStatus(`处理题目 ${processedCount}/${totalCount} (${question.type})`, 'info');

                try {
                    // 获取答案
                    const result = await api.searchAnswer(question.question, question.options || []);
                    
                    // 处理题目
                    let handled = false;
                    switch (question.type) {
                        case 'choice':
                            handled = await answerHandler.handleChoiceQuestion(question, result);
                            break;
                        case 'fillblank':
                            handled = await answerHandler.handleFillBlankQuestion(question, result);
                            break;
                        case 'homework':
                            handled = await answerHandler.handleHomeworkQuestion(question, result);
                            break;
                    }

                    if (handled) successCount++;
                    
                    // 题目间延迟
                    await utils.delay(config.requestInterval);
                } catch (error) {
                    console.error(`处理题目时出错:`, error);
                }
            }

            // 完成处理
            const successRate = Math.round((successCount / totalCount) * 100);
            this.updateStatus(`完成！成功 ${successCount}/${totalCount} (${successRate}%)`, 
                             successCount === totalCount ? 'success' : 'error');
            btn.disabled = false;
        },

        // 清除答案
        clearAnswers() {
            // 清除高亮
            document.querySelectorAll('.mooc-answer-highlight').forEach(el => {
                el.classList.remove('mooc-answer-highlight');
            });

            // 清除答案显示
            document.querySelectorAll('.mooc-answer-display').forEach(el => {
                el.remove();
            });

            // 取消选择
            document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').forEach(input => {
                input.checked = false;
            });

            // 清空填空题
            document.querySelectorAll('.m-FillBlank input[type="text"], .m-FillBlank textarea').forEach(input => {
                input.value = '';
            });

            this.updateStatus('已清除所有答案', 'success');
        }
    };

    // 初始化脚本
function init() {
    console.log('MOOC答题助手优化版 - 启动中...');
    
    // 清除已存在的面板
    const existingPanel = document.querySelector('.mooc-answer-panel');
    if (existingPanel) {
        existingPanel.remove();
    }

    // 创建样式
    utils.createStyles();

    // 创建控制面板
    setTimeout(() => {
        controlPanel.create();
        console.log('✨ 优化版特性:');
        console.log('  🔄 逐题顺序处理，避免答非所问');
        console.log('  🆕 页面变化自动刷新检测');
        console.log('  🎨 现代化立体UI设计');
        console.log('  📊 答题进度可视化');
    }, 1500);

    // 监听页面变化
    let lastURL = window.location.href;
    
    // 清除已存在的观察者
    if (window.moocObserver) {
        window.moocObserver.disconnect();
    }
    
    const observer = new MutationObserver(() => {
        // URL变化检测
        if (window.location.href !== lastURL) {
            lastURL = window.location.href;
            console.log('检测到页面变化，重新初始化');
            init();
            return;
        }

        // 题目区域变化检测
        const questionArea = document.querySelector('.j-questionList');
        if (questionArea) {
            controlPanel.updateQuestionCounter();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
    
    // 保存观察者引用以便后续清除
    window.moocObserver = observer;

    // 移除之前的hashchange监听器，避免重复添加
    window.removeEventListener('hashchange', window.moocHashChangeHandler);
    
    // 创建新的hashchange处理函数
    window.moocHashChangeHandler = () => {
        console.log('检测到hash变化，重新初始化');
        init();
    };
    
    // 添加新的hashchange监听器
    window.addEventListener('hashchange', window.moocHashChangeHandler);
}

    // 启动脚本
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();