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
        }
    });
});

// 知识图谱交互
document.addEventListener('DOMContentLoaded', function() {
    const nodes = document.querySelectorAll('.node');
    
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const concept = this.getAttribute('data-concept');
            alert(`您点击了: ${concept}\\\\n这是磁共振成像的一个重要概念。`);
        });
    });
    
    // 知识图谱缩放控制
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset');
    const graph = document.querySelector('.css-knowledge-graph');
    
    let scale = 1;
    
    zoomInBtn.addEventListener('click', function() {
        scale *= 1.2;
        graph.style.transform = `scale(${scale})`;
    });
    
    zoomOutBtn.addEventListener('click', function() {
        scale /= 1.2;
        graph.style.transform = `scale(${scale})`;
    });
    
    resetBtn.addEventListener('click', function() {
        scale = 1;
        graph.style.transform = `scale(${scale})`;
    });
});