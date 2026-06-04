import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImpactDashboard } from "../components/ImpactDashboard";
import { ProjectCard } from "../components/ProjectCard";
import { TrendingUp, Leaf, DollarSign, Target, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";

// Modèle pour le typage des projets comme dans Projects.tsx
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

interface InvestmentRow {
  amount: number;
  projects: Project | Project[] | null;
}

interface InvestedProject extends Project {
  investedAmount: number;
  estimatedRevenue: number;
}

interface DashboardStats {
  projectCount: number;
  totalInvestment: number;
  generatedRevenue: number;
  averageReturn: number;
  co2Saved: number;
  performance: number;
}

// Les données mockées pour l'aperçu quand l'utilisateur n'est pas connecté
const mockedProjects = [
  {
    id: "mock1",
    title: "École Primaire Jean Moulin",
    location: "Lyon, Rhône-Alpes",
    description: "Installation de 45 panneaux solaires sur le toit de l'école primaire pour alimenter les salles de classe et la cantine.",
    imageUrl: "https://images.unsplash.com/photo-1743352476730-056502fba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 45000,
    currentAmount: 32400,
    investors: 162,
    returnRate: "4.2",
    category: "Éducation"
  },
  {
    id: "mock2",
    title: "Résidence Les Jardins Verts",
    location: "Nantes, Pays de la Loire",
    description: "Projet solaire pour une copropriété de 80 logements, réduction de 40% des factures d'électricité commune.",
    imageUrl: "https://images.unsplash.com/photo-1628206554201-41ebb06ef313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    targetAmount: 68000,
    currentAmount: 51000,
    investors: 234,
    returnRate: "3.8",
    category: "Habitat"
  }
];

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myProjects, setMyProjects] = useState<InvestedProject[]>([]);
  const [myProposedProjects, setMyProposedProjects] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    projectCount: 0,
    totalInvestment: 0,
    generatedRevenue: 0,
    averageReturn: 0,
    co2Saved: 0,
    performance: 0,
  });

  const mockStats: DashboardStats = {
    projectCount: 2,
    totalInvestment: 500,
    generatedRevenue: 84.5,
    averageReturn: 4.2,
    co2Saved: 1.2,
    performance: 16.9,
  };

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setSession(session);

      if (!session?.user?.id) {
        setMyProjects(mockedProjects as InvestedProject[]);
        setMyProposedProjects([]);
        setStats(mockStats);
        setLoading(false);
        return;
      }

      const { data: proposedData, error: proposedError } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", session.user.id);

      console.log("[Dashboard] session.user.id:", session.user.id);
      console.log("[Dashboard] proposedData:", proposedData);
      console.log("[Dashboard] proposedError:", proposedError);
        
      if (proposedData) {
        setMyProposedProjects(proposedData);
      }

      const { data, error } = await supabase
        .from("investments")
        .select("amount, projects(*)")
        .eq("user_id", session.user.id);

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Erreur lors de la récupération des investissements:", error);
        setMyProjects([]);
        setStats({
          projectCount: 0,
          totalInvestment: 0,
          generatedRevenue: 0,
          averageReturn: 0,
          co2Saved: 0,
          performance: 0,
        });
        setLoading(false);
        return;
      }

      const investmentRows = (data ?? []) as unknown as InvestmentRow[];
      const projectMap = new Map<string, InvestedProject>();

      let totalInvestment = 0;
      let generatedRevenue = 0;

      investmentRows.forEach((row) => {
        const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

        if (!project) {
          return;
        }

        const amount = Number(row.amount) || 0;
        const returnRate = Number(project.returnRate) || 0;
        const estimatedRevenue = amount * (returnRate / 100);

        totalInvestment += amount;
        generatedRevenue += estimatedRevenue;

        const existing = projectMap.get(project.id);

        if (existing) {
          existing.investedAmount += amount;
          existing.estimatedRevenue += estimatedRevenue;
          return;
        }

        projectMap.set(project.id, {
          ...project,
          investedAmount: amount,
          estimatedRevenue,
        });
      });

      const projectCount = projectMap.size;
      const averageReturn = totalInvestment > 0 ? (generatedRevenue / totalInvestment) * 100 : 0;
      const co2Saved = totalInvestment * 0.0003;

      setMyProjects(Array.from(projectMap.values()));
      setStats({
        projectCount,
        totalInvestment,
        generatedRevenue,
        averageReturn,
        co2Saved,
        performance: averageReturn,
      });
      setLoading(false);
    };

    loadDashboard();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session?.user?.id) {
        setMyProjects(mockedProjects as InvestedProject[]);
        setMyProposedProjects([]);
        setStats(mockStats);
        return;
      }
      
      // Update proposed projects when auth changes
      supabase
        .from("projects")
        .select("*")
        .eq("owner_id", session.user.id)
        .then(({ data }) => setMyProposedProjects(data || []));

      supabase
        .from("investments")
        .select("amount, projects(*)")
        .eq("user_id", session.user.id)
        .then(({ data, error }) => {
          if (error) {
            console.error("Erreur lors de la récupération des investissements:", error);
            setMyProjects([]);
            setStats({
              projectCount: 0,
              totalInvestment: 0,
              generatedRevenue: 0,
              averageReturn: 0,
              co2Saved: 0,
              performance: 0,
            });
            return;
          }

          const investmentRows = (data ?? []) as unknown as InvestmentRow[];
          const projectMap = new Map<string, InvestedProject>();

          let totalInvestment = 0;
          let generatedRevenue = 0;

          investmentRows.forEach((row) => {
            const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

            if (!project) {
              return;
            }

            const amount = Number(row.amount) || 0;
            const returnRate = Number(project.returnRate) || 0;
            const estimatedRevenue = amount * (returnRate / 100);

            totalInvestment += amount;
            generatedRevenue += estimatedRevenue;

            const existing = projectMap.get(project.id);

            if (existing) {
              existing.investedAmount += amount;
              existing.estimatedRevenue += estimatedRevenue;
              return;
            }

            projectMap.set(project.id, {
              ...project,
              investedAmount: amount,
              estimatedRevenue,
            });
          });

          const averageReturn = totalInvestment > 0 ? (generatedRevenue / totalInvestment) * 100 : 0;

          setMyProjects(Array.from(projectMap.values()));
          setStats({
            projectCount: projectMap.size,
            totalInvestment,
            generatedRevenue,
            averageReturn,
            co2Saved: totalInvestment * 0.0003,
            performance: averageReturn,
          });
        });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Permet de choisir entre données réelles et données d'exemple
  const displayProjects = session ? myProjects : (mockedProjects as InvestedProject[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Warning Banner if not logged in */}
      {!session && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4 shadow-sm sticky top-20 z-40">
          <div className="max-w-7xl mx-auto flex items-center">
            <AlertCircle className="text-orange-500 w-6 h-6 mr-3" />
            <p className="text-orange-700">
              <strong>Mode aperçu :</strong> Vous n'êtes pas connecté. Voici un exemple de ce à quoi ressemble le tableau de bord d'un investisseur.{" "}
              <Link to="/connexion" className="underline font-semibold hover:text-orange-800">Connectez-vous</Link> ou{" "}
              <Link to="/inscription" className="underline font-semibold hover:text-orange-800">créez un compte</Link> pour suivre vos propres investissements.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <p className="text-3xl text-primary mb-2">{stats.projectCount} projets</p>
            <p className="text-sm text-muted-foreground">Montant total: {stats.totalInvestment.toLocaleString("fr-FR")} €</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-muted-foreground">Revenus générés</h3>
            </div>
            <p className="text-3xl text-green-600 mb-2">{stats.generatedRevenue.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
            <p className="text-sm text-muted-foreground">Rendement moy.: {stats.averageReturn.toFixed(2)}%</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-muted-foreground">Mon impact CO₂</h3>
            </div>
            <p className="text-3xl text-blue-600 mb-2">{stats.co2Saved.toFixed(2)} tonnes</p>
            <p className="text-sm text-muted-foreground">CO₂ estimé évité</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-muted-foreground">Performance</h3>
            </div>
            <p className="text-3xl text-orange-600 mb-2">+{stats.performance.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Depuis le début</p>
          </div>
        </div>

        {/* Impact Dashboard - On met une opacité si l'utilisateur n'a pas d'investissement (connecté ou non) */}
        <div className={`mb-12 ${stats.projectCount === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className={stats.projectCount === 0 ? 'relative' : ''}>
            {stats.projectCount === 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md">
                  <h3 className="text-xl text-foreground font-semibold mb-2">Aucune donnée</h3>
                  <p className="text-muted-foreground mb-4">Investissez dans votre premier projet pour voir vos vraies données apparaître ici.</p>
                  <Link to="/projets">
                    <Button>Découvrir les projets</Button>
                  </Link>
                </div>
              </div>
            )}
            <ImpactDashboard isEmpty={stats.projectCount === 0} />
          </div>
        </div>

        {/* My Proposed Projects - visible uniquement si connecté */}
        {session && (
          <div className="mb-12">
            <h2 className="text-3xl text-foreground mb-6">
              Projets que j'ai proposés
            </h2>
            {myProposedProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-primary/30">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-primary opacity-60" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Aucun projet proposé</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
                  Vous pouvez soumettre votre propre projet solaire pour validation. 
                  Il apparaîtra ici une fois soumis.
                </p>
                <Link to="/proposer-projet">
                  <Button variant="outline">Proposer un projet</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {myProposedProjects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard {...project} hideActions={true} />
                    <div className="mt-3 p-4 bg-white rounded-lg shadow-sm border-l-4 border-l-primary/60">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Statut du projet</p>
                          <div className="flex items-center gap-2">
                            {project.status === 'pending' && (
                              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                En attente de validation
                              </span>
                            )}
                            {project.status === 'approved' && (
                              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Validé et publié
                              </span>
                            )}
                            {project.status === 'rejected' && (
                              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-medium">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Rejeté
                              </span>
                            )}
                          </div>
                        </div>
                        {project.status === 'pending' && (
                          <p className="text-xs text-muted-foreground text-right max-w-32">
                            Examiné sous 48-72h ouvrées
                          </p>
                        )}
                      </div>
                      {project.status === 'approved' && project.targetAmount > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{(project.currentAmount || 0).toLocaleString("fr-FR")} € collectés</span>
                            <span>Objectif : {project.targetAmount.toLocaleString("fr-FR")} €</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${Math.min(((project.currentAmount || 0) / project.targetAmount) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Projects */}
        <div>
          <h2 className="text-3xl text-foreground mb-6">
            Mes projets
          </h2>
          {displayProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {displayProjects.map((project) => (
                <div key={project.id} className="relative">
                  <ProjectCard {...project} />
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Votre investissement</p>
                        <p className="text-xl text-primary">{session ? `${project.investedAmount.toLocaleString("fr-FR")} €` : "250 €"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Revenus générés</p>
                        <p className="text-xl text-green-600">{session ? `${project.estimatedRevenue.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : "42.25 €"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-foreground mb-2">Vous n'avez pas encore de projet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Commencez à construire votre portefeuille vert en investissant dans votre première centrale solaire.
              </p>
              <Link to="/projets">
                <Button size="lg">Parcourir les projets</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
