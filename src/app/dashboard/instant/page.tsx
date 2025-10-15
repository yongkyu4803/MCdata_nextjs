'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function InstantMatchPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 즉시 체결 가능한 주문 필터링 (스프레드율 ±0.5% 이내)
  const instantOrders = orders?.filter(
    (order) => Math.abs(order.spread_rate) <= THRESHOLDS.SPREAD_RATE.INSTANT_MATCH
  ) || [];

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
          <CardTitle>⚡ 즉시 체결 가능 주문</CardTitle>
          <CardDescription>
            스프레드율 ±{THRESHOLDS.SPREAD_RATE.INSTANT_MATCH}% 이내의 주문
            ({instantOrders.length}개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {instantOrders.length > 0 ? (
            <OrdersTable orders={instantOrders} />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              즉시 체결 가능한 주문이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
