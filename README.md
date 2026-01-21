# BIGS - 프론트엔드 개발자 포지션 사전 과제

## 기술 스택
`Next.js(App Router)`, `TypeScript`, `Tailwind CSS`, `Zustand`, `TanStack Query`, `React Hook Form`, `Zod`, `Axios`

## 기술스택 선택 이유

### Zustand
- 사용자 인증을 로컬 스토리지 기반으로 관리하는데, `persist` 미들웨어를 사용하면 `localStorage.getItem/setItem` 로직 없이도 상태와 스토리지를 동기화할 수 있기 때문에 선택했습니다.
- 설정이 간단하고 보일러플레이트 코드가 적어, 가장 많이 사용해본 라이브러리이기 때문에 선택했습니다.

  
### Tanstack Query
- React의 상태만으로는 설계하기 어려운 서버 상태를 관리하기 위해 사용했습니다.
- `onSuccess`, `onError` 콜백을 통해 토스트 알림과 같은 사이드 이펙트를 처리라기 위해 선택했습니다.
- 데이터 요청 과정에서 발생하는 로딩, 에러 상태에 따라 UI를 분기처리하기 위해 사용했습니다.

### React Hook Form
- 입력 필드마다 반복되는 `useState`, `onChange` 로직을 줄이기 위해 사용했습니다.
- Zod를 통해 복잡한 유효성 검사를 간편하게 처리하기 위해 사용했습니다.

### Axios
 - 인증이 필요한 요청마다 토큰을 주입하지 않고, **요청 인터셉터를 통해 헤더에 자동으로 추가**하기 위해 사용했습니다.
 - 응답 인터셉터를 활용해 엑세스 토큰 재발급 로직을 간단하게 구현하고자 사용했습니다.


## 프로젝트 구조

```
bigs/
├── app/                          # Next.js App Router
│   ├── api/                     # API 라우트 핸들러
│   │   ├── mutation.ts          # Mutation 로직
│   │   └── query.ts             # Query 로직
│   ├── auth/                     # 인증
│   │   ├── login/               # 로그인
│   │   └── signup/              # 회원가입
│   ├── boards/                   # 게시판
│   │   ├── [id]/                # 게시글 상세
│   │   │    └── edit/           # 게시글 수정
│   │   └── create/              # 게시글 작성
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 홈
│
├── src/
│   ├── apis/                     # API 클라이언트
│   │   ├── api.ts               # Axios 인스턴스 설정
│   │   ├── auth.ts              # 인증 API
│   │   └── board.ts             # 게시판 API
│   │
│   ├── components/               # React 컴포넌트
│   │   ├── auth-guard.tsx       # 인증 가드
│   │   ├── board/               # 게시판 컴포넌트 관련
│   │   ├── form/                # 폼 컴포넌트
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── skeleton/            # 스켈레톤 UI
│   │   └── ui/                  # UI 컴포넌트
│   │
│   ├── hooks/                    # Custom Hooks
│   │   └── use-file-upload.ts  # 파일 업로드 훅
│   │
│   ├── lib/                      # 유틸리티 함수
│   │   ├── cn.ts                # 클래스명 병합
│   │   ├── formatter.ts         # 데이터 포맷팅
│   │   ├── get-user.ts          # 사용자 정보 조회
│   │   ├── parse-server-error.ts # 서버 필드 에러 파싱
│   │   └── query-provider.tsx   # React Query Provider
│   │
│   ├── schemas/                  # Zod 스키마
│   │   ├── auth.ts              # 인증 스키마
│   │   ├── board.ts             # 게시판 스키마
│   │   ├── error.ts             # 에러 스키마
│   │   └── schema.ts            # 공통 스키마
│   │
│   ├── stores/                   # Zustand 스토어
│   │   ├── auth-store.ts        # 인증 상태
│   │   └── toast-store.ts       # 토스트 상태
│   │
│   └── types/                    # TypeScript 타입 정의
│       ├── auth.ts              # 인증 타입
│       └── board.ts             # 게시판 타입
│
├── public/                       # 정적 파일
├── package.json                  # 프로젝트 의존성
├── tsconfig.json                 # TypeScript 설정
├── next.config.ts                # Next.js 설정
├── tailwind.config.js            # Tailwind CSS 설정
└── eslint.config.mjs             # ESLint 설정
```

## 실행하기

### 필수 요구사항

- Node.js 20 이상
- **pnpm 8 이상**

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# API 엔드포인트
NEXT_PUBLIC_API_URL = "https://front-mission.bigs.or.kr"
```


