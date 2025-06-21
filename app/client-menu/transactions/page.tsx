import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const data: Transactions[] = [
    { id: "12501", type: "ID_SLB3", date: "2025-06-19", location: "Jakarta, ID", volume: 1000, status: "Completed" },
    { id: "12502", type: "ID_SLNo", date: "2025-06-13", location: "Bandung, ID", volume: 850, status: "Pending" },
    { id: "12503", type: "ID_SLB3", date: "2025-06-01", location: "Surabaya, ID", volume: 1200, status: "On Process" },
    { id: "12504", type: "ID_SLNo", date: "2025-05-15", location: "Yogyakarta, ID", volume: 930, status: "Completed" },
    { id: "12505", type: "ID_SLB3", date: "2024-11-10", location: "Medan, ID", volume: 1100, status: "Failed" },
    { id: "12506", type: "ID_SLNo", date: "2025-06-18", location: "Depok, ID", volume: 760, status: "Completed" },
    { id: "12507", type: "ID_SLB3", date: "2025-06-17", location: "Bogor, ID", volume: 890, status: "Pending" },
    { id: "12508", type: "ID_SLNo", date: "2025-06-10", location: "Bekasi, ID", volume: 950, status: "Completed" },
    { id: "12509", type: "ID_SLB3", date: "2025-05-28", location: "Malang, ID", volume: 1050, status: "On Process" },
    { id: "12510", type: "ID_SLNo", date: "2025-04-30", location: "Cirebon, ID", volume: 820, status: "Completed" },
    { id: "12511", type: "ID_SLB3", date: "2025-06-19", location: "Padang, ID", volume: 780, status: "Completed" },
    { id: "12512", type: "ID_SLNo", date: "2025-06-14", location: "Bali, ID", volume: 660, status: "Pending" },
    { id: "12513", type: "ID_SLB3", date: "2025-06-02", location: "Pontianak, ID", volume: 970, status: "Failed" },
    { id: "12514", type: "ID_SLNo", date: "2025-05-12", location: "Palembang, ID", volume: 1120, status: "On Process" },
    { id: "12515", type: "ID_SLB3", date: "2024-12-25", location: "Makassar, ID", volume: 980, status: "Completed" },
    { id: "12516", type: "ID_SLNo", date: "2025-06-16", location: "Semarang, ID", volume: 810, status: "Completed" },
    { id: "12517", type: "ID_SLB3", date: "2025-06-11", location: "Manado, ID", volume: 920, status: "Pending" },
    { id: "12518", type: "ID_SLNo", date: "2025-05-07", location: "Batam, ID", volume: 870, status: "On Process" },
    { id: "12519", type: "ID_SLB3", date: "2025-04-20", location: "Lombok, ID", volume: 940, status: "Completed" },
    { id: "12520", type: "ID_SLNo", date: "2023-12-19", location: "Banjarmasin, ID", volume: 990, status: "Failed" },
];

export default function Page() {
    return (
        <div className="py-8 px-36 space-y-6 w-screen">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
