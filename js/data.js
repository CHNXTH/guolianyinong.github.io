// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化市场趋势图表
    initMarketTrendChart();
    
    // 初始化加工损耗对比图表
    initWasteComparisonChart();
    
    // 初始化政策年表交互
    initTimelineInteraction();
    
    // 初始化滚动动画
    initScrollAnimations();
});

// 初始化市场趋势图表
function initMarketTrendChart() {
    const ctx = document.getElementById('marketTrendChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: '市场规模（亿元）',
                    data: [85, 92, 108, 125, 142, 168],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '产量（万吨）',
                    data: [42, 45, 52, 58, 65, 72],
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '黄桃市场增长趋势',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 初始化加工损耗对比图表
function initWasteComparisonChart() {
    const ctx = document.getElementById('wasteComparisonChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['采摘损耗', '运输损耗', '储存损耗', '加工损耗', '销售损耗'],
            datasets: [
                {
                    label: '传统模式',
                    data: [15, 12, 18, 20, 8],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: '果链益农模式',
                    data: [5, 4, 6, 8, 3],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '加工损耗对比（%）',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '损耗率（%）'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// 初始化政策年表交互
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-summary');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.nextElementSibling;
            const isExpanded = details.style.display === 'block';
            
            // 关闭所有其他展开的详情
            document.querySelectorAll('.timeline-details').forEach(detail => {
                if (detail !== details) {
                    detail.style.display = 'none';
                }
            });
            
            // 切换当前详情的显示状态
            details.style.display = isExpanded ? 'none' : 'block';
            
            // 添加展开动画
            if (!isExpanded) {
                details.style.opacity = '0';
                details.style.transform = 'translateY(-10px)';
                requestAnimationFrame(() => {
                    details.style.transition = 'all 0.3s ease';
                    details.style.opacity = '1';
                    details.style.transform = 'translateY(0)';
                });
            }
        });
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
    
    // 观察图表卡片
    document.querySelectorAll('.chart-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 观察数据价值卡片
    document.querySelectorAll('.value-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // 观察时间线项目
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
} 