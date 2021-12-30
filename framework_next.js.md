# nextjs 관련 정리내용

#### Q. next.js에서 캐싱을 한다는데 캐싱을 어떻게 하는가 ?

A. /_next/static 폴더에 보관된 이미지, 미디어 파일등 변경할 수 없는 자산에 캐싱 헤더를 자동으로 추가한다
`Cache-Control: public, max-age=31536000, immutable`

상세는 https://nextjs.org/docs/going-to-production#caching 를 참조하시오

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

#### Q. next12부터 바벨대신 swc를 사용할 수 있다는데 swc를 어떻게 적용하지?

A. 아무런 설정을 할 필요가 없다. 바벨 대신 디폴트로 설정된다.
다만 루트폴더에 .babelrc파일을 생성하면 바벨을 대신 사용하니 이점만 유의할 것
만일 작동이 되지 않는다면
next.config.js 설정파일로 가서 "swcLoader  : true"라고 추가해줘라

#### Q. next.js의 링크 컴포넌트는 어떻게 작동하는가 ?

A. <Link/>컴포넌트는 새로 라우팅을 하는 것으로 알려져있지만 사실은 서버로부터 props를 내려받아 컴포넌트를 재호출 하는것에 불과하다. fetch함수로 서버로부터 props를 내려받아 그 전달받은 props를 인자로 특정 컴포넌트를 재호출 하는 방식으로 리랜더링이 수행된다. fetch함수는 서버의 getServerSideProps함수를 트리거하고 결국 getServerSideProps의 리턴값이 json형태로 클라이언트에게 전달된다