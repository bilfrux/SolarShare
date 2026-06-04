import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2, User, Building } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [proposedProjects, setProposedProjects] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kycStatus, setKycStatus] = useState("none");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        setFirstName(user.user_metadata?.first_name || "");
        setLastName(user.user_metadata?.last_name || "");
        
        const { data } = await supabase
          .from("profiles")
          .select("kyc_status")
          .eq("id", user.id)
          .single();
          
        if (data) {
          setKycStatus(data.kyc_status);
        } else {
          await supabase.from("profiles").insert({ id: user.id });
        }

        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .eq("owner_id", user.id);

        if (projectsData) {
          setProposedProjects(projectsData);
        }
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    
    const { error } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });

    if (error) {
      setMessage({ text: "Erreur lors de la mise à jour : " + error.message, type: "error" });
    } else {
      setMessage({ text: "Profil mis à jour avec succès !", type: "success" });
    }
    setSaving(false);
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    if (!currentPassword) {
      setMessage({ text: "Veuillez entrer votre mot de passe actuel.", type: "error" });
      setSaving(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ text: "Le nouveau mot de passe doit contenir au moins 8 caractères.", type: "error" });
      setSaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Les deux nouveaux mots de passe ne correspondent pas.", type: "error" });
      setSaving(false);
      return;
    }

    if (!user?.email) {
      setMessage({ text: "Impossible de vérifier votre compte.", type: "error" });
      setSaving(false);
      return;
    }

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (reauthError) {
      setMessage({ text: "Le mot de passe actuel est incorrect.", type: "error" });
      setSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage({ text: "Erreur lors du changement de mot de passe : " + error.message, type: "error" });
    } else {
      setMessage({ text: "Mot de passe mis à jour avec succès !", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setSaving(false);
  };

  const submitKyc = async () => {
    setKycLoading(true);
    setMessage({ text: "", type: "" });
    
    // Simulate document upload and verification
    const { error } = await supabase.from("profiles").update({ 
      kyc_status: "verified" 
    }).eq("id", user.id);
    
    if (error) {
      setMessage({ text: "Erreur lors de la vérification : " + error.message, type: "error" });
    } else {
      setKycStatus("verified");
      setMessage({ text: "Super ! Votre compte est maintenant vérifié.", type: "success" });
    }
    setKycLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-muted-foreground">Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du compte</CardTitle>
          <CardDescription>
            Mettez à jour vos informations de contact pour vos futurs investissements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="bg-muted text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Votre adresse email ne peut pas être modifiée ici.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="Ex: Jean"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Ex: Dupont"
                />
              </div>
            </div>

            {message.text && (
              <div className={`p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={saving} className="w-full sm:w-auto">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les modifications"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8 border-primary/20">
        <CardHeader>
          <CardTitle>Vérification d'identité (KYC)</CardTitle>
          <CardDescription>
            Devenez un compte vérifié pour pouvoir proposer vos propres projets solaires.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="space-y-2">
              <p>
                <strong>Statut actuel : </strong> 
                {kycStatus === 'none' && <span className="text-muted-foreground">Non vérifié</span>}
                {kycStatus === 'pending' && <span className="text-orange-500">En cours de vérification</span>}
                {kycStatus === 'verified' && <span className="text-green-600 font-semibold">Vérifié</span>}
                {kycStatus === 'rejected' && <span className="text-red-600 font-semibold">Rejeté</span>}
              </p>
              {kycStatus !== 'verified' && (
                <p className="text-sm text-muted-foreground">
                  (Simulation) : Cliquez sur le bouton pour vérifier instantanément votre compte et obtenir les droits.
                </p>
              )}
            </div>
            
            {kycStatus !== 'verified' && (
              <Button onClick={submitKyc} disabled={kycLoading} className="bg-primary hover:bg-primary/90">
                {kycLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validation...
                  </>
                ) : (
                  "Vérifier mon compte"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Projets proposés par l'utilisateur vérifié */}
      {kycStatus === 'verified' && (
        <Card className="mt-8 border-primary/20">
          <CardHeader>
            <CardTitle>Mes projets proposés</CardTitle>
            <CardDescription>
              Suivez l'état de validation et l'avancement de la collecte de vos projets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {proposedProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">Vous n'avez pas encore proposé de projet.</p>
            ) : (
              <div className="space-y-6">
                {proposedProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                      <Building className="text-primary w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <div>
                          {project.status === 'pending' && <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">En attente</span>}
                          {project.status === 'approved' && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Validé</span>}
                          {project.status === 'rejected' && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">Rejeté</span>}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                      
                      {project.status === 'approved' ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Récolte : {project.currentAmount?.toLocaleString("fr-FR")} €</span>
                            <span className="text-muted-foreground">Objectif : {project.targetAmount?.toLocaleString("fr-FR")} €</span>
                          </div>
                          <Progress value={(project.currentAmount / project.targetAmount) * 100} className="h-2" />
                        </div>
                      ) : (
                        <p className="text-sm italic text-muted-foreground">La récolte commencera une fois le projet validé.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
          <CardDescription>
            Vérifiez d'abord votre mot de passe actuel avant de définir un nouveau mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updatePassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Au moins 8 caractères"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Retapez le mot de passe"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Une fois validé, votre session reste active et le nouveau mot de passe sera pris en compte à la prochaine connexion.
            </p>

            <Button type="submit" disabled={saving} variant="outline" className="w-full sm:w-auto">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Changer le mot de passe"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
