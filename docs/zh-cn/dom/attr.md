## 属性变化

示例图片
![](../../assets/attribute.gif)

### api 介绍

attribute(key,value,duration)

- key: 属性键
- value: 属性值

或者可以传入一个对象
attribute(options)

- options.key 属性
- options.value 值
- options.duration 动画时间
- options.timeFunction 例如 'ease' 'ease-in-out' 等

### 示例代码

```js
mot.use(DomRender);
let Animation = mot
  .create()
  .attribute("backgroundColor", "red", 400)
  .attribute("backgroundColor", "orange")
  .attribute("backgroundColor", "yellow")
  .attribute("backgroundColor", "green")
  .attribute("backgroundColor", "blue")
  .attribute("backgroundColor", "purple")
  .attribute("borderRadius", "50%")
  .attribute("opacity", "0");
let renderer = mot.dom(document.getElementById("app"), Animation);
renderer.render();
```
