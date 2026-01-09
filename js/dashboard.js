/**
 * 奇幻學習島 - 大廳邏輯
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 主題資料
    const THEMES = [
        {
            id: 'zhuyin',
            title: '注音王國',
            desc: '跟著 ㄅㄆㄇ 一起冒險！學習聲母、韻母與拼音的魔法，解鎖神祕城堡。',
            img: 'assets/images/ZhuyinCastle.png',
            link: 'zhuyin.html', 
            color: '#FF9EAA',
            tags: ['語文', '3-6歲'],
            isLocked: false,
            storageKey: 'zhuyinV7_progress',
            totalLevels: 12
        },
        {
            id: 'math',
            title: '數字城堡',
            desc: '123 數字變變變！認識數字、加減法與邏輯形狀，訓練小小數學家。',
            img: 'assets/images/NumberCastle.png',
            link: '#',
            color: '#80DEEA',
            tags: ['數學', '3-6歲'],
            isLocked: true, 
            storageKey: 'math_progress',
            totalLevels: 20
        },
        {
            id: 'english',
            title: '英文森林',
            desc: 'ABC 快樂唱！探索字母森林，學習單字與日常會話，與動物朋友們對話。',
            img: 'assets/images/EnglishForest.png',
            link: '#',
            color: '#C5E1A5',
            tags: ['外語', '3-6歲'],
            isLocked: true, 
            storageKey: 'english_progress',
            totalLevels: 26
        }
    ];

    const container = document.getElementById('theme-list');
    container.innerHTML = '';

    THEMES.forEach(theme => {
        // 計算進度
        const saved = Common.storage.get(theme.storageKey);
        const progressPercent = Math.round((saved.length / theme.totalLevels) * 100);
        
        // 建立卡片
        const card = document.createElement('a');
        card.className = `theme-card ${theme.isLocked ? 'locked' : ''}`;
        
        if (!theme.isLocked) {
            card.href = theme.link;
        } else {
            card.onclick = (e) => {
                e.preventDefault();
                alert(`🚧 ${theme.title} 目前正在建設中，敬請期待！`);
            };
        }

        // 標籤 HTML
        const tagsHtml = theme.tags.map(tag => 
            `<span class="tag" style="background:${theme.color}">${tag}</span>`
        ).join('');

        // 圖片錯誤處理
        const imgOnError = `this.onerror=null;this.src='assets/images/Icon.png';`;

        card.innerHTML = `
            <div class="status-icon">
                ${theme.isLocked ? '<i class="fa-solid fa-lock"></i>' : '<i class="fa-solid fa-play-circle"></i>'}
            </div>
            <div class="card-img-wrapper">
                <img src="${theme.img}" class="theme-img" alt="${theme.title}" onerror="${imgOnError}">
            </div>
            <div class="theme-info">
                <div class="tag-container">
                    ${tagsHtml}
                    ${theme.isLocked ? '<span class="tag bg-secondary">Coming Soon</span>' : ''}
                </div>
                <div class="theme-name">${theme.title}</div>
                <div class="theme-desc">${theme.desc}</div>
                
                ${!theme.isLocked ? `
                    <div class="d-flex justify-content-between small text-muted mt-2">
                        <span>探索進度</span>
                        <span>${progressPercent}%</span>
                    </div>
                    <div class="progress-wrapper">
                        <div class="progress-fill" style="width: ${progressPercent}%; background: ${theme.color};"></div>
                    </div>
                ` : ''}
            </div>
        `;

        container.appendChild(card);
    });
});