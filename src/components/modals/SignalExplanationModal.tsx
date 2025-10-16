'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { SIGNAL_COLORS, THRESHOLDS } from '@/lib/constants';
import { Signal } from '@/types/order';

interface SignalInfo {
  name: Signal;
  color: string;
  description: string;
  condition: string;
  characteristic: string;
  priority: number;
}

const SIGNAL_EXPLANATIONS: SignalInfo[] = [
  {
    name: '저평가',
    color: SIGNAL_COLORS['저평가'],
    description: '시장가보다 할인된 가격에 거래되는 주문',
    condition: `스프레드율 < ${THRESHOLDS.SPREAD_RATE.LOW}% AND 유동성 > ${THRESHOLDS.LIQUIDITY_SCORE.MEDIUM}`,
    characteristic: '📊 특징: 시장가보다 낮은 가격',
    priority: 1,
  },
  {
    name: '유동성↑',
    color: SIGNAL_COLORS['유동성↑'],
    description: '거래 주문이 활발한 고유동성 종목',
    condition: `유동성 점수 > ${THRESHOLDS.LIQUIDITY_SCORE.HIGH}`,
    characteristic: '✅ 특징: 거래가 활발한 종목',
    priority: 2,
  },
  {
    name: '보통',
    color: SIGNAL_COLORS['보통'],
    description: '특별한 이슈가 없는 일반적인 주문',
    condition: '다른 시그널 조건에 해당하지 않음',
    characteristic: '📊 특징: 중립적 상태',
    priority: 3,
  },
  {
    name: '유동성↓',
    color: SIGNAL_COLORS['유동성↓'],
    description: '거래 주문이 적은 저유동성 종목',
    condition: `유동성 점수 < ${THRESHOLDS.LIQUIDITY_SCORE.LOW}`,
    characteristic: '⚠️ 특징: 체결이 어려울 수 있음',
    priority: 4,
  },
  {
    name: '고평가',
    color: SIGNAL_COLORS['고평가'],
    description: '시장가보다 프리미엄이 붙은 주문',
    condition: `스프레드율 > ${THRESHOLDS.SPREAD_RATE.HIGH}% AND 유동성 > ${THRESHOLDS.LIQUIDITY_SCORE.MEDIUM}`,
    characteristic: '📊 특징: 시장가보다 높은 가격',
    priority: 5,
  },
  {
    name: '주의',
    color: SIGNAL_COLORS['주의'],
    description: '비정상적인 가격이나 데이터 이상',
    condition: '스프레드율 > 20% OR 가격 ≤ 0',
    characteristic: '🚨 특징: 거래 전 확인 필요',
    priority: 6,
  },
];

export function SignalExplanationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          시그널 분포 이해하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🎯 데이터 시그널 설명</DialogTitle>
          <DialogDescription>
            각 시그널의 의미와 발생 조건을 안내합니다
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {SIGNAL_EXPLANATIONS.map((signal) => (
            <div
              key={signal.name}
              className="border rounded-lg p-5 space-y-3 hover:shadow-md transition-shadow"
              style={{ borderLeftWidth: '4px', borderLeftColor: signal.color }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: signal.color }}
                />
                <h3 className="font-semibold text-xl">{signal.name}</h3>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">{signal.description}</p>

              <div className="bg-muted/50 rounded p-3 space-y-1">
                <p className="text-sm font-mono text-muted-foreground">
                  <span className="font-semibold">발생 조건:</span>
                </p>
                <p className="text-xs font-mono text-muted-foreground">{signal.condition}</p>
              </div>

              <div className="flex items-start gap-2 bg-secondary/30 rounded p-3">
                <span className="text-base font-medium">{signal.characteristic}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-base mb-3">📌 시그널 분석 가이드</h4>
          <ul className="text-base space-y-2 text-muted-foreground">
            <li>• <strong>낮은 호가</strong>: 시장가 대비 낮은 가격 조건</li>
            <li>• <strong>유동성↑</strong>: 활발한 거래 조건</li>
            <li>• <strong>고평가</strong>와 <strong>주의</strong>: 데이터 확인 필요</li>
            <li>• 시그널과 함께 <strong>수익률 이점</strong>, <strong>스프레드율</strong> 등 복합 지표 확인 권장</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
