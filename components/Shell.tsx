import React from 'react';

interface Props {
  title: string;
  description?: string;
}

export function Shell({
  title,
  description,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <div className="border-b bg-secondary p-4 py-6 md:p-12">
        <h3 className="text-4xl font-medium">{title}</h3>
        {description && <p className="mt-2 text-sm">{description}</p>}
      </div>
      <div className="p-4 md:p-12">{children}</div>
    </>
  );
}
