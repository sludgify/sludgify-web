"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState, getSortedRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ListFilter, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<
    TData extends {
        id: string;
        date: string;
    },
    TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const router = useRouter();

    // Helper: Filter data based on frequency
    // const filteredData = React.useMemo(() => {
    //     const now = new Date();
    //     return data.filter((item) => {
    //         const itemDate = new Date(item.date);

    //         switch (frequency) {
    //             case "Daily":
    //                 return itemDate.toDateString() === now.toDateString();
    //             case "Weekly": {
    //                 const startOfWeek = new Date(now);
    //                 startOfWeek.setDate(now.getDate() - now.getDay());
    //                 const endOfWeek = new Date(startOfWeek);
    //                 endOfWeek.setDate(startOfWeek.getDate() + 6);
    //                 return itemDate >= startOfWeek && itemDate <= endOfWeek;
    //             }
    //             case "Monthly":
    //                 return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    //             case "Yearly":
    //                 return itemDate.getFullYear() === now.getFullYear();
    //             default:
    //                 return true;
    //         }
    //     });
    // }, [data, frequency]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: (row, columnId, filterValue) => {
            const search = filterValue.toLowerCase();
            return ["id", "type", "date", "location"].some((key) => {
                const value = row.getValue(key);
                return value?.toString().toLowerCase().includes(search);
            });
        },
    });

    return (
        <div className="rounded-md border p-8 space-y-5">
            <div className="flex justify-between">
                <div className="w-[300px] border rounded-lg p-2 flex items-center gap-2">
                    <Search size={18} />
                    <input placeholder="Search" className="w-full focus:outline-none" value={(table.getState().globalFilter as string) ?? ""} onChange={(event) => table.setGlobalFilter(event.target.value)} />
                </div>
                <div className="flex items-center gap-2  border rounded-lg p-2">
                    <ListFilter size={18} />
                    <h1>Filter</h1>
                </div>
            </div>
            <Table className="font-calibri">
                <TableHeader className="border border-[#D9D9D9] rounded-[10px] bg-[#FAFAFA]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/client-menu/transactions/${row.original.id}`)}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        <Link href={`/client-menu/transactions/${row.original.id}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Link>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 font-calibri text-xl">
                {table.getCanPreviousPage() && (
                    <Button variant="outline" className="!text-xl px-4 py-2" size="sm" onClick={() => table.previousPage()}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                {/* Numbered Pagination */}
                {Array.from({ length: table.getPageCount() }).map((_, index) => (
                    <Button className="!text-xl px-4 py-2" key={index} variant={table.getState().pagination.pageIndex === index ? "default" : "outline"} size="sm" onClick={() => table.setPageIndex(index)}>
                        {index + 1}
                    </Button>
                ))}

                {table.getCanNextPage() && (
                    <Button className="!text-xl px-4 py-2" variant="outline" size="sm" onClick={() => table.nextPage()}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
