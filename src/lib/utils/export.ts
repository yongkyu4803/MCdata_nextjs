/**
 * 데이터 내보내기 유틸리티
 * CSV, JSON 형식으로 데이터를 다운로드할 수 있는 함수들
 */

import { OrderWithMetrics } from '@/types/order';
import { format } from 'date-fns';

/**
 * 객체 배열을 CSV 문자열로 변환
 */
export function convertToCSV(data: OrderWithMetrics[]): string {
  if (data.length === 0) return '';

  // CSV 헤더 정의
  const headers = [
    '주문ID',
    '주문일시',
    '곡명',
    '아티스트',
    '카테고리',
    '주문타입',
    '주문상태',
    '주문가격',
    '최근거래가',
    '주문수량',
    '저작권료율(%)',
    '스프레드율(%)',
    '예상수익률(%)',
    '유동성점수',
    '시그널',
  ];

  // CSV 행 생성
  const rows = data.map((order) => [
    order.order_id || order.order_no,
    order.order_date,
    `"${order.song_name}"`, // 쉼표 포함 대비 따옴표
    `"${order.song_artist}"`,
    order.song_category,
    order.order_type,
    order.order_status,
    order.order_price,
    order.recent_price,
    order.order_quantity || order.order_count,
    (order.order_royalty_rate * 100).toFixed(2), // 0.082 → 8.2%로 변환
    order.spread_rate?.toFixed(2) ?? '0.00',
    order.expected_yield?.toFixed(2) ?? '0.00',
    order.liquidity_score?.toFixed(1) ?? '0.0',
    order.signal,
  ]);

  // CSV 문자열 생성
  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  // UTF-8 BOM 추가 (Excel에서 한글 깨짐 방지)
  return '\uFEFF' + csvContent;
}

/**
 * CSV 파일 다운로드
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * JSON 파일 다운로드
 */
export function downloadJSON(data: OrderWithMetrics[], filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * 현재 날짜/시간이 포함된 파일명 생성
 */
export function generateFilename(prefix: string, extension: 'csv' | 'json'): string {
  const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * 필터링된 데이터를 CSV로 내보내기
 */
export function exportFilteredData(
  data: OrderWithMetrics[],
  filterName: string = 'musicow_orders'
): void {
  const csv = convertToCSV(data);
  const filename = generateFilename(filterName, 'csv');
  downloadCSV(csv, filename);
}

/**
 * 필터링된 데이터를 JSON으로 내보내기
 */
export function exportFilteredDataJSON(
  data: OrderWithMetrics[],
  filterName: string = 'musicow_orders'
): void {
  const filename = generateFilename(filterName, 'json');
  downloadJSON(data, filename);
}
