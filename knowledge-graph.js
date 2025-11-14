// 知识图谱实现
document.addEventListener('DOMContentLoaded', function() {
    const width = document.getElementById('knowledge-graph').clientWidth;
    const height = document.getElementById('knowledge-graph').clientHeight;
    
    const svg = d3.select("#knowledge-graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    const g = svg.append("g");
    
    // 定义缩放行为
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });
    
    svg.call(zoom);
    
    // 知识图谱数据 - 磁共振成像相关概念
    const nodes = [
        { id: "MRI", name: "磁共振成像", type: "main", description: "磁共振成像是一种利用核磁共振原理的医学影像技术" },
        { id: "T1", name: "T1加权", type: "technique", description: "T1加权图像主要反映组织的T1弛豫时间" },
        { id: "T2", name: "T2加权", type: "technique", description: "T2加权图像主要反映组织的T2弛豫时间" },
        { id: "PD", name: "质子密度", type: "technique", description: "质子密度加权图像反映组织中氢质子的密度" },
        { id: "Contrast", name: "对比剂", type: "material", description: "用于增强组织对比度的物质，如钆对比剂" },
        { id: "Pulse", name: "脉冲序列", type: "technique", description: "控制射频脉冲和梯度磁场的时间序列" },
        { id: "Gradient", name: "梯度磁场", type: "component", description: "用于空间定位的磁场梯度" },
        { id: "RF", name: "射频脉冲", type: "component", description: "用于激发核自旋的射频能量" },
        { id: "Magnet", name: "主磁场", type: "component", description: "产生强静态磁场的超导磁体" },
        { id: "Relaxation", name: "弛豫", type: "concept", description: "核自旋系统恢复平衡状态的过程" },
        { id: "K-space", name: "K空间", type: "concept", description: "原始数据空间，通过傅里叶变换得到图像" },
        { id: "Artifact", name: "伪影", type: "concept", description: "图像中非真实的信号或结构" },
        { id: "Safety", name: "安全性", type: "concept", description: "MRI检查中的安全注意事项" }
    ];
    
    const links = [
        { source: "MRI", target: "T1", type: "has_technique" },
        { source: "MRI", target: "T2", type: "has_technique" },
        { source: "MRI", target: "PD", type: "has_technique" },
        { source: "MRI", target: "Pulse", type: "uses" },
        { source: "MRI", target: "Gradient", type: "uses" },
        { source: "MRI", target: "RF", type: "uses" },
        { source: "MRI", target: "Magnet", type: "uses" },
        { source: "MRI", target: "Contrast", type: "may_use" },
        { source: "Pulse", target: "T1", type: "produces" },
        { source: "Pulse", target: "T2", type: "produces" },
        { source: "Pulse", target: "PD", type: "produces" },
        { source: "MRI", target: "Relaxation", type: "based_on" },
        { source: "MRI", target: "K-space", type: "uses" },
        { source: "MRI", target: "Artifact", type: "may_have" },
        { source: "MRI", target: "Safety", type: "has_aspect" }
    ];
    
    // 创建力导向图模拟
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(40));
    
    // 创建连线
    const link = g.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke-width", 2);
    
    // 创建节点
    const node = g.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .attr("fill", d => {
            switch(d.type) {
                case "main": return "#e74c3c";
                case "technique": return "#3498db";
                case "component": return "#2ecc71";
                case "material": return "#f39c12";
                case "concept": return "#9b59b6";
                default: return "#95a5a6";
            }
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // 添加节点标签
    const text = g.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "node-text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(d => d.name)
        .attr("fill", "white")
        .style("font-weight", "bold")
        .style("pointer-events", "none");
    
    // 添加工具提示
    const tooltip = d3.select("#graph-tooltip");
    
    node.on("mouseover", function(event, d) {
        tooltip
            .style("opacity", 1)
            .html(`<strong>${d.name}</strong><br>${d.description}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0);
    });
    
    // 更新力导向图位置
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
    
    // 拖拽函数
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // 缩放控制
    document.getElementById("zoom-in").addEventListener("click", function() {
        svg.transition().call(zoom.scaleBy, 1.5);
    });
    
    document.getElementById("zoom-out").addEventListener("click", function() {
        svg.transition().call(zoom.scaleBy, 0.75);
    });
    
    document.getElementById("reset").addEventListener("click", function() {
        svg.transition().call(zoom.transform, d3.zoomIdentity);
    });
});