/**
 * 注音王國 - 資料設定檔
 */

// 圖片資產路徑
const ASSETS = {
    // 系統圖示
    home_castle: "assets/images/Castle.png",
    gem_icon: "assets/images/Gem.png",
    finish_star: "assets/images/Star.png",

    // 雲朵圖片
    cloud_1: "assets/images/Cloud1.png",
    cloud_2: "assets/images/Cloud2.png",
    cloud_3: "assets/images/Cloud3.png",
    
    // 第一週: 嘴唇與舌頭的體操
    l1_icon: "assets/images/Popcorn.png",
    l1_card_b: "assets/images/Bun.png", l1_card_p: "assets/images/Grapes.png", l1_card_m: "assets/images/Hat.png", l1_card_f: "assets/images/Plane.png",
    l2_icon: "assets/images/Drum.png",
    l2_card_d: "assets/images/Knife.png", l2_card_t: "assets/images/Rabbit.png", l2_card_n: "assets/images/Milk.png", l2_card_l: "assets/images/Happy.png",
    l3_icon: "assets/images/Hat2.png",
    l3_card_1: "assets/images/Road.png", l3_card_2: "assets/images/Climb.png", l3_card_3: "assets/images/Check.png", l3_card_4: "assets/images/Slide.png",

    // 第二週: 與牙齒的派對
    l4_icon: "assets/images/Dove.png",
    l4_card_g: "assets/images/Dove.png", l4_card_k: "assets/images/Tadpole.png", l4_card_h: "assets/images/Water.png",
    l5_icon: "assets/images/Watermelon.png",
    l5_card_j: "assets/images/Chick.png", l5_card_q: "assets/images/Balloon.png", l5_card_x: "assets/images/Watermelon.png",
    l6_icon: "assets/images/Trophy.png",
    l6_card_1: "assets/images/Lips.png", l6_card_2: "assets/images/Tongue.png", l6_card_3: "assets/images/Voice.png",

    // 第三週: 捲舌與平平舌
    l7_icon: "assets/images/Spider.png",
    l7_card_zh: "assets/images/Spider.png", l7_card_ch: "assets/images/Rice.png", l7_card_sh: "assets/images/Lion.png", l7_card_r: "assets/images/Calendar.png",
    l8_icon: "assets/images/Bath.png",
    l8_card_z: "assets/images/Bath.png", l8_card_c: "assets/images/Hedgehog.png", l8_card_s: "assets/images/Loofah.png",
    l9_icon: "assets/images/Ear.png",
    l9_card_1: "assets/images/Tongue.png", l9_card_2: "assets/images/Flat.png",

    // 第四週: 魔法咒語與畢業
    l10_icon: "assets/images/Mouth.png",
    l10_card_a: "assets/images/Woman.png", l10_card_o: "assets/images/Rooster.png", l10_card_e: "assets/images/Goose.png", l10_card_ie: "assets/images/Yeah.png",
    l11_icon: "assets/images/Train.png",
    l11_card_i: "assets/images/Shirt.png", l11_card_u: "assets/images/Turtle.png", l11_card_yu: "assets/images/Fish.png",
    l12_icon: "assets/images/Grad.png",
    l12_card_1: "assets/images/Wand.png", l12_card_2: "assets/images/Mom.png", l12_card_3: "assets/images/Diploma.png",
    
    default: "assets/images/Icon.png"
};

// 課程內容資料
const COURSE_DATA = [
    {
        week: 1, title: "第一週：嘴唇體操", color: "#FF9EAA",
        lessons: [
            { id: "L1", title: "L1 啵啵爆米花 (ㄅㄆㄇㄈ)", imgKey: "l1_icon", content: { 
                warmup: "假裝我們是爆米花機，蹲在地上<br>「啵(ㄅ)！」跳起來！接著像吹泡泡一樣，「噗(ㄆ)！」吹一口氣。", 
                cards: [{t:"ㄅ", w:"包子", i:ASSETS.l1_card_b}, {t:"ㄆ", w:"葡萄", i:ASSETS.l1_card_p}, {t:"ㄇ", w:"帽子", i:ASSETS.l1_card_m}, {t:"ㄈ", w:"飛機", i:ASSETS.l1_card_f}],
                game: { title:"嘴唇夾夾樂", desc:"請孩子抿住嘴唇唸「ㄅ、ㄆ、ㄇ」，家長假裝要撬開孩子的嘴巴，孩子要用力閉緊，感受嘴唇的力量。" },
                quiz: [
                    {q:"哪一個是「葡萄」的聲音？", a:"ㄆ", o:["ㄅ","ㄆ","ㄇ"]},
                    {q:"哪一個是「包子」的聲音？", a:"ㄅ", o:["ㄅ","ㄆ","ㄈ"]},
                    {q:"哪一個是「飛機」的聲音？", a:"ㄈ", o:["ㄇ","ㄈ","ㄅ"]}
                ]
            }},
            { id: "L2", title: "L2 小鼓手咚咚咚 (ㄉㄊㄋㄌ)", imgKey: "l2_icon", content: {
                warmup: "大家當小鼓手，用手拍大腿<br>「ㄉ、ㄉ、ㄉ」！接著假裝踢足球，「ㄊ、ㄊ、ㄊ」！",
                cards: [{t:"ㄉ", w:"刀子", i:ASSETS.l2_card_d}, {t:"ㄊ", w:"兔子", i:ASSETS.l2_card_t}, {t:"ㄋ", w:"牛奶", i:ASSETS.l2_card_n}, {t:"ㄌ", w:"快樂", i:ASSETS.l2_card_l}],
                game: { title:"聽音踩踩樂", desc:"家長把四張字卡散落在地上。家長唸「ㄋㄋㄋ」，孩子要跑去踩(或拍)「ㄋ」的字卡。" },
                quiz: [
                    {q:"哪一個是「兔子」的聲音？", a:"ㄊ", o:["ㄉ","ㄊ","ㄌ"]},
                    {q:"哪一個是「牛奶」的聲音？", a:"ㄋ", o:["ㄋ","ㄌ","ㄉ"]},
                    {q:"哪一個是「快樂」的聲音？", a:"ㄌ", o:["ㄉ","ㄊ","ㄌ"]}
                ]
            }},
            { id: "L3", title: "L3 聲調國王的帽子 (四聲練習)", imgKey: "l3_icon", content: {
                warmup: "學機器人說話(一聲)、學驚訝說「蛤？」(二聲)、學點頭說「好」(三聲)、學叫人說「去！」(四聲)。",
                cards: [{t:"ˉ", w:"平平的馬路", i:ASSETS.l3_card_1}, {t:"ˊ", w:"爬上山坡 ", i:ASSETS.l3_card_2}, {t:"ˇ", w:"下坡再上坡，打勾勾", i:ASSETS.l3_card_3}, {t:"ˋ", w:"溜滑梯溜下來", i:ASSETS.l3_card_4}],
                game: { title:"聲調指揮家", desc:"家長比手勢（例如手往上揚），孩子要發出對應的二聲聲音（隨便一個音，如ㄇㄚˊ）。" },
                quiz: [
                    {q:"溜滑梯是幾聲？", a:"ˋ", o:["ˉ","ˊ","ˋ"]},
                    {q:"爬山坡是幾聲？", a:"ˊ", o:["ˉ","ˊ","ˇ"]},
                    {q:"打勾勾是幾聲？", a:"ˇ", o:["ˊ","ˇ","ˋ"]}
                ]
            }}
        ]
    },
    {
        week: 2, title: "第二週：牙齒派對", color: "#80DEEA",
        lessons: [
            { id: "L4", title: "L4 鴿子笑嘻嘻 (ㄍㄎㄏ)", imgKey: "l4_icon", content: { 
                warmup: "假裝漱口「咕嚕咕嚕」，感受喉嚨震動。", 
                cards: [{t:"ㄍ", w:"鴿子", i:ASSETS.l4_card_g}, {t:"ㄎ", w:"蝌蚪", i:ASSETS.l4_card_k}, {t:"ㄏ", w:"喝水", i:ASSETS.l4_card_h}],
                game: { title:"哈氣大力士", desc:"拿一張衛生紙放在嘴巴前。唸ㄍ時紙不動，唸ㄎ時紙會飛一點點，唸ㄏ時紙會飄起來。比賽誰讓衛生紙飄最高。" },
                quiz: [
                    {q:"哪一個是「喝水」的聲音？", a:"ㄏ", o:["ㄍ","ㄎ","ㄏ"]},
                    {q:"哪一個是「鴿子」的聲音？", a:"ㄍ", o:["ㄍ","ㄎ","ㄏ"]},
                    {q:"哪一個是「蝌蚪」的聲音？", a:"ㄎ", o:["ㄍ","ㄎ","ㄏ"]}
                ]
            }},
            { id: "L5", title: "L5 小雞氣球西瓜 (ㄐㄑㄒ)", imgKey: "l5_icon", content: { 
                warmup: "做一個大大的微笑，牙齒對齊<br>發出「嘻(ㄒ)」的聲音。", 
                cards: [{t:"ㄐ", w:"小雞", i:ASSETS.l5_card_j}, {t:"ㄑ", w:"氣球", i:ASSETS.l5_card_q}, {t:"ㄒ", w:"西瓜", i:ASSETS.l5_card_x}],
                game: { title:"切切樂", desc:"家長當大西瓜，孩子當小刀子。家長唸「ㄒ」，孩子就跑來假裝切一下家長的手臂。唸「ㄐ」就學小雞啄米。" },
                quiz: [
                    {q:"哪一個是「西瓜」的聲音？", a:"ㄒ", o:["ㄐ","ㄑ","ㄒ"]},
                    {q:"哪一個是「氣球」的聲音？", a:"ㄑ", o:["ㄐ","ㄑ","ㄒ"]},
                    {q:"哪一個是「小雞」的聲音？", a:"ㄐ", o:["ㄐ","ㄑ","ㄒ"]}
                ]
            }},
            { id: "L6", title: "L6 總複習", imgKey: "l6_icon", content: { 
                warmup: "唱「ㄅㄆㄇ之歌」的前半段。", 
                cards: [{t:"複習", w:"ㄅㄆㄇ", i:ASSETS.l6_card_1}, {t:"複習", w:"ㄉㄊㄋ", i:ASSETS.l6_card_2}, {t:"複習", w:"ㄍㄎㄏ", i:ASSETS.l6_card_3}],
                game: { title:"字卡釣魚", desc:"把字卡鋪在地上，用衣架綁繩子當釣竿。家長下指令：「請釣一隻『鴿子』(ㄍ)！」孩子釣到後要大聲唸出來。" },
                quiz: [
                    {q:"哪一個是圓唇音？", a:"ㄅ", o:["ㄅ","ㄐ","ㄒ"]},
                    {q:"哪一個是舌尖音？", a:"ㄉ", o:["ㄉ","ㄍ","ㄐ"]},
                    {q:"哪一個是喉嚨音？", a:"ㄏ", o:["ㄏ","ㄅ","ㄉ"]}
                ]
            }}
        ]
    },
    {
        week: 3, title: "第三週：捲舌與平舌", color: "#FFE082",
        lessons: [
            { id: "L7", title: "L7 蜘蛛吃薯條 (ㄓㄔㄕㄖ)", imgKey: "l7_icon", content: {
                warmup: "舌頭體操：舌頭往上捲，假裝要碰到天花板(上顎)。<br>發出引擎聲「ㄖㄖㄖ」。",
                cards: [{t:"ㄓ", w:"蜘蛛", i:ASSETS.l7_card_zh}, {t:"ㄔ", w:"吃飯", i:ASSETS.l7_card_ch}, {t:"ㄕ", w:"獅子", i:ASSETS.l7_card_sh}, {t:"ㄖ", w:"日曆", i:ASSETS.l7_card_r}],
                game: { title:"獅子來了", desc:"家長當獅子(ㄕ)，孩子當蜘蛛(ㄓ)。聽到ㄕ要趕快躲起來，聽到ㄓ要比出蜘蛛人手勢。" },
                quiz: [
                    {q:"哪一個是「獅子」的聲音？", a:"ㄕ", o:["ㄓ","ㄔ","ㄕ"]},
                    {q:"哪一個是「蜘蛛」的聲音？", a:"ㄓ", o:["ㄓ","ㄔ","ㄕ"]},
                    {q:"哪一個是「吃飯」的聲音？", a:"ㄔ", o:["ㄓ","ㄔ","ㄕ"]}
                ]
            }},
            { id: "L8", title: "L8 洗澡擦擦臉 (ㄗㄘㄙ)", imgKey: "l8_icon", content: {
                warmup: "大大的微笑，牙齒輕輕咬合，舌頭平平的頂在牙齒後面<br>發出像蛇一樣的聲音「嘶(ㄙ)」。",
                cards: [{t:"ㄗ", w:"洗澡", i:ASSETS.l8_card_z}, {t:"ㄘ", w:"刺蝟", i:ASSETS.l8_card_c}, {t:"ㄙ", w:"絲瓜", i:ASSETS.l8_card_s}],
                game: { title:"木頭人變變變", desc:"聽到捲舌音(如ㄓ)要動動身體，聽到平舌音(如ㄗ)要像木頭人不能動(因為舌頭平平的)。" },
                quiz: [
                    {q:"哪一個是「洗澡」的聲音？", a:"ㄗ", o:["ㄗ","ㄘ","ㄙ"]},
                    {q:"哪一個是「刺蝟」的聲音？", a:"ㄘ", o:["ㄗ","ㄘ","ㄙ"]},
                    {q:"哪一個是「絲瓜」的聲音？", a:"ㄙ", o:["ㄗ","ㄘ","ㄙ"]}
                ]
            }},
            { id: "L9", title: "L9 聲音變變變 (分辨練習)", imgKey: "l9_icon", content: {
                warmup: "舌頭體操：舌頭伸長(ㄌ)、舌頭捲起(ㄓ)、舌頭變平(ㄗ)。。",
                cards: [{t:"辨別", w:"ㄓvsㄗ", i:ASSETS.l9_card_1}, {t:"辨別", w:"ㄔvsㄘ", i:ASSETS.l9_card_2}, {t:"辨別", w:"ㄕvsㄙ", i:ASSETS.l9_card_1}], 
                game: { title:"舌頭警察", desc:"孩子當警察，拿著放大鏡(或是手圈起來)，看爸爸媽媽唸得對不對。家長可以故意唸錯讓孩子糾正。" },
                quiz: [
                    {q:"捲起來的是？", a:"ㄓ", o:["ㄓ","ㄗ","ㄙ"]},
                    {q:"平平的是？", a:"ㄙ", o:["ㄕ","ㄙ","ㄓ"]},
                    {q:"捲起來的是？", a:"ㄔ", o:["ㄔ","ㄘ","ㄙ"]}
                ]
            }}
        ]
    },
    {
        week: 4, title: "第四週：魔法畢業", color: "#C5E1A5",
        lessons: [
            { id: "L10", title: "L10 張大嘴巴 (ㄚㄛㄜㄝ)", imgKey: "l10_icon", content: {
                warmup: "比比看誰嘴巴張最大！",
                cards: [{t:"ㄚ", w:"阿姨", i:ASSETS.l10_card_a}, {t:"ㄛ", w:"公雞", i:ASSETS.l10_card_o}, {t:"ㄜ", w:"白鵝", i:ASSETS.l10_card_e}, {t:"ㄝ", w:"耶", i:ASSETS.l10_card_ie}],
                game: { title:"嘴型猜謎", desc:"只做嘴型不出聲，猜猜是哪個音。" },
                quiz: [
                    {q:"公雞怎麼叫？", a:"ㄛ", o:["ㄚ","ㄛ","ㄜ"]},
                    {q:"嘴巴張最大？", a:"ㄚ", o:["ㄚ","ㄛ","ㄝ"]},
                    {q:"白鵝的聲音？", a:"ㄜ", o:["ㄚ","ㄜ","ㄝ"]}
                ]
            }},
            { id: "L11", title: "L11 可愛金魚 (ㄧㄨㄩ)", imgKey: "l11_icon", content: {
                warmup: "嘴巴嘟起來像金魚。",
                cards: [{t:"ㄧ", w:"衣服", i:ASSETS.l11_card_i}, {t:"ㄨ", w:"烏龜", i:ASSETS.l11_card_u}, {t:"ㄩ", w:"金魚", i:ASSETS.l11_card_yu}],
                game: { title:"火車過山洞", desc:"唸ㄨ開火車，唸ㄧ煞車。" },
                quiz: [
                    {q:"金魚的聲音？", a:"ㄩ", o:["ㄧ","ㄨ","ㄩ"]},
                    {q:"衣服的聲音？", a:"ㄧ", o:["ㄧ","ㄨ","ㄩ"]},
                    {q:"烏龜的聲音？", a:"ㄨ", o:["ㄧ","ㄨ","ㄩ"]}
                ]
            }},
            { id: "L12", title: "L12 畢業典禮", imgKey: "l12_icon", content: {
                warmup: "恭喜畢業！給自己一個大擁抱。",
                cards: [{t:"拼", w:"ㄅ+ㄚ", i:ASSETS.l12_card_1}, {t:"拼", w:"ㄇ+ㄚ", i:ASSETS.l12_card_2}, {t:"畢", w:"業", i:ASSETS.l12_card_3}],
                game: { title:"魔法擊掌", desc:"喊ㄅ+ㄚ，擊掌變成「爸」！" },
                quiz: [
                    {q:"準備好上小學了嗎？", a:"是", o:["是","否","再等等"]},
                    {q:"ㄅ加ㄚ變成？", a:"爸", o:["爸","媽","花"]},
                    {q:"ㄇ加ㄚ變成？", a:"媽", o:["爸","媽","花"]}
                ]
            }}
        ]
    }
];