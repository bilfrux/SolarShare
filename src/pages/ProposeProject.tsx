import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2, PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProposeProject() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [kycStatus, setKycStatus] = useState<string>("none");
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    imageUrl: "",
    targetAmount: 50000,
    returnRate: 4.5,
    category: "Habitat"
  });

  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("kyc_status")
          .eq("id", session.user.id)
          .single();
          
        if (profile) {
          setKycStatus(profile.kyc_status);
        }
      }
      setLoading(false);
    }
    checkAccess();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    // Vérification de la session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const userId = currentSession?.user?.id || session?.user?.id;
    
    console.log("[ProposeProject] session user id:", userId);
    
    if (!userId) {
      setSubmitError("Erreur : vous n'êtes pas connecté.");
      setSubmitting(false);
      return;
    }

    const insertPayload = {
      title: formData.title,
      location: formData.location,
      description: formData.description,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1508514177221-188b1cc1d1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      targetAmount: Number(formData.targetAmount),
      currentAmount: 0,
      investors: 0,
      returnRate: String(formData.returnRate),
      category: formData.category,
      status: "pending",
      owner_id: userId
    };
    
    console.log("[ProposeProject] Insert payload:", insertPayload);
    
    const { data: insertedData, error } = await supabase
      .from("projects")
      .insert(insertPayload)
      .select();

    console.log("[ProposeProject] Insert result - data:", insertedData);
    console.log("[ProposeProject] Insert result - error:", error);

    setSubmitting(false);

    if (error) {
      setSubmitError("Erreur lors de la soumission : " + error.message);
    } else {
      setSubmitted(true);
      // Redirection après 3 secondes
      setTimeout(() => navigate("/tableau-de-bord"), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
        <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Non connecté</h2>
        <p className="text-muted-foreground mb-4">Vous devez être connecté pour proposer un projet.</p>
        <Button onClick={() => navigate("/connexion")}>Se connecter</Button>
      </div>
    );
  }

  if (kycStatus !== 'verified') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center max-w-lg mx-auto">
        <AlertCircle className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Vérification requise</h2>
        <p className="text-muted-foreground mb-6">
          Pour proposer un projet, votre identité (KYC) doit être vérifiée par notre équipe. 
          Rendez-vous dans les paramètres de votre profil pour soumettre vos documents.
        </p>
        <Button size="lg" onClick={() => navigate("/profil")}>Aller à mon profil</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Proposer un projet</h1>
            <p className="text-muted-foreground">Soumettez votre projet solaire pour validation</p>
          </div>
        </div>

        {submitted ? (
          <Card className="border-green-200">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center space-y-4 py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h2 className="text-2xl font-bold text-foreground">Projet soumis !</h2>
                <p className="text-muted-foreground max-w-sm">
                  Votre projet a été envoyé pour validation. Notre équipe l'examinera et vous notifiera de sa décision. Vous serez redirigé vers votre tableau de bord dans quelques secondes.
                </p>
                <Button onClick={() => navigate("/tableau-de-bord")} className="mt-4">
                  Aller au tableau de bord
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
        <Card>
          <CardHeader>
            <CardTitle>Caractéristiques du projet</CardTitle>
            <CardDescription>
              Remplissez les détails ci-dessous. Notre équipe examinera votre projet avant de le rendre public.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du projet</Label>
                <Input id="title" name="title" required placeholder="Ex: École Primaire Jean Moulin" value={formData.title} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Région / Localisation</Label>
                <Input id="location" name="location" required placeholder="Ex: Lyon, Rhône-Alpes" value={formData.location} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <select 
                  id="category" 
                  name="category" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.category} 
                  onChange={handleChange}
                >
                  <option value="Habitat">Habitat</option>
                  <option value="Éducation">Éducation</option>
                  <option value="Collectivité">Collectivité</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea id="description" name="description" required rows={4} placeholder="Décrivez le projet..." value={formData.description} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Montant cible (€)</Label>
                  <Input id="targetAmount" name="targetAmount" type="number" min="1000" required value={formData.targetAmount} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnRate">Rendement estimé (%)</Label>
                  <Input id="returnRate" name="returnRate" type="number" step="0.1" min="0" max="20" required value={formData.returnRate} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
                <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                {submitting ? "Soumission en cours..." : "Soumettre à validation"}
              </Button>
            </form>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}
