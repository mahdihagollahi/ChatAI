import Image from 'next/image';
import React from 'react';

type ChatBoxProps = {
  messages: {
    text: string;
    type: 'user-message' | 'assistant-message';
    images?: string[];
  }[];
  chatboxRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages, chatboxRef, isLoading }) => (
  <div
    id="chatbox"
    ref={chatboxRef}
    className="flex-1 overflow-y-auto border border-gray-300 p-4 space-y-2"
  >
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`p-2 rounded-md ${
          msg.type === 'user-message'
            ? 'bg-blue-500 text-white self-end'
            : 'bg-gray-200 text-black self-start'
        }`}
      >
        {msg.text}
        {msg.images &&
          msg.images.map((img, i) => (
            <Image key={i} src={img} alt="response" className="mt-2 max-w-xs" />
          ))}
      </div>
    ))}
    {isLoading && (
      <Image
        src="https://delavers.ir/images/loading.gif"
        alt="Loading..."
        className="block mx-auto mt-4"
      />
    )}
  </div>
);

export default ChatBox;