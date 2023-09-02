var icons = document.querySelectorAll(".icon-box .icon");
var template = document.getElementsByTagName("template")[0].content;
var is_exist_card = false;
var contexts = {
    "立春": {
        degree: 315,
        "含义": "阳气上升，万物更生，新岁开启",
        "黄道位置": "太阳到达黄经315°",
        "公历时间": "公历2月3日-2月5日交节",
        "气候特点": "气温回升、风和日暖",
        "物候现象": "东风解冻、蜇虫始振、鱼陟负冰",
        "农事活动": "耙耢保墒",
        "传统习俗": "拜神祭祖、纳福祈年、驱邪攘灾、除旧布新等"
    },
    "雨水": {
        degree: 330,
        "含义": "降雨开始，雨量渐增",
        "黄道位置": "太阳到达黄经330°",
        "公历时间": "公历2月18日-2月20日交节",
        "气候特点": "气温回升、日光温暖、暖湿空气活跃、降水增多",
        "物候现象": "獭祭鱼、鸿雁来、草木萌动",
        "农事活动": "培土施肥、清沟排水",
        "传统习俗": "拉保保、撞拜寄、接寿、回娘屋"
    },
    "惊蛰": {
        degree: 345,
        "含义": "降雨开始，雨量渐增",
        "黄道位置": "太阳到达黄经345°",
        "公历时间": "公历3月5日-3月6日交节",
        "气候特点": "春雷乍动、雨水增多",
        "物候现象": "桃始华、黄鹂鸣、鹰化为鸠",
        "农事活动": "开始春耕",
        "传统习俗": "祭白虎、打小人"
    },
    "春分": {
        degree: 0,
        "含义": "昼夜平分",
        "黄道位置": "太阳到达黄经0°，阳光直射赤道",
        "公历时间": "公历3月19-3月22日交节",
        "气候特点": "天气温暖、阳光明媚",
        "物候现象": "玄鸟至、雷乃发声、始电",
        "农事活动": "作物及时灌溉与播种",
        "传统习俗": "春祭，春菜"
    },
    "清明": {
        degree: 15,
        "含义": "气清景明、草木繁茂",
        "黄道位置": "太阳到达黄经15°",
        "公历时间": "公历4月4日-4月5日交节",
        "气候特点": "气温转暖、阳光明媚",
        "物候现象": "桐始华；田鼠化为鹌；虹始见",
        "农事活动": "肥水管理、病虫防治",
        "传统习俗": "扫墓、踏青，吃蒿饼、青团、馓子、清明螺"
    },
    "谷雨": {
        degree: 30,
        "含义": "寒潮天气基本结束，气温回升加快",
        "黄道位置": "太阳到达黄经30°",
        "公历时间": "公历4月19日-4月21日交节",
        "气候特点": "降水明显增多",
        "物候现象": "萍始生；鸣鸠拂其羽；戴胜降于桑",
        "农事活动": "播种移苗、埯瓜点豆、病害防治",
        "传统习俗": "走谷雨、品谷雨茶"
    },
    "立夏": {
        degree: 45,
        "含义": "夏季的开始",
        "黄道位置": "太阳到达黄经45°",
        "公历时间": "公历5月5日-5月7日交节",
        "气候特点": "炎暑将临，雷雨增多",
        "物候现象": "蝼蝈鸣，蚯蚓出，王瓜生",
        "农事活动": "早稻插秧",
        "传统习俗": "迎夏仪式、尝新活动、斗蛋游戏、立夏“秤人”等"
    },
    "小满": {
        degree: 60,
        "含义": "南方雨水之盈；北方麦籽粒刚开始饱满",
        "黄道位置": "太阳到达黄经60°",
        "公历时间": "公历5月20日-5月22日交节",
        "气候特点": "气温升高，降雨增多",
        "物候现象": "一候苦菜秀，二候靡草死，三候小暑至",
        "农事活动": "中稻全面栽插，中国西南地区小麦收获",
        "传统习俗": "抢水、祭车神、蚕神诞辰、食苦菜、夏忙会等"
    },
    "芒种": {
        degree: 75,
        "含义": "有芒的麦子快收，有芒的稻子可种",
        "黄道位置": "太阳到达黄经75°",
        "公历时间": "公历6月5日-6月7日交节",
        "气候特点": "雨量充沛，气温显著升高",
        "物候现象": "螳螂生；鵙始鸣；反舌无声",
        "农事活动": "南方作物栽培、北方收获麦子",
        "传统习俗": "送花神、安苗、打泥巴仗、煮青梅"
    },
    "夏至": {
        degree: 90,
        "含义": "炎热的夏天来临",
        "黄道位置": "太阳到达黄经90°，阳光直射北回归线",
        "公历时间": "公历6月21日-6月22日交节",
        "气候特点": "暴雨、梅雨天气，高温，潮湿",
        "物候现象": "鹿角解；蝉始鸣；半夏生",
        "农事活动": "蓄伏前雨水",
        "传统习俗": "祭神祀祖、消夏避伏"
    },
    "小暑": {
        degree: 105,
        "含义": "表示季夏时节的正式开始",
        "黄道位置": "太阳到达黄经105°",
        "公历时间": "公历7月6日-7月8日交节",
        "气候特点": "气温升高，进入雷暴期",
        "物候现象": "温风至；蟋蟀居宇；鹰始鸷",
        "农事活动": "采取抗旱、防洪措施",
        "传统习俗": "南方食新、北方吃饺子"
    },
    "大暑": {
        degree: 120,
        "含义": "一年中最热的时期",
        "黄道位置": "太阳到达黄经120°",
        "公历时间": "公历7月22日-7月24日交节",
        "气候特点": "高温酷热",
        "物候现象": "腐草为萤；土润溽暑；大雨时行",
        "农事活动": "抢收抢种，抗旱排涝",
        "传统习俗": "晒伏姜，烧伏香"
    },
    "立秋": {
        degree: 135,
        "含义": "秋季开始，收获的季节",
        "黄道位置": "太阳到达黄经135°",
        "公历时间": "公历8月7日-8月8日交节",
        "气候特点": "降雨、湿度等趋于下降或减少",
        "物候现象": "凉风至；白露生；寒蝉鸣",
        "农事活动": "做好整地、施肥的准备、晒秋",
        "传统习俗": "祭祀土地神、晒秋节、秋忙会、贴秋膘"
    },
    "处暑": {
        degree: 150,
        "含义": "表示炎热酷暑即将过去",
        "黄道位置": "太阳到达黄经150°",
        "公历时间": "公历8月22日-8月24日交节",
        "气候特点": "秋老虎，闷热，雷暴",
        "物候现象": "鹰乃祭鸟；天地始肃；禾乃登",
        "农事活动": "抢收抢晒",
        "传统习俗": "祭祖、迎秋、煲凉茶、开渔节、泼水降温"
    },
    "白露": {
        degree: 165,
        "含义": "表示孟秋的结束，仲秋的开始",
        "黄道位置": "太阳到达黄经165°",
        "公历时间": "公历9月7日-9月9日交节",
        "气候特点": "干燥，昼夜温差较大，天气渐渐转凉",
        "物候现象": "鸿雁来；玄鸟归；群鸟养羞",
        "农事活动": "灌水保温",
        "传统习俗": "收清露、酿五谷酒、饮白露茶、吃番薯"
    },
    "秋分": {
        degree: 180,
        "含义": "秋季中间，昼夜等长",
        "黄道位置": "太阳到达黄经180°，阳光直射赤道",
        "公历时间": "公历9月22日-9月24日交节",
        "气候特点": "昼夜温差逐渐加大，气温逐日下降",
        "物候现象": "雷始收声；蛰虫坯户；水始涸",
        "农事活动": "秋收、秋耕、秋种",
        "传统习俗": "祭月"
    },
    "寒露": {
        degree: 195,
        "含义": "气温比白露时更低，晨晚略感寒意",
        "黄道位置": "太阳到达黄经195°",
        "公历时间": "公历10月7日-10月9日交节",
        "气候特点": "气温下降，少雨干燥，晨露更凉",
        "物候现象": "鸿雁来宾、雀入水为蛤、菊有黄华",
        "农事活动": "浅水勤灌",
        "传统习俗": "赏菊、登高"
    },
    "霜降": {
        degree: 210,
        "含义": "天气渐冷、初霜出现",
        "黄道位置": "太阳到达黄经210°",
        "公历时间": "公历10月23日-10月24日交节",
        "气候特点": "早晚天气较冷、中午则较热，秋燥明显",
        "物候现象": "豺乃祭兽，草木黄落，蜇虫咸俯",
        "农事活动": "适时收割，耕翻农田，种春作物",
        "传统习俗": "赏菊、登高、吃药膳等"
    },
    "立冬": {
        degree: 225,
        "含义": "表示冬季开始，万物自此闭藏",
        "黄道位置": "太阳到达黄经225°",
        "公历时间": "公历11月7日-11月8日交节",
        "气候特点": "由少雨干燥向阴雨寒冻过渡",
        "物候现象": "一候水始冰；二候地始冻；三候雉入大水为蜃",
        "农事活动": "耕肥水管理、防冻",
        "传统习俗": "补冬、贺冬"
    },
    "小雪": {
        degree: 240,
        "含义": "寒潮和强冷空气活动频数较高",
        "黄道位置": "太阳到达黄经240°",
        "公历时间": "公历11月22日-11月23日交节",
        "气候特点": "冷空气南下，气温下降",
        "物候现象": "一候虹藏不见；二候天气上升地气下降；三候闭塞而成冬",
        "农事活动": "贮藏蔬菜、农闲副业",
        "传统习俗": "腌制腊肉，品尝糍粑"
    },
    "大雪": {
        degree: 255,
        "含义": "气温，降水",
        "黄道位置": "太阳到达黄经255°",
        "公历时间": "公历12月6日-12月8日交节",
        "气候特点": "气温显著下降，降水量增多",
        "物候现象": "鹖鴠不鸣；虎始交；荔挺出",
        "农事活动": "培育壮苗、保暖工作",
        "传统习俗": "观赏封河、腌制“咸货”、吃红枣糕"
    },
    "冬至": {
        degree: 270,
        "含义": "寒冷的冬天来临",
        "黄道位置": "太阳到达黄经270°，阳光直射南回归线",
        "公历时间": "公历12月21日-12月23日交节",
        "气候特点": "天寒地冻",
        "物候现象": "一候蚯蚓结；二候麋角解；三候水泉动",
        "农事活动": "兴修水利",
        "传统习俗": "吃水饺、吃麻糍"
    },
    "小寒": {
        degree: 285,
        "含义": "开始进入一年中最寒冷的日子",
        "黄道位置": "太阳到达黄经285°",
        "公历时间": "公历1月5日-1月7日交节",
        "气候特点": "大风降温，雨雪，气温最低",
        "物候现象": "雁北乡，鹊始巢，雉始雊",
        "农事活动": "防寒防冻、积肥造肥、兴修水利",
        "传统习俗": "吃菜饭，吃糯米饭"
    },
    "大寒": {
        degree: 300,
        "含义": "天气严寒，最寒冷的时期到来",
        "黄道位置": "太阳到达黄经300°",
        "公历时间": "公历1月20日左右",
        "气候特点": "小寒、大寒是一年中雨水最少的时段",
        "物候现象": "鸡乳；征鸟厉疾；水泽腹坚",
        "农事活动": "加强牲畜、越冬作物防寒防冻",
        "传统习俗": "尾牙祭"
    }
};

for (var i = 0; i < 24; i++) {
    icons[i].addEventListener("click", function () {
        addCard(this);
    });
}

function addCard(e) {
    if (!is_exist_card) {
        canvas.animate([
            {
                transform: "translateX(0%)"
            },
            {
                transform: "translateX(-10%)"
            }
        ], 400);
        canvas.style["transform"] = "translateX(-10%)";
        canvas.style["left"] = "none";

        var final_degree = contexts[e.innerHTML].degree * (Math.PI / 180);

        if (final_degree >= earth.revolution.degree)
            earth.revolution.term_step = (final_degree - earth.revolution.degree) / 25;
        else
            earth.revolution.term_step = (2 * Math.PI + final_degree - earth.revolution.degree) / 25;

        window.setTimeout(function () {
            var clone = document.importNode(template, true);
            insertAfter(clone, canvas);

            var card = document.querySelector(".card");
            card.querySelector(".title").innerHTML = e.innerHTML;

            card.querySelector(".hyperlink").href = "https://baike.baidu.com/item/" + e.innerHTML;
            card.querySelector(".hyperlink").innerHTML = "前往：百度百科_" + e.innerHTML;
            card.querySelector(".hyperlink").title = "前往：百度百科_" + e.innerHTML;

            var dl = card.querySelector(".context");
            for (const i in contexts[e.innerHTML]) {
                if (i == "degree")
                    continue;

                var dt = document.createElement("dt");
                var dd = document.createElement("dd");
                dt.innerHTML = i;
                dt.id = i;
                dd.innerHTML = contexts[e.innerHTML][i];
                dd.id = i;
                dl.appendChild(dt);
                dl.appendChild(dd);
            }

            is_exist_card = true;
            is_revolution = false;

            card.addEventListener("dblclick", function (event) {
                var x = event.clientX;
                var y = event.clientY;
                var rect = card.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    removeCard();
                    is_exist_card = false;
                }
            });

            earth.revolution.term_step = -1;
            earth.revolution.degree = final_degree;
        }, 400);
    }
    else {
        var card = document.querySelector(".card");
        card.querySelector(".title").innerHTML = e.innerHTML;

        var dd = card.getElementsByTagName("dd");
        for (var i = 0; i < dd.length; i++)
            dd[i].innerHTML = contexts[e.innerHTML][dd[i].id];

        card.querySelector(".hyperlink").href = "https://baike.baidu.com/item/" + e.innerHTML;
        card.querySelector(".hyperlink").innerHTML = "前往：百度百科_" + e.innerHTML;
        card.querySelector(".hyperlink").title = "前往：百度百科_" + e.innerHTML;

        is_revolution = true;
        var final_degree = contexts[e.innerHTML].degree * (Math.PI / 180);
        if (final_degree >= earth.revolution.degree)
            earth.revolution.term_step = (final_degree - earth.revolution.degree) / 25;
        else
            earth.revolution.term_step = (2 * Math.PI + final_degree - earth.revolution.degree) / 25;

        window.setTimeout(function () {
            is_revolution = false;
            
            earth.revolution.term_step = -1;
            earth.revolution.degree = final_degree;
        }, 400);
    }
}

function removeCard() {
    var card = document.querySelector(".card");
    card.remove();

    canvas.animate([
        {
            transform: "translateX(-10%)"
        },
        {
            transform: "translateX(0%)"
        }
    ], 400);

    window.setTimeout(function () {
        canvas.style["transform"] = "";
        canvas.style["left"] = "";

        is_revolution = true;
    }, 400);
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode; //获取父元素
    if (parent.lastChild == targetElement) { //如果目标元素是最后一个子元素
        parent.appendChild(newElement); //直接在父元素末尾添加新元素
    } else { //否则
        parent.insertBefore(newElement, targetElement.nextSibling); //在目标元素的下一个兄弟元素之前插入新元素
    }
}

