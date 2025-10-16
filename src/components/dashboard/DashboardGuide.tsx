'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, DollarSign, Zap, Shield, BarChart3, PieChart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    title: '즉시 체결',
    icon: <Zap className="h-5 w-5" />,
    badge: '단기 매매',
    badgeColor: 'bg-yellow-500',
    description: '현재 호가와 최근 거래가의 차이가 거의 없어 즉시 체결 가능한 주문들을 분석합니다.',
    metrics: [
      {
        label: '스프레드율 ±0.5% 이내',
        explanation: '주문가격과 최근 거래가의 차이가 매우 작아 즉시 거래가 가능합니다.',
      },
    ],
    interpretation: [
      '✅ 시장 가격에 근접한 호가 조건',
      '✅ 스프레드가 좁은 상태',
      '⚠️ 스프레드 외에도 수익률과 유동성 지표 함께 확인 필요',
    ],
    useCase: '즉시 거래가 필요하거나, 시장가로 거래하고 싶을 때',
  },
  {
    title: '가격 모멘텀',
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
      '📈 상승 모멘텀: 인기 증가, 수요 증가 신호',
      '📉 하락 모멘텀: 관심 감소, 공급 과잉 신호',
      '⚖️ 안정 추세: 시장이 균형을 이룬 상태',
    ],
    useCase: '트렌드를 파악하거나 시장 흐름을 분석할 때',
  },
  {
    title: '주문가 대비 수익률 Top 100',
    icon: <DollarSign className="h-5 w-5" />,
    badge: '수익률 기준',
    badgeColor: 'bg-green-500',
    description: '계산된 예상 수익률이 상위권인 100개 주문을 표시합니다.',
    metrics: [
      {
        label: '예상 수익률',
        explanation: '(저작권료율 × 최근거래가) ÷ 주문가격 × 100으로 계산됩니다.',
      },
      {
        label: '계산 예시',
        explanation: '저작권료율 8.2%, 최근거래가 15,400원, 주문가격 20,100원 → 6.28% 수치',
      },
    ],
    interpretation: [
      '💚 8% 이상: 상위 구간',
      '💛 5~8%: 중간 구간',
      '💙 3~5%: 하위 구간',
    ],
    useCase: '수익률 수치를 기준으로 종목을 비교할 때',
  },
  {
    title: '낮은 호가 Top 100',
    icon: <TrendingUp className="h-5 w-5 rotate-180" />,
    badge: '가치 분석',
    badgeColor: 'bg-emerald-500',
    description: '시장 가격 대비 낮은 호가의 주문 100개를 표시합니다. 스프레드율이 -5% 이하이면서 유동성이 좋은 종목입니다.',
    metrics: [
      {
        label: '스프레드율 < -5%',
        explanation: '주문가격이 최근 거래가보다 5% 이상 낮은 상태입니다.',
      },
      {
        label: '유동성 점수 > 40',
        explanation: '거래가 활발하여 원하는 시점에 거래할 수 있는 가능성이 높습니다.',
      },
    ],
    interpretation: [
      '🎯 시장가보다 할인된 가격 조건',
      '📊 유동성이 충분한 거래 환경',
      '⏰ 시장이 아직 가치를 인정하지 않은 종목',
    ],
    useCase: '시장가 대비 낮은 호가의 종목을 찾을 때',
  },
  {
    title: '고유동성 Top 10',
    icon: <BarChart3 className="h-5 w-5" />,
    badge: '안정성',
    badgeColor: 'bg-cyan-500',
    description: '거래량이 많고 호가가 균형을 이루는 종목들입니다. 원하는 시점에 쉽게 거래할 수 있습니다.',
    metrics: [
      {
        label: '유동성 점수 구성',
        explanation: '스프레드 점수(40%) + 호가 깊이(30%) + 거래 빈도(30%)로 계산됩니다.',
      },
      {
        label: '점수 70+ = 고유동성',
        explanation: '거래가 활발하고 스프레드가 좁아 언제든 거래 가능한 상태입니다.',
      },
    ],
    interpretation: [
      '✅ 거래 주문이 많은 상태',
      '✅ 가격 변동성이 상대적으로 낮음',
      '✅ 매수/매도 호가 균형',
    ],
    useCase: '유동성이 높은 종목을 찾을 때',
  },
  {
    title: '가치 분석 필터',
    icon: <Shield className="h-5 w-5" />,
    badge: '종합 분석',
    badgeColor: 'bg-purple-500',
    description: '수익률, 호가 수준, 유동성을 모두 고려한 종합 점수가 높은 종목들입니다.',
    metrics: [
      {
        label: '종합 점수 계산',
        explanation: '수익률(40%) + 호가 우위도(30%) + 유동성(30%)의 가중 평균입니다.',
      },
      {
        label: '균형 분석',
        explanation: '한 가지 요소만 좋은 것이 아닌, 모든 지표가 균형잡힌 종목입니다.',
      },
    ],
    interpretation: [
      '🏆 여러 지표의 균형',
      '💎 복합 조건 충족 종목',
      '🛡️ 다각도 분석으로 검증된 종목',
    ],
    useCase: '수익률과 유동성을 동시에 고려할 때',
  },
  {
    title: '카테고리 분석',
    icon: <PieChart className="h-5 w-5" />,
    badge: '장르별',
    badgeColor: 'bg-orange-500',
    description: '음악 저작권 종류(저작재산권/저작인접권)와 장르별 시장 동향을 분석합니다.',
    metrics: [
      {
        label: '카테고리별 비교',
        explanation: '장르별 평균 수익률, 스프레드율, 유동성을 비교 분석합니다.',
      },
    ],
    interpretation: [
      '🎵 인기 장르 파악: 거래량이 많은 장르는 유동성이 높음',
      '💰 수익률 상위 장르: 특정 장르의 평균 수익률이 상대적으로 높음',
      '📈 성장 장르: 최근 관심이 증가하는 장르 발굴',
    ],
    useCase: '다양한 장르별 현황을 파악하거나, 특정 장르를 집중 분석할 때',
  },
  {
    title: '시간 패턴',
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
];

export function DashboardGuide() {
  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-purple-500 p-2">
            <Info className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">대시보드 가이드</CardTitle>
            <CardDescription className="mt-1">
              각 분석 탭을 클릭하여 자세한 설명을 확인하세요
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 버튼 그리드 */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {guideSections.map((section, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto flex items-center justify-between gap-3 p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className="font-semibold text-sm">{section.title}</span>
                  </div>
                  <Badge className={`${section.badgeColor} text-white text-xs shrink-0`}>
                    {section.badge}
                  </Badge>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    {section.icon}
                    {section.title}
                  </DialogTitle>
                  <DialogDescription className="text-base pt-2">
                    {section.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                  {/* 핵심 지표 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">📊</span>
                      핵심 지표
                    </h4>
                    <div className="space-y-3">
                      {section.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                          <p className="font-medium text-gray-900 mb-1">{metric.label}</p>
                          <p className="text-sm text-gray-600">{metric.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 해석 가이드 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">💡</span>
                      해석 가이드
                    </h4>
                    <ul className="space-y-2">
                      {section.interpretation.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2 bg-white rounded-lg p-3 border">
                          <span className="text-purple-500 mt-0.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 활용 사례 */}
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      이럴 때 활용하세요
                    </h4>
                    <p className="text-sm text-purple-800">{section.useCase}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* 하단 투자 팁 */}
        <div className="mt-6 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-500 p-1.5 mt-0.5">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">💡 분석 가이드</h4>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• <strong>다각도 분석</strong>: 여러 지표를 조합하여 종합적으로 분석하세요</li>
                <li>• <strong>정기 모니터링</strong>: 시장 상황은 계속 변하므로 주기적으로 확인하세요</li>
                <li>• <strong>복합 지표 확인</strong>: 수익률 외에도 유동성, 스프레드율 등 여러 지표를 함께 확인하세요</li>
                <li>• <strong>장기 데이터 관찰</strong>: 음악 저작권 시장은 단기 변동보다 장기 추세 파악이 중요합니다</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
