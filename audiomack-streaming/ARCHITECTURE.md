# Architecture du Projet : Plateforme Streaming SaaS

```text
audiomack-streaming/
├── app/                      # App Router Next.js 14+
│   ├── (auth)/               # Routes groupées pour l'authentification
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/               # Routes principales (utilise le BottomNav)
│   │   ├── page.tsx          # Accueil (Tendances, Séries)
│   │   ├── search/page.tsx   # Recherche
│   │   ├── favorites/page.tsx# Watchlist
│   │   └── profile/page.tsx  # Profil utilisateur
│   ├── admin/                # Backoffice Super-Admin (pour toi)
│   │   └── upload/page.tsx   # Formulaire centralisé d'upload de contenus
│   ├── creator/              # Dashboard Créateur (lecture seule)
│   │   └── stats/page.tsx    # Statistiques des vues et revenus
│   ├── watch/                # Page du Lecteur Vidéo
│   │   └── [id]/page.tsx     # Player immersif plein écran
│   ├── api/                  # Endpoints backend (Fonctions Serverless)
│   │   ├── webhooks/
│   │   │   └── mobile-money/route.ts  # Webhook de validation de paiement
│   │   └── stream/
│   │       └── [id]/route.ts # Route de streaming protégée (Génère l'URL signée)
│   ├── globals.css           # CSS Global et Tailwind utilities
│   └── layout.tsx            # Layout racine (Providers, Meta tags SEO)
├── components/               # Composants UI réutilisables
│   ├── ui/                   # Boutons, Inputs, Modales de paiement
│   ├── video/                # VideoCard, HorizontalCarousel, VideoPlayer
│   ├── layout/               # Header, BottomNav
│   └── creator/              # UploadForm, StatCard
├── lib/                      # Utilitaires & Config métier
│   ├── supabase/             # Configuration des clients Supabase (Browser & Server)
│   ├── utils.ts              # Fonctions de formatage (prix FCFA, dates)
│   └── types.ts              # Types TypeScript (générés depuis la base de données)
├── middleware.ts             # Protection des routes (DRM basique & auth)
├── supabase/                 # Configuration locale Supabase
│   └── migrations/           # Schémas SQL et RLS (ex: 00000_init.sql)
└── tailwind.config.ts        # Configuration des couleurs et polices du thème
```

## Stratégie de Déploiement
- **Frontend** : Déployé sur l'environnement Antigravitie ou Vercel.
- **Backend / BDD** : Supabase (PostgreSQL) avec Storage pour les vidéos.
- **Fonctions Serverless** : Hébergées via l'infrastructure Antigravitie pour le traitement des Webhooks (Mobile Money) et la génération de liens signés.
