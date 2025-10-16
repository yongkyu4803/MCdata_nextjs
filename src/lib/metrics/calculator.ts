/**
 * MetricsCalculator 클래스
 * Python의 MetricsEngine을 TypeScript로 변환
 * 주문 데이터에 대한 각종 지표를 계산
 */

import { Order, OrderWithMetrics, Signal } from '@/types/order';
import { MomentumData, LiquidityMetrics } from '@/types/metrics';
import { THRESHOLDS } from '@/lib/constants';

export class MetricsCalculator {
  /**
   * 스프레드율 계산
   * 공식: (order_price - recent_price) / recent_price * 100
   * @param orderPrice 주문 가격
   * @param recentPrice 최근 거래가
   * @returns 스프레드율 (%)
   */
  calculateSpreadRate(orderPrice: number, recentPrice: number): number {
    if (!recentPrice || recentPrice === 0) return 0;
    return ((orderPrice - recentPrice) / recentPrice) * 100;
  }

  /**
   * 기준 수익률 계산 (시장가 기준)
   * 공식: royalty_rate * 100
   *
   * 설명:
   * - 최근 거래가로 매수했을 때 기대할 수 있는 연간 수익률
   * - 모든 주문을 비교할 수 있는 기준점 제공
   * - 저작권료율과 동일한 값 (정규화된 비교 기준)
   *
   * @param royaltyRate 저작권료율 (소수점, 예: 0.082)
   * @returns 기준 수익률 (%)
   */
  calculateBaseYield(royaltyRate: number): number {
    return royaltyRate * 100;
  }

  /**
   * 주문가 대비 수익률 계산
   * 공식: (royalty_rate * recent_price) / order_price * 100
   *
   * 설명:
   * - royalty_rate: 연간 저작권료율 (예: 0.082 = 8.2%)
   * - recent_price: 최근 거래가 (기준 가격)
   * - order_price: 주문 가격 (실제 투자 금액)
   * - 수익률 = (연간 저작권 수익 / 투자 금액) × 100
   *
   * 예시: royalty_rate=0.082, recent_price=15400, order_price=20100
   * → (0.082 × 15400) / 20100 × 100 = 6.28%
   *
   * @param royaltyRate 저작권료율 (소수점, 예: 0.082)
   * @param recentPrice 최근 거래가
   * @param orderPrice 주문 가격
   * @returns 주문가 대비 수익률 (%)
   */
  calculateExpectedYield(
    royaltyRate: number,
    recentPrice: number,
    orderPrice: number
  ): number {
    if (!orderPrice || orderPrice === 0) return 0;
    if (!recentPrice || recentPrice === 0) return 0;

    // 연간 저작권 수익 = royalty_rate * recent_price
    // 수익률 = (연간 수익 / 투자금) * 100
    return ((royaltyRate * recentPrice) / orderPrice) * 100;
  }

  /**
   * 수익률 이점 계산
   * 공식: 주문가율 - 기준율
   *
   * 설명:
   * - 시장가 대비 이 주문의 수익률이 얼마나 유리한지/불리한지
   * - 양수: 할인된 가격으로 더 높은 수익률
   * - 음수: 프리미엄 가격으로 더 낮은 수익률
   *
   * 예시: 주문가율=6.28%, 기준율=8.2% → -1.92% (불리)
   * 예시: 주문가율=10.25%, 기준율=8.2% → +2.05% (유리)
   *
   * @param orderYield 주문가 대비 수익률
   * @param baseYield 기준 수익률
   * @returns 수익률 이점 (%)
   */
  calculateYieldAdvantage(orderYield: number, baseYield: number): number {
    return orderYield - baseYield;
  }

  /**
   * 유동성 점수 계산
   * 공식: spread_score * 0.4 + depth_score * 0.3 + frequency_score * 0.3
   * @param order 현재 주문
   * @param allOrders 전체 주문 목록 (같은 곡)
   * @returns 유동성 점수 (0-100)
   */
  calculateLiquidityScore(order: Order, allOrders: Order[]): number {
    // 같은 곡의 주문만 필터링
    const songOrders = allOrders.filter((o) => o.song_id === order.song_id);

    if (songOrders.length === 0) return 0;

    // 1. 스프레드 점수 (0-100)
    // 스프레드가 작을수록 높은 점수
    const avgSpread = this.calculateAverageSpread(songOrders);
    const spreadScore = Math.max(0, 100 - Math.abs(avgSpread) * 5);

    // 2. 호가 깊이 점수 (0-100)
    // 매수/매도 주문 균형과 수량을 고려
    const depthScore = this.calculateDepthScore(songOrders);

    // 3. 거래 빈도 점수 (0-100)
    // 최근 주문 수를 기반으로 계산
    const frequencyScore = Math.min(100, (songOrders.length / 50) * 100);

    // 가중 평균
    return spreadScore * 0.4 + depthScore * 0.3 + frequencyScore * 0.3;
  }

  /**
   * 평균 스프레드 계산 (내부 헬퍼)
   */
  private calculateAverageSpread(orders: Order[]): number {
    if (orders.length === 0) return 0;
    const spreads = orders.map((o) =>
      this.calculateSpreadRate(o.order_price, o.recent_price)
    );
    return spreads.reduce((sum, s) => sum + s, 0) / spreads.length;
  }

  /**
   * 호가 깊이 점수 계산 (내부 헬퍼)
   */
  private calculateDepthScore(orders: Order[]): number {
    const buyOrders = orders.filter((o) => o.order_type === '구매');
    const sellOrders = orders.filter((o) => o.order_type === '판매');

    const buyVolume = buyOrders.reduce((sum, o) => sum + (o.order_quantity || 0), 0);
    const sellVolume = sellOrders.reduce(
      (sum, o) => sum + (o.order_quantity || 0),
      0
    );

    const totalVolume = buyVolume + sellVolume;
    if (totalVolume === 0) return 0;

    // 매수/매도 균형 점수 (50:50에 가까울수록 높은 점수)
    const balance = Math.min(buyVolume, sellVolume) / (totalVolume / 2);
    const balanceScore = balance * 50;

    // 전체 거래량 점수
    const volumeScore = Math.min(50, (totalVolume / 1000) * 50);

    return balanceScore + volumeScore;
  }

  /**
   * 가격 모멘텀 계산
   * 최근 가격 변화 추세를 분석
   * @param orders 시간순 정렬된 주문 목록
   * @param songId 곡 ID
   * @returns 모멘텀 데이터
   */
  calculatePriceMomentum(orders: Order[], songId: string): MomentumData {
    const songOrders = orders
      .filter((o) => o.song_id === songId)
      .sort(
        (a, b) =>
          new Date(a.order_date).getTime() - new Date(b.order_date).getTime()
      );

    if (songOrders.length < 2) {
      return {
        song_name: songOrders[0]?.song_name || '',
        song_artist: songOrders[0]?.song_artist || '',
        prices: [],
        dates: [],
        trend: 'stable',
        momentum_score: 0,
        recent_change_percent: 0,
      };
    }

    const prices = songOrders.map((o) => o.order_price);
    const dates = songOrders.map((o) => o.order_date);

    // 최근 가격 변화율 계산
    const recentPrice = prices[prices.length - 1];
    const oldPrice = prices[0];
    const recentChangePercent =
      oldPrice !== 0 ? ((recentPrice - oldPrice) / oldPrice) * 100 : 0;

    // 추세 결정
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (recentChangePercent > THRESHOLDS.MOMENTUM.UP) trend = 'up';
    else if (recentChangePercent < THRESHOLDS.MOMENTUM.DOWN) trend = 'down';

    // 모멘텀 점수 (-100 ~ 100)
    const momentumScore = Math.max(-100, Math.min(100, recentChangePercent));

    return {
      song_name: songOrders[0].song_name,
      song_artist: songOrders[0].song_artist,
      prices,
      dates,
      trend,
      momentum_score: momentumScore,
      recent_change_percent: recentChangePercent,
    };
  }

  /**
   * 시그널 생성
   * 스프레드율과 유동성 점수를 기반으로 투자 시그널 생성
   * @param order 주문
   * @param spreadRate 스프레드율
   * @param liquidityScore 유동성 점수
   * @returns 시그널
   */
  generateSignal(
    order: Order,
    spreadRate: number,
    liquidityScore: number
  ): Signal {
    const { SPREAD_RATE, LIQUIDITY_SCORE } = THRESHOLDS;

    // 1. 주의 시그널 (비정상적인 가격)
    if (
      Math.abs(spreadRate) > 20 ||
      order.order_price <= 0 ||
      order.recent_price <= 0
    ) {
      return '주의';
    }

    // 2. 저평가 시그널 (할인된 가격)
    if (
      spreadRate < SPREAD_RATE.LOW &&
      liquidityScore > LIQUIDITY_SCORE.MEDIUM
    ) {
      return '저평가';
    }

    // 3. 고평가 시그널 (프리미엄 가격)
    if (
      spreadRate > SPREAD_RATE.HIGH &&
      liquidityScore > LIQUIDITY_SCORE.MEDIUM
    ) {
      return '고평가';
    }

    // 4. 고유동성 시그널
    if (liquidityScore > LIQUIDITY_SCORE.HIGH) {
      return '유동성↑';
    }

    // 5. 저유동성 시그널
    if (liquidityScore < LIQUIDITY_SCORE.LOW) {
      return '유동성↓';
    }

    // 6. 보통
    return '보통';
  }

  /**
   * 배치 지표 계산
   * 전체 주문 목록에 대해 모든 지표를 한 번에 계산
   * @param orders 전체 주문 목록
   * @returns 지표가 추가된 주문 목록
   */
  calculateBatchMetrics(orders: Order[]): OrderWithMetrics[] {
    return orders.map((order) => {
      const spreadRate = this.calculateSpreadRate(
        order.order_price,
        order.recent_price
      );

      const baseYield = this.calculateBaseYield(order.order_royalty_rate);

      const expectedYield = this.calculateExpectedYield(
        order.order_royalty_rate,
        order.recent_price,
        order.order_price
      );

      const yieldAdvantage = this.calculateYieldAdvantage(
        expectedYield,
        baseYield
      );

      const liquidityScore = this.calculateLiquidityScore(order, orders);

      const signal = this.generateSignal(order, spreadRate, liquidityScore);

      return {
        ...order,
        spread_rate: spreadRate,
        base_yield: baseYield,
        expected_yield: expectedYield,
        yield_advantage: yieldAdvantage,
        liquidity_score: liquidityScore,
        signal,
      };
    });
  }

  /**
   * 유동성 메트릭스 계산 (곡별)
   * @param orders 전체 주문 목록
   * @param songId 곡 ID
   * @returns 유동성 메트릭스
   */
  calculateLiquidityMetrics(
    orders: Order[],
    songId: string
  ): LiquidityMetrics {
    const songOrders = orders.filter((o) => o.song_id === songId);

    if (songOrders.length === 0) {
      return {
        song_name: '',
        buy_count: 0,
        sell_count: 0,
        avg_spread: 0,
        liquidity_score: 0,
        depth_score: 0,
        frequency_score: 0,
      };
    }

    const buyCount = songOrders.filter((o) => o.order_type === '구매').length;
    const sellCount = songOrders.filter((o) => o.order_type === '판매').length;
    const avgSpread = this.calculateAverageSpread(songOrders);
    const liquidityScore = this.calculateLiquidityScore(
      songOrders[0],
      orders
    );
    const depthScore = this.calculateDepthScore(songOrders);
    const frequencyScore = Math.min(100, (songOrders.length / 50) * 100);

    return {
      song_name: songOrders[0].song_name,
      buy_count: buyCount,
      sell_count: sellCount,
      avg_spread: avgSpread,
      liquidity_score: liquidityScore,
      depth_score: depthScore,
      frequency_score: frequencyScore,
    };
  }
}

// 싱글톤 인스턴스 생성
export const metricsCalculator = new MetricsCalculator();
