'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { THRESHOLDS } from '@/lib/constants';

export default function LiquidityPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 고유동성 주문 Top 100 (유동성 점수 높은 순)
  const highLiquidityOrders = orders
    ?.filter((order) => order.liquidity_score >= THRESHOLDS.LIQUIDITY_SCORE.HIGH)
    .sort((a, b) => b.liquidity_score - a.liquidity_score)
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
          <CardTitle>💧 고유동성 Top 100</CardTitle>
          <CardDescription>
            유동성 점수 {THRESHOLDS.LIQUIDITY_SCORE.HIGH} 이상의 주문
            ({highLiquidityOrders.length}개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {highLiquidityOrders.length > 0 ? (
            <OrdersTable orders={highLiquidityOrders} pageSize={20} compact />
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              고유동성 주문이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
