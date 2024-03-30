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
  saveNote: (data: NoteType) => Promise<any>;
  deleteNote: (id: string) => Promise<any>;
};

const NotesContext = createContext<NotesContextType>({
  isSavingNotes: false,
  setIsSavingNotes: () => {},
  notes: [],
  setNotes: () => {},
  getNotes: async (noteId?: string) => Promise<{}>,
  saveNote: async (data: NoteType) => Promise<{}>,
  deleteNote: async (id: string) => Promise<{}>,
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
    if (id) {
      setNotes((prev) => {
        const fIndex = prev.findIndex((item) => item._id == id);
        if (fIndex != -1) {
          prev[fIndex] = data;
          console.log(data);
        }
        return [...prev];
      });
    }
    const res = await ApiClient[id ? "patch" : "post"]("/notes", data);
    if (!id && res.data) {
      setNotes((prev) => {
        return [res.data, ...prev];
      });
    }
    return res;
  };

  const deleteNote = async (id: string) => {
    if (!id) return;
    setNotes((prev) => {
      return prev.filter((item) => item._id !== id);
    });
    const res = await ApiClient.delete(`/notes`, { _id: id });
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
    deleteNote,
  };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
