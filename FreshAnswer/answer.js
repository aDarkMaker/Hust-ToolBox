// ==UserScript==
// @name        2025新生入学测试自动答题
// @namespace   
// @match       http://yxxt.hust.edu.cn/yxxt/zzfw/grzx/main.zf*
// @grant       none
// @version     2.0
// @author      Orange
// @description 华中科技大学新生入学测试自动答题 - 100%正确率版本
// ==/UserScript==
(function () {
    'use strict';

    const correctAnswers = {
        // 第一部分题目
        '282': '2000282_282_1_2_1_1_一', // 1、宿舍推销商品 - 如果太便宜，八成是骗人的，不买
        '181': '1000181_181_1_2_1_2_一', // 2、突发事件管理规定 - 警告或严重警告
        '210': '2000210_210_1_2_1_3_一', // 3、考试作弊处分 - 严重警告
        '53': '1000053_53_1_2_1_4_一',   // 4、电动自行车时速 - 15公里
        '268': '1000268_268_1_2_1_5_一', // 5、电动自行车室内充电 - 会
        '262': '4000220_262_1_2_1_6_一', // 6、手机短信诈骗 - 拨打官方订票电话核实情况
        '133': '3000119_133_1_2_1_7_一', // 7、宗教活动说法错误 - 上述行为屡教不改者，可给予留校察看处分
        '196': '1000196_196_1_2_1_9_一', // 9、违章用电处分 - 警告或严重警告
        '51': '1000051_51_1_2_1_10_一',  // 10、交通事故处理 - 正确
        '215': '2000215_215_1_2_1_11_一', // 11、网络安全违规 - 记过
        '162': '4000141_162_1_2_1_12_一', // 12、赌博情节严重 - 留校察看或开除学籍
        '208': '1000208_208_1_2_1_13_一', // 13、考试违纪 - 警告
        '183': '1000183_183_1_2_1_14_一', // 14、淫秽制品传播 - 警告
        '131': '2000131_131_1_2_1_15_一', // 15、政治活动处分 - 记过
        '174': '1000174_174_1_2_1_16_一', // 16、邪教迷信活动 - 警告或严重警告
        '43': '1000043_43_1_2_1_17_一',   // 17、电动自行车登记 - 正确
        '207': '4000186_207_1_2_1_19_一', // 19、旷课50学时 - 开除学籍
        '197': '1000197_197_1_2_1_22_一', // 22、明火设备使用 - 警告或严重警告
        '48': '3000043_48_1_2_1_23_一',   // 23、无主车清理 - 6个月
        '200': '1000200_200_1_2_1_24_一', // 24、宿舍饲养宠物 - 警告
        '198': '1000198_198_1_2_1_25_一', // 25、夜不归宿 - 警告
        '167': '2000167_167_1_2_1_26_一', // 26、损坏财物2000元以上 - 严重警告或记过
        '192': '1000192_192_1_2_1_27_一', // 27、调换床位 - 警告
        '189': '3000175_189_1_2_1_28_一', // 28、校园贷 - 记过
        '297': '4000241_297_1_2_1_30_一', // 30、翻墙自查 - 以上都是
        '132': '2000132_132_1_2_1_31_一', // 31、散发宣传品 - 记过
        '119': '4000104_119_1_2_1_32_一', // 32、纪律处分种类 - (1)(2)(3)(4)(5)
        '52': '4000042_52_1_2_1_33_一',   // 33、电动自行车通行证 - 正常毕业的剩余年限
        '187': '1000187_187_1_2_1_35_一', // 35、偷窥偷拍 - 警告
        '190': '1000190_190_1_2_1_36_一', // 36、有损形象活动 - 警告
        '217': '1000217_217_1_2_1_37_一', // 37、网络侵犯隐私 - 警告
        '182': '1000182_182_1_2_1_38_一', // 38、非法传销 - 警告
        '185': '1000185_185_1_2_1_40_一', // 40、造谣诽谤 - 警告

        // 第二部分题目
        '255': '2000255_255_1_2_2_1_二', // 1、微信网友见面 - 不要随意见面
        '6': '1000006_6_1_2_2_2_二',     // 2、治安管理处罚 - A选项
        '108': '4000095_108_1_2_2_3_二', // 3、优良学风班 - 0.2
        '61': '2000061_61_1_2_2_4_二',   // 4、优秀毕业生比例 - 0.2
        '161': '2000161_161_1_2_2_5_二', // 5、赌博情节轻微 - 严重警告或记过
        '147': '1000147_147_1_2_2_6_二', // 6、偏袒作伪证 - 警告或严重警告
        '160': '1000160_160_1_2_2_9_二', // 9、非法占有他人物品 - 警告
        '28': '4000028_28_1_2_2_10_二'   // 10、入学复查内容 - D.以上都是
    };

    // 多选题正确答案（题目8的value模式特殊，需要多选）
    const multipleChoiceAnswers = {
        // 第一部分多选题
        '298': ['1000298_298_1_2_1_8_一', '2000298_298_1_2_1_8_一', '3000255_298_1_2_1_8_一', '4000242_298_1_2_1_8_一'], // 8、校园巴士路线 - 全选
        '269': ['3000232_269_1_2_1_18_一', '4000222_269_1_2_1_18_一'], // 18、粉丝群钓鱼链接 - 后两项
        '285': ['1000285_285_1_2_1_20_一', '2000285_285_1_2_1_20_一', '3000244_285_1_2_1_20_一', '4000233_285_1_2_1_20_一', '5000001_285_1_2_1_20_一'], // 20、网暴言论 - 全选
        '284': ['1000284_284_1_2_1_21_一', '2000284_284_1_2_1_21_一', '3000243_284_1_2_1_21_一', '4000232_284_1_2_1_21_一'], // 21、网络暴力违法 - 全选
        '250': ['1000250_250_1_2_1_29_一', '2000250_250_1_2_1_29_一', '3000229_250_1_2_1_29_一', '4000219_250_1_2_1_29_一'], // 29、涉密内容 - 全选
        '294': ['2000294_294_1_2_1_34_一', '4000238_294_1_2_1_34_一'], // 34、校园骑车 - 不要频繁使用车铃，检查车闸
        '275': ['1000275_275_1_2_1_39_一', '3000238_275_1_2_1_39_一', '4000228_275_1_2_1_39_一'], // 39、遭遇偷拍 - 保留证据，报警，配合惩罚

        // 第二部分多选题
        '82': ['1000082_82_1_2_2_7_二', '2000082_82_1_2_2_7_二', '3000074_82_1_2_2_7_二', '4000071_82_1_2_2_7_二'], // 7、国家奖学金 - 全选
        '280': ['1000280_280_1_2_2_8_二', '2000280_280_1_2_2_8_二'] // 8、吹风机使用不当 - 前两项
    };

    // 等待页面加载完成
    window.addEventListener('load', function () {
        setTimeout(function () {
            addAutoAnswerButton();
        }, 1500);
    });

    // 添加一键开学按钮
    function addAutoAnswerButton() {


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
        `;

        const autoButton = document.createElement('button');
        autoButton.innerHTML = '🎓 一键开学(100%正确率)';
        autoButton.style.cssText = `
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        autoButton.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.6)';
        });

        autoButton.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
        });

        autoButton.addEventListener('click', function () {
            performAutoAnswer();
        });

        buttonContainer.appendChild(autoButton);
        document.body.appendChild(buttonContainer);

        const progressDiv = document.createElement('div');
        progressDiv.id = 'answer-progress';
        progressDiv.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            z-index: 9998;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 10px 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-size: 14px;
            color: #333;
            display: none;
            min-width: 220px;
        `;
        document.body.appendChild(progressDiv);
    }

    function performAutoAnswer() {
        showProgress('🚀 开始自动答题 (100%正确率模式)...');

        try {
            const questionGroups = document.querySelectorAll('.form-group');
            let answeredCount = 0;
            let totalQuestions = 0;

            // 统计题目数量
            questionGroups.forEach(group => {
                const inputs = group.querySelectorAll('input.xxClass[type="radio"], input.xxClass[type="checkbox"]');
                if (inputs.length > 0) {
                    totalQuestions++;
                }
            });

            showProgress(`📊 共发现 ${totalQuestions} 道题目，开始精确答题...`);

            questionGroups.forEach((group, index) => {
                setTimeout(() => {
                    const answered = processQuestionPrecise(group, answeredCount + 1);
                    if (answered) {
                        answeredCount++;
                        showProgress(`✅ 正在答题: ${answeredCount}/${totalQuestions} 题 (精确匹配)`);
                    }

                    if (index === questionGroups.length - 1) {
                        setTimeout(() => {
                            showProgress(`🎉 自动答题完成！共完成 ${answeredCount} 题 (100%正确率)`, 'success');
                            setTimeout(() => {
                                showProgress('💡 请手动点击页面底部的"确定"按钮提交答案', 'info');
                            }, 3000);
                        }, 500);
                    }
                }, index * 200);
            });

        } catch (error) {
            console.error('自动答题出错:', error);
            showProgress('❌ 自动答题出错，请手动完成', 'error');
        }
    }

    function processQuestionPrecise(questionGroup, questionNum) {
        // 获取题目的隐藏输入框，从中提取题目ID
        const hiddenInput = questionGroup.querySelector('input.dxClass[type="hidden"]');
        if (!hiddenInput) {
            return false;
        }

        const hiddenValue = hiddenInput.value;
        const questionId = hiddenValue.split('_')[0]; // 提取题目ID

        // 查找该题目组中的所有输入选项
        const radioButtons = questionGroup.querySelectorAll('input.xxClass[type="radio"]');
        const checkboxButtons = questionGroup.querySelectorAll('input.xxClass[type="checkbox"]');

        let answered = false;

        // 处理单选题
        if (radioButtons.length > 0) {
            const correctValue = correctAnswers[questionId];
            if (correctValue) {
                for (let radio of radioButtons) {
                    if (radio.value === correctValue) {
                        radio.checked = true;
                        radio.click();

                        const changeEvent = new Event('change', { bubbles: true });
                        radio.dispatchEvent(changeEvent);

                        answered = true;
                        console.log(`✅ 题目${questionNum} (ID: ${questionId}) - 精确匹配正确答案`);
                        break;
                    }
                }
            }
        }

        // 处理多选题
        if (checkboxButtons.length > 0 && !answered) {
            const correctValues = multipleChoiceAnswers[questionId];
            if (correctValues && correctValues.length > 0) {
                // 先清除所有选择
                checkboxButtons.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // 选择正确答案
                for (let checkbox of checkboxButtons) {
                    if (correctValues.includes(checkbox.value)) {
                        checkbox.checked = true;
                        checkbox.click();

                        const changeEvent = new Event('change', { bubbles: true });
                        checkbox.dispatchEvent(changeEvent);
                    }
                }

                answered = true;
                console.log(`✅ 题目${questionNum} (ID: ${questionId}) - 精确匹配多选答案 (${correctValues.length}项)`);
            }
        }

        // 如果没有在答案库中找到，记录警告
        if (!answered) {
            console.warn(`⚠️ 题目${questionNum} (ID: ${questionId}) - 未在答案库中找到，请手动检查`);
        }

        return answered;
    }

    function showProgress(message, type = 'info') {
        const progressDiv = document.getElementById('answer-progress');
        if (!progressDiv) return;

        progressDiv.style.display = 'block';
        progressDiv.innerHTML = message;

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

        const hideDelay = type === 'error' ? 10000 : (type === 'success' ? 8000 : 5000);
        setTimeout(() => {
            if (progressDiv.style.display !== 'none') {
                progressDiv.style.display = 'none';
            }
        }, hideDelay);
    }

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            performAutoAnswer();

        }
    });

    console.log('🎓 新生入学测试自动答题脚本已加载！(100%正确率版本)');
    console.log('📋 使用说明：');
    console.log('   1. 点击右上角的"🎓 一键开学(100%正确率)"按钮');
    console.log('   2. 或使用快捷键 Ctrl + Shift + S');
    console.log('   3. 脚本会根据题目ID精确匹配正确答案');
    console.log('   4. 支持单选题和多选题的精确识别');
    console.log('   5. 答题完成后请手动点击"确定"按钮提交');
})();