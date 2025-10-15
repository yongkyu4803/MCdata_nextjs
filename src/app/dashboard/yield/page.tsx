'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function YieldPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 고수익률 주문 Top 100 (예상 수익률 높은 순)
  const highYieldOrders = orders
    ?.filter((order) => order.expected_yield >= THRESHOLDS.EXPECTED_YIELD.HIGH)
    .sort((a, b) => b.expected_yield - a.expected_yield)
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
