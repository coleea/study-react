# nextjs 관련 정리내용

#### Q. .env파일을 어떻게 불러올 수 있는가?

A. node.js에서 제공하는 모듈을 사용해야 한다\
require('dotenv').config();\
config 함수가 리턴된 뒤에는 .env파일의 값을 process.env 객체로 접근할 수 있다\
\
하지만 이런 촌스러운 방법을 쓰지말고 next.config.js에 직접 기입해라

#### Q. next.config.js에서 "target : serverless" 옵션은 무엇인가 ?

A. 넥스트js 8에 추가된 옵션이다
페이지 폴더의 각 페이지 파일들은 독립적인 람다 함수로 빌드된다
In the case of Next.js, each page in the pages directory becomes a serverless lambda.
이렇게 컴파일된 각 람다 함수는 req, res를 인자로 받는다 구체적으로
node.js의 http.IncomingMessage와  http.ServerResponse 객체를 인자로 받는다

#### Q. 왜 next.js 를 컴파일 할 때 import 구문없이 잘 되던게 import 구문을 필요로 하는가?
A. 아마도 컴파일 전에 eslint로 검사하는게 아닐까?하는 합리적인 의심이 드는 것이야

#### Q. 너의 next.js는 왜 eslint같은 지적질을 이상한 방식으로 하는가?
A. 답변 준비 중

#### Q. next.js에서 다음과 같은 에러가 발생했다. 무슨뜻인가?
You may need an additional loader to handle the result of these loaders.\
A. 답을 찾는 중

#### Q. next.js에서 바벨 컨피그를 제외했더니 모듈을 찾을 수 없으시댄다
Module not found: Can't resolve 'components/nav'\
즉 내가 쓴 임포트 구문은 루트 기준으로 절대경로인데 이 루트기준의 절대경로를 

#### Q. 바벨이 모듈 임포트 구문까지 제어하고 있었던 것인가 ?
A. 그런것 같다. ESM을 쓰는지 CommonJS기반으로 트랜스파일 하는지 그 차이인거 같다

#### Q. next.js를 빌드할 떄 이런 메시지가 나오는데 이게 정확히 무슨 뜻인가 ?
warn  - The `target` config is deprecated and will be removed in a future version. (https://nextjs.org/docs/messages/deprecated-target-config)\
\
A. 답변 준비중

#### Q. next.js를 빌드할 떄 이런 메시지가 나오는데 이게 무슨 뜻인가 ?
warn  - No ESLint configuration detected. Run next lint to begin setup\
\
A. 답변 준비중

#### Q. next.js를 빌드할 떄 이런 메시지가 나오는데 이게 무슨 뜻인가 ?
warn  - You are using an unsupported prerelease of 'react-dom' which may cause unexpected or broken application behavior. Continue at your own risk.\
\
A. 답변 준비중

#### Q. next12부터 바벨대신 swc를 사용할 수 있다는데 swc를 어떻게 적용하지?

A. 아무런 설정을 할 필요가 없다. 바벨 대신 디폴트로 설정된다.
다만 루트폴더에 .babelrc파일을 생성하면 바벨을 대신 사용하니 이점만 유의할 것
만일 작동이 되지 않는다면
next.config.js 설정파일로 가서 "swcLoader  : true"라고 추가해줘라

#### Q. next.js 프로젝트에 스토리북을 도입할 수는 없는가?
A. https://wonit.tistory.com/378

#### Q. next.js의 링크 컴포넌트는 어떻게 작동하는가 ?
A. <Link/>컴포넌트는 새로 라우팅을 하는 것으로 알려져있지만 사실은 서버로부터 props를 내려받아 컴포넌트를 재호출 하는것에 불과하다. fetch함수로 서버로부터 props를 내려받아 그 전달받은 props를 인자로 특정 컴포넌트를 재호출 하는 방식으로 리랜더링이 수행된다. fetch함수는 서버의 getServerSideProps함수를 트리거하고 결국 getServerSideProps의 리턴값이 json형태로 클라이언트에게 전달된다

#### Q. next.js에서 링크 엘리먼트에 프리패치를 적용할 수 있다는데 프리패치가 뭔가?
A. 먼저 프리패치는 아래와 같이 적용한다
`<Link href="/about" prefetch>`
그런데 Next.js의 프리패치는 preload라고 한다. 이점이 사람을 헷갈리게 한다
자세한 답변은 준비중입니다

#### Q. Next.js 에서 스크립트 떠넘기기 (offload scripts)가 무엇인가 ? 
A. 모름. 아직 RFC에 불과하다. 정식으로 채택될지도 미지수다 