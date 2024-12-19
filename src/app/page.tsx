'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatComponent from '@/component/ChatComponent';

const queryClient = new QueryClient();

const ChatPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatComponent />
    </QueryClientProvider>
  );
};

export default ChatPage;
