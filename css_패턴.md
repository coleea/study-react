### 리액트의 css패턴 Q&A 모음

#### Q. css-in-js가 무엇인가?

css파일이 아닌 자바스크립트 파일 내부에서 css 규칙을 정의하는 코딩 스타일을 `css-in-js`라고 부른다.\
\
스타일드 컴포넌트같은 라이브러리가 대표적인 css-in-js의 예이다

#### Q. 테일윈드 css (tailwind css)란 무엇인가?

테일윈드를 이야기하기 앞서 부트스트랩 라이브러리를 이야기 해보자\
\
부트스트랩은 일일이 css 규칙을 정의하지 않아도 html 엘리먼트에 클래스 이름을 기입하는 것만으로 간편하게 사용할 수 있는 라이브러리이다. 이것이 가능한 이유는 부트스트랩 팀에서 미리 css 코드와 클래스 이름을 정의해놓았기 때문이다\
\
즉 부트스트랩을 사용하면 남이 만들어놓은 css를 그저 가져다 쓰면 될 뿐이므로 내가 css 규칙을 작성할 일이 거의 없다. 부트스트랩에서 제공하는 클래스 이름만 암기하고 그 암기한 클래스 이름을 원하는 엘리먼트에 붙여넣으면 될 뿐이다\
\
그리고 이 부트스트랩의 후계자 정도 되는 라이브러리가 테일윈드 css인데 테일윈드 css도 부트스트랩과 마찬가지로 이미 정의되어 있는 css규칙을 사용한다. 다만 부트스트랩보다 더욱 로우레벨 단위로 css가 정의되어 있다. 이 점을 장점으로 바라볼 수도 있고 단점으로 바라볼 수도 있다. 더욱 디테일한 css 컨트롤이 가능하다는 장점이 있지만 일일이 기입해야 하는 클래스 이름이 많아졌다는 점이 단점이라면 단점이다. 만일 디테일한 디자인 커스터마이징이 필요하지 않다면 테일윈드 대신 부트스트랩을 사용하는 것도 좋은 선택이다. 태생적인 특성상 부트스트랩이 테일윈드보다 작업이 빠를 수밖에 없기 때문이다\
어찌되었든 유저는 그저 테일윈드에 정의되어 있는 클래스 이름을 암기하고 그 이름을 가져다가 특정 html 엘리먼트에 적용하기만 하면 된다. 예를 들어 아래와 같다

```javascript
function 컴포넌트(){
    return(
        <div className="w-64 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600">
            테일윈드를 적용한 div
        </div>
    )
}
```

위의 코드는 css 정의부가 없으며 그저 정의된 css를 적용했다. 즉 내가 별도로 css를 작성하는데 소비되는 시간이 줄어든다. 극단적으로 말하면 프로젝트의 모든 스타일링을 테일윈드 만으로도 구현할 수 있다. 그렇게 된다면 내가 별도로 작성해야 하는 css코드의 양을 제로로 줄이는것도 가능하다\
\
그리고 이미 정의되어 있는 css를 가져다가 쓰기 때문에 마크업 부분과 css정의부를 이리저리 왔다갔다 할 필요가 없다. 테일윈드를 쓰는 사람들은 `개발 시간이 줄어들었다`는 이야기를 공통적으로 하는데 이처럼 코드를 이리저리 옮겨다닐 필요가 없는 것도 개발시간 단축에 한 몫 한다\
\
이렇게만 적어놓으면 테일윈드를 사용하지 않는 것이 바보처럼 느껴지겠지만 꼭 그렇지만도 않다. 테일윈드의 시장점유율이 압도적인 것도 아니다. 왜 그럴까?  일단 암기해야 하는 클래스 이름이 많아 어느정도의 러닝커브가 있다. 테일윈드에 익숙해지기 전까지는 모니터 한켠에 테일윈드의 공식 docs 페이지를 띄어놓고 검색하는 일이 잦다\
\
이것보다 더 큰 문제는 코드가 지저분해지는 단점이다. 위의 코드만 보면 별 느낌이 없을 수도 있겠지만 아래의 코드를 보자

```javascript
function 컴포넌트(){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
                <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Entire house</p>
                <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Beach House in Collingwood</h2>
            </div>
            <div className="col-start-1 row-start-2 px-4 sm:pb-16">
                <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
                    <svg width="20" height="20" fill="currentColor" className="text-violet-600">
                        <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                    </svg>
                    <div className="ml-1">
                        <span className="text-black">4.94</span>
                        <span className="sm:hidden md:inline">(128)</span>
                    </div>
                    <div className="text-base font-normal mx-2">·</div>
                    <div>Collingwood, Ontario</div>
                </div>
                <hr className="w-16 border-gray-300 hidden sm:block">
            </div>
            <div className="col-start-1 row-start-3 space-y-3 px-4">
                <p className="flex items-center text-black text-sm font-medium">
                    <img src="/kevin-francis.jpg" alt="" className="w-6 h-6 rounded-full mr-2 bg-gray-100">
                    Hosted by Kevin Francis
                </p>
                <button type="button" className="bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg">Check availability</button>
            </div>
            <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
                <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                    <div className="relative col-span-3 row-span-2 md:col-span-2">
                        <img src="/beach-house.jpg" alt="" className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
                    </div>
                    <div className="relative hidden md:block">
                        <img src="/beach-house-interior.jpg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                    </div>
                    <div className="relative hidden md:block">
                        <img src="/beach-house-view.jpg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
                    </div>
                </div>
            </div>
        </div>
    )
}
```

위의 코드는 본인이 만든 코드가 아니다. 테일윈드 공식 사이트에 있는 코드를 가져와서 함수 컴포넌트로 바꾸었을 뿐이다.\
자 위의 코드는 일단 만들 때는 편하다. 위에서 언급한 대로 마크업과 css부분을 옮겨다닐 필요가 없고 남이 정의해 놓은 규칙을 가져다가 쓰기만 하면 되기 때문이다. 하지만 유지보수 상황을 고려해 보자.\
\
먼저 마크업의 구조를 변경하고 싶을 때 전체적인 구조가 한눈에 들어오지 않는다. 이것은 마크업 레이어와 css레이어가 섞여있기 때문이다.\
애써 클래스네임 부분을 무시하고 구조만 보려고 해도 잘 되지 않는다. 이는 인간의 눈이 무언가를 인지할 때 내가 보고싶은 정보만 취사선택 하기가 어렵기 때문이다. 이처럼 마크업 구조를 이해할 때 인지적인 과부하 문제가 있다\
\
두번째로 css를 수정해야 하는 상황을 보자. 이런경우 내가 수정할 엘리먼트의 css가 어디에 정의되어 있는지를 별도로 찾을 필요는 없다. 여기까지는 좋다. 그러나 아래의 코드를 보자

```html
<div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
```

위의 코드에서 패딩을 수정하고 싶다. 무엇을 수정해야 하는지 한눈에 들어오는가? 아마 쉽지 않을것이다. 일단 클래스이름이 가로로 적혀있는 관계로 가독성이 떨어진다. 만일 위의 코드를 세로로 바꾸면 아래와 같이 된다

```html
  <div className="
    relative 
    z-10 
    col-start-1 
    row-start-1 
    px-4 
    pt-40 
    pb-3 
    bg-gradient-to-t 
    from-black 
    sm:bg-none">
```

이건 좀 낫다. 하지만 실제로는 이런 식으로 코딩할 수 없다. 클래스이름을 세로로 작성하면 너무 길어지고 그렇게되면 마크업 구조를 파악하는 게 거의 불가능에 가까워진다. 따라서 가로로 정의할 수 밖에 없는데 이 때문에 클래스이름이 한눈에 들어오지 않는다.\
\
ctrl-f로 검색을 해서 원하는 클래스를 찾은다음 수정하는 방법도 있다. 그런데 패딩에 대한 클래스이름이 한두개가 아니라 그것도 어렵다. p-도 패딩이고 px도 패딩, pt, pb, pr등이 모두 패딩이다. 위의 예에서는 `px-4`, `pt-40`, `pb-3`가 모두 패딩이다. 즉 내가 수정하고 싶은 디자인의 클래스이름을 찾는것도 쉽지않다.\
\
이전에 특정한 스타일을 지정했는지 지정하지 않았는지 확인하는 것도 쉽지 않다. 예를 들어 내가 폰트사이즈를 바꾸고 싶어서 `text-7xl` 이라는 클래스이름을 추가했다. 그런데 이미 앞에서 `text-2xl`가 선언되어 있었다. 다만 클래스 문자열이 너무 길어서 미처 확인하지 못한것이다. 이렇게 되면 중복으로 같은 속성을 지정하는 문제가 생길수도 있다.\
따라서 초기 개발은 빠를 수 있지만 유지보수의 속도는 그렇지 않을 수 있다는 결론도 무리는 아닌것으로 보인다\
\
이런 문제를 조금이라도 극복할 수 있을까? 먼저 클래스이름을 별도의 문자열로 떼어놓는 방법이 있다. 가령 아래와 같은 코드가 있다고 가정하자

```javascript
function House(){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
                <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">Entire house</p>
                <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">Beach House in Collingwood</h2>
            </div>
        </div>
    )
}
```

위의 코드에서 인라인 문자열을 별도의 변수로 분리하면 아래와 같이 변경된다

```javascript
function House(){

    const HouseCss = {
        wrapper : "grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16",
        description : "relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none",
        p : "text-sm font-medium text-white sm:mb-1 sm:text-gray-500",
        h2 : "text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl",
    }

    return (
        <div className={HouseCss.wrapper}>
            <div className={HouseCss.description}>
                <p className={HouseCss.p}>Entire house</p>
                <h2 className={HouseCss.h2}>Beach House in Collingwood</h2>
            </div>
        </div>
    )
}
```

이렇게 되니 마크업 구조의 이해가 더 수월해졌다. 이것은 공식 사이트에서 제안하는 베스트 프랙티스는 아닌 본인의 생각이니 오해없기 바란다. 왜 이것이 베스트 프랙티스가 아닌지는 모르겠으나 개인적으로는 이게 더 낫다\
\
하지만 위의 방법론도 어떤 클래스이름을 지정했는지 한눈에 들어오지 않는 단점이 있다. 이것은 문자열을 합병하는 식으로 코드를 표현하면 조금 나아진다. 가령 아래와 같다

```javascript
function House(){

    const HouseCss = {
        wrapper : `grid` + ` grid-cols-1` + ` sm:grid-cols-2` + ` sm:px-8` + ` sm:py-12` + ` sm:gap-x-8` + ` md:py-16`,
        description : `relative` + ` z-10` + ` col-start-1` + ` row-start-1` + ` px-4` + ` pt-40` + ` pb-3` + ` bg-gradient-to-t` + ` from-black sm:bg-none`,
        p : `text-sm` + `font-medium` + `text-white` + `sm:mb-1` + `sm:text-gray-500`,
        h2 : `text-xl` +  ` font-semibold`  + ` text-white sm:text-2xl` + ` sm:leading-7` +  ` sm:text-black` +  ` md:text-3xl`,
    }

    return (
        <div className={HouseCss.wrapper}>
            <div className={HouseCss.description}>
                <p className={HouseCss.p}>Entire house</p>
                <h2 className={HouseCss.h2}>Beach House in Collingwood</h2>
            </div>
        </div>
    )
}
```

이렇게 해놓으니 클래스이름이 더 잘 구분된다. 이런 프랙티스는 마크업 레이어와 css레이어가 합쳐짐으로서 얻는 장점을 거의 그대로 가져온다. 즉 마크업 선언부와 css 정의부를 옮겨다닐 일이 거의 없다. 클래스를 인라인에 직접 기입하지 않으므로 옮겨다닐 일이 아주 없는건 아니다. 하지만 리턴문 바로 앞에 클래스이름을 정의하면 코드를 이동할 때 소모되는 인지적 과부하가 상당부분 줄어든다\
\
또한 마크업 부분을 그대로 복붙해서 다른 컴포넌트에 가져다가 집어넣어도 그 자체로 완결성을 가진 컴포넌트로 작동할 수 있다. 즉 외부에서 css모듈까지 추가로 복붙해야 하는 번거로움이 없다. 그저 함수 컴포넌트의 리턴문 바로 앞에 클래스이름이 정의된 `HouseCss`같은 객체를 선언하면 리턴문과 `HouseCss`객체만 복붙하는 것으로 상태가 없는 하나의 독립된 컴포넌트를 다른 컴포넌트에 이식할 수 있다. 객체이름을 `HouseCss`와 같이 컴포넌트 이름으로 작성하면 다른 컴포넌트에서 변수명이 충돌할 일도 없다\
\
만일 css 가독성을 극대화하고 싶다면 위의 코드를 아래와 같이 변경할 수도 있다

```javascript
const HouseCss = {

    wrapper : `grid` + 
    ` grid-cols-1` + 
    ` sm:grid-cols-2` + 
    ` sm:px-8` + 
    ` sm:py-12` + 
    ` sm:gap-x-8` + 
    ` md:py-16`,
    
    description : 
    `relative` + 
    ` z-10` + 
    ` col-start-1` + 
    ` row-start-1` + 
    ` px-4` + 
    ` pt-40` + 
    ` pb-3` + 
    ` bg-gradient-to-t` + 
    ` from-black sm:bg-none`,

    p : `text-sm` + 
    `font-medium` + 
    `text-white` + 
    `sm:mb-1` + 
    `sm:text-gray-500`,

    h2 : `text-xl` +  
    ` font-semibold`  + 
    ` text-white sm:text-2xl` + 
    ` sm:leading-7` +  
    ` sm:text-black` +  
    ` md:text-3xl`,
}

function House(){

    return (
        <div className={HouseCss.wrapper}>
            <div className={HouseCss.description}>
                <p className={HouseCss.p}>Entire house</p>
                <h2 className={HouseCss.h2}>Beach House in Collingwood</h2>
            </div>
        </div>
    )
}
```

클래스 정의부를 함수 밖으로 꺼내었다. 이렇게 하면 js 레이어,  마크업 레이어, css 레이어가 구분되므로 클래스 이름을 세로로 기입해도 큰 부담이 없다. 아무리 클래스 이름이 길더라도 css정의에 국한되어 있어서 다른 레이어에 영향을 주지 않기 때문이다\
\
이렇게 하면 세로축으로 코드가 읽히므로 정의된 스타일이 한눈에 들어온다. 따라서 이러한 프랙티스는 css 유지보수에 최적이다. 이 같은 상황에서 css를 수정하는 시나리오를 가정해 보자. h2의 텍스트 크기를 변경하고 싶을 때 아래와 같은 절차를 거친다

1. 먼저 h2 엘리먼트가 정의된 코드로 이동한다
2. h2 엘리먼트에서 `className={HouseCss.h2}` 부분에 마우스 커서를 올려놓고 f12를 누른다 (vs code 기준). 그러면 HouseCss.h2의 정의부로 이동한다. 즉 아래와 같은 코드로 이동한다

```javascript
    // ...
    h2 : `text-xl` +  
    ` font-semibold`  + 
    ` text-white sm:text-2xl` + 
    ` sm:leading-7` +  
    ` sm:text-black` +  
    ` md:text-3xl`,
    // ...
```
3. 수정할 클래스이름을 찾는다. 이 예제에서는 텍스트 크기를 수정할 것이므로 텍스트 크기가 정의된 부분을 찾는다. 위의 코드에서는  `text-xl`과  ` text-white sm:text-2xl`,  그리고 ` md:text-3xl`가 해당된다. 여기서 원하는 부분을 수정한다
4. 끝


만일 이러한 프랙티스가 아닌 공홈에서 제공하는 베스트 프랙티스만을 적용하고 싶다면 아래와 같은 상황에 적합한 것으로 보인다

1. 개발을 빠르게 하고 싶을때
2. 한번 개발해놓고 나면 마크업 구조나 디자인을 수정할 일이 거의 없을때

#### Q. 스타일드 컴포넌트(styled-components)란 무엇인가?

스타일드 컴포넌트는 css-in-js 패턴의 일종이다. 말 그대로 스타일이 적용된 컴포넌트를 생성한다\
\
함수 컴포넌트 내부에서 스타일 객체의 메소드를 호출하여 새로운 스타일이 적용된 컴포넌트를 반환한다\
아래 예는 스타일 객체에서 a메소드를 호출하여 새로운 스타일이 적용된 앵커 태그를 생성한다

```javascript
const AnchorTag = styled.a`
    color : red
` ;
```

이렇게 리턴된 컴포넌트는 일반적인 리액트 컴포넌트처럼 사용할 수 있다\
스타일드 컴포넌트가 주목받는 이유는 두가지 정도가 있다\
\
첫째로 함수 컴포넌트의 리턴부분이 깔끔해진다. html엘리먼트에 어떠한 클래스네임도 기입할 필요가 없기 때문이다\
\
두번째로 함수 컴포넌트의 완전한 고립화가 가능해진다. 외부의 css파일에서 css속성을 임포트하지 않아도 되므로 단일 파일 형태로 관리하기 쉽다. 이에 따라 자연스럽게 재사용성도 높아진다\
\
세번째로 레가시 코드를 새로운 css 프레임워크로 대체할 때 코드를 리팩토링할 필요가 없다. 앞서 말했듯 스타일드 컴포넌트가 적용된 리액트 컴포넌트는 완전한 고립화가 가능하므로 다른 컴포넌트에서 테일윈드 css등의 별개의 프레임워크를 사용한다 하더라도 충돌을 일으키지 않은 채 정상적으로 작동한다\
\
하지만 스타일드 컴포넌트는 css 정의와 리액트 컴포넌트 정의부분이 분리되지 않으므로 다른 컴포넌트에서 css 정의를 재사용하기 어렵다는 단점이 있다

#### Q. 함수 컴포넌트 내부에서 사용하는 `<style jsx>{" "}` 같은 패턴을 뭐라고 부르는가 ?

이것은 `스타일드 jsx(styled-jsx)` 라고 부른다. 버셀(vercel)에서 개발한 스타일드 jsx 라이브러리는 함수 컴포넌트 내부에서 사용하는 `css-in-js` 패턴의 일종이다.\
\
스타일드 jsx에서 선언된 css 규칙은 해당 컴포넌트에만 국소적으로 적용된다.\
\
이는 스타일드 컴포넌트 라이브러와 유사하지만 둘 사이의 차이점이 있다.\
\
스타일드 jsx는 css규칙을 선언한 후에 html엘리먼트에도 클래스이름을 기입해야 하는 번거로움이 있다.\
\
하지만 스타일드 컴포넌트로 정의된 리액트 컴포넌트에는 별도의 클래스네임을 기입할 필요가 없다는 편의성이 있다.\
\
이런 면에서 보면 스타일드 jsx의 진화된 버전이 스타일드 컴포넌트라고 해석할 수도 있지만 꼭 스타일드 컴포넌트가 더 좋다고 볼 수는 없다\
\
왜냐하면 스타일드 컴포넌트는 코드부와 css정의부가 독립되기 않기 때문이다.\
\
코드부와 css정의부가 독립되는게 왜 중요한가?\
\
이들 둘이 분리되어 있는 경우에는 관심사의 분리가 이루어진 것이며 관심사가 분리된 경우에는 코드의 유지보수가 더 수월해진다\
\
css 디피니티브 가이드(css definitive guide)의 공저자인 에스텔 웨일(Estelle Weyl)은 css와 js코드가 분리되어야 한다고 주장했는데 그렇게 해야하는 이유는 레이어를 분리하기 위함이다.\
\
애초에 웹을 구성하는 도구가 html, css, javascript의 3가지로 나뉜것도 레이어를 분리해서 유지보수를 수월하게 하기 위함이었다고 그녀는 말한다.\
\
구체적으로 이야기하면 css는 표현 계층(presentational layer)의 구현체이며 자바스크립트는 행동 계층(Behavioral layer)의 구현체이다.\
\
이들 둘이 분리된건 우연이 아니며 의도적인 것이었다.\
\
그런데 오늘날 `css-in-js`를 통하여 표현 계층과 행동 계층을 합병하려 하고 있으니 이것은 썩 바라짐하지 못하다고 그녀는 이야기하고 있는 것이었다.\
\
그러므로 우리는 외부에서 css를 항상 임포트해서 써야 하는가? 리액트의 관점에서 보면 그것도 썩 바람직하다고는 볼 수 없는 것이다.\
\
왜냐하면 그것은 단일 파일이 하나의 컴포넌트로 완결성을 지니는 고립성(isolation)을 해치기 때문이다.\
\
그런 관점에서 볼 때 스타일드 jsx는 레이어의 분리와 컴포넌트의 고립성을 보장하면서 어느정도는 레이어를 분리시키는 이 두가지 원칙의 절충점이라고 볼 수 있다\
\
비록 스타일드 jsx가 js파일 내부에서 사용된다고는 할지라도 단일 jsx구문은 코드에 산발적으로 흩어져있지 않으며 한곳에 응집되어 있다\
\
따라서 이리저리 css코드를 찾으러 헤메일 필요가 없는 것이다.\
\
이런면에서 볼 때 어느정도는 레이어의 분리가 성립되었다고도 평가할 수 있는 것이다\
\
결론을 말하면 완전한 레이어의 분리를 유지하여 개발하고 싶다면 css 모듈이 적합하고 리액트 컴포넌트를 단일 파일로 고립시킨 상태에서 어느정도의 레이어의 분리를 원한다면 스타일드 jsx가 적합하다


#### Q. CSS Module이란 무엇인가 ?

css 모듈은 특정 컴포넌트에만 국소적으로 스타일을 적용하는 css 테크닉이다\
\
css 모듈은 일반적인 css 임포트 (import) 패턴과 거의 같은 패턴이므로 새롭게 배울 내용은 거의 없다\
\
다만 css 파일명은 `컴포넌트명.module.css`과 같은 포멧으로 작성한다\
\
그리고 css를 적용할 때는 임포트된 css 모듈에 프로퍼티로 정의된 클래스 이름을 사용한다\
\
클래스명이나 아이디 어트리뷰트를 css 식별자로 사용할 수 있지만 아이디 사용은 권장하지 않는다. 아이디는 유니크한 값이므로 적용할 수 있는 엘리먼트가 매우 제한적이기 때문이다\
\
같은 css모듈을 사용하더라도 임포트 할 때마다 고유한 클래스 이름이 생성되어 다른 컴포넌트에서 같은 css 모듈을 사용한다고 해도 클래스명이 겹칠 일은 없다\
\
이것이 특정 컴포넌트에만 국소적으로 스타일을 적용하게 해주는 핵심 원리다\

#### Q. `CSS 모듈`에 안티 패턴이 있는가?

A. 부모 컴포넌트에서 생성된 클래스네임을 자식 컴포넌트로 상속하지 않는 편이 좋다.\
\
CSS 모듈을 임포트하고 나서 해당 모듈에서 제공하는 클래스네임을 자식 컴포넌트에 프롭스로  전달하지 않는 편이 좋다.\
\
만일 css 모듈 파일에서 클래스 이름을 변경했을 때 단일 컴포넌트에서만 사용하는 경우 클래스 네임의 변경은 쉽다. 그저 IDE를 켜고 일괄적으로 이름바꾸기 기능을 사용하면 10초 내외로 끝나는 작업이다.\
\
하지만 불특정 다수의 자식 컴포넌트에서 해당 클래스 이름을 가져다가 사용하는 경우는 자식 컴포넌트가 정의된 모든 파일을 순회하며 클래스 이름을 변경해줘야 하는 번거로움이 발생한다

#### Q. SASS가 무엇인가 ? 

A. Sass는 CSS의 확장 언어이다.\
`Syntactically Awesome Style Sheets`라는 뜻이지만 별 의미는 없다\
\
Sass는 아직 CSS에 존재하지 않는 기능들을 가지고 있는데, 예를 들어 네스팅, 믹스인, 상속등의 기능을 사용할 수 있다
이런 기능을 이용하면 css 표준 문법보다 더욱 프로그래밍 언어스럽게 개발할 수 있다는 장점이 있다. 즉 값을 재활용 하거나 코드를 더욱 구조화할 수 있다\
\
일단 Sass가 설치되면 Sass 명령어로 Sass파일을 CSS로 컴파일할 수 있다\
예를 들어, 터미널에서 `sass input.scss output.css`를 실행하면 `input.scss` 파일을 `output.css`로 컴파일한다\
\
또한 `--watch` 플래그를 사용하여 개별 파일 또는 디렉터리를 감시할 수 있다. 워치 플래그는 scss 파일의 변경을 감시하고 파일이 새로 저장될 때 마다 scss 파일을자동으로 컴파일하도록 지시한다. input.scss 파일을 수동으로 빌드하는 번거로움을 줄일 수 있다\
\
공식 홈페이지는 https://sass-lang.com/ 이다

# SASS부분은 작성중입니다
