# react study

## 빌트인 훅 관련

##### useState
useState는 배열을 리턴한다.\
흔한 구문인 `const [name, setName] = useState('')`  는 어레이 디컨스트럭팅이 적용된 문법이다\
`setOOOO`은 리액트에서 권장하는 함수명이지만 굳이 이 규칙을 따를 필요는 없다. `이름변경하기`같은 한글 함수를 적용해도 괜찮다. 실제로 중국인들은 중국어로 작성하는 경우가 많다

##### useEffect
useEffect의 인자로 async함수를 넘겨줄 수 없다. 따라서 useEffect의 인자로 넘겨진 함수에서 await구문을 사용할 수 없다. 따라서 `promise.then()`구문을 사용하거나 별도의 await함수를 호출해야 한다

##### context 컴포넌트
컨텍스트 컴포넌트는 `상태 끌어올리기(lift state up)`를 위한 솔루션이다\
두개의 컴포넌트가 부모-자식 관계가 아닌 상태에서 데이터를 공유할 때 공통의 조상에게 데이터를 위임하여 그 조상으로부터 데이터를 넘겨받는 패턴이다. 이 때 데이터를 가진 조상 컴포넌트는 최소 공통 조상에게 넘겨주는게 관례이다. 그 이유는 퍼포먼스 때문인데 컨텍스트 API가 루트 컴포넌트에 가깝게 위로 올라갈수록 렌더링 속도의 저하 문제가 있기 때문이다



##### createPortal
```javascript
ReactDOM.createPortal(child, container)
```
첫 번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React 자식입니다.\
두 번째 인자(container)는 DOM 엘리먼트입니다.

##### ErrorBoundary 컴포넌트\
[링크](https://ko.reactjs.org/docs/context.html)

---

## 리액트 18 관련

##### suspense (suspense, concurrent mode, SSR Streaming)
Concurrent features in React 18 include built-in support for server-side Suspense and SSR streaming support, allowing you to server-render pages using HTTP streaming.
[출처](https://nextjs.org/docs/advanced-features/react-18)

This also means that you can use Suspense-based data-fetching, next/dynamic, and React's built-in React.lazy with Suspense boundaries.
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


##### 서버 컴포넌트 (Server Components)
React Server Components allow us to render everything, including the components themselves, on the server. This is fundamentally different from server-side rendering where you're pre-generating HTML on the server. With Server Components, there's zero client-side JavaScript needed, making page rendering faster. This improves the user experience of your application, pairing the best parts of server-rendering with client-side interactivity.
[출처](https://nextjs.org/docs/advanced-features/react-18)


##### startTransition
startTransition, which prevents an expensive UI render from being executed immediately.

To understand why we need this feature, remember that forcing expensive UI renders to be done immediately can block lighter and more urgent UI renders from rendering in time. This can frustrate users who need immediate response from the urgent UI renders.

An example of an urgent UI render would be typing in a search bar. When you type, you want to see your typing manifested and begin searching immediately. If the app freezes and the searching stops, you get frustrated. Other expensive UI renders can bog down the whole app, including your light UI renders that are supposed to be fast (like seeing search results as you type).

When developing your React app, you can avoid this problem by debouncing or throttling. Unfortunately, using debouncing or throttling can still cause an app to become unresponsive.

startTransition allows you to mark certain updates in the app as non-urgent, so they are paused while the more urgent updates are prioritized. This makes your app feel faster, and can reduce the burden of rendering items in your app that are not strictly necessary. Therefore, no matter what you are rendering, your app is still responding to your user’s input.

In this article, we’ll learn how to use startTransition in your React app in order to delay the non-urgent UI updates to avoid blocking urgent UI updates. With this feature, you can convert your slow React app into a responsive one in no time.

Before we begin, note that React 18 is still in alpha at the time of writing, so startTransitionis not yet part of a stable release.

[출처](https://blog.logrocket.com/getting-started-react-18-starttransition/)


---

## 그 외 개념

##### 코드 스플리팅\
[링크](https://ko.reactjs.org/docs/code-splitting.html)
\
##### 스테이트 끌어올리기 (lift state up)\
종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다. 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋습니다. [출처](https://ko.reactjs.org/docs/lifting-state-up.html)

---

## 기타 코딩 프랙티스

##### 스타일 변경
함수에서 스테이트 변경을 감지하면 다음처럼 ref로 엘리먼트를 지정하여 스타일을 변경한다
loadingRef.current.style.display = 'none' ;\
\
##### div를 제거하는게 좋다
nested div는 전체 컴포넌트를 더럽게 한다
\
##### 네트워크 요청과 반환시 데이터를 다룰때 주의사항\
네트워크 통신을 할 때는 직렬화가 가능한 객체를 인자로 넣어주여야 한다\
가장 많이 쓰이는 방법은 `JSON.stringify(객체)`로 직렬화한 뒤에 `JSON.parse()`로 객체로 되돌리는 패턴이다\
