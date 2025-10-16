'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function YieldPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 고수익률 주문 Top 100
  // 정렬 우선순위: 1) yield_advantage (수익률 이점), 2) expected_yield (실제 수익률)
  const highYieldOrders = orders
    ?.filter((order) => order.expected_yield >= THRESHOLDS.EXPECTED_YIELD.HIGH)
    .sort((a, b) => {
      // 1차: 수익률 이점으로 정렬 (할인된 가격에 높은 수익률)
      const advantageDiff = b.yield_advantage - a.yield_advantage;
      if (Math.abs(advantageDiff) > 0.01) return advantageDiff;

      // 2차: 실제 예상 수익률로 정렬
      return b.expected_yield - a.expected_yield;
    })
    .slice(0, 100) || [];

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
          <CardTitle>💰 고수익률 Top 100</CardTitle>
          <CardDescription>
            예상 수익률 {THRESHOLDS.EXPECTED_YIELD.HIGH}% 이상의 주문
            ({highYieldOrders.length}개)
            <br />
            <span className="text-xs text-muted-foreground mt-1">
              정렬 기준: 수익률 이점 (시장가 대비 유리한 정도) → 실제 수익률
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {highYieldOrders.length > 0 ? (
            <OrdersTable orders={highYieldOrders} pageSize={20} compact />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              고수익률 주문이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
