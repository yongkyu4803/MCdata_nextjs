/**
 * 주문 데이터를 가져오는 커스텀 훅
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { OrdersResponse } from '@/types/api';
import { OrderWithMetrics } from '@/types/order';

export function useOrders() {
  return useQuery<OrderWithMetrics[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await axios.get<OrdersResponse>('/api/orders');
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch orders');
      }
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5분
    refetchInterval: 5 * 60 * 1000,
  });
}
