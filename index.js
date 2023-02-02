// 鼠标经过显示左右按钮，离开隐藏
// 点击按钮，播放一张
// 图片改变的同时，底部小圆圈也跟着改变
// 点击小圆圈播放相应的图片
// 不经过轮播图，则自动播放
// 经过则暂停

window.addEventListener('load', () => {
    // console.log(1);
    // 两边箭头的显示与隐藏
    // 获取大盒子和左右按钮
    const box = document.querySelector('.box');
    const btn_prev = document.querySelector('.left');
    const btn_next = document.querySelector('.right');
    // console.log(prev, next);
    box.addEventListener('mouseenter', () => {
        btn_next.style.display = 'block';
        btn_prev.style.display = 'block';
        // 停止定时器
        clearInterval(timer);
        timer = null;
    });
    box.addEventListener('mouseleave', () => {
        btn_next.style.display = 'none';
        btn_prev.style.display = 'none';
        // 开启定时器
        timer = setInterval(() => {
            btn_next.click();
        }, 3000)
    });
    // 动态生成小圆圈
    // 首先获得图片数量
    // 再利用循环生成小圆圈

    // 获取图片列表
    const ul = document.querySelector('.pic');
    // console.log(ul.children.length);
    const dots = document.querySelector('.dots');
    // 移动距离的基准
    let boxWidth = box.offsetWidth;
    // 图片索引
    let num = 0;
    // 小圆点索引
    let circle = 0;
    for (let i = 0; i < ul.children.length; i++) {
        // 创建li
        let li = document.createElement('li');
        // 给它设置一个索引号，点击时获取这个属性，通过自定义属性来做
        li.setAttribute('index', i);
        // 把li插入到ol里面
        dots.appendChild(li);
        // 小圆圈排他思想
        // 我么可以在生成小圆圈的同时，直接绑定事件
        li.addEventListener('click', function () {
            // 把所有li清除current类名，再给当前li设置
            for (let i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈滚动的核心思想：小圆圈的索引号乘以图片的宽度作为ul移动距离,注意是负值
            // console.log(boxWidth);
            // 拿到当前li的索引号
            let index = this.getAttribute('index');
            // 当点击小圆圈后，把小圆圈的索引号给num和circle
            num = index;
            circle = index;
            // console.log(index);
            animate(ul, -index * boxWidth);
        });
    }
    // 把ol里面的第一个小li设置类名为current，默认情况
    dots.children[0].className = 'current';
    dots.style.marginLeft = -dots.offsetWidth / 2 + 'px';

    // 点击按钮一次，图片滚动一次
    // 声明一个变量num，点击一次，自增1，让这个变量乘以图片宽度，就是ul的滚动距离
    // 图片的无缝滚动原理：给第一张和最后一张进行一个副本，播放到这个副本时，快速跳到原本
    // 让小圆点跟着一起走
    // 声明一个变量circle，每次点击自增1

    // 克隆第一张图片到末尾，cloneNode加true深克隆
    let img_1 = ul.children[0].cloneNode(true);
    ul.appendChild(img_1);

    // 小圆点跟随移动函数
    function circleChange() {
        for (let i = 0; i < dots.children.length; i++) {
            dots.children[i].className = '';
        }
        dots.children[circle].className = 'current';
    }
    // 向右滚动
    btn_next.addEventListener('click', function () {
        // 如果走到了副本，ul就快速复原
        if (num == ul.children.length - 1) {
            num = 0;
            ul.style.left = num;

        }
        num++;
        animate(ul, -num * boxWidth);
        circle++;
        // 先清除其余小圆圈的current类名，再给当前设置
        // 图片比小圆圈多，加一个判断条件
        if (circle == dots.children.length) circle = 0;
        circleChange();
    });
    // 向左滚动
    btn_prev.addEventListener('click', function () {
        // 如果走到了副本，ul就快速复原
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * boxWidth + 'px';

        }
        num--;
        animate(ul, -num * boxWidth);
        circle--;
        // 先清除其余小圆圈的current类名，再给当前设置
        // 图片比小圆圈多，加一个判断条件
        if (circle < 0) circle = dots.children.length - 1;
        circleChange();
    })

    // 自动播放功能
    // 添加一个定时器，但是直接的功能跟向右滚动一致
    // 我们使用手动调用事件来避免代码重复
    let timer = setInterval(() => {
        btn_next.click();
    }, 3000)

})
