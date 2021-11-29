import React, { useState } from "react";

import MemoryContext, { Memory } from "./memoryContext";

const MemoryProvider: React.FC = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const addMemory = (
    path: string,
    base64Data: string,
    title: string,
    type: "good" | "bad"
  ) => {
    const newMemory: Memory = {
      id: Math.random().toString(),
      title,
      type,
      imagePath: path,
      base64Url: base64Data,
    };
    setMemories((curMemories) => {
      return [...curMemories, newMemory];
    });
  };
  return (
    <MemoryContext.Provider value={{ memories, addMemory }}>
      {props.children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;
