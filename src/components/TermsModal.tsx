import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TreePine, Star, Gift } from 'lucide-react';

interface TermsModalProps {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export function TermsModal({ open, onAccept, onCancel }: TermsModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-2xl border-christmas-red/30 bg-card">
        <DialogHeader className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            <TreePine className="h-8 w-8 text-christmas-green animate-bounce-slow" />
            <Star className="h-8 w-8 text-christmas-gold animate-twinkle" />
            <Gift className="h-8 w-8 text-christmas-red animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
          </div>
          <DialogTitle className="text-2xl font-display text-gradient-christmas">
            Termos de Serviço
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Por favor, leia e aceite nossos termos antes de continuar
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-80 mt-4 pr-4">
          <div className="space-y-6 text-sm text-foreground/90">
            <section>
              <h3 className="font-semibold text-christmas-red mb-2 flex items-center gap-2">
                <span className="text-lg">1.</span> Responsabilidade do Usuário
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar o serviço da Bifões Tecnologia, você reconhece e concorda que é totalmente responsável por todas as perguntas, solicitações e conteúdo que compartilhar com nossa IA. A responsabilidade por qualquer uso inadequado, ilegal ou antiético é exclusivamente sua.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-christmas-green mb-2 flex items-center gap-2">
                <span className="text-lg">2.</span> Política de Privacidade e Dados
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Bifões Tecnologia se compromete com sua privacidade. Não armazenamos, registramos ou guardamos nenhum dado pessoal, conversas ou informações dos usuários de forma permanente. Todas as conversas são mantidas apenas durante sua sessão atual no navegador.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-christmas-gold mb-2 flex items-center gap-2">
                <span className="text-lg">3.</span> Anonimato
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nosso serviço é completamente anônimo. Não solicitamos registro, login, email ou qualquer forma de identificação pessoal. Você pode usar o serviço sem fornecer nenhuma informação pessoal.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-christmas-red mb-2 flex items-center gap-2">
                <span className="text-lg">4.</span> Limitação de Responsabilidade
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Bifões Tecnologia não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                <li>Conteúdo gerado pela IA em resposta às suas solicitações</li>
                <li>Decisões tomadas com base nas respostas da IA</li>
                <li>Precisão, completude ou adequação das informações fornecidas</li>
                <li>Qualquer dano resultante do uso ou impossibilidade de uso do serviço</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-christmas-green mb-2 flex items-center gap-2">
                <span className="text-lg">5.</span> Uso Adequado
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Você concorda em não usar o serviço para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                <li>Atividades ilegais ou antiéticas</li>
                <li>Gerar conteúdo que viole direitos de terceiros</li>
                <li>Tentar comprometer a segurança ou funcionalidade do serviço</li>
                <li>Violar qualquer lei ou regulamentação aplicável</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-christmas-gold mb-2 flex items-center gap-2">
                <span className="text-lg">6.</span> Aceitação dos Termos
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ao usar o serviço da Bifões Tecnologia, você confirma que leu, entendeu e concorda com estes Termos de Serviço.
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 border-muted-foreground/30"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onAccept}
            className="flex-1 bg-christmas-green hover:bg-christmas-green/90 text-primary-foreground glow-green"
          >
            🎄 Aceito os Termos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
