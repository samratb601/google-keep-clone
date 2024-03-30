import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { BiRedo, BiUndo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuBell } from "react-icons/lu";
import {
  MdOutlineColorLens,
  MdOutlineImage,
  MdPersonAddAlt,
} from "react-icons/md";
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
    const { deleteNote } = useNotesContext();
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
          <IconWrapper className="p-2 text-inherit hover:bg-zinc-700/40">
            <MdOutlineColorLens size={18} />
          </IconWrapper>
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
