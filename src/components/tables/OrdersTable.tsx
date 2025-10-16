'use client';

import { useState } from 'react';
import { OrderWithMetrics } from '@/types/order';
import { formatCurrency, formatPercent, formatDate } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';
import { SIGNAL_COLORS } from '@/lib/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  orders: OrderWithMetrics[];
  pageSize?: number;
  compact?: boolean;
}

export function OrdersTable({ orders, pageSize = 20, compact = false }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof OrderWithMetrics | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [mobileSortKey, setMobileSortKey] = useState<string>('yield_advantage');

  // 정렬
  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = sortedOrders.slice(startIndex, endIndex);

  const handleSort = (key: keyof OrderWithMetrics) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const handleMobileSortChange = (value: string) => {
    setMobileSortKey(value);
    setSortKey(value as keyof OrderWithMetrics);
    setSortOrder('desc');
  };

  // 모바일용 페이지 크기
  const effectivePageSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : pageSize;
  const mobileTotalPages = Math.ceil(sortedOrders.length / effectivePageSize);
  const mobileStartIndex = (currentPage - 1) * effectivePageSize;
  const mobileEndIndex = mobileStartIndex + effectivePageSize;
  const mobileCurrentOrders = sortedOrders.slice(mobileStartIndex, mobileEndIndex);

  return (
    <div className="space-y-4">
      {/* 모바일 정렬 드롭다운 */}
      <div className="md:hidden">
        <Select value={mobileSortKey} onValueChange={handleMobileSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yield_advantage">수익률 이점순</SelectItem>
            <SelectItem value="spread_rate">스프레드율순</SelectItem>
            <SelectItem value="expected_yield">주문가율순</SelectItem>
            <SelectItem value="base_yield">기준율순</SelectItem>
            <SelectItem value="liquidity_score">유동성순</SelectItem>
            <SelectItem value="order_date">최신순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 모바일 카드 뷰 */}
      <div className="md:hidden space-y-3">
        {mobileCurrentOrders.map((order, index) => (
          <Card key={`${order.order_id}-${index}`} className="p-4">
            <div className="space-y-3">
              {/* 헤더: 곡명 + 시그널 */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{order.song_name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{order.song_artist}</p>
                </div>
                <Badge
                  variant="outline"
                  className="flex-shrink-0"
                  style={{
                    borderColor: SIGNAL_COLORS[order.signal],
                    color: SIGNAL_COLORS[order.signal],
                  }}
                >
                  {order.signal}
                </Badge>
              </div>

              {/* 주요 정보 */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">주문가</span>
                  <p className="font-medium">{formatCurrency(order.order_price)}</p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">타입</span>
                  <div className="mt-0.5">
                    <Badge variant={order.order_type === '구매' ? 'default' : 'secondary'} className="text-xs">
                      {order.order_type}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 수익률 정보 */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">수익률 이점</span>
                  <p className={`font-semibold font-mono ${
                    order.yield_advantage > 0 ? 'text-green-600' :
                    order.yield_advantage < 0 ? 'text-red-600' : 'text-muted-foreground'
                  }`}>
                    {formatPercent(order.yield_advantage)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">스프레드율</span>
                  <p className={`font-mono ${
                    order.spread_rate > 0 ? 'text-red-600' :
                    order.spread_rate < 0 ? 'text-green-600' : ''
                  }`}>
                    {formatPercent(order.spread_rate)}
                  </p>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-2 border-t text-xs text-muted-foreground">
                <div>기준율: <span className="font-mono">{formatPercent(order.base_yield)}</span></div>
                <div className="text-right">주문가율: <span className="font-mono">{formatPercent(order.expected_yield)}</span></div>
                <div>유동성: <span className="font-medium">{order.liquidity_score?.toFixed(1) ?? '0.0'}</span></div>
                <div className="text-right">주문일: <span>{formatDate(order.order_date, 'MM-dd HH:mm')}</span></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 데스크톱 테이블 뷰 */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table className="table-fixed">
          <colgroup>
            <col style={{ width: '18%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('song_name')} className="cursor-pointer">
                곡명
              </TableHead>
              <TableHead onClick={() => handleSort('song_artist')} className="cursor-pointer">
                아티스트
              </TableHead>
              <TableHead onClick={() => handleSort('order_type')} className="cursor-pointer">
                타입
              </TableHead>
              <TableHead onClick={() => handleSort('order_price')} className="cursor-pointer text-right">
                주문가
              </TableHead>
              <TableHead onClick={() => handleSort('spread_rate')} className="cursor-pointer text-right">
                스프레드율
              </TableHead>
              <TableHead onClick={() => handleSort('base_yield')} className="cursor-pointer text-right">
                기준율
              </TableHead>
              <TableHead onClick={() => handleSort('expected_yield')} className="cursor-pointer text-right">
                주문가율
              </TableHead>
              <TableHead onClick={() => handleSort('yield_advantage')} className="cursor-pointer text-right">
                이점
              </TableHead>
              <TableHead onClick={() => handleSort('liquidity_score')} className="cursor-pointer text-right">
                유동성
              </TableHead>
              <TableHead onClick={() => handleSort('signal')} className="cursor-pointer">
                시그널
              </TableHead>
              <TableHead onClick={() => handleSort('order_date')} className="cursor-pointer">
                주문일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow key={`${order.order_id}-${index}`}>
                <TableCell className={`font-medium truncate ${compact ? 'py-2.5' : ''}`}>{order.song_name}</TableCell>
                <TableCell className={`text-muted-foreground truncate ${compact ? 'py-2.5' : ''}`}>
                  {order.song_artist}
                </TableCell>
                <TableCell className={compact ? 'py-2.5' : ''}>
                  <Badge variant={order.order_type === '구매' ? 'default' : 'secondary'}>
                    {order.order_type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right ${compact ? 'py-2.5' : ''}`}>
                  {formatCurrency(order.order_price)}
                </TableCell>
                <TableCell
                  className={`text-right font-mono ${compact ? 'py-2.5' : ''} ${
                    order.spread_rate > 0
                      ? 'text-red-600'
                      : order.spread_rate < 0
                      ? 'text-green-600'
                      : ''
                  }`}
                >
                  {formatPercent(order.spread_rate)}
                </TableCell>
                <TableCell className={`text-right font-mono text-muted-foreground ${compact ? 'py-2.5' : ''}`}>
                  {formatPercent(order.base_yield)}
                </TableCell>
                <TableCell className={`text-right font-mono ${compact ? 'py-2.5' : ''}`}>
                  {formatPercent(order.expected_yield)}
                </TableCell>
                <TableCell
                  className={`text-right font-mono font-semibold ${compact ? 'py-2.5' : ''} ${
                    order.yield_advantage > 0
                      ? 'text-green-600'
                      : order.yield_advantage < 0
                      ? 'text-red-600'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatPercent(order.yield_advantage)}
                </TableCell>
                <TableCell className={`text-right ${compact ? 'py-2.5' : ''}`}>
                  {order.liquidity_score?.toFixed(1) ?? '0.0'}
                </TableCell>
                <TableCell className={compact ? 'py-2.5' : ''}>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: SIGNAL_COLORS[order.signal],
                      color: SIGNAL_COLORS[order.signal],
                    }}
                  >
                    {order.signal}
                  </Badge>
                </TableCell>
                <TableCell className={`text-muted-foreground ${compact ? 'py-2.5' : ''}`}>
                  {formatDate(order.order_date, 'MM-dd HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 - 모바일 */}
      <div className="md:hidden flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          전체 {orders.length}개 중 {mobileStartIndex + 1}-{Math.min(mobileEndIndex, orders.length)}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentPage} / {mobileTotalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(mobileTotalPages, p + 1))}
            disabled={currentPage === mobileTotalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 페이지네이션 - 데스크톱 */}
      <div className="hidden md:flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          전체 {orders.length}개 중 {startIndex + 1}-{Math.min(endIndex, orders.length)}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
