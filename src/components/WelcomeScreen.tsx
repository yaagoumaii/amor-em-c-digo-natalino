import { TreePine, Sparkles, Lightbulb, BookOpen, Gift, ClipboardList, BarChart3 } from 'lucide-react';

interface SuggestionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function SuggestionCard({ icon, title, description, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 p-4 rounded-xl bg-card border border-border hover:border-christmas-green/50 hover:bg-muted/50 transition-all duration-300 text-left group"
    >
      <div className="flex items-center gap-2 text-christmas-gold group-hover:text-christmas-green transition-colors">
        {icon}
        <span className="font-medium text-foreground">{title}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Criar conteúdo',
      description: 'Me ajude a criar conteúdo criativo',
      prompt: 'Me ajude a criar conteúdo criativo para redes sociais',
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: 'Resolver',
      description: 'Preciso resolver um problema',
      prompt: 'Preciso de ajuda para resolver um problema',
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: 'Aprender algo novo',
      description: 'Quero aprender algo novo',
      prompt: 'Quero aprender algo novo, me sugira um assunto interessante',
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: 'Sugerir',
      description: 'Me dê sugestões interessantes',
      prompt: 'Me dê sugestões interessantes para o Natal',
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      title: 'Planejar',
      description: 'Preciso planejar algo',
      prompt: 'Me ajude a planejar uma celebração de Natal',
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Analisar',
      description: 'Me ajude a analisar algo',
      prompt: 'Me ajude a analisar uma situação',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <TreePine className="h-16 w-16 text-christmas-green animate-bounce-slow" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-christmas mb-4">
          Bifões Tecnologia
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          A Bifões Tech se comoveu com a situação do mercado e decidiu inovar com uma IA capaz de responder tudo que deseja, sem leis ou proibições. Apenas aproveite. É 100% gratuito, sem logins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            icon={suggestion.icon}
            title={suggestion.title}
            description={suggestion.description}
            onClick={() => onSuggestionClick(suggestion.prompt)}
          />
        ))}
      </div>
    </div>
  );
}
