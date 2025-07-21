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
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                ID
            </Button>
        ),
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return <div>{id}</div>;
        },
    },
    {
        accessorKey: "service_name",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                Service Name
            </Button>
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <div className="font-bold">{row.original.service_name.name}</div>
                    <div>Type {row.original.service_name.type}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "time",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                Time
            </Button>
        ),
        cell: ({ row }) => {
            const time = row.getValue("time") as number;
            return <div>{time}</div>;
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                Location
            </Button>
        ),
        cell: ({ row }) => {
            const location = row.getValue("location") as string;
            return <div>{location}</div>;
        },
    },
    {
        accessorKey: "volume",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                Volume
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
                    className={` font-medium rounded-[8px] w-[130px] px-3 py-1 text-center ${
                        status === "Completed"
                            ? "text-[#00AA06] bg-[#C9FFB9A8] border border-[#00AA06]"
                            : status === "On Process"
                            ? "text-[#277DAB] bg-[#E4FFFF] border border-[#277DAB]"
                            : status === "Waiting Payment"
                            ? "text-[#B1A614] bg-[#FFF9C4] border border-[#B1A614]"
                            : "text-red-600 bg-[#FFB9B9A8] border border-red-600"
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
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:cursor-pointer">
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
