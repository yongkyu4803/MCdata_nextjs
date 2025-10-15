/**
 * 필터 상태를 관리하는 커스텀 훅
 */

'use client';

import { useState, useMemo } from 'react';
import { OrderWithMetrics, Signal } from '@/types/order';

export interface FilterState {
  orderTypes: ('구매' | '판매')[];
  signals: Signal[];
  spreadRange: [number, number];
  minQuantity: number;
  searchQuery: string;
}

const DEFAULT_FILTERS: FilterState = {
  orderTypes: ['구매', '판매'],
  signals: [],
  spreadRange: [-50, 50],
  minQuantity: 0,
  searchQuery: '',
};

export function useFilters(orders: OrderWithMetrics[] = []) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // 필터링된 주문 데이터
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    return orders.filter((order) => {
      // 주문 타입 필터
      if (
        filters.orderTypes.length > 0 &&
        !filters.orderTypes.includes(order.order_type)
      ) {
        return false;
      }

      // 시그널 필터
      if (filters.signals.length > 0 && !filters.signals.includes(order.signal)) {
        return false;
      }

      // 스프레드율 범위 필터
      if (
        order.spread_rate < filters.spreadRange[0] ||
        order.spread_rate > filters.spreadRange[1]
      ) {
        return false;
      }

      // 최소 수량 필터
      if (order.order_quantity && order.order_quantity < filters.minQuantity) {
        return false;
      }

      // 검색 쿼리 필터
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSongName = order.song_name.toLowerCase().includes(query);
        const matchesArtist = order.song_artist.toLowerCase().includes(query);
        if (!matchesSongName && !matchesArtist) {
          return false;
        }
      }

      return true;
    });
  }, [orders, filters]);

  // 필터 업데이트 함수들
  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters,
    filteredOrders,
    updateFilters,
    resetFilters,
  };
}
