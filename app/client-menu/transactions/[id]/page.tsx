// app/client-menu/transactions/[id]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TransactionTimeline } from "@/components/transaction-timeline";

const data: Transactions[] = [
    {
        id: "SLD240",
        service_name: { name: "Sludge Management", type: "B3" },
        time: "Thu, 23 May 2025",
        location: "Jakarta, Indonesia",
        volume: 1000,
        status: "Completed",
    },
    {
        id: "SLD241",
        service_name: { name: "Non-B3 Collection", type: "Non-B3" },
        time: "Fri, 24 May 2025",
        location: "Bandung, Indonesia",
        volume: 850,
        status: "Waiting Payment",
    },
    {
        id: "SLD242",
        service_name: { name: "Oil Waste Pickup", type: "B3" },
        time: "Sat, 25 May 2025",
        location: "Surabaya, Indonesia",
        volume: 760,
        status: "On Process",
    },
    {
        id: "SLD243",
        service_name: { name: "Hazardous Sludge", type: "B3" },
        time: "Sun, 26 May 2025",
        location: "Medan, Indonesia",
        volume: 1120,
        status: "Failed",
    },
    {
        id: "SLD244",
        service_name: { name: "Chemical Waste", type: "B3" },
        time: "Mon, 27 May 2025",
        location: "Bekasi, Indonesia",
        volume: 900,
        status: "Completed",
    },
    {
        id: "SLD245",
        service_name: { name: "Food Waste", type: "Non-B3" },
        time: "Tue, 28 May 2025",
        location: "Yogyakarta, Indonesia",
        volume: 650,
        status: "Waiting Payment",
    },
    {
        id: "SLD246",
        service_name: { name: "Medical Waste", type: "B3" },
        time: "Wed, 29 May 2025",
        location: "Palembang, Indonesia",
        volume: 980,
        status: "Completed",
    },
    {
        id: "SLD247",
        service_name: { name: "Grease Trap Service", type: "Non-B3" },
        time: "Thu, 30 May 2025",
        location: "Depok, Indonesia",
        volume: 770,
        status: "On Process",
    },
    {
        id: "SLD248",
        service_name: { name: "Industrial Sludge", type: "B3" },
        time: "Fri, 31 May 2025",
        location: "Tangerang, Indonesia",
        volume: 1020,
        status: "Completed",
    },
    {
        id: "SLD249",
        service_name: { name: "Plastic Waste", type: "Non-B3" },
        time: "Sat, 01 Jun 2025",
        location: "Bali, Indonesia",
        volume: 880,
        status: "Failed",
    },
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
    const transaction = data.find((item) => item.id === params.id);

    if (!transaction) return notFound();
    const steps = generateTrackingSteps(transaction.status);

    return (
        <div className="p-8 space-y-6 w-full">
            <div className="flex items-center font-radley">
                <Link href="/client-menu/transactions" className="text-primary">
                    <ArrowLeft className="inline-block mr-2" size={24} />
                </Link>
                <h1 className="text-xl text-primary font-radley">Transaction</h1>
            </div>
            <div className="border border-[#D9D9D9] rounded-lg p-5 flex gap-10">
                <TransactionTimeline steps={steps} transaction={transaction} />
            </div>
        </div>
    );
}
