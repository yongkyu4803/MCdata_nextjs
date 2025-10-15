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

  const getBarColor = (value: number) => {
    if (value > 50) return CHART_COLORS.SUCCESS;
    if (value > 20) return CHART_COLORS.PRIMARY;
    if (value > 10) return CHART_COLORS.WARNING;
    return CHART_COLORS.NEUTRAL;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 스프레드율 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
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
                <Cell key={`cell-${index}`} fill={getBarColor(entry.count)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
