"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    const [frequency, setFrequency] = React.useState("Monthly");

    // Helper: Filter data based on frequency
    const filteredData = React.useMemo(() => {
        const now = new Date();
        return data.filter((item) => {
            const itemDate = new Date(item.date);

            switch (frequency) {
                case "Daily":
                    return itemDate.toDateString() === now.toDateString();
                case "Weekly": {
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay());
                    const endOfWeek = new Date(startOfWeek);
                    endOfWeek.setDate(startOfWeek.getDate() + 6);
                    return itemDate >= startOfWeek && itemDate <= endOfWeek;
                }
                case "Monthly":
                    return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
                case "Yearly":
                    return itemDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });
    }, [data, frequency]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="rounded-md border p-8 space-y-5">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-radley text-3xl text-primary">Transaction History</h1>
                    <p className="text-2xl text-[#505050]">Here’s your sludge transaction history</p>
                </div>
                <div className="flex items-center gap-1 font-radley">
                    <div className="border border-[#D1D5DB] rounded-lg w-[179px] p-2 flex items-center gap-2">
                        <select name="frequency" className="w-full focus:outline-none" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                            <option value="Monthly">Monthly</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Daily">Daily</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="bg-primary text-white rounded-lg p-2 w-[179px] flex items-center justify-evenly gap-2">
                        <h1>Download CSV</h1>
                        <Image src="/download_file.svg" alt="Download Icon" width={20} height={20} />
                    </div>
                </div>
            </div>
            <Table className="font-radley">
                <TableHeader>
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
                            <TableRow key={row.id} className="cursor-pointer hover:bg-gray-100">
                                <Link href={`/client-menu/transactions/${row.original.id}`} className="contents">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </Link>
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
            <div className="flex items-center justify-end space-x-2 py-4 font-radley text-xl">
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
