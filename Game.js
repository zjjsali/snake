// 游戏控制器
(function(window){

// 声明一个that变量，保存游戏控制器对象
var that = null


// 1.声明一个创建游戏控制器的构造函数
// 想让这个游戏开始起来，那这个游戏控制器里面就应该有食物，蛇，地图
function Game(map){
    // 游戏控制器对象里面有食物对象，食物是调用创建食物的构造函数创建出来的
this.food = new Food()
// 游戏控制器对象里面有蛇对象，蛇对象是调用创建蛇的构造函数创建出来的
this.snake = new Snake()
// 游戏控制器对象里面有地图，地图是外面获取传进来的
this.map = map

// 给that赋值，赋游戏控制器对象
that = this
}
// 2.游戏开始的方法
Game.prototype.start = function(){
    // 2.1 渲染食物，渲染蛇
    this.food.render(this.map)
    this.snake.render(this.map)

    // 2.2让蛇动一下(调用蛇移动的方法让蛇动一下)
    // this.snake.move()
    // // 蛇移动了，坐标改变了，但是需要用新的坐标重新渲染一下蛇
    // this.snake.render(this.map)
    snakeAutoMove()

    bindKey()
}

// 3.写一个方法，让蛇不停的动起来
// 写一个计时器，间隔一段时间让蛇动一下
function snakeAutoMove(){
var timerId = setInterval(function(){
    // console.log(this); //window
    this.snake.move(this.food,this.map)
    

    // 判断蛇移动后的新坐标，是否出界
    // 如果蛇头的坐标小于0，并且大于等于宽/高，就出界了
    var snakeHeadX = this.snake.body[0].x * this.snake.width    //蛇头的x坐标
    var snakeHeadY = this.snake.body[0].y * this.snake.height  //蛇头的y坐标
    if(snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX > this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight){
        // 出界，结束游戏
        alert('Game Over!!!')
        clearInterval(timerId)
        return  //如果你当前移动后的坐标是出界的坐标，就不要执行后面渲染的代码
    }

    this.snake.render(this.map)
}.bind(that),1000)
}
// 写一个方法，让蛇跟着键盘按键来移动
function bindKey(){
// 给页面设置一个键盘按下事件，获取按键判断，修改蛇的方向
document.onkeydown = function(e) {
    e = e || window.event
    console.log(e.keyCode); //左37 上38 右39 下40
    switch (e.keyCode) {
        case 37:
            if(this.snake.direction != 'right'){
                this.snake.direction = 'left'
            }
            break;
            case 38:
                if(this.snake.direction != 'bottom'){
                    this.snake.direction = 'top'
                }
          
            break;
            case 39:
                if(this.snake.direction != 'left'){
                    this.snake.direction = 'right'
                }
            break;
            case 40:
                if(this.snake.direction != 'top'){
                    this.snake.direction = 'bottom'
                }
                break;
            default:
                break;
    }
}.bind(that)
}

// 把Game暴露出去
window.Game = Game
}(window))
