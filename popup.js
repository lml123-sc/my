window.onload = function() {
// 创建一个canvas元素
var canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 200;
// 将canvas添加到当前网页的body中
document.body.appendChild(canvas);

// 获取canvas的2D上下文
var ctx = canvas.getContext('2d');

// 在canvas上绘制一个矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);
}