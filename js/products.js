// 品质对比图表初始化
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    
    // 创建品质对比图表
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['糖度', '高铁含量', '抗氧化力', '保鲜时间', '果肉细腻度'],
            datasets: [
                {
                    label: '沂源金黄金桃',
                    data: [18, 2.8, 95, 90, 95],
                    backgroundColor: 'rgba(240, 165, 0, 0.2)',
                    borderColor: 'rgba(240, 165, 0, 1)',
                    pointBackgroundColor: 'rgba(240, 165, 0, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(240, 165, 0, 1)'
                },
                {
                    label: '普通黄桃',
                    data: [12, 1.5, 70, 60, 75],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    pointBackgroundColor: 'rgba(44, 62, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(44, 62, 80, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '品质参数对比'
                }
            }
        }
    });
});

// 滚动动画
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

// 添加滚动动画到元素
document.addEventListener('DOMContentLoaded', () => {
    // 为产品卡片添加动画
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // 为品牌优势项添加动画
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
});

// 时间线滚动处理
document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline-container');
    if (timeline) {
        let isDown = false;
        let startX;
        let scrollLeft;

        timeline.addEventListener('mousedown', (e) => {
            isDown = true;
            timeline.classList.add('active');
            startX = e.pageX - timeline.offsetLeft;
            scrollLeft = timeline.scrollLeft;
        });

        timeline.addEventListener('mouseleave', () => {
            isDown = false;
            timeline.classList.remove('active');
        });

        timeline.addEventListener('mouseup', () => {
            isDown = false;
            timeline.classList.remove('active');
        });

        timeline.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timeline.offsetLeft;
            const walk = (x - startX) * 2;
            timeline.scrollLeft = scrollLeft - walk;
        });
    }
});

// 图片加载优化
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// 平滑滚动
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