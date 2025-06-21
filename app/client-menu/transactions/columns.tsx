"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Transactions>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium"> ID: {id}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "volume",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Volume
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const volume = row.getValue("volume") as number;
            return <div>{volume} ton</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");

            return (
                <div
                    className={` font-medium rounded-4xl w-fit px-3 py-1 ${
                        status === "Completed" ? "text-[#00AA06] bg-[#C9FFB9A8]" : status === "On Process" ? "text-[#4857B7] bg-[#C7C9FF70]" : status === "Pending" ? "text-[#242323] bg-[#D9D9D9A8]" : "text-red-600 bg-[#FFB9B9A8]"
                    }`}
                >
                    {String(status)}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
