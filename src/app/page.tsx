"use client";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Sidebar from "../components/Sidebar";
import TakeNote from "../components/TakeNote";
import Note from "@/components/Note";
import { useNotesContext } from "@/context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const takeNoteRef = useRef<any>();
  const { notes } = useNotesContext();

  const pinnedNotes = [];
  const otherNotes = [];
  for (let index = 0; index < notes.length; index++) {
    const note = notes[index];
    note.pinned ? pinnedNotes.push(note) : otherNotes.push(note);
  }

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

              <AnimatePresence>
                <ResponsiveMasonry
                  className="w-full px-1 sm:px-8 md:px-16 mt-8 pb-32"
                  columnsCountBreakPoints={{
                    500: 1,
                    550: 2,
                    900: 3,
                    1050: 4,
                    1300: 5,
                    1500: 6,
                    1800: 7,
                  }}
                >
                  <div className="w-full text-left text-white/70 text-[0.7rem] tracking-widest pb-2">
                    {pinnedNotes.length > 0 ? "PINNED" : ""}
                  </div>
                  <Masonry gutter="10px" className="">
                    {pinnedNotes.map((note, i) => {
                      return (
                        <Note
                          i={i}
                          key={`pinned-note-${note._id}`}
                          note={note}
                        />
                      );
                    })}
                  </Masonry>

                  <div className="w-full text-left text-white/70 text-[0.7rem] tracking-widest mt-10 pb-2">
                    {pinnedNotes.length > 0 && otherNotes.length > 0
                      ? "OTHERS"
                      : ""}
                  </div>

                  <Masonry gutter="10px" className="">
                    {otherNotes.map((note, i) => {
                      return (
                        <Note
                          i={i}
                          key={`other-note-${note._id}`}
                          note={note}
                        />
                      );
                    })}
                  </Masonry>
                </ResponsiveMasonry>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
