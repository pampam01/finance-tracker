import React from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col my-0 py-0">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-8">
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage Your Money With <br />
                <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
                  Finance Smart
                </span>
              </h1>
            </div>
          }
        >
          <Image
            src={`/dashboard.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default Hero;
