import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { BiRedo, BiUndo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuBell } from "react-icons/lu";
import {
  MdOutlineColorLens,
  MdOutlineImage,
  MdOutlineInvertColorsOff,
  MdPersonAddAlt,
} from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiArchiveBox } from "react-icons/pi";
import { IconWrapper } from "./IconWrapper";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  note?: NoteType;
  showUndoRedo?: boolean;
  handleClickCancel?: () => void;
}

const NoteTools = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      note,
      children,
      className,
      showUndoRedo = true,
      handleClickCancel,
      ...props
    },
    ref
  ) => {
    const { deleteNote, saveNote } = useNotesContext();

    const bgColors = [
      { name: "Coral", code: "#CC3311" }, // Dark Coral
      { name: "Peach", code: "#FF7755" }, // Dark Peach
      { name: "Sand", code: "#8C3A00" }, // Dark Sand
      { name: "Mint", code: "#4B8C32" }, // Dark Mint
      { name: "Sage", code: "#2E6F39" }, // Dark Sage
      { name: "Fogg", code: "#555555" }, // Dark Fogg
      { name: "Strom", code: "#1C2B3C" }, // Dark Strom
      { name: "Dusk", code: "#000000" }, // Black (Dusk)
      { name: "Blossom", code: "#FF5566" }, // Dark Blossom
      { name: "Clay", code: "#663300" }, // Dark Clay
    ];

    const handleColorChange = (color: string = "") => {
      if (!note) return;
      // alert(color)
      saveNote({ ...note, bgColor: color });
    };

    return (
      <div
        ref={ref}
        className={cn(
          ` w-full px-2 py-1 flex justify-between text-inherit`,
          className
        )}
        {...props}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-between`}>
          <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
            <LuBell size={18} />
          </IconWrapper>
          <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
            <MdPersonAddAlt size={18} />
          </IconWrapper>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
                <MdOutlineColorLens size={18} />
              </IconWrapper>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-fit gap-x-1 bg-primary text-white  border-primary shadow-dark">
              <DropdownMenuItem
                style={{ backgroundColor: "#00000000" }}
                className={cn(
                  `p-1 w-8 h-8 rounded-full focus:text-white border-2 border-slate-400 hover:border-white cursor-pointer`,
                  `${
                    !note?.bgColor
                      ? "relative border-2 border-purple-500 hover:border-purple-500"
                      : ""
                  }`
                )}
                onClick={() => handleColorChange()}
              >
                <MdOutlineInvertColorsOff size={20} />
                {!note?.bgColor && (
                  <IoIosCheckmarkCircle
                    className="text-purple-500 absolute -top-2 -right-1.5"
                    size={19}
                  />
                )}
              </DropdownMenuItem>
              {bgColors.map((item) => (
                <DropdownMenuItem
                  key={`drp-dwn-item-${item.name}`}
                  style={{ backgroundColor: item.code }}
                  className={cn(
                    `p-1 w-8 h-8 rounded-full hover:border-2 hover:border-white cursor-pointer`,
                    `${
                      item.code == note?.bgColor
                        ? "relative border-2 border-purple-500 hover:border-purple-500"
                        : ""
                    }`
                  )}
                  onClick={() => handleColorChange(item.code)}
                >
                  {item.code == note?.bgColor && (
                    <IoIosCheckmarkCircle
                      className="text-purple-500 absolute -top-2 -right-1.5"
                      size={19}
                    />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
            <MdOutlineImage size={18} />
          </IconWrapper>
          <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
            <PiArchiveBox size={18} />
          </IconWrapper>
          <DropdownMenuThreeDot
            menus={[
              {
                label: "Delete note",
                onClick: () => note?._id && deleteNote(note._id),
              },
            ]}
          >
            <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
              <BsThreeDotsVertical size={18} />
            </IconWrapper>
          </DropdownMenuThreeDot>

          {showUndoRedo && (
            <>
              <IconWrapper
                className={cn(
                  "p-2 text-muted-foreground cursor-not-allowed",
                  `${false ? "text-inherit cursor-pointer" : ""}`
                )}
              >
                <BiUndo size={18} />
              </IconWrapper>
              <IconWrapper
                className={cn(
                  "p-2 text-muted-foreground cursor-not-allowed",
                  `${false ? "text-inherit cursor-pointer" : ""}`
                )}
              >
                <BiRedo size={18} />
              </IconWrapper>
            </>
          )}
        </div>
        {handleClickCancel && (
          <div>
            <button
              className="text-sm px-6 py-2 rounded-md hover:bg-zinc-700/30"
              onClick={handleClickCancel}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
);
NoteTools.displayName = "NoteTools";

export { NoteTools };

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotesContext } from "@/context/NotesContext";
import { NoteType } from "@/types/note";

export function DropdownMenuThreeDot({
  children,
  menus,
}: {
  children: ReactNode;
  menus: {
    label: string;
    onClick?: () => void;
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary text-white border-primary shadow-dark">
        {menus.map((item) => (
          <DropdownMenuItem
            className="focus:bg-stone-700/50 focus:text-white cursor-pointer"
            key={`drp-dwn-item-${item.label}`}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
