// 所有关于蛇的代码都写在这个js文件中
(function(window){
    // 蛇
   // 声明一个list保存渲染蛇创建的div
   var list = []


//    1.声明一个构造函数，创建蛇对象
function Snake(width,height,direction) {
this.width = width || 20
this.height = width || 20
this.direction = direction || 'right'   //移动方向，默认向右
// 初始创建出来的蛇是三节身体，每一节的x/y/bgColor都是不一样的
// 用数组来表示蛇身体，这样的好处：吃到了食物长身体，就可以直接在数组的尾部添加一个元素就Ok
// 蛇的每一节身体都有x,y,bgColor,所以用对象来表示每一节身体
this.body = [
    {x:3,y:1,bgColor:'red'},
    {x:2,y:1,bgColor:'green'},
    {x:1,y:1,bgColor:'pink'}
]
}

// 2.把创建出来的蛇对象渲染到地图上
Snake.prototype.render = function(map){

// 渲染新蛇之前删除老蛇
remove(map)

    // 把蛇的每一节遍历出来,就像渲染食物一样的去渲染蛇的每一节
    for(var i = 0; i < this.body.length; i++){
        // this.body[i]这就是每一节蛇身体
        // 创建div
        var div1 = document.createElement('div')
        div1.style.width = this.width + 'px'
        div1.style.height = this.height + 'px'
        div1.style.backgroundColor = this.body[i].bgColor;
        div1.style.position = 'absolute'
        div1.style.left = this.body[i].x * this.width + 'px'   //坐标
        div1.style.top = this.body[i].y * this.height + 'px'    //坐标
        // 把这个div添加到map中
        map.appendChild(div1)


        // 把这个div保存在list数组中
        list.push(div1)
    }

}

// 4.声明一个方法，删除老蛇div
// 思路，就是从map地图中，把list数组中存的那些div给删掉就ok
function remove(map){
for(var i = 0; i < list.length; i++){
    map.removeChild(list[i])
}
// 清空list数组
list.length = 0
}






// 3.写一个蛇移动的方法
Snake.prototype.move = function(food,map){
    // 3.1除了蛇头之外的蛇身体
    for(var i = this.body.length-1; i > 0; i--){
        this.body[i].x = this.body[i-1].x
        this.body[i].y = this.body[i-1].y
    }
    // 3.2蛇头移动后的坐标
    switch (this.direction) {
        case 'right':
            this.body[0].x++;
        break;
        case 'left':
            this.body[0].x--;
        break;
        case 'top':
            this.body[0].y--;
        break;
        case 'bottom':
            this.body[0].y++;
        break;
      
    }
    // 判断一下蛇有没有吃到食物
    // 就是判断蛇头的坐标和食物的坐标是否重叠
    var snakeHeadX = this.body[0].x * this.width   //蛇头x坐标
    var snakeHeadY = this.body[0].y * this.height  //蛇头的y坐标
    var foodX = food.x   //食物的x坐标
    var foodY = food.y   //食物的y坐标
    // 取出最后一节（蛇尾巴）蛇身体的坐标出来，备用
    var lastSnakeUnit = this.body[this.body.length -1]
    // 判断
    if(snakeHeadX == foodX && snakeHeadY == foodY){
        // 吃到了食物，就应该长身体
        this.body.push({
         x:lastSnakeUnit.x,
         y:lastSnakeUnit.y,
         bgColor: 'blue'

        })
        // 产生一个新的食物
        // 思路：就是调用食物的render方法，让食物重新产生一个随机的xy坐标
        food.render(map)
    }
}


// 暴露出去
window.Snake = Snake
}(window))