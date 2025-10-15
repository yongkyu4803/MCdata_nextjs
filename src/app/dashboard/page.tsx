'use client';

import { useState, useMemo } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { SignalDistribution } from '@/components/charts/SignalDistribution';
import { SpreadDistribution } from '@/components/charts/SpreadDistribution';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { DashboardGuide } from '@/components/dashboard/DashboardGuide';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchBar } from '@/components/search/SearchBar';
import { ExportButton } from '@/components/buttons/ExportButton';
import { applyFilters } from '@/lib/utils/search';
import { usePersistedFilters } from '@/hooks/usePersistedFilters';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { data: orders, isLoading, error, refetch } = useOrders();
  const { filters, setFilters, resetFilters } = usePersistedFilters();
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  // 검색 및 필터 적용 (Hook을 조건문 밖으로 이동)
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return applyFilters(orders, {
      ...filters,
      searchQuery,
    });
  }, [orders, searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-96 border-destructive">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">
              데이터를 불러오는데 실패했습니다.
            </p>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !orders) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 대시보드 가이드 */}
      <DashboardGuide />

      {/* 검색 및 액션 바 */}
      <div className="flex items-center gap-4">
        <SearchBar onSearch={handleSearch} className="flex-1" />
        <Button variant="outline" size="default" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          새로고침
        </Button>
        <ExportButton data={filteredOrders} filename="musicow_dashboard" />
      </div>

      {/* 요약 카드 */}
      <SummaryCards />

      {/* 차트 섹션 */}
      <div className="grid gap-6 md:grid-cols-2">
        <SignalDistribution data={filteredOrders} />
        <SpreadDistribution data={filteredOrders} />
      </div>

      {/* 최근 주문 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>
            📋 최근 주문 ({filteredOrders.length}건)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={filteredOrders.slice(0, 50)} pageSize={10} />
        </CardContent>
      </Card>
    </div>
  );
}
