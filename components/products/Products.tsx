'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CheckIcon,
  ChevronDown,
  XIcon,
} from 'lucide-react';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpAZ className="ml-2 size-4" />
          ) : (
            <ArrowDownAZ className="ml-2 size-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col px-4">
        <p className="font-medium">{row.getValue('name')}</p>
        <p className="text-sm text-muted-foreground underline">
          {row.original.short_url}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'custom_summary',
    header: () => <div>Summary</div>,
    cell: ({ row }) => <div>{row.getValue('custom_summary')}</div>,
  },
  {
    accessorKey: 'is_tiered_membership',
    header: () => <div>Type</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue('is_tiered_membership')
          ? 'Subscription'
          : 'One-time payment'}
      </div>
    ),
  },
  {
    accessorKey: 'sales_count',
    header: () => <div>Sales</div>,
    cell: ({ row }) => (
      <div>{row.getValue('sales_count') ?? 'Summary not found'}</div>
    ),
  },
  {
    accessorKey: 'sales_usd_cents',
    header: () => <div>Revenue</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('sales_usd_cents'));

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'formatted_price',
    header: () => <div>Price</div>,
    cell: ({ row }) => <div>{row.getValue('formatted_price')}</div>,
  },
  {
    accessorKey: 'published',
    header: () => <div>Published</div>,
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue('published') ? (
          <>
            <CheckIcon className="mr-1 size-4" />
            Yes
          </>
        ) : (
          <>
            <XIcon className="mr-1 size-4" />
            No
          </>
        )}
      </div>
    ),
  },
];

export function Products({ products }: { products: Product[] }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <Card className="w-full rounded">
      <CardHeader className="flex flex-col items-center p-4 md:flex-row">
        <Input
          placeholder="Filter by product"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto w-full md:w-auto"
            >
              Columns <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="border-y px-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => router.push(`/product/${row.original.id}`)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-end p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Displaying {table.getFilteredRowModel().rows.length} of{' '}
          {table.getCoreRowModel().rows.length} row(s).
        </div>
      </CardFooter>
    </Card>
  );
}
