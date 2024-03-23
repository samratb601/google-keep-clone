import { IconWrapper } from "@/components/ui/icon-wrapper";
import useOutsideClick from "@/customHooks/useOutsideClick";
import { cn, debounce } from "@/lib/utils";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { BiPaint, BiRedo, BiUndo } from "react-icons/bi";
import { BsPin, BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { LuBell } from "react-icons/lu";
import {
  MdOutlineColorLens,
  MdOutlineImage,
  MdPersonAddAlt,
} from "react-icons/md";
import { PiArchiveBox } from "react-icons/pi";

const TakeNote = () => {
  const ref = useRef<any>();
  const noteRef = useRef<any>();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useOutsideClick(ref, () => {
    handleNoteChange("");
    setOpen(false);
  });

  useEffect(() => {
    if (note) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(noteRef.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else if (!note && open) noteRef.current.focus();
  }, [note, open]);

  const handleTitleChange = useCallback(
    debounce((value: string) => {
      setTitle(value);
    }, 300),
    []
  );

  const handleNoteChange = useCallback(
    debounce((value: string) => {
      setNote(value);
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
        "relative h-auto w-[95%] md:w-[56%] lg:w-[30%] border border-zinc-500 bg-primary rounded-md shadow-lg",
        `${open ? "" : ""}`
      )}
    >
      {open && (
        <input
          className="w-full h-[45px] rounded-md pl-4 bg-transparent border-none placeholder:text-stone-300 focus:outline-none focus:border-none focus:ring-0
        focus-visible:ring-0 focus-visible:ring-offset-0 tracking-wide text-stone-300"
          placeholder="Title"
          onChange={handleTitleChange}
        />
      )}

      {note ? (
        <div
          className="w-full min-h-[45px] rounded-md pl-4 py-2.5 bg-transparent border-none placeholder:text-stone-300 focus:outline-none focus:border-none focus:ring-0
            focus-visible:ring-0 focus-visible:ring-offset-0 text-[0.9rem] text-stone-300"
          ref={noteRef}
          contentEditable
          onKeyUp={handleKeyUp}
          onInput={(e) => {
            const target = e.target as HTMLDivElement;
            const value = target.innerText;
            handleNoteChange(value);
          }}
          dangerouslySetInnerHTML={{ __html: note }}
        ></div>
      ) : (
        <input
          className="w-full h-[45px] rounded-md pl-4 bg-transparent border-none placeholder:text-stone-300 focus:outline-none focus:border-none focus:ring-0
        focus-visible:ring-0 focus-visible:ring-offset-0 text-[0.9rem] text-stone-300"
          ref={noteRef}
          placeholder="Take a note..."
          onClick={() => {
            setOpen(true);
          }}
          onChange={(e) => setNote(e.target.value)}
        />
      )}

      {open ? (
        <div className="flex absolute right-1.5 top-1.5">
          <IconWrapper className="p-2">
            <BsPin size={20} />
          </IconWrapper>
        </div>
      ) : (
        <div className="flex absolute right-0 top-0">
          <IconWrapper>
            <IoIosCheckboxOutline size={20} />
          </IconWrapper>
          <IconWrapper>
            <BiPaint size={20} />
          </IconWrapper>
          <IconWrapper>
            <MdOutlineImage size={20} />
          </IconWrapper>
        </div>
      )}

      {open && (
        <div className="relative bottom-0 w-full px-2 py-1 flex justify-between text-stone-300">
          <div className="flex gap-x-2">
            <IconWrapper className="p-2 text-inherit">
              <LuBell size={18} />
            </IconWrapper>
            <IconWrapper className="p-2 text-inherit">
              <MdPersonAddAlt size={18} />
            </IconWrapper>
            <IconWrapper className="p-2 text-inherit">
              <MdOutlineColorLens size={18} />
            </IconWrapper>
            <IconWrapper className="p-2 text-inherit">
              <MdOutlineImage size={18} />
            </IconWrapper>
            <IconWrapper className="p-2 text-inherit">
              <PiArchiveBox size={18} />
            </IconWrapper>
            <IconWrapper className="p-2 text-inherit">
              <BsThreeDotsVertical size={18} />
            </IconWrapper>
            <IconWrapper
              className={cn(
                "p-2 text-muted-foreground cursor-not-allowed",
                `${note ? "text-inherit cursor-pointer" : ""}`
              )}
            >
              <BiUndo size={18} />
            </IconWrapper>
            <IconWrapper
              className={cn(
                "p-2 text-muted-foreground cursor-not-allowed",
                `${note ? "text-inherit cursor-pointer" : ""}`
              )}
            >
              <BiRedo size={18} />
            </IconWrapper>
          </div>
          <div>
            <button
              className="text-sm px-6 py-2 rounded-md hover:bg-zinc-700/30"
              onClick={() => {
                setOpen(false);
                setNote("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeNote;
