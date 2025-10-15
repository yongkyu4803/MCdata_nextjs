'use client';

import { useMomentum } from '@/hooks/useMomentum';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatPercent } from '@/lib/utils/format';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MomentumPage() {
  const { data: momentumData, isLoading, error } = useMomentum();

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
          <CardTitle>💹 가격 모멘텀 분석</CardTitle>
          <CardDescription>
            최근 가격 변화 추세 ({momentumData?.length || 0}개)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {momentumData && momentumData.length > 0 ? (
              momentumData.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{item.song_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.song_artist}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.trend === 'up'
                            ? 'default'
                            : item.trend === 'down'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {item.trend === 'up' && (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        )}
                        {item.trend === 'down' && (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {item.trend === 'stable' && (
                          <Minus className="mr-1 h-3 w-3" />
                        )}
                        {item.trend === 'up'
                          ? '상승'
                          : item.trend === 'down'
                          ? '하락'
                          : '안정'}
                      </Badge>
                      <span
                        className={`font-mono text-sm font-semibold ${
                          item.recent_change_percent > 0
                            ? 'text-red-600'
                            : item.recent_change_percent < 0
                            ? 'text-green-600'
                            : ''
                        }`}
                      >
                        {formatPercent(item.recent_change_percent)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    모멘텀 점수: {item.momentum_score?.toFixed(2) ?? '0.00'} | 주문 수:{' '}
                    {item.prices?.length ?? 0}
                  </div>
                </Card>
              ))
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                모멘텀 데이터가 없습니다.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
