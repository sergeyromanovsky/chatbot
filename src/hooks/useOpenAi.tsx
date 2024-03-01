"use client";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { useAppContext } from "./useAppContext";

const useOpenAi = () => {
  const { selectedItem, apiKey, addMessage, setIsLoading } = useAppContext();

  const [openAiClient, setOpenAiClient] = useState<OpenAI | null>(null);

  useEffect(() => {
    const client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    setOpenAiClient(client);
  }, [apiKey]);

  const generateResponse = async (prompt: string) => {
    setIsLoading(true);

    selectedItem === "chat-gpt"
      ? await getChatCompletion(prompt)
      : await generateImage(prompt);

    setIsLoading(false);
  };

  const generateImage = async (prompt: string) => {
    const image = await openAiClient?.images.generate({
      prompt,
      model: "dall-e-3",
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    addMessage({
      isBot: true,
      text: image?.data[0].revised_prompt || prompt,
      imageUrl: image?.data[0].url,
    });

    return image?.data[0].url;
  };

  const getChatCompletion = async (message: string) => {
    const chatCompletion = await openAiClient?.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    const response =
      chatCompletion?.choices[0].message.content ||
      "Unable to generate response. Please try again.";

    addMessage({ isBot: true, text: response });
  };

  return { generateResponse };
};

export default useOpenAi;
