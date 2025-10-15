'use client';

import { useMomentum } from '@/hooks/useMomentum';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatPercent } from '@/lib/utils/format';
import { TrendingUp, TrendingDown, Minus, BarChart3, Activity } from 'lucide-react';
import { useMemo } from 'react';

export default function MomentumPage() {
  const { data: momentumData, isLoading, error } = useMomentum();

  // 통계 계산
  const stats = useMemo(() => {
    if (!momentumData || momentumData.length === 0) {
      return { up: 0, down: 0, stable: 0, avgMomentum: 0 };
    }

    const up = momentumData.filter((item) => item.trend === 'up').length;
    const down = momentumData.filter((item) => item.trend === 'down').length;
    const stable = momentumData.filter((item) => item.trend === 'stable').length;
    const avgMomentum =
      momentumData.reduce((sum, item) => sum + (item.momentum_score || 0), 0) /
      momentumData.length;

    return { up, down, stable, avgMomentum };
  }, [momentumData]);

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Card className="w-96 border-destructive">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">데이터 로딩 실패</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">💹 가격 모멘텀 분석</h2>
        <p className="text-muted-foreground">
          최근 가격 변화 추세 및 모멘텀 점수
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>총 종목 수</CardDescription>
            <CardTitle className="text-2xl">{momentumData?.length || 0}개</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              상승 추세
            </CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.up}개</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              하락 추세
            </CardDescription>
            <CardTitle className="text-2xl text-blue-600">{stats.down}개</CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-gray-200 bg-gray-50">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              평균 모멘텀
            </CardDescription>
            <CardTitle className="text-2xl">{stats.avgMomentum.toFixed(1)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* 모멘텀 리스트 - 컴팩트 그리드 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>종목별 모멘텀</CardTitle>
              <CardDescription>상위 {momentumData?.length || 0}개 종목</CardDescription>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {momentumData && momentumData.length > 0 ? (
              momentumData.map((item, index) => (
                <Card
                  key={index}
                  className={`transition-all hover:shadow-md ${
                    item.trend === 'up'
                      ? 'border-red-100 hover:border-red-200'
                      : item.trend === 'down'
                      ? 'border-blue-100 hover:border-blue-200'
                      : 'hover:border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    {/* 헤더 - 곡명과 추세 */}
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-sm leading-tight">
                          {item.song_name}
                        </h4>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.song_artist}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.trend === 'up'
                            ? 'destructive'
                            : item.trend === 'down'
                            ? 'default'
                            : 'secondary'
                        }
                        className="shrink-0"
                      >
                        {item.trend === 'up' && <TrendingUp className="mr-1 h-3 w-3" />}
                        {item.trend === 'down' && <TrendingDown className="mr-1 h-3 w-3" />}
                        {item.trend === 'stable' && <Minus className="mr-1 h-3 w-3" />}
                        {item.trend === 'up' ? '상승' : item.trend === 'down' ? '하락' : '안정'}
                      </Badge>
                    </div>

                    {/* 메트릭 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">가격 변화</span>
                        <span
                          className={`font-mono text-sm font-bold ${
                            item.recent_change_percent > 0
                              ? 'text-red-600'
                              : item.recent_change_percent < 0
                              ? 'text-blue-600'
                              : 'text-gray-600'
                          }`}
                        >
                          {formatPercent(item.recent_change_percent)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">모멘텀 점수</span>
                        <span className="font-mono text-sm font-medium">
                          {item.momentum_score?.toFixed(1) ?? '0.0'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">주문 수</span>
                        <span className="text-sm">{item.prices?.length ?? 0}건</span>
                      </div>
                    </div>

                    {/* 프로그레스 바 */}
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full transition-all ${
                            item.trend === 'up'
                              ? 'bg-red-500'
                              : item.trend === 'down'
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                          style={{
                            width: `${Math.min(Math.abs(item.momentum_score || 0), 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">모멘텀 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
