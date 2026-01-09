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

    // 4. 特效 - 紙花 (Confetti)
    fireConfetti: function() {
        const colors = ['#FF9EAA', '#80DEEA', '#FFE082'];
        for(let i=0; i<50; i++) {
            const el = document.createElement('div');
            el.style.position = 'fixed';
            el.style.left = Math.random()*100 + 'vw';
            el.style.top = '-10px';
            el.style.width = '12px';
            el.style.height = '12px';
            el.style.background = colors[Math.floor(Math.random()*3)];
            el.style.transition = 'top 1s ease-in, transform 1s linear';
            el.style.zIndex = '9999';
            el.style.pointerEvents = 'none';
            document.body.appendChild(el);
            
            setTimeout(() => {
                el.style.top = '100vh';
                el.style.transform = `rotate(${Math.random()*720}deg)`;
            }, 10);
            
            setTimeout(() => el.remove(), 1000);
        }
    }
};