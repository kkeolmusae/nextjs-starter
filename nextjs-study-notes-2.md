
# Next.js Study Notes

Next.js 공부하며 정리한 내용

---

## 개념 정리

- **React**: UI 구축을 위한 **라이브러리**
- **Next.js**: React 기반의 **프레임워크**로, 라우팅, SSR, SSG, API Routes 등 다양한 기능을 제공

---

## 라우팅 시스템

- **파일 기반 라우팅** 사용
- `App Router`와 `Pages Router`가 있음
  - Next.js 13부터 `App Router` 도입 → **권장 방식**
- 폴더 구조가 URL 경로와 매핑됨
- `app/` 폴더는 App Router의 **Root Segment**이며, 라우트 계층 구조의 시작점
- 라우팅을 위해 **규칙적인 파일명** 사용 필요 (`page.tsx`, `layout.tsx` 등)

### 구조 예시

```
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── api/
│   └── hello/
│       └── route.ts
```

---

## 렌더링 방식

### CSR (Client Side Rendering)

- React 기본 렌더링 방식
- 브라우저에서 모든 렌더링을 수행
- `create-react-app` → CSR 기반

### SSR (Server Side Rendering)

- Next.js의 기본 방식
- 서버에서 React 컴포넌트를 HTML로 렌더링한 뒤 클라이언트로 전송
- 클라이언트에서는 **Hydration**을 통해 interactive하게 됨

---

## Hydration

- 서버에서 렌더링된 HTML을 클라이언트에서 React App으로 **초기화**하는 과정
- `use client`가 있는 컴포넌트만 hydration 됨 (event listener가 추가됨)

#### 전체 흐름
1. 서버가 HTML 제공
2. 클라이언트에서 React 앱 초기화
3. interactivity 부여됨

---

## 디렉토리 및 특수 파일

- `public/`: 정적 파일을 서빙하는 공간

### 특수 파일 설명

| 파일명           | 역할 설명                                      |
|------------------|-----------------------------------------------|
| `layout.tsx`     | 공통 UI 레이아웃 정의 (헤더, 푸터 등)          |
| `page.tsx`       | 해당 경로의 페이지 UI 정의                     |
| `loading.tsx`    | 페이지 로딩 상태 처리                          |
| `error.tsx`      | 에러 발생 시 렌더링되는 컴포넌트              |
| `not-found.tsx`  | 404 에러 페이지 처리                          |

---

## Client Component vs Server Component

- 기본적으로 모든 컴포넌트는 **Server Component**
- `use client`를 명시하면 **Client Component**가 되며, hydration 대상이 됨
- 클라이언트에서만 사용 가능한 hook (`useState`, `useEffect`)이 있을 경우 필수

---

## Route Groups

- 폴더명을 `()`로 감싸면 URL 경로에 영향을 주지 않음
- 여러 레이아웃 적용 또는 레이아웃 분리 가능

> 예: `(admin)/dashboard/page.tsx` → URL에는 `/dashboard`만 반영됨

---

## Metadata

- `<head>`에 들어갈 내용을 설정
- `page.tsx`, `layout.tsx`에서만 가능
- 정적 or 동적(`generateMetadata`) 가능
- 서버 컴포넌트에서만 가능

---

## Dynamic Routes

- `[id]` 형태의 폴더를 만들면 `/movies/1`, `/movies/2` 등의 경로 지원
- Next.js 15부터는 `params`, `searchParams`가 **Promise**로 반환됨 → `await` 필요

```tsx
export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  return <h1>Movie {id}</h1>;
}
```

---

## Data Fetch

### 클라이언트 컴포넌트에서 fetch

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const res = await fetch("https://.../movies");
    const json = await res.json();
    setMovies(json);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>{isLoading ? "Loading..." : JSON.stringify(movies)}</div>;
}
```

### 서버 컴포넌트에서 fetch

```tsx
export default async function HomePage() {
  const res = await fetch("https://.../movies");
  const movies = await res.json();
  return <div>{JSON.stringify(movies)}</div>;
}
```

---

## Suspense

- `<Suspense>`를 활용해 비동기 컴포넌트를 lazy load 가능
- 병렬 fetching이 필요할 때 유용
- 먼저 로딩된 컴포넌트부터 화면에 표시해 UI 속도 향상 가능

---

## CSS

### Global CSS

- 전체 앱에 적용됨
- `global.css` 파일로 작성

### Module CSS

- 파일명: `*.module.css`
- 클래스 충돌 방지
- 사용 예시:

```css
.nav {
  background-color: red;
}
```

```tsx
import styles from "./Nav.module.css";
<nav className={styles.nav}></nav>;
```

---

## 기타 주의사항

### Node.js 버전

- Node.js 18.18 이상 권장

```bash
nvm install --lts
```

### Debug Attach 비활성화

- VSCode에서 Debug Attach 설정이 켜져 있으면 에러 발생 가능
- 관련 이슈: [GitHub Issue](https://github.com/microsoft/vscode-js-debug/issues/374#issuecomment-622239998)
