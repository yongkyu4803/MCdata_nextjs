/**
 * GET /api/momentum
 * 가격 모멘텀 분석 데이터 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchOrdersWithMetrics } from '@/lib/api/musicow';
import { metricsCalculator } from '@/lib/metrics/calculator';
import { MomentumResponse } from '@/types/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const orders = await fetchOrdersWithMetrics();

    // 곡별로 그룹화
    const songMap = new Map<string, typeof orders>();
    orders.forEach((order) => {
      if (!order.song_id) return; // song_id가 없는 경우 스킵
      const existing = songMap.get(order.song_id) || [];
      songMap.set(order.song_id, [...existing, order]);
    });

    // 각 곡에 대한 모멘텀 계산
    const momentumData = Array.from(songMap.entries())
      .map(([songId, songOrders]) => {
        if (songOrders.length < 2) return null;
        return metricsCalculator.calculatePriceMomentum(orders, songId);
      })
      .filter((data) => data !== null)
      .sort((a, b) => Math.abs(b!.momentum_score) - Math.abs(a!.momentum_score))
      .slice(0, 50); // Top 50개만 반환

    const apiResponse: MomentumResponse = {
      success: true,
      data: momentumData as any[],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(apiResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Momentum API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate momentum',
        data: [],
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
