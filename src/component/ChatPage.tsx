import React from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import ChatComponent from './ChatComponent';

const queryClient = new QueryClient();

type ChatPageProps = {
  dehydratedState: unknown;
};

const ChatPage: React.FC<ChatPageProps> = ({ dehydratedState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ChatComponent />
      </Hydrate>
    </QueryClientProvider>
  );
};

export const getServerSideProps = async () => {
  const dehydratedState = queryClient.getQueryData();
  return {
    props: {
      dehydratedState,
    },
  };
};

export default ChatPage;