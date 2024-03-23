'use client'
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  
  type NotesContextType = {
    // canvasEl: HTMLCanvasElement | null | undefined;
    // setCanvasEl: Dispatch<SetStateAction<HTMLCanvasElement | null | undefined>>;
    // toolType: ToolType;
    // setToolType: Dispatch<SetStateAction<ToolType>>;
    
  };
  
  const NotesContext = createContext<NotesContextType>({
    
  });
  
  export const useNotesContext = () => {
    return useContext(NotesContext);
  };
  
  
  export const NotesContextProvider = ({ children }: any) => {
   
  
   
  
    const value = {
  
    };
    return (
      <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
    );
  };
  