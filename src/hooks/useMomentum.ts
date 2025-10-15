/**
 * 가격 모멘텀 데이터를 가져오는 커스텀 훅
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MomentumResponse } from '@/types/api';
import { MomentumData } from '@/types/metrics';

export function useMomentum() {
  return useQuery<MomentumData[], Error>({
    queryKey: ['momentum'],
    queryFn: async () => {
      const { data } = await axios.get<MomentumResponse>('/api/momentum');
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch momentum');
      }
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
