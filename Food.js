    // 所有关于食物的代码都写在这个js文件中
    // 分割作用域
     // 自执行函数
     (function(w){
        // 声明一个list来存放食物
        var list = []
         // 1.创建食物对象的构造函数
         function Food(width,height,bgColor,x,y) {
             this.width = width || 20
             this.height= height || 20
             this.bgColor = bgColor || 'green'
             this.x = x || 0
             this.y = y || 0
 
         }
 
         // 2.根据Food构造函数创建出来的食物对象，要渲染到地图上
         // so就有一个渲染的方法，这个方法写在原型中
         Food.prototype.render = function(map){

          // 在渲染新食物之前删除老食物div
          remove(map)
             // 2.1给食物对象随机生成xy坐标
               this.x = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
               this.y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
 
             // 2.2创建一个div，让这个div拥有这个食物对象的所有显示信息
             var div1 = document.createElement('div')
             div1.style.width = this.width + 'px'
             div1.style.height = this.height + 'px'
             div1.style.backgroundColor= this.bgColor
             div1.style.position= 'absolute'
             div1.style.left = this.x + 'px'
             div1.style.top = this.y + 'px'
 
             // 2.3把这个div追加到地图map中
             map.appendChild(div1)


            //  把这个div存起来
            list.push(div1)
         }

// 删除老食物div的方法
function remove(){
  for(var i = 0; i < list.length; i++){
    map.removeChild(list[i])
  }
  // 清空list数组
  list.length = 0
}

        // 把Food这个构造函数给暴露出去
          w.Food = Food
      }(window))