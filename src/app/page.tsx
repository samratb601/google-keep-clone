"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Sidebar from "./Sidebar";
import TakeNote from "../components/TakeNote";

import Note from "@/components/Note";

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
                className="w-full px-16"
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
                    return <Note i={i} key={`note-${i+1}`}/>;
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
