import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import BCA from './../../../public/1280px-Bank_Central_Asia.svg 1.png'

const TopUpPage = () => {
    return (
        <>
            <br/>
            <br />
            <Card className="w-[45%] ms-8 shadow-none">
                <CardHeader>
                    <CardTitle>
                        <h1>Complete Your Purchase</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="" className="w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <Label className="text-[#525252]">Name</Label>
                                <Input/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="text-[#525252]">Email</Label>
                                <Input/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="text-[#525252]">Company</Label>
                                <Input/>
                            </div>
                        </div>
                    </form>
                    <br />
                    <h1 className="text-black text-xl font-semibold mb-3">Order Summary</h1>
                    <div className="flex flex-col border-[#D9D9D9] rounded-md border-1 ps-5 pb-3 pt-3">
                        <p className="text-sm text-[#525252]">Order ID : SLD240-06062025</p>
                        <p className="text-sm text-[#525252]">10 (ton) x IDR 150.000</p>
                        <p className="text-sm text-[#525252]">IDR 1.500.000</p>
                    </div>
                    <h1>Payment Method</h1>
                    <div className="flex flex-row">
                        <Image src={BCA} alt="card" width={50} height={50} className="w-[20px] h-[20px] md:w-[50px] md:h-[50px]" />
                        <div className="flex flex-col gap-1">
                            <Label className="text-[#525252]">Email</Label>
                            <Input/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-[#525252]">Company</Label>
                            <Input/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default TopUpPage