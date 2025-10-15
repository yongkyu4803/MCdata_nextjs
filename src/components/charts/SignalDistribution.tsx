'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { OrderWithMetrics, Signal } from '@/types/order';
import { SIGNAL_COLORS } from '@/lib/constants';
import { formatNumber } from '@/lib/utils/format';

interface Props {
  data: OrderWithMetrics[];
}

export function SignalDistribution({ data }: Props) {
  // 시그널별 개수 집계
  const signalCounts = data.reduce(
    (acc, order) => {
      acc[order.signal] = (acc[order.signal] || 0) + 1;
      return acc;
    },
    {} as Record<Signal, number>
  );

  const chartData = Object.entries(signalCounts).map(([signal, count]) => ({
    name: signal,
    value: count,
    percentage: data.length > 0 ? ((count / data.length) * 100).toFixed(1) : '0.0',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎯 시그널 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percentage }) => `${name} ${percentage}%`}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={SIGNAL_COLORS[entry.name as Signal]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              labelFormatter={(label) => `시그널: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: SIGNAL_COLORS[item.name as Signal] }}
              />
              <span>
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
