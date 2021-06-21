## 概述
用于dom操作执行动画的插件
![dom](../../assets/dom.png)
## 安装

```shell
    npm install mot-plugin-dom --save
```

## 使用

该插件依赖于主库
```js
    import DomRender from 'mot-plugin-dom';
    mot.use(DomRender);
    let Animation = mot.create();
    mot.get('app').moveTo(100,100);
```

使用方式有两种 一种简易(单独某个动画的场景) 一种较为复杂(复杂变化的场景)
详细的使用方式请参照 文档其余部分

