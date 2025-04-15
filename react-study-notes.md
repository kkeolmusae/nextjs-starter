# React 공부
- 기본베이스로 노마드코더 React 강의를 듣고, 부족한 부분은 docs 읽어보면서 정리
- 컴포넌트의 첫 글자는 반드시 대문자여야 한다. (소문자면 React랑 JSX가 이걸 HTML 로 인식함)
- 컴포넌트는 단지 jsx를 return 하는 function 일 뿐이다.
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

- useEffect
  - 어떻게 특정 코드들이 첫번째 component render에서만 실행되게 하는지? (state가 바뀌어도 실행은 한번만) 
  - useEffect는 2개의 argument를 가지는 function이다.
  - 첫번째 argument는 딱 한번만 실행하고 싶은 코드
```js
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  console.log("Run every time"); // state 가 변경될 때 마다 호출됨

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value); // keyword 값 변경

  useEffect(() => {
    console.log("I run only once.");
  }, []); // 한번만 호출됨
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]); // keyword 가 변경될 때 마다 호출 
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]); // counter 가 변경될 때 마다 호출 
  useEffect(() => {
    console.log("I run when keyword & counter change");
  }, [keyword, counter]); // counter 랑 keyword 가 변경될 때 마다 호출

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange} // input의 값이 변경될 때 마다 onChange 함수 호출 
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}
```

- Clean up
  - Clean-up 함수는 useEffect 내부에서 컴포넌트가 언마운트되거나, 의존성 배열 값이 변경되기 전에 실행되는 함수다
  - 주로 타이머 제거, 이벤트 리스너 해제, 구독 종료 같은 사이드 이펙트 정리 작업에 사용된다.
	-	useEffect에서 return을 통해 정의할 수 있다.
  - 그렇게 자주 사용하진 않지만, 알고 있으면 좋다.(특정 케이스에서만 사용한다.)
```js
import { useState, useEffect } from "react";

function Hello() {
  useEffect(function () {
    console.log("hi :)");
    return function () {
      console.log("bye :(");
    };
  }, []);

  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :("); // Clean up function
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}
```

- 마운트(Mount) / 언마운트(Unmount)
  - 마운트
    - 컴포넌트가 화면에 처음 나타나는 시점
	  - React가 해당 컴포넌트를 생성하고 DOM에 삽입함
	  - 이때 useEffect(() => { ... }, []) 같은 훅의 첫 번째 실행도 여기서 이뤄짐
 - 언마운트
   	-	컴포넌트가 화면에서 사라지는 시점
    -	React가 해당 컴포넌트를 DOM에서 제거함
    -	이때 useEffect 안에 있는 clean-up 함수가 실행됨