## 位移

示例图片
![](../../assets/move.gif)

### api 介绍

moveTo(x,y,duration)

- x: x坐标 可以是number 默认单位'px' 可以是带单位的string ex:'100vw'
- y: y坐标 可以是number 默认单位'px' 可以是带单位的string ex:'100vw'
- duration：动画持续时间

或者可以传入一个对象
moveTo(options)

- options.x 坐标 同上
- options.y 坐标 同上
- options.duration 动画时间
- options.timeFunction 例如 'ease' 'ease-in-out' 等

### 示例代码

```js
    mot.use(DomRender);
    let Animation = mot
        .create()
        .moveTo('100vw','0')
        .moveTo(200,200,1000)
        .moveTo({x:0,y:0,duration:1000,timeFunction:'ease'})
        ;
        console.log(Animation)
    let renderer = mot.dom(document.getElementById('app'), Animation);
    renderer.render()
```