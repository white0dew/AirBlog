---
title: 节流和防抖知道吗？
urlname: kwwca84uhgta9e5s
date: '2024-06-19 23:13:57'
updated: '2024-06-19 23:14:08'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1705587753359-2343c689-b7a2-460d-85a6-3d7f701c3906.png'
description: '面试官:节流与防抖，说说两者各自适用场景？回答：面试官，在前端开发中，节流（Throttle）和防抖（Debounce）是两种常用的优化高频率执行JavaScript代码的技术。我将分别阐述它们的概念、适用场景，并给出代码示例。首先解释一下防抖（Debounce）：防抖是指在事件被触发后延迟一...'
---
面试官:节流与防抖，说说两者各自适用场景？
![interveiwer(1).png](https://oss1.aistar.cool/elog-offer-now/e4c436f87fe752e3b1a26fb36a240f38.png)
回答：面试官，在前端开发中，**节流（Throttle）和防抖（Debounce）是两种常用的优化高频率执行JavaScript代码的技术**。我将分别阐述它们的概念、适用场景，并给出代码示例。
![interveiwee(1).png](https://oss1.aistar.cool/elog-offer-now/e7d502d0c170f5797893ca7284d4b747.png)

**首先解释一下防抖（Debounce）：**
**防抖是指在事件被触发后延迟一段时间后再执行回调，如果在这段延迟时间内事件又被触发，则重新计算延迟时间。**防抖适用于那些对连续的事件响应不是必须且不影响用户体验的情况，例如搜索输入框输入时的自动补全功能。下面是一个简单的防抖函数实现：

```javascript
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      func.apply(context, args);
    }, wait);
  };
}

// 使用例子
const handleSearch = debounce(function() {
  // 触发搜索请求逻辑
}, 500);

// 监听输入框的输入事件
input.addEventListener('input', handleSearch);
```

然后是节流（Throttle）：
**节流是指在一段时间内，不管事件触发了多少次，只执行一次回调。**节流适用于诸如resize、scroll等性能敏感的事件中，以避免频繁的回调执行导致的性能问题。下面是一个简单的节流函数实现：

```javascript
function throttle(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(function(){
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 使用例子
const handleResize = throttle(function() {
  // 处理resize逻辑，例如重新计算布局
}, 200);

// 监听窗口的resize事件
window.addEventListener('resize', handleResize);
```

此外，lodash这个工具库提供了现成的`_.debounce`和`_.throttle`方法，实际开发中可以直接使用，通常来说它们的实现会更完备和健壮。

