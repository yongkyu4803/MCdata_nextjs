'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function UndervaluedPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 낮은 호가 주문 Top 100 (스프레드율 낮은 순)
  const undervaluedOrders = orders
    ?.filter((order) => order.spread_rate < THRESHOLDS.SPREAD_RATE.LOW)
    .sort((a, b) => a.spread_rate - b.spread_rate)
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
          <CardTitle>📉 낮은 호가 Top 100</CardTitle>
          <CardDescription>
            스프레드율 {THRESHOLDS.SPREAD_RATE.LOW}% 이하의 주문
            ({undervaluedOrders.length}개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {undervaluedOrders.length > 0 ? (
            <OrdersTable orders={undervaluedOrders} pageSize={20} compact />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              해당 조건을 만족하는 주문이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
