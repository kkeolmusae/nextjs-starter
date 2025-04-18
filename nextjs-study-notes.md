# NextJs Study Notes
공부 내용 정리

## 메모 및 정리
- React = 라이브러리 / NextJs = 프레임워크
- Next.js는 파일 기반 라우팅 시스템이다.
- Application 의 라우팅을 처리하는 방식이 `App Router` 와 `Pages Router` 두가지가 있는데, `App Router`를 Next.js 13부터 도입(+권장)하고 있다.
- 폴더 기반 라우팅을 사용하며, 각 폴더가 URL 경로와 매핑된다. (page.tsx )
- `app/` 을 `Root Segment`라고 한다. (App Router에서 라우트 계층 구조의 시작점)
- Nextjs에서 정해둔 규칙이 있기 때문에 정해진 파일명을 사용해야한다. (`page.tsx`, `layout.tsx`, `/app` 등)
- CSR
  - 평범한 React 가 렌더링 되는 방식은 CSR(Client Side Rendering) => 브라우저가 Rendering 작업을 함
  - create-react-app 을 사용해서 react 만으로 application을 만드는건 Client Side Rendering
  - React 는 사용자 브라우저인 Client 단에서 모든 렌더링을 수행해야함. (Client 가 사용자 브라우저에 UI를 구축해야 하는 것)
- SSR
  - Nextjs로 웹사이트를 빌드할 때는 기본적으로 SSR(Server Side Rendering)
  - Nextjs application 의 모든 page 안의 component들은 우선 server에서 rendering함

### **구조 예시**
```
app/
├── layout.tsx        # 루트 레이아웃 (필수, 공통 레이아웃을 정의하며, 하위 페이지에서도 공유됨)
├── page.tsx          # 루트 페이지 (특정 경로의 콘텐츠를 정의)
├── about/            # /about 경로
│   └── page.tsx      # About 페이지
├── blog/             # /blog 경로
│   ├── page.tsx      # Blog 메인 페이지
│   └── [slug]/       # 동적 라우트 (/blog/:slug)
│       └── page.tsx  # 특정 블로그 포스트
├── api/              # API 라우트
│   └── hello/
│       └── route.ts  # API 핸들러
```

### 용어 정리
- Babel: 자바스크립트 Transpiler로 최신 js 문법(ES6+)을 구형 브라우저에서도 동작할 수 있도록 구버전 문법으로 바꿔줌
- Rendering: Nextjs가 우리의 React component(js, ts) 를 가져와서 HTML 이 읽을 수 있는 형태로 변환해 주는 것 

### 디렉토리 구조
public:	서빙할 정적 파일

### 특수 파일

1. layout.tsx
- 여러 페이지에서 공유되는 UI 구조를 정의한다. 
- 예를 들어, 헤더, 푸터, 네비게이션 바와 같은 공통 요소를 포함할 수 있다.
- `app/layout.tsx`은 애플리케이션 전체에 적용되는 루트 레이아웃이라 `/dashboard`와 `/dashboard/settings` 각각에 레이아웃을 정의하면 상위 레이아웃과 하위 레이아웃이 함께 렌더링된다.

2. page.tsx 
- 특정 경로에 대한 UI를 정의하며, 라우트의 끝점(leaf node)으로 작동한다.
- `app/page.tsx`: 루트 경로(`/`)의 페이지를 정의
- `app/dashboard/page.tsx`: `/dashboard` 경로의 페이지를 정의
- 아무거나 export 못하고 허용된 것만 export 가능함.

3. loading.tsx
- 로딩 상태를 처리

4. error.tsx
- 에러 상태를 처리

5. not-found.tsx
- 404 페이지를 처리

### Client Component, Server Component
- `use client`
  - `use client`를 써도 컴포넌트는 실제로 서버에서 rendering 된다.
  - 모든 컴포넌트와 페이지들은 먼저 backend에서 rendering 된다.
  - `use client`가 있어야 nextjs에서 이 컴포넌트는 client에서 interactive 해야한다는 것을 인식하고 hydrate 함
  - backend에서 render되고 frontend 에서 hydrate 됨을 의미

### Hydration
- 단순 HTML 을 React Application 으로 초기화하는 작업
- 모든 Comonpoent 에 대해서 hydration이 발생하는 것은 아님 (예외가 있음)
- 
  - 순서
    - 1. 특정 path 로 접근하면
    - 2. next js 는 그 요청을 보고 component 를 Dummy HTML 로 변환해서 사용자한테 전달
    - 3. 사용자가 페이지에 도착하면 nextjs 는 load를 시작 (html에 react application 초기화)
    - 4. react 가 app 을 넘겨 받음으로서 anchor(a태그)가 Link 로 변환됨
    - 5. `use client` 가 적힌 컴포넌트가 hydrate 됨 (eventListner를 추가하고 interactive 하게 바뀜)


### layout.tsx
- 화면이 렌더링될때 
  - next js는 우선 layout component로 가서 export된 default component 를 렌더링함
  - 그 다음에 URL을 확인해서 어떤 컴포넌트를 렌더링 해야하는지 인식하고 렌더링함
  - layout.tsx에서 Layout 컴포넌트의 매개변수(children)은 Layout 내부에 표현될 컴포넌트임
- 상위 폴더에 layout.tsx가 있으면 하위 폴더의 컴포넌트에 동일하게 적용한다.

### Route Groups
- Route Groups는 routes들을 그룹화해서 logical groups으로 만들 수 있는 기능이 있다.
- 루트 레이아웃을 사용하지 않고 여러 레이아웃을 사용하게 할 수도 있다. (레이아웃 선택 및 해제도 가능)
- Route Groups 는 폴더이름을 소괄호`()`를 사용해서 묶어줘야한다.
- 폴더 이름을 괄호로 생성한 경우 URL 에 전현 영향을 미치지 않는다.

### Metadata
- Page 의 head 부분에 표시된다.
- Metadata은 병합될 수 있다.
- Page.tsx 랑 Layout.tsx만 메타데이터를 내보낼 수 있다.
- 서버 컴포넌트에서만 있을 수 있다.
- 템플릿도 만들 수 있다.

### Dynamic Routes
- movies 라는 폴더에 [id] 와 같이 대괄호`[]`로 폴더명을 만들어주면 /movies/1, /movies/123 와 같이 이동할때 동작한다.
- Nextjs 15버전부터는 params, searchParams 는 promise 이다. (https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

### Date Fetch
```js
// react fetch => client에서 fetch함, useState/Effect 때문에 "use client" 사용(클라이언트 컴포넌트) -> metadata 설정 불가
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const getMovies = async () => {
    const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
    const json = await response.json();
    setMovies(json);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      {isLoading ? "Loading..." : JSON.stringify(movies)}
    </div>
  );
}
```

```js
// nextjs 서버 컴포넌트에서의 fetch => 간단하고 Metadata 설정 가능
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(movies)}
    </div>
  );
}
```

### loading.tsx
- loading 페이지는 `loading.tsx` 에 만들면 자동으로 쓰인다?
- backend 에서 streaming 하기 떄문에 가능하다?

### error.tsx
- error 발생했때 error.tsx 가 있으면 이 컴포넌트를 보여준다.

### suspense 
- 데이터를 fetch하기 위해 <Suspense> 안의 컴포넌트를 await 한다.
- Promise.all로 여러 api를 병렬로 가져오려고 하게되면 둘다 성공할때까지 같이 기다리는데
- api 호출을 각각의 component 로 나눈 다음에 Suspense 를 사용해서 각 컴포넌트를 호출하면 먼저 데이터를 가져오는건 먼저 화면에보여준다. (성능 최적화)
  
### Generate Metadata
- 동적일 수 있는 metadata를 불러오기 위해 자동으로 호출한다.
- 프레임워크가 이함수를 찾을 수 있어야 하기 떄문에 `export` 명시 필요
- `generateMetadata` 로 만들면 됨
- page component가 params의 url id 를 props로 받는 것 처럼 generateMetadata 도 동일하게 받는다. (/app/(movies)/movies/[id]/page.tsx)
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function

## Css
### global css 
- `global.css` 로 만들면 됨
- 일반적인 것 (전체에 적용되는 것)은 모두 여기에 작성하자

### module css
- `*.module.css` 로 만들면 됨
- `*.module.css` 를 js 파일인 것 처럼 import 하고, css 를 적용해줄때 `<nav className ={style.nav}>` 이렇게 호출한다
- 이렇게 호출하는게 이상해보일수는 있는데 이렇게 하면 class name 충돌이 없다는 장점이 있다.
```css
/* css를 js 처럼 사용하고 .nav는 class name 이다. */
.nav { 
  background-color: red;
  padding: 50px 100px;
}
```

## 주의사항
1. nodejs version: Node.js 18.18 or later.
```shell
# lts nodejs 사용
nvm install --lts
```

2. Debug Attach Disable
Debug Attach 가 켜져있으면 에러 발생
(FYI, https://github.com/microsoft/vscode-js-debug/issues/374#issuecomment-622239998)


