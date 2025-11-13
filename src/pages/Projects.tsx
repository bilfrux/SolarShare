import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/button";
import { Filter } from "lucide-react";

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
  },
  {
    id: "4",
    title: "Centre Sportif Municipal",
    location: "Bordeaux, Nouvelle-Aquitaine",
    description: "Installation photovoltaïque pour alimenter les équipements sportifs et réduire la facture énergétique.",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsc3xlbnwxfHx8fDE3NjI5OTIyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 52000,
    currentAmount: 41600,
    investors: 198,
    returnRate: "4.0",
    category: "Sport"
  },
  {
    id: "5",
    title: "Résidence Seniors Les Acacias",
    location: "Lille, Hauts-de-France",
    description: "Projet solaire pour une résidence seniors de 120 appartements, pour une énergie propre et accessible.",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHNvbGFyfGVufDF8fHx8MTc2Mjk5MjI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 78000,
    currentAmount: 62400,
    investors: 287,
    returnRate: "3.9",
    category: "Habitat"
  },
  {
    id: "6",
    title: "Collège Victor Hugo",
    location: "Strasbourg, Grand Est",
    description: "Installation de panneaux solaires pour un collège de 600 élèves, avec un programme pédagogique sur les énergies renouvelables.",
    imageUrl: "https://images.unsplash.com/photo-1562527526-be5f7a3f1f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI5OTIyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    targetAmount: 64000,
    currentAmount: 19200,
    investors: 76,
    returnRate: "4.3",
    category: "Éducation"
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  
  const categories = ["Tous", "Éducation", "Habitat", "Collectivité", "Sport"];
  
  const filteredProjects = selectedCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-foreground mb-4">
            Projets disponibles
          </h1>
          <p className="text-xl text-muted-foreground">
            Découvrez tous les projets solaires que vous pouvez financer dès aujourd'hui
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-5 h-5" />
            <span>Filtrer par catégorie :</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun projet disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
