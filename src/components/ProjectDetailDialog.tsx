import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { InvestmentDialog } from "./InvestmentDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MapPin, Users, TrendingUp, Leaf, Calendar, Target } from "lucide-react";

interface ProjectDetailDialogProps {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  investors: number;
  returnRate: string;
  category: string;
  onInvested?: (amount: number) => void;
}

export function ProjectDetailDialog({
  id,
  title,
  location,
  description,
  imageUrl,
  targetAmount,
  currentAmount,
  investors,
  returnRate,
  category,
  onInvested,
}: ProjectDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - currentAmount;
  const co2Estimate = (currentAmount * 0.0003).toFixed(2);

  // Durée estimée selon le montant cible
  const getDuration = (amount: number) => {
    if (amount < 40000) return "5-7 ans";
    if (amount < 70000) return "8-12 ans";
    return "10-15 ans";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">En savoir plus</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="relative h-56 rounded-xl overflow-hidden -mx-1">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {category}
          </Badge>
        </div>

        {/* Location & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          <p className="text-foreground leading-relaxed">{description}</p>
        </div>

        {/* Progress */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-primary">{currentAmount.toLocaleString("fr-FR")} € collectés</span>
            <span className="text-muted-foreground">Objectif : {targetAmount.toLocaleString("fr-FR")} €</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-primary">{Math.round(progress)}% atteint</span>
            <span className="text-muted-foreground">Reste {remaining.toLocaleString("fr-FR")} € à collecter</span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{investors}</p>
              <p className="text-xs text-muted-foreground">Investisseurs</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{returnRate}%</p>
              <p className="text-xs text-muted-foreground">Rendement / an</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{co2Estimate} t</p>
              <p className="text-xs text-muted-foreground">CO₂ évité estimé</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-orange-600">{getDuration(targetAmount)}</p>
              <p className="text-xs text-muted-foreground">Durée estimée</p>
            </div>
          </div>
        </div>

        {/* Minimum investment */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">Investissement minimum</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Participez à ce projet solaire à partir de <strong className="text-primary">20 €</strong>. 
            Vos revenus sont générés par la vente de l'électricité produite et versés annuellement.
          </p>
        </div>

        {/* Action Button */}
        <InvestmentDialog
          projectId={id}
          projectTitle={title}
          projectTargetAmount={targetAmount}
          projectCurrentAmount={currentAmount}
          projectInvestors={investors}
          onInvested={(amount) => {
            onInvested?.(amount);
            setOpen(false);
          }}
          triggerLabel="Investir dans ce projet"
          triggerClassName="w-full"
        />
      </DialogContent>
    </Dialog>
  );
}
