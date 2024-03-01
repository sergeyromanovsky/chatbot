import React from "react";
import cls from "classnames";
import { MessageProps } from "@/utils/constants";

const Message = ({ text, isBot, imageUrl }: MessageProps) => {
  return (
    <div className={cls("flex", { "justify-end": !isBot })}>
      <div
        className={cls(
          "p-4 rounded-lg max-w-[50%] shadow-md",
          isBot ? "bg-[#f2f6f9]" : "bg-[#e6f9c7]"
        )}
      >
        <span className="text-sm">{text}</span>
        {imageUrl && (
          <img className="mt-4 w-full  rounded-sm" src={imageUrl} alt={text} />
        )}
      </div>
    </div>
  );
};

export default Message;
