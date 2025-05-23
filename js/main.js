// 导航栏交互
document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navCenter = document.querySelector('.nav-center');
    const navRight = document.querySelector('.nav-right');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navCenter.classList.toggle('active');
            navRight.classList.toggle('active');
        });
    }
    
    // 搜索框交互
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            if (searchInput.value.trim()) {
                handleSearch(searchInput.value);
            } else {
                searchInput.focus();
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                handleSearch(searchInput.value);
            }
        });
    }

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 添加/移除导航栏背景
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});

// 处理搜索
function handleSearch(query) {
    // 这里可以实现搜索逻辑
    console.log('Searching for:', query);
    // 例如：跳转到搜索结果页面
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

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
    // 为品牌介绍添加动画
    const introText = document.querySelector('.intro-text');
    if (introText) observer.observe(introText);

    // 为价值点添加动画
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s forwards`;
        observer.observe(item);
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

// 视频加载失败时的回退方案
window.addEventListener('load', () => {
    const video = document.getElementById('hero-video');
    if (video) {
        video.addEventListener('error', () => {
            video.style.display = 'none';
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.backgroundImage = 'url(assets/hero-bg.jpg)';
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
            }
        });
    }
});

// 创建视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScroll = debounce(() => {
    // 滚动相关的操作
}, 16);

window.addEventListener('scroll', optimizedScroll); 