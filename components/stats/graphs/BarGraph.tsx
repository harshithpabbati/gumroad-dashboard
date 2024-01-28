'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Tooltip as CustomTooltip } from '@/components/stats/graphs/Tooltip';

interface Props {
  data: Record<string, string | number>[];
  dataKey: string;
  prefix?: string;
  suffix?: string;
}

export function BarGraph({ data, dataKey, prefix, suffix }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        margin={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        data={data}
      >
        <XAxis hide dataKey="name" />
        <YAxis hide />
        <Bar
          type="monotone"
          strokeWidth={2}
          dataKey={dataKey}
          stroke="currentColor"
          fill="currentColor"
          className="text-primary"
        />
        <Tooltip content={<CustomTooltip prefix={prefix} suffix={suffix} />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
