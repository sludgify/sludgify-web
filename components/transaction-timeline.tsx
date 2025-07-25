import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function TransactionTimeline({ steps, transaction }: { steps: TrackingStep[]; transaction: Transactions }) {
    console.log(transaction);
    const statusClass =
        transaction.status === "Completed"
            ? "text-[#00AA06] bg-[#C9FFB9A8]"
            : transaction.status === "On Process"
            ? "text-[#4857B7] bg-[#C7C9FF70]"
            : transaction.status === "Waiting Payment"
            ? "text-[#242323] bg-[#D9D9D9A8]"
            : "text-red-600 bg-[#FFB9B9A8]";

    return (
        <div className="flex md:flex-row flex-col-reverse gap-4">
            <div className="relative flex flex-col gap-0">
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={index} className="flex items-start gap-4 relative min-h-[100px]">
                            <div className="w-[200px] md:min-w-[180px] text-sm text-gray-500 text-right pt-1">{format(new Date(step.time), "dd MMMM yyyy, HH:mm 'WIB'", { locale: id })}</div>

                            <div className="relative flex flex-col items-center min-w-[20px] h-full">
                                {!isLast && <div className="absolute top-[12px] left-[9px] w-[2px] h-[150px] md:h-[270px] bg-[#505050] z-0" />}
                                <div className="w-3 h-3 bg-[#505050] z-10 translate-y-2" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    <p className="text-primary font-radley text-lg md:text-xl">{step.label}</p>
                                    <p className="text-[#505050] text-sm md:text-lg">{step.desc}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {step.icons.map((src, i) => (
                                        <Image key={i} src={src} alt={`icon-${i}`} width={200} height={200} className="md:w-[200px] md:h-[200px] w-[190px] h-[100px]" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={`h-fit md:w-[444px] ${statusClass} rounded-xl p-4`}>
                <h1 className="text-xl font-radley">Sludge management {transaction.status.toLowerCase()}</h1>
                <h1 className="text-[#505050]">Transaction ID: {transaction.id}</h1>
                <h1 className="text-[#505050]">Sludge Type: {transaction.service_name.type}</h1>
                <h1 className="text-[#505050]">Volume: {transaction.volume} Ton</h1>
            </div>
        </div>
    );
}
