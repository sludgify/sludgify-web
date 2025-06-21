// app/client-menu/transactions/[id]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TransactionTimeline } from "@/components/transaction-timeline";

const transactions: Transactions[] = [
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

function generateTrackingSteps(status: string): TrackingStep[] {
    const baseTime = new Date("2025-06-19T09:00:00");
    const steps: TrackingStep[] = [
        {
            time: baseTime.toISOString(),
            label: "Permintaan diterima",
            desc: "Permintaan pengisian sludge telah diterima dan sedang antre.",
            icons: ["/tracking.svg"],
        },
    ];

    if (status === "On Process" || status === "Completed") {
        const step2 = new Date(baseTime);
        step2.setDate(step2.getDate() + 1);
        steps.push({
            time: step2.toISOString(),
            label: "Sedang diproses",
            desc: "Pengisian sludge sedang dilakukan di lokasi.",
            icons: ["/tracking.svg", "/tracking.svg"],
        });
    }

    if (status === "Completed") {
        const step3 = new Date(baseTime);
        step3.setDate(step3.getDate() + 2);
        steps.push({
            time: step3.toISOString(),
            label: "Selesai",
            desc: "Pengisian sludge telah selesai dilakukan.",
            icons: ["/tracking.svg"],
        });
    }

    return steps;
}

export default function TransactionDetail({ params }: { params: { id: string } }) {
    const transaction = transactions.find((item) => item.id === params.id);

    if (!transaction) return notFound();
    const steps = generateTrackingSteps(transaction.status);

    return (
        <div className="py-8 px-36 space-y-6 w-screen">
            <div className="flex items-center font-radley">
                <Link href="/client-menu/transactions" className="text-primary">
                    <ArrowLeft className="inline-block mr-2" size={24} />
                </Link>
                <h1 className="text-xl text-primary font-radley">Transaction</h1>
            </div>
            <div className="border border-[#D9D9D9] rounded-lg py-10 flex gap-10">
                <TransactionTimeline steps={steps} transaction={transaction} />
            </div>
        </div>
    );
}
