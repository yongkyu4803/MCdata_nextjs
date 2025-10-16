'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSummary } from '@/hooks/useSummary';
import { formatNumber, formatPercent } from '@/lib/utils/format';
import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Activity,
  Zap,
  TrendingDown,
} from 'lucide-react';

export function SummaryCards() {
  const { data: summary, isLoading, error } = useSummary();

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-sm text-destructive">데이터 로딩 실패</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !summary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: '전체 주문',
      value: formatNumber(summary.total_orders),
      icon: ShoppingCart,
      description: `구매 ${formatNumber(summary.buy_orders)} | 판매 ${formatNumber(summary.sell_orders)}`,
    },
    {
      title: '평균 스프레드율',
      value: formatPercent(summary.avg_spread_rate, 2),
      icon: Activity,
      description: '가격 차이 비율',
    },
    {
      title: '평균 주문가 수익률',
      value: formatPercent(summary.avg_expected_yield, 2),
      icon: DollarSign,
      description: '주문가 기준 수익률 평균',
    },
    {
      title: '평균 유동성',
      value: formatNumber(summary.avg_liquidity_score, 1),
      icon: TrendingUp,
      description: '유동성 점수',
    },
    {
      title: '즉시 체결',
      value: formatNumber(summary.instant_match_count),
      icon: Zap,
      description: '스프레드 ±0.5% 이내',
    },
    {
      title: '저평가 종목',
      value: formatNumber(summary.undervalued_count),
      icon: TrendingDown,
      description: '스프레드 -5% 이하',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
