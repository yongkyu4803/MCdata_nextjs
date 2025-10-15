/**
 * GET /api/orders
 * 뮤직카우 API에서 주문 데이터를 가져와서 지표를 계산하여 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { fetchOrdersWithMetrics } from '@/lib/api/musicow';
import { OrdersResponse } from '@/types/api';

export const dynamic = 'force-dynamic'; // 캐싱 비활성화
export const revalidate = 300; // 5분마다 재검증

export async function GET(request: NextRequest) {
  try {
    const ordersWithMetrics = await fetchOrdersWithMetrics();

    const apiResponse: OrdersResponse = {
      success: true,
      data: ordersWithMetrics,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(apiResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);

    let errorMessage = 'Failed to fetch orders';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout';
        statusCode = 504;
      } else if (error.response) {
        errorMessage = `External API error: ${error.response.status}`;
        statusCode = error.response.status;
      } else if (error.request) {
        errorMessage = 'Network error';
        statusCode = 503;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        data: [],
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}
