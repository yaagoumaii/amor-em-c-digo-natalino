import { MessageSquare, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

export function ChatSidebar({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: ChatSidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-christmas-green" />
              Histórico
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <Button
              onClick={onNewChat}
              className="w-full bg-christmas-green hover:bg-christmas-green/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Chat
            </Button>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 pb-4">
              {sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhuma conversa ainda
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      'group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors',
                      activeSessionId === session.id
                        ? 'bg-christmas-green/20 text-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => onSelectSession(session.id)}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 truncate text-sm">{session.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              🎄 Bifões Tecnologia
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
