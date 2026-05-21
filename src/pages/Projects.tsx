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

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ["Tous", "Éducation", "Habitat", "Collectivité", "Sport"];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'approved');
        
        if (error) throw error;
        
        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
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
