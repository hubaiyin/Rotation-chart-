function animate(obj, target) {
    // 给传进来的对象添加定时器属性
    // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
    // 解决方案：让我们的元素只能有一个定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        // 速度写到定时器里面
        // 把速度改为一个慢慢变小的值
        // 步长公式：（目标值-现在位置）/ 自己设置的幅度
        // 向上取整 Math.ceil 向下取整 Math.floor
        let speed = (target - obj.offsetLeft) / 20;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (obj.offsetLeft == target) {
            // 停止动画（停止定时器）
            clearInterval(obj.timer);
        }

        obj.style.left = obj.offsetLeft + speed + 'px';
    }, 10);
}