import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ProjectCard } from "../components/ProjectCard";
import { StatsCard } from "../components/StatsCard";
import { 
  Sun, 
  Users, 
  TrendingUp, 
  Leaf, 
  Zap, 
  Heart,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const projects = [
  {
    id: "1",
    title: "École Primaire Jean Moulin",
    location: "Lyon, Rhône-Alpes",
    description: "Installation de 45 panneaux solaires sur le toit de l'école primaire pour alimenter les salles de classe et la cantine.",
    imageUrl: "https://images.unsplash.com/photo-1743352476730-056502fba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2Mjk5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 45000,
    currentAmount: 32400,
    investors: 162,
    returnRate: "4.2",
    category: "Éducation"
  },
  {
    id: "2",
    title: "Résidence Les Jardins Verts",
    location: "Nantes, Pays de la Loire",
    description: "Projet solaire pour une copropriété de 80 logements, réduction de 40% des factures d'électricité commune.",
    imageUrl: "https://images.unsplash.com/photo-1628206554201-41ebb06ef313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGVuZXJneSUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc2MzAxNDUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 68000,
    currentAmount: 51000,
    investors: 234,
    returnRate: "3.8",
    category: "Habitat"
  },
  {
    id: "3",
    title: "Mairie de Bellevue",
    location: "Toulouse, Occitanie",
    description: "Transition énergétique complète du bâtiment municipal avec installation solaire et stockage par batteries.",
    imageUrl: "https://images.unsplash.com/photo-1758304480420-5b0f11280115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGNvbW11bml0eSUyMHByb2plY3R8ZW58MXx8fHwxNzYzMDYxMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 95000,
    currentAmount: 23750,
    investors: 89,
    returnRate: "4.5",
    category: "Collectivité"
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="accueil" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Leaf className="w-4 h-4" />
                <span className="text-sm">Investissement citoyen & durable</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl text-foreground">
                  L'énergie solaire,{" "}
                  <span className="text-primary">accessible à tous</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Investissez dans des projets solaires locaux dès 20€ et contribuez 
                  à la transition énergétique de votre territoire.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projets">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                    Découvrir les projets
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/comment-ca-marche">
                  <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                    Comment ça marche ?
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <p className="text-3xl text-primary">850+</p>
                  <p className="text-sm text-muted-foreground">Investisseurs</p>
                </div>
                <div>
                  <p className="text-3xl text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Projets financés</p>
                </div>
                <div>
                  <p className="text-3xl text-primary">4.2%</p>
                  <p className="text-sm text-muted-foreground">Rendement moyen</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1452179535021-368bb0edc3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBuYXR1cmV8ZW58MXx8fHwxNzYzMDYxMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Énergie solaire"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Énergie produite aujourd'hui</p>
                    <p className="text-2xl text-primary">12 450 kWh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <StatsCard
              title="Investissement total"
              value="2.4M €"
              icon={TrendingUp}
              trend="+18% ce mois"
            />
            <StatsCard
              title="CO₂ évité"
              value="450 tonnes"
              icon={Leaf}
              description="Équivalent à 200 voitures"
            />
            <StatsCard
              title="Citoyens engagés"
              value="850+"
              icon={Users}
              trend="+45 cette semaine"
            />
            <StatsCard
              title="Énergie produite"
              value="3.2 GWh"
              icon={Sun}
              description="Depuis le lancement"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">
              Pourquoi choisir SolarShare ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Impact local visible</h3>
              <p className="text-muted-foreground">
                Investissez dans des projets de votre région et voyez concrètement l'impact de votre contribution
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Rendement attractif</h3>
              <p className="text-muted-foreground">
                Bénéficiez d'un rendement moyen de 4% tout en contribuant à la transition énergétique
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Transparence totale</h3>
              <p className="text-muted-foreground">
                Suivez en temps réel la production d'énergie, les émissions évitées et vos revenus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">
                Projets à la une
              </h2>
              <p className="text-xl text-muted-foreground">
                Découvrez nos projets les plus populaires
              </p>
            </div>
            <Link to="/projets">
              <Button variant="outline">
                Voir tous les projets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Prêt à investir dans l'avenir énergétique ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez plus de 850 citoyens qui financent la transition énergétique locale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscription">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg h-12 px-8"
              >
                Créer mon compte
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/a-propos">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
