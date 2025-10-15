# 🎵 뮤직카우 시장 분석 대시보드

실시간 음악 저작권 거래 데이터를 분석하고 투자 기회를 발견하는 Next.js 기반 대시보드

## 📋 프로젝트 개요

Streamlit 기반 뮤직카우 시장 분석 도구를 Next.js 14 (App Router) + TypeScript로 마이그레이션한 프로젝트입니다.

### 주요 기능

- ⚡ **실시간 데이터**: 5분 간격 자동 업데이트
- 📊 **9개 분석 도구**: 즉시 체결, 가격 모멘텀, 고수익률, 저평가, 고유동성, 가치 투자, 카테고리 분석, 시간 패턴, 전체 데이터
- 🎯 **투자 시그널**: 저평가, 고평가, 유동성 기반 시그널 생성
- 📈 **지표 계산**: 스프레드율, 예상 수익률, 유동성 점수, 가격 모멘텀
- 🔍 **필터링 & 검색**: 다양한 조건으로 주문 필터링
- 📱 **반응형 디자인**: 모바일/데스크톱 최적화

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정 (선택사항)

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Charts**: Recharts 2
- **State Management**: TanStack Query v5
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend (API Routes)
- **Runtime**: Node.js (Next.js API Routes)
- **HTTP Client**: Axios
- **Data Validation**: Zod
- **Cache Strategy**: TanStack Query (5분 간격)

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── (dashboard)/              # 대시보드 라우트 그룹
│   │   ├── layout.tsx            # 대시보드 레이아웃
│   │   ├── page.tsx              # 메인 대시보드
│   │   ├── instant/              # 즉시 체결 페이지
│   │   ├── momentum/             # 가격 모멘텀 페이지
│   │   ├── yield/                # 고수익률 페이지
│   │   ├── undervalued/          # 저평가 페이지
│   │   ├── liquidity/            # 고유동성 페이지
│   │   ├── value/                # 가치 투자 페이지
│   │   ├── category/             # 카테고리 분석 페이지
│   │   ├── time-pattern/         # 시간 패턴 페이지
│   │   └── all-data/             # 전체 데이터 페이지
│   ├── api/
│   │   ├── orders/route.ts       # GET /api/orders
│   │   ├── summary/route.ts      # GET /api/summary
│   │   └── momentum/route.ts     # GET /api/momentum
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 홈페이지
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── dashboard/                # 대시보드 컴포넌트
│   ├── charts/                   # 차트 컴포넌트
│   ├── filters/                  # 필터 컴포넌트
│   └── tables/                   # 테이블 컴포넌트
├── lib/
│   ├── metrics/
│   │   └── calculator.ts         # MetricsCalculator 클래스
│   ├── utils/
│   │   └── format.ts             # 포맷팅 유틸리티
│   └── constants.ts              # 상수 정의
├── types/
│   ├── order.ts                  # 주문 타입
│   ├── metrics.ts                # 지표 타입
│   └── api.ts                    # API 타입
├── hooks/
│   ├── useOrders.ts              # 주문 데이터 훅
│   ├── useSummary.ts             # 요약 통계 훅
│   ├── useMomentum.ts            # 모멘텀 데이터 훅
│   └── useFilters.ts             # 필터 상태 훅
└── providers/
    └── QueryProvider.tsx         # TanStack Query Provider
```

## 📊 API 엔드포인트

### GET /api/orders
뮤직카우 API에서 주문 데이터를 가져와 지표 계산 후 반환

**Response**:
```typescript
{
  success: true,
  data: OrderWithMetrics[],
  timestamp: string
}
```

### GET /api/summary
주문 데이터의 요약 통계

**Response**:
```typescript
{
  success: true,
  data: {
    total_orders: number,
    buy_orders: number,
    sell_orders: number,
    avg_spread_rate: number,
    avg_expected_yield: number,
    avg_liquidity_score: number,
    instant_match_count: number,
    high_yield_count: number,
    undervalued_count: number
  },
  timestamp: string
}
```

### GET /api/momentum
가격 모멘텀 분석 데이터

**Response**:
```typescript
{
  success: true,
  data: MomentumData[],
  timestamp: string
}
```

## 🧮 지표 계산 로직

### 1. 스프레드율 (Spread Rate)
```typescript
spread_rate = (order_price - recent_price) / recent_price * 100
```

### 2. 예상 수익률 (Expected Yield)
```typescript
expected_yield = (royalty_rate * base_price) / order_price * 100
```

### 3. 유동성 점수 (Liquidity Score)
```typescript
liquidity_score = spread_score * 0.4 + depth_score * 0.3 + frequency_score * 0.3
```

### 4. 시그널 생성 (Signal Generation)
- **저평가**: spread_rate < -5% && liquidity_score > 40
- **고평가**: spread_rate > 5% && liquidity_score > 40
- **유동성↑**: liquidity_score > 70
- **유동성↓**: liquidity_score < 20
- **주의**: 비정상적인 가격 (|spread_rate| > 20%)
- **보통**: 그 외

## 🎨 사용된 shadcn/ui 컴포넌트

- Button
- Card (Header, Title, Description, Content, Footer)
- Tabs (List, Trigger, Content)
- Input
- Badge
- Skeleton
- Table (Header, Body, Row, Head, Cell)

## 📈 성능 최적화

- **API 캐싱**: TanStack Query로 5분 간격 캐싱
- **코드 스플리팅**: Next.js 자동 코드 스플리팅
- **이미지 최적화**: next/image 사용
- **레이아웃 시프트 방지**: Skeleton 로딩 UI

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# ESLint 실행
npm run lint
```

## 📝 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `NEXT_PUBLIC_BASE_URL` | API 베이스 URL | `http://localhost:3000` |

## 🚀 배포

### Vercel (권장)

1. GitHub 레포지토리 연결
2. Vercel에서 자동 배포
3. 환경 변수 설정

```bash
vercel --prod
```

### Docker

```bash
# Docker 이미지 빌드
docker build -t musicow-dashboard .

# 컨테이너 실행
docker run -p 3000:3000 musicow-dashboard
```

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 라이선스

MIT License

## 👥 기여

기여는 언제나 환영합니다! Pull Request를 보내주세요.

---

**작성일**: 2025-10-15
**버전**: 1.0.0
