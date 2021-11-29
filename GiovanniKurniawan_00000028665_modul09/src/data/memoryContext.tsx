import React from "react";

export interface Memory {
  id: string;
  imagePath: string;
  title: string;
  type: "good" | "bad";
  base64Url: string;
}

const MemoryContext = React.createContext<{
  memories: Memory[];
  addMemory: (
    path: string,
    base64Data: string,
    title: string,
    type: "good" | "bad"
  ) => void;
}>({
  memories: [],
  addMemory: () => {},
});

export default MemoryContext;
