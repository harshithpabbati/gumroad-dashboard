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
      <div className="border-b bg-background p-4 md:px-12 md:py-6">
        <h3 className="text-4xl font-medium">{title}</h3>
        {description && <p className="mt-2 text-sm">{description}</p>}
      </div>
      {children}
    </>
  );
}
