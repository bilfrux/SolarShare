import { ImpactDashboard } from "../components/ImpactDashboard";
import { ProjectCard } from "../components/ProjectCard";
import { TrendingUp, Leaf, DollarSign, Target } from "lucide-react";

const myProjects = [
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
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-foreground mb-4">
            Mon tableau de bord
          </h1>
          <p className="text-xl text-muted-foreground">
            Suivez vos investissements et votre impact environnemental
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-muted-foreground">Mes investissements</h3>
            </div>
            <p className="text-3xl text-primary mb-2">2 projets</p>
            <p className="text-sm text-muted-foreground">Montant total: 500 €</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-muted-foreground">Revenus générés</h3>
            </div>
            <p className="text-3xl text-green-600 mb-2">84.50 €</p>
            <p className="text-sm text-muted-foreground">Rendement: 4.2%</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-muted-foreground">Mon impact CO₂</h3>
            </div>
            <p className="text-3xl text-blue-600 mb-2">1.2 tonnes</p>
            <p className="text-sm text-muted-foreground">CO₂ évité</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-muted-foreground">Performance</h3>
            </div>
            <p className="text-3xl text-orange-600 mb-2">+16.9%</p>
            <p className="text-sm text-muted-foreground">Depuis le début</p>
          </div>
        </div>

        {/* Impact Dashboard */}
        <div className="mb-12">
          <ImpactDashboard />
        </div>

        {/* My Projects */}
        <div>
          <h2 className="text-3xl text-foreground mb-6">
            Mes projets
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {myProjects.map((project) => (
              <div key={project.id} className="relative">
                <ProjectCard {...project} />
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Votre investissement</p>
                      <p className="text-xl text-primary">250 €</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Revenus générés</p>
                      <p className="text-xl text-green-600">42.25 €</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
