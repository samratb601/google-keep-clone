"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Sidebar from "./Sidebar";
import TakeNote from "./TakeNote";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  MdOutlineColorLens,
  MdOutlineImage,
  MdOutlinePushPin,
  MdPersonAddAlt,
} from "react-icons/md";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { LuBell } from "react-icons/lu";
import { PiArchiveBox } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";



export default function Home() {
  const [sidemenuOpen, setSidemenuOpen] = useState(false);

  return (
    <main className="relative h-screen bg-primary overflow-hidden">
      <Navbar />

      <div className="w-full flex h-[100vh] mt-[65px] border-t border-gray-500 overflow-scroll">
        {/* Side bar  */}
        <div className="">
          <Sidebar />
        </div>

        <div className="h-full w-full">
          <div className="h-full pt-4 md:pt-8 relative ml-[70px]">
            <div className="flex flex-col w-full h-full items-center">
              <TakeNote />

              <ResponsiveMasonry
                className="w-full px-10"
                columnsCountBreakPoints={{
                  500: 1,
                  550: 2,
                  900: 3,
                  1050: 4,
                  1300: 5,
                }}
              >
                <Masonry gutter="10px" className="mt-8">
                  {Array.from({ length: 17 }).map((_, i) => {
                    return (
                      <div
                        className={cn(
                          "border border-zinc-600 rounded-md shadow-md p-3 text-slate-300 relative cursor-default group transition-all delay-300 duration-150",
                          ``
                        )}
                      >
                        {i % 2 == 0 ? (
                          <>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Hic facere quidem distinctio?
                          </>
                        ) : (
                          <>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Facilis error sit beatae provident minima
                            maiores minus ab vero delectus, tempora, consectetur
                            perspiciatis dolores impedit optio consequatur
                            aliquam adipisci veniam expedita. Officiis dolores
                            vero in excepturi sequi provident reprehenderit cum
                            recusandae, iure nesciunt, assumenda porro laborum
                            modi quia debitis autem quidem incidunt quod ea
                            repellendus pariatur! Explicabo, repellat suscipit
                            libero itaque vero, velit tenetur at aspernatur
                            harum autem ratione consequatur voluptatibus sit,
                          </>
                        )}
                        <div className="absolute -top-2.5 -left-2.5 invisible group-hover:animate-tooltip_show cursor-pointer">
                          <IoIosCheckmarkCircle size={25} />
                        </div>

                        <div className="absolute top-1 right-1 invisible group-hover:animate-tooltip_show">
                          <IconWrapper className="p-2 text-stone-300">
                            <MdOutlinePushPin size={20} />
                          </IconWrapper>
                        </div>

                        <div className="relative -bottom-3 h-[40px] flex items-center">
                          <div className="bottom-0 invisible group-hover:animate-tooltip_show flex justify-center gap-x-2">
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <LuBell size={18} />
                            </IconWrapper>
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <MdPersonAddAlt size={18} />
                            </IconWrapper>
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <MdOutlineColorLens size={18} />
                            </IconWrapper>
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <MdOutlineImage size={18} />
                            </IconWrapper>
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <PiArchiveBox size={18} />
                            </IconWrapper>
                            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                              <BsThreeDotsVertical size={18} />
                            </IconWrapper>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
