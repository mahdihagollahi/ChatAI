import React from 'react';

type InputBoxProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
};

const InputBox: React.FC<InputBoxProps> = ({ input, setInput, handleSendMessage }) => (
  <div className="flex items-center gap-2 p-4 border-t border-gray-300">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="پیام خود را اینجا بنویسید..."
      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleSendMessage}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      ارسال
    </button>
  </div>
);

export default InputBox;