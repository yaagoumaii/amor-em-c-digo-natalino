import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { ChatSession } from '@/components/ChatSidebar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SESSIONS_KEY = 'bifoes-chat-sessions';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function generateTitle(message: string): string {
  const cleaned = message.trim().slice(0, 40);
  return cleaned.length < message.trim().length ? `${cleaned}...` : cleaned;
}

function loadSessions(): ChatSession[] {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((s: ChatSession) => ({
        ...s,
        createdAt: new Date(s.createdAt),
      }));
    }
  } catch {}
  return [];
}

function saveSessions(sessions: ChatSession[]) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => loadSessions());
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  const updateSessions = useCallback((updater: (prev: ChatSession[]) => ChatSession[]) => {
    setSessions((prev) => {
      const updated = updater(prev);
      saveSessions(updated);
      return updated;
    });
  }, []);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: generateId(),
      title: 'Nova conversa',
      createdAt: new Date(),
      messages: [],
    };
    updateSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession.id;
  }, [updateSessions]);

  const sendMessage = useCallback(async (input: string) => {
    let sessionId = activeSessionId;
    
    // Create new session if none active
    if (!sessionId) {
      sessionId = createNewSession();
    }

    const userMessage: Message = { role: 'user', content: input };
    
    // Update session with user message
    updateSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const isFirstMessage = s.messages.length === 0;
        return {
          ...s,
          title: isFirstMessage ? generateTitle(input) : s.title,
          messages: [...s.messages, userMessage],
        };
      })
    );

    setIsLoading(true);
    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      updateSessions((prev) =>
        prev.map((s) => {
          if (s.id !== sessionId) return s;
          const last = s.messages[s.messages.length - 1];
          if (last?.role === 'assistant') {
            return {
              ...s,
              messages: s.messages.map((m, i) =>
                i === s.messages.length - 1 ? { ...m, content: assistantContent } : m
              ),
            };
          }
          return {
            ...s,
            messages: [...s.messages, { role: 'assistant', content: assistantContent }],
          };
        })
      );
    };

    try {
      const currentSession = sessions.find((s) => s.id === sessionId);
      const allMessages = [...(currentSession?.messages || []), userMessage];

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error('Limite de requisições excedido. Tente novamente em alguns segundos.');
        } else if (resp.status === 402) {
          toast.error('Créditos insuficientes. Por favor, adicione créditos.');
        } else {
          toast.error(errorData.error || 'Erro ao processar sua mensagem');
        }
        setIsLoading(false);
        return;
      }

      if (!resp.body) {
        throw new Error('No response body');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {}
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Erro ao conectar com a IA. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId, sessions, createNewSession, updateSessions]);

  const selectSession = useCallback((id: string) => {
    setActiveSessionId(id);
  }, []);

  const deleteSession = useCallback((id: string) => {
    updateSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  }, [activeSessionId, updateSessions]);

  const clearActiveSession = useCallback(() => {
    setActiveSessionId(null);
  }, []);

  return {
    messages,
    sessions,
    activeSessionId,
    isLoading,
    sendMessage,
    createNewSession,
    selectSession,
    deleteSession,
    clearActiveSession,
  };
}
