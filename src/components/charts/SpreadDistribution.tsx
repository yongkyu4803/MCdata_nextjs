'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { OrderWithMetrics } from '@/types/order';
import { CHART_COLORS } from '@/lib/constants';

interface Props {
  data: OrderWithMetrics[];
}

export function SpreadDistribution({ data }: Props) {
  // 스프레드율을 구간별로 분류
  const ranges = [
    { label: '< -20%', min: -Infinity, max: -20 },
    { label: '-20 ~ -10%', min: -20, max: -10 },
    { label: '-10 ~ -5%', min: -10, max: -5 },
    { label: '-5 ~ 0%', min: -5, max: 0 },
    { label: '0 ~ 5%', min: 0, max: 5 },
    { label: '5 ~ 10%', min: 5, max: 10 },
    { label: '10 ~ 20%', min: 10, max: 20 },
    { label: '> 20%', min: 20, max: Infinity },
  ];

  const chartData = ranges.map((range) => ({
    range: range.label,
    count: data.filter(
      (o) => o.spread_rate >= range.min && o.spread_rate < range.max
    ).length,
  }));

  const getBarGradient = (value: number) => {
    if (value > 50) return 'url(#gradientSuccess)';
    if (value > 20) return 'url(#gradientPrimary)';
    if (value > 10) return 'url(#gradientWarning)';
    return 'url(#gradientNeutral)';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 스프레드율 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="gradientSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.SUCCESS} stopOpacity={1} />
                <stop offset="100%" stopColor={CHART_COLORS.SUCCESS} stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.PRIMARY} stopOpacity={1} />
                <stop offset="100%" stopColor={CHART_COLORS.PRIMARY} stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.WARNING} stopOpacity={1} />
                <stop offset="100%" stopColor={CHART_COLORS.WARNING} stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.NEUTRAL} stopOpacity={1} />
                <stop offset="100%" stopColor={CHART_COLORS.NEUTRAL} stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarGradient(entry.count)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
