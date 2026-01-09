/**
 * 注音王國 - 遊戲引擎 (V5 無雲朵簡潔版)
 */

(function() {
    // 嚴格模式檢查變數
    'use strict';

    const canvas = document.getElementById('gameWorld');
    const ctx = canvas ? canvas.getContext('2d') : null;
    
    // 遊戲狀態
    let state = {
        offsetX: 0,
        isDragging: false,
        lastX: 0,
        momentum: 0,
        nodes: [],
        width: 0,
        height: 0,
        maxScroll: 0,
        // bgClouds: [], // 移除雲朵
        starCount: 0
    };

    // 圖片預載物件
    const imgObj = {};

    // 1. 初始化
    function init() {
        console.log("遊戲初始化開始...");

        if (typeof Common === 'undefined') {
            alert("錯誤：找不到 Common 工具庫");
            document.getElementById('loader').style.display = 'none';
            return;
        }
        if (typeof ASSETS === 'undefined' || typeof COURSE_DATA === 'undefined') {
            console.error("錯誤：找不到 ASSETS 或 COURSE_DATA");
            Common.hideLoader();
            return;
        }
        if (!ctx) {
            console.error("錯誤：找不到 Canvas 元素");
            return;
        }

        try {
            // 預載圖片
            for (let key in ASSETS) {
                // 跳過雲朵圖片 (雖然現在沒用到了，但保持邏輯一致)
                if (key.startsWith('cloud')) continue;
                let img = new Image();
                img.src = ASSETS[key];
                imgObj[key] = img;
            }

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // initClouds(); // 移除雲朵初始化
            initNodes();
            loadProgress();
            requestAnimationFrame(gameLoop);
            
            console.log("遊戲啟動成功！");

        } catch (error) {
            console.error("初始化錯誤:", error);
            alert("遊戲載入異常");
        } finally {
            setTimeout(() => {
                if (typeof Common !== 'undefined') Common.hideLoader();
                else document.getElementById('loader').style.display = 'none';
                
                setTimeout(() => {
                    const hint = document.getElementById('drag-hint');
                    if(hint) hint.style.display = 'none';
                }, 3000);
            }, 800);
        }
    }

    // 移除 initClouds() 函式

    function initNodes() {
        const nodeSpacing = 250;
        let currentX = 150;
        
        COURSE_DATA.forEach((week, wIdx) => {
            week.lessons.forEach((lesson, lIdx) => {
                const yOffset = Math.sin(currentX * 0.008) * 150; 
                state.nodes.push({
                    x: currentX,
                    y: 0, 
                    data: lesson,
                    color: week.color,
                    isWeekStart: lIdx === 0 ? week.title : null,
                    type: 'lesson'
                });
                currentX += nodeSpacing;
            });
            currentX += 100;
        });

        state.nodes.push({
            x: currentX + 50,
            y: 0,
            data: { id: "CASTLE", title: "注音城堡" },
            color: "#FFFFFF",
            type: 'castle'
        });
        
        state.maxScroll = currentX + 300 - state.width;
        if(state.maxScroll < 0) state.maxScroll = 0;
        
        resizeCanvas(); 
    }

    function loadProgress() {
        const saved = Common.storage.get('zhuyinV7_progress');
        state.starCount = Array.isArray(saved) ? saved.length : 0;
        const countEl = document.getElementById('gem-count');
        if(countEl) countEl.innerText = state.starCount;

        if (state.starCount > 0) {
            const targetIdx = Math.min(state.starCount, state.nodes.length - 2); 
            if(state.nodes[targetIdx]) {
                let targetX = state.nodes[targetIdx].x - state.width / 2;
                if(targetX < 0) targetX = 0;
                if(targetX > state.maxScroll) targetX = state.maxScroll;
                state.offsetX = targetX;
            }
        }
    }

    function resizeCanvas() {
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        canvas.width = state.width;
        canvas.height = state.height;
        
        state.nodes.forEach(node => {
            if (node.type === 'lesson') {
                const yOffset = Math.sin(node.x * 0.008) * 150;
                node.y = (state.height / 2) + yOffset;
            } else if (node.type === 'castle') {
                 const lastLesson = state.nodes[state.nodes.length - 2];
                 if (lastLesson) node.y = lastLesson.y - 50;
                 else node.y = state.height / 2;
            }
        });
        
        if (state.nodes.length > 0) {
            const lastNodeX = state.nodes[state.nodes.length-1].x;
            state.maxScroll = lastNodeX + 300 - state.width;
            if(state.maxScroll < 0) state.maxScroll = 0;
        }
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function update() {
        if (!state.isDragging && Math.abs(state.momentum) > 0.1) {
            state.offsetX -= state.momentum;
            state.momentum *= 0.95;
            if (state.offsetX < 0) { state.offsetX = 0; state.momentum = 0; }
            if (state.offsetX > state.maxScroll) { state.offsetX = state.maxScroll; state.momentum = 0; }
        }
        
        // 移除雲朵更新邏輯
    }

    // 移除 drawFuzzyCloud() 函式

    function draw() {
        // 背景漸層：維持天空藍 (比照 index.html)
        const grad = ctx.createLinearGradient(0, 0, 0, state.height);
        grad.addColorStop(0, "#E0F7FA"); // 淺藍 (上方)
        grad.addColorStop(1, "#B2EBF2"); // 深一點的藍 (下方)
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, state.width, state.height);

        ctx.save();
        
        // 移除雲朵繪製邏輯

        ctx.translate(-state.offsetX, 0);

        // 道路
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 40;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,0,0,0.1)";

        if (state.nodes.length > 1) {
            ctx.beginPath();
            ctx.moveTo(state.nodes[0].x, state.nodes[0].y);
            for (let i = 0; i < state.nodes.length - 2; i++) {
                const p1 = state.nodes[i];
                const p2 = state.nodes[i+1];
                const xc = (p1.x + p2.x) / 2;
                const yc = (p1.y + p2.y) / 2;
                ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
            }
            let lastLesson = state.nodes[state.nodes.length-2];
            if (lastLesson) {
                ctx.lineTo(lastLesson.x, lastLesson.y);
                ctx.stroke();
            }
        }
        
        ctx.shadowBlur = 0;

        const savedProgress = Common.storage.get('zhuyinV7_progress');
        
        // 繪製節點
        state.nodes.forEach((node, index) => {
            if (node.x < state.offsetX - 150 || node.x > state.offsetX + state.width + 150) return;

            if (node.type === 'lesson') {
                if (node.isWeekStart) {
                    ctx.fillStyle = node.color;
                    ctx.beginPath();
                    ctx.roundRect(node.x - 70, node.y - 130, 140, 34, 17);
                    ctx.fill();
                    ctx.fillStyle = "#fff";
                    ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(node.isWeekStart.split('：')[0], node.x, node.y - 113);
                }

                const isDone = savedProgress.includes(node.data.id);
                const isLocked = index > 0 && 
                               state.nodes[index-1] && 
                               !savedProgress.includes(state.nodes[index-1].data.id);

                ctx.beginPath();
                ctx.arc(node.x, node.y, 55, 0, Math.PI * 2);
                ctx.fillStyle = isLocked ? "#CFD8DC" : node.color;
                ctx.shadowColor = "rgba(0,0,0,0.15)";
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 5;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;

                ctx.beginPath();
                ctx.arc(node.x, node.y, 48, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();

                if(!isLocked && node.data.imgKey && imgObj[node.data.imgKey] && imgObj[node.data.imgKey].complete) {
                     ctx.save();
                     ctx.beginPath();
                     ctx.arc(node.x, node.y, 40, 0, Math.PI*2);
                     ctx.clip();
                     ctx.drawImage(imgObj[node.data.imgKey], node.x - 40, node.y - 40, 80, 80);
                     ctx.restore();
                } else if (isLocked) {
                    ctx.font = "900 30px 'Font Awesome 6 Free'";
                    ctx.fillStyle = "#B0BEC5";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("\uf023", node.x, node.y);
                } else {
                    ctx.fillStyle = node.color;
                    ctx.font = "bold 24px 'Zen Maru Gothic', sans-serif";
                    ctx.fillText(node.data.id, node.x, node.y + 5);
                }

                if (isDone) {
                    ctx.font = "900 24px 'Font Awesome 6 Free'";
                    ctx.fillStyle = "#FFD700";
                    ctx.strokeStyle = "#fff";
                    ctx.lineWidth = 3;
                    ctx.strokeText("\uf005", node.x + 35, node.y - 35);
                    ctx.fillText("\uf005", node.x + 35, node.y - 35);
                }

                ctx.fillStyle = "#5D4037";
                ctx.font = "bold 16px 'Zen Maru Gothic', sans-serif";
                ctx.fillText(node.data.title.split(' ')[1], node.x, node.y + 80);

            } else if (node.type === 'castle') {
                const isUnlocked = state.starCount >= 12;
                const size = 200;
                if(imgObj.home_castle && imgObj.home_castle.complete) {
                    if(!isUnlocked) ctx.filter = "grayscale(100%) opacity(0.7)";
                    ctx.drawImage(imgObj.home_castle, node.x - size/2, node.y - size/2, size, size);
                    ctx.filter = "none";
                } else {
                    ctx.font = "900 40px 'Font Awesome 6 Free'";
                    ctx.fillStyle = isUnlocked ? "#FF9EAA" : "#555";
                    ctx.textAlign = "center";
                    ctx.fillText("\uf447", node.x, node.y);
                }
                
                if(!isUnlocked) {
                    ctx.font = "900 40px 'Font Awesome 6 Free'";
                    ctx.fillStyle = "#555";
                    ctx.fillText("\uf023", node.x, node.y);
                }
            }
        });

        ctx.restore();
    }

    let dragStartX = 0;
    let dragStartTime = 0;

    canvas.addEventListener('mousedown', startDrag);
    canvas.addEventListener('touchstart', (e) => startDrag(e.touches[0]), {passive: false});
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', (e) => {
        if(state.isDragging) e.preventDefault(); 
        drag(e.touches[0]);
    }, {passive: false});
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    function startDrag(e) {
        state.isDragging = true;
        state.lastX = e.clientX;
        dragStartX = e.clientX;
        dragStartTime = Date.now();
        state.momentum = 0;
    }

    function drag(e) {
        if (!state.isDragging) return;
        const delta = e.clientX - state.lastX;
        state.offsetX -= delta;
        if (state.offsetX < -50) state.offsetX = -50; 
        if (state.offsetX > state.maxScroll + 50) state.offsetX = state.maxScroll + 50;
        state.lastX = e.clientX;
        state.momentum = delta * -0.8;
    }

    function endDrag(e) {
        state.isDragging = false;
        const dist = Math.abs(state.lastX - dragStartX);
        const time = Date.now() - dragStartTime;
        if (dist < 10 && time < 300) {
            handleTap(dragStartX, e.clientY || (state.nodes[0] ? state.nodes[0].y : 0));
        }
    }

    function handleTap(screenX, screenY) {
        const worldX = screenX + state.offsetX;
        const worldY = screenY;

        state.nodes.forEach((node, idx) => {
            const dx = worldX - node.x;
            const dy = worldY - node.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 60) {
                if (node.type === 'lesson') {
                    const saved = Common.storage.get('zhuyinV7_progress');
                    const isLocked = idx > 0 && 
                                   state.nodes[idx-1] && 
                                   !saved.includes(state.nodes[idx-1].data.id);
                                   
                    if(!isLocked) {
                        if (typeof window.openLesson === 'function') {
                            window.openLesson(node.data);
                        } else {
                            console.error("openLesson function not found");
                        }
                    } else {
                        Common.speak("這一關還沒解鎖喔");
                    }
                } else if (node.type === 'castle') {
                    if (state.starCount >= 12) {
                        Common.fireConfetti();
                        Common.speak("恭喜你！完全破關了！");
                        alert("🎉 恭喜你收集滿12顆星星，解鎖了注音城堡！");
                    } else {
                        Common.speak("要收集12顆星星才能打開城堡");
                    }
                }
            }
        });
    }

    let currentLesson = null;
    let quizIdx = 0;

    window.openLesson = function(lessonData) {
        currentLesson = lessonData;
        quizIdx = 0;
        const titleEl = document.getElementById('lesson-title-display');
        const modalEl = document.getElementById('lesson-modal');
        if(titleEl) titleEl.innerText = lessonData.title;
        if(modalEl) modalEl.style.display = 'flex';
        if (typeof window.switchTab === 'function') window.switchTab(0);
    };

    window.closeLesson = function() {
        const modalEl = document.getElementById('lesson-modal');
        if(modalEl) modalEl.style.display = 'none';
        if(window.speechSynthesis) window.speechSynthesis.cancel();
        loadProgress(); 
    };

    window.switchTab = function(idx) {
        document.querySelectorAll('.tab-item').forEach((el, i) => {
            el.classList.toggle('active', i === idx);
            el.style.color = (i === idx) ? 'white' : '#999';
        });
        renderTabContent(idx);
    };

    function renderTabContent(idx) {
        const container = document.getElementById('lesson-container');
        if(!container || !currentLesson) return;
        
        container.innerHTML = "";
        const data = currentLesson.content;

        if (idx === 0) { 
            const imgUrl = (ASSETS && ASSETS[currentLesson.imgKey]) || (ASSETS && ASSETS.default) || '';
            const imgTag = `<img src="${imgUrl}" style="width:120px; height:120px; object-fit:contain; margin-bottom:15px;" onerror="this.style.display='none'">`;
            container.innerHTML = `
                <div class="clay-card animate__animated animate__fadeIn">
                    ${imgTag}
                    <h3 class="fw-bold mb-3">暖身動作</h3>
                    <p class="fs-4 fw-bold text-main">${data.warmup}</p>
                </div>
            `;
        } else if (idx === 1) { 
            let html = `<div class="flashcard-grid">`;
            data.cards.forEach(c => {
                const imgUrl = (c.i) || (ASSETS && ASSETS.default) || '';
                html += `
                    <div class="flashcard" onclick="Common.speak('${c.t}，${c.w}')">
                        <div class="flashcard-char">${c.t}</div>
                        <div class="flashcard-media">
                            <img src="${imgUrl}" onerror="this.style.display='none'">
                            <div class="flashcard-word">${c.w}</div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            container.innerHTML = html;
        } else if (idx === 2) { 
            const imgUrl = (ASSETS && ASSETS[currentLesson.imgKey]) || (ASSETS && ASSETS.default) || '';
            container.innerHTML = `
                <div class="clay-card">
                    <img src="${imgUrl}" style="width:120px; height:120px; object-fit:contain; margin-bottom:15px;" onerror="this.style.display='none'">
                    <h3 class="fw-bold mb-3">${data.game.title}</h3>
                    <p class="fs-4 fw-bold text-main">${data.game.desc}</p>
                </div>
            `;
        } else if (idx === 3) { 
            if (quizIdx >= data.quiz.length) {
                Common.storage.save('zhuyinV7_progress', currentLesson.id);
                Common.fireConfetti();
                const starImg = ASSETS && ASSETS.finish_star ? ASSETS.finish_star : '';
                container.innerHTML = `
                    <div class="text-center py-5">
                        <img src="${starImg}" style="width:100px; margin-bottom:20px;" class="animate-bounce" onerror="this.style.display='none'">
                        <h2 class="fw-bold mb-3">太棒了！</h2>
                        <p class="text-muted fs-5">獲得一顆星星</p>
                        <button class="btn btn-primary rounded-pill px-5 mt-4 py-2 fs-5 shadow" style="background-color: var(--btn-primary);" onclick="closeLesson()">回到地圖</button>
                    </div>
                `;
            } else {
                const q = data.quiz[quizIdx];
                Common.speak(q.q);
                let opts = q.o.map(opt => `<div class="quiz-option" onclick="checkAns(this, '${opt}', '${q.a}')">${opt}</div>`).join('');
                container.innerHTML = `
                    <div class="text-center">
                        <div class="text-muted mb-2">第 ${quizIdx+1} / ${data.quiz.length} 題</div>
                        <h3 class="fw-bold mb-4">${q.q}</h3>
                        <div class="quiz-options-grid">${opts}</div>
                    </div>
                `;
            }
        }
    }

    window.checkAns = function(el, ans, correct) {
        if (ans === correct) {
            el.classList.add('correct');
            Common.speak("答對了");
            setTimeout(() => {
                quizIdx++;
                renderTabContent(3);
            }, 800);
        } else {
            el.classList.add('wrong');
            Common.speak("再試一次");
            setTimeout(() => el.classList.remove('wrong'), 500);
        }
    };

    window.resetApp = function() {
        if (confirm("要重置所有進度嗎？(星星將歸零)")) {
            Common.storage.clear('zhuyinV7_progress');
            loadProgress();
            state.offsetX = 0;
        }
    };

    window.addEventListener('load', init);

})();