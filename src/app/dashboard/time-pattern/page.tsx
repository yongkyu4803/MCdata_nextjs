'use client';

import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/utils/format';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '@/lib/constants';

export default function TimePatternPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 시간대별 집계
  const timeStats = orders?.reduce(
    (acc, order) => {
      const date = new Date(order.order_date);
      const hour = date.getHours();

      if (!acc[hour]) {
        acc[hour] = {
          count: 0,
          totalPrice: 0,
          totalSpread: 0,
        };
      }
      acc[hour].count += 1;
      acc[hour].totalPrice += order.order_price;
      acc[hour].totalSpread += order.spread_rate;
      return acc;
    },
    {} as Record<number, any>
  );

  const chartData = timeStats
    ? Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour}시`,
        count: timeStats[hour]?.count || 0,
        avgPrice: timeStats[hour]
          ? timeStats[hour].totalPrice / timeStats[hour].count
          : 0,
        avgSpread: timeStats[hour]
          ? timeStats[hour].totalSpread / timeStats[hour].count
          : 0,
      }))
    : [];

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
          <CardTitle>⏰ 시간 패턴 분석</CardTitle>
          <CardDescription>시간대별 주문 현황</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 시간대별 주문 수 */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">시간대별 주문 수</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={CHART_COLORS.PRIMARY}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 주요 통계 */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">가장 활발한 시간</p>
              <p className="mt-1 text-2xl font-bold">
                {chartData.reduce((max, cur) =>
                  cur.count > max.count ? cur : max
                ).hour}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">최대 주문 수</p>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(
                  Math.max(...chartData.map((d) => d.count))
                )}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">평균 시간당 주문</p>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(
                  chartData.reduce((sum, d) => sum + d.count, 0) / 24,
                  1
                )}
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
