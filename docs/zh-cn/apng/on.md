### 状态监听

anim.on(hook,callback)

> 用途:状态监听

| 参数名   | 数据类型 | 用途                                    | 默认值 |
| -------- | -------- | --------------------------------------- | ------ |
| hook     | string   | 监听的状态 目前只开放了'stop','allStop' |        |
| callback | function | 回调函数                                |        |

anim.once(hook,callback)

> 用途:一次性状态监听

| 参数名   | 数据类型 | 用途                                    | 默认值 |
| -------- | -------- | --------------------------------------- | ------ |
| hook     | string   | 监听的状态 目前只开放了'stop','allStop' |        |
| callback | function | 回调函数                                |        |

!>  stop和allStop的区别:stop每次重复on会增加监听器,而allStop重复监听时只取最后定义的那一次
