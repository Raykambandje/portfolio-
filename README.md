# Portfolio — Ray Kambandje

Portfolio construit avec **Next.js 16**, **Tailwind CSS 4** et **Motion** (ex-Framer Motion).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
```

Node.js 20 ou plus est requis.

## Structure

```
app/
  layout.tsx       # polices, métadonnées SEO
  page.tsx         # assemblage des sections + fiche Google (JSON-LD)
  globals.css      # couleurs et polices (bloc @theme)
  opengraph-image.tsx  # image d'aperçu quand on partage le lien (WhatsApp, LinkedIn…)
  not-found.tsx    # page 404
  sitemap.ts, robots.ts  # pour les moteurs de recherche
components/
  Intro.tsx        # écran d'intro (une fois par session)
  Hero.tsx         # titre révélé mot par mot, phrase dynamique, grille de fond
  Marquee.tsx      # bandeau de technologies qui défile
  About.tsx        # phrase qui s'éclaircit au scroll, compteurs animés
  Projects.tsx     # cartes empilées « collantes »
  Stack.tsx        # compétences avec apparition progressive
  Timeline.tsx     # ligne qui se dessine au scroll
  Certifications.tsx  # badges avec lien de vérification
  Contact.tsx      # contact + bouton « copier l'adresse » + footer
  Nav.tsx          # barre qui se cache en descendant, section active, menu mobile animé
  Section.tsx      # mise en page des sections (étiquette à gauche, contenu à droite)
  Logo.tsx         # monogramme « R » (animé dans l'intro)
  ScrollProgress.tsx, SplitText.tsx, Magnetic.tsx, RollText.tsx
data/
  content.ts       # ✏️ TOUT le texte du site est ici (et l'adresse du site)
lib/
  intro.ts         # durée de l'intro et règle « une fois par session »
public/            # images (photo.jpg, captures de projets…)
```

## Modifier le contenu

Tout le texte, les liens et les projets sont dans `data/content.ts`. Le lien d'un projet est facultatif : sans `link`, la carte n'affiche pas de bouton.

Pour ta photo : place-la dans `public/photo.jpg` et décommente la balise `<img>` dans `components/About.tsx`.

Les couleurs se changent dans le bloc `@theme` de `app/globals.css` : des neutres et une seule couleur d'accent (`--color-accent`).

## Accessibilité

Les animations respectent le réglage système « réduire les animations » : l'intro est sautée, le bandeau s'arrête et les transitions deviennent instantanées. Les titres animés restent lisibles par les lecteurs d'écran.

Si tu prends un nom de domaine, change `url` dans `data/content.ts` : l'aperçu des liens, le sitemap et Google l'utilisent.

## Déployer sur Vercel

1. Pousse le projet sur GitHub.
2. Sur vercel.com : « Add New → Project », importe le dépôt.
3. Vercel détecte Next.js automatiquement : clique sur « Deploy ».
