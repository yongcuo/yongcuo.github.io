// 导航菜单切换
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 滚动动画
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 移动端关闭菜单
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加一些初始动画
    setTimeout(() => {
        document.querySelector('.hero h1').style.opacity = '1';
        document.querySelector('.hero p').style.opacity = '1';
        document.querySelector('.btn').style.opacity = '1';
    }, 300);
    
    // 初始化英雄区域的元素透明度
    document.querySelector('.hero h1').style.opacity = '0';
    document.querySelector('.hero p').style.opacity = '0';
    document.querySelector('.btn').style.opacity = '0';
    document.querySelector('.hero h1').style.transition = 'opacity 1s';
    document.querySelector('.hero p').style.transition = 'opacity 1s 0.3s';
    document.querySelector('.btn').style.transition = 'opacity 1s 0.6s';
});