// P5.js Background Animation (保持不变)
let particles = [];
let symbols = ['¥', '$', '€', '₩', '£', '📊', '📈', '💰', '🏪', '🚲'];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-background');
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: random(width), y: random(height), symbol: random(symbols),
            size: random(20, 40), speedX: random(-0.5, 0.5),
            speedY: random(-0.5, 0.5), opacity: random(0.1, 0.3)
        });
    }
}

function draw() {
    clear();
    for (let particle of particles) {
        particle.x += particle.speedX; particle.y += particle.speedY;
        if (particle.x > width) particle.x = 0; if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0; if (particle.y < 0) particle.y = height;
        fill(231, 126, 34, particle.opacity * 255);
        textAlign(CENTER, CENTER); textSize(particle.size);
        text(particle.symbol, particle.x, particle.y);
    }
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

// =================================================================
// Main JavaScript - Scrollytelling Version
// =================================================================

// 1. 全局变量，用于存储唯一的图表实例和所有图表的配置
let mainChart;
const chartOptions = {};

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载后依次初始化各个模块
    initializeAnimations();
    initializeChartData(); // 新函数：准备所有图表数据
    initializeScrollytelling(); // 新函数：初始化滚动叙事核心逻辑
    initializeQuiz();
    initializeScrollEffects(); // 将保留一些通用滚动效果
});

function initializeAnimations() {
    // Hero section animations (保持不变)
    anime.timeline({ easing: 'easeOutExpo', duration: 1000 })
    .add({ targets: '#main-title', opacity: [0, 1], translateY: [50, 0], delay: 500 })
    .add({ targets: '#subtitle', opacity: [0, 1], translateY: [30, 0], delay: 200 })
    .add({ targets: '#intro-card', opacity: [0, 1], translateY: [30, 0], scale: [0.9, 1], delay: 300 });

    // Phenomena cards animation (保持不变)
    anime({
        targets: '.phenomenon-card', opacity: [0, 1], translateY: [50, 0],
        delay: anime.stagger(150, {start: 2000}), duration: 800, easing: 'easeOutExpo'
    });
}

// 2. 新函数：将所有图表的配置信息集中存储
function initializeChartData() {
    // Option 1: Supply and Demand
    chartOptions['1'] = { title: { text: '宿舍供需关系图', ... }, tooltip: { trigger: 'axis' }, legend: { data: ['需求', '供给'], bottom: 10 }, xAxis: { type: 'category', data: ['晚上8点', '晚上10点', '晚上12点', '凌晨2点'] }, yAxis: { type: 'value', name: '数量' }, series: [ { name: '需求', type: 'line', data: [30, 80, 60, 20], itemStyle: { color: '#E67E22' }, smooth: true }, { name: '供给', type: 'line', data: [10, 15, 15, 5], itemStyle: { color: '#27AE60' }, smooth: true } ] };
    // Option 2: Price Variation
    chartOptions['2'] = { title: { text: '食堂价格变化', ... }, tooltip: { trigger: 'axis' }, xAxis: { type: 'category', data: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'] }, yAxis: { type: 'value', name: '价格(元)' }, series: [{ data: [15, 15, 15, 14, 12, 10], type: 'line', itemStyle: { color: '#8E44AD' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [ { offset: 0, color: 'rgba(142, 68, 173, 0.3)' }, { offset: 1, color: 'rgba(142, 68, 173, 0.1)' } ] } }, smooth: true }] };
    // Option 3: Resource Allocation
    chartOptions['3'] = { title: { text: '二手交易效益', ... }, tooltip: { trigger: 'item' }, series: [{ name: '交易效益', type: 'pie', radius: '70%', data: [ { value: 40, name: '卖家收益', itemStyle: { color: '#27AE60' } }, { value: 35, name: '买家节省', itemStyle: { color: '#3498DB' } }, { value: 25, name: '资源节约', itemStyle: { color: '#E67E22' } } ], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }] };
    // Option 4: Shared Bike Usage
    chartOptions['4'] = { title: { text: '共享单车使用频率', ... }, tooltip: { trigger: 'axis' }, xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] }, yAxis: { type: 'value', name: '使用次数' }, series: [{ data: [120, 132, 101, 134, 190, 230, 210], type: 'bar', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [ { offset: 0, color: '#3498DB' }, { offset: 1, color: '#2980B9' } ] } } }] };
    // Option 5: Sunk Cost Analysis
    chartOptions['5'] = { title: { text: '考研决策成本分析', ... }, tooltip: { trigger: 'item' }, series: [{ name: '成本类型', type: 'pie', radius: ['40%', '70%'], data: [ { value: 30, name: '沉没成本', itemStyle: { color: '#E74C3C' } }, { value: 40, name: '机会成本', itemStyle: { color: '#F39C12' } }, { value: 30, name: '未来收益', itemStyle: { color: '#27AE60' } } ], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }] };
    // Option 6: Milk Tea Competition
    chartOptions['6'] = { title: { text: '奶茶店竞争状况', ... }, tooltip: { trigger: 'axis' }, legend: { data: ['开业数量', '关闭数量'], bottom: 10 }, xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] }, yAxis: { type: 'value', name: '店铺数量' }, series: [ { name: '开业数量', type: 'bar', data: [8, 12, 15, 10, 6, 4], itemStyle: { color: '#27AE60' } }, { name: '关闭数量', type: 'bar', data: [2, 5, 8, 12, 15, 18], itemStyle: { color: '#E74C3C' } } ] };
    // Option 7: Part-time Job Value
    chartOptions['7'] = { title: { text: '不同类型兼职的价值对比', ... }, legend: { data: ['即时收入', '未来价值'], bottom: 10 }, xAxis: { type: 'category', data: ['家教', '实习', '发传单', '服务员', '校园代理'] }, yAxis: { type: 'value', name: '价值评分' }, series: [ { name: '即时收入', type: 'bar', data: [80, 40, 30, 35, 60], itemStyle: { color: '#3498DB' } }, { name: '未来价值', type: 'bar', data: [90, 95, 10, 15, 70], itemStyle: { color: '#9B59B6' } } ] };

    // 为每个option添加通用样式
    Object.values(chartOptions).forEach(option => {
        option.title.left = 'center';
        option.title.textStyle = { fontSize: 16, color: '#2C3E50' };
    });
}

// 3. 新函数：滚动叙事的核心逻辑
function initializeScrollytelling() {
    const chartContainer = document.getElementById('chart-display');
    const textCards = document.querySelectorAll('.explanation-card');

    // 初始化唯一的图表实例
    mainChart = echarts.init(chartContainer);
    // 设置一个初始的、空白的或欢迎的图表状态
    mainChart.setOption({
        title: { text: '解码身边经济', subtext: '请向上滚动开始探索', left: 'center', top: 'center' },
        graphic: {
            type: 'text',
            left: 'center',
            top: '60%',
            style: {
                text: '👆',
                font: '40px sans-serif'
            }
        }
    });

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 获取当前可见卡片的 data-explanation 值
                const chartId = entry.target.dataset.explanation;
                const newOption = chartOptions[chartId];
                
                if (newOption) {
                    // 更新图表内容
                    mainChart.setOption(newOption, {
                        replaceMerge: ['series', 'xAxis', 'yAxis', 'legend'] // 关键：替换核心配置
                    });
                }
            }
        });
    }, {
        threshold: 0.6, // 当卡片60%可见时触发
        rootMargin: '0px 0px -20% 0px' // 调整触发区域
    });

    // 让 observer 观察所有文本卡片
    textCards.forEach(card => observer.observe(card));

    // 监听窗口大小变化，使图表自适应
    window.addEventListener('resize', function() {
        if (mainChart) {
            mainChart.resize();
        }
    });
}

// 4. 重构/保留其他函数
function initializeQuiz() {
    // Quiz logic (保持不变)
    const correctAnswers = { 1: 'b', 2: 'b', 3: 'b' };
    let userAnswers = {}; let answeredQuestions = 0;
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionNum = this.closest('.quiz-question').dataset.question;
            const selectedAnswer = this.dataset.answer; const correctAnswer = correctAnswers[questionNum];
            const allOptions = this.closest('.quiz-question').querySelectorAll('.quiz-option');
            allOptions.forEach(opt => opt.style.pointerEvents = 'none');
            allOptions.forEach(opt => {
                if (opt.dataset.answer === correctAnswer) opt.classList.add('quiz-correct');
                else if (opt === this && selectedAnswer !== correctAnswer) opt.classList.add('quiz-incorrect');
            });
            const explanation = this.closest('.quiz-question').querySelector('.quiz-explanation');
            explanation.classList.remove('hidden');
            userAnswers[questionNum] = selectedAnswer === correctAnswer; answeredQuestions++;
            if (answeredQuestions === 3) showQuizScore();
        });
    });
    function showQuizScore() {
        const correctCount = Object.values(userAnswers).filter(Boolean).length;
        const scoreElement = document.getElementById('quiz-score');
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = `${correctCount}/3`;
        scoreElement.classList.remove('hidden');
        anime({ targets: scoreElement, opacity: [0, 1], translateY: [30, 0], duration: 800, easing: 'easeOutExpo' });
    }
}

function initializeScrollEffects() {
    // 只保留卡片悬浮等通用效果，移除对 explanation-card 的观察
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.classList.contains('quiz-question')) {
                    anime({ targets: element, opacity: [0, 1], translateX: [-30, 0], duration: 600, easing: 'easeOutExpo' });
                }
            }
        });
    }, observerOptions);
    document.querySelectorAll('.quiz-question').forEach(el => observer.observe(el));

    // Card hover effects (保持不变)
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() { anime({ targets: this, scale: 1.05, duration: 300, easing: 'easeOutQuad' }); });
        card.addEventListener('mouseleave', function() { anime({ targets: this, scale: 1, duration: 300, easing: 'easeOutQuad' }); });
    });
}

// Smooth scrolling for anchor links (保持不变)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add loading animation (保持不变)
window.addEventListener('load', function() { document.body.classList.add('loaded'); });
