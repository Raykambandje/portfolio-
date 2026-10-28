// Durée de l'écran d'intro (en secondes). Les animations de l'accueil démarrent après.
export const INTRO_DURATION = 2.4;

// L'intro ne se joue qu'une fois par session, et jamais avec « réduire les animations ».
// Ce script, exécuté dans <head> avant l'affichage, marque alors <html data-intro="skip">
// et le CSS cache l'écran d'intro avant même le chargement du JS.
export const INTRO_SEEN_KEY = "intro-vue";
export const introScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

export const introSkipped = () =>
  typeof document !== "undefined" && document.documentElement.dataset.intro === "skip";

// Délai avant les animations de l'accueil : 0 si l'intro est sautée
export const introDelay = () => (introSkipped() ? 0 : INTRO_DURATION);
