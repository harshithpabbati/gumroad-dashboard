interface Props {
  active?: boolean;
  payload?: any;
  label?: string;
  prefix?: string;
  suffix?: string;
}
export function Tooltip({ active, payload, label, prefix, suffix }: Props) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded border bg-secondary p-4">
      <p className="text-foreground">
        {`${label} : ${prefix ? prefix : ''}${payload[0].value}${suffix ? suffix : ''}`}
      </p>
    </div>
  );
}
