'use client';

import { useState, useEffect } from 'react';
import { Signal } from '@/types/order';

export interface DashboardFilters {
  searchQuery: string;
  orderTypes: string[];
  signals: Signal[];
  spreadRange: [number, number];
  yieldRange: [number, number];
  liquidityRange: [number, number];
  categories: string[];
  largeOrdersOnly: boolean;
  largeOrderThreshold: number;
}

export const DEFAULT_FILTERS: DashboardFilters = {
  searchQuery: '',
  orderTypes: ['구매', '판매'],
  signals: [],
  spreadRange: [-50, 50],
  yieldRange: [0, 20],
  liquidityRange: [0, 100],
  categories: [],
  largeOrdersOnly: false,
  largeOrderThreshold: 100,
};

const STORAGE_KEY = 'musicow-dashboard-filters';

/**
 * LocalStorage에 필터 상태를 저장하고 불러오는 Hook
 */
export function usePersistedFilters() {
  const [filters, setFilters] = useState<DashboardFilters>(() => {
    // 서버 사이드 렌더링 시 기본값 반환
    if (typeof window === 'undefined') {
      return DEFAULT_FILTERS;
    }

    // 클라이언트에서 저장된 필터 불러오기
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // 기본값과 병합하여 누락된 필드 보정
        return { ...DEFAULT_FILTERS, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load saved filters:', error);
    }

    return DEFAULT_FILTERS;
  });

  // 필터가 변경될 때마다 LocalStorage에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
      } catch (error) {
        console.error('Failed to save filters:', error);
      }
    }
  }, [filters]);

  // 필터 초기화 함수
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
}

/**
 * 페이지별 필터 상태 저장 Hook
 */
export function usePageFilters(pageKey: string) {
  const storageKey = `musicow-filters-${pageKey}`;

  const [filters, setFilters] = useState<DashboardFilters>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_FILTERS;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_FILTERS, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load page filters:', error);
    }

    return DEFAULT_FILTERS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(filters));
      } catch (error) {
        console.error('Failed to save page filters:', error);
      }
    }
  }, [filters, storageKey]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
}
