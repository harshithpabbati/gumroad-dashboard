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
    id: 'Name',
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
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{row.original.name}</p>
        <p className="text-sm text-foreground underline">
          {row.original.short_url}
        </p>
      </div>
    ),
  },
  {
    id: 'Type',
    accessorKey: 'is_tiered_membership',
    header: 'Type',
    cell: ({ row }) => (
      <div>
        {row.original.is_tiered_membership
          ? 'Subscription'
          : 'One-time payment'}
      </div>
    ),
  },
  {
    id: 'Sales',
    accessorKey: 'sales_count',
    header: 'Sales',
    cell: ({ row }) => <div>{row.original.sales_count}</div>,
  },
  {
    id: 'Revenue',
    accessorKey: 'sales_usd_cents',
    header: 'Revenue',
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(row.original.sales_usd_cents);

      return <div>{formatted}</div>;
    },
  },
  {
    id: 'Price',
    accessorKey: 'formatted_price',
    header: 'Price',
    cell: ({ row }) => <div>{row.original.formatted_price}</div>,
  },
  {
    id: 'Published',
    accessorKey: 'published',
    header: 'Published',
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.published ? (
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
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center p-4 md:flex-row">
        <Input
          placeholder="Filter by product"
          value={(table.getColumn('Name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Name')?.setFilterValue(event.target.value)
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
      <CardContent className="border-y p-0">
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
                    <TableCell className="p-4" key={cell.id}>
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
      <CardFooter className="flex items-center p-4">
        <div className="text-sm text-foreground">
          Displaying {table.getFilteredRowModel().rows.length} of{' '}
          {table.getCoreRowModel().rows.length} row(s)
        </div>
      </CardFooter>
    </Card>
  );
}
