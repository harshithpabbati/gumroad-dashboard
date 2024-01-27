'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Tooltip as CustomTooltip } from '@/components/stats/graphs/Tooltip';

interface Props {
  data: {
    name: string;
    revenue: number;
  }[];
}

export function LineGraph({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        margin={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        data={data}
      >
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dataKey="name"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Line
          strokeWidth={2}
          dataKey="revenue"
          stroke="currentColor"
          fill="currentColor"
          activeDot={{
            r: 6,
            style: { fill: 'currentColor', opacity: 0.25 },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
