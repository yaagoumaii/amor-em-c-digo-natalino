import { TreePine, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  onNewChat: () => void;
}

export function Header({ onMenuClick, onNewChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <TreePine className="h-6 w-6 text-christmas-green" />
            <span className="font-semibold text-lg hidden sm:inline">Bifões Tecnologia</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
