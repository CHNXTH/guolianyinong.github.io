// 导航栏交互
document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', () => {
        if (searchInput.value.trim()) {
            // 实现搜索功能
            console.log('Searching for:', searchInput.value);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            // 实现搜索功能
            console.log('Searching for:', searchInput.value);
        }
    });

    // 产品轮播
    const carousel = document.querySelector('.carousel-items');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // 模式滑块
    const modelTrack = document.querySelector('.model-track');
    if (modelTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;

        modelTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            modelTrack.classList.add('active');
            startX = e.pageX - modelTrack.offsetLeft;
            scrollLeft = modelTrack.scrollLeft;
        });

        modelTrack.addEventListener('mouseleave', () => {
            isDown = false;
            modelTrack.classList.remove('active');
        });

        modelTrack.addEventListener('mouseup', () => {
            isDown = false;
            modelTrack.classList.remove('active');
        });

        modelTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - modelTrack.offsetLeft;
            const walk = (x - startX) * 2;
            modelTrack.scrollLeft = scrollLeft - walk;
        });
    }

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

    // 社群团购按钮点击事件
    const joinGroupBtn = document.getElementById('joinGroupBtn');
    if (joinGroupBtn) {
        joinGroupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // 这里可以添加弹窗或其他交互
            alert('请关注我们的公众号加入社群！');
        });
    }

    // 视频加载失败时的处理
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            const fallbackImage = heroVideo.querySelector('img');
            if (fallbackImage) {
                heroVideo.style.display = 'none';
                fallbackImage.style.display = 'block';
            }
        });
    }

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // 向下滚动
            navbar.classList.add('hide');
        } else {
            // 向上滚动
            navbar.classList.remove('hide');
        }
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
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