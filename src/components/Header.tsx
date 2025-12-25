import { TreePine, History } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewChat: () => void;
}

export function Header({ onNewChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
            <History className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <TreePine className="h-6 w-6 text-christmas-green" />
            <span className="font-semibold text-lg">Bifões Tecnologia</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNewChat}
            className="h-9 w-9 rounded-full hover:bg-muted"
            title="Novo chat"
          >
            <History className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
