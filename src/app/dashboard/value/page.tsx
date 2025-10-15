'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function ValuePage() {
  const { data: orders, isLoading, error } = useOrders();

  // 가치 투자 기회: 저평가 + 고유동성 + 고수익률
  const valueOpportunities = orders
    ?.filter(
      (order) =>
        order.spread_rate < THRESHOLDS.SPREAD_RATE.LOW &&
        order.liquidity_score >= THRESHOLDS.LIQUIDITY_SCORE.MEDIUM &&
        order.expected_yield >= THRESHOLDS.EXPECTED_YIELD.MEDIUM
    )
    .sort((a, b) => {
      // 복합 점수 계산 (낮은 스프레드 + 높은 유동성 + 높은 수익률)
      const scoreA =
        -a.spread_rate * 0.4 +
        a.liquidity_score * 0.3 +
        a.expected_yield * 0.3;
      const scoreB =
        -b.spread_rate * 0.4 +
        b.liquidity_score * 0.3 +
        b.expected_yield * 0.3;
      return scoreB - scoreA;
    }) || [];

  if (error) {
    return <div className="text-destructive">데이터 로딩 실패</div>;
  }

  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>💎 가치 투자 기회</CardTitle>
          <CardDescription>
            저평가 + 중간 이상 유동성 + 중간 이상 수익률 조합
            ({valueOpportunities.length}개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {valueOpportunities.length > 0 ? (
            <OrdersTable orders={valueOpportunities} />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              가치 투자 기회가 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
