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

interface Props {
  orders: OrderWithMetrics[];
  pageSize?: number;
  compact?: boolean;
}

export function OrdersTable({ orders, pageSize = 20, compact = false }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof OrderWithMetrics | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
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

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
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
