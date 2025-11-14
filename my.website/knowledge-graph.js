// 简化版知识图谱实现
document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.getElementById('knowledge-graph');
    
    // 创建简单的SVG知识图谱
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    
    // 磁共振成像相关概念
    const concepts = [
        { name: "磁共振成像", x: 50, y: 50, color: "#e74c3c" },
        { name: "T1加权", x: 30, y: 30, color: "#3498db" },
        { name: "T2加权", x: 70, y: 30, color: "#3498db" },
        { name: "脉冲序列", x: 30, y: 70, color: "#2ecc71" },
        { name: "对比剂", x: 70, y: 70, color: "#f39c12" }
    ];
    
    // 创建概念节点
    concepts.forEach(concept => {
        // 创建圆形节点
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", concept.x + "%");
        circle.setAttribute("cy", concept.y + "%");
        circle.setAttribute("r", "30");
        circle.setAttribute("fill", concept.color);
        circle.setAttribute("class", "node");
        
        // 创建文本标签
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", concept.x + "%");
        text.setAttribute("y", concept.y + "%");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dy", "5");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "12");
        text.textContent = concept.name;
        
        svg.appendChild(circle);
        svg.appendChild(text);
    });
    
    // 创建连接线
    const connections = [
        { from: "磁共振成像", to: "T1加权" },
        { from: "磁共振成像", to: "T2加权" },
        { from: "磁共振成像", to: "脉冲序列" },
        { from: "磁共振成像", to: "对比剂" }
    ];
    
    connections.forEach(conn => {
        const from = concepts.find(c => c.name === conn.from);
        const to = concepts.find(c => c.name === conn.to);
        
        if (from && to) {
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", from.x + "%");
            line.setAttribute("y1", from.y + "%");
            line.setAttribute("x2", to.x + "%");
            line.setAttribute("y2", to.y + "%");
            line.setAttribute("stroke", "#999");
            line.setAttribute("stroke-width", "2");
            
            svg.insertBefore(line, svg.firstChild);
        }
    });
    
    // 清空容器并添加SVG
    graphContainer.innerHTML = '';
    graphContainer.appendChild(svg);
    
    // 添加缩放控制功能
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset');
    
    let scale = 1;
    
    zoomInBtn.addEventListener('click', function() {
        scale *= 1.2;
        svg.style.transform = `scale(${scale})`;
    });
    
    zoomOutBtn.addEventListener('click', function() {
        scale /= 1.2;
        svg.style.transform = `scale(${scale})`;
    });
    
    resetBtn.addEventListener('click', function() {
        scale = 1;
        svg.style.transform = `scale(${scale})`;
    });
    
    // 添加节点悬停效果
    const nodes = svg.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseover', function() {
            this.style.stroke = '#000';
            this.style.strokeWidth = '2px';
        });
        
        node.addEventListener('mouseout', function() {
            this.style.stroke = 'none';
        });
    });
});