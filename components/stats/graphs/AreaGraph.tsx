'use client';

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Tooltip as CustomTooltip } from './Tooltip';

interface Props {
  data: {
    name: string;
    grossRevenue: number;
    netRevenue: number;
  }[];
  dataKey: string;
}

export function AreaGraph({ data, dataKey }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        margin={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        data={data}
      >
        <XAxis
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dataKey="name"
        />
        <YAxis
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Area
          fillOpacity={1}
          type="monotone"
          dataKey={dataKey}
          stroke="currentColor"
          fill="currentColor"
          className="text-primary"
        />
        <Tooltip content={<CustomTooltip />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
