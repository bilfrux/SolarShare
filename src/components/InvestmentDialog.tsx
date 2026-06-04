import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface InvestmentDialogProps {
  projectId: string;
  projectTitle: string;
  projectTargetAmount: number;
  projectCurrentAmount: number;
  projectInvestors: number;
  onInvested?: (amount: number) => void;
  /** Label personnalisé du bouton déclencheur */
  triggerLabel?: string;
  /** Classes CSS supplémentaires pour le bouton déclencheur */
  triggerClassName?: string;
}

// Un projet est "démo" s'il n'a pas un UUID valide (e.g. "demo1", "demo2"...)
function isDemo(projectId: string): boolean {
  return projectId.startsWith("demo");
}

export function InvestmentDialog({
  projectId,
  projectTitle,
  projectTargetAmount,
  projectCurrentAmount,
  projectInvestors,
  onInvested,
  triggerLabel = "Investir dès 20€",
  triggerClassName = "flex-1",
}: InvestmentDialogProps) {
  const [session, setSession] = useState<any>(null);
  const [amount, setAmount] = useState("20");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInvest = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const parsedAmount = Number(amount);

    if (!session?.user?.id) {
      setMessage({ text: "Vous devez être connecté pour investir.", type: "error" });
      setLoading(false);
      return;
    }

    if (Number.isNaN(parsedAmount) || parsedAmount < 20) {
      setMessage({ text: "Le montant minimum est de 20 €.", type: "error" });
      setLoading(false);
      return;
    }

    // --- SIMULATION STRIPE ---
    setMessage({ text: "Redirection vers Stripe...", type: "info" });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setMessage({ text: "Traitement du paiement bancaire...", type: "info" });
    await new Promise(resolve => setTimeout(resolve, 1200));
    // -------------------------

    // Si c'est un projet de démonstration, on simule l'investissement sans DB
    if (isDemo(projectId)) {
      setMessage({ text: "Paiement validé par Stripe ! Investissement simulé (projet de démonstration).", type: "success" });
      onInvested?.(parsedAmount);
      setAmount("20");
      setLoading(false);
      setTimeout(() => {
        setOpen(false);
        setMessage({ text: "", type: "" });
      }, 2000);
      return;
    }

    // Projet réel → sauvegarde en base
    const { error } = await supabase.from("investments").insert({
      user_id: session.user.id,
      project_id: projectId,
      amount: parsedAmount,
    });

    if (error) {
      setMessage({ text: "Erreur lors de l'investissement : " + error.message, type: "error" });
      setLoading(false);
      return;
    }

    setMessage({ text: "Paiement validé par Stripe ! Investissement enregistré.", type: "success" });
    onInvested?.(parsedAmount);
    setAmount("20");
    setLoading(false);
    
    setTimeout(() => {
      setOpen(false);
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  const projectedCurrentAmount = projectCurrentAmount + Number(amount || 0);
  const projectedInvestors = projectInvestors + 1;
  const progress = Math.min((projectedCurrentAmount / projectTargetAmount) * 100, 100);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-primary hover:bg-primary/90 ${triggerClassName}`}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Investir dans {projectTitle}</DialogTitle>
          <DialogDescription>
            Soutenez ce projet solaire et suivez votre impact depuis votre tableau de bord.
          </DialogDescription>
        </DialogHeader>

        {/* Bandeau projet démo */}
        {isDemo(projectId) && session && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 flex items-start gap-2">
            <span className="font-bold shrink-0">ℹ</span>
            <span>Projet de <strong>démonstration</strong> — l'investissement sera simulé et non enregistré en base de données.</span>
          </div>
        )}

        {!session ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Vous devez être connecté pour enregistrer un investissement.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Fermer</Button>
              <Button asChild>
                <Link to="/connexion">Se connecter</Link>
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleInvest} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant à investir</Label>
              <Input
                id="amount"
                type="number"
                min="20"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="20"
              />
              <p className="text-xs text-muted-foreground">Minimum 20 €</p>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
              <p><span className="font-medium">Projet :</span> {projectTitle}</p>
              <p><span className="font-medium">Progression estimée :</span> {Math.round(progress)}%</p>
              <p><span className="font-medium">Nouveaux fonds :</span> {projectedCurrentAmount.toLocaleString("fr-FR")} €</p>
              <p><span className="font-medium">Nouveaux investisseurs :</span> {projectedInvestors}</p>
            </div>

            {message.text && (
              <div className={`p-3 rounded-md text-sm ${
                message.type === 'error' ? 'bg-red-50 text-red-600' :
                message.type === 'info' ? 'bg-[#635BFF]/10 text-[#635BFF] flex items-center gap-2 font-medium' :
                'bg-green-50 text-green-600'
              }`}>
                {message.type === 'info' && (
                  <svg className="animate-spin h-4 w-4 text-[#635BFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {message.text}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Annuler
              </Button>
              <Button type="submit" disabled={loading} className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">
                {loading ? "Redirection..." : "Payer avec Stripe"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}