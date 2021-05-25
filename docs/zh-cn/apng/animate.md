### 将apng图片转成canvas

```js
let apng = new APNG();
apng.animateImage(imageDom);
```

只需要调用`animateImage`这个api 传入img标签对应的dom。就可以自动将图片以canvas来播放。

生成的canvas元素会继承之前img标签的`class`和`id`