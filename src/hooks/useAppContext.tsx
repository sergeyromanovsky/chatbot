import {
  DEFAULT_MESSAGES,
  MessageProps,
  OPTIONS,
  OptionValues,
} from "@/utils/constants";
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
} from "react";

type AppContextType = {
  selectedItem: OptionValues;
  setSelectedItem: Dispatch<React.SetStateAction<string>>;
  apiKey: string;
  setApiKey: (value: string) => void;
  messages: MessageProps[];
  addMessage: (props: MessageProps) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const FooterContext = createContext<AppContextType>({
  apiKey: "",
  setApiKey: (value: string) => {},
  selectedItem: OPTIONS[1].value,
  setSelectedItem: (value: OptionValues) => {},
} as AppContextType);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string>(OPTIONS[1].value);
  const [apiKey, setApiKey] = useState<string>(
    "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"
  );
  const [messages, setMessages] = useState<MessageProps[]>(DEFAULT_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (msg: MessageProps) => {
    setMessages((prevState) => [...prevState, msg]);
  };

  const memoizedValue = useMemo(() => {
    return {
      selectedItem,
      setSelectedItem,
      apiKey,
      setApiKey,
      messages,
      addMessage,
      isLoading,
      setIsLoading,
    };
  }, [selectedItem, apiKey, messages, isLoading]);

  return (
    <FooterContext.Provider value={memoizedValue}>
      {children}
    </FooterContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(FooterContext);
  if (!ctx)
    throw new Error("useAppContext must be used within AppContextProvider");

  return ctx;
};
