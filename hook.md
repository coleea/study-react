# 훅 (hook) Q&A

## Q. 훅(hook)이 무엇인가 ?

A. 훅은 함수형 컴포넌트에서 이펙트를 사용할 수 있도록 도와주는 툴이다\
\
라이프사이클 메소드 이름에 기반한 코드를 만들지 않아도 되며 코드가 실제로 하는 일에 기초하여 코드를 분리할 수 있다. 즉 비즈니스 로직 단위로 함수를 작성할 수 있으며 이것은 코드를 더욱 선언적으로 만든다\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (44:17을 참조)\
훅은 관심사로 로직을 분리하는 것을 가능하게 했다\
\
커스텀 훅은 자신만의 추상화를 만들 수 있는 유연성을 준다.\
그것들은 당신의 리액트 컴포넌트 트리를 팽창시키지도 않으며 래퍼 지옥을 피하게 해준다\
(custom hooks give you the flexibility to create your own abstractions  they do not inflate your react component tree and avoid the wrapper hell)\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (53:24을 참조)


### Q. 커스텀 훅이 무엇인가?

A. 기본적인 훅인 useState나 useEffect등의 훅을 재조합해서 하나의 훅을 만드는 패턴이다. 이 커스텀 훅은 하나의 함수로 구성되며 함수 컴포넌트 내부에서 호출하여 사용한다

## 빌트인 훅 관련

### useState

useState는 배열을 리턴한다.\
흔한 구문인 `const [name, setName] = useState('')`  는 어레이 디컨스트럭팅이 적용된 문법이다\
`setOOOO`은 리액트에서 권장하는 함수명이지만 굳이 이 규칙을 따를 필요는 없다. `이름변경하기`같은 한글 함수를 적용해도 괜찮다. 실제로 중국인들은 중국어로 작성하는 경우가 많다\
너무 관례에 집착하다가는 실용성을 놓칠수 있다\
\
Q. useState의 setOOO에는 인자로 함수를 넣을수 있다. 인자로 값을 넣는것과 함수를 넣는것의 차이는 무엇인가?
A. 함수를 인자로 넣을경우 바로 직전에 변화된 값을 반영할 수 있다. 예를 들어보자

```javascript
const [counter, setCounter] = useState(0)
setCounter(counter + 1)
setCounter(counter + 1)
```

위의 예는 setCounter에 값을 인자로 넣은 예제이다. 이 코드의 결과를 예측해보자. 만일 코드가 동기적으로 수행된다고 가정하면 `counter + 1`이 두번 반영되었으므로 `0 -> 1 -> 2` 순으로 값이 갱신되어 최종적인 `counter` 상태의 값은 2라고 생각할 수 있다.\
하지만 값은 1이다. 그 이유는 두 가지가 있다

1. setCounter가 비동기적으로 실행된다
1. setCounter가 비동기적으로 실행되는 과정에서 인자로 넘어간 값은 이전 문맥을 고려하지 않으며 오로지 주어진 인자만을 반영하여 

상태 갱신에 적용한다. 다시말해 위의 예제에서 setCounter함수가 두 번 호출될 때 인자로 넘어가는 `counter + 1`의 값은 모두 동일하게 `0 + 1`이다. 따라서 `setCounter(counter + 1)`를 몇번 호출하건 관계없이 counter의 값은 1이 된다. 만일 내가 호출하는 횟수만큼 값을 반영하고 싶을때는 함수를 인자로 넣으면 된다. 예를들어 아래와 같다

```javascript
const [counter, setCounter] = useState(0)
setCounter((최신_counter) => {return 최신_counter + 1} )
setCounter((최신_counter) => {return 최신_counter + 1} )
```

위의 예제는 setCounter의 인자를 값에서 함수로 바꾸었다. 이때는 값을 적용할 때와 로직이 조금 달라진다. setCounter의 콜백으로 넘어간 함수는 인자를 받아서 실행되는데 이 값은 함수 컴포넌트 내에 정의된 counter의 값이 아닌 리액트에서 관리하는 상태값이다. 이 최신의 상태값을 인자로 받아서 상태변경을 수행한다. 그리고 이어지는 두번째 setCounter함수의 인자도 동일한 방식으로 처리된다. 두번째 setCounter함수의 콜백으로 넘어간 함수도 인자를 받아서 실행되는데 이 값은 함수 컴포넌트에 있던 counter변수의 값이 아니다. 리액트에서 관리하는 최신의 상태값이다. 두번째 setCounter가 상태변화를 적용하는 시점의 counter의 값은 1이다. 따라서 1을 인자로 받아 1+1을 했으므로 최종 상태값은 2가 된다.\

### Q. useState의 두번째 리턴값인 setOOO을 호출하면 무슨일이 발생하는가?\
A. 스테이트를 업데이트하는 순간 함수컴포넌트의 리랜더링을 강제한다\
클래스 컴포넌트의 forceUpdate() 메소드가 했던 것과 똑같은 것을 수행한다.

### Q. 세터(setter)가 호출되면 해당 컴포넌트가 무조건 재랜더링되는가 ?\
A. 항상 재랜더링되는 건 아니다. 재랜더링 되는 조건이 있다.

### Q. 그 재랜더링 되는 조건이라는 건 업데이트된 상태가 이전 상태와 달라야 한다는 것인가?\
A. 상태가 같건 다르건 그건 중요하지 않다. 리액트는 상태 비교를 하지 않는다. 유일한 리랜더링 조건은 `함수 컴포넌트의 리턴값이 이전 리턴값과 다를때`만 재랜더링을 수행한다\

### Q. 왜 setState는 비동기로 처리되는가 ?\
A. 배치 업데이트(batch update)를 하기위한 조치로 보인다\

### useEffect

useEffect의 인자로 async함수를 넘겨줄 수 없다. 따라서 useEffect의 인자로 넘겨진 함수에서 await구문을 사용할 수 없다. 따라서 `promise.then()`구문을 사용하거나 별도의 async 함수를 호출해야 한다\
\
흔히 쓰는 패턴으로 두번째 인자인 의존성 배열을 빈 배열([])을 넣는 경우가 많다. []는 “절대로 이 이펙트 함수를 갱신하지 말것”이라는 의미이므로 버그 가능성이 높다. 이펙트 함수는 바깥에 선언된 handleChange가 바뀌더라도 다시 호출되지 않는다.
그리고 handleChange는 다른 props나 상태를 참조할 수도 있다.
https://overreacted.io/ko/react-as-a-ui-runtime/\
\
useEffect는 패시브 이펙트(passive effect)라고 한다\
\
커밋페이즈에는 먼저 액티브 이펙트를 처리한다. 이후 패시브 이펙트인 useEffect에 타이머를 설정하여 스케줄러에 넘긴다
스케줄러는 리컨사일에 대한 게이트키퍼와 같다. 모든 가상돔의 수정작업은 반드시 스케줄러를 통하여 반영된다\
\
리액트는 이펙트함수가 실행되도록 스케줄링하는 런타임으로 useEffect를 제공합니다.\
결국 useEffect의 목적은 IO에게 바인딩을 제공하는 것입니다\
\
### Q. useEffect는 어떻게 구현되었나 ?

A. useEffect의 구현 디테일을 말하자면 이것은 사이드이펙트의 형태로 구현되었다. 구체적으로 말하면 전역 뮤테이션.\
\
하지만 꼭 그렇게 되어야 한다고 말하는 건 아니다. 만일 자바스크립트가 대수적 효과를 지원했다면 전역 뮤테이션 없이 이를 표현할 수 있었을 것
-- dan

### Q. useEffect는 정확히 언제 실행되는가 ?

유즈이펙트의 이펙트 함수는 렌더링 사이클이 완전히 종료된 이후에 실행된다. 이러한 실행시점은 `useLayoutEffect` 훅과 대비된다

### Q. useLayoutEffect 훅은 useEffect와 어떻게 다른가 ?

useEffect의 이펙트 함수가 리액트 스케줄러에 의해 비동기로 발생하는 것과는 다르게 useLayoutEffect는 diff알고리즘이 종료되고 가상돔이 실제돔에 직접적인 변경을 가한 이후에 동기적으로 바로 실행된다\
useLayoutEffect의 인자인 이펙트함수의 정확한 실행시점은 js의 콜스택 depth가 0이 되고 마이크로테스크 큐를 실행하기 직전에 실행되는 것으로 추정된다 [참고](https://stackoverflow.com/questions/68946977/how-does-react-implement-useeffect-and-uselayouteffect)
즉 하나의 렌더링 사이클 과정이 진행되는 자바스크립트 코드에서 동기적으로 실행된다

### Q. useRef는 언제 쓰이는가?

useRef의 사용법은 크게 2가지로 나뉜다\
\
첫째로 리액트에서 html엘리먼트에 접근할 때 사용한다. 일반적인 웹브라우저에서 html 엘리먼트에 접근할 때는 쿼리셀렉터(document.querySelector)같은 셀렉터 함수를 사용하지만 리액트는 셀렉터 함수 보다는 ref를 이용한 조작이 선호된다\
쿼리셀렉터(querySelector)는 셀렉터가 리턴하는 엘리먼트가 문맥에 의존한다. 문맥이 바뀐다면 예상했던 엘리먼트를 리턴받지 못할 수 있다. 하지만 ref는 어떠한 상황에서도 이변없이 같은 엘리먼트를 셀렉트 할 수 있다\
비록 ref가 선호되지만 셀렉터 함수의 사용이 금기시되는 것은 아니다\
\
두번째로 함수 컴포넌트 내부에 함수를 선언한 경우 useState로 불러온 스테이트를 클로저로 인식하여 최신의 값에 접근할 수 없을 때 useRef로 접근한다. 아래의 예를 살펴보자\

```javascript

function Component(props){

    const [counter, setCounter] = useState(1)

    function innerFunction(){
        console.log(counter)
    }

    return (
        <div>asdf</div>
    )
}

```

위의 예에서 함수 `innerFunction`는 함수가 선언되는 시점에서 counter와 setCounter를 클로저로 저장한다. 함수가 선언되는 시점에서 counter의 값은 1 이므로 이후에 counter의 값이 어떻게 변하는지에 무관하게 1로 고정된다\
이런 문제를 해결하려면 아래와 같이 작성할 수 있다

```javascript
function Component(props){

    const counter = useRef(1)

    function innerFunction(){
        console.log(counter.current)
    }

    return (
        <div>asdf</div>
    )
}

```
위의 예제는 `useState`대신 `useRef`를 사용했다. innerFunction이 counter를 클로저로 인식하지만 실제로 참조하는 메모리 주소는 `counter.current`이고 이는 클로저의 영향을 받지 않는다. 그러므로 업데이트 된 counter의 값을 참조하는 것이 가능해진다

### Q. forwardRef는 언제 쓰이는가?

forwardRef라는 용어를 그대로 풀어서 설명하면 `포워딩하는 Ref`라는 뜻이다\
외부 컴포넌트로 Ref를 포워딩하여 외부 컴포넌트에서 html 엘리먼트에 접근할 때 사용된다\
외부 컴포넌트에서 다른 컴포넌트의 렌더링 행위를 조작하나는 행위는 컴포넌트의 아이솔레이션을 위반한다. 하지만 편의성 등의 문제로 이런 상황이 필요할 때가 있다. 엘리먼트를 포커싱 하는 상황 등에서 필요하다.\
\
forwardRef는 고차 컴포넌트인데 즉 인자로 컴포넌트를 받아서 다른 컴포넌트를 리턴한다. 이때 반환된 컴포넌트는 props외에도 ref라는 두번째 파라메터를 받는다. 이 두번째 파라메터가 외부에서 주입받는 ref로서 활용된다

### Q. useImperativeHandle는 언제 쓰이는가?

이름만 보고서는 사용법을 유추하기 어려운 `useImperativeHandle` 훅은 외부에서 전달받은 ref를 html엘리먼트에 직접적으로 쓰지않고 하나의 이벤트로서 활용하기 위해서 쓴다. 말이 어려운데 하나씩 풀어서 설명해보자\
\
만일 외부에서 전달받은 ref에 어떤 이벤트가 발생하면 그 이벤트를 이벤트리스너가 듣는다. 그 이벤트리스너의 이름이 useImperativeHandle이다.\
\
이벤트리스너가 특정한 이벤트를 감지하면 컴포넌트 내부에서 생성한 ref를 기반으로 html엘리먼트를 컨트롤한다\
\
이짓을 왜 하는가? 바로 외부에서 넘겨받은 ref에 컴포넌트의 통제권을 넘겨주지 않기 위해서이다.\
\
만일 외부에서 건내받은 ref가 내 컴포넌트에 이런저런 짓을 마음대로 할 수 있다면 단일 컴포넌트로서의 아이솔레이션이 훼손된다.\
\
그러므로 최대한 아이솔레이션을 유지하려면 최종적으로 특정 컴포넌트의 html을 조작하는 권한은 자기 자신이 가지고 있는편이 좋다. 이것을 가능하게 해주는 것이 useImperativeHandle이다.\
\
다시 말해서 useImperativeHandle은 엘리먼트의 조작 권한을 컴포넌트 자기자신이 보유하게 해준다

### createPortal

```javascript
ReactDOM.createPortal(child, container)
```
현재의 돔트리 구조를 무시하고 전혀 다른곳에 있는 컴포넌트를 부모삼아 렌더링하는 패턴이다\
모달 등의 `position:absolute`속성을 가진 컴포넌트를 구현할 때 쓰인다\
첫 번째 인자는 렌더링할 타겟 컴포넌트이며 두번째 인자는 삽입되고자하는 부모 엘리먼트이다\
\
포탈은 클라이언트에서만 유효한 기능이며 서버용 기능은 아니다.\
왜냐하면 reactDOM.render()가 수행된 추가적으로 호출하는 기능이기 때문이다. 따라서 `react-dom/server` 내부에는 리액트 포털이 없다


### useSelectedContext

context api의 대안으로 등장했다. 퍼포먼스 이슈를 어느정도 해결한 것으로 보인다\
현재 관련 구현제는 dai-shi가 구현하였다
