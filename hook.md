
## Q. 훅(hook)이 무엇인가 ?


A. 훅은 함수형 컴포넌트에서 이펙트를 사용할 수 있도록 도와주는 툴이다\
\
훅을 사용하여 우리는 라이프사이클 메소드 이름에 기반한 코드를 만들지 않아도 되며 코드가 실제로 하는 일에 기초하여 코드를 분리할 수 있다. 즉 비즈니스 로직 단위로 함수를 작성할 수 있으며 이것은 코드를 더욱 선언적이게 만든다\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (44:17을 참조)\
훅은 관심사로 로직을 분리하는 것을 가능하게 했다\
\
커스텀 훅은 자신만의 추상화를 만들 수 있는 유연성을 준다.\
그것들은 당신의 리액트 컴포넌트 트리를 팽창시키지도 않으며 래퍼 지옥을 피하게 해준다\
(custom hooks give you the flexibility to create your own abstractions  they do not inflate your react component tree and avoid the wrapper hell)\
-- [Dan](https://www.youtube.com/watch?v=dpw9EHDh2bM) (53:24을 참조)

## 빌트인 훅 관련

#### React Test Selectors가 무엇인가?

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

Q. useState의 두번째 리턴값인 setOOO을 호출하면 무슨일이 발생하는가?\
A. 스테이트를 업데이트하는 순간 함수컴포넌트의 리랜더링을 강제한다\
클래스 컴포넌트의 forceUpdate() 메소드가 했던 것과 똑같은 것을 수행한다.\
\
Q. 세터(setter)가 호출되면 해당 컴포넌트가 무조건 재랜더링되는가 ?\
A. 항상 재랜더링되는 건 아니다. 재랜더링 되는 조건이 있다.\
\
Q. 그 재랜더링 되는 조건이라는 건 업데이트된 상태가 이전 상태와 달라야 한다는 것인가?\
A. 상태가 같건 다르건 그건 중요하지 않다. 리액트는 상태 비교를 하지 않는다. 유일한 리랜더링 조건은 `함수 컴포넌트의 리턴값이 이전 리턴값과 다를때`만 재랜더링을 수행한다\
\
Q. 왜 setState는 비동기로 처리되는가 ?\
A. 배치 업데이트(batch update)를 하기위한 조치로 보인다\

##### useEffect

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
##### Q. useEffect는 어떻게 구현되었나 ?
A. useEffect의 구현 디테일을 말하자면 이것은 사이드이펙트의 형태로 구현되었다. 구체적으로 말하면 전역 뮤테이션.\
\
하지만 꼭 그렇게 되어야 한다고 말하는 건 아니다. 만일 자바스크립트가 대수적 효과를 지원했다면  전역 뮤테이션 없이 이를 표현할 수 있었을 것
-- dan

##### useEffect는 정확히 언제 실행되는가 ?

유즈이펙트의 이펙트 함수는 렌더링 사이클이 완전히 종료된 이후에 실행된다

### useLayoutEffect가 무엇인가 ?

이펙트 함수가 리액트 스케줄러에 의해 비동기로 발생하는 것 과는 다르게 useLayoutEffect는 diff알고리즘이 종료되고 가상돔이 실제돔에 직접적인 변경을 가한 이후에 동기적으로 바로 실행된다\
즉 하나의 렌더링 사이클 과정이 진행되는 자바스크립트 코드에서 동기적으로 실행된다

##### context 컴포넌트
컨텍스트 컴포넌트는 `상태 끌어올리기(lift state up)`를 위한 솔루션이다\
두개의 컴포넌트가 부모-자식 관계가 아닌 상태에서 데이터를 공유할 때 공통의 조상에게 데이터를 위임하여 그 조상으로부터 데이터를 넘겨받는 패턴이다. 이 때 데이터를 가진 조상 컴포넌트는 최소 공통 조상에게 넘겨주는게 관례이다. 그 이유는 퍼포먼스 때문인데 컨텍스트 API가 루트 컴포넌트에 가깝게 위로 올라갈수록 렌더링 속도의 저하 문제가 있기 때문이다\
컨텍스트 API를 적용했다면 스테이트가 변경된 경우 이 스테이트를 렌더링하는 모든 컴포넌트가 재랜더링된다

[lift state up 참고](https://ko.reactjs.org/docs/lifting-state-up.html)

### useRef
useRef는 리액트에서 html엘리먼트에 접근할 때 사용한다. 리액트에서는 쿼리셀렉터(document.querySelector)같은 셀렉터 함수 대신 ref를 이용하여 html엘리먼트를 컨트롤한다.\
주로 스타일이나 어트리뷰트 값을 조작할 때 사용한다

### forwardRef
외부 컴포넌트에서 다른 컴포넌트에 속해있는 html 엘리먼트에 접근할 때 사용한다\
외부 컴포넌트에서 다른 컴포넌트의 렌더링 행위를 조작하나는 행위는 컴포넌트의 아이솔레이션을 위반한다. 하지만 편의성 등의 문제로 이런 상황이 필요할 때가 있다. 엘리먼트를 포커싱 하는 상황 등에서 필요하다.\
\
forwardRef는 고차 컴포넌트인데 즉 인자로 컴포넌트를 받아서 다른 컴포넌트를 리턴한다. 이때 반환된 컴포넌트는 props외에도 ref라는 두번째 파라메터를 받는다. 이 두번째 파라메터가 외부에서 주입받는 ref로서 활용된다

### useImperativeHandle

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


### useSelectedContext
context api의 대안으로 등장했다. 퍼포먼스 이슈를 어느정도 해결한 것으로 보임\
현재 관련 구현제는 dai-shi가 구현하였음


###  훅 (React hooks)

### 커스텀 훅이란 ?

기본적인 훅인 useState나 useEffect등의 훅을 재조합해서 하나의 훅을 만드는 패턴이다. 이 커스텀 훅은 하나의 함수로 구성되며 함수 컴포넌트 내부에서 호출하여 사용한다

##### ErrorBoundary 컴포넌트
네트워크 장애 같은 이유로 다른 모듈의 로드에 실패할 경우 에러가 발생할 수 있다\
\
이때 에러바운더리 컴포넌트를 이용하여 사용자 경험을 관리하면 복구 세션을 수행할 수 있다.\
\
에러 바운더리 컴포넌트를 생성하고 레이지(Lazy) 컴포넌트를 자식 컴포넌트로 포함시키면 네트워크 장애가 발생했을 때 적절한 조치를 취할 수 있게된다

### useCallback

```javascript
function callback(a, b){}

const memoizedCallback = useCallback(
    callback,
    [a, b],
);
```
메모이제이션 기능이 추가된 함수를 반환한다. 첫번쨰 인자로 메모이즈할 콜백함수가 들어가고 두번째 인자는 콜백함수의 인자이다. 만일 콜백함수의 인자가 변경되면 콜백함수가 재생성된다. 만일 콜백함수의 인자가 변경되지 않으면 기존에 생성해놓은 함수의 참조값을 `memoizedCallback`변수에 재할당한다\
\
Q. 함수를 재생성하지 않는게 무슨 의의가 있는가 ?\
A. 모른다


###  useMemo
usememo는 속도 최적화에 사용된다\
useMemo는 그저 함수의 메모이제이션이다.
```javascript
const 메모된값 = useMemo(() => 함수(a, b), [a, b]);
```
별달리 설명할 내용이 없다

### useDebugValue

---

## 서드파티 리액트 훅

### Q. MobX란 무엇인가?

### 리덕스란 무엇인가 ?
리덕스의 모든 작업은 디스패처를 통해서만 이루어진다. 즉 모든 변화는 단일한 게이트 키퍼인 디스패처를 반드시 통과해야 한다.

리덕스는 flux와 elm아키텍처를 혼용하여 제작되었다.

dan이 말하길, 이것을 도입한 이유는 flux 아키텍처를 수정하면 핫 리로딩과 타임 트래블을 구현할 수 있지 않을까? 하는 가설을 입증하기 위하여 고안되었다.

다시 말해 거시적인 그림은 flux아키텍처와 큰 차이가 ㅇ ㅓㅄ다.

dan이 말하길,  redux is just an event emitter. a change emitter holding a value

이벤트 emitter는 상태변경이라는 이벤트를 emit하여 스케줄러에 전달한다.

### 그러면 flux란 무엇인가 ?

페북 개발자가 말하길 , flux라나 making interactions easier to reason about 때문에 만들었다고 한다

### 그래프큐엘 (GraphQL)

그래프큐엘은 하나의 문제에서 출발한다. 바로 REST API가 가진 문제점이다.
레스트 API는 문제가 있었다. The Big problem was a lack of modularity 였다. 그래프큐엘은 모듈화를 가능케 한 것으로 추정된다. 무엇에 대한 모듈화인지는 모르겠지만 .. 아무튼 코어 컨셉은 반응의 형태를 구조적 형태로 구성할 수 있다는 점이다. 구조적인 형태는 트리 구조를 표현할 수 있다는 뜻이다.
트리구조로 데이터를 모듈화 할 수 있다고 한다. 그런데 이게 왜 좋은가 ? 컴포넌트 단윈로 필요한 데이터를 모듈화하여 불필요한 정보를 요청하지 않아도 된다는 이점이 있다는데 불필요한 정보의 요청은 레스트 api를 사용해도 피할 수 있지 않은가 ?

### react-query

리액트 쿼리란 `전역상태를 터치하지 않는다(without touching any global state)`라는 슬로건을 가진 리액트 훅이다\
\
말 그대로 전역 스테이트를 건드리지 않은 상태에서 페치(fetch)를 수월하게 해주는 솔루션을 제공한다\
\
즉 리액트 쿼리의 지향점은 재사용 가능한 단일 리액트 컴포넌트로서의 아이솔레이션 기능을 유지하면서 fetch를 통한 최신의 상태를 손쉽게 유지하는 것이다.\
\
리액트 쿼리는 swr과 그 지향점이 유사하다. 그러니 굳이 swr을 사용할 줄 안다면 리액트 쿼리를 사용할 필요는 없을 것으로 보인다

[공식링크](https://react-query.tanstack.com/)

### swr

swr은 페치(fetch)하는 로직을 더 간단하게 도와주는 훅이다.\
\
페치하는 로직을 간단하게 해준다는 말이 애매할 수 있다. 예를 들어 데이터를 가져오기 전에 UI에 로딩이라고 적어두고 싶다.\
\
그리고 나서 페치가 완료되면 받아온 데이터를 기반으로 UI를 다시 그리고 싶다.\
\
이렇게 하려면 보통 하나의 상태를 만들어서 상태값이 `로딩`일 때는 로딩 컴포넌트를 렌더링하고 상태가 `응답완료`일 때는 받아온 데이터를 기반으로 렌더링한다.\
\
이건 구현 난이도가 어려운 건 아니지만 번거롭다. 반면 useSWR훅을 사용하면 일일이 상태를 변경할 필요 없이 직관적으로 구현할 수 있다.\
\
가령 아래와 같다

```javascript
 function App() {

  const { data, error } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
  );

  if (error) return "error";
  if (!data) return "Loading..";
  return (
    <>
      <h1>{data.name}</h1>
    </>
  );
}
```

위의 예제는 직관적이다. 이 컴포넌트는 서버에서 데이터를 받아오고 받아오는 동안은 로딩을 출력한다.\
\
받아온 뒤에는 데이터를 출력한다. 이걸 구현하는 과정에서 어떠한 상태도 사용하지 않았다. 그저 useSWR이 리턴하는 두개의 변수를 사용했을 뿐이다.\
\
swr은 이 외에도 두가지 기능을 추가로 더 제공한다 유저 인증과 게시판 로딩이다.\
\
먼저 유저 인증을 살펴보자. 해당 코드는 [여기](https://swr.vercel.app/examples/auth)에 있다.\
\
[swr에 대한 더 자세한 내용은 이 동영상](https://www.youtube.com/watch?v=F1o_0umlXbU)을 참조할 것

[swr 공식링크](https://swr.vercel.app/examples/basic)

###  Q. react-relay가 무엇인가?

`react-relay`는 클라이언트가 사용하는 그래프큐엘 훅이다\
\
그래프큐엘 기반의 데이터 페칭을 쉽게 관리할 수 있게 해준다\
\
릴레이는 빠른 속도와 편리한 사용방법이라는 두가지 장점을 모토로 한다\
\
하지만 릴레이 공식 웹페이지에서 제공하는 가장 간단한 예제를 살펴보면 사용법이 편리하다는 생각은 들기 어려울 것이다\
\
실제 예제를 살펴보자. 다음은 `usePreloadedQuery` 훅의 간단한 예제이다

```javascript

const relayEnvironment = new Environment({
  network: Network.create(커스텀_fetch함수),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10
  })
});

const queryRef = loadQuery(
  relayEnvironment,
  TodoAppQuery.default,
  {userId: "me"}
) ;

const todoQuery =  graphql`
  query TodoAppQuery($userId: String!) {
    user(id: $userId) {
      id
      totalCount
      ...TodoListFooter_user
      ...TodoList_user
    }
  }
`

const data = usePreloadedQuery(
  todoQuery,
  queryRef
);
```

usePreloadedQuery훅은 그 이름의 의미하는 것 처럼 데이터를 미리 로드하는 기능을 제공한다.\
\
usePreloadedQuery훅은 두개의 인자를 받는다. 첫째는 그래프큐엘 기반의 쿼리 스트링인데 쿼리스트링을 인자로 받는것까지는 직관적이고 이해하기 쉽다.\
\
문제는 두번째 인자다. 두번째 인자는 loadQuery함수로 생성된 queryRef를 받는다.

### 이 문서는 작성중입니다

[relay 홈페이지](https://relay.dev/)
