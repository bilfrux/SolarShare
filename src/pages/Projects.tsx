import { useState, useEffect } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/button";
import { Filter, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Project {
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
}

// Projets de démonstration utilisés si la base est vide
const demoProjects: Project[] = [
  {
    id: "demo1",
    title: "École Primaire Jean Moulin",
    location: "Lyon, Rhône-Alpes",
    description: "Installation de 45 panneaux solaires sur le toit de l'école primaire pour alimenter les salles de classe et la cantine. Ce projet permettra de réduire la facture énergétique de l'établissement de 60%.",
    imageUrl: "https://images.unsplash.com/photo-1743352476730-056502fba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 45000,
    currentAmount: 32400,
    investors: 162,
    returnRate: "4.2",
    category: "Éducation"
  },
  {
    id: "demo2",
    title: "Résidence Les Jardins Verts",
    location: "Nantes, Pays de la Loire",
    description: "Projet solaire pour une copropriété de 80 logements, réduction de 40% des factures d'électricité commune. Les économies réalisées seront redistribuées aux copropriétaires.",
    imageUrl: "https://images.unsplash.com/photo-1628206554201-41ebb06ef313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 68000,
    currentAmount: 51000,
    investors: 234,
    returnRate: "3.8",
    category: "Habitat"
  },
  {
    id: "demo3",
    title: "Mairie de Bellevue",
    location: "Toulouse, Occitanie",
    description: "Transition énergétique complète du bâtiment municipal avec installation solaire et stockage par batteries. Le projet servira également de vitrine pédagogique pour les citoyens.",
    imageUrl: "https://images.unsplash.com/photo-1758304480420-5b0f11280115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 95000,
    currentAmount: 23750,
    investors: 89,
    returnRate: "4.5",
    category: "Collectivité"
  },
  {
    id: "demo4",
    title: "Gymnase Municipal Saint-Exupéry",
    location: "Bordeaux, Nouvelle-Aquitaine",
    description: "Couverture solaire de 800m² sur le gymnase municipal, produisant suffisamment d'énergie pour alimenter l'ensemble des équipements sportifs et les vestiaires.",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cc1d1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 72000,
    currentAmount: 58400,
    investors: 198,
    returnRate: "4.0",
    category: "Sport"
  },
  {
    id: "demo5",
    title: "Lycée Professionnel Vauban",
    location: "Strasbourg, Grand-Est",
    description: "Installation solaire sur le toit du lycée avec projet pédagogique associé : les élèves de BTS Électrotechnique participeront à la maintenance et au monitoring de l'installation.",
    imageUrl: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 38000,
    currentAmount: 38000,
    investors: 145,
    returnRate: "3.5",
    category: "Éducation"
  },
  {
    id: "demo6",
    title: "Éco-hameau de la Vallée",
    location: "Grenoble, Auvergne-Rhône-Alpes",
    description: "Projet d'autoconsommation collective pour un hameau de 35 maisons. Les panneaux seront installés sur une zone commune et l'énergie partagée entre les habitants participants.",
    imageUrl: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 54000,
    currentAmount: 18900,
    investors: 67,
    returnRate: "4.8",
    category: "Habitat"
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  
  const categories = ["Tous", "Éducation", "Habitat", "Collectivité", "Sport"];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'approved');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjects(data);
          setUsingDemo(false);
        } else {
          // Si aucun projet en base, utiliser les projets de démonstration
          setProjects(demoProjects);
          setUsingDemo(true);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        // En cas d'erreur réseau, afficher les projets de démo
        setProjects(demoProjects);
        setUsingDemo(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);
  
  const filteredProjects = selectedCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleInvested = (projectId: string, amount: number) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              currentAmount: project.currentAmount + amount,
              investors: project.investors + 1,
            }
          : project,
      ),
    );
  };

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

        {/* Demo banner */}
        {usingDemo && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <p className="text-blue-700 text-sm">
              <strong>Mode démonstration :</strong> Ces projets sont des exemples illustratifs. Les vrais projets apparaîtront ici une fois que des porteurs de projet auront soumis leurs dossiers.
            </p>
          </div>
        )}

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
        {loading ? (
          <div className="flex justify-center items-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span>Chargement des projets...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onInvested={(amount) => handleInvested(project.id, amount)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun projet disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
