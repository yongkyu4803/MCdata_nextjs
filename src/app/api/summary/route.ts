/**
 * GET /api/summary
 * 주문 데이터의 요약 통계 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchOrdersWithMetrics } from '@/lib/api/musicow';
import { SummaryResponse } from '@/types/api';
import { SummaryMetrics } from '@/types/metrics';
import { OrderWithMetrics } from '@/types/order';
import { THRESHOLDS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const orders = await fetchOrdersWithMetrics();

    // 요약 통계 계산
    const summary: SummaryMetrics = {
      total_orders: orders.length,
      buy_orders: orders.filter((o) => o.order_type === '구매').length,
      sell_orders: orders.filter((o) => o.order_type === '판매').length,
      avg_spread_rate: calculateAverage(orders, 'spread_rate'),
      avg_expected_yield: calculateAverage(orders, 'expected_yield'),
      avg_liquidity_score: calculateAverage(orders, 'liquidity_score'),
      instant_match_count: orders.filter(
        (o) => Math.abs(o.spread_rate) <= THRESHOLDS.SPREAD_RATE.INSTANT_MATCH
      ).length,
      high_yield_count: orders.filter(
        (o) => o.expected_yield >= THRESHOLDS.EXPECTED_YIELD.HIGH
      ).length,
      undervalued_count: orders.filter(
        (o) => o.spread_rate < THRESHOLDS.SPREAD_RATE.LOW
      ).length,
      timestamp: new Date().toISOString(),
    };

    const apiResponse: SummaryResponse = {
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(apiResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Summary API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate summary',
        data: {} as SummaryMetrics,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * 특정 필드의 평균 계산 헬퍼 함수
 */
function calculateAverage(
  orders: OrderWithMetrics[],
  field: keyof Pick<
    OrderWithMetrics,
    'spread_rate' | 'expected_yield' | 'liquidity_score'
  >
): number {
  if (orders.length === 0) return 0;
  const sum = orders.reduce((acc, order) => acc + order[field], 0);
  return sum / orders.length;
}
