# React 공부
- 기본베이스로 노마드코더 React 강의를 듣고, 부족한 부분은 docs 읽어보면서 정리
- 컴포넌트의 첫 글자는 반드시 대문자여야 한다. (소문자면 React랑 JSX가 이걸 HTML 로 인식함)
- jsx에서는 js 에서 사용하는 `class` 나 `for` 과 같은 용어를 사용하지 못하기 때문에 `className` 과 `htmlFor` 등으로 바꿔서 사용해야한다.
```js
// 아래 문법 형태를 사람들이 조금 더 선호함.
function Title() {
  return (
    <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
      Hello I'm a Title
    </h3>
  );
}

const Button = () => (
  <button
    style={{
      backgroundColor: "tomato",
    }}
    onClick={() => console.log("im clicked")}
  >
    Click me
  </button>
);
```

- useState 는 함수형 컴포넌트에서 상태(state)를 관리할 수 있게 해주는 기본 Hook
```js
// useState는 컴포넌트가 **기억해야 할 값(상태)**을 저장하고, 그 값이 바뀌면 컴포넌트를 자동으로 리렌더링함
// const [state, setState] = useState(initialValue);
// •	state: 현재 상태값
// •	setState: 상태를 바꾸는 함수
// •	initialValue: 초기 상태 값
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 초기값은 0, 
  // setCount 함수로 state를 변경할때 컴포넌트가 재생성된다.
  // 즉 데이터(count)가 바뀔 때 마다 컴포넌트를 리렌더링하고 UI를 refresh함.
  // 컴포넌트가 리렌더링될때 count 만 바뀐다.

  // setCount(count + 1) 대신 setCount((current) => current +1) 을 사용하는게 좀 더 좋음.
  // setCount에는 함수를 넣을 수도 있는데 함수의 첫번째 argument는 현재값이다.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> 
        Click me
      </button>
    </div>
  );
}
```

- input 관련
```js
function App() {
  const[amount, setAmount] = React.useState(0);
  const[flipped, setFlipped] = React.useState(false);

  const onChange = (event) => {
    setAmount(event.target.value);
  };
  // 숫자를 입력하면 onChange가 변화가 발생할때 마다 amount 의 state를 변경하게 된다.
  // onChange함수의 주요 기능은 데이터를 업데이트해주는 것

  const reset = () => setAmount(0)
  const onFlip = () => {
    reset()
    setFlipped((current) => !current)
  }

  // hours 에서는 onChange가 없기때문에 숫자가 바뀔 수없음.
  return (
    <h1>Super Converter</h1>
    <div>
      <label htmlFor="minutes">Minutes</label>
      <input
        value={flipped ? amount * 60 :amount}
        id="minutes"
        placeHolder="Minutes"
        type="number"
        onChange={onChange}
        disabled={flipped}
      />
    </div>
    <div>
      <label htmlFor="hours">Hours</label>
      <input
        value={flipped ? minutes : Math.round(minutes/ 60)}
        id="hours"
        placeHolder="Hours"
        type="number"
        disabled={!flipped}
      />
    </div>
    <button onClick={reset}>Reset</button>
    <button onClick={onFlip}>Flip</button>
  )
}
```

- Props 관련
```js
// props 는 첫번째 인자이자 유일한 인자.
// function Btn({banana}) {
function Btn(props) {
  const {banana, changeValue} = props
  return (
    <button 
      onClick={changeValue}
      style={{
        backgroundColor: "tomato",
        color: "white"
      }}
    >
    {banana}
    </button>
  )
}
Btn.propTypes = {
  banana: PropTypes.string.isRequired,
  changeValue: PropTypes.string,
}
function App() {
  const [value, setValue] = React.useState("Save Changes")
  const changeValue = () => setValue("Revert Changes");

  // <Btn banana="Save Changes" changeValue={changeValue}/> 컴포넌트는 리렌더링 되는게 맞는데
  // <Btn banana="Continue" /> 는 리렌더링 될 필요가 없음
  // -> memo 기능을 사용하면 컴포넌트가 리렌더링 되는 것을 방지할 수 있음.
  // 부모 컴포넌트에 변경이 있으면 자식 컴포넌트도 모두 렌더링이 다시 되는데 이게 성능 저하의 원인이 될 수 있음
  const MemorizedBtn = React.memo(Btn);
  return (
    <div>
      <MemorizedBtn banana="Save Changes" changeValue={changeValue}/> 
      <MemorizedBtn banana="Continue" />
    </div>
  )
}
```

- Prop Types
  - `Prop Types` 는 React 컴포넌트에 전달되는 props의 타입을 런타임에 검사해서 잘못된 타입이나 누락된 props가 있을 때 경고를 띄워주는 라이브러리
  - https://ko.legacy.reactjs.org/docs/typechecking-with-proptypes.html

- Css 
```css
// Button.module.css
.btn {
  color: white;
  background-color: tomato;
}
```

```js
// Button.js
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
// export default 를 사용함으로서 다른 파일에서 이 Button 정보를 import 할때
// import { Button } from "./Button.js" 이 아니라
// import Button from "./Button.js" 으로 중괄호 없이 가져올 수 있음.
```
