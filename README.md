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
  page.tsx         # assemblage des sections
  globals.css      # couleurs et polices (bloc @theme)
components/
  Hero.tsx         # titre révélé mot par mot, phrase dynamique, grille de fond
  Marquee.tsx      # bandeau de technologies qui défile
  About.tsx        # phrase qui s'éclaircit au scroll, compteurs animés
  Projects.tsx     # cartes empilées « collantes »
  Stack.tsx        # compétences avec apparition progressive
  Timeline.tsx     # ligne qui se dessine au scroll
  Contact.tsx      # contact + bouton « copier l'adresse » + footer
  Nav.tsx          # barre qui se cache en descendant, menu mobile animé
  Section.tsx      # mise en page des sections (étiquette à gauche, contenu à droite)
  ScrollProgress.tsx, SplitText.tsx, Magnetic.tsx
data/
  content.ts       # ✏️ TOUT le texte du site est ici
public/            # images (photo.jpg, captures de projets…)
```

## Modifier le contenu

Tout le texte, les liens et les projets sont dans `data/content.ts`. Le lien d'un projet est facultatif : sans `link`, la carte n'affiche pas de bouton.

Pour ta photo : place-la dans `public/photo.jpg` et décommente la balise `<img>` dans `components/About.tsx`.

Les couleurs se changent dans le bloc `@theme` de `app/globals.css` : des neutres et une seule couleur d'accent (`--color-accent`).

## Accessibilité

Les animations respectent le réglage système « réduire les animations » : le bandeau s'arrête et les transitions deviennent instantanées.

## Déployer sur Vercel

1. Pousse le projet sur GitHub.
2. Sur vercel.com : « Add New → Project », importe le dépôt.
3. Vercel détecte Next.js automatiquement : clique sur « Deploy ».
