/**
 * 지표 및 분석 데이터 타입 정의
 */

import { Order, OrderWithMetrics } from './order';

export interface SummaryMetrics {
  total_orders: number;
  buy_orders: number;
  sell_orders: number;
  avg_spread_rate: number;
  avg_expected_yield: number;
  avg_liquidity_score: number;
  instant_match_count: number;
  high_yield_count: number;
  undervalued_count: number;
  timestamp: string;
}

export interface MomentumData {
  song_name: string;
  song_artist: string;
  prices: number[];
  dates: string[];
  trend: 'up' | 'down' | 'stable';
  momentum_score: number;
  recent_change_percent: number;
}

export interface CategoryAnalysis {
  category: string;
  order_count: number;
  avg_price: number;
  avg_spread: number;
  avg_yield: number;
}

export interface TimePattern {
  hour: number;
  order_count: number;
  avg_spread: number;
  avg_price: number;
}

export interface ValueOpportunity {
  order: OrderWithMetrics;
  value_score: number;
  reasons: string[];
}

export interface LiquidityMetrics {
  song_name: string;
  buy_count: number;
  sell_count: number;
  avg_spread: number;
  liquidity_score: number;
  depth_score: number;
  frequency_score: number;
}
