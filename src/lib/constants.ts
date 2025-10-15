/**
 * 애플리케이션 전역 상수 정의
 */

import { Signal } from '@/types/order';

// API URLs
export const MUSICOW_API_URL =
  'https://data.musicow.com/files/v1/market/orders.json';

// 시그널 색상 맵핑
export const SIGNAL_COLORS: Record<Signal, string> = {
  주의: '#dc2626', // red-600
  '유동성↓': '#f59e0b', // amber-500
  보통: '#6b7280', // gray-500
  저평가: '#10b981', // emerald-500
  고평가: '#ef4444', // red-500
  '유동성↑': '#3b82f6', // blue-500
};

// 시그널 우선순위 (정렬용)
export const SIGNAL_PRIORITY: Record<Signal, number> = {
  저평가: 1,
  '유동성↑': 2,
  보통: 3,
  '유동성↓': 4,
  고평가: 5,
  주의: 6,
};

// 지표 계산 임계값
export const THRESHOLDS = {
  // 스프레드율 임계값 (%)
  SPREAD_RATE: {
    INSTANT_MATCH: 0.5, // 즉시 체결: ±0.5% 이내
    LOW: -5, // 저평가 기준
    HIGH: 5, // 고평가 기준
  },
  // 예상 수익률 임계값 (%)
  EXPECTED_YIELD: {
    HIGH: 8, // 고수익률 기준
    MEDIUM: 5,
    LOW: 3,
  },
  // 유동성 점수 임계값 (0-100)
  LIQUIDITY_SCORE: {
    HIGH: 70, // 고유동성 기준
    MEDIUM: 40,
    LOW: 20,
  },
  // 가격 모멘텀 임계값 (%)
  MOMENTUM: {
    STRONG_UP: 10,
    UP: 5,
    STABLE: -5,
    DOWN: -10,
  },
  // 대량 주문 기준
  QUANTITY: {
    LARGE: 100,
    MEDIUM: 50,
    SMALL: 10,
  },
};

// 데이터 새로고침 간격 (밀리초)
export const REFRESH_INTERVALS = {
  REALTIME: 60000, // 1분
  NORMAL: 300000, // 5분
  SLOW: 600000, // 10분
};

// 페이지네이션 기본값
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// 차트 색상 팔레트
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  NEUTRAL: '#6b7280',
};

// 카테고리 색상 맵핑 (예시)
export const CATEGORY_COLORS: Record<string, string> = {
  '발라드': '#f87171',
  '랩/힙합': '#fb923c',
  '댄스': '#fbbf24',
  '록/메탈': '#a3e635',
  'R&B/소울': '#4ade80',
  '인디음악': '#2dd4bf',
  '트로트': '#38bdf8',
  '포크/블루스': '#818cf8',
  OST: '#c084fc',
  기타: '#9ca3af',
};

// 에러 메시지
export const ERROR_MESSAGES = {
  FETCH_FAILED: '데이터를 불러오는데 실패했습니다.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.',
  INVALID_DATA: '유효하지 않은 데이터입니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
};
