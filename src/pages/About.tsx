import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sun, Users, Target, Award, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl text-foreground mb-6">
            À propos de <span className="text-primary">SolarShare</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous rendons l'énergie solaire accessible à tous les citoyens grâce au financement participatif
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12">
          <h2 className="text-3xl text-foreground mb-6">Notre mission</h2>
          <p className="text-lg text-muted-foreground mb-4">
            SolarShare est une plateforme de financement participatif dédiée à la transition énergétique locale. 
            Nous permettons à chaque citoyen de devenir acteur de la transition énergétique en investissant dans 
            des projets solaires de proximité.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Notre objectif est double : démocratiser l'accès à l'investissement dans les énergies renouvelables 
            et accélérer le déploiement de l'énergie solaire sur notre territoire.
          </p>
          <p className="text-lg text-muted-foreground">
            En combinant impact environnemental et rendement financier attractif, nous prouvons qu'il est possible 
            d'allier performance économique et engagement écologique.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl text-foreground mb-8 text-center">Nos valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl text-foreground mb-3">Écologie</h3>
              <p className="text-muted-foreground">
                Nous plaçons la protection de l'environnement au cœur de notre action
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl text-foreground mb-3">Accessibilité</h3>
              <p className="text-muted-foreground">
                L'investissement dans les énergies renouvelables doit être accessible à tous
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl text-foreground mb-3">Transparence</h3>
              <p className="text-muted-foreground">
                Nous fournissons toutes les informations nécessaires pour investir en toute connaissance
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl text-foreground mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Nous sélectionnons rigoureusement chaque projet pour garantir qualité et performance
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl mb-8 text-center">Notre impact en chiffres</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">850+</p>
              <p className="text-lg opacity-90">Investisseurs</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">24</p>
              <p className="text-lg opacity-90">Projets financés</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">2.4M€</p>
              <p className="text-lg opacity-90">Investis</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">450t</p>
              <p className="text-lg opacity-90">CO₂ évité</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl text-foreground mb-8 text-center">Notre équipe</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
            SolarShare est portée par une équipe passionnée de professionnels de l'énergie, de la finance 
            et du digital, tous engagés pour accélérer la transition énergétique.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Marie Dubois</h3>
              <p className="text-sm text-primary font-medium mb-2">Co-fondatrice & CEO</p>
              <p className="text-sm text-muted-foreground">Ex-directrice énergie chez EDF, 15 ans d'expérience dans les énergies renouvelables.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Thomas Bernard</h3>
              <p className="text-sm text-primary font-medium mb-2">Co-fondateur & CTO</p>
              <p className="text-sm text-muted-foreground">Ingénieur en systèmes embarqués, spécialiste IoT et monitoring énergétique.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Sophie Martin</h3>
              <p className="text-sm text-primary font-medium mb-2">Directrice Financière</p>
              <p className="text-sm text-muted-foreground">Ancienne analyste chez BNP Paribas, experte en financement de projets d'infrastructure.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lucas Petit</h3>
              <p className="text-sm text-primary font-medium mb-2">Responsable Projets</p>
              <p className="text-sm text-muted-foreground">Ingénieur photovoltaïque, gère la sélection et le suivi de l'ensemble des projets partenaires.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12">
          <h2 className="text-3xl text-foreground mb-4">
            Rejoignez-nous dans l'aventure
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Devenez acteur de la transition énergétique dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscription">
              <Button size="lg" className="text-lg h-12 px-8">
                Créer mon compte
              </Button>
            </Link>
            <Link to="/projets">
              <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                Découvrir les projets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
