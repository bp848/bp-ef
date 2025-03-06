
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage as ChatMessageType } from '@/types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isTyping: boolean;
}

const ChatMessageList = ({ messages, isTyping }: ChatMessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100); // 少し遅延させてDOMの更新を確実に捉える
    
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  return (
    <ScrollArea className="h-full py-4 px-4" ref={scrollAreaRef}>
      <div className="space-y-4 min-h-[400px]">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
