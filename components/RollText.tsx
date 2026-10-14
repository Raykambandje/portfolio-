// Texte qui « roule » au survol : la ligne monte et une copie arrive par le bas.
// Le parent doit avoir la classe `group`.
export default function RollText({ children }: { children: string }) {
  const t = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span className="relative inline-block overflow-hidden align-top">
      <span className={`block ${t} group-hover:-translate-y-full`}>{children}</span>
      <span aria-hidden className={`absolute inset-0 block translate-y-full ${t} group-hover:translate-y-0`}>
        {children}
      </span>
    </span>
  );
}
