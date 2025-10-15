/**
 * 주문 데이터 타입 정의
 * 뮤직카우 API에서 받아오는 주문 데이터 구조
 */

export interface Order {
  // API 필드명 그대로 사용
  order_no: string;              // 주문 번호 (고유 ID)
  order_date: string;            // 주문 일시
  song_name: string;             // 곡명
  song_artist: string;           // 아티스트
  song_category: string;         // 카테고리 (저작재산권/저작인접권)
  order_type: '구매' | '판매';    // 주문 타입
  order_status: '대기' | '체결' | '취소';  // 주문 상태
  order_price: number;           // 주문 가격
  order_count: number;           // 주문 수량
  leaves_count: number;          // 남은 수량
  recent_price: number;          // 최근 거래가
  order_royalty_rate: number;    // 저작권료율 (예: 0.082 = 8.2%)
  url_link: string;              // 곡 상세 링크

  // 편의를 위한 추가 필드 (계산 시 생성)
  order_id?: string;             // order_no의 별칭
  order_quantity?: number;       // order_count의 별칭
  song_id?: string;              // URL에서 추출한 곡 ID
  order_user_id?: string;        // 사용자 ID (옵션)
  created_at?: string;
  updated_at?: string;
}

export interface OrderMetrics {
  spread_rate: number;        // 스프레드율 (%)
  expected_yield: number;      // 예상 수익률 (%)
  liquidity_score: number;     // 유동성 점수 (0-100)
  signal: Signal;              // 시그널 분류
  momentum_score?: number;     // 모멘텀 점수 (옵션)
}

export interface OrderWithMetrics extends Order, OrderMetrics {}

export type Signal =
  | '주의'
  | '유동성↓'
  | '보통'
  | '저평가'
  | '고평가'
  | '유동성↑';

export interface SignalDistribution {
  signal: Signal;
  count: number;
  percentage: number;
}

export interface SpreadDistribution {
  range: string;
  count: number;
}
