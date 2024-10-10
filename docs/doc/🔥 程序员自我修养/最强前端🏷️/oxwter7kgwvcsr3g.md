---
title: A component is changing an uncontrolled input to be controlled.
urlname: oxwter7kgwvcsr3g
date: '2024-10-10 08:21:01'
updated: '2024-10-10 20:51:06'
description: 在前端开发中，我们经常会处理表单输入。表单输入组件可以分为受控组件和非受控组件，理解它们之间的转换以及背后的原理对于构建高效、可维护的用户界面至关重要。一、受控组件与非受控组件的概念受控组件受控组件的值由React组件的状态来控制。当表单元素的值发生变化时，通过事件处理函数将新的值更新到组件的...
---
在前端开发中，我们经常会处理表单输入。



表单输入组件可以分为受控组件和非受控组件，理解它们之间的转换以及背后的原理对于构建高效、可维护的用户界面至关重要。

## 一、受控组件与非受控组件的概念
### 受控组件
+ 受控组件的值由React组件的状态来控制。当表单元素的值发生变化时，通过事件处理函数将新的值更新到组件的状态中，然后React会根据新的状态重新渲染组件，确保界面显示与状态一致。



例如，一个简单的输入框作为受控组件：

```jsx
import React, { useState } from 'react';

const ControlledInputExample = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input type="text" value={inputValue} onChange={handleInputChange} />
  );
};
```

在这个例子中，`inputValue`是组件的状态，它控制着输入框的值。



每当用户在输入框中输入内容时，`onChange`事件会触发`handleInputChange`函数，将输入框的新值更新到状态中，从而实现了对输入框的控制。

### 非受控组件
+ 非受控组件的值由DOM本身来管理。我们可以通过`ref`来获取表单元素的值，但不会像受控组件那样通过状态来严格控制其值的更新和渲染。例如：

```jsx
import React, { useRef } from 'react';

const UncontrolledInputExample = () => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>

    </form>

  );
};
```

在这个非受控组件示例中，我们使用`ref`获取输入框的值，当提交表单时，通过`inputRef.current.value`获取输入框的值并进行处理，但在输入过程中，组件的状态并不会直接与输入框的值同步更新。

## 二、为什么要将非受控组件转换为受控组件
### 1. 更好的状态管理
+ 受控组件使我们能够更好地管理表单数据的状态。在复杂的表单应用中，可能有多个输入字段，将它们都作为受控组件可以方便地将所有数据集中在组件的状态中进行统一管理。
+ 例如，在一个注册表单中，包含用户名、密码、邮箱等多个字段，如果都使用受控组件，我们可以轻松地获取和验证用户输入的所有信息，并且可以在需要时对这些数据进行整体处理，比如一次性提交到服务器或者进行实时的格式验证。
+ 当需要对表单数据进行进一步处理或与其他组件共享数据时，受控组件的状态管理优势更加明显。
+ 我们可以根据状态来决定是否显示错误提示信息、是否启用提交按钮等，而不需要直接操作DOM来获取和处理数据。

### 2. 可预测性和一致性
+ 受控组件的值始终与组件的状态同步，这使得组件的行为更加可预测。
+ 无论用户如何操作输入框，组件的状态都会根据设定的规则进行更新，从而保证界面显示的一致性。例如，如果我们限制了输入框只能输入数字，在受控组件中，我们可以通过事件处理函数来过滤用户输入，确保输入的值符合要求，并且界面会立即反映出这种变化。
+ 对于非受控组件，由于其值直接由DOM管理，可能会出现一些不可预测的情况。
+ 比如，用户可能通过浏览器的开发者工具直接修改输入框的值，而组件的逻辑可能无法及时响应这种变化，导致数据不一致。而受控组件可以避免这种情况的发生，因为所有的值更新都通过我们定义的事件处理函数来进行，我们可以在其中添加任何必要的逻辑来保证数据的一致性和正确性。

## 三、转换过程及示例
### 步骤一：添加状态和事件处理函数
+ 假设我们有一个初始的非受控输入组件：

```jsx
import React from 'react';

const InitialComponent = () => {
  const inputRef = React.createRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>

    </form>

  );
};
```

+ 要将其转换为受控组件，首先需要在组件中添加一个状态来存储输入框的值，并创建一个事件处理函数来更新状态。例如：

```jsx
import React, { useState } from 'react';

const ControlledComponentConversion = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // 后续代码继续...
};
```

### 步骤二：将`ref`替换为`value`属性并绑定事件处理函数
+ 在原来的非受控组件中，我们使用`ref`来获取输入框的值。在转换为受控组件后，我们需要将`ref`替换为`value`属性，并将`value`绑定到组件的状态上，同时将`onChange`事件绑定到我们创建的事件处理函数上。修改后的代码如下：

```jsx
import React, { useState } from 'react';

const ControlledComponentConversion = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue); // 这里直接使用状态中的值
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Submit</button>

    </form>

  );
};
```

### 步骤三：处理初始值（如果有）
+ 如果非受控组件有初始值，在转换为受控组件时，我们需要确保初始值也能正确地设置到状态中。可以通过在`useState`的初始值参数中设置或者在组件挂载后使用`useEffect`来设置。例如，如果输入框有一个初始值为"Initial Value"，可以这样处理：

```jsx
import React, { useState, useEffect } from 'react';

const ControlledComponentConversion = () => {
  const [inputValue, setInputValue] = useState('Initial Value');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
  };

  // 如果初始值是通过其他方式获取（例如从props或异步获取），可以使用useEffect
  useEffect(() => {
    // 假设这里从某个数据源获取初始值
    const initialValue = 'Another Initial Value';
    setInputValue(initialValue);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Submit</button>

    </form>

  );
};
```

## 四、总结
将非受控组件转换为受控组件是React开发中一个常见的操作，它有助于我们更好地管理表单数据的状态，提高应用程序的可预测性和一致性。



在转换过程中，需要注意添加状态和事件处理函数，正确地绑定`value`和`onChange`属性，并处理好初始值。通过理解和掌握这种转换，我们可以更灵活地构建和维护复杂的表单界面，为用户提供更好的交互体验。



同时，这也体现了React的核心概念之一——通过状态驱动界面更新，使我们能够更高效地开发高质量的前端应用程序。

