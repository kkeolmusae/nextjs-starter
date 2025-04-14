# NestJs Study Notes
공부 내용 정리

## 메모 및 정리
- Next.js는 파일 기반 라우팅 시스템이다.
- Application 의 라우팅을 처리하는 방식이 `App Router` 와 `Pages Router` 두가지가 있는데, `App Router`를 Next.js 13부터 도입(+권장)하고 있다.
- 폴더 기반 라우팅을 사용하며, 각 폴더가 URL 경로와 매핑된다.


### App Router 와 Pages Router 간단 비교

| 항목                       | Pages Router                          | App Router                              |
|----------------------------|---------------------------------------|----------------------------------------|
| **폴더 위치**              | `pages/`                              | `app/`                                 |
| **라우팅 방식**            | 파일 기반                             | 폴더 기반                              |
| **React Server Components**| 미지원                                | 기본 지원                              |
| **데이터 페칭 방식**        | `getServerSideProps`, etc.            | 서버 컴포넌트 내 직접 `fetch` 호출     |
| **레이아웃 재사용**         | `_app.js`에서 구현                   | 기본 지원 (`layout.js`)                |
| **로딩/에러 핸들링**        | 별도 구현 필요                        | 기본 지원 (`loading.js`, `error.js`)  |
| **CSS 스타일링 옵션**       | CSS Module, 전역 CSS                 | CSS Module, 통합 스타일링 옵션(`@next/font`) |

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

3. loading.tsx
- 로딩 상태를 처리

4. error.tsx
- 에러 상태를 처리

5. not-found.tsx
- 404 페이지를 처리

## 주의사항
1. nodejs version: Node.js 18.18 or later.
```shell
# lts nodejs 사용
nvm install --lts
```

2. Debug Attach Disable
Debug Attach 가 켜져있으면 에러 발생
(FYI, https://github.com/microsoft/vscode-js-debug/issues/374#issuecomment-622239998)


