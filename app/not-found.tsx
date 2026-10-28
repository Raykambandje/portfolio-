import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import RollText from "@/components/RollText";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-16 sm:px-8">
      <LogoMark className="h-12 w-12" />

      <p className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <span className="text-accent">404</span>
        <span className="h-px w-6 bg-line" />
        Page introuvable
      </p>

      <h1 className="mt-6 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
        Cette page n&apos;existe pas.
        <span className="block text-subtle">Revenons à l&apos;essentiel.</span>
      </h1>

      <Link
        href="/"
        className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
        <RollText>Retour à l&apos;accueil</RollText>
      </Link>
    </main>
  );
}
