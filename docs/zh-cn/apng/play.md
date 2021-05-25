### 播放

大部分的时候，我们希望能够控制动画播放的时机。

```html
 <img src='xxxxx' class='origin' style='opacity:0'/>
```

!> 我们需要给图片元素加一个行内样式，防止其自动的透出。

我们可以在`animateImage`的第二个参数中传入`false`,表示不需要自动播放。<br>
返回一个promise，我们可以拿到一个控制器,暂且称其为`anim`。我们可以通过anim.play控制其播放。<br>

```js
    apng.animateImage(img, false)
        .then(anim => {
            anim.play()
        })
```

### 播放自定义帧数

`anim.play()`中可以传入一个数组`frameArray`，
`frameArray`: [start,end]数组 表示播放的帧数范围,只有 start 的时候播放至结尾。

### 使播放完成后变为空白

可以直接调用 anim.clear()

### 暂停和重新播放

通过`anim.pause()`可以将动画暂停在某一帧

anim.pause(frame)<br>
> 用途:暂停播放
- 参数 1 `frame`:当 frame 存在时,到达 frame 帧数时暂停播放<br>

anim.start()<br>
> 用途:搭配 pause 暂停使用,重新开始播放

### 停止

anim.stop()

> 用途:停止播放 

要注意在没有`keep`状态下,会清空上下文队列需要重新调用`animateImage`