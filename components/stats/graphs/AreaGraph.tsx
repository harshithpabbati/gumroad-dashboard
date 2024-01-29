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
  data: Record<string, string | number>[];
  dataKey: string;
  hideAxis?: boolean;
  height?: string | number;
  prefix?: string;
  suffix?: string;
}

export function AreaGraph({
  data,
  dataKey,
  hideAxis = false,
  height = 350,
  prefix,
  suffix,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
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
          hide={hideAxis}
          dataKey="name"
        />
        <YAxis
          width={40}
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          hide={hideAxis}
          tickFormatter={(value) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              unitDisplay: 'short',
              maximumFractionDigits: 0,
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Area
          fillOpacity={1}
          type="monotone"
          dataKey={dataKey}
          stroke="currentColor"
          fill="currentColor"
          className="text-primary"
        />
        <Tooltip content={<CustomTooltip prefix={prefix} suffix={suffix} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
