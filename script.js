// P5.js Background Animation
let particles = [];
let symbols = ['¥', '$', '€', '₩', '£', '📊', '📈', '💰', '🏪', '🚲'];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-background');
    
    // Create particles
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: random(width),
            y: random(height),
            symbol: random(symbols),
            size: random(20, 40),
            speedX: random(-0.5, 0.5),
            speedY: random(-0.5, 0.5),
            opacity: random(0.1, 0.3)
        });
    }
}

function draw() {
    clear();
    
    // Update and draw particles
    for (let particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
        
        // Draw particle
        fill(231, 126, 34, particle.opacity * 255);
        textAlign(CENTER, CENTER);
        textSize(particle.size);
        text(particle.symbol, particle.x, particle.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    initializeCharts();
    initializeQuiz();
    initializeScrollEffects();
    initializeHeaderUX();
    initializeTiltEffects();
});

function initializeAnimations() {
    // Hero section animations
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '#main-title',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 500
    })
    .add({
        targets: '#subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200
    })
    .add({
        targets: '#intro-card',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        delay: 300
    });

    // Phenomena cards animation
    anime({
        targets: '.phenomenon-card',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(150, {start: 2000}),
        duration: 800,
        easing: 'easeOutExpo'
    });
}

function initializeCharts() {
    // Chart 1: Supply and Demand
    const chart1 = echarts.init(document.getElementById('chart-1'));
    const option1 = {
        title: {
            text: '宿舍供需关系图',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['需求', '供给'],
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: ['晚上8点', '晚上10点', '晚上12点', '凌晨2点']
        },
        yAxis: {
            type: 'value',
            name: '数量'
        },
        series: [
            {
                name: '需求',
                type: 'line',
                data: [30, 80, 60, 20],
                itemStyle: { color: '#E67E22' },
                smooth: true
            },
            {
                name: '供给',
                type: 'line',
                data: [10, 15, 15, 5],
                itemStyle: { color: '#27AE60' },
                smooth: true
            }
        ]
    };
    chart1.setOption(option1);

    // Chart 2: Price Variation
    const chart2 = echarts.init(document.getElementById('chart-2'));
    const option2 = {
        title: {
            text: '食堂价格变化',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00']
        },
        yAxis: {
            type: 'value',
            name: '价格(元)'
        },
        series: [{
            data: [15, 15, 15, 14, 12, 10],
            type: 'line',
            itemStyle: { color: '#8E44AD' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(142, 68, 173, 0.3)' },
                        { offset: 1, color: 'rgba(142, 68, 173, 0.1)' }
                    ]
                }
            },
            smooth: true
        }]
    };
    chart2.setOption(option2);

    // Chart 3: Resource Allocation
    const chart3 = echarts.init(document.getElementById('chart-3'));
    const option3 = {
        title: {
            text: '二手交易效益',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        series: [{
            name: '交易效益',
            type: 'pie',
            radius: '70%',
            data: [
                { value: 40, name: '卖家收益', itemStyle: { color: '#27AE60' } },
                { value: 35, name: '买家节省', itemStyle: { color: '#3498DB' } },
                { value: 25, name: '资源节约', itemStyle: { color: '#E67E22' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    chart3.setOption(option3);

    // Chart 4: Shared Bike Usage
    const chart4 = echarts.init(document.getElementById('chart-4'));
    const option4 = {
        title: {
            text: '共享单车使用频率',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            name: '使用次数'
        },
        series: [{
            data: [120, 132, 101, 134, 190, 230, 210],
            type: 'bar',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: '#3498DB' },
                        { offset: 1, color: '#2980B9' }
                    ]
                }
            }
        }]
    };
    chart4.setOption(option4);

    // Chart 5: Sunk Cost Analysis
    const chart5 = echarts.init(document.getElementById('chart-5'));
    const option5 = {
        title: {
            text: '考研决策成本分析',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        series: [{
            name: '成本类型',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 30, name: '沉没成本', itemStyle: { color: '#E74C3C' } },
                { value: 40, name: '机会成本', itemStyle: { color: '#F39C12' } },
                { value: 30, name: '未来收益', itemStyle: { color: '#27AE60' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    chart5.setOption(option5);

    // Chart 6: Milk Tea Competition
    const chart6 = echarts.init(document.getElementById('chart-6'));
    const option6 = {
        title: {
            text: '奶茶店竞争状况',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['开业数量', '关闭数量'],
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '店铺数量'
        },
        series: [
            {
                name: '开业数量',
                type: 'bar',
                data: [8, 12, 15, 10, 6, 4],
                itemStyle: { color: '#27AE60' }
            },
            {
                name: '关闭数量',
                type: 'bar',
                data: [2, 5, 8, 12, 15, 18],
                itemStyle: { color: '#E74C3C' }
            }
        ]
    };
    chart6.setOption(option6);

    // Chart 7: Part-time Job Value
    const chart7 = echarts.init(document.getElementById('chart-7'));
    const option7 = {
        title: {
            text: '不同类型兼职的价值对比',
            left: 'center',
            textStyle: {
                fontSize: 16,
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['即时收入', '未来价值'],
            bottom: 10
        },
        xAxis: {
            type: 'category',
            data: ['家教', '实习', '发传单', '服务员', '校园代理']
        },
        yAxis: {
            type: 'value',
            name: '价值评分'
        },
        series: [
            {
                name: '即时收入',
                type: 'bar',
                data: [80, 40, 30, 35, 60],
                itemStyle: { color: '#3498DB' }
            },
            {
                name: '未来价值',
                type: 'bar',
                data: [90, 95, 10, 15, 70],
                itemStyle: { color: '#9B59B6' }
            }
        ]
    };
    chart7.setOption(option7);

    // Make charts responsive
    window.addEventListener('resize', function() {
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
        chart6.resize();
        chart7.resize();
    });
}

function initializeQuiz() {
    const correctAnswers = {
        1: 'b',
        2: 'b',
        3: 'b'
    };
    
    let userAnswers = {};
    let answeredQuestions = 0;
    
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionNum = this.closest('.quiz-question').dataset.question;
            const selectedAnswer = this.dataset.answer;
            const correctAnswer = correctAnswers[questionNum];
            
            // Disable all options in this question
            const allOptions = this.closest('.quiz-question').querySelectorAll('.quiz-option');
            allOptions.forEach(opt => opt.style.pointerEvents = 'none');
            
            // Show correct/incorrect styling
            allOptions.forEach(opt => {
                if (opt.dataset.answer === correctAnswer) {
                    opt.classList.add('quiz-correct');
                } else if (opt === this && selectedAnswer !== correctAnswer) {
                    opt.classList.add('quiz-incorrect');
                }
            });
            
            // Show explanation
            const explanation = this.closest('.quiz-question').querySelector('.quiz-explanation');
            explanation.classList.remove('hidden');
            
            // Store answer
            userAnswers[questionNum] = selectedAnswer === correctAnswer;
            answeredQuestions++;
            
            // Check if all questions answered
            if (answeredQuestions === 3) {
                showQuizScore();
            }
        });
    });
    
    function showQuizScore() {
        const correctCount = Object.values(userAnswers).filter(Boolean).length;
        const scoreElement = document.getElementById('quiz-score');
        const scoreDisplay = document.getElementById('score-display');
        
        scoreDisplay.textContent = `${correctCount}/3`;
        scoreElement.classList.remove('hidden');
        
        // Animate score appearance
        anime({
            targets: scoreElement,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
}

function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('explanation-card')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
                
                if (element.classList.contains('quiz-question')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.explanation-card, .quiz-question').forEach(el => {
        observer.observe(el);
    });
}

function initializeHeaderUX() {
    const progress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progress) progress.style.width = pct + '%';

        // Back-to-top toggle
        if (backToTop) {
            if (scrollTop > 400) backToTop.classList.remove('hidden');
            else backToTop.classList.add('hidden');
        }

        // Scrollspy active link
        let currentId = sections[0] ? sections[0].id : '';
        for (const sec of sections) {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 120) currentId = sec.id;
        }
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href === `#${currentId}`) link.classList.add('active');
            else link.classList.remove('active');
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initializeTiltEffects() {
    const maxTilt = 8; // degrees
    const cards = document.querySelectorAll('.phenomenon-card');
    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = x / rect.width - 0.5; // -0.5..0.5
            const py = y / rect.height - 0.5;
            const rotateY = px * maxTilt * 2;
            const rotateX = -py * maxTilt * 2;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
