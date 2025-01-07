function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatMessages = document.getElementById('chatMessages');

    // 用户消息 - 不包含头像
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `
        <div class="message-content">${userInput}</div>
    `;
    chatMessages.appendChild(userMessage);

    // AI回复 - 包含头像
    const aiMessage = document.createElement('div');
    aiMessage.className = 'chat-message ai';
    aiMessage.innerHTML = `
        <img src="2.png" alt="AI Avatar" class="avatar">
        <div class="message-content">${generateAIResponse(userInput)}</div>
    `;
    chatMessages.appendChild(aiMessage);

    // 清空输入框
    document.getElementById('userInput').value = '';

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();

    // 计算场景 - 增加更多的识别模式
    if (lowerCaseInput.includes('calculate') || 
        /what(?:'s| is)? [\d\s\+\-\*\/\(\)]+\?/.test(lowerCaseInput) ||  // "what is 1+1?"
        /[\d\s\+\-\*\/\(\)]+\=\?/.test(lowerCaseInput) ||                // "1+1=?"
        /^[\d\s\+\-\*\/\(\)]+$/.test(lowerCaseInput)) {                  // "1+1"
        try {
            // 提取数学表达式
            let expression = userInput
                .replace(/calculate/i, '')
                .replace(/what(?:'s| is)/i, '')
                .replace(/=\?|\?/g, '')
                .trim();
            
            // 计算结果
            const result = eval(expression);
            return `The result of ${expression} is ${result}.`;
        } catch (error) {
            return "I'm sorry, I couldn't calculate that. Please make sure your expression is valid.";
        }
    }

    // 打招呼场景
    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
        const greetings = [
            "Hello! I'm Ceryn, your intelligent digital assistant. How can I assist you today?",
            "Hi there! Ceryn at your service. What can I help you with?",
            "Greetings! I'm Ceryn, ready to help you explore the possibilities together!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // 询问功能场景
    if (lowerCaseInput.includes('what can you do') || lowerCaseInput.includes('help me')) {
        return "I'm Ceryn, a versatile AI assistant. I can help you with:\n" +
               "📝 Answering questions\n" +
               "🔍 Information search\n" +
               "💡 Problem solving\n" +
               "🌐 News updates\n" +
               "What interests you most?";
    }

    // 天气相关
    if (lowerCaseInput.includes('weather')) {
        if (lowerCaseInput.includes('today')) {
            return "I'd be happy to check today's weather for you. Which city are you interested in?";
        }
        return "I can help you with weather information. Would you like to know the current weather or the forecast?";
    }

    // 新闻相关
    if (lowerCaseInput.includes('news')) {
        const topics = ['technology', 'science', 'business', 'sports', 'entertainment'];
        return "I can provide news updates on various topics including " + 
               topics.join(', ') + ". Which area interests you?";
    }

    // 感谢场景
    if (lowerCaseInput.includes('thank') || lowerCaseInput.includes('thanks')) {
        const thanks = [
            "You're welcome! Feel free to ask if you need anything else.",
            "Glad I could help! Don't hesitate to reach out for more assistance.",
            "It's my pleasure! Is there anything else you'd like to know?"
        ];
        return thanks[Math.floor(Math.random() * thanks.length)];
    }

    // 关于Atlas
    if (lowerCaseInput.includes('who are you') || lowerCaseInput.includes('about you')) {
        return "I'm Ceryn, an advanced AI assistant designed to help you navigate the digital world. " +
               "I combine cutting-edge technology with user-friendly interaction to provide the best possible assistance. " +
               "What would you like to know about me?";
    }

    // 时间相关
    if (lowerCaseInput.includes('time') || lowerCaseInput.includes('date')) {
        const now = new Date();
        return `Current time is ${now.toLocaleTimeString()}, and today's date is ${now.toLocaleDateString()}.`;
    }

    // 个人看法
    if (lowerCaseInput.includes('what do you think')) {
        return "As an AI, I don't have personal opinions, but I can provide information and insights based on data. What would you like to know more about?";
    }

    // 默认回复
    const defaultResponses = [
        "I'm here to help! Please ask me anything.",
        "Interesting question! Could you provide more details?",
        "I'd love to help you with that. What specifically would you like to know?",
        "I'm all ears! What's on your mind?",
        "That's an intriguing topic. Let's explore it together!"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 按回车发送消息
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 页面加载时的欢迎消息
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    
    // Atlas的欢迎消息
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'chat-message ai';
    welcomeMessage.innerHTML = `
        <img src="2.png" alt="AI Avatar" class="avatar">
        <div class="message-content welcome-message">
            <p>👋 Welcome! I'm Ceryn, your intelligent digital companion.</p>
            <p class="feature-list">I'm here to assist you with:</p>
            <ul>
                <li>📝 Information and answers</li>
                <li>🔍 Problem solving</li>
                <li>💡 Calculations</li>
                <li>🌐 News updates</li>
            </ul>
            <p>How can I help you today?</p>
        </div>
    `;
    chatMessages.appendChild(welcomeMessage);

    // 设置输入框焦点
    document.getElementById('userInput').focus();
});

// 图片预览功能
document.getElementById('avatarUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 创建Agent的处理函数
document.querySelector('.create-button').addEventListener('click', function() {
    const name = document.getElementById('agentName').value;
    const description = document.getElementById('agentDescription').value;
    const apiKey = document.getElementById('apiKey').value;
    const type = document.getElementById('agentType').value;
    const avatarUrl = document.getElementById('avatarPreview').src; // 保存头像URL
    
    // 验证必填字段
    if (!name || !description) {
        alert('Please fill in all required fields');
        return;
    }

    // 存储创建的agent信息，供后续使用
    window.lastCreatedAgent = {
        name: name,
        avatarUrl: avatarUrl
    };

    // 显示成功反馈
    showFeedback();
    
    // 清空表单（移到closeFeedback后执行）
    setTimeout(() => {
        document.getElementById('agentName').value = '';
        document.getElementById('agentDescription').value = '';
        document.getElementById('apiKey').value = '';
        document.getElementById('agentType').value = 'assistant';
        document.getElementById('avatarPreview').src = '2.png';
    }, 500);
});

// 显示反馈
function showFeedback() {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('feedbackModal').classList.add('active');
}

// 关闭反馈
function closeFeedback() {
    const agentInfo = window.lastCreatedAgent; // 使用保存的agent信息
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('feedbackModal').classList.remove('active');

    // 创建新的聊天容器
    const newAgentChat = document.createElement('div');
    newAgentChat.className = 'chat-container';
    newAgentChat.style.marginTop = '30px';
    newAgentChat.innerHTML = `
        <div class="chat-messages">
            <div class="chat-message ai">
                <img src="${agentInfo.avatarUrl}" alt="Agent Avatar" class="avatar">
                <div class="message-content welcome-message">
                    <p>👋 Hello! I'm ${agentInfo.name}, your new AI assistant.</p>
                    <p style="color: #666; font-style: italic;">🔧 My features are currently being deployed. I'll be fully operational soon!</p>
                    <p>In the meantime, feel free to explore my basic functionalities.</p>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Type your message..." disabled>
            <button disabled style="opacity: 0.7;">Send</button>
        </div>
    `;

    // 添加到页面
    document.querySelector('.agent-creator').insertAdjacentElement('afterend', newAgentChat);

    // 平滑滚动到新创建的聊天框
    setTimeout(() => {
        newAgentChat.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// 点击遮罩层也可以关闭反馈
document.getElementById('overlay').addEventListener('click', closeFeedback); 