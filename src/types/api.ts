/**
 * API 요청/응답 타입 정의
 */

import { OrderWithMetrics, Order } from './order';
import {
  SummaryMetrics,
  MomentumData,
  CategoryAnalysis,
  TimePattern,
  ValueOpportunity,
} from './metrics';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  error?: string;
}

export interface OrdersResponse extends ApiResponse<OrderWithMetrics[]> {}

export interface SummaryResponse extends ApiResponse<SummaryMetrics> {}

export interface MomentumResponse extends ApiResponse<MomentumData[]> {}

export interface CategoryResponse extends ApiResponse<CategoryAnalysis[]> {}

export interface TimePatternResponse extends ApiResponse<TimePattern[]> {}

export interface ValueOpportunitiesResponse
  extends ApiResponse<ValueOpportunity[]> {}

export interface FilterParams {
  orderTypes?: ('구매' | '판매')[];
  signals?: string[];
  spreadRange?: [number, number];
  minQuantity?: number;
  searchQuery?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}
