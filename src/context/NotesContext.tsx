"use client";
import ApiClient from "@/lib/fetch";
import { NoteType } from "@/types/note";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type NotesContextType = {
  isSavingNotes: boolean;
  setIsSavingNotes: Dispatch<SetStateAction<boolean>>;
  notes: NoteType[];
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  getNotes: (noteId?: string) => Promise<any>;
  saveNote: (data: {
    id?: string;
    title: string;
    content: string;
    pinned?:boolean
  }) => Promise<any>;
};

const NotesContext = createContext<NotesContextType>({
  isSavingNotes: false,
  setIsSavingNotes: () => {},
  notes: [],
  setNotes: () => {},
  getNotes: async (noteId?: string) => Promise<{}>,
  saveNote: async (data: { id?: string; title: string; content: string,pinned?:boolean }) =>
    Promise<{}>,
});

export const useNotesContext = () => {
  return useContext(NotesContext);
};

export const NotesContextProvider = ({ children }: any) => {
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  const getNotes = async (noteId?: string) => {
    return await ApiClient.get("/notes");
  };

  const saveNote = async (data: NoteType) => {
    const id = data._id;
    const res = await ApiClient[id ? "patch" : "post"]("/notes", data);
    if (res.data) {
      setNotes((prev) => {
        if (id) {
          const fIndex = prev.findIndex((item) => item._id == id);
          // console.log(fIndex)
          if (fIndex != -1) {
            console.log(res.data)
            prev[fIndex] = res.data;
          }
          return [...prev];
        }
        return [res.data, ...prev];
      });
    }
    return res;
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await getNotes();
      if (data) {
        setNotes(data);
      }
    })();

    return () => {
      setNotes([]);
    };
  }, []);

  const value = {
    isSavingNotes,
    setIsSavingNotes,
    notes,
    setNotes,
    getNotes,
    saveNote,
  };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
