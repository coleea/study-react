# React Study

## 리액트란?
우리는 뮤테이션을 최소화하기를 원한다.
우리는 개념적인 단순함을 주는 무언가를 만들고 싶다.
(we want to minimize the amount of mutation
we want to build something that gives us the conceptual simplicity)\
\
-- 조던월크 (Jordan Walke, 리액트 창시자)
\
복잡성을 제어하는 것이 컴퓨터 프로그래밍의 본질이다\
-- 브라이언 커니핸 (Brian Wilson Kernighan)\
\
그리고 이것이 우리가 하려는 일이다\
-- Jim Sproch, 前 React Core Team\
\
이것이 리액트이다\
즉 리액트는 변이를 최소화하고 복잡성을 제거하기 위해 태어났다

---

## 훅(hook)이란 ?

훅을 사용하여 우리는 라이프사이클 메소드 이름에 기반한 코드를 만들지 않아도 되며 코드가 실제로 하는 일에 기초하여 코드를 분리할 수 있다.\
(with hooks we separate code not based on the lifecycle method name but based on what the code is doing)\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (44:17을 참조)
훅은 관심사로 로직을 분리하는 것을 가능하게 했다\
\
커스텀 훅은 자신만의 추상화를 만들 수 있는 유연성을 준다.\
그것들은 당신의 리액트 컴포넌트 트리를 팽창시키지도 않으며 래퍼 지옥을 피하게 해준다\
(custom hooks give you the flexibility to create your own abstractions  they do not inflate your react component tree and avoid the wrapper hell)\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (53:24을 참조)

Q. useState의 두번째 리턴값인 setOOO을 호출하면 무슨일이 발생하는가?\
A. 스테이트를 업데이트하는 순간 함수컴포넌트의 리랜더링을 강제한다\
클래스 컴포넌트의 forceUpdate() 메소드가 했던 것과 똑같은 것을 수행한다.\
\
Q. 세터(setter)가 호출되면 해당 컴포넌트가 무조건 재랜더링되는가 ?\
A. 항상 재랜더링되는 건 아니다. 재랜더링 되는 조건이 있다.\
\
Q. 그 재랜더링 되는 조건이라는 건 업데이트된 상태가 이전 상태와 달라야 한다는 것인가?\
A. 상태가 같건 다르건 그건 중요하지 않다. 리액트는 상태 비교를 하지 않는다. 유일한 리랜더링 조건은 `함수 컴포넌트의 리턴값이 이전 리턴값과 다를때`만 재랜더링을 수행한다


## 빌트인 훅 관련


##### useState
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
위의 예는 setCounter에 값을 인자로 넣은 예제이다. 이 코드의 결과를 예측해보자. 만일 코드가 동기적으로 수행된다고 가정하면 `counter + 1`이 두번 반영되었으므로 `0 -> 1 -> 2` 순으로 값이 갱신되어 최종적인 `counter` 상태의 값은 2라고 생각할 수 있다. 하지만 값은 1이다. 그 이유는 두 가지가 있다
1. setCounter가 비동기적으로 실행된다
1. setCounter가 비동기적으로 실행되는 과정에서 인자로 넘어간 값은 이전 문맥을 고려하지 않으며 오로지 주어진 인자만을 반영하여 상태 갱신에 적용한다. 다시말해 위의 예제에서 setCounter함수가 두 번 호출될 때 인자로 넘어가는 `counter + 1`의 값은 모두 동일하게 `0 + 1`이다. 따라서 `setCounter(counter + 1)`를 몇번 호출하건 관계없이 counter의 값은 1이 된다. 만일 내가 호출하는 횟수만큼 값을 반영하고 싶을때는 함수를 인자로 넣으면 된다. 예를들어 아래와 같다
```javascript
const [counter, setCounter] = useState(0)
setCounter((최신_counter) => {return 최신_counter + 1} )
setCounter((최신_counter) => {return 최신_counter + 1} )
```
위의 예제는 setCounter의 인자를 값에서 함수로 바꾸었다. 이때는 값을 적용할 때와 로직이 조금 달라진다. setCounter의 콜백으로 넘어간 함수는 인자를 받아서 실행되는데 이 값은 함수 컴포넌트 내에 정의된 counter의 값이 아닌 리액트에서 관리하는 상태값이다. 이 최신의 상태값을 인자로 받아서 상태변경을 수행한다. 그리고 이어지는 두번째 setCounter함수의 인자도 동일한 방식으로 처리된다. 두번째 setCounter함수의 콜백으로 넘어간 함수도 인자를 받아서 실행되는데 이 값은 함수 컴포넌트에 있던 counter변수의 값이 아니다. 리액트에서 관리하는 최신의 상태값이다. 두번째 setCounter가 상태변화를 적용하는 시점의 counter의 값은 1이다. 따라서 1을 인자로 받아 1+1을 했으므로 최종 상태값은 2가 된다.\


##### useEffect
useEffect의 인자로 async함수를 넘겨줄 수 없다. 따라서 useEffect의 인자로 넘겨진 함수에서 await구문을 사용할 수 없다. 따라서 `promise.then()`구문을 사용하거나 별도의 async 함수를 호출해야 한다\
\
흔히 쓰는 패턴으로 두번째 인자인 의존성 배열을 빈 배열([])을 넣는 경우가 많다. []는 “절대로 이 이펙트 함수를 갱신하지 말것”이라는 의미이므로 버그 가능성이 높다. 이펙트 함수는 바깥에 선언된 handleChange가 바뀌더라도 다시 호출되지 않는다.
그리고 handleChange는 다른 props나 상태를 참조할 수도 있습니다.
https://overreacted.io/ko/react-as-a-ui-runtime/\
\
React는 이펙트함수가 실행되도록 스케줄링하는 런타임으로 useEffect를 제공합니다.\
결국 useEffect의 목적은 IO에게 바인딩을 제공하는 것입니다\
\
useEffect의 구현 디테일을 말하자면 이것은 side effect입니다. 구체적으로 말하면 전역 뮤테이션.\
하지만 꼭 그렇게 되어야 한다고 말하는 건 아니다. 만일 자바스크립트가 대수적 효과를 지원했다면  전역 뮤테이션 없이 이를 표현할 수 있었을 것
-- dan

##### context 컴포넌트
컨텍스트 컴포넌트는 `상태 끌어올리기(lift state up)`를 위한 솔루션이다\
두개의 컴포넌트가 부모-자식 관계가 아닌 상태에서 데이터를 공유할 때 공통의 조상에게 데이터를 위임하여 그 조상으로부터 데이터를 넘겨받는 패턴이다. 이 때 데이터를 가진 조상 컴포넌트는 최소 공통 조상에게 넘겨주는게 관례이다. 그 이유는 퍼포먼스 때문인데 컨텍스트 API가 루트 컴포넌트에 가깝게 위로 올라갈수록 렌더링 속도의 저하 문제가 있기 때문이다\
컨텍스트 API를 적용했다면 스테이트가 변경된 경우 이 스테이트를 렌더링하는 모든 컴포넌트가 재랜더링된다

[lift state up 참고](https://ko.reactjs.org/docs/lifting-state-up.html)

##### createPortal
```javascript
ReactDOM.createPortal(child, container)
```
현재의 돔트리 구조를 무시하고 전혀 다른곳에 있는 컴포넌트를 부모삼아 렌더링하는 패턴이다\
모달 등의 `position:absolute`속성을 가진 컴포넌트를 구현할 때 쓰인다\
첫 번째 인자는 렌더링할 타겟 컴포넌트이며 두번째 인자는 삽입되고자하는 부모 엘리먼트이다\
\
포탈은 클라이언트에서만 유효한 기능이며 서버용 기능은 아니다.\
왜냐하면 reactDOM.render()가 수행된 추가적으로 호출하는 기능이기 때문이다. 따라서 `react-dom/server` 내부에는 리액트 포털이 없다

##### ErrorBoundary 컴포넌트
네트워크 장애 같은 이유로 다른 모듈을 로드에 실패할 경우 에러를 발생시킬 수 있습니다.
이때 Error Boundaries를 이용하여 사용자의 경험과 복구 관리를 처리할 수 있습니다.
Error Boundary를 만들고 lazy 컴포넌트를 감싸면 네트워크 장애가 발생했을 때 에러를 표시할 수 있습니다.

---

## 리액트 18 관련


##### suspense (suspense, concurrent mode, SSR Streaming)
Concurrent features in React 18 include built-in support for server-side Suspense and SSR streaming support, allowing you to server-render pages using HTTP streaming.
[출처](https://nextjs.org/docs/advanced-features/react-18)

This also means that you can use Suspense-based data-fetching, next/dynamic, and React's built-in React.lazy with Suspense boundaries.

##### 코드 분할과 레이지 로딩 (code spliting, lazy loading)
React.lazy를 사용하면 SSR Streaming이 가능해진다
`const LazyComponent = React.lazy(() => import('./OtherComponent'));`
React.lazy는 import()를 호출하는 함수를 인자로 r가진다. 이 함수는 프로미스를 반환한다
그렇게 생성된 레이지 컴포넌트는 아래와 같은 구문에서 사용된다
```javascript
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>

```
위의 suspense 컴포넌트는 레이지 로딩을 가능하게 해준다. 서버에 컴포넌트를 요청하는 동안은 fallback 어트리뷰트의 html 코드를 렌더링하고 컴포넌트 요청이 완료되면 해당 컴포넌트를 렌더링한다\
\
[링크](https://ko.reactjs.org/docs/context.html)

[링크](https://ko.reactjs.org/docs/code-splitting.html)

[공식홈페이지 문서](https://reactjs.org/docs/concurrent-mode-intro.html)

 hydrate과정이 블로킹을 유발하는 현상을 방지하는 것은 리액트의 오랜 숙제였다.

 약 1000여개가 넘는 html 엘리먼트를 논스톱으로 한번에 하이드레이트 하는 행위는 렌더러 스레드가 자바스크립트 실행 엔진에 의해 장시간 선점되는 결과를 초래한다. 이 상황은 페이지가 프리징되는 현상을 야기하여 사용자 경험을 저하시킨다.

 이런 문제는 하이드레이트 작업이 소규모 테스크 단위로 분리되지 않기 때문에 발생했다.

 그래서 사람들은 하이드레이션 작업을 다중 테스크로 분해하는 방법을 모색했다.

 이러한 하이드레이션 테크닉을 progressive hydration 또는 incremental hydration이라고 부른다. 

 이러한 테크닉을 구현하는 방법은 여러가지가 있겠으나 리액트는 streaming SSR을 구현하면서 덤으로 이 문제를 (어느정도) 해결했다.

 streaming SSR은 대단히 단순한 컨셉으로부터 출발한다. html데이터를 한번에 전송하는 대신 컴포넌트 레벨로 분해하여 여러번에 걸쳐 순차적으로 전송하는 것이 핵심 아이디어인데 이렇게 할 경우 다방면에 걸쳐 유리하다.

 첫째로 서버측에서 클라이언트에게 데이터를 전송하는 딜레이, 다시말해 Time To First Byte(TTFB)를 줄일 수 있다. 이는 서버측에서 DB요청에 대한 응답을 기다리지 않고 가장 먼저 렌더링할 HTML 컴포넌트를 즉각적으로 클라이언트에게 전송하기 때문에 가능하다. DB요청이 완료되면 해당 DB와 관련된 HTML엘리먼트를 뒤이어 전송하면 되므로 아무런 문제가 없다.

 두번째로 클라이언트 측에서 렌더링을 수행하는 속도가 빨라진다. 이는 직관적으로 이해가 가능한 대목인데 부분적인 HTML엘리먼트를 렌더링하는 과정에서 렌더러 스레드가 렌더 트리를 생성하는데 걸리는 시간을 단축할 수 있기 때문이다.
 연산에 필요한 데이터가 그만큼 적으므로 이것은 당연하다.

 세번째는 incremental hydration으로 인한 이점인데, 전체 html파일이 아닌 html 컴포넌트 단위로 하이드레이션을 수행하기 자연스러운 환경이 조성된다. 만일 streaming SSR이 다층 레이어로 구성되어 단일 하이드레이션 테스크의 수행시간이 충분히 짦다면 하이드레이션 과정에서 웹페이지가 프리징되는 상황을 방지할 수 있다.

 여기까지가 streaming SSR 및 incremental hydration을 도입함으로서 얻을 수 있는 이익이었다. 이 주제에 관심이 있으면 댄 아브라모프가 작성한 https://lnkd.in/g23M7Hn 을 참조하는 것이 이해에 많은 도움을 줄 것이다.

그 외에 partial hydration이라는 개념도 눈여겨볼만 한데 이는 전체 html이 아닌 이벤트가 발생하는 html컴포넌트만을 하이드레이션 하는 기법이다.
 이를 적용하면 하이드레이션 타임이 줄어든다는 이점 외에도 가상DOM이 diff알고리즘을 수행하는 시간이 단축된다는 이점이 추가된다.


Shared components
[출처](https://nextjs.org/docs/advanced-features/react-18)
상세는 [이 동영상](https://www.youtube.com/watch?v=TQQPAU21ZUw)을 참조하시오

---

## 기타

##### 함수형 컴포넌트와 클래스 컴포넌트의 렌더링 메커니즘은 다른가 ?

댄(Dan Abramov)은 함수형 컴포넌트의 리랜더링 메커니즘이 클래스 컴포넌트의 그것과 동일하다고 답변했습니다.\
`they literally use the same code.`