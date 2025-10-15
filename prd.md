# Next.js 마이그레이션 계획

## 📋 프로젝트 개요

**현재 상태**: Streamlit 기반 뮤직카우 시장 분석 대시보드
**목표**: Next.js 14 (App Router) + TypeScript 기반 웹 애플리케이션으로 마이그레이션

---

## 🎯 마이그레이션 목표

### 기술적 목표
- ✅ **성능 향상**: SSR/SSG를 통한 초기 로딩 속도 개선
- ✅ **사용자 경험**: 반응형 디자인, 더 빠른 인터랙션
- ✅ **확장성**: 모듈화된 컴포넌트 구조로 유지보수성 향상
- ✅ **SEO 최적화**: 검색 엔진 최적화 및 소셜 미디어 공유 개선
- ✅ **API 구조**: RESTful API 엔드포인트로 백엔드 분리

### 비즈니스 목표
- 📊 실시간 데이터 업데이트 (5분 → 실시간)
- 📱 모바일 반응형 지원 강화
- 🔐 사용자 인증 시스템 추가 (선택사항)
- 📈 사용자 분석 및 트래킹 개선

---

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts 또는 Chart.js
- **State Management**: React Context + SWR/TanStack Query
- **Form Handling**: React Hook Form + Zod

### Backend (Next.js API Routes)
- **Runtime**: Node.js (Next.js API Routes)
- **API Client**: Axios
- **Data Validation**: Zod
- **Cache**: Redis (선택사항, SWR로 대체 가능)

### DevOps
- **Hosting**: Vercel (권장) 또는 AWS/GCP
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics + Sentry

---

## 📁 프로젝트 구조

```
nextjs-musicow/
├── app/
│   ├── (dashboard)/           # 대시보드 그룹
│   │   ├── layout.tsx         # 대시보드 레이아웃
│   │   ├── page.tsx           # 메인 대시보드
│   │   ├── instant/           # 즉시 체결
│   │   │   └── page.tsx
│   │   ├── momentum/          # 가격 모멘텀
│   │   │   └── page.tsx
│   │   ├── yield/             # 고수익률
│   │   │   └── page.tsx
│   │   ├── undervalued/       # 저평가
│   │   │   └── page.tsx
│   │   ├── liquidity/         # 고유동성
│   │   │   └── page.tsx
│   │   ├── value/             # 가치 투자
│   │   │   └── page.tsx
│   │   ├── category/          # 카테고리 분석
│   │   │   └── page.tsx
│   │   └── time-pattern/      # 시간 패턴
│   │       └── page.tsx
│   ├── api/
│   │   ├── orders/
│   │   │   ├── route.ts       # GET /api/orders - 주문 데이터
│   │   │   └── metrics/
│   │   │       └── route.ts   # GET /api/orders/metrics - 지표 계산
│   │   ├── momentum/
│   │   │   └── route.ts       # GET /api/momentum - 모멘텀 분석
│   │   └── summary/
│   │       └── route.ts       # GET /api/summary - 요약 통계
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 홈페이지
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── charts/
│   │   ├── SignalDistribution.tsx
│   │   ├── SpreadDistribution.tsx
│   │   ├── MomentumChart.tsx
│   │   └── TimePatternChart.tsx
│   ├── filters/
│   │   ├── OrderTypeFilter.tsx
│   │   ├── SignalFilter.tsx
│   │   └── SpreadRangeFilter.tsx
│   ├── tables/
│   │   ├── OrdersTable.tsx
│   │   ├── TopYieldTable.tsx
│   │   └── ValueOpportunitiesTable.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts          # API 클라이언트 설정
│   │   ├── orders.ts          # 주문 API 함수
│   │   └── metrics.ts         # 지표 API 함수
│   ├── metrics/
│   │   ├── calculator.ts      # 지표 계산 로직 (Python → TypeScript)
│   │   └── types.ts           # 타입 정의
│   ├── utils/
│   │   ├── format.ts          # 데이터 포맷팅
│   │   └── validation.ts      # 유효성 검사
│   └── constants.ts           # 상수 정의
├── types/
│   ├── order.ts               # 주문 타입
│   ├── metrics.ts             # 지표 타입
│   └── api.ts                 # API 응답 타입
├── hooks/
│   ├── useOrders.ts           # 주문 데이터 훅
│   ├── useMetrics.ts          # 지표 데이터 훅
│   └── useFilters.ts          # 필터 상태 훅
└── public/
    └── ...
```

---

## 📊 현재 Streamlit 앱 분석

### 주요 기능
1. **데이터 수집**: 뮤직카우 API에서 실시간 주문 데이터 수집
2. **지표 계산**: MetricsEngine을 통한 배치 지표 계산
   - 스프레드율 (Spread Rate)
   - 예상 수익률 (Expected Yield)
   - 유동성 점수 (Liquidity Score)
   - 가격 모멘텀 (Price Momentum)
3. **필터링**: 주문 타입, 시그널, 스프레드율 범위, 대량 주문
4. **시각화**: 9개 탭으로 구성된 대시보드
   - 즉시 체결 (Instant Match)
   - 가격 모멘텀 (Price Momentum)
   - 고수익률 Top 10
   - 저평가 Top 10
   - 고유동성 Top 10
   - 가치 투자 기회
   - 카테고리 분석
   - 시간 패턴
   - 전체 데이터

### 데이터 흐름
```
뮤직카우 API → Streamlit Cache → MetricsEngine → DataFrame → 시각화
```

---

## 🔄 마이그레이션 단계별 계획

### Phase 1: 프로젝트 설정 및 기본 구조 (1-2주)

#### 1.1 프로젝트 초기화
```bash
npx create-next-app@latest musicow-nextjs --typescript --tailwind --app
cd musicow-nextjs
```

#### 1.2 필수 패키지 설치
```bash
# UI 라이브러리
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card tabs select slider input

# 차트 라이브러리
npm install recharts

# 데이터 페칭 및 상태 관리
npm install @tanstack/react-query axios

# 유틸리티
npm install date-fns zod react-hook-form @hookform/resolvers

# 개발 도구
npm install -D @types/node
```

#### 1.3 TypeScript 타입 정의
```typescript
// types/order.ts
export interface Order {
  order_id: string;
  order_date: string;
  song_name: string;
  song_artist: string;
  song_category: string;
  order_type: '구매' | '판매';
  order_status: '대기' | '체결' | '취소';
  order_price: number;
  recent_price: number;
  order_royalty_rate: number;
  // ... 기타 필드
}

// types/metrics.ts
export interface Metrics {
  spread_rate: number;
  expected_yield: number;
  liquidity_score: number;
  signal: string;
}

export interface OrderWithMetrics extends Order, Metrics {}
```

---

### Phase 2: API 계층 구축 (2-3주)

#### 2.1 Python 로직을 TypeScript로 변환

**우선순위 1: 지표 계산 엔진 (MetricsEngine)**
```typescript
// lib/metrics/calculator.ts

export class MetricsCalculator {
  /**
   * 스프레드율 계산
   * Python: (order_price - recent_price) / recent_price * 100
   */
  calculateSpreadRate(orderPrice: number, recentPrice: number): number {
    if (!recentPrice || recentPrice === 0) return 0;
    return ((orderPrice - recentPrice) / recentPrice) * 100;
  }

  /**
   * 예상 수익률 계산
   * Python: (royalty_rate * base_price) / order_price * 100
   */
  calculateExpectedYield(
    royaltyRate: number,
    basePrice: number,
    orderPrice: number
  ): number {
    if (!orderPrice || orderPrice === 0) return 0;
    return ((royaltyRate * basePrice) / orderPrice) * 100;
  }

  /**
   * 유동성 점수 계산
   * Python: spread_score * 0.4 + depth_score * 0.3 + frequency_score * 0.3
   */
  calculateLiquidityScore(order: Order, allOrders: Order[]): number {
    // 구현...
  }

  /**
   * 가격 모멘텀 계산
   */
  calculatePriceMomentum(orders: Order[], songName: string): MomentumData {
    // 구현...
  }

  /**
   * 배치 지표 계산 (전체 주문에 대해)
   */
  calculateBatchMetrics(orders: Order[]): OrderWithMetrics[] {
    return orders.map(order => ({
      ...order,
      spread_rate: this.calculateSpreadRate(order.order_price, order.recent_price),
      expected_yield: this.calculateExpectedYield(
        order.order_royalty_rate,
        order.order_base_price,
        order.order_price
      ),
      liquidity_score: this.calculateLiquidityScore(order, orders),
      signal: this.generateSignal(order, orders),
    }));
  }
}
```

#### 2.2 Next.js API Routes 구현

**GET /api/orders/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { MetricsCalculator } from '@/lib/metrics/calculator';

const MUSICOW_API_URL = 'https://data.musicow.com/files/v1/market/orders.json';

export async function GET(request: NextRequest) {
  try {
    // 뮤직카우 API에서 데이터 가져오기
    const response = await axios.get(MUSICOW_API_URL, { timeout: 30000 });
    const rawOrders = response.data;

    // 지표 계산
    const calculator = new MetricsCalculator();
    const ordersWithMetrics = calculator.calculateBatchMetrics(rawOrders);

    return NextResponse.json({
      success: true,
      data: ordersWithMetrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
```

**GET /api/summary/route.ts**
```typescript
export async function GET(request: NextRequest) {
  const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
  const { data: orders } = await ordersResponse.json();

  const summary = {
    total_orders: orders.length,
    buy_orders: orders.filter((o: Order) => o.order_type === '구매').length,
    sell_orders: orders.filter((o: Order) => o.order_type === '판매').length,
    avg_spread: calculateAverage(orders, 'spread_rate'),
    avg_yield: calculateAverage(orders, 'expected_yield'),
    // ...
  };

  return NextResponse.json({ success: true, data: summary });
}
```

#### 2.3 캐싱 전략

**Option 1: SWR (권장 - 간단한 구현)**
```typescript
// hooks/useOrders.ts
import useSWR from 'swr';

export function useOrders() {
  const { data, error, isLoading } = useSWR(
    '/api/orders',
    fetcher,
    {
      refreshInterval: 300000, // 5분마다 자동 새로고침
      revalidateOnFocus: true,
    }
  );

  return { orders: data?.data, error, isLoading };
}
```

**Option 2: TanStack Query (더 강력한 기능)**
```typescript
// hooks/useOrders.ts
import { useQuery } from '@tanstack/react-query';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 300000, // 5분
    refetchInterval: 300000,
  });
}
```

---

### Phase 3: UI 컴포넌트 개발 (3-4주)

#### 3.1 레이아웃 컴포넌트

**app/layout.tsx**
```typescript
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
```

#### 3.2 대시보드 메인 페이지

**app/(dashboard)/page.tsx**
```typescript
'use client';

import { useOrders } from '@/hooks/useOrders';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { SignalDistribution } from '@/components/charts/SignalDistribution';
import { SpreadDistribution } from '@/components/charts/SpreadDistribution';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-6">
      {/* 요약 카드 */}
      <SummaryCards orders={orders} />

      {/* 차트 섹션 */}
      <div className="grid grid-cols-2 gap-6">
        <SignalDistribution data={orders} />
        <SpreadDistribution data={orders} />
      </div>

      {/* 탭 섹션 */}
      <Tabs defaultValue="instant">
        <TabsList>
          <TabsTrigger value="instant">⚡ 즉시 체결</TabsTrigger>
          <TabsTrigger value="momentum">💹 가격 모멘텀</TabsTrigger>
          {/* ... 기타 탭 */}
        </TabsList>

        <TabsContent value="instant">
          <InstantMatchTab orders={orders} />
        </TabsContent>

        <TabsContent value="momentum">
          <MomentumTab orders={orders} />
        </TabsContent>

        {/* ... */}
      </Tabs>
    </div>
  );
}
```

#### 3.3 차트 컴포넌트 (Plotly → Recharts)

**components/charts/SignalDistribution.tsx**
```typescript
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  '주의': '#dc2626',
  '유동성↓': '#f59e0b',
  '보통': '#6b7280',
  '저평가': '#10b981',
  '고평가': '#ef4444',
  '유동성↑': '#3b82f6',
};

export function SignalDistribution({ data }: { data: OrderWithMetrics[] }) {
  const signalCounts = data.reduce((acc, order) => {
    acc[order.signal] = (acc[order.signal] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(signalCounts).map(([signal, count]) => ({
    name: signal,
    value: count,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">🎯 시그널 분포</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

#### 3.4 필터 컴포넌트

**components/filters/OrderFilters.tsx**
```typescript
'use client';

import { useState } from 'react';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export function OrderFilters({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) {
  const [orderTypes, setOrderTypes] = useState<string[]>(['구매', '판매']);
  const [spreadRange, setSpreadRange] = useState<[number, number]>([-50, 50]);

  return (
    <div className="space-y-4">
      <div>
        <label>주문 타입</label>
        <Select
          multiple
          value={orderTypes}
          onValueChange={setOrderTypes}
        >
          <option value="구매">구매</option>
          <option value="판매">판매</option>
        </Select>
      </div>

      <div>
        <label>스프레드율 범위 (%)</label>
        <Slider
          value={spreadRange}
          onValueChange={setSpreadRange}
          min={-50}
          max={50}
          step={1}
        />
      </div>
    </div>
  );
}
```

---

### Phase 4: 고급 기능 구현 (2-3주)

#### 4.1 실시간 데이터 업데이트

**Server-Sent Events (SSE) 또는 WebSocket**
```typescript
// app/api/orders/stream/route.ts
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const interval = setInterval(async () => {
    const orders = await fetchLatestOrders();
    writer.write(encoder.encode(`data: ${JSON.stringify(orders)}\n\n`));
  }, 5000); // 5초마다

  request.signal.addEventListener('abort', () => {
    clearInterval(interval);
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
```

#### 4.2 고급 필터링 및 검색

**전체 텍스트 검색**
```typescript
// lib/utils/search.ts
export function searchOrders(orders: Order[], query: string): Order[] {
  const lowerQuery = query.toLowerCase();
  return orders.filter(
    (order) =>
      order.song_name.toLowerCase().includes(lowerQuery) ||
      order.song_artist.toLowerCase().includes(lowerQuery)
  );
}
```

#### 4.3 데이터 내보내기

**CSV/Excel 내보내기**
```typescript
// components/ExportButton.tsx
import { downloadCSV } from '@/lib/utils/export';

export function ExportButton({ data }: { data: OrderWithMetrics[] }) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, 'musicow_orders.csv');
  };

  return <Button onClick={handleExport}>📥 CSV 다운로드</Button>;
}
```

#### 4.4 사용자 설정 저장

**LocalStorage를 활용한 필터 상태 저장**
```typescript
// hooks/usePersistedFilters.ts
import { useState, useEffect } from 'react';

export function usePersistedFilters() {
  const [filters, setFilters] = useState<Filters>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-filters');
      return saved ? JSON.parse(saved) : DEFAULT_FILTERS;
    }
    return DEFAULT_FILTERS;
  });

  useEffect(() => {
    localStorage.setItem('dashboard-filters', JSON.stringify(filters));
  }, [filters]);

  return [filters, setFilters] as const;
}
```

---

### Phase 5: 최적화 및 배포 (1-2주)

#### 5.1 성능 최적화

**이미지 최적화**
```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Musicow"
  width={200}
  height={50}
  priority
/>
```

**코드 스플리팅**
```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/charts/HeavyChart'), {
  ssr: false,
  loading: () => <Skeleton />,
});
```

**메타데이터 최적화**
```typescript
// app/layout.tsx
export const metadata = {
  title: '뮤직카우 시장 분석 대시보드',
  description: '실시간 음악 저작권 거래 데이터 분석',
  openGraph: {
    title: '뮤직카우 시장 분석',
    description: '실시간 음악 저작권 거래 데이터 분석',
    images: ['/og-image.png'],
  },
};
```

#### 5.2 Vercel 배포

**vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://data.musicow.com"
  }
}
```

**GitHub Actions CI/CD**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

#### 5.3 모니터링 설정

**Vercel Analytics**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Sentry 에러 트래킹**
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## 🔄 데이터 변환 맵핑

### Python → TypeScript 지표 계산 함수

| Python 함수 | TypeScript 함수 | 복잡도 | 우선순위 |
|-------------|-----------------|--------|----------|
| `calculate_spread_rate()` | `calculateSpreadRate()` | 낮음 | 높음 |
| `calculate_expected_yield()` | `calculateExpectedYield()` | 낮음 | 높음 |
| `calculate_liquidity_score()` | `calculateLiquidityScore()` | 중간 | 높음 |
| `calculate_price_momentum()` | `calculatePriceMomentum()` | 높음 | 중간 |
| `generate_signal()` | `generateSignal()` | 중간 | 높음 |
| `calculate_batch_metrics()` | `calculateBatchMetrics()` | 낮음 | 높음 |

### Streamlit 컴포넌트 → Next.js 컴포넌트

| Streamlit | Next.js | 라이브러리 |
|-----------|---------|-----------|
| `st.metric()` | `<MetricCard>` | shadcn/ui Card |
| `st.dataframe()` | `<DataTable>` | TanStack Table |
| `px.pie()` | `<PieChart>` | Recharts |
| `px.bar()` | `<BarChart>` | Recharts |
| `px.scatter()` | `<ScatterChart>` | Recharts |
| `st.multiselect()` | `<MultiSelect>` | shadcn/ui Select |
| `st.slider()` | `<Slider>` | shadcn/ui Slider |
| `st.tabs()` | `<Tabs>` | shadcn/ui Tabs |

---

## 📋 체크리스트

### Phase 1: 프로젝트 설정
- [ ] Next.js 프로젝트 생성
- [ ] TypeScript 설정
- [ ] Tailwind CSS + shadcn/ui 설정
- [ ] 프로젝트 구조 생성
- [ ] 타입 정의 작성

### Phase 2: API 계층
- [ ] MetricsCalculator 클래스 구현
- [ ] /api/orders 엔드포인트
- [ ] /api/summary 엔드포인트
- [ ] /api/momentum 엔드포인트
- [ ] 에러 핸들링 구현
- [ ] 캐싱 전략 구현

### Phase 3: UI 컴포넌트
- [ ] 레이아웃 컴포넌트 (Header, Sidebar)
- [ ] 대시보드 메인 페이지
- [ ] 요약 카드 컴포넌트
- [ ] 차트 컴포넌트 (시그널, 스프레드, 모멘텀)
- [ ] 필터 컴포넌트
- [ ] 테이블 컴포넌트
- [ ] 탭 페이지 (9개)

### Phase 4: 고급 기능
- [ ] 실시간 데이터 업데이트
- [ ] 검색 기능
- [ ] CSV 내보내기
- [ ] 사용자 설정 저장
- [ ] 반응형 디자인

### Phase 5: 최적화 및 배포
- [ ] 성능 최적화 (코드 스플리팅, 이미지 최적화)
- [ ] SEO 최적화 (메타데이터, sitemap)
- [ ] Vercel 배포
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 설정 (Analytics, Sentry)

---

## 🚀 배포 전략

### 단계적 배포 (Phased Rollout)
1. **베타 버전**: 내부 테스트용 (beta.musicow-dashboard.com)
2. **카나리 배포**: 10% 트래픽 (새 버전 테스트)
3. **전체 배포**: 100% 트래픽 전환

### 롤백 계획
- Vercel의 자동 롤백 기능 활용
- Git 브랜치 전략: main (production), develop (staging)

---

## ⏱️ 예상 일정

| Phase | 기간 | 주요 마일스톤 |
|-------|------|---------------|
| Phase 1 | 1-2주 | 프로젝트 설정 완료 |
| Phase 2 | 2-3주 | API 계층 구축 완료 |
| Phase 3 | 3-4주 | UI 컴포넌트 개발 완료 |
| Phase 4 | 2-3주 | 고급 기능 구현 완료 |
| Phase 5 | 1-2주 | 배포 및 최적화 완료 |
| **총 기간** | **9-14주** | **전체 마이그레이션 완료** |

---

## 💡 추가 고려사항

### 보안
- [ ] API 키 환경변수 관리 (.env.local)
- [ ] CORS 설정
- [ ] Rate Limiting (API 호출 제한)
- [ ] XSS, CSRF 방어

### 접근성
- [ ] 키보드 네비게이션 지원
- [ ] ARIA 레이블 추가
- [ ] 색맹 대응 (색상 콘트라스트)

### 국제화 (i18n)
- [ ] next-intl 설정 (한국어/영어)
- [ ] 날짜/시간 포맷 로케일 대응

### 테스트
- [ ] Jest + React Testing Library 설정
- [ ] E2E 테스트 (Playwright)
- [ ] API 테스트 (Vitest)

---

## 📚 참고 자료

- [Next.js 14 공식 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Recharts 문서](https://recharts.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

## ✅ 성공 기준

1. **성능**: 초기 로딩 시간 < 3초, Lighthouse 점수 90+
2. **안정성**: 99.9% 업타임, 에러율 < 0.1%
3. **사용자 경험**: 모바일 반응형, 접근성 AA 등급
4. **유지보수**: 모듈화된 코드, 90%+ 테스트 커버리지

---

**작성일**: 2025-10-15
**최종 수정일**: 2025-10-15
**버전**: 1.0
