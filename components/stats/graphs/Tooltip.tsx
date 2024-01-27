interface Props {
  active?: boolean;
  payload?: any;
  label?: string;
}
export function Tooltip({ active, payload, label }: Props) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded bg-secondary p-4">
      <p className="text-foreground">{`${label} : $${payload[0].value}`}</p>
    </div>
  );
}
