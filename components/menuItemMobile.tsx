import Link from "next/link";
import clsx from "clsx";


function MenuItem({ item, pathname, onClick }: any) {
    const isActive = pathname === item.link;

    return (
        <Link
            href={item.link}
            onClick={onClick}
            className={clsx(
                "flex items-center gap-5 text-lg p-2 min-h-[34px] rounded-lg transition",
                isActive
                    ? "bg-black text-white"
                    : "hover:bg-black text-[#525252] hover:text-white"
            )}
        >
            <div
                className={clsx(
                    "flex-shrink-0",
                    isActive ? "text-white" : "text-[#525252]"
                )}
            >
                {typeof item.icon === "function" && item.icon(isActive)}
            </div>
            <span className="ml-2 font-bold font-calibri">{item.name}</span>
        </Link>
    );
}

export default MenuItem;