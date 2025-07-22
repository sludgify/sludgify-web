"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export const ValuesCarousel = ({ values }) => {
    return (
        <div className="w-[120vw] lg:hidden overflow-hidden">
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {values.map((item) => (
                        <CarouselItem key={item.id} className="basis-[55%] px-2">
                            <div className={`rounded-md drop-shadow-md w-full min-w-[250px] h-[111px] px-3 py-3 ${item.className}`}>
                                <h1 className="text-sm md:text-lg font-radley">{item.title}</h1>
                                <p className="text-[10px] md:text-xs lg:mt-5">{item.description}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
