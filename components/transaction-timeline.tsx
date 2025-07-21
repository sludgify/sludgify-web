import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function TransactionTimeline({ steps, transaction }: { steps: TrackingStep[]; transaction: Transactions }) {
    const statusClass =
        transaction.status === "Completed"
            ? "text-[#00AA06] bg-[#C9FFB9A8]"
            : transaction.status === "On Process"
            ? "text-[#4857B7] bg-[#C7C9FF70]"
            : transaction.status === "Pending"
            ? "text-[#242323] bg-[#D9D9D9A8]"
            : "text-red-600 bg-[#FFB9B9A8]";

    return (
        <>
            <div className="relative flex flex-col gap-0">
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={index} className="flex items-start gap-4 relative min-h-[100px]">
                            <div className="min-w-[180px] text-sm text-gray-500 text-right pt-1">{format(new Date(step.time), "dd MMMM yyyy, HH:mm 'WIB'", { locale: id })}</div>

                            <div className="relative flex flex-col items-center min-w-[20px]">
                                {!isLast && <div className="absolute top-[12px] left-[9px] w-[2px] h-[190px] bg-[#505050] z-0" />}
                                <div className="w-3 h-3 bg-[#505050] z-10 translate-y-2" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    <p className="text-primary font-radley text-xl">{step.label}</p>
                                    <p className="text-[#505050] text-lg">{step.desc}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {step.icons.map((src, i) => (
                                        <Image key={i} src={src} alt={`icon-${i}`} width={200} height={200} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={`h-fit w-[444px] ${statusClass} rounded-xl p-4`}>
                <h1 className="text-xl font-radley">Sludge management {transaction.status.toLowerCase()}</h1>
                <h1 className="text-[#505050]">Transaction ID: {transaction.id}</h1>
                <h1 className="text-[#505050]">Sludge Type: {transaction.type}</h1>
                <h1 className="text-[#505050]">Volume: {transaction.volume} L</h1>
            </div>
        </>
    );
}
