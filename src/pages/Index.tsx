import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { TermsModal } from '@/components/TermsModal';
import { SnowEffect } from '@/components/SnowEffect';
import { useChat } from '@/hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';

const TERMS_KEY = 'bifoes-terms-accepted';

export default function Index() {
  const [termsAccepted, setTermsAccepted] = useState<boolean | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_KEY) === 'true';
    setTermsAccepted(accepted);
    if (!accepted) {
      setShowTerms(true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAcceptTerms = () => {
    localStorage.setItem(TERMS_KEY, 'true');
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const handleCancelTerms = () => {
    window.location.href = 'https://google.com';
  };

  const handleNewChat = () => {
    clearMessages();
  };

  const handleSend = (message: string) => {
    sendMessage(message);
  };

  if (termsAccepted === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SnowEffect />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background christmas-gradient">
      <SnowEffect />
      <TermsModal
        open={showTerms}
        onAccept={handleAcceptTerms}
        onCancel={handleCancelTerms}
      />
      
      <Header onNewChat={handleNewChat} />
      
      <main className="flex-1 flex flex-col container max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSend} />
        ) : (
          <ScrollArea ref={scrollRef} className="flex-1 px-4">
            <div className="py-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3 py-4">
                  <div className="h-8 w-8 rounded-full bg-christmas-green/20 flex items-center justify-center">
                    <span className="animate-pulse">🎄</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <span className="animate-pulse">Pensando...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
        
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={!termsAccepted}
        />
      </main>
    </div>
  );
}
