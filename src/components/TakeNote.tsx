"use client";
import { IconWrapper } from "@/components/IconWrapper";
import { useNotesContext } from "@/context/NotesContext";
import useOutsideClick from "@/customHooks/useOutsideClick";
import { cn, debounce } from "@/lib/utils";
import { NoteType } from "@/types/note";
import React, {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiPaint } from "react-icons/bi";
import { BsPin } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlineImage } from "react-icons/md";
import { NoteTools } from "./NoteTools";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  note?: NoteType;
  handleCancel?: () => void;
}

const TakeNote = React.forwardRef<HTMLDivElement, Props>(
  ({ note: _note, handleCancel, className, ...props }, ref) => {
    const isUpdate = !!_note;

    const noteRef = useRef<any>();

    const { saveNote } = useNotesContext();

    const [open, setOpen] = useState(isUpdate);
    const [title, setTitle] = useState(_note?.title || "");
    const [content, setContent] = useState(_note?.content || "");

    useOutsideClick(ref as RefObject<HTMLDivElement>, () => {
      if (content || title) {
        const note = { title, content };
        saveNote(isUpdate ? { ...note, id: _note._id } : note);
      }

      handleNoteChange("");
      setTitle("");
      setOpen(false);
    });

    useEffect(() => {
      if (content) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(noteRef.current);
        range.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else if (!content && open) noteRef.current?.focus();
    }, [content, open]);

    const handleTitleChange = useCallback(
      debounce((value: string) => {
        setTitle(value);
      }, 300),
      []
    );

    const handleNoteChange = useCallback(
      debounce((value: string) => {
        setContent(value);
      }, 300),
      []
    );

    const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      console.log(e.key, target.innerHTML);
      handleNoteChange(target.innerHTML);
    };

   

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-auto w-[95%] md:w-[56%] lg:w-[30%] border border-zinc-500 bg-primary rounded-md shadow-lg text-slate-300",
          `${open ? "" : ""} ${className}`
        )}
        {...props}
      >
        <>
          {open && (
            <input
              className="w-full h-[45px] rounded-md pl-4 bg-transparent border-none placeholder:text-slate-300 focus:outline-none focus:border-none focus:ring-0
        focus-visible:ring-0 focus-visible:ring-offset-0 tracking-wide text-slate-300"
              placeholder="Title"
              defaultValue={title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          )}

          {content ? (
            <div
              className="w-full min-h-[45px] rounded-md pl-4 py-2.5 bg-transparent border-none placeholder:text-slate-300 focus:outline-none focus:border-none focus:ring-0
            focus-visible:ring-0 focus-visible:ring-offset-0 text-[0.9rem] text-slate-300"
              ref={noteRef}
              contentEditable
              onKeyUp={handleKeyUp}
              onInput={(e) => {
                const target = e.target as HTMLDivElement;
                const value = target.innerText;
                handleNoteChange(value);
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          ) : (
            <input
              className="w-full h-[45px] rounded-md pl-4 bg-transparent border-none placeholder:text-slate-300 focus:outline-none focus:border-none focus:ring-0
        focus-visible:ring-0 focus-visible:ring-offset-0 text-[0.9rem] text-slate-300"
              ref={noteRef}
              placeholder="Take a note..."
              onClick={() => {
                setOpen(true);
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          )}

          {open ? (
            <div className="flex absolute right-1.5 top-1.5">
              <IconWrapper className="p-2 text-inherit">
                <BsPin size={23} />
              </IconWrapper>
            </div>
          ) : (
            <div className="flex absolute right-0 top-0 text-inherit">
              <IconWrapper className="text-inherit">
                <IoIosCheckboxOutline size={20} />
              </IconWrapper>
              <IconWrapper className="text-inherit">
                <BiPaint size={20} />
              </IconWrapper>
              <IconWrapper className="text-inherit">
                <MdOutlineImage size={20} />
              </IconWrapper>
            </div>
          )}

          {open && (
            <div className="relative bottom-0">
              <NoteTools
                handleClickCancel={() => {
                  if (content || title) {
                    const note = { title, content };
                    saveNote(isUpdate ? { ...note, id: _note._id } : note);
                  }
                  setOpen(false);
                  setTitle("");
                  setContent("");
                  handleCancel?.()
                }}
              />
            </div>
          )}
        </>
      </div>
    );
  }
);

TakeNote.displayName = "TakeNote";

export default TakeNote;
