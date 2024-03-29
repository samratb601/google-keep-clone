"use client";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Sidebar from "./Sidebar";
import TakeNote from "../components/TakeNote";
import Note from "@/components/Note";
import { useNotesContext } from "@/context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const takeNoteRef = useRef<any>();
  const { notes } = useNotesContext();

  const pinnedNotes = notes.filter((item) => item.pinned);

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
              <TakeNote ref={takeNoteRef} />

              <ResponsiveMasonry
                className="w-full px-16 mt-8"
                columnsCountBreakPoints={{
                  500: 1,
                  550: 2,
                  900: 3,
                  1050: 4,
                  1300: 5,
                }}
              >
                <div className="w-full text-left text-white text-[0.7rem] tracking-widest pb-2">
                  {pinnedNotes.length > 0 ? "PINNED" : ""}
                </div>
                <AnimatePresence>
                  <Masonry gutter="10px" className="">
                    {pinnedNotes.map((note, i) => {
                      return <Note i={i} key={`note-${i}`} note={note} />;
                    })}
                  </Masonry>
                </AnimatePresence>

                <div className="w-full text-left text-white text-[0.7rem] tracking-widest mt-10 pb-2">
                  {pinnedNotes.length > 0 ? "OTHERS" : ""}
                </div>
                <AnimatePresence>
                  <Masonry gutter="10px" className="">
                    {notes
                      .filter((item) => !item.pinned)
                      .map((note, i) => {
                        return <Note i={i} key={`note-${i}`} note={note} />;
                      })}
                  </Masonry>
                </AnimatePresence>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
