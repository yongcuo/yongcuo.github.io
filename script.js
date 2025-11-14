// 1. 页面加载完成后执行
window.addEventListener('load', function() {
    // 个人照片淡入效果（加分项）
    const profilePhoto = document.getElementById('profilePhoto');
    setTimeout(() => {
        profilePhoto.classList.add('fade-in');
    }, 300);

    // 首屏section激活（淡入效果）
    const firstSection = document.querySelector('.section');
    firstSection.classList.add('active');

    // 初始化导航栏状态
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
});

// 2. 滚动监听：导航栏动态效果+section淡入（加分项）
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    // 导航栏滚动变色
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 滚动时section淡入效果
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('active');
        }
    });
});

// 3. 移动端菜单切换（加分项）
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    // 切换菜单图标
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// 4. 知识图谱节点展开/收起（加分项）
function toggleNode(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');
    
    content.classList.toggle('active');
    if (content.classList.contains('active')) {
        icon.style.transform = 'rotate(90deg)';
    } else {
        icon.style.transform = 'rotate(0)';
    }
}

// 5. 知识图谱标签页切换（加分项）
const tabBtns = document.querySelectorAll('.tab-btn');
const graphContents = document.querySelectorAll('.graph-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有active类
        tabBtns.forEach(b => b.classList.remove('active'));
        graphContents.forEach(c => c.classList.remove('active'));
        
        // 激活当前标签页
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-graph`).classList.add('active');
    });
});

// 6. 导航链接平滑滚动（加分项）
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // 关闭移动端菜单
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            
            // 平滑滚动到目标位置（减去导航栏高度）
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 7. 联系表单提交反馈（加分项）
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('消息发送成功！我会尽快回复你~');
    this.reset();
});

// 8. 知识图谱节点默认展开第一个（优化体验）
window.addEventListener('load', function() {
    const firstNode = document.querySelector('.graph-node .node-header');
    if (firstNode) {
        toggleNode(firstNode);
    }
});