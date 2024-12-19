'use client'
import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import ChatBox from './ChatBox';
import InputBox from '@/component/InputBox';

type Message = {
  text: string;
  type: 'user-message' | 'assistant-message';
  images?: string[];
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const sendMessage = async (message: string) => {
    const jwtToken = localStorage.getItem('jwt_token');
    if (!jwtToken) throw new Error('توکن JWT موجود نیست.');

    const requestBody = {
      message,
      assistant_id: currentAssistantId !== 'general' ? currentAssistantId : null,
      conversation_id: currentConversationId,
      ...(currentAssistantId === 'general' && attachedImageBase64
        ? { image_base64: attachedImageBase64 }
        : {}),
    };

    const response = await axios.post('https://api.delavers.ir/send_message', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return response.data;
  };

  const { mutate, isLoading } = useMutation(sendMessage, {
    onSuccess: (data) => {
      if (data.error) {
        alert('خطا: ' + data.error);
        return;
      }

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, type: 'assistant-message', images: data.images || [] },
        ]);
      }

      if (data.conversation_id) {
        currentConversationId = data.conversation_id;
      }

      attachedImageBase64 = null;
      scrollToBottom();
    },
    onError: (error) => {
      console.error('Error:', error.message);
      alert('مشکلی پیش آمد. لطفاً بعداً تلاش کنید.');
    },
  });

  const handleSendMessage = () => {
    if (!input.trim()) {
      alert('پیام نمی‌تواند خالی باشد');
      return;
    }

    const newMessage: Message = { text: input, type: 'user-message' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    scrollToBottom();

    mutate(input);
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatBox messages={messages} chatboxRef={chatboxRef} isLoading={isLoading} />
      <InputBox input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatComponent;