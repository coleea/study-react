Q. 서버리스를 쓰는데 이런 경고창이 왜 뜨는가?
Warning: You are using the beta version of Serverless Components. Please migrate to the GA version for enhanced features: https://github.com/serverless/components

A. 답을 찾는 중

Q. 에러문 `"service" property is missing in serverless.yml`은 왜 발생하는가 ?
A. service 프로퍼티를 쓰라는 소리인데 그냥  `serverless.yml` 파일을 밀고 아래 코드로 대체하라

서버리스 에러
H:\project\site\devkr>serverless deploy

  error:
  Error: "component" input is required to run custom methods
    
(deploy가 커스텀 메소드 ?)

그러면 serverless 커맨드에 커스텀 메소드를 사용하지 않은건 일반 메소드라는 소린가 ?

serverless
에러
Error message "error:0308010C:digital envelope routines::unsupported"
set NODE_OPTIONS=--openssl-legacy-provider
