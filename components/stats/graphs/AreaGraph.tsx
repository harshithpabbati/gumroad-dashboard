'use client';

import {
  Area,
  AreaChart,
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

export function AreaGraph({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
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
        <Area
          fillOpacity={1}
          type="monotone"
          dataKey="revenue"
          stroke="currentColor"
          fill="currentColor"
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
