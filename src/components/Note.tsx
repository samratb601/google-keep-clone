import { IconWrapper } from "@/components/IconWrapper";
import { cn } from "@/lib/utils";
import { NoteType } from "@/types/note";
import { AnimatePresence, Variant, Variants, motion } from "framer-motion";
import React, { RefObject, useRef, useState } from "react";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { NoteTools } from "./NoteTools";
import TakeNote from "./TakeNote";
import useOutsideClick from "@/customHooks/useOutsideClick";
import { useNotesContext } from "@/context/NotesContext";

type NoteProps = {
  i: number;
  note: NoteType;
};
const Note = ({ i, note }: NoteProps) => {
  const { _id, title, content, pinned } = note;
  const contentLength = content?.length;

  const noteRef = useRef<any>();
  const takeNoteRef = useRef<any>();

  const { saveNote, setNotes } = useNotesContext();

  const [active, setActive] = useState(false);

  useOutsideClick(takeNoteRef as RefObject<HTMLDivElement>, () => {
    setActive(false);
  });

  const handlePin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log({ ...note, pinned: !note?.pinned });
    saveNote({ ...note, pinned: !note?.pinned });
  };

  return (
    <motion.div
      key={`note-item-${note._id}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: note.bgColor,
        borderColor: note.bgColor,
      }}
      exit={{ opacity: 0 }}
      transition={{}}
      ref={noteRef}
      className={cn(
        "relative border border-zinc-600 rounded-md shadow-md p-3 text-slate-300 cursor-default group",
        // `${note.bgColor ? `bg-[${note.bgColor}]` : ""}`
      )}
      onClick={() => {
        setActive(!active);
      }}
    >
      <div className="note-title text-[1.15rem] font-semibold">{title}</div>
      <div
        className={cn(
          "note-content max-h-[30vh] truncate",
          `${title ? "mt-3" : "mt-1"} 
          ${contentLength >= 40 ? "text-[14px]" : "text-[1.1rem]"}`
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div
        className={cn(
          `absolute -top-2.5 -left-2.5 ${
            active ? "visible" : "invisible group-hover:animate-tooltip_show"
          } cursor-pointer`
        )}
      >
        <IoIosCheckmarkCircle size={25} />
      </div>

      <div
        className={cn(
          `absolute top-1 right-1 ${
            active ? "visible" : "invisible group-hover:animate-tooltip_show"
          } `
        )}
      >
        <IconWrapper className="p-2 text-slate-300" onClick={handlePin}>
          {pinned ? <BsPinFill size={20} /> : <BsPin size={20} />}
        </IconWrapper>
      </div>

      <div className="relative -bottom-3 h-[40px] flex items-center">
        <NoteTools
          note={note}
          showUndoRedo={false}
          className={
            active ? "visible" : "invisible group-hover:animate-tooltip_show"
          }
        />
      </div>
      <ModalComponent
        show={active}
        hide={() => {
          setActive(false);
        }}
      >
        <TakeNote
          note={{ ...note }}
          ref={takeNoteRef}
          onClick={(e) => e.stopPropagation()}
          handleCancel={() => {
            setActive(false);
          }}
        />
      </ModalComponent>
    </motion.div>
  );
};

export default Note;

const motionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    position: "absolute",
    x: 0,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    position: "fixed",
    transition: {
      duration: 0.2,
    },
  },
};

const ModalComponent = ({
  show,
  hide,
  children,
}: {
  show: boolean;
  hide: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => hide()}
        ></div>
      )}
      <AnimatePresence>
        {show && (
          <motion.div
            className="inset-0 flex justify-center items-center z-[51]"
            initial="hidden"
            animate="animate"
            exit="hidden"
            variants={motionVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
