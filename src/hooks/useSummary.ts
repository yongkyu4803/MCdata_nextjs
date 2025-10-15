/**
 * 요약 통계를 가져오는 커스텀 훅
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SummaryResponse } from '@/types/api';
import { SummaryMetrics } from '@/types/metrics';

export function useSummary() {
  return useQuery<SummaryMetrics, Error>({
    queryKey: ['summary'],
    queryFn: async () => {
      const { data } = await axios.get<SummaryResponse>('/api/summary');
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch summary');
      }
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
