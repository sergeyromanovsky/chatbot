"use client";
import React, { useEffect, useRef } from "react";
import Message from "../Message";
import { useAppContext } from "@/hooks/useAppContext";

const Main = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { messages, isLoading } = useAppContext();
  
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grow flex flex-col gap-2 p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
      {isLoading && <Message isBot text="Generating..." />}
      <div ref={ref} />
    </div>
  );
};

export default Main;
