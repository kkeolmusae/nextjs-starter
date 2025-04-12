# nestjs-starter
nextjs 공부용

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 주의사항
1. nodejs version: Node.js 18.18 or later.
```shell
# lts nodejs 사용
nvm install --lts
```

2. Debug Attach Disable
Debug Attach 가 켜져있으면 에러 발생
(FYI, https://github.com/microsoft/vscode-js-debug/issues/374#issuecomment-622239998)

--- 
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 메모 및 정리
- Next.js는 파일 기반 라우팅 시스템이다.
- Application 의 라우팅을 처리하는 방식이 `App Router` 와 `Pages Router` 두가지가 있는데, `App Router`를 Next.js 13부터 도입(+권장)되었하고 있다.

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

### 디렉토리 구조
app:	App Router
pages:	Pages Router
public:	Static assets to be served
src: application source folder (Optional)

1. layout.tsx
- 여러 페이지에서 공유되는 UI 구조를 정의한다. 
- 예를 들어, 헤더, 푸터, 네비게이션 바와 같은 공통 요소를 포함할 수 있다.
- `app/layout.tsx`은 애플리케이션 전체에 적용되는 루트 레이아웃이라 `/dashboard`와 `/dashboard/settings` 각각에 레이아웃을 정의하면 상위 레이아웃과 하위 레이아웃이 함께 렌더링된다.

2. page.tsx 
- 특정 경로에 대한 UI를 정의하며, 라우트의 끝점(leaf node)으로 작동한다.
- `app/page.tsx`: 루트 경로(`/`)의 페이지를 정의
- `app/dashboard/page.tsx`: `/dashboard` 경로의 페이지를 정의