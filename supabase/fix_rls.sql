-- ================================================================
-- SolarShare - Fix complet de la table projects
-- Exécuter dans SQL Editor > Supabase
-- ================================================================

-- Étape 1 : Ajouter les colonnes manquantes (sans erreur si déjà présentes)
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'approved' 
    CHECK (status IN ('pending', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Étape 2 : Corriger les politiques RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Approved projects" ON public.projects;
DROP POLICY IF EXISTS "Insert project" ON public.projects;
DROP POLICY IF EXISTS "Update project" ON public.projects;

-- SELECT : projets approuvés OU projets appartenant à l'utilisateur connecté
CREATE POLICY "Approved projects" ON public.projects 
  FOR SELECT USING (status = 'approved' OR auth.uid() = owner_id);

-- INSERT : l'utilisateur peut insérer ses propres projets
CREATE POLICY "Insert project" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- UPDATE : l'utilisateur peut modifier ses propres projets  
CREATE POLICY "Update project" ON public.projects
  FOR UPDATE USING (auth.uid() = owner_id);

-- Étape 3 : Vérification finale
SELECT id, title, status, owner_id, created_at 
FROM public.projects 
ORDER BY created_at DESC 
LIMIT 10;
