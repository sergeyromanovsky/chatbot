"use client";
import React, { FormEvent, useState } from "react";
import Select from "../UI/Select";
import { Button } from "@/components/UI/Button";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import { OPTIONS } from "@/utils/constants";
import { useAppContext } from "@/hooks/useAppContext";
import useOpenAi from "@/hooks/useOpenAi";

const Footer = () => {
  const { selectedItem, setSelectedItem, addMessage, apiKey, setApiKey } =
    useAppContext();
  const { generateResponse } = useOpenAi();
  const [messageValue, setMessageValue] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    addMessage({ isBot: false, text: messageValue });

    setMessageValue("");
    await generateResponse(messageValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-300 p-4 flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter your API key here"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Select
            options={OPTIONS}
            value={selectedItem}
            onChange={setSelectedItem}
          />
        </div>

        <Textarea
          className="w-full h-full"
          placeholder="Type your message here"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!messageValue.trim()}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default Footer;
