'use client';

import { useOrders } from '@/hooks/useOrders';
import { useFilters } from '@/hooks/useFilters';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

export default function AllDataPage() {
  const { data: orders, isLoading, error } = useOrders();
  const { filters, filteredOrders, updateFilters, resetFilters } =
    useFilters(orders);

  const handleExport = () => {
    // CSV 내보내기 로직 (추후 구현)
    alert('CSV 내보내기 기능 준비 중입니다.');
  };

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>📋 전체 데이터</CardTitle>
              <CardDescription>
                총 {filteredOrders.length}개의 주문
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                CSV 다운로드
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 검색 */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="곡명 또는 아티스트 검색..."
                value={filters.searchQuery}
                onChange={(e) =>
                  updateFilters({ searchQuery: e.target.value })
                }
                className="pl-9"
              />
            </div>
            {filters.searchQuery && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                초기화
              </Button>
            )}
          </div>

          {/* 테이블 */}
          <OrdersTable orders={filteredOrders} />
        </CardContent>
      </Card>
    </div>
  );
}
