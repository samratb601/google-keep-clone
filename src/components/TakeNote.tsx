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
    const isUpdate = !!_note?._id;

    const noteRef = useRef<any>();

    const { saveNote } = useNotesContext();

    const [open, setOpen] = useState(isUpdate);
    const [title, setTitle] = useState(_note?.title || "");
    const [content, setContent] = useState(_note?.content || "");
    const [bgColor, setBgColor] = useState("");

    useOutsideClick(ref as RefObject<HTMLDivElement>, () => {
      console.log("clicked outside");
      if (content || title) {
        const newNote = { title, content, bgColor: bgColor || _note?.bgColor };
        const updatedNote = { ..._note, ...newNote };
        saveNote(isUpdate ? updatedNote : newNote);
      }

      handleNoteChange("");
      setTitle("");
      setOpen(false);
      handleCancel?.();
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
      }
    }, [content, open]);

    const handleTitleChange = (value: string) => {
      setTitle(value);
    };

    const handleNoteChange = (value: string) => {
      setContent(value);
    };

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
        style={{
          backgroundColor: _note?.bgColor || bgColor || "",
          borderColor: _note?.bgColor || bgColor || "",
        }}
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

          <div
            className="w-full min-h-[45px] max-h-[50vh] overflow-y-auto rounded-md pl-4 py-2.5 bg-transparent border-none placeholder:text-slate-300 focus:outline-none focus:border-none focus:ring-0
            focus-visible:ring-0 focus-visible:ring-offset-0 text-[0.9rem] text-slate-300 resize-none"
            ref={noteRef}
            role="textbox"
            aria-multiline="true"
            data-text="Take a note..."
            contentEditable
            onKeyUp={handleKeyUp}
            onInput={(e) => {
              const target = e.target as HTMLDivElement;
              const value = target.innerHTML;
              console.log(value);
              handleNoteChange(value);
            }}
            dangerouslySetInnerHTML={{
              __html: content ? content : "",
            }}
            onClick={() => {
              setOpen(true);
            }}
          ></div>

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
            <div
              className="relative bottom-0"
              onClick={(e) => e.preventDefault()}
              ref={ref}
            >
              <NoteTools
                note={_note}
                className="flex justify-between px-2"
                handleThemeChange={(color: string = "") => {
                  alert(color);
                  if (!_note) {
                    setBgColor(color);
                    return;
                  }
                  // alert(color)
                  saveNote({ ..._note, bgColor: color });
                }}
                handleClickCancel={() => {
                  if (content || title) {
                    const newNote = { title, content };
                    const updatedNote = { ..._note, ...newNote };
                    saveNote(isUpdate ? updatedNote : newNote);
                  }
                  setOpen(false);
                  setTitle("");
                  setContent("");
                  handleCancel?.();
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
