-- ============================================================
-- SolarShare - Seed de démonstration
-- À exécuter dans la console Supabase SQL Editor
-- ============================================================

-- Supprime les anciens projets de démo si existants
DELETE FROM public.projects WHERE owner_id IS NULL;

-- Insère les projets de démonstration
INSERT INTO public.projects (title, location, description, "imageUrl", "targetAmount", "currentAmount", investors, "returnRate", category, status) VALUES
(
  'École Primaire Jean Moulin',
  'Lyon, Rhône-Alpes',
  'Installation de 45 panneaux solaires sur le toit de l''école primaire pour alimenter les salles de classe et la cantine. Ce projet permettra de réduire la facture énergétique de l''établissement de 60%.',
  'https://images.unsplash.com/photo-1743352476730-056502fba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  45000,
  32400,
  162,
  4.2,
  'Éducation',
  'approved'
),
(
  'Résidence Les Jardins Verts',
  'Nantes, Pays de la Loire',
  'Projet solaire pour une copropriété de 80 logements, réduction de 40% des factures d''électricité commune. Les économies réalisées seront redistribuées aux copropriétaires.',
  'https://images.unsplash.com/photo-1628206554201-41ebb06ef313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  68000,
  51000,
  234,
  3.8,
  'Habitat',
  'approved'
),
(
  'Mairie de Bellevue',
  'Toulouse, Occitanie',
  'Transition énergétique complète du bâtiment municipal avec installation solaire et stockage par batteries. Le projet servira également de vitrine pédagogique pour les citoyens.',
  'https://images.unsplash.com/photo-1758304480420-5b0f11280115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  95000,
  23750,
  89,
  4.5,
  'Collectivité',
  'approved'
),
(
  'Gymnase Municipal Saint-Exupéry',
  'Bordeaux, Nouvelle-Aquitaine',
  'Couverture solaire de 800m² sur le gymnase municipal, produisant suffisamment d''énergie pour alimenter l''ensemble des équipements sportifs et les vestiaires.',
  'https://images.unsplash.com/photo-1508514177221-188b1cc1d1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  72000,
  58400,
  198,
  4.0,
  'Sport',
  'approved'
),
(
  'Lycée Professionnel Vauban',
  'Strasbourg, Grand-Est',
  'Installation solaire sur le toit du lycée avec projet pédagogique associé : les élèves de BTS Électrotechnique participeront à la maintenance et au monitoring de l''installation.',
  'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  38000,
  38000,
  145,
  3.5,
  'Éducation',
  'approved'
),
(
  'Éco-hameau de la Vallée',
  'Grenoble, Auvergne-Rhône-Alpes',
  'Projet d''autoconsommation collective pour un hameau de 35 maisons. Les panneaux seront installés sur une zone commune et l''énergie partagée entre les habitants participants.',
  'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  54000,
  18900,
  67,
  4.8,
  'Habitat',
  'approved'
);
