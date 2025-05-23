// 生成网络图
document.addEventListener('DOMContentLoaded', () => {
    const networkContainer = document.querySelector('.network-svg');
    if (networkContainer) {
        generateNetworkGraph(networkContainer);
    }

    // 初始化滚动动画
    initScrollAnimations();

    // 初始化产品图片交互
    initProductInteractions();
});

// 生成网络图
function generateNetworkGraph(container) {
    // 创建 SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');

    // 定义节点数据
    const nodes = [
        { x: 400, y: 200, type: 'center', label: '中心仓储' },
        { x: 200, y: 100, type: 'station', label: '加工驿站A' },
        { x: 600, y: 100, type: 'station', label: '加工驿站B' },
        { x: 200, y: 300, type: 'station', label: '加工驿站C' },
        { x: 600, y: 300, type: 'station', label: '加工驿站D' },
        { x: 100, y: 150, type: 'farm', label: '果园基地1' },
        { x: 100, y: 250, type: 'farm', label: '果园基地2' },
        { x: 700, y: 150, type: 'farm', label: '果园基地3' },
        { x: 700, y: 250, type: 'farm', label: '果园基地4' }
    ];

    // 定义连接
    const connections = [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 0, to: 3 },
        { from: 0, to: 4 },
        { from: 1, to: 5 },
        { from: 1, to: 6 },
        { from: 2, to: 7 },
        { from: 4, to: 8 }
    ];

    // 绘制连接线
    connections.forEach(conn => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('stroke', '#f0a500');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    });

    // 绘制节点
    nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.type === 'center' ? '15' : '10');
        circle.setAttribute('fill', node.type === 'center' ? '#f0a500' : 
                                 node.type === 'station' ? '#2c3e50' : '#4CAF50');
        
        // 添加节点标签
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 25);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#333');
        text.textContent = node.label;
        
        svg.appendChild(circle);
        svg.appendChild(text);
    });

    container.appendChild(svg);
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

    // 观察技术卡片
    document.querySelectorAll('.tech-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // 观察流程项
    document.querySelectorAll('.process-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // 观察分红分支
    document.querySelectorAll('.branch').forEach((branch, index) => {
        branch.style.animationDelay = `${index * 0.2}s`;
        observer.observe(branch);
    });
}

// 初始化产品图片交互
function initProductInteractions() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const img = item.querySelector('img');
        
        // 鼠标移动时的放大效果
        item.addEventListener('mousemove', (e) => {
            const bounds = item.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;
            
            img.style.transform = `scale(1.1) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
        });
        
        // 鼠标离开时重置
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// PDF 下载处理
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 这里可以添加下载前的确认或跟踪统计
        console.log('Downloading:', btn.getAttribute('href'));
    });
}); 