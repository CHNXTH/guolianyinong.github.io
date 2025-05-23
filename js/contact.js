// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化地图
    initMap();
    
    // 初始化位置切换
    initLocationSwitch();
});

// 地图实例
let map;
// 标记点数组
let markers = [];

// 位置数据
const locations = {
    orchard: [
        { name: '沂源果园基地', position: [118.170979, 36.184264], type: 'orchard' },
        { name: '东里果园基地', position: [118.195425, 36.179851], type: 'orchard' }
    ],
    factory: [
        { name: '沂源加工厂', position: [118.173526, 36.186752], type: 'factory' },
        { name: '南麻加工点', position: [118.198741, 36.182634], type: 'factory' }
    ],
    store: [
        { name: '果链益农体验店', position: [118.171852, 36.185147], type: 'store' },
        { name: '果品展销中心', position: [118.196324, 36.180963], type: 'store' }
    ]
};

// 初始化地图
function initMap() {
    // 创建地图实例
    map = new AMap.Map('map', {
        zoom: 13,
        center: [118.170979, 36.184264],
        viewMode: '3D'
    });
    
    // 添加控件
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.Scale());
    
    // 默认显示果园位置
    showLocations('orchard');
}

// 显示指定类型的位置
function showLocations(type) {
    // 清除现有标记
    clearMarkers();
    
    // 创建新标记
    locations[type].forEach(location => {
        const marker = new AMap.Marker({
            position: location.position,
            title: location.name,
            animation: 'AMAP_ANIMATION_DROP'
        });
        
        // 创建信息窗体
        const infoWindow = new AMap.InfoWindow({
            content: `<div class="info-window">
                        <h4>${location.name}</h4>
                        <p>地址：山东省淄博市沂源县</p>
                        <p>电话：400-XXX-XXXX</p>
                     </div>`,
            offset: new AMap.Pixel(0, -30)
        });
        
        // 点击标记显示信息窗体
        marker.on('click', () => {
            infoWindow.open(map, marker.getPosition());
        });
        
        markers.push(marker);
    });
    
    // 将标记添加到地图
    map.add(markers);
    
    // 调整视野以包含所有标记
    map.setFitView();
}

// 清除所有标记
function clearMarkers() {
    if (markers.length > 0) {
        map.remove(markers);
        markers = [];
    }
}

// 初始化位置切换
function initLocationSwitch() {
    const locationItems = document.querySelectorAll('.location-item');
    
    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            locationItems.forEach(i => i.classList.remove('active'));
            // 添加active类到当前项
            item.classList.add('active');
            // 显示对应类型的位置
            showLocations(item.dataset.type);
        });
    });
}

// 添加地图样式
const style = document.createElement('style');
style.textContent = `
    .info-window {
        padding: 10px;
        max-width: 200px;
    }
    
    .info-window h4 {
        margin: 0 0 10px;
        color: var(--primary-color);
    }
    
    .info-window p {
        margin: 5px 0;
        color: #666;
    }
`;
document.head.appendChild(style); 