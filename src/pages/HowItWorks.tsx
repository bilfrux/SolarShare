import { 
  Sun, 
  Users, 
  TrendingUp, 
  Leaf, 
  CheckCircle2
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-foreground mb-4">
            Comment fonctionne SolarShare ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Investir dans la transition énergétique n'a jamais été aussi simple
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl text-primary">1</span>
            </div>
            <h3 className="text-xl text-foreground">Choisissez un projet</h3>
            <p className="text-muted-foreground">
              Parcourez nos projets solaires locaux et sélectionnez celui qui vous inspire
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl text-primary">2</span>
            </div>
            <h3 className="text-xl text-foreground">Investissez à partir de 20€</h3>
            <p className="text-muted-foreground">
              Participez au financement avec un montant accessible à tous
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl text-primary">3</span>
            </div>
            <h3 className="text-xl text-foreground">Installation réalisée</h3>
            <p className="text-muted-foreground">
              Les panneaux solaires sont installés et mis en service
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl text-primary">4</span>
            </div>
            <h3 className="text-xl text-foreground">Suivez votre impact</h3>
            <p className="text-muted-foreground">
              Recevez vos revenus et visualisez l'impact environnemental en temps réel
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <h2 className="text-3xl text-foreground mb-8 text-center">
            Les avantages de SolarShare
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Accessible à tous</h3>
                <p className="text-muted-foreground">
                  Investissez dès 20€ dans des projets solaires locaux, sans minimum de revenus requis
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Rendement attractif</h3>
                <p className="text-muted-foreground">
                  Bénéficiez d'un rendement moyen de 4% tout en contribuant à la transition énergétique
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Impact environnemental</h3>
                <p className="text-muted-foreground">
                  Contribuez directement à la réduction des émissions de CO₂ et à la production d'énergie propre
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Projets locaux</h3>
                <p className="text-muted-foreground">
                  Investissez dans des projets de votre région et voyez concrètement l'impact de votre contribution
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Suivi en temps réel</h3>
                <p className="text-muted-foreground">
                  Suivez la production d'énergie, vos revenus et votre impact environnemental depuis votre tableau de bord
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">Transparence totale</h3>
                <p className="text-muted-foreground">
                  Accédez à toutes les informations sur les projets, leur avancement et leur performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl text-foreground mb-8 text-center">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl text-foreground mb-2">Quel est le montant minimum d'investissement ?</h3>
              <p className="text-muted-foreground">
                Le montant minimum d'investissement est de 20€ par projet, ce qui rend SolarShare accessible à tous les citoyens.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl text-foreground mb-2">Quel est le rendement attendu ?</h3>
              <p className="text-muted-foreground">
                Le rendement moyen est de 4% par an, mais il peut varier selon les projets. Les rendements sont générés par la vente de l'électricité produite.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl text-foreground mb-2">Comment puis-je suivre mes investissements ?</h3>
              <p className="text-muted-foreground">
                Vous avez accès à un tableau de bord personnel qui vous permet de suivre en temps réel la production d'énergie, vos revenus et votre impact environnemental.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl text-foreground mb-2">Les projets sont-ils sécurisés ?</h3>
              <p className="text-muted-foreground">
                Tous les projets sont soigneusement sélectionnés et analysés. Nous travaillons avec des partenaires certifiés et les installations sont garanties.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl text-foreground mb-2">Puis-je retirer mon investissement ?</h3>
              <p className="text-muted-foreground">
                Les investissements sont généralement bloqués pour la durée du projet (entre 5 et 20 ans selon les projets). Consultez les conditions spécifiques de chaque projet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
