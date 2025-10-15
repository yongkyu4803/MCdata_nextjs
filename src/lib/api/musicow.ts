/**
 * 뮤직카우 API 데이터 페칭 공통 로직
 */

import axios from 'axios';
import { Order, OrderWithMetrics } from '@/types/order';
import { metricsCalculator } from '@/lib/metrics/calculator';
import { MUSICOW_API_URL } from '@/lib/constants';

/**
 * API 응답 데이터를 내부 Order 타입으로 정규화
 */
function normalizeOrder(rawOrder: any): Order {
  // URL에서 song_id 추출 (예: /song/1737 → "1737")
  const songIdMatch = rawOrder.url_link?.match(/\/song\/(\d+)/);
  const songId = songIdMatch ? songIdMatch[1] : rawOrder.order_no;

  return {
    // API 필드 그대로
    order_no: rawOrder.order_no,
    order_date: rawOrder.order_date,
    song_name: rawOrder.song_name,
    song_artist: rawOrder.song_artist,
    song_category: rawOrder.song_category,
    order_type: rawOrder.order_type,
    order_status: rawOrder.order_status,
    order_price: rawOrder.order_price,
    order_count: rawOrder.order_count,
    leaves_count: rawOrder.leaves_count,
    recent_price: rawOrder.recent_price,
    order_royalty_rate: rawOrder.order_royalty_rate,
    url_link: rawOrder.url_link,

    // 편의 필드 추가
    order_id: rawOrder.order_no,
    order_quantity: rawOrder.order_count,
    song_id: songId,
  };
}

/**
 * 뮤직카우 API에서 주문 데이터를 가져오고 지표 계산
 * @returns 지표가 계산된 주문 데이터
 */
export async function fetchOrdersWithMetrics(): Promise<OrderWithMetrics[]> {
  try {
    const response = await axios.get<any[]>(MUSICOW_API_URL, {
      timeout: 30000,
      headers: {
        Accept: 'application/json',
      },
    });

    const rawOrders = response.data;

    if (!Array.isArray(rawOrders)) {
      throw new Error('Invalid data format: expected array');
    }

    // 데이터 정규화
    const normalizedOrders = rawOrders.map(normalizeOrder);

    // 지표 계산
    const ordersWithMetrics = metricsCalculator.calculateBatchMetrics(normalizedOrders);

    return ordersWithMetrics;
  } catch (error) {
    console.error('Failed to fetch orders from Musicow API:', error);
    throw error;
  }
}
