declare type Transactions = {
    id: string;
    type: "ID_SLB3" | "ID_SLNo";
    date: string;
    location: string;
    volume: number;
    status: "Pending" | "On Process" | "Completed" | "Failed";
};

declare type TrackingStep = {
    time: string;
    label: string;
    desc: string;
    icons: string[];
};