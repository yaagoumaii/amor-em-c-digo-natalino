import { cn } from '@/lib/utils';
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex gap-3 py-4 group', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-christmas-green/20 flex items-center justify-center">
          <Bot className="h-4 w-4 text-christmas-green" />
        </div>
      )}
      
      <div className="relative max-w-[80%]">
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-christmas-red text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2 prose-pre:p-0 prose-pre:bg-transparent">
              <ReactMarkdown
                components={{
                  strong: ({ children }) => (
                    <strong className="font-bold text-christmas-gold">{children}</strong>
                  ),
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !className;
                    
                    if (isInline) {
                      return (
                        <code className="bg-background/50 px-1.5 py-0.5 rounded text-christmas-gold font-mono text-xs" {...props}>
                          {children}
                        </code>
                      );
                    }
                    
                    return (
                      <div className="relative my-2 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-background/80 px-3 py-1.5 text-xs text-muted-foreground">
                          <span>{match?.[1] || 'code'}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => {
                              navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                              toast.success('Código copiado!');
                            }}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copiar
                          </Button>
                        </div>
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match?.[1] || 'text'}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            fontSize: '0.75rem',
                          }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute -bottom-8 left-0 h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1 text-christmas-green" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </>
            )}
          </Button>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-christmas-red/20 flex items-center justify-center">
          <User className="h-4 w-4 text-christmas-red" />
        </div>
      )}
    </div>
  );
}
