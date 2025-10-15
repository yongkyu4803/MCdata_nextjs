'use client';

import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils/format';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '@/lib/constants';

export default function CategoryPage() {
  const { data: orders, isLoading, error } = useOrders();

  // 카테고리별 집계
  const categoryStats = orders?.reduce(
    (acc, order) => {
      const category = order.song_category || '기타';
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          totalPrice: 0,
          totalSpread: 0,
          totalYield: 0,
        };
      }
      acc[category].count += 1;
      acc[category].totalPrice += order.order_price;
      acc[category].totalSpread += order.spread_rate;
      acc[category].totalYield += order.expected_yield;
      return acc;
    },
    {} as Record<string, any>
  );

  const chartData = categoryStats
    ? Object.entries(categoryStats)
        .map(([category, stats]) => ({
          category,
          count: stats.count,
          avgPrice: stats.totalPrice / stats.count,
          avgSpread: stats.totalSpread / stats.count,
          avgYield: stats.totalYield / stats.count,
        }))
        .sort((a, b) => b.count - a.count)
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
          <CardTitle>📊 카테고리 분석</CardTitle>
          <CardDescription>
            카테고리별 주문 현황 ({chartData.length}개 카테고리)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 카테고리별 주문 수 차트 */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">카테고리별 주문 수</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={CHART_COLORS.PRIMARY} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 카테고리별 상세 통계 */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">카테고리별 상세 통계</h4>
            <div className="space-y-2">
              {chartData.map((item) => (
                <Card key={item.category} className="p-4">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm font-semibold">{item.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.count}개
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">평균가</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(item.avgPrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">평균 스프레드</p>
                      <p className="text-sm font-medium">
                        {formatPercent(item.avgSpread)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">평균 수익률</p>
                      <p className="text-sm font-medium">
                        {formatPercent(item.avgYield)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">비중</p>
                      <p className="text-sm font-medium">
                        {formatPercent((item.count / (orders?.length || 1)) * 100, 1)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
