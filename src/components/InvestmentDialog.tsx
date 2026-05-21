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
}

export function InvestmentDialog({
  projectId,
  projectTitle,
  projectTargetAmount,
  projectCurrentAmount,
  projectInvestors,
  onInvested,
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

    setMessage({ text: "Investissement enregistré avec succès !", type: "success" });
    onInvested?.(parsedAmount);
    setAmount("20");
    setLoading(false);
    setOpen(false);
  };

  const projectedCurrentAmount = projectCurrentAmount + Number(amount || 0);
  const projectedInvestors = projectInvestors + 1;
  const progress = Math.min((projectedCurrentAmount / projectTargetAmount) * 100, 100);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-primary hover:bg-primary/90">Investir dès 20€</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Investir dans {projectTitle}</DialogTitle>
          <DialogDescription>
            Soutenez ce projet solaire et suivez votre impact depuis votre tableau de bord.
          </DialogDescription>
        </DialogHeader>

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
              <div className={`p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message.text}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Confirmer l'investissement"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}