import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { MapPin, Users, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { InvestmentDialog } from "./InvestmentDialog";

interface ProjectCardProps {
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

export function ProjectCard({
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
}: ProjectCardProps) {
  const progress = (currentAmount / targetAmount) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3>{title}</h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            <span>{currentAmount.toLocaleString('fr-FR')} €</span>
            <span className="text-muted-foreground">sur {targetAmount.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{investors} investisseurs</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{returnRate}% de rendement</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">En savoir plus</Button>
        <InvestmentDialog
          projectId={id}
          projectTitle={title}
          projectTargetAmount={targetAmount}
          projectCurrentAmount={currentAmount}
          projectInvestors={investors}
          onInvested={onInvested}
        />
      </CardFooter>
    </Card>
  );
}
