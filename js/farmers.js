// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化视频播放器
    initVideoPlayers();
    
    // 初始化收入对比图表
    initIncomeChart();
    
    // 初始化农旅路线图
    initRouteMap();
    
    // 初始化客户故事轮播
    initTestimonialCarousel();
    
    // 初始化表单处理
    initFormHandler();
    
    // 初始化滚动动画
    initScrollAnimations();
});

// 初始化视频播放器
function initVideoPlayers() {
    const players = document.querySelectorAll('.player');
    players.forEach(player => {
        new Plyr(player, {
            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            hideControls: true,
            autoplay: false
        });
    });
}

// 初始化收入对比图表
function initIncomeChart() {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: '传统种植模式',
                    data: [3.5, 3.8, 4.0, 4.2, 4.5, 4.8],
                    backgroundColor: 'rgba(44, 62, 80, 0.6)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    borderWidth: 1
                },
                {
                    label: '果链益农模式',
                    data: [3.5, 5.2, 7.8, 9.5, 11.2, 12.5],
                    backgroundColor: 'rgba(240, 165, 0, 0.6)',
                    borderColor: 'rgba(240, 165, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '年收入（万元）'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '农户年收入对比'
                }
            }
        }
    });
}

// 初始化农旅路线图
function initRouteMap() {
    const container = document.querySelector('.map-container');
    
    // 创建 SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    
    // 定义路线点
    const points = [
        { x: 100, y: 100, label: '桃花观赏区' },
        { x: 400, y: 200, label: '采摘体验区' },
        { x: 700, y: 300, label: '加工体验中心' }
    ];
    
    // 绘制路线连接线
    for (let i = 0; i < points.length - 1; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const start = points[i];
        const end = points[i + 1];
        const mid = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2 - 50
        };
        
        const d = `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`;
        line.setAttribute('d', d);
        line.setAttribute('stroke', '#f0a500');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('fill', 'none');
        svg.appendChild(line);
    }
    
    // 绘制路线点和标签
    points.forEach((point, index) => {
        // 绘制点
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '10');
        circle.setAttribute('fill', '#f0a500');
        
        // 添加标签
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', point.x);
        text.setAttribute('y', point.y - 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#333');
        text.textContent = point.label;
        
        svg.appendChild(circle);
        svg.appendChild(text);
    });
    
    container.appendChild(svg);
}

// 初始化客户故事轮播
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // 设置轮播宽度
    track.style.width = `${cards.length * 100}%`;
    cards.forEach(card => card.style.width = `${100 / cards.length}%`);
    
    // 更新轮播位置
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * (100 / cards.length)}%)`;
    }
    
    // 下一张
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });
    
    // 上一张
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
    
    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }, 5000);
}

// 初始化表单处理
function initFormHandler() {
    const form = document.getElementById('joinForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 这里可以添加表单验证和数据提交逻辑
        console.log('Form submitted:', data);
        
        // 显示成功消息
        alert('提交成功！我们会尽快与您联系。');
        form.reset();
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察案例卡片
    document.querySelectorAll('.case-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 观察统计卡片
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 观察加入我们模块
    observer.observe(document.querySelector('.join-text'));
    observer.observe(document.querySelector('.join-form'));
    
    // 观察路线项
    document.querySelectorAll('.route-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // 观察客户故事卡片
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
} 