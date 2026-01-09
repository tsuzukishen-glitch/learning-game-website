/**
 * 奇幻學習島 - 共用工具庫 (V2 安全版)
 * 包含：語音、存檔、特效、UI輔助
 */

const Common = {
    // 1. 文字轉語音 (TTS)
    speak: function(text, rate = 0.8) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'zh-TW';
            u.rate = rate;
            window.speechSynthesis.speak(u);
        }
    },

    // 2. 本地儲存 (LocalStorage) - ★ 安全修正：加入 try-catch 防止壞檔導致卡死
    storage: {
        get: (key) => {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                console.error("讀取存檔失敗，重置為空陣列:", e);
                return []; // 發生錯誤時回傳空陣列，避免當機
            }
        },
        save: (key, id) => {
            try {
                let saved = [];
                const data = localStorage.getItem(key);
                if (data) {
                    try { saved = JSON.parse(data); } catch(e) {}
                }
                
                if (Array.isArray(saved) && !saved.includes(id)) {
                    saved.push(id);
                    localStorage.setItem(key, JSON.stringify(saved));
                } else if (!Array.isArray(saved)) {
                    saved = [id];
                    localStorage.setItem(key, JSON.stringify(saved));
                }
                return saved;
            } catch (e) {
                console.error("存檔失敗:", e);
                return [];
            }
        },
        clear: (key) => localStorage.removeItem(key)
    },

    // 3. UI 輔助 - 隱藏載入畫面
    hideLoader: function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = 0;
            // 確保元素被移除
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    },

    // 4. 特效 - 紙花 (Confetti) - 優化版：加入隨機速度與飄移
    fireConfetti: function() {
        const colors = ['#FF9EAA', '#80DEEA', '#FFE082', '#A5D6A7', '#FFAB91'];
        // 增加紙花數量
        const count = 60; 

        for(let i=0; i<count; i++) {
            const el = document.createElement('div');
            
            // 隨機參數產生
            const duration = Math.random() * 1.5 + 1; // 隨機時間 1s ~ 2.5s
            const size = Math.random() * 8 + 6;       // 隨機大小 6px ~ 14px
            const startLeft = Math.random() * 100;    // 起始位置 0% ~ 100%
            
            // 初始樣式
            el.style.position = 'fixed';
            el.style.left = startLeft + 'vw';
            el.style.top = '-20px'; // 從螢幕上方外面開始
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.zIndex = '9999';
            el.style.pointerEvents = 'none';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'; // 圓形或方形
            
            // 設定轉場動畫 (時間由隨機決定)
            el.style.transition = `top ${duration}s ease-in, transform ${duration}s linear, opacity ${duration}s ease-in`;
            
            document.body.appendChild(el);
            
            // 觸發動畫 (加入極短的隨機延遲，讓發射感更自然)
            setTimeout(() => {
                el.style.top = '110vh'; // 掉落到底部外
                
                // 隨機飄移量 (-30vw 到 +30vw)
                const drift = (Math.random() - 0.5) * 60; 
                // 隨機旋轉角度
                const rotate = Math.random() * 720 - 360; 
                
                el.style.transform = `translateX(${drift}vw) rotate(${rotate}deg)`;
                el.style.opacity = '0.7'; // 落下時稍微變透明
            }, Math.random() * 300); // 0~0.3秒的發射延遲
            
            // 清理
            setTimeout(() => el.remove(), duration * 1000 + 500);
        }
    }
};