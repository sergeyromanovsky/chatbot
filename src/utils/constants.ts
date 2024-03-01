export const OPTIONS = [
  {
    value: "dalle",
    label: "DALLE",
  },
  {
    value: "chat-gpt",
    label: "ChatGPT",
  },
];

export type OptionValues = (typeof OPTIONS)[number]["value"];

export type MessageProps = {
  isBot: boolean;
  text: string;
  imageUrl?: string;
};

export const DEFAULT_MESSAGES: MessageProps[] = [
  {
    isBot: true,
    text: "Hello! I'm an AI assistant. How can I help you today?",
  },
];
