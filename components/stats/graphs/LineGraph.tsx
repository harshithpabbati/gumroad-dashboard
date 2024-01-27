'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: {
    name: string;
    revenue: number;
  }[];
}

export function LineGraph({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
