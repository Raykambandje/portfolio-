// ✏️ Tout le contenu du site est ici : modifie ce fichier pour mettre à jour le portfolio.

export const profile = {
  firstName: "Ray",
  lastName: "Kambandje",
  role: "Développeur full-stack",
  company: "JOSAR Technology & Industry",
  // TODO : remplace par ton adresse e-mail
  email: "ton.email@exemple.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Raykambandje" },
    // TODO : remplace par tes liens
    { label: "LinkedIn", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};

export const heroWords = ["la réservation en ligne", "la mobilité urbaine", "le paiement Mobile Money", "la gestion universitaire"];

export const marqueeItems = [
  "PHP", "MySQL", "Next.js", "React", "JavaScript", "Architecture MVC",
  "API REST", "Mobile Money", "OTP / SMS", "Cybersécurité", "Git",
];

export const aboutLead =
  "Je transforme des besoins concrets en logiciels solides, sécurisés et simples à utiliser.";

export const aboutText = [
  "Étudiant en Bac 4 Génie logiciel à la Faculté des Sciences informatiques, je travaille au département Développement et Produits Numériques de JOSAR Technology & Industry.",
  "J'aime les projets qui touchent le quotidien : trouver un logement, commander une course, payer par Mobile Money, organiser une année académique. Je m'occupe de tout le parcours — modélisation de la base, back-end, interfaces, intégrations d'API et mise en production.",
];

export const stats = [
  { prefix: "", value: 3, suffix: "+", label: "Produits construits" },
  { prefix: "", value: 8, suffix: "", label: "Rôles gérés (RBAC)" },
  { prefix: "Bac ", value: 4, suffix: "", label: "Génie logiciel" },
];

export type Project = {
  index: string;
  type: string;
  title: string;
  description: string;
  chips: string[];
  link: { label: string; href: string };
};

export const projects: Project[] = [
  {
    index: "01",
    type: "Mobilité · VTC",
    title: "Madebocar",
    description:
      "Service VTC pensé pour le marché congolais. J'ai mis en place la vérification des utilisateurs par code OTP envoyé par SMS et je prépare l'intégration du paiement Mobile Money via l'API FlexPay, avec compte marchand dédié.",
    chips: ["OTP SMS · EngageLab", "FlexPay", "Mobile Money", "API REST"],
    // TODO : remplace # par le lien réel
    link: { label: "Voir le projet", href: "#" },
  },
  {
    index: "02",
    type: "Marketplace · Hébergement",
    title: "KongoStay",
    description:
      "Plateforme de réservation d'hébergements en République Démocratique du Congo : recherche de logements, fiches détaillées et réservation en ligne. Application PHP structurée en MVC avec une base MySQL.",
    chips: ["PHP", "MVC", "MySQL", "HTML / CSS / JS"],
    link: { label: "Code sur GitHub", href: "https://github.com/Raykambandje/KongoStay" },
  },
  {
    index: "03",
    type: "EdTech · Université",
    title: "Plateforme pédagogique",
    description:
      "Planification, gestion et suivi des activités pédagogiques d'un établissement universitaire (projet de TFC). Refonte d'un système PHP/MySQL : sécurisation, nouveau schéma de planification, architecture Repository / Service / Controller et contrôle d'accès à 8 rôles.",
    chips: ["PHP", "MySQL", "RBAC", "Repository / Service", "Planification"],
    // TODO : remplace # par le lien réel
    link: { label: "Voir le projet", href: "#" },
  },
];

export const stack = [
  { title: "Back-end", items: ["PHP", "Architecture MVC", "Repository / Service", "API REST"] },
  { title: "Données", items: ["MySQL", "Modélisation", "Migrations SQL", "RBAC"] },
  { title: "Front-end", items: ["HTML / CSS", "JavaScript", "Next.js / React", "Responsive"] },
  { title: "Intégrations & sécurité", items: ["Mobile Money (FlexPay)", "OTP SMS", "Cybersécurité (Cisco)", "Git / GitHub"] },
];

export const timeline = [
  {
    when: "Actuellement",
    title: "Développeur full-stack",
    place: "JOSAR Technology & Industry — Département Développement et Produits Numériques",
  },
  {
    when: "En cours",
    title: "Bac 4 — Génie logiciel",
    place: "Faculté des Sciences informatiques",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl: string;
  skills: string[];
};

export const certifications: Certification[] = [
  {
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    image: "/certifications/cisco-junior-cybersecurity-analyst.png",
    verifyUrl: "https://www.credly.com/badges/02893465-c2de-40ef-8d39-9a55d041b279/public_url",
    skills: [
      "Recommander des contrôles de sécurité réseau et information",
      "Atténuer les menaces réseau et système",
      "Évaluer la posture de sécurité (vulnérabilités, risques)",
      "Préparer un plan de réponse aux incidents",
    ],
  },
];
