'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Info, TrendingUp, DollarSign, Zap, Shield, BarChart3, PieChart, Clock } from 'lucide-react';
import { useState } from 'react';

interface GuideSection {
  title: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  description: string;
  metrics: {
    label: string;
    explanation: string;
  }[];
  interpretation: string[];
  useCase: string;
}

const guideSections: GuideSection[] = [
  {
    title: '⚡ 즉시 체결',
    icon: <Zap className="h-5 w-5" />,
    badge: '단기 매매',
    badgeColor: 'bg-yellow-500',
    description: '현재 호가와 최근 거래가의 차이가 거의 없어 즉시 체결 가능한 주문들을 분석합니다.',
    metrics: [
      {
        label: '스프레드율 ±0.5% 이내',
        explanation: '주문가격과 최근 거래가의 차이가 매우 작아 즉시 매수/매도가 가능합니다.',
      },
    ],
    interpretation: [
      '✅ 시장 가격에 근접한 호가로 빠른 체결을 원할 때 유용',
      '✅ 단기 트레이딩이나 긴급 현금화가 필요한 경우',
      '⚠️ 스프레드가 작아도 수익률과 유동성을 함께 고려해야 함',
    ],
    useCase: '급하게 매수/매도가 필요하거나, 시장가로 거래하고 싶을 때',
  },
  {
    title: '💹 가격 모멘텀',
    icon: <TrendingUp className="h-5 w-5" />,
    badge: '추세 분석',
    badgeColor: 'bg-purple-500',
    description: '곡별 가격 변동 추세를 분석하여 상승/하락 모멘텀이 강한 종목을 찾아냅니다.',
    metrics: [
      {
        label: '모멘텀 점수',
        explanation: '최근 주문들의 가격 변화율을 분석한 점수입니다. (+)는 상승, (-)는 하락 추세를 의미합니다.',
      },
      {
        label: '가격 변화율',
        explanation: '일정 기간 동안의 가격 변동 폭을 백분율로 표시합니다.',
      },
    ],
    interpretation: [
      '📈 상승 모멘텀: 인기 증가, 수요 증가 신호 → 추가 상승 가능성',
      '📉 하락 모멘텀: 관심 감소, 공급 과잉 신호 → 저가 매수 기회',
      '⚖️ 안정 추세: 시장이 균형을 이룬 상태 → 안정적 투자 가능',
    ],
    useCase: '트렌드를 따라가거나 역추세 투자 전략을 세울 때',
  },
  {
    title: '💰 고수익률 Top 10',
    icon: <DollarSign className="h-5 w-5" />,
    badge: '수익 중심',
    badgeColor: 'bg-green-500',
    description: '예상 연간 수익률이 가장 높은 상위 10개 주문을 선별합니다.',
    metrics: [
      {
        label: '예상 수익률',
        explanation: '(저작권료율 × 최근거래가) ÷ 주문가격 × 100으로 계산됩니다. 연간 예상 수익률을 의미합니다.',
      },
      {
        label: '계산 예시',
        explanation: '저작권료율 8.2%, 최근거래가 15,400원, 주문가격 20,100원 → 6.28% 수익률',
      },
    ],
    interpretation: [
      '💚 8% 이상: 매우 높은 수익률 (고위험 가능성 점검 필요)',
      '💛 5~8%: 양호한 수익률 (안정성과 균형)',
      '💙 3~5%: 보수적 수익률 (안정적 투자)',
    ],
    useCase: '수익률을 최우선으로 고려하는 투자자에게 적합',
  },
  {
    title: '🔻 저평가 Top 10',
    icon: <TrendingUp className="h-5 w-5 rotate-180" />,
    badge: '가치 투자',
    badgeColor: 'bg-emerald-500',
    description: '시장 가격 대비 저평가된 주문들을 찾아냅니다. 스프레드율이 -5% 이하이면서 유동성이 좋은 종목입니다.',
    metrics: [
      {
        label: '스프레드율 < -5%',
        explanation: '주문가격이 최근 거래가보다 5% 이상 낮아 저평가된 상태입니다.',
      },
      {
        label: '유동성 점수 > 40',
        explanation: '거래가 활발하여 원하는 시점에 매도할 수 있는 가능성이 높습니다.',
      },
    ],
    interpretation: [
      '🎯 할인된 가격에 구매할 수 있는 기회',
      '📊 유동성이 충분해 향후 정상 가격에 매도 가능',
      '⏰ 시장이 아직 가치를 인정하지 않은 종목',
    ],
    useCase: '장기 투자 관점에서 저가 매수 기회를 찾을 때',
  },
  {
    title: '🌊 고유동성 Top 10',
    icon: <BarChart3 className="h-5 w-5" />,
    badge: '안정성',
    badgeColor: 'bg-cyan-500',
    description: '거래량이 많고 매수/매도 호가가 균형을 이루는 종목들입니다. 원하는 시점에 쉽게 현금화할 수 있습니다.',
    metrics: [
      {
        label: '유동성 점수 구성',
        explanation: '스프레드 점수(40%) + 호가 깊이(30%) + 거래 빈도(30%)로 계산됩니다.',
      },
      {
        label: '점수 70+ = 고유동성',
        explanation: '매수/매도가 활발하고 스프레드가 좁아 언제든 거래 가능한 상태입니다.',
      },
    ],
    interpretation: [
      '✅ 안전한 진입/청산 가능',
      '✅ 가격 변동성이 적고 예측 가능',
      '✅ 긴급 현금화가 필요할 때 유리',
    ],
    useCase: '리스크를 최소화하고 안정적으로 운용하고 싶을 때',
  },
  {
    title: '🎯 가치 투자 기회',
    icon: <Shield className="h-5 w-5" />,
    badge: '종합 분석',
    badgeColor: 'bg-purple-500',
    description: '수익률, 저평가, 유동성을 모두 고려한 종합 점수가 높은 종목들입니다.',
    metrics: [
      {
        label: '종합 점수 계산',
        explanation: '수익률(40%) + 저평가도(30%) + 유동성(30%)의 가중 평균입니다.',
      },
      {
        label: '밸런스 투자',
        explanation: '한 가지 요소만 좋은 것이 아닌, 모든 지표가 균형잡힌 종목입니다.',
      },
    ],
    interpretation: [
      '🏆 리스크와 수익의 최적 밸런스',
      '💎 장기 보유 시 안정적 수익 기대',
      '🛡️ 다각도 분석으로 검증된 종목',
    ],
    useCase: '공격적 투자와 안정성을 동시에 추구할 때',
  },
  {
    title: '📊 카테고리 분석',
    icon: <PieChart className="h-5 w-5" />,
    badge: '장르별',
    badgeColor: 'bg-orange-500',
    description: '음악 저작권 종류(저작재산권/저작인접권)와 장르별 시장 동향을 분석합니다.',
    metrics: [
      {
        label: '카테고리별 비교',
        explanation: '장르별 평균 수익률, 스프레드율, 유동성을 비교하여 어느 장르가 유리한지 파악합니다.',
      },
    ],
    interpretation: [
      '🎵 인기 장르 파악: 거래량이 많은 장르는 유동성이 높음',
      '💰 고수익 장르: 특정 장르가 평균적으로 높은 수익률 제공',
      '📈 성장 장르: 최근 관심이 증가하는 장르 발굴',
    ],
    useCase: '포트폴리오를 다양한 장르로 분산하거나, 특정 장르에 집중 투자할 때',
  },
  {
    title: '⏰ 시간 패턴',
    icon: <Clock className="h-5 w-5" />,
    badge: '시계열',
    badgeColor: 'bg-pink-500',
    description: '시간대별, 요일별 거래 패턴과 가격 변동 추이를 분석합니다.',
    metrics: [
      {
        label: '시간대별 활동',
        explanation: '어느 시간대에 거래가 활발한지, 가격 변동이 큰지 파악합니다.',
      },
    ],
    interpretation: [
      '⏰ 거래 피크 타임: 유동성이 가장 높은 시간대',
      '📉 저조한 시간대: 스프레드가 넓어질 수 있는 구간',
      '🔄 주기적 패턴: 규칙적인 변동 패턴 발견',
    ],
    useCase: '최적의 거래 타이밍을 잡고 싶을 때',
  },
  {
    title: '📋 전체 데이터',
    icon: <Info className="h-5 w-5" />,
    badge: '전체 보기',
    badgeColor: 'bg-gray-500',
    description: '모든 주문 데이터를 한눈에 보고, 직접 필터링하고 정렬할 수 있습니다.',
    metrics: [
      {
        label: '자유로운 탐색',
        explanation: '모든 데이터에 접근하여 나만의 기준으로 종목을 선별할 수 있습니다.',
      },
    ],
    interpretation: [
      '🔍 맞춤형 필터링으로 원하는 조건의 종목 검색',
      '📊 다양한 정렬 기준 적용',
      '💾 필요한 데이터만 CSV로 내보내기',
    ],
    useCase: '특정 조건에 맞는 종목을 직접 찾고 싶을 때',
  },
];

export function DashboardGuide() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  const toggleAll = () => {
    if (openSections.size === guideSections.length) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(guideSections.map((_, i) => i)));
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-500 p-2">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">📖 대시보드 가이드</CardTitle>
              <CardDescription className="mt-1">
                각 분석 탭의 의미와 활용법을 확인하세요
              </CardDescription>
            </div>
          </div>
          <button
            onClick={toggleAll}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            {openSections.size === guideSections.length ? '모두 접기' : '모두 펼치기'}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {guideSections.map((section, index) => (
          <Collapsible
            key={index}
            open={openSections.has(index)}
            onOpenChange={() => toggleSection(index)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between rounded-lg border bg-white p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className="font-semibold text-left">{section.title}</span>
                  </div>
                  <Badge className={`${section.badgeColor} text-white`}>
                    {section.badge}
                  </Badge>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openSections.has(index) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 rounded-lg border bg-white p-5 space-y-4">
                {/* 설명 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">📌 개요</h4>
                  <p className="text-sm text-gray-700">{section.description}</p>
                </div>

                {/* 지표 설명 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">📊 핵심 지표</h4>
                  <div className="space-y-2">
                    {section.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-gray-50 rounded p-3">
                        <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{metric.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 해석 방법 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">💡 해석 가이드</h4>
                  <ul className="space-y-1">
                    {section.interpretation.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 활용 사례 */}
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-1 text-sm">🎯 이럴 때 활용하세요</h4>
                  <p className="text-sm text-purple-800">{section.useCase}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* 하단 팁 */}
        <div className="mt-6 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-500 p-1.5 mt-0.5">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">💡 투자 팁</h4>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• <strong>분산 투자</strong>: 여러 지표를 조합하여 포트폴리오를 구성하세요</li>
                <li>• <strong>정기 모니터링</strong>: 시장 상황은 계속 변하므로 주기적으로 확인하세요</li>
                <li>• <strong>리스크 관리</strong>: 높은 수익률만 보지 말고 유동성도 함께 고려하세요</li>
                <li>• <strong>장기 관점</strong>: 음악 저작권은 장기 투자 상품입니다. 단기 변동에 흔들리지 마세요</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
