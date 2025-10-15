/**
 * 검색 및 필터링 유틸리티
 */

import { Order, OrderWithMetrics, Signal } from '@/types/order';

/**
 * 전체 텍스트 검색
 * 곡명, 아티스트명에서 검색
 */
export function searchOrders(
  orders: OrderWithMetrics[],
  query: string
): OrderWithMetrics[] {
  if (!query || query.trim() === '') return orders;

  const lowerQuery = query.toLowerCase().trim();

  return orders.filter(
    (order) =>
      order.song_name.toLowerCase().includes(lowerQuery) ||
      order.song_artist.toLowerCase().includes(lowerQuery) ||
      order.song_category.toLowerCase().includes(lowerQuery) ||
      order.order_id?.toLowerCase().includes(lowerQuery) ||
      order.order_no.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 주문 타입으로 필터링
 */
export function filterByOrderType(
  orders: OrderWithMetrics[],
  types: string[]
): OrderWithMetrics[] {
  if (types.length === 0) return orders;
  return orders.filter((order) => types.includes(order.order_type));
}

/**
 * 시그널로 필터링
 */
export function filterBySignal(
  orders: OrderWithMetrics[],
  signals: Signal[]
): OrderWithMetrics[] {
  if (signals.length === 0) return orders;
  return orders.filter((order) => signals.includes(order.signal));
}

/**
 * 스프레드율 범위로 필터링
 */
export function filterBySpreadRange(
  orders: OrderWithMetrics[],
  min: number,
  max: number
): OrderWithMetrics[] {
  return orders.filter((order) => {
    const spread = order.spread_rate ?? 0;
    return spread >= min && spread <= max;
  });
}

/**
 * 예상 수익률 범위로 필터링
 */
export function filterByYieldRange(
  orders: OrderWithMetrics[],
  min: number,
  max: number
): OrderWithMetrics[] {
  return orders.filter((order) => {
    const yieldRate = order.expected_yield ?? 0;
    return yieldRate >= min && yieldRate <= max;
  });
}

/**
 * 유동성 점수 범위로 필터링
 */
export function filterByLiquidityRange(
  orders: OrderWithMetrics[],
  min: number,
  max: number
): OrderWithMetrics[] {
  return orders.filter((order) => {
    const liquidity = order.liquidity_score ?? 0;
    return liquidity >= min && liquidity <= max;
  });
}

/**
 * 카테고리로 필터링
 */
export function filterByCategory(
  orders: OrderWithMetrics[],
  categories: string[]
): OrderWithMetrics[] {
  if (categories.length === 0) return orders;
  return orders.filter((order) => categories.includes(order.song_category));
}

/**
 * 대량 주문 필터링
 */
export function filterByLargeOrders(
  orders: OrderWithMetrics[],
  threshold: number = 100
): OrderWithMetrics[] {
  return orders.filter((order) => (order.order_quantity || order.order_count) >= threshold);
}

/**
 * 복합 필터 적용
 */
export interface FilterOptions {
  searchQuery?: string;
  orderTypes?: string[];
  signals?: Signal[];
  spreadRange?: [number, number];
  yieldRange?: [number, number];
  liquidityRange?: [number, number];
  categories?: string[];
  largeOrdersOnly?: boolean;
  largeOrderThreshold?: number;
}

export function applyFilters(
  orders: OrderWithMetrics[],
  options: FilterOptions
): OrderWithMetrics[] {
  let filtered = [...orders];

  // 검색어 필터
  if (options.searchQuery) {
    filtered = searchOrders(filtered, options.searchQuery);
  }

  // 주문 타입 필터
  if (options.orderTypes && options.orderTypes.length > 0) {
    filtered = filterByOrderType(filtered, options.orderTypes);
  }

  // 시그널 필터
  if (options.signals && options.signals.length > 0) {
    filtered = filterBySignal(filtered, options.signals);
  }

  // 스프레드율 범위 필터
  if (options.spreadRange) {
    filtered = filterBySpreadRange(filtered, options.spreadRange[0], options.spreadRange[1]);
  }

  // 예상 수익률 범위 필터
  if (options.yieldRange) {
    filtered = filterByYieldRange(filtered, options.yieldRange[0], options.yieldRange[1]);
  }

  // 유동성 점수 범위 필터
  if (options.liquidityRange) {
    filtered = filterByLiquidityRange(
      filtered,
      options.liquidityRange[0],
      options.liquidityRange[1]
    );
  }

  // 카테고리 필터
  if (options.categories && options.categories.length > 0) {
    filtered = filterByCategory(filtered, options.categories);
  }

  // 대량 주문 필터
  if (options.largeOrdersOnly) {
    filtered = filterByLargeOrders(filtered, options.largeOrderThreshold);
  }

  return filtered;
}

/**
 * 고유한 카테고리 목록 추출
 */
export function getUniqueCategories(orders: OrderWithMetrics[]): string[] {
  const categories = new Set<string>();
  orders.forEach((order) => categories.add(order.song_category));
  return Array.from(categories).sort();
}

/**
 * 고유한 시그널 목록 추출
 */
export function getUniqueSignals(orders: OrderWithMetrics[]): Signal[] {
  const signals = new Set<Signal>();
  orders.forEach((order) => signals.add(order.signal));
  return Array.from(signals);
}
