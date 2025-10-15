/**
 * 데이터 포맷팅 유틸리티 함수
 */

import { format as dateFnsFormat } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 숫자를 원화 형식으로 포맷
 * @param value 숫자 값
 * @returns 포맷된 문자열 (예: "1,234,567원")
 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '₩0';
  }
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * 숫자를 천 단위 구분자와 함께 포맷
 * @param value 숫자 값
 * @param decimals 소수점 자릿수 (기본: 0)
 * @returns 포맷된 문자열 (예: "1,234.56")
 */
export function formatNumber(value: number | null | undefined, decimals: number = 0): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * 퍼센트 값 포맷
 * @param value 퍼센트 값
 * @param decimals 소수점 자릿수 (기본: 2)
 * @param showSign 부호 표시 여부 (기본: true)
 * @returns 포맷된 문자열 (예: "+12.34%")
 */
export function formatPercent(
  value: number | null | undefined,
  decimals: number = 2,
  showSign: boolean = true
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00%';
  }
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${formatNumber(value, decimals)}%`;
}

/**
 * 날짜 포맷
 * @param date 날짜 문자열 또는 Date 객체
 * @param formatString 포맷 문자열 (기본: "yyyy-MM-dd HH:mm")
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(
  date: string | Date,
  formatString: string = 'yyyy-MM-dd HH:mm'
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateFnsFormat(dateObj, formatString, { locale: ko });
  } catch {
    return '-';
  }
}

/**
 * 상대 시간 표시 (예: "5분 전", "2시간 전")
 * @param date 날짜 문자열 또는 Date 객체
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return formatDate(dateObj, 'yyyy-MM-dd');
}

/**
 * 큰 숫자를 축약 형식으로 포맷 (예: 1.2K, 3.4M)
 * @param value 숫자 값
 * @returns 축약된 문자열
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * 텍스트 생략 (ellipsis)
 * @param text 원본 텍스트
 * @param maxLength 최대 길이
 * @returns 생략된 텍스트
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * 안전한 숫자 파싱
 * @param value 파싱할 값
 * @param fallback 실패 시 반환 값 (기본: 0)
 * @returns 파싱된 숫자
 */
export function safeParseNumber(value: any, fallback: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? fallback : parsed;
}
